# El Shafey Family

A polished one-page bilingual profile for the El Shafey family, built with
vinext, React, semantic HTML, and lightweight CSS.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Use `npm run build` for a production build and `npm test` for rendered-content
checks.

## Content updates

- Replace the five files in `public/images/` with real portraits while keeping
  the same filenames and 4:5 aspect ratio.
- Edit bilingual interface and profile copy in `app/FamilyPage.tsx`.
- Replace the clearly marked `https://example.com` placeholder in
  `app/layout.tsx`, `public/robots.txt`, and `public/sitemap.xml` before using a
  custom production domain.
- Regenerate portrait placeholders with `python scripts/create-placeholders.py`.
