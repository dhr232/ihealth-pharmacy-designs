import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeApplier from "./components/ThemeApplier";
import ChunkErrorRecovery from "./components/ChunkErrorRecovery";
import AnnouncementBar from "./components/AnnouncementBar";
import CookieBanner from "./components/CookieBanner";
import WhatsAppButton from "./components/WhatsAppButton";
import TextSizeAdjuster from "./components/TextSizeAdjuster";
import { PHARMACY_INFO } from "@/data/pharmacy-info";

/* All 10 font families loaded once at build time so the admin's theme/font
   picker can switch between them on the live site via a CSS class.
   Self-hosted as static WOFF2 files under public/fonts/ (latin subset,
   fetched from Google Fonts' CSS2 API once) via next/font/local instead of
   next/font/google, so `next build` no longer depends on a live network
   call to Google at build time — a dependency that has failed
   intermittently on CI/hosting runners. */
const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../public/fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/inter-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
});

const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  src: [
    { path: "../public/fonts/playfair-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/playfair-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/playfair-700.woff2", weight: "700", style: "normal" },
  ],
});

const outfit = localFont({
  variable: "--font-outfit",
  display: "swap",
  src: [
    { path: "../public/fonts/outfit-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/outfit-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/outfit-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/outfit-700.woff2", weight: "700", style: "normal" },
  ],
});

const ibmPlexSans = localFont({
  variable: "--font-ibm-plex-sans",
  display: "swap",
  src: [
    { path: "../public/fonts/ibm-plex-sans-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/ibm-plex-sans-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ibm-plex-sans-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/ibm-plex-sans-700.woff2", weight: "700", style: "normal" },
  ],
});

const jetbrainsMono = localFont({
  variable: "--font-jetbrains-mono",
  display: "swap",
  src: [
    { path: "../public/fonts/jetbrains-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/jetbrains-mono-500.woff2", weight: "500", style: "normal" },
  ],
});

const quicksand = localFont({
  variable: "--font-quicksand",
  display: "swap",
  src: [
    { path: "../public/fonts/quicksand-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/quicksand-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/quicksand-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/quicksand-700.woff2", weight: "700", style: "normal" },
  ],
});

const plusJakarta = localFont({
  variable: "--font-plus-jakarta",
  display: "swap",
  src: [
    { path: "../public/fonts/plus-jakarta-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/plus-jakarta-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/plus-jakarta-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/plus-jakarta-700.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/plus-jakarta-800.woff2", weight: "800", style: "normal" },
  ],
});

const roboto = localFont({
  variable: "--font-roboto",
  display: "swap",
  src: [
    { path: "../public/fonts/roboto-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/roboto-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/roboto-700.woff2", weight: "700", style: "normal" },
  ],
});

const spaceGrotesk = localFont({
  variable: "--font-space-grotesk",
  display: "swap",
  src: [
    { path: "../public/fonts/space-grotesk-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/space-grotesk-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/space-grotesk-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/space-grotesk-700.woff2", weight: "700", style: "normal" },
  ],
});

const manrope = localFont({
  variable: "--font-manrope",
  display: "swap",
  src: [
    { path: "../public/fonts/manrope-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/manrope-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/manrope-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/manrope-700.woff2", weight: "700", style: "normal" },
  ],
});

const lora = localFont({
  variable: "--font-lora",
  display: "swap",
  src: [
    { path: "../public/fonts/lora-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/lora-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/lora-600.woff2", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ihealthpharmacy.ca"),
  title: {
    default: "iHealth Pharmacy — Independent Pharmacy in Chilliwack, BC",
    template: "%s | iHealth Pharmacy",
  },
  description:
    "Independent community pharmacy in Chilliwack, BC. Fast prescription refills, walk-in minor ailments prescribing, custom compounding, and free same-day local delivery.",
  keywords: [
    "Pharmacy Chilliwack",
    "Independent pharmacy Chilliwack",
    "Prescription refill Chilliwack",
    "Minor ailments prescribing BC",
    "Pharmacist prescribing Chilliwack",
    "Vaccinations Chilliwack",
    "Shingrix vaccine Chilliwack",
    "Blister pack pharmacy Chilliwack",
    "Free pharmacy delivery Chilliwack",
    "Yale Rd pharmacy Chilliwack",
    "iHealth Pharmacy",
  ],
  authors: [{ name: "iHealth Pharmacy Team", url: "https://ihealthpharmacy.ca" }],
  creator: "iHealth Pharmacy Ltd.",
  publisher: "iHealth Pharmacy Ltd.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "iHealth Pharmacy — Independent Pharmacy in Chilliwack, BC",
    description:
      "Your neighbourhood independent pharmacy in Chilliwack. Fast refills, walk-in minor ailments prescribing, compliance packaging, and free same-day delivery.",
    url: "https://ihealthpharmacy.ca",
    siteName: "iHealth Pharmacy",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/services/all-services.jpg",
        width: 1200,
        height: 630,
        alt: "iHealth Pharmacy Chilliwack, BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iHealth Pharmacy — Independent Pharmacy in Chilliwack, BC",
    description:
      "Your neighbourhood independent pharmacy in Chilliwack. Fast refills, walk-in minor ailments prescribing, compliance packaging, and free same-day delivery.",
    images: ["/services/all-services.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3D5FE0",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Pharmacy", "MedicalBusiness"],
  name: PHARMACY_INFO.name,
  legalName: PHARMACY_INFO.legalName,
  description:
    "Independent community pharmacy in Chilliwack, BC offering prescription refills, minor ailments prescribing, custom compounding, MyHealthPack blister packs, and free same-day local delivery.",
  url: "https://ihealthpharmacy.ca",
  telephone: `+1-${PHARMACY_INFO.phoneRaw}`,
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card, Debit Card, Direct Insurance Billing",
  priceRange: "$$",
  knowsLanguage: ["English", "Punjabi", "Hindi"],
  medicalSpecialty: "CommunityPharmacy",
  address: {
    "@type": "PostalAddress",
    streetAddress: PHARMACY_INFO.address.street,
    addressLocality: PHARMACY_INFO.address.city,
    addressRegion: PHARMACY_INFO.address.province,
    postalCode: PHARMACY_INFO.address.postalCode,
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.1687,
    longitude: -121.9545,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Clinical Pharmacy Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Minor Ailments Pharmacist Prescribing",
          description: "Assessment and prescribing for common minor ailment conditions.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Routine & Travel Vaccinations",
          description: "Flu shots, COVID-19, Shingrix, and routine immunizations.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "MyHealthPack Blister Compliance Packaging",
          description: "Complimentary pre-sorted medication blister packaging.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "DeliveryService",
          name: "Free Same-Day Prescription Delivery",
          description: "Free prescription and medication delivery in Chilliwack for orders over $25.",
        },
      },
    ],
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans font-inter-tight">
        <ChunkErrorRecovery />
        <ThemeApplier />
        <AnnouncementBar />
        {children}
        <CookieBanner />
        <WhatsAppButton />
        <TextSizeAdjuster />
        <div id="google_translate_element" aria-hidden="true" style={{ display: "none" }} />
      </body>
    </html>
  );
}