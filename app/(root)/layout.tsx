import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { familyRegistry } from "../family-registry";
import "../globals.css";

export const metadata: Metadata = {
  title: familyRegistry.locales.en.metadata.title,
  description: familyRegistry.locales.en.metadata.description,
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
