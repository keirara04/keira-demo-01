# Cherry's Routine Page

A one-page website for **@cherrryyyii**, a Malaysian beauty creator on Threads. It collects her skincare and makeup routines, and the Shopee affiliate links for every product, in one tidy place.

> **Status: draft mockup.** It was made as a pitch to show the creator what her own page could look like. Brands, prices, ratings and reviews are all invented placeholders. Before the page goes live, they must be replaced with her real products and real follower reviews.

---

## The creator

- **Who:** @cherrryyyii on Threads, about 257 followers.
- **Niche:** beauty, mostly skincare routines and everyday makeup looks.
- **Audience:** Malaysian women, often hijabi, with dry, sensitive or oily skin. Many deal with breakouts during haze season.
- **Language:** casual Malay mixed with English beauty terms, the way Malaysian beauty creators actually talk.
- **How she earns:** Shopee affiliate links (s.shopee.com.my), posted as a reply under each routine post.
- **What works:** her routine posts can reach 1.1K–1.5K likes, which is well above her follower count.

## The problem it solves

Today her followers have to scroll through Threads replies to find each product link. The links are scattered and get buried, and older routines are hard to find again. Some of that attention never turns into a click or a sale.

## What the page does

The page turns each routine into a clear shopping list, step by step:

1. A visitor picks the routine that matches their skin.
2. They see every product in the order they should use it.
3. Each product has one tap to buy on Shopee.

No more scrolling through replies.

---

## What's on the page

### Hero
- Headline: **"Jerebu dah sampai. Ni rutin saya."** ("The haze is here. This is my routine.") It's timed for haze season (October), when breakouts are on followers' minds.
- A short intro that explains how to use the page.
- Three quick stats: likes on one routine post, number of routines, number of products she uses.
- An illustrated product shelf. Bottles drop onto it when the page loads and restack when a different routine is picked.

### Routine picker
Four tabs, one per routine:

| Routine | When | Focus |
|---|---|---|
| Breakout jerebu (haze breakouts) | Morning & night | Gentle cleansing, protecting the skin barrier, no scrubbing |
| Kering & sensitif (dry & sensitive) | Morning | Fewer steps, more hydration, patch testing |
| Berminyak (oily) | Morning | Controlling oil without drying the skin out |
| Makeup harian hijabi (daily hijabi makeup) | 10 minutes | A light look for work or class |

### Product steps
Each routine lists 5 products in order of use. Each product card shows:
- The step number and a small illustrated bottle in the product's colour
- Brand and product name
- Star rating and Shopee review count
- One line in her voice on why she likes it
- Price (RM) and size
- A **"Beli di Shopee"** button that opens her affiliate link

Under the list are the total cost of the full routine and one personal tip.

### Reviews
- Short testimonials from followers, each tagged with the routine they tried.
- An average star rating, worked out from the reviews shown.

### About
A short intro: Cherry shares routines for Malaysian skin that deals with heat, humidity and haze, and only recommends products she has tried herself.

### Footer
An affiliate disclosure saying some links earn her a small commission at no extra cost to the buyer. It's honest and builds trust.

---

## Admin panel

A private page where Cherry can update the site herself, with no coding:

- **Ringkasan (overview):** counts, plus a to-do list. It flags products with no Shopee link, routines with no products, and whether the draft banner is still on.
- **Produk (products):** add, edit, hide or delete products. Fields: name, brand, routine, description, Shopee link, price, size, rating, review count, bottle shape, bottle colour and step order.
- **Rutin & kategori (routines):** add or edit routines. Each routine becomes a tab on the site.
- **Ulasan (reviews):** add follower reviews, and hide or show each one.
- **Tetapan laman (site settings):** headline, intro, about text, Threads link, affiliate disclosure, draft banner on/off.
- **Backup data:** download or restore everything as a file, clear the sample data, or bring it back.

It works on a phone too, since that's where she'll likely use it.

> **Demo limits:** edits are saved only in the browser they're made in, and there is no login yet. Before going public, it needs a proper backend with a password-protected admin.

---

## Look and feel

Inspired by the clean, no-nonsense, product-first style of established skincare sites such as Caroline Hirons. The look itself is Cherry's own:

- **Colours:** cherry red as the main accent, cherry-stem green for tips and notes, soft blush and a pale "haze" grey for backgrounds, deep plum-black for text.

  | Name | Hex |
  |---|---|
  | Milk | `#FDF7F8` |
  | Cherry | `#B81D38` |
  | Stem | `#2F4A3A` |
  | Haze | `#E6E0DC` |
  | Ink | `#24161A` |

- **Fonts:** Gloock, a bold editorial serif, for headings and step numbers; Figtree, a clean, friendly sans-serif, for everything else.
- **Voice:** casual, warm Malay, short and direct, honest about affiliate links.
- **Motion:** one entrance on page load (the headline rises in, the bottles drop onto the shelf), plus small responses when switching routines. Motion is switched off for visitors who prefer reduced motion.
- **Devices:** designed phone-first, since followers arrive from Threads on mobile. It scales up to wide desktop screens.

---

## Why it matters for the pitch

- **For Cherry:** a professional home for her content that turns more of her post engagement into affiliate sales, and that she can update herself.
- **For the designer:** a first case study in beauty affiliate pages. The plan is to offer it free or cheap in exchange for a testimonial, then use it to pitch beauty creators with 5K+ followers.

## Before going live

- [ ] Replace sample products with her real products and Shopee affiliate links
- [ ] Delete the invented reviews and add real ones, with followers' permission
- [ ] Use real ratings and review counts, or remove them
- [ ] Turn off the draft banner
- [ ] Set up a backend and login for the admin panel
- [ ] Get her sign-off on the copy and her About text
