import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/en") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the crawlable English page and localized SEO metadata", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="en"[^>]*dir="ltr"/i);
  assert.match(html, /<title>El Shafey Family \| Professional Consultants<\/title>/i);
  assert.equal((html.match(/<h1[ >]/gi) ?? []).length, 1);
  assert.match(html, /Professional Expertise Across Generations/);

  for (const name of [
    "Sheikh Saber El Shafey",
    "Samir El Shafey",
    "Faraj El Shafey",
    "Wesam El Shafey",
    "Saber El Shafey",
    "Farid El Shafey",
  ]) {
    assert.match(html, new RegExp(name));
  }

  assert.match(html, /rel="canonical"[^>]*href="https:\/\/elshafey-family\.netlify\.app\/en"/i);
  assert.match(html, /hreflang="en"[^>]*href="https:\/\/elshafey-family\.netlify\.app\/en"/i);
  assert.match(html, /hreflang="ar"[^>]*href="https:\/\/elshafey-family\.netlify\.app\/ar"/i);
  assert.match(html, /hreflang="x-default"/i);
  assert.match(html, /property="og:image"/i);
  assert.match(html, /name="twitter:card"/i);
  assert.match(html, /type="application\/ld\+json"/i);
  assert.match(html, /"@type":"ProfilePage"/);
  assert.match(html, /"@type":"ItemList"/);
  assert.match(html, /"numberOfItems":6/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("server-renders a distinct Arabic RTL page with its own canonical URL", async () => {
  const response = await render("/ar");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="ar"[^>]*dir="rtl"/i);
  assert.match(html, /<title>عائلة الشافعي \| خبرات استشارية متنوعة<\/title>/i);
  assert.match(html, /<h1[^>]*>خبرات مهنية عبر الأجيال<\/h1>/i);
  assert.match(html, /الشيخ صابر الشافعي/);
  assert.match(html, /rel="canonical"[^>]*href="https:\/\/elshafey-family\.netlify\.app\/ar"/i);
  assert.match(html, /"inLanguage":"ar"/);
});

test("permanently redirects the unlocalized root to the English URL", async () => {
  const response = await render("/");
  assert.equal(response.status, 308);
  assert.match(response.headers.get("location") ?? "", /\/en$/);
});

test("keeps localized routing, accessibility, and replaceable assets in source", async () => {
  const [familyPage, languageLayout, css, sitemap, imageFiles] = await Promise.all([
    readFile(new URL("../app/FamilyPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[lang]/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readdir(new URL("../public/images/", import.meta.url)),
  ]);

  assert.match(familyPage, /href="\/en"/);
  assert.match(familyPage, /href="\/ar"/);
  assert.match(familyPage, /hrefLang="en"/);
  assert.match(familyPage, /hrefLang="ar"/);
  assert.match(familyPage, /localStorage/);
  assert.match(familyPage, /aria-expanded/);
  assert.match(familyPage, /سمير الشافعي/);
  assert.match(languageLayout, /dynamicParams = false/);
  assert.match(languageLayout, /"x-default": "\/en"/);
  assert.match(languageLayout, /"@type": "ProfilePage"/);
  assert.match(languageLayout, /"@type": "ItemList"/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(sitemap, /<loc>https:\/\/elshafey-family\.netlify\.app\/en<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/elshafey-family\.netlify\.app\/ar<\/loc>/);
  assert.match(sitemap, /hreflang="x-default"/);

  assert.deepEqual(imageFiles.sort(), [
    "faraj-el-shafey.jpg",
    "farid-el-shafey.jpg",
    "saber-el-shafey.jpg",
    "samir-el-shafey.jpg",
    "sheikh-saber-el-shafey.jpg",
    "wesam-el-shafey.jpg",
  ]);

  await Promise.all([
    access(new URL("../public/robots.txt", import.meta.url)),
    access(new URL("../public/sitemap.xml", import.meta.url)),
    access(new URL("../public/og-v2.png", import.meta.url)),
  ]);
});
