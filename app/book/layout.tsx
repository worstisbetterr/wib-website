import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ubuntu-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Book a Free Call — Worstisbetterr",
  description:
    "30 minutes with the worst agency in the world. Pick a slot with Prameet Patani, Co-Founder.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WIB Book",
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
