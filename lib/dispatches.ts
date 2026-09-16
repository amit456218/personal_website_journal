// Dispatches: public GitHub activity, rewritten as telegrams.

export interface Dispatch {
  id: string
  at: string // ISO
  repo: string // owner/name
  repoUrl: string
  kind: string
  text: string // the telegram, in caps, sentences joined by STOP
  url: string
}

const GITHUB_USER = "amit456218"

interface GhEvent {
  id: string
  type: string
  created_at: string
  repo: { name: string }
  payload: Record<string, unknown>
}

/** Commit subjects often start with a conventional prefix; a telegram wouldn't. */
function untag(msg: string) {
  return msg.replace(/^(feat|fix|chore|docs|perf|refactor|style|test|build|ci|revert)(\([^)]*\))?!?:\s*/i, "").trim()
}

function stopify(parts: (string | null | undefined)[]) {
  const cleaned = parts
    .filter((p): p is string => Boolean(p && p.trim()))
    .map((p) =>
      p
        .replace(/\s+/g, " ")
        .replace(/\s*[.!?;:]+\s*/g, " STOP ")
        .replace(/(\s*STOP\s*)+/g, " STOP ")
        .replace(/\s+/g, " ")
        .trim()
        .toUpperCase()
    )
  let text = cleaned.join(" STOP ")
  text = text.replace(/(\s*STOP\s*)+$/,"").trim()
  if (text.length > 160) text = text.slice(0, 157).replace(/\s+\S*$/, "") + "…"
  return text + " STOP"
}

function shortRepo(name: string) {
  return name.split("/")[1] ?? name
}

async function gh(path: string, init?: RequestInit) {
  const token = process.env.GITHUB_TOKEN
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "amitabhgulati.com dispatches",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 900 },
  })
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${path}`)
  return res.json()
}

export async function fetchDispatches(limit = 12): Promise<Dispatch[]> {
  const events = (await gh(`/users/${GITHUB_USER}/events/public?per_page=30`)) as GhEvent[]
  const out: Dispatch[] = []
  let commitLookups = 0

  for (const e of events) {
    if (out.length >= limit) break
    const repo = e.repo.name
    const repoUrl = `https://github.com/${repo}`
    const p = e.payload
    const base = { id: e.id, at: e.created_at, repo, repoUrl }

    switch (e.type) {
      case "PushEvent": {
        const size = Number(p.size ?? (Array.isArray(p.commits) ? (p.commits as unknown[]).length : 0)) || 0
        const ref = String(p.ref ?? "").replace("refs/heads/", "")
        let headline: string | null = null
        const commits = Array.isArray(p.commits) ? (p.commits as { message?: string }[]) : []
        if (commits.length && commits[commits.length - 1]?.message) {
          headline = untag(commits[commits.length - 1].message!.split("\n")[0])
        } else if (p.head && commitLookups < 6) {
          // The public feed often omits commit messages; fetch the head commit.
          commitLookups++
          try {
            const c = (await gh(`/repos/${repo}/commits/${p.head}`)) as { commit?: { message?: string } }
            headline = c.commit?.message ? untag(c.commit.message.split("\n")[0]) : null
          } catch {
            headline = null
          }
        }
        out.push({
          ...base,
          kind: "push",
          text: stopify([
            `pushed ${size === 1 ? "one commit" : `${size || "new"} commits`} to ${shortRepo(repo)}${ref && ref !== "main" && ref !== "master" ? ` on ${ref}` : ""}`,
            headline ? `latest reads ${headline}` : null,
          ]),
          url: p.head ? `${repoUrl}/commit/${p.head}` : repoUrl,
        })
        break
      }
      case "CreateEvent": {
        const refType = String(p.ref_type ?? "")
        const ref = p.ref ? String(p.ref) : ""
        out.push({
          ...base,
          kind: "create",
          text: stopify([
            refType === "repository" ? `started a new repository ${shortRepo(repo)}` : `opened ${refType} ${ref} in ${shortRepo(repo)}`,
          ]),
          url: repoUrl,
        })
        break
      }
      case "PublicEvent":
        out.push({ ...base, kind: "public", text: stopify([`${shortRepo(repo)} is now open source`, "come and look"]), url: repoUrl })
        break
      case "ReleaseEvent": {
        const rel = p.release as { tag_name?: string; name?: string; html_url?: string } | undefined
        out.push({ ...base, kind: "release", text: stopify([`released ${rel?.tag_name ?? "a new version"} of ${shortRepo(repo)}`, rel?.name ?? null]), url: rel?.html_url ?? repoUrl })
        break
      }
      case "PullRequestEvent": {
        const pr = p.pull_request as { title?: string; html_url?: string; number?: number } | undefined
        out.push({ ...base, kind: "pull", text: stopify([`${String(p.action ?? "touched")} pull request ${pr?.number ? `no ${pr.number}` : ""} in ${shortRepo(repo)}`, pr?.title ?? null]), url: pr?.html_url ?? repoUrl })
        break
      }
      case "IssuesEvent": {
        const issue = p.issue as { title?: string; html_url?: string; number?: number } | undefined
        out.push({ ...base, kind: "issue", text: stopify([`${String(p.action ?? "touched")} issue ${issue?.number ? `no ${issue.number}` : ""} in ${shortRepo(repo)}`, issue?.title ?? null]), url: issue?.html_url ?? repoUrl })
        break
      }
      case "WatchEvent":
        out.push({ ...base, kind: "star", text: stopify([`starred ${repo}`]), url: repoUrl })
        break
      case "ForkEvent":
        out.push({ ...base, kind: "fork", text: stopify([`forked ${repo}`]), url: repoUrl })
        break
      default:
        break
    }
  }
  out.sort((a, b) => (a.at < b.at ? 1 : -1))
  return out
}
