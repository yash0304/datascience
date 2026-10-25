// Line icons drawn to match Instagram's 24px, 2px-stroke style.
type P = { className?: string; filled?: boolean };

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Heart = ({ className, filled }: P) => (
  <svg {...base} className={className} fill={filled ? "currentColor" : "none"} aria-hidden>
    <path d="M12 20.5s-7.5-4.4-9.3-9.2C1.4 7.8 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.6 3.3 4.3 6.8-1.8 4.8-9.3 9.2-9.3 9.2z" />
  </svg>
);

export const Comment = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M20.7 16.4A9 9 0 1 0 17 20.1L21 21z" />
  </svg>
);

export const Send = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M22 3 9.2 10.1M22 3l-7 18-4-8.5L2 9z" />
  </svg>
);

export const Bookmark = ({ className, filled }: P) => (
  <svg {...base} className={className} fill={filled ? "currentColor" : "none"} aria-hidden>
    <path d="M19 21l-7-6.3L5 21V3h14z" />
  </svg>
);

export const Grid = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="3" y="3" width="18" height="18" />
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
  </svg>
);

export const Tag = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M10.2 18.7 12 21l1.8-2.3H19a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11.7a2 2 0 0 0 2 2z" />
    <circle cx="12" cy="9" r="2.6" />
    <path d="M7.5 16c.8-2 2.5-3 4.5-3s3.7 1 4.5 3" />
  </svg>
);

export const Close = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const Chevron = ({ className, dir = "right" }: P & { dir?: "left" | "right" }) => (
  <svg {...base} className={className} aria-hidden>
    <path d={dir === "right" ? "m9 6 6 6-6 6" : "m15 6-6 6 6 6"} />
  </svg>
);

export const Lock = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export const Moon = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
  </svg>
);

export const Sun = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const Carousel = ({ className }: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} className={className} fill="currentColor" aria-hidden>
    <path d="M7 3h11a3 3 0 0 1 3 3v11h-2V6a1 1 0 0 0-1-1H7z" />
    <rect x="3" y="7" width="14" height="14" rx="2" />
  </svg>
);
