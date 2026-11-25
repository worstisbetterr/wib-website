import BlinkingLogo from "@/components/brand/BlinkingLogo";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { siteConfig } from "@/content/site";
import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const defaultTitle = "Worstisbetterr — The Worst Agency in the World";
const defaultDescription =
  "AI-native film studio making AI commercials and performance ads for brands that would rather be unforgettable than safe. Anyone can generate. We direct.";

export const viewport: Viewport = {
  themeColor: "#0A0908",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: defaultTitle,
  description: defaultDescription,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Worstisbetterr",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-precomposed.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteConfig.url,
    siteName: "Worstisbetterr",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Worstisbetterr — Anyone can generate. We direct.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${chakra.variable} ${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function rm(){var f=document.getElementById("nl-badge-frame");if(f)f.remove();var s=document.querySelector("script[data-nf-variant]");if(s){delete s.dataset.nfVariant;s.remove();}}rm();var o=new MutationObserver(rm);o.observe(document.documentElement,{childList:true,subtree:true});window.addEventListener("DOMContentLoaded",rm);window.addEventListener("load",rm);})();`,
          }}
        />
      </head>
      <body className="bg-ink text-paper flex flex-col min-h-screen selection:bg-red-bright selection:text-paper relative overflow-x-hidden transition-colors duration-300">
        <div className="hidden" aria-hidden="true">
          <BlinkingLogo />
        </div>
        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
