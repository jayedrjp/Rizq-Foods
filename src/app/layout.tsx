import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rizq Foods",
  description:
    "Rizq Foods brings premium mangoes, honey, dates, nuts, mustard oil and ghee to families across Bangladesh.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Root layout is intentionally minimal: fonts + global styles only.
// The storefront chrome (Navbar, CategoryNavbar, Footer, cart UI) lives in
// app/(storefront)/layout.tsx, and the admin chrome lives in
// app/admin/layout.tsx. This keeps the two experiences fully independent —
// admin pages never pull in cart state, storefront nav, or storefront fonts
// weight variants they don't need.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
