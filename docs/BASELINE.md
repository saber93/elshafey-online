# Family Production Baseline

Captured before branching on 2026-07-21.

| Item | Baseline |
|---|---|
| Repository base | `580b98fbcc813ce14b655abc8e7d9bba6484b377` |
| Production origin | `https://elshafey.online` |
| Netlify site | `elshafey-family` |
| Immutable production deploy | `6a5f94d98454ee358bf0f26e` |
| Sanitized inventory SHA-256 | `0a8fef6a7d992121173565f58b47286fa66bac9e8916e58dd165398b4535ecea` |
| Protected `.openai/hosting.json` SHA-256 | `7c9986bc7797c72ee1b42fb0fe22194672621d0379efab776224e7edeb634083` |

The baseline returned `308 / → /en`, `200` for `/en` and `/ar`, a real `404`
for an unknown route, and a two-entry sitemap. Production used the native Next.js
Netlify path.

Netlify did not expose a `commit_ref` for this manual production deploy. The
baseline therefore uses three provenance anchors: the clean local base SHA, a
reproducible local production build and asset manifest, and checksum comparison
against assets fetched from the immutable deploy. The six generated portrait
placeholder checksums fetched from production matched the tracked base assets.

Raw response bodies, screenshots, crawl output, console logs, and immutable
deploy evidence are intentionally excluded from this application repository.
They remain in the private governance evidence set.
