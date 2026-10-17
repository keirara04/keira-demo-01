# Research: Cherry's Routine Page

Research date: 18 Oct 2026. "The user" here means the creator the page is for, **@cherrryyyii**, as framed in ABOUT.md.

Sources are listed inline. Anything not confirmed from a primary source is marked **unverified**. No numbers in this report were invented.

---

## 1. The creator: @cherrryyyii

Source: public post data on https://www.threads.com/@cherrryyyii (threads.net redirects there). Covers 8 top-level posts and replies (22 Sep to 17 Oct 2026) plus 4 replies to commenters. The profile shows 19 threads in total, so about 11 older posts were not captured.

### Profile
- **Followers: 259.** ABOUT.md says ~257, which holds.
- **Bio is empty and has no links.** No link-in-bio, and no Instagram, TikTok or Shopee shop linked.
- Not verified.

### Engagement
| Date | Post | Likes / replies / reposts / shares |
|---|---|---|
| 22 Sep | Weekday makeup look (carousel) | **1,533** / 32 / 25 / 60 |
| 13 Oct | "skincare 3 steps je koranggg" (carousel) | **1,180** / 27 / 24 / 58 |
| 14 Oct | "2 months difference with the same shawl" (before/after) | 117 / 15 / 5 / 6 |
| 17 Oct | "musim musim jerebu ni… hydrating skincare" (carousel) | 182 / 10 / 2 / 3 |

- **ABOUT.md's "1.1K–1.5K likes" claim is only partly true.** Two of the four posts hit that range; the other two got 117 and 182. The hero stat should say the real best number (1.5K on one post), not imply every post performs like that.
- **The affiliate links sit in her self-replies, which get only 0–26 likes.** That is the pitch's core point, and the data supports it: most of the people who see the main post never reach the links.

### How she posts
- Selfie carousels that show the result, with short captions and no product shots. Skincare posts use the "Skin Care Threads" topic tag.
- The main post goes up around 7–8 PM Malaysia time. A self-reply with the links follows 30–45 minutes later.
- She writes casual Malay mixed with English and slang ("koranggg", "je", "tolongla beli yang ni", "paling function"), stretched letters and emoji. ABOUT.md's voice description fits.
- She answers commenters' questions in the same tone, sometimes adding a link.

### Affiliate links
- All are `https://s.shopee.com.my/<code>` short links, and all use one affiliate ID. No `shope.ee` links.
- They are formatted as a labelled list, e.g. "toner/mist: link", "serum: link", "skintint code 02: link".
- **She has no disclosure anywhere:** no "affiliate", "komisen" or #ad, and no paid-partnership flag.

### Her real products
- **Brands she names:** Ceradan (night moisturiser when her skin is extra dry), Nudestix SPF primer, and SHEGLAM green primer.
- **Her moisturiser is very likely Ceradan.** That is inferred: the link in her Ceradan reply points to the same Shopee item as the "moisturiser" in both routine lists.
- **She uses the same toner mist, serum and moisturiser for oily/combination and dry/sensitive skin.** Her real routine is small: 3 core steps, with a cleanser and sunscreen added for the dry/sensitive version.
- Her makeup is a skin tint, blusher and lip tint, all from one Shopee shop.
- **Unverified:** the product names behind most links. Shopee blocks automated lookups. To identify them, open `shopee.com.my/product/<shopid>/<itemid>` in a normal browser.

### What this means for the mockup
- ABOUT.md's **four routines with five products each** don't match her real content. She has posted **2** skincare routine lists, 13 Oct (oily/combination, 3 steps) and 17 Oct (dry/sensitive, 5 steps), which share the same core products. She has also posted one makeup look.
- **Her haze post's link reply *is* the dry/sensitive routine.** So ABOUT.md's "Breakout jerebu" and "Kering & sensitif" tabs are one routine in her actual content.
- Options: show the core trio once, marked "for all skin types", and list only what changes per skin type; or cut the routines to the ones she actually posted.
- Her **haze post is real** (17 Oct, focused on hydration), so the "Jerebu dah sampai" hero is well-timed and grounded in her own content.

---

## 2. Shopee Affiliate Malaysia

Primary sources:
- Shopee MY help pages, updated 11 Sep 2026
- Shopee MY affiliate T&C, updated 27 Aug 2026: https://help.shopee.com.my/portal/4/article/77229

