import type { Metadata } from "next";

const url = "https://www.worstisbetterr.com/privacy";
const title = "Privacy Policy — Worstisbetterr";
const description = "What we do with your data, and what we don't.";

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

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
