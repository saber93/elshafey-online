import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const buildRoot = new URL("../.next/", import.meta.url);
const [english, arabic, robots, routesManifest] = await Promise.all([
  readFile(new URL("server/app/en.html", buildRoot), "utf8"),
  readFile(new URL("server/app/ar.html", buildRoot), "utf8"),
  readFile(new URL("server/app/robots.txt.body", buildRoot), "utf8"),
  readFile(new URL("routes-manifest.json", buildRoot), "utf8"),
]);

for (const [locale, html] of [
  ["en", english],
  ["ar", arabic],
]) {
  assert.match(html, /name="robots" content="noindex, nofollow"/i);
  assert.match(html, /name="googlebot" content="noindex, nofollow"/i);
  assert.ok(html.includes(`rel="canonical" href="https://elshafey.online/${locale}"`));
  assert.doesNotMatch(html, /deploy-preview--|netlify\.app/i);
}

assert.match(robots, /Disallow: \//);
assert.doesNotMatch(robots, /Sitemap:/);

const manifest = JSON.parse(routesManifest);
const rootHeaders = manifest.headers.find((entry) => entry.source === "/:path*");
assert.ok(rootHeaders);
assert.ok(
  rootHeaders.headers.some(
    (header) =>
      header.key === "X-Robots-Tag" && header.value === "noindex, nofollow",
  ),
);

console.log("Preview crawl policy passed: meta and response noindex with production canonicals.");
