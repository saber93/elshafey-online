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

- Replace the six files in `public/images/` with real portraits while keeping
  the same filenames and 4:5 aspect ratio.
- Edit bilingual interface and profile copy in `app/FamilyPage.tsx`.
- Replace the current Netlify URL in `app/layout.tsx`, `public/robots.txt`, and
  `public/sitemap.xml` if the site moves to a custom production domain.
- Regenerate portrait placeholders with `python scripts/create-placeholders.py`.

## Netlify deployment

Netlify uses the native Next.js build configured in `netlify.toml`:

```bash
npm run build:netlify
npx netlify deploy --prod
```

The regular `npm run build` command remains available for the Vinext/Cloudflare
deployment target.
