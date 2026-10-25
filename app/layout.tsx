import type { Metadata, Viewport } from "next";
import { Grand_Hotel, Instrument_Serif } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});
const grandHotel = Grand_Hotel({ subsets: ["latin"], weight: "400", variable: "--font-grand-hotel" });

export const metadata: Metadata = {
  title: `${profile.name} (@${profile.handle})`,
  description: profile.bio.join(" "),
  openGraph: {
    title: `${profile.name} (@${profile.handle})`,
    description: profile.bio.join(" "),
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// Runs before paint so the page never flashes the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${grandHotel.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
