"use client";

import { useCallback, useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { Cover } from "./Cover";
import { Carousel, Grid, Lock, Tag } from "./Icons";
import { PostModal } from "./PostModal";

// Which projects use each technology, most-used first. Shown on the "Tagged" tab.
const tagged = Object.entries(
  projects.reduce<Record<string, string[]>>((acc, p) => {
    p.stack.forEach((s) => (acc[s] ??= []).push(p.slug));
    return acc;
  }, {}),
).sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

export function Feed() {
  const [tab, setTab] = useState<"posts" | "tagged">("posts");
  const [open, setOpen] = useState<number | null>(null);

  // Posts are linkable: /#p/finsight opens FinSight directly.
  useEffect(() => {
    const fromHash = () => {
      const slug = location.hash.match(/^#p\/(.+)$/)?.[1];
      const i = projects.findIndex((p) => p.slug === slug);
      setOpen(i >= 0 ? i : null);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const show = useCallback((i: number | null) => {
    setOpen(i);
    const url = i === null ? location.pathname + location.search : `#p/${projects[i].slug}`;
    history.replaceState(null, "", url);
  }, []);

  const tabBtn = (id: typeof tab, label: string, Icon: typeof Grid) => (
    <button
      onClick={() => setTab(id)}
      className={`-mt-px flex items-center gap-1.5 border-t py-3 text-xs font-semibold tracking-[0.1em] uppercase md:py-4 ${
        tab === id ? "border-ink text-ink" : "border-transparent text-muted"
      }`}
      aria-pressed={tab === id}
    >
      <Icon className="h-4 w-4 md:h-3 md:w-3" />
      <span className="hidden md:inline">{label}</span>
      <span className="sr-only md:hidden">{label}</span>
    </button>
  );

  return (
    <section className="border-t border-line">
      <div className="flex justify-center gap-16">
        {tabBtn("posts", "Projects", Grid)}
        {tabBtn("tagged", "Tagged", Tag)}
      </div>

      {tab === "posts" ? (
        <ul className="grid grid-cols-3 gap-[2px] md:gap-1">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <button
                onClick={() => show(i)}
                className="group relative block aspect-square w-full overflow-hidden text-left"
                aria-label={`Open ${p.title}`}
              >
                <Cover project={p} />
                <span className="absolute top-2 right-2 text-white drop-shadow md:top-3 md:right-3">
                  <Carousel className="h-4 w-4 md:h-5 md:w-5" />
                </span>
                <span className="absolute inset-0 hidden flex-col items-center justify-center gap-2 bg-black/45 font-semibold text-white group-hover:flex">
                  <span className="text-lg">{p.status}</span>
                  <span className="flex items-center gap-1.5 text-sm font-normal">
                    {p.repo === "private" && <Lock className="h-4 w-4" />}
                    {p.stack.slice(0, 3).join(" · ")}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="divide-y divide-line px-4 md:px-0">
          {tagged.map(([tech, slugs]) => (
            <li key={tech} className="flex items-center gap-4 py-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-elevated font-serif text-xl">
                {tech[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{tech}</p>
                <p className="text-sm text-muted">
                  Tagged in {slugs.length} {slugs.length === 1 ? "project" : "projects"}
                </p>
              </div>
              <div className="flex gap-1">
                {slugs.map((slug) => {
                  const i = projects.findIndex((p) => p.slug === slug);
                  const { cover, title } = projects[i];
                  return (
                    <button
                      key={slug}
                      onClick={() => show(i)}
                      className="flex h-11 w-11 items-center justify-center overflow-hidden rounded font-serif text-xl"
                      style={{ background: cover.bg, color: cover.accent }}
                      aria-label={`Open ${title}`}
                      title={title}
                    >
                      {cover.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cover.image} alt="" className="h-full w-full object-cover" />
                      ) : (
                        cover.mark
                      )}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      )}

      {open !== null && (
        <PostModal
          index={open}
          onClose={() => show(null)}
          onPrev={open > 0 ? () => show(open - 1) : undefined}
          onNext={open < projects.length - 1 ? () => show(open + 1) : undefined}
        />
      )}
    </section>
  );
}
