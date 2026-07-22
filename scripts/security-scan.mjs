import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";

const root = new URL("../", import.meta.url);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = [];
  for (const entry of entries) {
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
    if (entry.isDirectory()) paths.push(...(await walk(url)));
    else paths.push(url);
  }
  return paths;
}

const [appFiles, publicFiles, clientFiles, routesManifest, nextConfig, netlifyConfig, proxySource, packageJson, gitignore, eslintConfig, hostingBytes, portraitBytes, socialBytes] =
  await Promise.all([
    walk(new URL("app/", root)),
    walk(new URL("public/", root)),
    walk(new URL(".next/static/", root)),
    readFile(new URL(".next/routes-manifest.json", root), "utf8"),
    readFile(new URL("next.config.ts", root), "utf8"),
    readFile(new URL("netlify.toml", root), "utf8"),
    readFile(new URL("proxy.ts", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
    readFile(new URL(".gitignore", root), "utf8"),
    readFile(new URL("eslint.config.mjs", root), "utf8"),
    readFile(new URL(".openai/hosting.json", root)),
    readFile(new URL("public/images/saber-el-shafey-e656975a.png", root)),
    readFile(new URL("public/og-family-5d24203e.jpg", root)),
  ]);

const textAppFiles = appFiles.filter((url) => /\.(?:ts|tsx|css)$/.test(url.pathname));
const appSource = (
  await Promise.all(textAppFiles.map((url) => readFile(url, "utf8")))
).join("\n");

assert.doesNotMatch(
  appSource,
  /Google-Certified|Al-Azhar University|Grandfather|Elder Brother|Younger Brother|International Legal Advisor|Consultant|معتمد من Google|جامعة الأزهر|الجد|الأخ الأكبر|الأخ الأصغر|مستشار/i,
);
assert.doesNotMatch(appSource, /"@type":\s*"ProfilePage"/);
assert.match(nextConfig, /productionBrowserSourceMaps:\s*false/);
assert.match(nextConfig, /X-Robots-Tag/);
assert.match(nextConfig, /noindex, nofollow/);
assert.match(proxySource, /status:\s*404/);
assert.match(proxySource, /X-Robots-Tag/);
for (const assetPath of [
  "/_next/static/*",
  "/images/*",
  "/og-family-5d24203e.jpg",
]) {
  const escapedPath = assetPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = netlifyConfig.match(
    new RegExp(`for = "${escapedPath}"[\\s\\S]*?(?=\\n\\[\\[headers\\]\\]|$)`),
  )?.[0];
  assert.ok(block, `Missing Netlify header block for ${assetPath}`);
  assert.match(block, /Cache-Control = "public, max-age=31536000, immutable"/);
  assert.match(block, /X-Content-Type-Options = "nosniff"/);
}

const publicNames = publicFiles.map((url) => url.pathname.replace(new URL("public/", root).pathname, ""));
assert.deepEqual(
  publicNames.filter((name) => name.startsWith("images/")),
  ["images/saber-el-shafey-e656975a.png"],
);
assert.ok(publicNames.includes("og-family-5d24203e.jpg"));
assert.ok(!publicNames.includes("og.png"));
assert.ok(!publicNames.includes("og-v2.png"));

assert.equal(clientFiles.some((url) => url.pathname.endsWith(".map")), false);
for (const url of clientFiles.filter((candidate) => candidate.pathname.endsWith(".js"))) {
  assert.doesNotMatch(await readFile(url, "utf8"), /sourceMappingURL=/);
}

const manifest = JSON.parse(routesManifest);
const rootHeaders = manifest.headers.find((entry) => entry.source === "/:path*");
assert.ok(rootHeaders);
for (const key of [
  "Content-Security-Policy",
  "Cross-Origin-Opener-Policy",
  "Permissions-Policy",
  "Referrer-Policy",
  "X-Content-Type-Options",
  "X-Frame-Options",
]) {
  assert.ok(rootHeaders.headers.some((header) => header.key === key));
}
assert.equal(rootHeaders.headers.some((header) => header.key === "X-Robots-Tag"), false);

const packageData = JSON.parse(packageJson);
assert.equal(packageData.packageManager, "npm@10.9.2");
assert.equal(packageData.engines.node, ">=22.13.0 <23");
assert.equal(packageData.overrides.sharp, "0.35.3");
assert.equal(packageData.overrides.postcss, "8.5.21");
assert.match(gitignore, /^\.netlify$/m);
assert.match(eslintConfig, /"\.netlify\/\*\*"/);
await access(new URL("package-lock.json", root));
for (const competingLock of ["bun.lockb", "yarn.lock", "pnpm-lock.yaml"]) {
  await assert.rejects(access(new URL(competingLock, root)));
}

assert.equal(
  createHash("sha256").update(hostingBytes).digest("hex"),
  "7c9986bc7797c72ee1b42fb0fe22194672621d0379efab776224e7edeb634083",
);
assert.equal(
  createHash("sha256").update(portraitBytes).digest("hex"),
  "e656975ac5320a6590febb564ab2cfae0bce5483fd74bfcad8e6cdeae38ba58b",
);
assert.equal(
  createHash("sha256").update(socialBytes).digest("hex"),
  "5d24203e0e02a69fa88bade1f02ee20832e914946860351cb86c4e5ae1837ff2",
);

console.log("Security scan passed: headers, public artifacts, source maps, locks and protected hosting hash.");
