# Route and Schema Contract

The typed owner registry is `app/family-registry.ts`.

| Path | Locale | Status | Indexability | Canonical | Counterpart | Sitemap |
|---|---|---:|---|---|---|---|
| `/` | default | `308` | redirect only | none | `/en` | no |
| `/en` | `en` | `200` | index, follow | `https://elshafey.online/en` | `/ar` | yes |
| `/ar` | `ar` | `200` | index, follow | `https://elshafey.online/ar` | `/en` | yes |
| any unknown path | bilingual fallback | `404` | noindex, follow | none | links to both | no |

Both canonical pages emit reciprocal generic `en` and `ar` hreflang plus English
`x-default`. Open Graph deliberately omits territory-specific locale fields.
The sitemap must contain exactly the two canonical owner URLs.

The JSON-LD graph is limited to:

1. `WebSite`
2. `CollectionPage`
3. `ItemList`

Each list item contains a `Person` with a visible approved name and broad field.
Only Saber may include the approved portrait URL. Relationship, employer,
institution, qualification, certification, consultant/advisor, and inferred
biographical fields are prohibited.

Deploy Preview and branch builds keep the same production canonical and schema
URLs while emitting `noindex, nofollow` in both metadata and `X-Robots-Tag`.
