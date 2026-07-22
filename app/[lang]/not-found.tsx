import type { Metadata } from "next";
import Link from "next/link";
import { familyRegistry } from "../family-registry";

export const metadata: Metadata = {
  title: "Page not found | الصفحة غير موجودة",
  robots: { index: false, follow: true },
};

export default function LocalizedNotFound() {
  const english = familyRegistry.locales.en.notFound;
  const arabic = familyRegistry.locales.ar.notFound;

  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <p className="not-found-code">404</p>
        <div className="not-found-copy">
          <section aria-labelledby="not-found-en">
            <h1 id="not-found-en">{english.title}</h1>
            <p>{english.description}</p>
            <Link href="/en" hrefLang="en">
              {english.homeLink}
            </Link>
          </section>
          <section lang="ar" dir="rtl" aria-labelledby="not-found-ar">
            <h2 id="not-found-ar">{arabic.title}</h2>
            <p>{arabic.description}</p>
            <Link href="/ar" hrefLang="ar">
              {arabic.homeLink}
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
