import type { Metadata, Viewport } from "next";
import {
  Inter,
  Playfair_Display,
  Outfit,
  IBM_Plex_Sans,
  JetBrains_Mono,
  Quicksand,
  Plus_Jakarta_Sans,
  Roboto,
  Space_Grotesk,
  Manrope,
  Lora,
} from "next/font/google";
import "./globals.css";
import ThemeApplier from "./components/ThemeApplier";
import AnnouncementBar from "./components/AnnouncementBar";
import CookieBanner from "./components/CookieBanner";

/* All 10 font families loaded once at build time so the admin's theme/font
   picker can switch between them on the live site via a CSS class.
   We keep the weight arrays small (one weight per family) — additional
   weights can be added later if a pairing needs them. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "iHealth Pharmacy — Independent Pharmacy in Abbotsford, BC",
  description:
    "Prescription refills, transfers, vaccinations, minor ailment consultations, and compliance packaging. Trusted neighbourhood pharmacy care in Abbotsford, BC.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#C01D16",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        inter.variable,
        playfair.variable,
        outfit.variable,
        ibmPlexSans.variable,
        jetbrainsMono.variable,
        quicksand.variable,
        plusJakarta.variable,
        roboto.variable,
        spaceGrotesk.variable,
        manrope.variable,
        lora.variable,
        "h-full antialiased",
      ].join(" ")}
    >
      <body className="min-h-full flex flex-col font-sans font-inter-tight">
        <ThemeApplier />
        <AnnouncementBar />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}