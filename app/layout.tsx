import type { Metadata, Viewport } from "next";
import "./globals.css";

// Update this value if a custom production domain replaces the Netlify URL.
const siteUrl = "https://elshafey-family.netlify.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1f33",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "El Shafey Family | Professional Consultants",
  description:
    "Meet the El Shafey family and discover expertise in religious leadership, spinning and weaving, international law, HVAC consulting, UX design and research, and digital marketing.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "El Shafey Family | عائلة الشافعي",
    title: "El Shafey Family | Professional Consultants",
    description:
      "Expertise across religious leadership, spinning and weaving, international law, HVAC, UX design and research, and digital marketing.",
    locale: "en_US",
    alternateLocale: "ar_AR",
    images: [
      {
        url: "/og-v2.png",
        width: 1200,
        height: 630,
        alt: "El Shafey Family — Professional Expertise Across Generations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Shafey Family | Professional Consultants",
    description:
      "Professional and religious expertise across six disciplines, united by one family.",
    images: ["/og-v2.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile-page`,
      url: `${siteUrl}/`,
      name: "El Shafey Family | عائلة الشافعي",
      headline: "Professional Expertise Across Generations | خبرات مهنية عبر الأجيال",
      description:
        "A bilingual family profile presenting expertise in religious leadership, textiles, international law, HVAC, UX design and research, and digital marketing. صفحة تعريفية ثنائية اللغة تعرض خبرات عائلة الشافعي في الإمامة والخطابة ومجالات مهنية متنوعة.",
      mainEntity: { "@id": `${siteUrl}/#family-members` },
      inLanguage: ["en", "ar"],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#family-members`,
      name: "El Shafey Family Members | أفراد عائلة الشافعي",
      numberOfItems: 6,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Person",
            name: "Sheikh Saber El Shafey",
            alternateName: "الشيخ صابر الشافعي",
            jobTitle: [
              "Imam and Preacher, Al-Azhar University Graduate",
              "إمام وخطيب، خريج جامعة الأزهر الشريف",
            ],
            description:
              "An imam and preacher and a graduate of Al-Azhar University. إمام وخطيب وخريج جامعة الأزهر الشريف.",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Person",
            name: "Samir El Shafey",
            alternateName: "سمير الشافعي",
            jobTitle: ["Spinning and Weaving Consultant", "مستشار الغزل والنسيج"],
            description:
              "Consulting expertise focused on spinning and weaving. خبرة استشارية تركز على مجال الغزل والنسيج.",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Person",
            name: "Faraj El Shafey",
            alternateName: "فرج الشافعي",
            jobTitle: ["International Legal Advisor", "مستشار قانوني دولي"],
            description:
              "Advisory expertise focused on international legal matters. خبرة استشارية تركز على المسائل القانونية الدولية.",
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "Person",
            name: "Wesam El Shafey",
            alternateName: "وسام الشافعي",
            jobTitle: [
              "HVAC Consultant",
              "مستشار أنظمة التدفئة والتهوية وتكييف الهواء",
            ],
            description:
              "Consulting expertise focused on HVAC systems. خبرة استشارية تركز على أنظمة التدفئة والتهوية وتكييف الهواء.",
          },
        },
        {
          "@type": "ListItem",
          position: 5,
          item: {
            "@type": "Person",
            name: "Saber El Shafey",
            alternateName: "صابر الشافعي",
            jobTitle: [
              "Google-Certified UX Designer and Researcher",
              "مصمم وباحث تجربة مستخدم معتمد من Google",
            ],
            description:
              "Design and research practice focused on user experience. ممارسة مهنية في التصميم والبحث تركز على تجربة المستخدم.",
          },
        },
        {
          "@type": "ListItem",
          position: 6,
          item: {
            "@type": "Person",
            name: "Farid El Shafey",
            alternateName: "فريد الشافعي",
            jobTitle: ["Digital Marketing Consultant", "مستشار تسويق رقمي"],
            description:
              "Consulting expertise focused on digital marketing. خبرة استشارية تركز على التسويق الرقمي.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
