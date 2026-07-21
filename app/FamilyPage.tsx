"use client";

import { useEffect, useState } from "react";
import type { Language } from "./i18n";

type Member = {
  id: string;
  initials: string;
  image: string;
  name: Record<Language, string>;
  relationship: Record<Language, string>;
  title: Record<Language, string>;
  description: Record<Language, string>;
};

const content = {
  en: {
    siteName: "El Shafey Family",
    navLabel: "Primary navigation",
    home: "Home",
    members: "Family Members",
    languageLabel: "Choose language",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    eyebrow: "A family of professionals",
    heroTitle: "Professional Expertise Across Generations",
    heroIntro:
      "Meet the El Shafey family, a family of experienced professionals with specialized knowledge across religious leadership, industry, law, engineering, user experience, and digital marketing.",
    heroButton: "Meet the Family",
    spectrumLabel: "Our areas of expertise",
    spectrumCenter: "One family",
    spectrumCenterSmall: "Six perspectives",
    specialties: ["Imamate", "Textiles", "Law", "HVAC", "UX", "Digital"],
    sectionEyebrow: "Meet the family",
    sectionTitle: "Six perspectives. One family.",
    sectionIntro:
      "Explore six distinct areas of professional and religious service, brought together by a shared family name.",
    imageAlt: (name: string, title: string) =>
      `Portrait placeholder for ${name}, ${title}`,
    footer: `© ${new Date().getFullYear()} El Shafey Family. All rights reserved.`,
    skip: "Skip to main content",
  },
  ar: {
    siteName: "عائلة الشافعي",
    navLabel: "التنقل الرئيسي",
    home: "الرئيسية",
    members: "أفراد العائلة",
    languageLabel: "اختر اللغة",
    menuOpen: "فتح قائمة التنقل",
    menuClose: "إغلاق قائمة التنقل",
    eyebrow: "عائلة من المهنيين",
    heroTitle: "خبرات مهنية عبر الأجيال",
    heroIntro:
      "تعرّف على عائلة الشافعي، وهي عائلة تضم نخبة من أصحاب الخبرات في الإمامة والخطابة والصناعة والقانون والهندسة وتجربة المستخدم والتسويق الرقمي.",
    heroButton: "تعرّف على العائلة",
    spectrumLabel: "مجالات خبراتنا",
    spectrumCenter: "عائلة واحدة",
    spectrumCenterSmall: "ست رؤى مهنية",
    specialties: ["الإمامة", "النسيج", "القانون", "التكييف", "تجربة المستخدم", "التسويق"],
    sectionEyebrow: "تعرّف على العائلة",
    sectionTitle: "ست رؤى مهنية. عائلة واحدة.",
    sectionIntro:
      "اكتشف ستة مجالات متنوعة من الخبرة المهنية والخدمة الدينية، يجمع بينها اسم عائلة واحد.",
    imageAlt: (name: string, title: string) =>
      `صورة بديلة لـ ${name}، ${title}`,
    footer: `© ${new Date().getFullYear()} عائلة الشافعي. جميع الحقوق محفوظة.`,
    skip: "انتقل إلى المحتوى الرئيسي",
  },
};

const members: Member[] = [
  {
    id: "sheikh-saber",
    initials: "SS",
    image: "/images/sheikh-saber-el-shafey.jpg",
    name: { en: "Sheikh Saber El Shafey", ar: "الشيخ صابر الشافعي" },
    relationship: { en: "Grandfather", ar: "الجد" },
    title: {
      en: "Imam and Preacher, Al-Azhar University Graduate",
      ar: "إمام وخطيب، خريج جامعة الأزهر الشريف",
    },
    description: {
      en: "An imam and preacher and a graduate of Al-Azhar University.",
      ar: "إمام وخطيب وخريج جامعة الأزهر الشريف.",
    },
  },
  {
    id: "samir",
    initials: "SE",
    image: "/images/samir-el-shafey.jpg",
    name: { en: "Samir El Shafey", ar: "سمير الشافعي" },
    relationship: { en: "Father", ar: "الأب" },
    title: {
      en: "Spinning and Weaving Consultant",
      ar: "مستشار الغزل والنسيج",
    },
    description: {
      en: "Consulting expertise focused on spinning and weaving.",
      ar: "خبرة استشارية تركز على مجال الغزل والنسيج.",
    },
  },
  {
    id: "faraj",
    initials: "FE",
    image: "/images/faraj-el-shafey.jpg",
    name: { en: "Faraj El Shafey", ar: "فرج الشافعي" },
    relationship: { en: "Uncle", ar: "العم" },
    title: { en: "International Legal Advisor", ar: "مستشار قانوني دولي" },
    description: {
      en: "Advisory expertise focused on international legal matters.",
      ar: "خبرة استشارية تركز على المسائل القانونية الدولية.",
    },
  },
  {
    id: "wesam",
    initials: "WE",
    image: "/images/wesam-el-shafey.jpg",
    name: { en: "Wesam El Shafey", ar: "وسام الشافعي" },
    relationship: { en: "Elder Brother", ar: "الأخ الأكبر" },
    title: {
      en: "HVAC Consultant",
      ar: "مستشار أنظمة التدفئة والتهوية وتكييف الهواء",
    },
    description: {
      en: "Consulting expertise focused on heating, ventilation, and air conditioning systems.",
      ar: "خبرة استشارية تركز على أنظمة التدفئة والتهوية وتكييف الهواء.",
    },
  },
  {
    id: "saber",
    initials: "SE",
    image: "/images/saber-el-shafey.jpg",
    name: { en: "Saber El Shafey", ar: "صابر الشافعي" },
    relationship: { en: "Family Member", ar: "أحد أفراد العائلة" },
    title: {
      en: "Google-Certified UX Designer and Researcher",
      ar: "مصمم وباحث تجربة مستخدم معتمد من Google",
    },
    description: {
      en: "Design and research practice focused on user experience.",
      ar: "ممارسة مهنية في التصميم والبحث تركز على تجربة المستخدم.",
    },
  },
  {
    id: "farid",
    initials: "FE",
    image: "/images/farid-el-shafey.jpg",
    name: { en: "Farid El Shafey", ar: "فريد الشافعي" },
    relationship: { en: "Younger Brother", ar: "الأخ الأصغر" },
    title: { en: "Digital Marketing Consultant", ar: "مستشار تسويق رقمي" },
    description: {
      en: "Consulting expertise focused on digital marketing.",
      ar: "خبرة استشارية تركز على التسويق الرقمي.",
    },
  },
];

