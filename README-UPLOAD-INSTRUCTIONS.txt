═══════════════════════════════════════════════════════════════════
  KaagazPDF — AdSense-Ready ADDITIVE Package
  Safe to upload on top of your existing kaagazpdf.in site
═══════════════════════════════════════════════════════════════════

⚠️  DO NOT DELETE OR REPLACE ANY OTHER FILES ON YOUR SITE.
    This ZIP is DESIGNED to be uploaded ADDITIVELY.

WHAT'S IN THIS ZIP (7 files only)
──────────────────────────────────────────────────────────────────
  privacy.html            — REPLACES your existing thin privacy page
  terms.html              — REPLACES your existing thin terms page
  refund.html             — REPLACES your existing thin refund page
  cookie-policy.html      — NEW file (does not exist on your site)
  editorial-policy.html   — NEW file (does not exist on your site)
  disclaimer.html         — NEW file (does not exist on your site)
  sitemap.xml             — REPLACES your existing sitemap.xml
                            (built from your real 27 tool URLs)

WHY THIS FIXES ADSENSE "LOW VALUE CONTENT"
──────────────────────────────────────────────────────────────────
  1. Your existing privacy/terms/refund were ~3 KB each. AdSense
     reviewers flag these as "thin." The new versions are 12-18 KB
     each with real disclosures.
  2. AdSense specifically checks for an Editorial Policy and a
     Disclaimer page. Your site did not have these — now it does.
  3. Your existing sitemap.xml was a broken Google Drive HTML file
     (not a real XML sitemap). The new one lists all 27 tool pages
     + 8 guide pages + 6 policy pages so Google can properly index
     everything.

HOW TO UPLOAD (5 minutes)
──────────────────────────────────────────────────────────────────
  1. Log in to GoDaddy → File Manager → open public_html
     (or wherever kaagazpdf.in is served from).

  2. Upload all 7 files from this ZIP into public_html.
       - When prompted "Overwrite privacy.html / terms.html /
         refund.html / sitemap.xml?" → YES, overwrite.
       - cookie-policy.html, editorial-policy.html, disclaimer.html
         are new so nothing to overwrite.

  3. DO NOT delete any other file. Your 27 tool pages, index.html,
     about, contact, guides — all untouched.

  4. Purge Cloudflare cache:
     Cloudflare Dashboard → your site → Caching → Configuration
     → "Purge Everything".

  5. Verify in a browser (Ctrl/Cmd + Shift + R to hard-refresh):
       https://kaagazpdf.in/privacy
       https://kaagazpdf.in/terms
       https://kaagazpdf.in/refund
       https://kaagazpdf.in/cookie-policy         (should exist now)
       https://kaagazpdf.in/editorial-policy      (should exist now)
       https://kaagazpdf.in/disclaimer            (should exist now)
       https://kaagazpdf.in/sitemap.xml           (should now be
                                                    valid XML, not
                                                    Google Drive HTML)

  6. Submit the new sitemap to Google Search Console:
       Search Console → your property → Sitemaps
       → Add "sitemap.xml" → Submit.

  7. Wait 24-72 hours for Google to re-crawl.

  8. Go to Google AdSense → Sites → click "Request Review".

FOOTER LINKS — ONE MANUAL STEP
──────────────────────────────────────────────────────────────────
  AdSense reviewers like to click policy links from the footer.
  Your existing footer on every page probably links to Privacy,
  Terms and Refund. Please ALSO add these three links so the new
  pages are discoverable:

      · <a href="/cookie-policy">Cookie Policy</a>
      · <a href="/editorial-policy">Editorial Policy</a>
      · <a href="/disclaimer">Disclaimer</a>

  Best place: right after the existing "Refund" link in the footer
  of your homepage template. If you edit one shared footer, you're
  done. If your pages have inline footers, you'll need to add
  those 3 links to each page's footer once.

DESIGN
──────────────────────────────────────────────────────────────────
  The 6 policy pages use the SAME visual design system as your
  existing site (Inter font, indigo #3d3bf3 primary, saffron
  accent, same nav pattern, same footer pattern). They will feel
  100% consistent with the rest of kaagazpdf.in — no styling clash.

If anything looks off after upload, DM me the URL and I'll patch
that one file — do NOT restore your old privacy/terms in a panic;
it's the old ones AdSense rejected.

Made in India 🇮🇳
