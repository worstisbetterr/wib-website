import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

const ubuntuMono = Ubuntu_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  display: "swap",
});

const url = "https://www.worstisbetterr.com/contact";
const title = "Start a Project — Worstisbetterr";
const description =
  "Tell us what you're launching. Book a 30-minute discovery call with Prameet Patani.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "Worstisbetterr",
    images: [
      {
        url: "/brand/og-image.jpg",
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
    title,
    description,
    images: ["/brand/og-image.jpg"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${ubuntu.variable} ${ubuntuMono.variable} min-h-screen bg-[#0A0908] text-[#D6D3CD] selection:bg-[#E62E30] selection:text-white`}
      style={{
        fontFamily: "var(--font-ubuntu), sans-serif",
      }}
    >
      {children}
    </div>
  );
}
