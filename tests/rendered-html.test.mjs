import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
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

test("server-renders the complete family profile and SEO metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
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

  assert.match(html, /rel="canonical"/i);
  assert.match(html, /property="og:image"/i);
  assert.match(html, /name="twitter:card"/i);
  assert.match(html, /type="application\/ld\+json"/i);
  assert.match(html, /"@type":"ProfilePage"/);
  assert.match(html, /"@type":"ItemList"/);
  assert.match(html, /"numberOfItems":6/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps bilingual, accessible, and replaceable assets in the product source", async () => {
  const [familyPage, layout, css, imageFiles] = await Promise.all([
    readFile(new URL("../app/FamilyPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readdir(new URL("../public/images/", import.meta.url)),
  ]);

  assert.match(familyPage, /navigator\.language/);
  assert.match(familyPage, /localStorage/);
  assert.match(familyPage, /document\.documentElement\.lang/);
  assert.match(familyPage, /document\.documentElement\.dir/);
  assert.match(familyPage, /aria-expanded/);
  assert.match(familyPage, /aria-live="polite"/);
  assert.match(familyPage, /سمير الشافعي/);
  assert.match(layout, /"@type": "ProfilePage"/);
  assert.match(layout, /"@type": "ItemList"/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);

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
