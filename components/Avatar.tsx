import { profile } from "@/data/profile";

// Monogram avatar inside the story ring. Set profile.avatar to a /public image to use a photo.
export function Avatar({ size, ring = true }: { size: number; ring?: boolean }) {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  const pad = ring ? Math.max(2, Math.round(size / 40)) : 0;

  return (
    <span
      className={`inline-block shrink-0 rounded-full ${ring ? "story-ring" : ""}`}
      style={{ width: size, height: size, padding: pad }}
    >
      <span className="block h-full w-full rounded-full bg-bg" style={{ padding: ring ? pad : 0 }}>
        {profile.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatar} alt={profile.name} className="h-full w-full rounded-full object-cover" />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center rounded-full bg-[#f6efe2] font-serif text-[#1f3a2e] italic"
            style={{ fontSize: size * 0.36 }}
          >
            {initials}
          </span>
        )}
      </span>
    </span>
  );
}
