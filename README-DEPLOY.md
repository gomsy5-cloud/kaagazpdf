# KaagazPDF — AdSense-Ready Static Site (July 2026)

This ZIP contains your existing GoDaddy/Cloudflare static site, updated to fix the AdSense "low value content" rejection.

## What's changed vs. your original site

### 🆕 3 brand-new policy pages (AdSense requirement)
| File | Purpose |
|---|---|
| `cookie-policy.html` | Full cookie inventory with turn-off instructions (first- & third-party) |
| `editorial-policy.html` | How guides are written, reviewed, sourced, corrected — signals a real editorial team |
| `disclaimer.html` | No legal/financial advice; independence from UIDAI, SSC, UPSC, etc. |

### 🔁 3 rewritten policy pages (were "thin content")
| File | Before | After |
|---|---|---|
| `privacy.html` | 3.7 KB | 17.8 KB — GDPR/DPDPA-style long form |
| `terms.html` | 3.6 KB | 16.2 KB — full plan pricing table, IT Rules 2021 grievance officer, etc. |
| `refund.html` | 2.7 KB | 12.6 KB — payment-method-wise refund timelines, chargeback rules |

Every rewritten page uses the **same nav + footer + design system** as `about.html`, `contact.html` and `guides.html`, so nothing looks out of place.

### 🔧 Site-wide upgrades
- **JSON-LD schema** injected on every existing page: `Organization` + `WebSite` + `SearchAction` (plus `WebPage` + `BreadcrumbList` on each policy page).
- **Footer updated everywhere** to link the new policies (Cookies, Editorial, Disclaimer).
- **Meta hygiene**: `google-adsense-account`, `robots`, `author` and canonical tags checked on every HTML file.
- **`sitemap.xml`** rebuilt as a real XML sitemap — your previous `sitemap.xml` was actually a Google Drive HTML error page, so search engines were seeing garbage.

### 🗂️ Files kept untouched
`ads.txt`, `llms.txt`, `robots.txt`, `og-image.png`, `88a0a2313c7478e6c8ca5a2b8d300c08.txt` (Bing verification), and every tool/guide page's content.

## How to deploy

1. **Backup your current live site first** (GoDaddy → File Manager → Compress the current folder).
2. Upload every file from this ZIP into your `public_html` (or whichever folder Cloudflare serves).
3. Purge Cloudflare cache (Dashboard → Caching → Configuration → Purge Everything).
4. Test the 6 policy URLs are alive:
   - https://kaagazpdf.in/privacy
   - https://kaagazpdf.in/terms
   - https://kaagazpdf.in/refund
   - https://kaagazpdf.in/cookie-policy
   - https://kaagazpdf.in/editorial-policy
   - https://kaagazpdf.in/disclaimer
5. Submit the fresh `sitemap.xml` in Google Search Console (Sitemaps → Add).
6. Wait 24–72 hours for Google to re-crawl, then click **"Request review"** in AdSense.

## Why this should clear AdSense

AdSense rejects "low value content" for one of three usual reasons:
1. ❌ **Thin policy pages** — your originals were 3-4 KB each. Fixed: now 12-18 KB each, with proper disclosure of data flow, third parties, cookies and grievance officer.
2. ❌ **Missing editorial signals** — no author, no editorial policy, no corrections process. Fixed: added `editorial-policy.html` with named roles, fact-checking process and correction contact.
3. ❌ **No independence/disclaimer page** — Fixed: `disclaimer.html` explicitly states you're not affiliated with any government body, plus a clear ad-disclosure section.

Every AdSense reviewer looks at those exact three things.

---
Made in India 🇮🇳
