import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { familyRegistry } from "./app/family-registry";

const allowedPages = new Set(["/", "/en", "/en/", "/ar", "/ar/"]);
const isPreview = ["deploy-preview", "branch-deploy"].includes(
  process.env.CONTEXT ?? "",
);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function notFoundDocument() {
  const english = familyRegistry.locales.en.notFound;
  const arabic = familyRegistry.locales.ar.notFound;
  const robots = isPreview ? "noindex, nofollow" : "noindex, follow";

  return `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="${robots}">
    <title>${escapeHtml(english.title)} | ${escapeHtml(arabic.title)}</title>
    <style>
      :root{color-scheme:dark;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      *{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 18% 22%,rgba(219,182,111,.15),transparent 30%),linear-gradient(145deg,#071725,#0b1f33);color:#f7f3ea}
      main{display:grid;grid-template-columns:minmax(180px,.45fr) minmax(0,1.55fr);align-items:center;gap:clamp(36px,8vw,110px);width:min(100% - 48px,980px);min-height:100svh;margin-inline:auto;padding-block:72px}
      .code{margin:0;color:#dbb66f;font-family:Georgia,"Times New Roman",serif;font-size:clamp(86px,18vw,190px);line-height:.8}.copy{display:grid;gap:34px}.copy section+section{padding-block-start:34px;border-top:1px solid rgba(247,243,234,.16)}
      h1,h2{margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(34px,5vw,54px);font-weight:500}p{margin:14px 0 22px;color:rgba(247,243,234,.72);line-height:1.7}a{display:inline-flex;min-height:46px;align-items:center;padding:8px 18px;border:1px solid #dbb66f;border-radius:999px;color:#dbb66f;font-weight:750;text-decoration:none}a:focus-visible{outline:3px solid #dbb66f;outline-offset:5px}
      @media(max-width:680px){main{grid-template-columns:1fr;align-content:center;gap:44px;width:min(100% - 36px,520px)}}
    </style>
  </head>
  <body>
    <main>
      <p class="code" aria-hidden="true">404</p>
      <div class="copy">
        <section aria-labelledby="not-found-en"><h1 id="not-found-en">${escapeHtml(english.title)}</h1><p>${escapeHtml(english.description)}</p><a href="/en" hreflang="en">${escapeHtml(english.homeLink)}</a></section>
        <section lang="ar" dir="rtl" aria-labelledby="not-found-ar"><h2 id="not-found-ar">${escapeHtml(arabic.title)}</h2><p>${escapeHtml(arabic.description)}</p><a href="/ar" hreflang="ar">${escapeHtml(arabic.homeLink)}</a></section>
      </div>
    </main>
  </body>
</html>`;
}

export function proxy(request: NextRequest) {
  if (allowedPages.has(request.nextUrl.pathname)) return NextResponse.next();

  return new NextResponse(notFoundDocument(), {
    status: 404,
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": isPreview ? "noindex, nofollow" : "noindex, follow",
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images/|favicon.svg|og-family-5d24203e.jpg|robots.txt|sitemap.xml).*)",
  ],
};
