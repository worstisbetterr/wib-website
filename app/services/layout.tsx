import type { Metadata } from "next";

const url = "https://www.worstisbetterr.com/services";
const title = "Services — Worstisbetterr · Seven AI Film Departments";
const description =
  "Seven departments. One standard. Worstisbetterr directs films, ads, trailers and entire worlds for brands, studios, game makers and artists. Anyone can generate. We direct.";

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

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
