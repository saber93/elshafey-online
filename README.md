# El Shafey Family

A bilingual family directory built with the Next.js App Router and deployed on
Netlify. The two canonical owners are `/en` and `/ar`; `/` permanently redirects
to `/en`.

## Runtime

- Node.js `22.23.1`
- npm `10.9.2`
- `package-lock.json` is the only dependency lock

Use the pinned runtime before installing dependencies:

```bash
nvm use
npm ci
```

## Local development and validation

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run seo:check
npm run security:scan
npm audit --omit=dev
```

Run `npm run test:e2e` after `npm run build` and after installing the pinned
Playwright Chromium runtime. The browser suite covers desktop plus `360×800`,
`390×844`, and `412×915` with axe, keyboard, console, hydration, and screenshot
checks.

## Content and SEO contract

All visible bilingual content, member order, approved member facts, metadata,
canonical routes, sitemap ownership, schema eligibility, and evidence references
live in `app/family-registry.ts`.

- Keep member facts limited to approved names and broad fields.
- Only Saber has an approved portrait and Person image field.
- The other five visual cards use truthful initials and emit no image field.
- Structured data is limited to `WebSite`, `CollectionPage`, `ItemList`, and the
  visible approved `Person` facts.
- Unknown routes are intercepted by the Next proxy and return a useful bilingual
  `404`, `noindex, follow`, no canonical, and links to both locale owners.
- Deploy Preview and branch contexts receive page metadata and response-header
  `noindex, nofollow`; canonical metadata always uses `https://elshafey.online`.

## Deployment boundaries

Netlify builds the native Next.js project from Git. Review changes through the
GitHub-triggered Deploy Preview; do not publish with a production-context CLI
command.

The existing `.openai/hosting.json` is protected by an automated SHA-256 check
and remains unchanged. `build:sites`, `dev:sites`, and `start:sites` remain as
separate compatibility commands, but the Sites hosting workflow is not part of
this remediation.

See `docs/` for the sanitized baseline, remediation report, route/schema
contract, media provenance, and owner review checklist. Raw evidence stays in
the private governance repository.