### Money
- **Commission** (help article [206138](https://help.shopee.com.my/portal/10/article/206138-How-to-Understand-the-Shopee-Affiliate-Commission-Model)):
  - New buyers: RM10 flat.
  - Existing buyers: 1% flat, or up to 5% in the Content Creator Club.
  - The page also mentions a "capped at RM5 per order" limit. How that fits with the RM10 new-buyer rate is **unclear**, so check the dashboard.
  - Seller-paid "Commission XTRA" adds a variable, uncapped amount.
- **There is no official beauty-specific rate.** Blog figures of 4–12% are **unverified**.
- **Attribution:** 7 days, and the last click wins.
- **Payout:** monthly, once the balance reaches at least RM50 (T&C §5.1). Shopee may charge a service fee of unstated size.
- **Clawed back:** commission on refunds, on her own purchases through her links, and on promoting her own store.
- **Earnings at ~259 followers will be small.** No credible benchmarks for small Malaysian beauty affiliates exist; the blog tiers found (RM0–300 a month for beginners) are unsourced. The pitch should sell more clicks and a professional presence, not promise income figures.

### Approval
- Requirements: a public social account, Malaysian, aged 18+, and no sensitive content.
- **No minimum follower count.**
- **Threads is not among the listed platforms** (Facebook, Instagram, TikTok, YouTube, Shopee Video, Shopee Live). One user reports that Threads clicks show up as "others" in the dashboard (**unverified**).
- **A website is an allowed channel** (T&C §1.2). She should add the site to her affiliate account.

### Link tracking: an opportunity for the site
- **Official link format** ([174050](https://help.shopee.com.my/portal/10/article/174050-%5BENG%5D-Short-Link-Implementation-Guideline)):
  ```
  https://s.shopee.com.my/an_redir?origin_link={encoded product URL}&affiliate_id={id}&sub_id={v1}-{v2}-{v3}-{v4}-{v5}
  ```
  It allows up to 5 sub_ids joined by hyphens.
- The app's Custom Links screen also accepts a SubID.
- **What the site should do:** tag every button with something like `sub_id=web-<routine>-<step>`. The hyphen separates the 5 values, so the admin field must not allow hyphens *inside* a value. Her dashboard will then show which routine and which product actually sell. Nothing she has today gives her that, so it makes a strong pitch point.

### Rules that change the design
| Rule (T&C) | What it means for the page |
|---|---|
| §6.2(e) Content must not link to other marketplaces | **Shopee links only.** No Watsons, Lazada or TikTok Shop on the page. |
| §2.2 No derivative works of Shopee IP; §6.4(o) no impersonating Shopee (no-logo rule for a website is an inference; §2.3(a) covers social accounts) | "Beli di Shopee" as plain text is fine. **Don't use Shopee's logo or orange brand styling.** |
| §6.4(b),(e) No bots or scraping of Shopee assets | Enter product data by hand. **Don't auto-pull Shopee prices, ratings or images.** |
| §6.2(b) No third-party material without rights | Seller product photos belong to the sellers. **Her own shelf photos are the safest choice.** |
| §6.4(j),(m),(k), §6.5 No clickbait, fake promos, link-dumping, pop-ups or forced redirects | Keep the page calm and honest, with no auto-redirects. |
| §6.2(c) Follow the Malaysian Code of Advertising Practice | Product claims must not mislead. |

### The competition: Shopee's own storefront
- **Shopee already offers an "Affiliate Storefront"** ([206037](https://help.shopee.com.my/portal/10/article/206037)). It replaced "My Collection". Products can be grouped into categories and shared as one link, for free.
- On Shopee Singapore the storefront link itself isn't tracked; only the products inside it are. Malaysia is **unverified**.
- **So "links are scattered in replies" alone doesn't justify a custom site.** The site has to win on what the storefront can't do:
  1. Routines in order of use, with her reasons ("kenapa saya suka")
  2. Her face, voice and brand, plus a page she owns that can be found on Google
  3. Per-routine and per-step sub_id tracking
  4. Content tied to the season (haze, Raya, 11.11)
  5. A link that fits her empty Threads bio
- **Add a pitch line:** "Shopee Storefront = senarai produk. Laman ni = rutin awak." (Storefront is a product list; this page is your routine.)

### Disclosure and the law
- **Content Code 2022** (Malaysia, self-regulatory, in force since 30 May 2022): influencer advertising for payment "in cash or other consideration" must be clearly disclosed. Affiliate commission very likely counts (inference).
  - Summaries: [Global Compliance News](https://www.globalcompliancenews.com/2022/06/22/malaysia-new-content-code-effective-from-30-may-2022-15062022/), [SH&CO](https://www.shco.my/content-code-influencer-marketing/)
  - The exact Part 3 wording and the RM50,000 fine figure are **unverified**.
- **A revision is in progress:**
  - A Content Code review consultation ran Sep–Nov 2025.
  - An influencer guideline draft closed consultation on 30 Sep 2026 (possibly part of the same review; **unverified**) ([The Star](https://www.thestar.com.my/news/nation/2026/09/02/new-guidelines-for-influencers-to-cover-ai-generated-content-child-exploitation-and-fake-claims-says-content-forum)).
  - No final version was found. Check contentforum.my before launch.
- **Shopee** requires no specific label, but does require following the Advertising Code.
- **She currently discloses nothing on Threads.** A footer note on the site helps, but the routine section and her Threads link replies should carry a short line too.
- **PDPA** (amended 2024; higher fines from Apr 2025, breach notification from Jun 2025): if the site collects reviews or emails, it needs a notice and consent. **Simplest:** collect nothing, and post reviews by hand with the follower's permission.

### Threads and links
- Meta said in June 2025 that link posts were no longer held back in ranking ([Social Media Today](https://www.socialmediatoday.com/news/meta-says-link-posts-ranked-properly-threads-reach/750126/)). Nothing newer was found.
- **The T&C (§2.3(a)) say Meta links must sit on a "fan page", not a "personal page".** A Threads profile fits neither clearly, which adds to the doubt about Threads.
- **Threads allows up to 5 bio links** (third-party report). Her bio is empty, so the site link can go there right away.

---

## 3. How professional sites do it

### Examples
| Site | What it shows |
|---|---|
| [Caroline Hirons](https://www.carolinehirons.com/) | Now a kit shop, not a routine guide. Real photos, price, "Add to bag". Trust comes from her expertise ("honest and science-backed"). No disclosure, even though she runs an Awin affiliate programme. |
| [LTK profile](https://www.shopltk.com/explore/cristalaisha) | Avatar, handle, follower count, bio. "Posts / Products" tabs, collections with product counts. Square photo cards where the whole card is the link. No disclosure. |
| [ShopMy](https://shopmy.helpkit.so/building-your-shop/43V9gf7Co5VBrmboNBWQ1S/how-to-set-up-your-shop/43V9gf7Coa389AEHhFJmkw) | Sections → Collections → Links. Every product has a photo, title, shade and a "why I use it" note. |
| [The Ordinary Regimen Builder](https://theordinary.com/en-us/regimen-builder.html) | Quiz: skin type, top 3 concerns, routine size (3 / 4–5 / 6+), experience with actives. Steps grouped as Prep / Treat / Seal. |
| [Paula's Choice](https://helpcenter.paulaschoice.com/en_us/putting-together-a-skincare-routine-BynbhOesel) | Numbered steps split Morning / Evening. Thinnest to thickest, SPF last. |
| [Glow Recipe](https://www.glowrecipe.com/) | Browse by step or by skin concern (two separate ways in). |
| [Daily Vanity MY](https://my.dailyvanity.com/) | English with Malaysian hooks (haze, Merdeka). Each product: photo, "What We Love", "Retails for RMxx at [store]". Buyer quotes credited to their source, plus a byline. No disclosure, even though links are tracked. |

- No real Malaysian creator routine page was found.
- No live site using "Beli di Shopee" was found.
- **No similar page was found doing this well, so the space looks open.**
- Several big names skip disclosure, so an honest page stands out.

### Rules that apply
- **Google structured data:** ratings in schema must be real and visible on the page, or the site risks a manual penalty. For an affiliate page, use the Product snippet type (not a merchant listing). [Review snippet docs](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- **Amazon Associates** (a useful parallel): no star ratings unless they come from the API, and prices need an "accurate as of" date ([policy](https://affiliate-program.amazon.com/help/operating/policies)).
- **FTC** (US, but the clearest benchmark): put the disclosure next to the endorsement and make it hard to miss. A footer alone is weak ([FTC](https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers)).
- **Mobile UX** ([NN/g](https://www.nngroup.com/videos/tabs-vs-accordions/)):
  - Tabs suit a few long sections; accordions suit many short ones.
  - Keep it to 5 tabs or fewer on phones.
  - Evidence for sticky CTAs is weak.
- **Threads link preview:** Threads uses the page's og:image. The safe size is 1200×630. There is no official spec.

### The 10 patterns that matter most
1. **Real ratings or none.** First-person signals instead: "Dah guna 2 bulan" (used for 2 months), "Repurchase ✓", a skin-type tag.
2. **Real photos instead of illustrations.** Best is her own shelf photos (also safest under T&C §6.2(b)).
3. **Malay disclosure next to the buttons,** plus the footer text.
4. **Skin-type tabs (≤4), then AM/PM, then numbered steps,** with SPF last.
5. **Product card order:** step and category, photo, brand and name, "kenapa saya suka", tags, price, a full-width "Beli di Shopee →" button at least 44px tall.
6. **Approximate prices with a date:** "~RM45 · harga 10/2026".
7. **A hero about her:** face, skin type, real stats.
8. **Trust:** a "last updated" date, months used, real before/after photos (she already has one), and what didn't work for her.
9. **SEO and sharing:** `lang="ms"`, canonical tag, a 1200×630 og:image with her face, and Product schema without invented ratings.
10. **Performance and accessibility:**
    - Static page; WebP images with lazy loading.
    - Real tab ARIA roles.
    - `rel="sponsored noopener"` on links.
    - Contrast of at least 4.5:1.

---

## 4. Gap check against ABOUT.md

| ABOUT.md says | Research says | Change |
|---|---|---|
| 1.1K–1.5K likes on routine posts | 2 of 4 posts (1,533 and 1,180); others 117 and 182 | Hero stat: "1.5K likes on one routine post". Don't imply it's typical. |
| 4 routines × 5 products | 2 skincare routines (oily 3 steps, dry/sensitive 5 steps) sharing 3 core products, plus 1 makeup look; the haze routine = the dry/sensitive one | Rebuild around her real routines. Merge the haze and dry tabs. Show the shared core trio once. |
| Design inspired by Caroline Hirons' routine style | Her site is now a kit shop with no routine content | Use Paula's Choice (numbered AM/PM steps) and ShopMy ("why I use it" notes) as references instead. |
| Illustrated bottles | Every pro example uses real photos; T&C limits reuse of seller images | Use her own product photos. Illustrations at most as placeholders. |
| Star rating + Shopee review count | Copying them by hand goes stale; no scraping allowed; schema risk | Drop them, or label as "di Shopee · dikemaskini [date]". Never put them in schema. |
| Price (RM) | Changes during sales; no auto-pull allowed | Show "~RMxx" with a date. |
| Disclosure in footer only | She discloses nothing on Threads now; footer alone is weak | Add a Malay line near the buttons, plus a short note in her Threads link replies. |
| "Beli di Shopee" button | Allowed; Shopee logo and brand styling are not | Plain text in cherry red (already the plan). No Shopee orange or logo. |
| Plain affiliate links | Shopee supports sub_id | Add `sub_id` per routine and step. Pitch it as "you'll see what actually sells". |
| Problem: links buried in replies | Confirmed by data (link replies 0–26 likes vs 1.1K+ on main posts) | Keep it, but answer the "why not Shopee Storefront?" objection. |
| Followers ~257 | 259; empty bio | Put the site link in her bio. |
| Admin: Shopee link field | — | Add a sub_id field or auto-generate it. Optionally check the link format (s.shopee.com.my only). |

### Add to "Before going live"
- [ ] Register the site URL as Affiliate Media in her Shopee affiliate account
- [ ] Remove the Shopee logo or brand colours if any were added; Shopee links only, no other marketplaces
- [ ] Shoot her own product photos (or get the sellers' permission)
- [ ] Add a sub_id to every link
- [ ] Malay disclosure near the buttons; check the final Content Forum influencer guideline
- [ ] Add a "dikemaskini" (last updated) date to prices and the routine
- [ ] og:image 1200×630, `lang="ms"`, canonical tag
- [ ] No personal data collection (or add a PDPA notice and consent)
- [ ] Put the site link in her Threads bio
- [ ] Confirm the identity of every Shopee item behind her links in a normal browser

---

## 5. Unverified / still open
- How the RM10 new-buyer commission fits with the RM5 cap; any beauty-specific rate; the service-fee percentage.
- Whether Threads is accepted as an affiliate platform; whether Malaysian storefront links are tracked.
- Product names behind most of her links.
- Her ~11 older Threads posts, and whether she has Instagram or TikTok.
- The exact Content Code Part 3 wording; the final 2026 influencer guideline.
- All earnings and conversion benchmarks.
- No Shopee affiliate API confirmed for Malaysia.
