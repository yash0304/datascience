"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { highlights, profile } from "@/data/profile";
import { Avatar } from "./Avatar";
import { Close } from "./Icons";

const SLIDE_MS = 5000;

export function Highlights() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className="no-scrollbar flex gap-4 overflow-x-auto px-4 py-6 md:gap-12 md:px-12 md:py-10">
        {highlights.map((h, i) => (
          <li key={h.id} className="shrink-0">
            <button onClick={() => setOpen(i)} className="group flex w-[66px] flex-col items-center gap-1.5 md:w-[87px]">
              <span className="rounded-full border border-line p-[3px]">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full font-serif text-2xl transition group-hover:scale-95 md:h-[77px] md:w-[77px] md:text-3xl"
                  style={{ background: h.slides[0].bg, color: h.slides[0].fg, boxShadow: `inset 0 0 0 3px ${h.ring}` }}
                >
                  {h.cover}
                </span>
              </span>
              <span className="w-full truncate text-center text-xs font-semibold">{h.label}</span>
            </button>
          </li>
        ))}
      </ul>
      {open !== null && <StoryViewer start={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function StoryViewer({ start, onClose }: { start: number; onClose: () => void }) {
  const [hi, setHi] = useState(start);
  const [si, setSi] = useState(0);
  const [paused, setPaused] = useState(false);
  const h = highlights[hi];
  const slide = h.slides[si];
  const closeRef = useRef<HTMLButtonElement>(null);

  const next = useCallback(() => {
    if (si < h.slides.length - 1) setSi(si + 1);
    else if (hi < highlights.length - 1) {
      setHi(hi + 1);
      setSi(0);
    } else onClose();
  }, [si, hi, h.slides.length, onClose]);

  const prev = useCallback(() => {
    if (si > 0) setSi(si - 1);
    else if (hi > 0) {
      setHi(hi - 1);
      setSi(highlights[hi - 1].slides.length - 1);
    }
  }, [si, hi]);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]"
      role="dialog"
      aria-modal="true"
      aria-label={`${h.label} highlight`}
    >
      <div
        className="relative h-full w-full overflow-hidden sm:h-[min(92vh,820px)] sm:w-auto sm:aspect-[9/16] sm:rounded-xl"
        style={{ background: slide.bg, color: slide.fg }}
      >
        {/* Progress bars: the active one fills over SLIDE_MS, then onAnimationEnd advances. */}
        <div className="absolute inset-x-0 top-0 z-20 flex gap-1 p-2">
          {h.slides.map((_, i) => (
            <span key={i} className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/35">
              {i < si && <span className="block h-full w-full bg-white" />}
              {i === si && (
                <span
                  key={`${hi}-${si}`}
                  className="story-fill block h-full w-full bg-white"
                  style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                  onAnimationEnd={next}
                />
              )}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 top-4 z-20 flex items-center gap-2 px-3">
          <Avatar size={32} ring={false} />
          <span className="text-sm font-semibold">{profile.handle}</span>
          <span className="text-sm opacity-70">{h.label}</span>
          <button ref={closeRef} onClick={onClose} className="ml-auto p-1" aria-label="Close">
            <Close className="h-7 w-7" />
          </button>
        </div>

        <div className="flex h-full flex-col justify-center px-8">
          <p className="font-serif text-[clamp(2.4rem,9vw,3.6rem)] leading-[1.02]">{slide.title}</p>
          {slide.body && <p className="mt-5 whitespace-pre-line text-lg leading-snug opacity-85">{slide.body}</p>}
        </div>

        {/* Tap zones like Instagram: left third goes back, the rest goes forward; holding pauses. */}
        <div
          className="absolute inset-0 z-10 flex"
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onPointerLeave={() => setPaused(false)}
        >
          <button className="w-1/3 cursor-w-resize" onClick={prev} aria-label="Previous" />
          <button className="flex-1 cursor-e-resize" onClick={next} aria-label="Next" />
        </div>
      </div>
    </div>
  );
}
