import type { Project, Slide } from "@/data/projects";

// The square "photo" for a project. Projects without a screenshot get a typographic poster.
export function Cover({ project, size = "grid" }: { project: Project; size?: "grid" | "full" }) {
  const { cover } = project;
  const full = size === "full";

  if (cover.image) {
    return (
      <div className="relative h-full w-full" style={{ background: cover.bg }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover.image} alt={`${project.title} app icon`} className="h-full w-full object-cover" />
        <Label project={project} full={full} />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: cover.bg, color: cover.fg }}>
      <span
        className="absolute -right-[6%] -bottom-[18%] font-serif leading-none select-none"
        style={{ fontSize: full ? "min(70vh, 34rem)" : "clamp(6rem, 22vw, 16rem)", color: cover.accent }}
        aria-hidden
      >
        {cover.mark}
      </span>
      <Label project={project} full={full} />
    </div>
  );
}

function Label({ project, full }: { project: Project; full: boolean }) {
  const { cover } = project;
  return (
    <div className="absolute inset-x-0 top-0 p-[7%]" style={{ color: cover.image ? "#ffffff" : cover.fg }}>
      <p
        className="font-serif leading-[0.95] tracking-tight"
        style={{ fontSize: full ? "clamp(2.5rem, 6vw, 4.5rem)" : "clamp(1.15rem, 4.6vw, 2.6rem)" }}
      >
        {project.title}
      </p>
      <p
        className={`mt-1 font-serif italic opacity-80 ${full ? "text-xl" : cover.image ? "hidden" : "hidden text-sm sm:block md:text-base"}`}
      >
        {project.tagline}
      </p>
    </div>
  );
}

// Extra carousel slides after the cover.
export function SlideView({ project, slide }: { project: Project; slide: Slide }) {
  const { cover } = project;
  // Swap the cover's colours so each slide reads as a new frame of the same post.
  const bg = cover.image ? "#0c0d10" : cover.fg;
  const fg = cover.image ? cover.fg : cover.bg;

  if (slide.kind === "quote") {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-5 p-[10%]" style={{ background: bg, color: fg }}>
        <p className="font-serif text-[clamp(1.8rem,4.5vw,3.4rem)] leading-[1.05]">{slide.text}</p>
        {slide.sub && <p className="text-sm opacity-75 md:text-base">{slide.sub}</p>}
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col justify-center p-[10%]" style={{ background: bg, color: fg }}>
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] opacity-70">{slide.title}</p>
      <ol className="space-y-3">
        {slide.items.map((item, i) => (
          <li key={item} className="flex items-baseline gap-4 font-serif text-[clamp(1.4rem,3.4vw,2.4rem)] leading-tight">
            <span className="w-6 shrink-0 font-sans text-sm opacity-60">{String(i + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}
