import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";

const siteUrl = "https://elshafey.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "El Shafey Family | Professional Consultants",
  description:
    "Meet the El Shafey family and discover professional expertise across generations.",
  alternates: {
    canonical: "/en",
    languages: { en: "/en", ar: "/ar", "x-default": "/en" },
  },
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1f33",
};

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
