# Immediate Family Remediation Report

This feature branch is a review flow only. It does not merge, publish production,
change DNS, or invoke the separate Sites hosting workflow.

## Implemented

- Preserved native Next.js, `/ → /en`, `/en`, `/ar`, member order, and a two-URL
  sitemap.
- Consolidated visible bilingual content, metadata, route ownership, schema
  eligibility, member facts, media records, and evidence references into one
  typed registry.
- Reduced every member entry to the approved displayed name and broad field:
  religious service, textiles, law, HVAC, UX, or digital marketing.
- Removed relationship labels, certifications, institutions, consultant/advisor
  titles, qualification statements, and competence-heavy claims.
- Replaced five generated portrait cards with CSS initials and installed only the
  approved Saber portrait through Next Image.
- Replaced `ProfilePage` with `WebSite`, `CollectionPage`, and `ItemList`; Person
  facts are constrained by tests.
- Added a standalone bilingual initial-HTML 404 with a real `404` status,
  `noindex, follow`, useful locale links, and no canonical.
- Added preview metadata and response-header noindex, production security headers,
  explicit cache policy, disabled public source maps, and immutable framework
  asset caching.
- Pinned Node 22.23.1/npm 10.9.2, retained npm as the only lock, upgraded Next,
  and pinned patched Sharp/PostCSS overrides.
- Added strict lint/type gates, registry tests, rendered-response checks, SEO and
  security scanners, production audit, and Playwright/axe coverage at four
  viewports.

## Stable validation contract

The following must pass on the final branch:

```text
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run seo:check
npm run security:scan
npm audit --omit=dev
npm run test:e2e
git diff --check
```

Final commit SHA, Draft PR URL, preview deploy ID/URLs, and post-preview HTTP and
visual evidence are recorded in the Draft PR and private governance registry,
not in this self-referential committed report.
