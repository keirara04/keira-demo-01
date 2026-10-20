# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: Cherry's followers.** Malaysian women, often hijabi, with dry, sensitive or oily skin, many dealing with breakouts in haze season. They arrive from a Threads post on a phone, usually around her 7–8 PM posting time, wanting the products she showed and the link to buy them. When audiences conflict, their needs win.
- **Cherry (@cherrryyyii), as editor.** Keeps the page current herself from her phone through `/admin`, with no coding.
- **Cherry, as client.** She has been pitched (`/pitch`) and agreed; the project is moving from mockup toward go-live.

## Product Purpose

A catalogue of the products Cherry actually uses, each with her Shopee affiliate link, so followers can see what she uses and tap straight through to Shopee. It is a product catalogue first, not a routine guide; routines are one way to browse it. Success is more of her post engagement reaching her affiliate links (today those links sit in self-replies that get 0–26 likes against 1.1K+ on the main post) and a professional home she owns and can update herself.

## Positioning

Shopee's free Affiliate Storefront is a bare product list; this page is her shelf. What it does that the storefront cannot: her own words on why she uses each product, grouping by skin type and use, her face and voice on a page she owns and that Google can find, per-routine and per-step `sub_id` tracking so she sees what actually sells, content tied to the season (haze, Raya, 11.11), and one link for her empty Threads bio.

## Operating Context

- Followers come from Threads on mobile; Threads uses the page's og:image (1200×630) for link previews.
- Cherry posts selfie carousels with short captions, then a self-reply listing affiliate links ("toner/mist: link") 30–45 minutes later.
- Her real content: two skincare routines (oily/combination, 3 steps; dry/sensitive, 5 steps) sharing a core trio, plus one makeup look. Her haze post (17 Oct 2026) is the dry/sensitive routine.
- Earnings at her size (~259 followers) will be small; the case for the page is clicks and presence, not income promises.

## Capabilities and Constraints

- Next.js 15, Tailwind CSS v4, Motion; deploys to Vercel. Public page `/`, admin `/admin`, pitch `/pitch`.
- Admin covers routines/categories, products, links, reviews and site settings; today it saves to localStorage only with no login. A backend and password-protected admin are required before go-live.
- **Shopee affiliate T&C bind the design:** Shopee links only (no Watsons, Lazada, TikTok Shop); no Shopee logo or orange brand styling ("Beli di Shopee" as plain text is fine); no scraping of Shopee prices, ratings or images; no seller photos without rights; no clickbait, fake promos, pop-ups or forced redirects.
- Prices are entered by hand and shown approximate with a date ("~RM45 · harga 10/2026"). Ratings only if real and visible; never in schema.
- Affiliate buttons carry `rel="sponsored noopener"`; `sub_id` per routine and step, with no hyphens inside a value.
- Collect no personal data; reviews are posted by hand with the follower's permission (PDPA).
- `lang="en"`, canonical tag, Product schema without invented ratings.
- Open: product names behind most of her links (Shopee blocks lookups; confirm in a browser), commission details, final Content Forum influencer guideline wording.

## Brand Commitments

- Name/handle: @cherrryyyii. Cherry red is a binding brand colour; the drawn cherry mark was dropped from the page (20 Oct 2026) in favour of the plain wordmark; the rest of the visual world is open to change (rebrand requested 20 Oct 2026).
- Language: the page is fully in English (decided 20 Oct 2026). Her Threads posts are shown exactly as she wrote them, in her original rojak Malay, styled like Threads (decided 20 Oct 2026); her product notes and tips stay in her original words too. The page's own interface copy (headings, buttons, FAQ) is English. Her own posts stay in casual rojak Malay; the page's English keeps that friend-not-shop warmth: short, honest about the commission.
- Visual stance (decided 20 Oct 2026): clean and premium, the category standard executed at the craft level of Glossier and Rare Beauty. No themed costumes (the night-market stall was built and rejected as "AI slop"), no cartoon illustrations, no handwriting fonts. Real photos of her products, shelf and face are coming; until then, clean labelled photo slots.
- Existing brand guide: `docs/brand-guidelines.md` (tokens mirrored in `app/globals.css`).

## Evidence on Hand

- Her real Threads data, affiliate links and quotes: `app/data.ts`, `RESEARCH.md` §1 (read 18 Oct 2026).
- Real best stat: 1,533 likes on one makeup post. Do not imply every post performs like that.
- `public/shelf.jpg`: shelf photo.
- **Absent, must not be fabricated:** product names for most links, prices, ratings, follower reviews/testimonials, earnings or conversion figures. Illustrated bottles are placeholders until her own product photos exist.

## Product Principles

1. **Her shelf, not a shop.** Only products she uses, with her reason where she gave one; routines group them but don't lead.
2. **Honest by default.** Real numbers or none; affiliate disclosure next to the buy buttons, not only in the footer.
3. **One tap from post to product.** A follower on a phone reaches the right Shopee link without hunting.
4. **She runs it herself.** Anything on the page should be editable from her phone in `/admin`.
5. **Inside Shopee's rules.** Every feature must survive the affiliate T&C.

## Accessibility & Inclusion

Phone-first. Text contrast at least 4.5:1, real tab ARIA roles, buy buttons at least 44px tall, motion off under `prefers-reduced-motion`.
