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
import ChunkErrorRecovery from "./components/ChunkErrorRecovery";
import AnnouncementBar from "./components/AnnouncementBar";
import CookieBanner from "./components/CookieBanner";
import WhatsAppButton from "./components/WhatsAppButton";
import TextSizeAdjuster from "./components/TextSizeAdjuster";
import { PHARMACY_INFO } from "@/data/pharmacy-info";

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
  metadataBase: new URL("https://ihealthpharmacy.ca"),
  title: {
    default: "iHealth Pharmacy — Independent Pharmacy in Chilliwack, BC",
    template: "%s | iHealth Pharmacy",
  },
  description:
    "Independent community pharmacy in Chilliwack, BC. Fast prescription refills, walk-in 21 minor ailments prescribing covered by BC MSP, custom compounding, and free same-day local delivery.",
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
      "Your neighbourhood independent pharmacy in Chilliwack. Fast refills, walk-in 21 minor ailments prescribing, compliance packaging, and free same-day delivery.",
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
      "Your neighbourhood independent pharmacy in Chilliwack. Fast refills, walk-in 21 minor ailments prescribing, compliance packaging, and free same-day delivery.",
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
  themeColor: "#C01D16",
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
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "15:00",
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
          name: "21 Minor Ailments Pharmacist Prescribing",
          description: "Assessment and prescribing for common conditions, 100% covered by BC MSP.",
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
        {/* A redeploy replaces /_next/static with freshly hashed files. A tab
            that already has this page's HTML open can then request a script
            or stylesheet that no longer exists. Catch that resource failure
            here, inline and outside the app bundle, so it still runs even
            when the main JS chunk itself is the one that 404s. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              var KEY = "ihealth_asset_reload_at";
              var COOLDOWN = 10000;
              window.addEventListener("error", function (event) {
                var target = event.target;
                if (!target || target === window) return;
                var url = target.src || target.href || "";
                if (url.indexOf("/_next/static/") === -1) return;
                var last = Number(sessionStorage.getItem(KEY) || 0);
                if (Date.now() - last < COOLDOWN) return;
                sessionStorage.setItem(KEY, String(Date.now()));
                window.location.reload();
              }, true);
            })();`,
          }}
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