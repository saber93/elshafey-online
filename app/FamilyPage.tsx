"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { familyRegistry, type Language } from "./family-registry";

export function FamilyPage({ language }: { language: Language }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = familyRegistry.locales[language];
  const navigation = copy.navigation;

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {navigation.skip}
      </a>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label={copy.siteName}>
            <span className="brand-mark" aria-hidden="true">
              ES
            </span>
            <span className="brand-name">{copy.siteName}</span>
          </a>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? navigation.menuClose : navigation.menuOpen}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <nav
            id="primary-navigation"
            className="primary-nav"
            aria-label={navigation.label}
            data-open={menuOpen}
          >
            <div className="nav-links">
              <a href="#home" onClick={() => setMenuOpen(false)}>
                {navigation.home}
              </a>
              <a href="#family" onClick={() => setMenuOpen(false)}>
                {navigation.members}
              </a>
            </div>

            <div
              className="language-switcher"
              role="group"
              aria-label={navigation.languageLabel}
            >
              <Link
                href="/en"
                className={language === "en" ? "active" : ""}
                aria-current={language === "en" ? "page" : undefined}
                hrefLang="en"
                lang="en"
                onClick={() => setMenuOpen(false)}
              >
                EN
              </Link>
              <span aria-hidden="true" />
              <Link
                href="/ar"
                className={language === "ar" ? "active" : ""}
                aria-current={language === "ar" ? "page" : undefined}
                hrefLang="ar"
                lang="ar"
                onClick={() => setMenuOpen(false)}
              >
                العربية
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span aria-hidden="true" />
                {copy.hero.eyebrow}
              </p>
              <h1 id="hero-title">{copy.hero.title}</h1>
              <p className="hero-intro">{copy.hero.introduction}</p>
              <a className="primary-button" href="#family">
                <span>{copy.hero.button}</span>
                <span className="button-arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>

            <div className="expertise-visual" aria-label={copy.hero.fieldsLabel}>
              <div className="visual-frame">
                <p className="visual-label">{copy.hero.fieldsLabel}</p>
                <div className="orbit" aria-hidden="true">
                  <div className="orbit-ring orbit-ring-outer" />
                  <div className="orbit-ring orbit-ring-inner" />
                  <div className="orbit-center">
                    <span className="orbit-monogram">ES</span>
                    <strong>{copy.hero.center}</strong>
                    <small>{copy.hero.centerSmall}</small>
                  </div>
                  {familyRegistry.members.map((member, index) => (
                    <span
                      className={`specialty specialty-${index + 1}`}
                      key={member.id}
                    >
                      <i />
                      {member.field[language]}
                    </span>
                  ))}
                </div>
                <div className="visual-index" aria-hidden="true">
                  <span>01</span>
                  <span className="visual-line" />
                  <span>06</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="family-section" id="family" aria-labelledby="family-title">
          <div className="section-inner">
            <header className="section-heading">
              <p className="section-eyebrow">{copy.directory.eyebrow}</p>
              <h2 id="family-title">{copy.directory.title}</h2>
              <p>{copy.directory.introduction}</p>
            </header>

            <div className="member-grid">
              {familyRegistry.members.map((member, index) => (
                <article className="member-card" key={member.id}>
                  <div
                    className={`portrait-wrap${
                      "portrait" in member ? " portrait-wrap-real" : ""
                    }`}
                  >
                    <span className="portrait-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="portrait-fallback" aria-hidden="true">
                      <span>{member.initials}</span>
                    </div>
                    {"portrait" in member ? (
                      <Image
                        className="member-portrait"
                        src={member.portrait.src}
                        width={member.portrait.width}
                        height={member.portrait.height}
                        sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 1040px) calc(50vw - 31px), 380px"
                        alt={member.portrait.alt[language]}
                      />
                    ) : null}
                  </div>
                  <div className="member-content">
                    <div className="member-heading-row">
                      <div>
                        <p className="field-label">{copy.directory.fieldLabel}</p>
                        <h3>{member.name[language]}</h3>
                      </div>
                      <span className="card-mark" aria-hidden="true">
                        ES
                      </span>
                    </div>
                    <p className="member-field">{member.field[language]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <a className="footer-brand" href="#home" aria-label={copy.siteName}>
            <span aria-hidden="true">ES</span>
            {copy.siteName}
          </a>
          <p>
            © {new Date().getFullYear()} {copy.footer}
          </p>
        </div>
      </footer>
    </>
  );
}
