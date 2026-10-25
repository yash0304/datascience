"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { projects, type Project } from "@/data/projects";
import { Avatar } from "./Avatar";
import { Cover, SlideView } from "./Cover";
import { Bookmark, Chevron, Close, Comment, Heart, Lock, Send } from "./Icons";

type Props = { index: number; onClose: () => void; onPrev?: () => void; onNext?: () => void };

const hashtag = (s: string) => "#" + s.toLowerCase().replace(/[^a-z0-9]/g, "");

function readLiked(slug: string) {
  try {
    return localStorage.getItem(`liked:${slug}`) === "1";
  } catch {
    return false;
  }
}

export function PostModal({ index, onClose, onPrev, onNext }: Props) {
  const p = projects[index];
  const frames = 1 + p.slides.length;
  const [frame, setFrame] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pop, setPop] = useState(0);
  const [toast, setToast] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFrame(0);
    setLiked(readLiked(p.slug));
  }, [p.slug]);

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Arrows move through the carousel first, then on to the neighbouring post.
      if (e.key === "ArrowRight") frame < frames - 1 ? setFrame(frame + 1) : onNext?.();
      if (e.key === "ArrowLeft") frame > 0 ? setFrame(frame - 1) : onPrev?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [frame, frames, onClose, onNext, onPrev]);

  const setLike = (v: boolean) => {
    setLiked(v);
    try {
      localStorage.setItem(`liked:${p.slug}`, v ? "1" : "0");
    } catch {}
  };

  const share = async () => {
    const url = `${location.origin}${location.pathname}#p/${p.slug}`;
    try {
      if (navigator.share) await navigator.share({ title: p.title, text: p.tagline, url });
      else {
        await navigator.clipboard.writeText(url);
        setToast("Link copied");
      }
    } catch {
      return;
    }
    setTimeout(() => setToast(""), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-stretch justify-center bg-[var(--scrim)] md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Desktop chrome: close, previous and next post */}
      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute top-3 right-3 z-10 hidden p-2 text-white md:block"
        aria-label="Close"
      >
        <Close className="h-8 w-8" />
      </button>
      {onPrev && <SideArrow dir="left" onClick={onPrev} />}
      {onNext && <SideArrow dir="right" onClick={onNext} />}

      <article className="flex w-full flex-col overflow-y-auto bg-surface md:h-[min(88vh,52rem,calc(100vw-8rem-25rem))] md:w-auto md:flex-row md:overflow-hidden md:rounded-r">
        {/* Phone top bar */}
        <div className="sticky top-0 z-10 flex items-center border-b border-line bg-surface px-2 py-2 md:hidden">
          <button onClick={onClose} className="p-2" aria-label="Back">
            <Chevron dir="left" className="h-6 w-6" />
          </button>
          <p className="flex-1 pr-10 text-center font-semibold">Projects</p>
        </div>
        <PostHeader p={p} className="md:hidden" />

        {/* Media */}
        <div className="relative aspect-square w-full shrink-0 bg-black md:h-full md:w-auto">
          <div
            className="h-full w-full"
            onDoubleClick={() => {
              setLike(true);
              setPop((n) => n + 1);
            }}
          >
            {frame === 0 ? <Cover project={p} size="full" /> : <SlideView project={p} slide={p.slides[frame - 1]} />}
          </div>
          {pop > 0 && (
            <span key={pop} className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <Heart filled className="heart-pop h-28 w-28 text-white drop-shadow-lg" />
            </span>
          )}
          {frame > 0 && <FrameArrow dir="left" onClick={() => setFrame(frame - 1)} />}
          {frame < frames - 1 && <FrameArrow dir="right" onClick={() => setFrame(frame + 1)} />}
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1">
            {Array.from({ length: frames }, (_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === frame ? "bg-accent" : "bg-white/50"}`} />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex w-full flex-col md:w-[25rem] md:shrink-0 md:border-l md:border-line">
          <PostHeader p={p} className="hidden border-b border-line md:flex" />

          <div ref={commentsRef} className="order-2 space-y-4 px-4 pb-4 md:order-none md:flex-1 md:overflow-y-auto md:py-4">
            <CommentRow strong={profile.handle}>
              <span className="font-serif text-base italic">{p.tagline}</span> {p.caption}{" "}
              <span className="text-link">{p.stack.map(hashtag).join(" ")}</span>
            </CommentRow>
            {p.features.map((f) => (
              <CommentRow key={f} strong={profile.handle} reply>
                {f}
              </CommentRow>
            ))}
          </div>

          <div className="order-1 border-line px-4 pt-1.5 pb-3 md:order-none md:border-t md:pt-2">
            <div className="flex items-center gap-1 -ml-2">
              <button
                onClick={() => setLike(!liked)}
                className={`p-2 transition active:scale-90 ${liked ? "text-like" : "hover:text-muted"}`}
                aria-label={liked ? "Unlike" : "Like"}
                aria-pressed={liked}
              >
                <Heart filled={liked} className="h-6 w-6" />
              </button>
              <button
                onClick={() => commentsRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                className="p-2 hover:text-muted"
                aria-label="Read the details"
              >
                <Comment className="h-6 w-6 -scale-x-100" />
              </button>
              <button onClick={share} className="p-2 hover:text-muted" aria-label="Share">
                <Send className="h-6 w-6" />
              </button>
              {p.repo === "private" ? (
                <span className="ml-auto flex items-center gap-1 text-xs text-muted" title="The code is in a private repo">
                  <Lock className="h-4 w-4" /> Private repo
                </span>
              ) : (
                <a href={p.repo} target="_blank" rel="noreferrer" className="ml-auto p-2" aria-label="View code">
                  <Bookmark className="h-6 w-6" />
                </a>
              )}
            </div>
            <p className="text-sm font-semibold">{liked ? "Liked by you" : "Be the first to like this"}</p>
            <p className="mt-1 text-[11px] tracking-wide text-muted uppercase">
              {p.status} · {p.year}
            </p>
          </div>
        </div>
      </article>

      {toast && (
        <p className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-ink px-4 py-2 text-sm text-bg">{toast}</p>
      )}
    </div>
  );
}

function PostHeader({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <header className={`flex items-center gap-3 px-4 py-3 ${className}`}>
      <Avatar size={36} />
      <div className="min-w-0 text-sm leading-tight">
        <p>
          <span className="font-semibold">{profile.handle}</span>
          <span className="text-muted"> • {p.title}</span>
        </p>
        <p className="truncate text-xs">{p.place}</p>
      </div>
    </header>
  );
}

function CommentRow({ strong, reply, children }: { strong: string; reply?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex gap-3 text-sm leading-[1.45] ${reply ? "pl-12" : ""}`}>
      <Avatar size={reply ? 24 : 32} ring={!reply} />
      <p className="min-w-0">
        <span className="mr-1.5 font-semibold">{strong}</span>
        {children}
      </p>
    </div>
  );
}

function FrameArrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-1 text-black shadow ${
        dir === "left" ? "left-3" : "right-3"
      }`}
      aria-label={dir === "left" ? "Previous slide" : "Next slide"}
    >
      <Chevron dir={dir} className="h-4 w-4" />
    </button>
  );
}

function SideArrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 text-black md:block ${
        dir === "left" ? "left-4" : "right-4"
      }`}
      aria-label={dir === "left" ? "Previous project" : "Next project"}
    >
      <Chevron dir={dir} className="h-5 w-5" />
    </button>
  );
}
