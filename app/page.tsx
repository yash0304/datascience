import { Feed } from "@/components/Feed";
import { Highlights } from "@/components/Highlights";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <nav className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[935px] items-center justify-between px-4">
          <a href="#" className="font-script text-[1.9rem] leading-none">
            {profile.handle}
          </a>
          <ThemeToggle />
        </div>
      </nav>

      <main className="mx-auto max-w-[935px] pb-16">
        <ProfileHeader />
        <Highlights />
        <Feed />
      </main>

      <footer className="pb-10 text-center text-xs text-muted">
        © {new Date().getFullYear()} {profile.name} · Built with Next.js, hosted on Vercel
      </footer>
    </>
  );
}
