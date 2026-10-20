import type { Metadata, Viewport } from "next";
import { Figtree, Gloock } from "next/font/google";
import "./globals.css";

const gloock = Gloock({ variable: "--font-gloock", weight: "400", subsets: ["latin"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "cherrryyyii · everything I actually use",
  description: "The moisturiser, toner mist, lip tint and other skincare and makeup @cherrryyyii actually uses, each one a tap away on Shopee.",
  openGraph: {
    title: "Everything I actually use.",
    description: "The skincare and makeup @cherrryyyii uses, one tap to Shopee.",
    locale: "en_MY",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#FDF7F8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${gloock.variable} ${figtree.variable} antialiased`}>{children}</body>
    </html>
  );
}
