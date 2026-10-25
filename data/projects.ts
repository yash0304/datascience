// Each project is one "post" in the grid. Order here = order on the page (first = top-left).
// To add a project: copy an entry, change the slug, and fill in the fields.

export type Slide =
  | { kind: "quote"; text: string; sub?: string }
  | { kind: "list"; title: string; items: string[] };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  place: string; // shown like an Instagram location under the post header
  status: "Pilot build" | "In development" | "Early build" | "Shipped";
  year: string;
  offline: boolean;
  repo: "private" | string; // "private" or a public URL
  cover: {
    bg: string;
    fg: string;
    accent: string;
    image?: string; // path under /public, used instead of the typographic cover
    mark: string; // big glyph or word on the typographic cover
  };
  caption: string;
  features: string[];
  stack: string[];
  slides: Slide[];
};

export const projects: Project[] = [
  {
    slug: "mobilezone",
    title: "MobileZone",
    tagline: "The shop keeps running when the network doesn't.",
    place: "Android · built for mobile shops in Tier-2/3 India",
    status: "Pilot build",
    year: "2026",
    offline: true,
    repo: "private",
    cover: { bg: "#ffd23f", fg: "#1b1b1e", accent: "#ee4266", mark: "MZ" },
    caption:
      "An offline-first Android app for mobile-phone shops in Tier-2 and Tier-3 towns. Staff browse stock at the counter, compare phones, work out EMIs and share listings on WhatsApp, then raise GST invoices without a network. The first pilot is at a real shop, and the same app will then go to other shops.",
    features: [
      "Catalogue browsing built for the shop counter",
      "GST invoice PDFs generated on the phone",
      "Encrypted Room database, with the key in Android Keystore",
      "Search, compare and an EMI calculator are next on the backlog",
      "Hindi and Gujarati voice search planned with Sarvam AI",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Material 3", "Room", "SQLCipher", "Hilt", "Coroutines"],
    slides: [
      { kind: "quote", text: "No signal at the counter shouldn't mean no sale.", sub: "The problem MobileZone solves" },
      {
        kind: "list",
        title: "Roadmap",
        items: ["Slice 1: Browse ✓", "Slice 2: Search · Compare · EMI", "Slice 3: Money & GST", "Slice 4: Owner tools"],
      },
    ],
  },
  {
    slug: "finsight",
    title: "FinSight",
    tagline: "Your money, in your language.",
    place: "Android / iOS · works offline",
    status: "In development",
    year: "2026",
    offline: true,
    repo: "private",
    cover: { bg: "#0c0d10", fg: "#5effc4", accent: "#00e6a0", image: "/projects/finsight.png", mark: "₹" },
    caption:
      "A personal finance app that works without internet. Type “spent 450 on food via UPI” and it logs the expense and updates your food budget. Chat and voice run on Sarvam AI, and a rule-based assistant takes over when there's no signal or no key.",
    features: [
      "Encrypted on-device database (SQLCipher)",
      "EMI tracker with upcoming dues on the dashboard",
      "Budgets calculated from actual spending",
      "Savings goals, e.g. “add goal laptop for 80000”",
      "Voice input and spoken replies with Sarvam speech-to-text and text-to-speech",
      "4-digit PIN with fingerprint unlock; re-locks after a minute in the background",
      "Optional FastAPI backend with Alembic migrations and a pytest suite",
    ],
    stack: ["Flutter", "Dart", "SQLCipher", "Sarvam AI", "fl_chart", "FastAPI", "SQLAlchemy"],
    slides: [
      { kind: "quote", text: "spent 450 on food via UPI", sub: "One sentence logs it and updates your food budget." },
      {
        kind: "list",
        title: "What's inside",
        items: ["Transactions", "EMIs", "Budgets", "Goals", "AI chat + voice"],
      },
    ],
  },
  {
    slug: "safarsathi",
    title: "SafarSathi",
    tagline: "The number that works when there's no signal.",
    place: "Flutter · Meghalaya → South India",
    status: "Early build",
    year: "2026",
    offline: true,
    repo: "private",
    cover: { bg: "#e9dcc3", fg: "#2f3e2c", accent: "#c4572a", mark: "S" },
    caption:
      "An offline travel companion for multi-stop road trips. Everything downloads once over WiFi during trip setup. After that the app is a local database and a map, with no backend and no live API calls. Two real trips shaped the design: Meghalaya and South India, routes where you pass through the same town twice and lose signal in between.",
    features: [
      "Fully offline once the trip starts",
      "Repeat visits stored as ordered stops, not unique places",
      "Emergency helplines preloaded for each region",
      "Diary, money, checklist and timeline screens",
      "Retro visual design; 16-table Drift schema checked by 20 tests",
    ],
    stack: ["Flutter", "Dart", "Drift", "SQLite"],
    slides: [
      { kind: "quote", text: "Guwahati → Shillong → Cherrapunji → Kongthong → Shillong", sub: "Repeat visits are a normal case, not an edge case." },
      {
        kind: "list",
        title: "Rules of the road",
        items: ["Network only at setup, on WiFi", "One batch download", "Then: local SQLite + map", "No backend. Ever."],
      },
    ],
  },
  {
    slug: "vividvault",
    title: "VividVault",
    tagline: "Your documents. Your phone. Nobody else's.",
    place: "Flutter · offline, privacy-first",
    status: "In development",
    year: "2026",
    offline: true,
    repo: "private",
    cover: { bg: "#3a1f5d", fg: "#ffd9f2", accent: "#ff7ac6", mark: "V" },
    caption:
      "A fully offline, privacy-first document vault. Scan paper documents with OCR, ask Luna, the on-device assistant, where your passport copy is, sync to another phone peer-to-peer, and browse it all on a 3D shelf.",
    features: [
      "Luna, an on-device AI assistant",
      "OCR for scanned documents",
      "Peer-to-peer sync with no cloud",
      "3D library view",
      "Riverpod state management and sqflite storage",
    ],
    stack: ["Flutter", "Riverpod", "sqflite", "OCR", "On-device AI"],
    slides: [
      { kind: "quote", text: "“Luna, where's my passport copy?”", sub: "Answered on the phone, with nothing sent to a server." },
      { kind: "list", title: "Privacy by design", items: ["No account", "No cloud", "P2P sync", "On-device OCR + AI"] },
    ],
  },
  {
    slug: "memory-lane",
    title: "Memory Lane",
    tagline: "Photos for the people who were there.",
    place: "Flutter + Python",
    status: "In development",
    year: "2026",
    offline: false,
    repo: "private",
    cover: { bg: "#f7e1d7", fg: "#4a5759", accent: "#b0c4b1", mark: "ML" },
    // TODO: richer caption and features. This is drafted from the repo description only.
    caption:
      "A personal photo-sharing app: a private place for family and friends to share photos, instead of a public feed. Python backend, Flutter app.",
    features: ["Private sharing with your own circle", "Python backend", "Flutter client"],
    stack: ["Flutter", "Python"],
    slides: [{ kind: "quote", text: "Not a feed. A shoebox of photos you share.", sub: "Memory Lane" }],
  },
  {
    slug: "shreeji-scheme",
    title: "Shreeji Schemes",
    tagline: "Customer schemes, tracked properly.",
    place: "Web · TypeScript",
    status: "In development",
    year: "2026",
    offline: false,
    repo: "private",
    cover: { bg: "#0b3954", fg: "#bfd7ea", accent: "#ff5a5f", mark: "%" },
    // TODO: describe what the scheme app does. Drafted from the repo name only.
    caption: "A TypeScript web app for running customer schemes at Shreeji Mobile.",
    features: ["Built for Shreeji Mobile", "TypeScript web app"],
    stack: ["TypeScript"],
    slides: [{ kind: "quote", text: "Schemes without the spreadsheet.", sub: "Shreeji Schemes" }],
  },
];