export function FamilyPage({ language }: { language: Language }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[language];

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const rememberLanguage = (nextLanguage: Language) => {
    setMenuOpen(false);
    window.localStorage.setItem("el-shafey-language", nextLanguage);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t.skip}
      </a>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label={t.siteName}>
            <span className="brand-mark" aria-hidden="true">
              ES
            </span>
            <span className="brand-name">{t.siteName}</span>
          </a>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
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
            aria-label={t.navLabel}
            data-open={menuOpen}
          >
            <div className="nav-links">
              <a href="#home" onClick={() => setMenuOpen(false)}>
                {t.home}
              </a>
              <a href="#family" onClick={() => setMenuOpen(false)}>
                {t.members}
              </a>
            </div>

            <div className="language-switcher" role="group" aria-label={t.languageLabel}>
              <a
                href="/en"
                className={language === "en" ? "active" : ""}
                aria-current={language === "en" ? "page" : undefined}
                hrefLang="en"
                lang="en"
                onClick={() => rememberLanguage("en")}
              >
                EN
              </a>
              <span aria-hidden="true" />
              <a
                href="/ar"
                className={language === "ar" ? "active" : ""}
                aria-current={language === "ar" ? "page" : undefined}
                hrefLang="ar"
                lang="ar"
                onClick={() => rememberLanguage("ar")}
              >
                العربية
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span aria-hidden="true" />
                {t.eyebrow}
              </p>
              <h1 id="hero-title">{t.heroTitle}</h1>
              <p className="hero-intro">{t.heroIntro}</p>
              <a className="primary-button" href="#family">
                <span>{t.heroButton}</span>
                <span className="button-arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>

            <div className="expertise-visual" aria-label={t.spectrumLabel}>
              <div className="visual-frame">
                <p className="visual-label">{t.spectrumLabel}</p>
                <div className="orbit" aria-hidden="true">
                  <div className="orbit-ring orbit-ring-outer" />
                  <div className="orbit-ring orbit-ring-inner" />
                  <div className="orbit-center">
                    <span className="orbit-monogram">ES</span>
                    <strong>{t.spectrumCenter}</strong>
                    <small>{t.spectrumCenterSmall}</small>
                  </div>
                  {t.specialties.map((specialty, index) => (
                    <span className={`specialty specialty-${index + 1}`} key={specialty}>
                      <i />
                      {specialty}
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
              <p className="section-eyebrow">{t.sectionEyebrow}</p>
              <h2 id="family-title">{t.sectionTitle}</h2>
              <p>{t.sectionIntro}</p>
            </header>

            <div className="member-grid">
              {members.map((member, index) => (
                <article className="member-card" key={member.id}>
                  <div className="portrait-wrap">
                    <span className="portrait-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="portrait-fallback" aria-hidden="true">
                      <span>{member.initials}</span>
                    </div>
                    {/* Replace the local placeholder with the real portrait at public/images/[name].jpg. */}
                    <img
                      src={member.image}
                      width="800"
                      height="1000"
                      loading="lazy"
                      alt={t.imageAlt(member.name[language], member.title[language])}
                      onError={(event) => {
                        event.currentTarget.hidden = true;
                      }}
                    />
                  </div>
                  <div className="member-content">
                    <div className="member-heading-row">
                      <div>
                        <p className="relationship">{member.relationship[language]}</p>
                        <h3>{member.name[language]}</h3>
                      </div>
                      <span className="card-mark" aria-hidden="true">
                        ES
                      </span>
                    </div>
                    <p className="member-title">{member.title[language]}</p>
                    <p className="member-description">{member.description[language]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <a className="footer-brand" href="#home" aria-label={t.siteName}>
            <span aria-hidden="true">ES</span>
            {t.siteName}
          </a>
          <p>{t.footer}</p>
        </div>
      </footer>
    </>
  );
}
