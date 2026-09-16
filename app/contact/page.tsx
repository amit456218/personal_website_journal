import { PostcardContact } from "@/components/postcard-contact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Send a postcard",
  description: "Write Amitabh a postcard. It gets posted from the desk.",
}

export default function ContactPage() {
  return <PostcardContact />
}
