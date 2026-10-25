// Everything personal on the site lives here. Edit freely: the page reads it at build time.
// Lines marked TODO are drafts. Check them before sharing the link.

export type StorySlide = {
  // A short line shown big, plus optional smaller text under it.
  title: string;
  body?: string;
  bg: string;
  fg: string;
};

export type Highlight = {
  id: string;
  label: string;
  cover: string; // one or two characters shown inside the circle
  ring: string;
  slides: StorySlide[];
};

export const profile = {
  handle: "yash0304",
  name: "Yash Modi",
  category: "Finance professional · App builder", // TODO: your exact job title, if you want it here
  bio: [
    "Finance by day, offline-first apps by night.",
    "I build for India: apps that keep working when the network doesn't.",
    "Flutter · Kotlin · Python · Sarvam AI",
  ],
  location: "India", // TODO: city, if you want it shown
  links: [
    { label: "github.com/yash0304", href: "https://github.com/yash0304" },
    // TODO: add your LinkedIn, e.g. { label: "linkedin.com/in/…", href: "https://www.linkedin.com/in/…" },
  ],
  email: "yashmodi007@gmail.com",
  avatar: "", // TODO: put a square photo in /public (e.g. avatar.jpg) and set this to "/avatar.jpg"
  resumeUrl: "", // TODO: put resume.pdf in /public and set this to "/resume.pdf"
};

export const highlights: Highlight[] = [
  {
    id: "about",
    label: "About",
    cover: "Hi",
    ring: "#f4c95d",
    slides: [
      {
        title: "Hi, I'm Yash.",
        body: "I work in finance and spend my evenings building apps.",
        bg: "#1f3a2e",
        fg: "#f6efe2",
      },
      {
        title: "Offline first, always.",
        body: "Most of India's next users are on patchy networks. My apps treat the internet as a bonus.",
        bg: "#f6efe2",
        fg: "#1f3a2e",
      },
      {
        title: "Small steps, shipped.",
        body: "Every project has a backlog, a decision log and a handoff note. I build in increments I can finish.",
        bg: "#e85d3f",
        fg: "#fff6ec",
      },
    ],
  },
  {
    id: "stack",
    label: "Stack",
    cover: "</>",
    ring: "#7cc4a4",
    slides: [
      {
        title: "Mobile",
        body: "Flutter + Dart (Riverpod, Drift, sqflite) · Kotlin + Jetpack Compose (Room, Hilt)",
        bg: "#14213d",
        fg: "#fca311",
      },
      {
        title: "Backend & data",
        body: "Python · FastAPI · SQLAlchemy · Alembic · SQLite / SQLCipher · pandas · scikit-learn",
        bg: "#fca311",
        fg: "#14213d",
      },
      {
        title: "AI",
        body: "Sarvam AI for Indic chat, speech-to-text and text-to-speech · on-device assistants · RAG with LangChain",
        bg: "#e5e5e5",
        fg: "#14213d",
      },
    ],
  },
  {
    id: "now",
    label: "Now",
    cover: "●",
    ring: "#e85d3f",
    slides: [
      {
        title: "Building now",
        body: "MobileZone: getting a retail app ready for its first pilot shop.",
        bg: "#2b2d42",
        fg: "#edf2f4",
      },
      {
        title: "Also on the bench",
        body: "SafarSathi, an offline road-trip companion, built ahead of trips to Meghalaya and South India.",
        bg: "#8d99ae",
        fg: "#2b2d42",
      },
    ],
  },
  {
    id: "finance",
    label: "Fin + Code",
    cover: "₹",
    ring: "#9b8cff",
    slides: [
      {
        title: "Money is the domain I know.",
        body: "Budgets, EMIs, GST invoices: my finance day job shapes what I build.",
        bg: "#fff1d6",
        fg: "#3d2c1e",
      },
    ],
  },
  {
    id: "contact",
    label: "Say hi",
    cover: "✉",
    ring: "#5ab0f0",
    slides: [
      {
        title: "Let's talk.",
        body: "yashmodi007@gmail.com\ngithub.com/yash0304",
        bg: "#0f0f0f",
        fg: "#f5f5f5",
      },
    ],
  },
];
