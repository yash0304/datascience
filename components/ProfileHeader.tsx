import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { Avatar } from "./Avatar";

const languages = new Set(
  projects.flatMap((p) => p.stack.filter((s) => ["Kotlin", "Dart", "Python", "TypeScript"].includes(s))),
);
// Flutter projects are Dart even when "Dart" isn't listed separately.
if (projects.some((p) => p.stack.includes("Flutter"))) languages.add("Dart");

const stats = [
  { value: projects.length, label: "projects" },
  { value: projects.filter((p) => p.offline).length, label: "offline-first" },
  { value: languages.size, label: "languages" },
];

function Buttons() {
  const btn =
    "flex-1 rounded-lg bg-elevated px-4 py-[7px] text-center text-sm font-semibold transition hover:opacity-80 md:flex-none";
  return (
    <>
      <a href={`mailto:${profile.email}`} className={`${btn} bg-accent! text-white`}>
        Message
      </a>
      <a href={profile.links[0].href} target="_blank" rel="noreferrer" className={btn}>
        GitHub
      </a>
      {profile.resumeUrl && (
        <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className={btn}>
          Résumé
        </a>
      )}
    </>
  );
}

function Stats({ className = "" }: { className?: string }) {
  return (
    <ul className={className}>
      {stats.map((s) => (
        <li key={s.label} className="flex flex-col items-center leading-tight md:flex-row md:gap-1.5">
          <span className="font-semibold">{s.value}</span>
          <span className="text-muted md:text-ink">{s.label}</span>
        </li>
      ))}
    </ul>
  );
}

function Bio() {
  return (
    <div className="text-sm leading-[1.45]">
      <p className="font-semibold">{profile.name}</p>
      <p className="text-muted">{profile.category}</p>
      {profile.bio.map((line) => (
        <p key={line}>{line}</p>
      ))}
      {profile.location && <p className="text-muted">📍 {profile.location}</p>}
      {profile.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 font-semibold text-link hover:underline"
        >
          <span aria-hidden>🔗</span> {l.label}
        </a>
      ))}
    </div>
  );
}

export function ProfileHeader() {
  return (
    <header className="px-4 pt-4 md:px-0 md:pt-8">
      {/* Phone layout */}
      <div className="md:hidden">
        <div className="flex items-center gap-6">
          <Avatar size={86} />
          <Stats className="flex flex-1 justify-around text-sm" />
        </div>
        <div className="mt-3">
          <Bio />
        </div>
        <div className="mt-4 flex gap-2">
          <Buttons />
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden items-start gap-20 px-12 md:flex">
        <Avatar size={160} />
        <div className="flex-1 space-y-5 pt-2">
          <div className="flex items-center gap-3">
            <h1 className="mr-3 text-xl">{profile.handle}</h1>
            <Buttons />
          </div>
          <Stats className="flex gap-10 text-base" />
          <Bio />
        </div>
      </div>
    </header>
  );
}
