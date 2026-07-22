import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { familyRegistry, routeRegistry } from "../app/family-registry.ts";

const buildRoot = new URL("../.next/server/app/", import.meta.url);

async function readBuildFile(path) {
  return readFile(new URL(path, buildRoot), "utf8");
}

const [english, arabic, proxySource, sitemap, robots] = await Promise.all([
  readBuildFile("en.html"),
  readBuildFile("ar.html"),
  readFile(new URL("../proxy.ts", import.meta.url), "utf8"),
  readBuildFile("sitemap.xml.body"),
  readBuildFile("robots.txt.body"),
]);

const pages = { en: english, ar: arabic };
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);

assert.equal(routeRegistry.length, 2);
assert.deepEqual(
  sitemapUrls,
  routeRegistry.map((route) => route.canonical),
);

for (const route of routeRegistry) {
  const html = pages[route.locale];
  const copy = familyRegistry.locales[route.locale];
  assert.match(html, new RegExp(`<html[^>]*lang="${route.locale}"[^>]*dir="${copy.direction}"`, "i"));
  assert.ok(html.includes(`<title>${route.title}</title>`));
  assert.ok(html.includes(route.description));
  assert.ok(html.includes(`<h1 id="hero-title">${route.h1}</h1>`));
  assert.ok(html.includes(`rel="canonical" href="${route.canonical}"`));
  assert.ok(html.includes('hrefLang="x-default" href="https://elshafey.online/en"'));
  assert.ok(html.includes('name="robots" content="index, follow"'));
  assert.ok(html.includes('"@type":"WebSite"'));
  assert.ok(html.includes('"@type":"CollectionPage"'));
  assert.ok(html.includes('"@type":"ItemList"'));
  assert.equal((html.match(/"@type":"Person"/g) ?? []).length, 6);
  assert.equal((html.match(/class="member-portrait"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /ProfilePage|og:locale|deploy-preview--|netlify\.app/i);
}

assert.equal((sitemap.match(/<url>/g) ?? []).length, 2);
assert.match(sitemap, /hreflang="en"/);
assert.match(sitemap, /hreflang="ar"/);
assert.match(sitemap, /hreflang="x-default"/);
assert.match(robots, /Allow: \//);
assert.match(robots, /Sitemap: https:\/\/elshafey\.online\/sitemap\.xml/);
assert.match(proxySource, /status:\s*404/);
assert.match(proxySource, /noindex, follow/);
assert.doesNotMatch(proxySource, /rel=["']canonical/i);
assert.match(proxySource, /href=\"\/en\"/);
assert.match(proxySource, /href=\"\/ar\"/);

console.log("SEO contract passed: 2 canonical owners, 2 sitemap URLs, bilingual 404.");
