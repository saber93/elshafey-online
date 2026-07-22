import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { after, before, test } from "node:test";

const repositoryRoot = new URL("../", import.meta.url);
let origin;
let serverProcess;
let serverOutput = "";

async function availablePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : null;
      server.close((error) => (error ? reject(error) : resolve(port)));
    });
  });
}

async function waitForServer(url) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${url}/en`);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Next server did not start.\n${serverOutput}`);
}

before(async () => {
  const port = await availablePort();
  origin = `http://127.0.0.1:${port}`;
  serverProcess = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", String(port)],
    {
      cwd: repositoryRoot,
      env: { ...process.env, NODE_ENV: "production" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  serverProcess.stdout.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  serverProcess.stderr.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  await waitForServer(origin);
});

after(async () => {
  if (!serverProcess || serverProcess.exitCode !== null) return;
  serverProcess.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => serverProcess.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ]);
});

test("root permanently redirects to the English owner", async () => {
  const response = await fetch(`${origin}/`, { redirect: "manual" });
  assert.equal(response.status, 308);
  assert.equal(new URL(response.headers.get("location"), origin).pathname, "/en");
});

test("English and Arabic owners render localized crawlable HTML", async () => {
  for (const expectation of [
    {
      path: "/en",
      lang: "en",
      dir: "ltr",
      title: "El Shafey Family | Family Directory",
      h1: "Six Fields, One Family",
    },
    {
      path: "/ar",
      lang: "ar",
      dir: "rtl",
      title: "عائلة الشافعي | دليل العائلة",
      h1: "ستة مجالات، عائلة واحدة",
    },
  ]) {
    const response = await fetch(`${origin}${expectation.path}`);
    assert.equal(response.status, 200);
    const html = await response.text();

    assert.match(html, new RegExp(`<html[^>]*lang="${expectation.lang}"[^>]*dir="${expectation.dir}"`, "i"));
    assert.match(html, new RegExp(`<title>${expectation.title.replace(/[|]/g, "\\|")}</title>`));
    assert.match(html, new RegExp(`<h1[^>]*>${expectation.h1}</h1>`));
    assert.match(html, new RegExp(`rel="canonical"[^>]*href="https://elshafey\\.online${expectation.path}"`, "i"));
    assert.match(html, /hrefLang="en"[^>]*href="https:\/\/elshafey\.online\/en"/i);
    assert.match(html, /hrefLang="ar"[^>]*href="https:\/\/elshafey\.online\/ar"/i);
    assert.match(html, /hrefLang="x-default"[^>]*href="https:\/\/elshafey\.online\/en"/i);
    assert.doesNotMatch(html, /property="og:locale"/i);
    assert.doesNotMatch(html, /ProfilePage/);
    assert.match(html, /"@type":"WebSite"/);
    assert.match(html, /"@type":"CollectionPage"/);
    assert.match(html, /"@type":"ItemList"/);
    assert.equal((html.match(/"@type":"Person"/g) ?? []).length, 6);
    assert.equal((html.match(/"image":"https:\/\/elshafey\.online\/images\/saber-el-shafey-e656975a\.png"/g) ?? []).length, 1);
    assert.equal((html.match(/class="member-portrait"/g) ?? []).length, 1);
    assert.doesNotMatch(
      html,
      /Google-Certified|Al-Azhar University|Grandfather|Elder Brother|Younger Brother|Consultant|Advisor|معتمد من Google|جامعة الأزهر|الجد|الأخ الأكبر|الأخ الأصغر|مستشار/i,
    );
  }
});

test("sitemap and robots expose only the two production owners", async () => {
  const [sitemapResponse, robotsResponse] = await Promise.all([
    fetch(`${origin}/sitemap.xml`),
    fetch(`${origin}/robots.txt`),
  ]);
  assert.equal(sitemapResponse.status, 200);
  assert.equal(robotsResponse.status, 200);

  const sitemap = await sitemapResponse.text();
  const robots = await robotsResponse.text();
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 2);
  assert.deepEqual(
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
    ["https://elshafey.online/en", "https://elshafey.online/ar"],
  );
  assert.match(sitemap, /hreflang="x-default"/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/elshafey\.online\/sitemap\.xml/);
});

test("unknown routes return the useful bilingual 404 without a canonical", async () => {
  const response = await fetch(`${origin}/not-a-real-family-page`, {
    redirect: "manual",
  });
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
  assert.match(
    response.headers.get("content-security-policy") ?? "",
    /frame-ancestors 'none'/,
  );
  const html = await response.text();
  assert.match(html, /Page not found/);
  assert.match(html, /الصفحة غير موجودة/);
  assert.match(html, /name="robots" content="noindex, follow"/i);
  assert.doesNotMatch(html, /rel="canonical"/i);
  assert.match(html, /href="\/en"/);
  assert.match(html, /href="\/ar"/);
});

test("responses carry security policy and optimized image support", async () => {
  const pageResponse = await fetch(`${origin}/en`);
  assert.equal(pageResponse.headers.get("x-powered-by"), null);
  assert.equal(pageResponse.headers.get("x-frame-options"), "DENY");
  assert.equal(pageResponse.headers.get("x-content-type-options"), "nosniff");
  assert.equal(
    pageResponse.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
  assert.match(pageResponse.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);

  const imageResponse = await fetch(
    `${origin}/_next/image?url=%2Fimages%2Fsaber-el-shafey-e656975a.png&w=384&q=75`,
    { headers: { accept: "image/avif,image/webp,image/*" } },
  );
  assert.equal(imageResponse.status, 200);
  assert.match(imageResponse.headers.get("content-type") ?? "", /^image\/(?:avif|webp)$/);
  assert.ok((await imageResponse.arrayBuffer()).byteLength < 80_000);
});
