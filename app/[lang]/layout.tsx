import type { Viewport } from "next";
import type { ReactNode } from "react";
import { familyRegistry, isLanguage, languages } from "../family-registry";
import "../globals.css";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1f33",
};

export default async function LanguageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = isLanguage(lang) ? lang : familyRegistry.defaultLanguage;
  const copy = familyRegistry.locales[language];

  return (
    <html lang={language} dir={copy.direction}>
      <body>{children}</body>
    </html>
  );
}
