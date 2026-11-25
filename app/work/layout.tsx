import type { Metadata } from "next";

const url = "https://www.worstisbetterr.com/work";
const title = "Work — Worstisbetterr";
const description =
  "Selected films from Worstisbetterr, an AI-native film studio. Every frame directed, nothing generic.";

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

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
