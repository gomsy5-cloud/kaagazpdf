// functions/api/webhooks/robinrank.js
//
// Cloudflare Pages Function.
// Once this file is pushed to the repo at that exact path, Cloudflare Pages
// automatically serves it at:  https://kaagazpdf.in/api/webhooks/robinrank
//
// It receives the signed webhook from RobinRank, verifies it, turns the
// article into a KaagazPDF-styled HTML guide page, and commits that new
// file straight into the GitHub repo (which triggers a normal Cloudflare
// Pages deploy, exactly like a manual upload would).
//
// Required environment variables (set in Cloudflare Pages → Settings →
// Environment variables, as *encrypted* secrets):
//
//   ROBINRANK_WEBHOOK_SECRET   -> the Signing Secret shown in RobinRank
//   GITHUB_TOKEN               -> a GitHub Personal Access Token with
//                                 "Contents: Read and write" permission
//                                 on the kaagazpdf repo
//   GITHUB_REPO                -> "gomsy5-cloud/kaagazpdf"
//   GITHUB_BRANCH               -> "main"  (optional, defaults to main)

export async function onRequestPost({ request, env }) {
  try {
    const rawBody = await request.text();

    // ---- 1. Verify the signature -----------------------------------
    const signatureHeader = request.headers.get("X-RobinRank-Signature") || "";
    const expected = await hmacSha256Hex(env.ROBINRANK_WEBHOOK_SECRET, rawBody);

    if (!timingSafeEqual(signatureHeader, expected)) {
      return new Response("Invalid signature", { status: 401 });
    }

    // ---- 2. Parse payload --------------------------------------------
    const payload = JSON.parse(rawBody);
    if (payload.event !== "article.published") {
      // Acknowledge anything we don't handle so RobinRank doesn't retry.
      return new Response("Ignored event", { status: 200 });
    }

    const article = payload.data.article;

    // ---- 3. Build the HTML page ---------------------------------------
    const html = renderGuideHtml(article);
    const filePath = `${article.slug}.html`;

    // ---- 4. Commit the file to GitHub ----------------------------------
    await commitFileToGitHub({
      env,
      path: filePath,
      content: html,
      message: `Add guide: ${article.title} (via RobinRank)`,
    });

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("RobinRank webhook error:", err);
    return new Response("Server error", { status: 500 });
  }
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

async function hmacSha256Hex(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return [...new Uint8Array(sigBuffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// Renders a guide page using the exact same header/nav/footer markup and
// CSS variables as the existing KaagazPDF guide pages, so new posts look
// identical to hand-built ones.
function renderGuideHtml(article) {
  const title = escapeHtml(article.title);
  const metaDescription = escapeHtml(article.metaDescription || article.excerpt || "");
  const canonical = `https://kaagazpdf.in/${article.slug}`;
  const coverImageTag = article.featuredImageUrl
    ? `<img src="${escapeAttr(article.featuredImageUrl)}" alt="${title}" style="width:100%;border-radius:16px;margin-bottom:24px">`
    : "";
  const jsonLd = article.jsonLd ? JSON.stringify(article.jsonLd) : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | KaagazPDF</title>
<meta name="description" content="${metaDescription}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#3d3bf3">
<meta name="google-adsense-account" content="ca-pub-9434243664235416">
<meta property="og:type" content="article">
<meta property="og:site_name" content="KaagazPDF">
<meta property="og:title" content="${title} | KaagazPDF">
<meta property="og:description" content="${metaDescription}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${article.featuredImageUrl || "https://kaagazpdf.in/og-image.png"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${article.featuredImageUrl || "https://kaagazpdf.in/og-image.png"}">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%233d3bf3'/%3E%3Ctext x='32' y='45' font-size='34' text-anchor='middle'%3E%F0%9F%93%84%3C/text%3E%3C/svg%3E">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9434243664235416" crossorigin="anonymous"></script>
${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ""}
<style>
:root{--indigo:#3d3bf3;--saffron:#ff8a1e;--ink:#141433;--ink-soft:#4c4c6b;--ink-mute:#7d7d9c;--bg:#f7f7fd;--line:#e7e7f5}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:var(--bg);color:var(--ink);line-height:1.7}
a{color:var(--indigo)}
nav{background:rgba(255,255,255,.9);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:10}
.nav-in{max-width:840px;margin:auto;padding:13px 22px;display:flex;align-items:center;gap:16px}
.logo{font-weight:800;font-size:1.2rem;text-decoration:none;color:var(--ink);display:flex;align-items:center;gap:8px}
.logo .badge{width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#3d3bf3,#7a3bf3,#ff8a1e);display:grid;place-items:center;font-size:.9rem}
.logo b{background:linear-gradient(120deg,#3d3bf3,#7a3bf3);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.nav-in .sp{margin-left:auto;display:flex;gap:16px}
.nav-in a.l{color:var(--ink-soft);text-decoration:none;font-weight:600;font-size:.92rem}
.nav-in a.l:hover{color:var(--indigo)}
article{max-width:840px;margin:auto;padding:34px 22px 60px}
.crumb{font-size:.85rem;color:var(--ink-mute);margin-bottom:16px}
.crumb a{color:var(--ink-mute)}
article h1{font-size:2.1rem;letter-spacing:-.025em;line-height:1.2;margin-bottom:12px}
.meta{color:var(--ink-mute);font-size:.9rem;margin-bottom:26px;border-bottom:1px solid var(--line);padding-bottom:18px}
article h2{font-size:1.4rem;margin:34px 0 12px;letter-spacing:-.01em}
article h3{font-size:1.12rem;margin:22px 0 8px}
article p{margin-bottom:15px;color:#24243f}
article ul,article ol{margin:0 0 18px 24px}
article li{margin-bottom:8px;color:#24243f}
.lead{font-size:1.12rem;color:var(--ink-soft)}
.cta{display:inline-block;background:linear-gradient(120deg,#3d3bf3,#7a3bf3);color:#fff;padding:14px 26px;border-radius:13px;text-decoration:none;font-weight:700;margin:8px 0 4px;box-shadow:0 8px 22px rgba(61,59,243,.28)}
table{width:100%;border-collapse:collapse;margin:16px 0;font-size:.95rem}
th,td{border:1px solid var(--line);padding:10px 12px;text-align:left}
th{background:#f0f0fb;font-weight:700}
footer{background:#141433;color:#b9b9d9;text-align:center;padding:30px 22px;font-size:.85rem;margin-top:40px}
footer a{color:#cfcfe8;text-decoration:none;margin:0 8px}
</style>
</head>
<body>
<nav><div class="nav-in">
<a class="logo" href="/"><span class="badge">📄</span><span><b>Kaagaz</b>PDF</span></a>
<span class="sp"><a class="l" href="/">Tools</a><a class="l" href="guides">Guides</a><a class="l" href="about">About</a><a class="l" href="contact">Contact</a></span>
</div></nav>
<article>
<div class="crumb"><a href="guides">Guides</a> › ${title}</div>
<h1>${title}</h1>
<div class="meta">${new Date(article.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })} · ${article.readingTime || 5} min read · KaagazPDF Guides</div>
${coverImageTag}
${article.contentHtml}
</article>
<footer>
<p><b style="color:#fff">KaagazPDF</b> — India ka apna PDF toolkit. 100% private, processed on your device.</p>
<p style="margin-top:10px">
<a href="/">Tools</a> · <a href="guides">Guides</a> · <a href="about">About</a> · <a href="contact">Contact</a> · <a href="privacy">Privacy</a> · <a href="terms">Terms</a> · <a href="refund">Refund</a>
</p>
<p style="margin-top:12px;opacity:.6">© 2026 KaagazPDF · Made in India 🇮🇳</p>
</footer>
</body>
</html>`;
}

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escapeAttr(str = "") {
  return escapeHtml(str).replace(/"/g, "&quot;");
}

// Creates (or updates) a file in the GitHub repo using the Contents API.
async function commitFileToGitHub({ env, path, content, message }) {
  const repo = env.GITHUB_REPO; // e.g. "gomsy5-cloud/kaagazpdf"
  const branch = env.GITHUB_BRANCH || "main";
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`;

  // Check if the file already exists (needed to update instead of create)
  let sha;
  const existing = await fetch(`${apiUrl}?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      "User-Agent": "kaagazpdf-robinrank-webhook",
      Accept: "application/vnd.github+json",
    },
  });
  if (existing.status === 200) {
    const data = await existing.json();
    sha = data.sha;
  }

  const body = {
    message,
    content: base64Encode(content),
    branch,
    ...(sha ? { sha } : {}),
  };

  const res = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      "User-Agent": "kaagazpdf-robinrank-webhook",
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub commit failed: ${res.status} ${errText}`);
  }
}

function base64Encode(str) {
  // Cloudflare Workers runtime supports TextEncoder + btoa, but btoa only
  // handles latin1, so we go through UTF-8 bytes manually for safety.
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}
