export interface JournalEntry {
  id: string
  title: string
  location: string
  country: string
  date: string
  coordinates: {
    x: number // percentage from left
    y: number // percentage from top
  }
  excerpt: string
  content: string
  marginNotes: string[]
  photos: {
    src: string
    caption: string
    rotation: number
  }[]
  stamps: {
    text: string
    type: 'round' | 'rectangle'
    color: 'red' | 'blue' | 'green'
  }[]
  tickets: {
    title: string
    details: string
  }[]
}

export const journalEntries: JournalEntry[] = [
  {
    id: "tokyo",
    title: "Lost in Translation",
    location: "Tokyo",
    country: "Japan",
    date: "October 15, 2024",
    coordinates: { x: 82, y: 38 },
    excerpt: "The neon-lit alleys of Shinjuku hummed with a thousand untold stories...",
    content: `The first morning in Tokyo, I woke to the sound of trains—that constant, rhythmic heartbeat of the city. From my tiny hotel room in Shinjuku, I watched the sun rise over a sea of concrete and glass, painting everything in shades of amber and rose.

I spent hours wandering through Yanaka, one of the few neighborhoods that survived the war and the relentless march of modernization. Here, the old Tokyo still breathes—narrow lanes lined with wooden houses, small temples tucked between homes, and elderly residents who remember when the whole city looked like this.

The contrast is what gets you. One moment you're in a 400-year-old garden, bamboo rustling overhead, carp drifting lazily through ponds designed by shoguns. The next, you're underground in a subway station so efficient it feels like science fiction, shoulder to shoulder with salarymen in identical suits.

At night, I found myself in Golden Gai—six narrow alleys packed with over 200 bars, each barely fitting more than a handful of patrons. I ducked into one at random, a place called "Moon Dog" with walls covered in jazz records. The bartender spoke no English, I spoke no Japanese, but we communicated through music and whiskey until 2 AM.`,
    marginNotes: [
      "The best ramen I've ever had was at a standing-only shop in a train station. No seats, just slurping sounds and steam.",
      "Note to self: convenience store onigiri is an underrated art form",
      "The sound of geta sandals on stone paths at Meiji Shrine..."
    ],
    photos: [
      { src: "/photos/tokyo-1.jpg", caption: "Golden Gai at dusk", rotation: -2 },
      { src: "/photos/tokyo-2.jpg", caption: "Senso-ji Temple, 5 AM", rotation: 3 },
      { src: "/photos/tokyo-3.jpg", caption: "The view from my window", rotation: -1 }
    ],
    stamps: [
      { text: "NARITA\nOCT 14 2024", type: "round", color: "blue" },
      { text: "入国\nIMMIGRATION", type: "rectangle", color: "red" }
    ],
    tickets: [
      { title: "JR PASS", details: "14 Day • Green Car • ¥70,000" },
      { title: "TEAMLAB BORDERLESS", details: "Ticket #4892 • 18:00" }
    ]
  },
  {
    id: "reykjavik",
    title: "Fire and Ice",
    location: "Reykjavík",
    country: "Iceland",
    date: "March 8, 2024",
    coordinates: { x: 38, y: 18 },
    excerpt: "There's a kind of silence here that doesn't exist anywhere else on Earth...",
    content: `Iceland in March is a study in contradictions. The sun barely crawls above the horizon before tumbling back into the sea, and yet there's more light than I've ever seen—bouncing off snow, reflecting from ice, glowing through clouds in colors that shouldn't exist.

I drove the Ring Road in a tiny rental car that shook in the wind like a leaf. At times the gusts were so strong I had to pull over and wait. Other times the air was perfectly still, and I could hear the glaciers groaning and cracking in the distance.

The Golden Circle is what most tourists see, but the real Iceland is in the stretches between attractions—the vast lava fields covered in bright green moss, the farms clinging to the edges of fjords, the hot springs that appear without warning by the side of the road.

At Jökulsárlón, I watched icebergs calving from Vatnajökull. Some were white, some blue, some streaked with volcanic ash. They drifted slowly toward the sea, past seals lounging on ice floes, under a sky that couldn't decide if it wanted to storm or clear.

That night, the aurora came out. Green ribbons dancing across the sky, reflecting in the still water of the lagoon. I stayed until 3 AM, lying on the frozen ground, forgetting to feel cold.`,
    marginNotes: [
      "Skyr is not yogurt. I will fight anyone who says otherwise.",
      "The smell of sulfur becomes normal after day 2",
      "Björk was right about everything"
    ],
    photos: [
      { src: "/photos/iceland-1.jpg", caption: "Jökulsárlón at midnight", rotation: 2 },
      { src: "/photos/iceland-2.jpg", caption: "The black sand beach at Vik", rotation: -3 },
      { src: "/photos/iceland-3.jpg", caption: "Northern lights over Thingvellir", rotation: 1 }
    ],
    stamps: [
      { text: "KEFLAVÍK\nMAR 06 2024", type: "round", color: "blue" },
      { text: "ÍSLAND", type: "rectangle", color: "green" }
    ],
    tickets: [
      { title: "BLUE LAGOON", details: "Premium • 14:00 • ISK 12,990" },
      { title: "WHALE WATCHING", details: "Elding Tours • Reykjavík Harbor" }
    ]
  },
  {
    id: "lisbon",
    title: "City of Seven Hills",
    location: "Lisbon",
    country: "Portugal",
    date: "June 22, 2023",
    coordinates: { x: 40, y: 42 },
    excerpt: "The trams rattled through cobblestone streets so narrow that I could touch both walls...",
    content: `Lisbon hit me differently than I expected. I came for the pastéis de nata and the azulejos, for the fado music and the crumbling grandeur of an empire's sunset. I found all of that, but also something else—a melancholy that felt strangely comforting.

The Portuguese have a word for it: saudade. It's untranslatable, really, but it's something like longing mixed with nostalgia, a bittersweet ache for things lost or never had. You feel it everywhere in Lisbon—in the mournful fado songs drifting from open windows, in the abandoned palaces of Sintra, in the way the light falls golden on crumbling facades.

I spent my mornings at Pastéis de Belém, eating custard tarts still warm from the oven, watching the locals read their newspapers and argue about football. I spent my afternoons wandering the Alfama district, climbing endless stairs, getting gloriously lost in a labyrinth of alleyways that predate the earthquake of 1755.

One evening, I took the 28 tram from Martim Moniz to the cemetery, standing on the wooden slats as it lurched around corners so tight the walls nearly scraped the paint. An old woman sat next to me, groceries on her lap, completely unbothered by the chaos.

At night, I found a fado bar in the Bairro Alto. A woman in black sang about love and loss and the sea. I didn't understand a word, but I understood everything.`,
    marginNotes: [
      "Three pastéis de nata is breakfast. Five is lunch. Seven is just Tuesday.",
      "The elevator at Santa Justa was designed by a student of Eiffel",
      "Always carry a cardigan—the ocean wind is deceptive"
    ],
    photos: [
      { src: "/photos/lisbon-1.jpg", caption: "Tram 28 in Alfama", rotation: -2 },
      { src: "/photos/lisbon-2.jpg", caption: "Sunset from Miradouro da Graça", rotation: 4 },
      { src: "/photos/lisbon-3.jpg", caption: "Tiles in the Alfama", rotation: -1 }
    ],
    stamps: [
      { text: "LISBOA\nJUN 20 2023", type: "round", color: "red" },
      { text: "PORTUGAL", type: "rectangle", color: "blue" }
    ],
    tickets: [
      { title: "TRAM 28", details: "Carris • Single Journey • €3.00" },
      { title: "TORRE DE BELÉM", details: "Adult • €8.00 • 11:30" }
    ]
  },
  {
    id: "marrakech",
    title: "Through the Red City",
    location: "Marrakech",
    country: "Morocco",
    date: "November 3, 2023",
    coordinates: { x: 42, y: 45 },
    excerpt: "The medina swallowed me whole, a maze of spices and silk and ancient secrets...",
    content: `Nothing prepares you for the medina. You think you know—you've seen the photos, read the guides, heard the warnings about aggressive vendors. But then you step through Bab Agnaou and the 21st century simply ceases to exist.

The walls are red. Everything is red—ochre, terracotta, rust, crimson. The buildings seem to glow in the late afternoon sun, warm and alive against a sky so blue it hurts.

I lost myself immediately, which is the only way to see Marrakech. The souks twist and branch like blood vessels, each artery dedicated to its own trade: metalwork here, leather there, spices further on. The air changes with each turn—cumin and cinnamon, fresh mint, the sharp smell of tanned hide.

The Djemaa el-Fna at sunset is controlled chaos. Snake charmers, storytellers, henna artists, monkey handlers, juice vendors, drummers—a medieval carnival that erupts every evening as it has for a thousand years. I ate tagine at a plastic table while a man next to me got a tooth pulled by a street dentist. Just another Tuesday.

I stayed in a riad hidden behind an unmarked door in the mellah. Inside: a courtyard paradise of zellige tiles, a plunge pool, orange trees, birdsong. Outside: donkeys and motorcycles fighting for space in alleys too narrow for cars.`,
    marginNotes: [
      "The mint tea ritual: pour from height, accept at least three glasses, never refuse",
      "Bartering is an art. Start at 1/4 the asking price.",
      "The hammam was transformative. I emerged a new person, also very pink."
    ],
    photos: [
      { src: "/photos/marrakech-1.jpg", caption: "Ben Youssef Madrasa", rotation: 2 },
      { src: "/photos/marrakech-2.jpg", caption: "Spice souk at noon", rotation: -3 },
      { src: "/photos/marrakech-3.jpg", caption: "Our riad courtyard", rotation: 1 }
    ],
    stamps: [
      { text: "مراكش\nNOV 01 2023", type: "round", color: "red" },
      { text: "MOROCCO", type: "rectangle", color: "green" }
    ],
    tickets: [
      { title: "JARDIN MAJORELLE", details: "Yves Saint Laurent Gardens" },
      { title: "ATLAS EXCURSION", details: "Day trip • Berber villages" }
    ]
  },
  {
    id: "buenos-aires",
    title: "Paris of South America",
    location: "Buenos Aires",
    country: "Argentina",
    date: "January 15, 2024",
    coordinates: { x: 30, y: 78 },
    excerpt: "The city doesn't wake until midnight, doesn't sleep until dawn...",
    content: `They call it the Paris of South America, and you can see why—the wide boulevards, the Belle Époque architecture, the café culture that stretches long into the night. But Buenos Aires is its own animal, wilder and more melancholic than any European capital.

The city runs on a different clock. Dinner at 10 PM is early. The tango milongas don't get going until after midnight. I learned to nap in the afternoon heat, to drink mate like a local, to embrace the beautiful inefficiency of Argentine time.

San Telmo on Sunday is magic. The antique market sprawls through cobblestone streets, past crumbling mansions that once housed aristocrats and now hold ten families each. Street performers dance tango at every corner—the real stuff, not the tourist show, couples locked in an embrace so intense it feels intrusive to watch.

I took lessons at a small academy in Abasto. My teacher, a woman in her seventies with painted red nails and perfect posture, told me tango isn't about the steps. "It's about the space between two people," she said. "The conversation without words."

On my last night, I went to a milonga in an old warehouse in Palermo. The floor was packed with dancers of all ages—teenagers, grandparents, tourists, locals. The music was scratchy and old. Nobody cared. At 4 AM, we all stopped for pizza from a cart outside. Then we went back in until sunrise.`,
    marginNotes: [
      "Empanadas from the corner shop > fancy restaurant empanadas",
      "The cemetery at Recoleta is a city unto itself. Got lost for 2 hours.",
      "Fernet and Coke is an acquired taste. I acquired it on night 3."
    ],
    photos: [
      { src: "/photos/ba-1.jpg", caption: "La Boca, morning light", rotation: -2 },
      { src: "/photos/ba-2.jpg", caption: "San Telmo market", rotation: 3 },
      { src: "/photos/ba-3.jpg", caption: "Milonga in Palermo", rotation: -1 }
    ],
    stamps: [
      { text: "EZEIZA\nJAN 13 2024", type: "round", color: "blue" },
      { text: "ARGENTINA", type: "rectangle", color: "blue" }
    ],
    tickets: [
      { title: "CAFÉ TORTONI", details: "Table 14 • Founded 1858" },
      { title: "TANGO LESSON", details: "Academia Carlos Copello • Beginner" }
    ]
  },
  {
    id: "kyoto",
    title: "The Old Capital",
    location: "Kyoto",
    country: "Japan",
    date: "October 22, 2024",
    coordinates: { x: 83, y: 40 },
    excerpt: "A thousand temples, ten thousand torii gates, a million autumn leaves...",
    content: `After the sensory overload of Tokyo, Kyoto felt like a deep breath. The old capital moves to a different rhythm—slower, more deliberate, steeped in traditions that stretch back a thousand years.

I woke at 5 AM to visit Fushimi Inari before the crowds. The vermillion torii gates stretched up the mountainside like a tunnel of fire, each one donated by a business or family seeking divine favor. At that hour, I was nearly alone—just me, the gates, and the occasional cat lounging on the path.

The temples blur together after a while—a golden pavilion here, a rock garden there, moss-covered statues everywhere. But some moments stand out: the sound of a bamboo water feature in the silence of Ryoan-ji, the way the light filtered through the maple leaves at Eikan-do, the shock of coming around a corner and finding a geisha hurrying to an appointment.

I stayed in a machiya, a traditional wooden townhouse in the Nishijin weaving district. It was beautiful and deeply uncomfortable—sleeping on a futon on tatami mats, bathing in a cedar tub, trying to figure out the etiquette of the shared bathroom. I loved every awkward minute.

On my last evening, I walked along the Philosopher's Path as the sun set. Cherry trees lined the canal, their leaves turning gold and red. An old man sat on a bench, sketching in a notebook. Neither of us spoke. We didn't need to.`,
    marginNotes: [
      "Matcha everything. Even the Kit Kats.",
      "The temple that makes you walk barefoot across the squeaky nightingale floors...",
      "Spotted a geisha! Only for a moment, turning a corner in Gion."
    ],
    photos: [
      { src: "/photos/kyoto-1.jpg", caption: "Fushimi Inari at dawn", rotation: 1 },
      { src: "/photos/kyoto-2.jpg", caption: "Bamboo grove, Arashiyama", rotation: -2 },
      { src: "/photos/kyoto-3.jpg", caption: "Kinkaku-ji reflections", rotation: 3 }
    ],
    stamps: [
      { text: "KYOTO\nOCT 20 2024", type: "round", color: "red" },
      { text: "JR WEST", type: "rectangle", color: "green" }
    ],
    tickets: [
      { title: "KINKAKU-JI", details: "Golden Pavilion • ¥500" },
      { title: "TEA CEREMONY", details: "Camellia Garden • 14:00" }
    ]
  },
  {
    id: "new-york",
    title: "The City That Never Sleeps",
    location: "New York",
    country: "USA",
    date: "May 5, 2023",
    coordinates: { x: 25, y: 42 },
    excerpt: "Eight million stories, infinite possibilities, one island that never stops moving...",
    content: `I've been to New York a dozen times, and it still surprises me. The city shape-shifts—every visit reveals new corners, new favorites, new reasons to love and hate this impossible place.

This trip I stayed in the West Village, in a walk-up apartment with creaking floors and a bathtub in the kitchen. Very New York. I spent mornings writing at a coffee shop on Bedford Street, afternoons wandering whatever neighborhood the subway delivered me to.

The High Line was my revelation this time. I'd skipped it before, assuming it was just another tourist trap. But walking that elevated park at sunset, watching the city unfold on either side, the Hudson glittering to the west—I understood. Some tourist traps exist because the thing is genuinely worth seeing.

I caught a jazz set at the Village Vanguard, ate dollar dumplings in Chinatown at 2 AM, argued about pizza (Joe's is correct, don't @ me), got lost in the Strand bookstore for three hours, watched the sunrise from the Brooklyn Bridge.

What I love about New York is that it doesn't care if you love it. The city will be itself regardless—chaotic, aggressive, beautiful, broken. You adapt or you leave. There's something freeing about a place with so little pretense.`,
    marginNotes: [
      "The subway is fine. Just don't make eye contact.",
      "Central Park is bigger than Monaco. I fact-checked this.",
      "Best bagel: Russ & Daughters. I will hear no debate."
    ],
    photos: [
      { src: "/photos/nyc-1.jpg", caption: "Brooklyn Bridge at dawn", rotation: -1 },
      { src: "/photos/nyc-2.jpg", caption: "Village Vanguard", rotation: 2 },
      { src: "/photos/nyc-3.jpg", caption: "The view from the High Line", rotation: -3 }
    ],
    stamps: [
      { text: "JFK\nMAY 03 2023", type: "round", color: "blue" },
      { text: "NYC", type: "rectangle", color: "red" }
    ],
    tickets: [
      { title: "MoMA", details: "Adult • $25 • After Hours" },
      { title: "VILLAGE VANGUARD", details: "Roy Hargrove Tribute • Set 2" }
    ]
  },
  {
    id: "cape-town",
    title: "Where Two Oceans Meet",
    location: "Cape Town",
    country: "South Africa",
    date: "February 28, 2024",
    coordinates: { x: 52, y: 80 },
    excerpt: "Table Mountain watches over everything, ancient and patient and impossibly flat...",
    content: `Cape Town is a city of contradictions, and it knows it. Wealth and poverty exist side by side, often separated only by a highway. The natural beauty is staggering—mountains and oceans and vineyards—but the history is brutal, and the present is complicated.

I hiked Table Mountain on my first morning, taking the Platteklip Gorge route straight up the face. It nearly killed me. But reaching the top, spreading out on the flat summit, watching the clouds roll in like slow-motion waves—it was worth every burning muscle.

Bo-Kaap was my favorite neighborhood. The brightly painted houses—pink, turquoise, lime green—cascade down the hill toward the city center. The area was once the heart of Cape Malay culture, and you can still smell the spices: turmeric, cumin, coriander, the holy trinity of Cape Malay cooking.

I drove out to the Cape of Good Hope, the southwestern tip of Africa (not the southernmost, despite what the signs say). The wind nearly knocked me off my feet. Baboons raided a tourist's car for snacks. Two oceans churned against rocks below.

At night, I ate at a braai restaurant in Woodstock, surrounded by locals and music and smoke from the grill. South African hospitality is aggressive in the best way—strangers become friends by the second beer, and everyone has an opinion about everything.`,
    marginNotes: [
      "Penguins! Boulder Beach has actual penguins! Wild ones!",
      "The wine in Stellenbosch is criminally underrated",
      "Everyone says 'now now' and 'just now' and they mean different things"
    ],
    photos: [
      { src: "/photos/capetown-1.jpg", caption: "Table Mountain from Signal Hill", rotation: 2 },
      { src: "/photos/capetown-2.jpg", caption: "Bo-Kaap houses", rotation: -2 },
      { src: "/photos/capetown-3.jpg", caption: "Cape of Good Hope", rotation: 1 }
    ],
    stamps: [
      { text: "CPT\nFEB 26 2024", type: "round", color: "blue" },
      { text: "SOUTH AFRICA", type: "rectangle", color: "green" }
    ],
    tickets: [
      { title: "TABLE MOUNTAIN", details: "Cable Car Return • R450" },
      { title: "ROBBEN ISLAND", details: "Ferry + Tour • 11:00" }
    ]
  }
]

export const mapPins = journalEntries.map(entry => ({
  id: entry.id,
  location: entry.location,
  country: entry.country,
  coordinates: entry.coordinates,
  date: entry.date
}))
