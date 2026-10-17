import type { Metadata, Viewport } from "next";
import { Gloock, Figtree } from "next/font/google";
import "./globals.css";

const gloock = Gloock({ variable: "--font-gloock", weight: "400", subsets: ["latin"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rutin Cherry — skincare & makeup",
  description: "Rutin skincare dan makeup @cherrryyyii untuk kulit Malaysia. Ikut step satu per satu, terus beli kat Shopee.",
  openGraph: {
    title: "Jerebu dah sampai. Ni rutin saya.",
    description: "Rutin skincare & makeup @cherrryyyii, step by step.",
    locale: "ms_MY",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#FDF7F8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ms">
      <body className={`${gloock.variable} ${figtree.variable} antialiased`}>{children}</body>
    </html>
  );
}
