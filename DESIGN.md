---
name: cherrryyyii
description: Everything @cherrryyyii actually uses, each one a tap away on Shopee.
colors:
  cherry: "#B81D38"
  cherry-deep: "#8E1229"
  stem: "#2F4A3A"
  white: "#FFFFFF"
  blush: "#F7E4E8"
  milk: "#FDF7F8"
  ink: "#24161A"
  muted: "#6E5A60"
typography:
  display:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 6.2vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  quote:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.6vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "-0.015em"
  title-lg:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.01em"
  body-lead:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  button:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.25
  meta:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.375
  chip:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  tile: "16px"
  panel: "24px"
  pill: "9999px"
spacing:
  gutter: "clamp(1rem, 4vw, 5rem)"
  section: "96px"
  tile-gap-x: "20px"
  tile-gap-y: "48px"
  card-pad: "20px"
  panel-pad: "24px"
components:
  button-buy:
    backgroundColor: "{colors.cherry}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-buy-hover:
    backgroundColor: "{colors.cherry-deep}"
    textColor: "{colors.white}"
  button-buy-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.cherry}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-buy-outline-hover:
    backgroundColor: "{colors.cherry}"
    textColor: "{colors.white}"
  button-follow:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  nav-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  nav-link-hover:
    backgroundColor: "{colors.blush}"
  tab:
    textColor: "{colors.muted}"
    height: "44px"
  tab-active:
    textColor: "{colors.ink}"
  chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  photo-tile:
    rounded: "{rounded.tile}"
  post-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "{spacing.card-pad}"
    width: "320px"
  tip-panel:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "{spacing.panel-pad}"
  about-panel:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "32px"
  review-card:
    backgroundColor: "{colors.milk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "{spacing.panel-pad}"
---

# Design System: cherrryyyii

## Overview

**Creative North Star: "The Clean Shelf"**

The page is a creator's shelf set out the way a premium beauty brand would set it: a white ground, her face and one line up top, then her products as a calm grid of tall photo tiles, each with exactly one way to buy. Nothing is costumed. The products and, soon, her own photos carry all of the colour; the interface stays white, ink and a pale blush, and lets cherry red appear only where a tap turns into a purchase or a choice is active.

Hierarchy comes from one family used at very different sizes and weights, not from a second voice. The headline is set huge, bold and tight; everything beneath it steps down to quiet, sentence-case Figtree. Edges are drawn with ink at low opacity rather than grey, there are no shadows at rest, and motion uses one long-tailed ease so the page feels settled rather than busy.

Until her photos arrive, every image position is a clean flat field in the product's own colour with a small "Photo coming" pill. Those fields are content, not palette; when a photo lands it replaces the field without any layout change.

**Key Characteristics:**
- White ground, blush panels, ink text; cherry reserved for buy actions and active states.
- One family (Figtree); hierarchy by size and weight; large tight-tracked bold headlines.
- 4:5 photo tiles with soft 16px corners and an inset ink hairline.
- Pills for every action and chip; one filled cherry button per featured product.
- Flat at rest; hairlines instead of shadows; frosted white only under the sticky header and tabs.
- One ease, cubic-bezier(0.16, 1, 0.3, 1), for every duration-based move; reduced motion respected throughout.

## Colors

A near-monochrome white-and-ink shelf with a pale blush for panels and a single saturated cherry for commerce.

### Primary
- **Cherry Red** (cherry): the buy colour. Fills the featured "Shop on Shopee" pills, outlines the rest, draws the sliding tab underline, the focus ring on buy buttons, and text selection. Also one of the two fills in the cherry mark (a binding brand asset).
- **Deep Cherry** (cherry-deep): hover state of the filled buy button only.

### Tertiary
- **Stem Green** (stem): exists only inside the cherry mark's stem and leaf. Never used for UI.

### Neutral
- **Shelf White** (white): the page ground, header, tab bar, post cards, chips and photo pills. The `theme-color` is white too.
- **Blush** (blush): the soft panel colour. Draft banner, the routine tip panel, the About panel, and the hover wash on header links.
- **Ink** (ink): all primary text and, at low alpha, every hairline in the system (6% inside photo tiles, 10% for dividers, 20% to 25% for outlined pills and card hover).
- **Muted Plum** (muted): secondary text: subhead, meta lines, inactive tabs, disclosure, FAQ answers.
- **Milk** (milk): fill of the follower review card only. Reviews render only when a consented review exists, so on most visits milk is not visible. Milk also remains the `body` background in globals.css, fully covered by the page's white wrapper, and the text colour of cherry text selection.

**Content, not palette.** Product tints in `app/data.ts` (pale sage, rose, oat, butter, peach, and so on) and the deeper blush fill of the avatar and About portrait slots are photo placeholders. They belong to the product or the person and disappear when photos arrive; never reuse them as UI colour. `haze` is still declared in `@theme` but is used nowhere on "/".

### Named Rules
**The Buy-Only Cherry Rule.** Cherry appears only on a buy action, an active state (tab underline, focus ring, selection) and the mark. If cherry is on something that is neither a purchase nor a current choice, it is wrong.

**The Products Carry Colour Rule.** The interface is white, blush and ink so that product photos and tints are the only colour on the shelf.

## Typography

**Display Font:** Figtree (with system-ui, sans-serif)
**Body Font:** Figtree (with system-ui, sans-serif)

**Character:** A single friendly geometric sans doing all the work: bold and tight-tracked at headline size, plain and roomy in body copy. It reads like a beauty brand's own site, not a magazine.

### Hierarchy
- **Display** (700, clamp(2.4rem, 6.2vw, 5.5rem), 0.98, -0.04em): the page headline only, "Everything I actually use.", revealed line by line from a mask.
- **Headline** (700, clamp(2rem, 4.5vw, 3.5rem), 1.02, -0.035em, balanced wrap): section headings ("From my Threads.", "Questions.", "Hi, I'm Cherry.").
- **Quote** (500, clamp(1.25rem, 2.6vw, 1.75rem), -0.015em): her translated routine intro above the grid, in curly quotes. Post cards use a smaller version (17px, 500).
- **Title** (600, 18px featured / 16px standard, -0.01em): product names on tiles; FAQ questions sit at 17px 600.
- **Body Lead** (400, 17px to 18px, 1.625): the subhead and About paragraph, max about 32rem.
- **Body** (400, 15px, 1.625): notes, review text, FAQ answers (max 65ch).
- **Button** (600, 15px): every pill action.
- **Meta** (400, 13px, muted): category lines, translation flags, disclosure, the one meta line on post cards.
- **Chip** (600, 11px): "Every day", shade codes, "Photo coming" (that one at 500).

### Named Rules
**The One Family Rule.** Public surfaces use Figtree only; hierarchy is size and weight. Gloock is still loaded in layout.tsx and exposed as `--font-display`, but only for /admin and /pitch (internal surfaces addressed to Cherry). It is a scoped exception, not part of the public system.

**The Sentence Case Rule.** Every label, chip, tab and button is sentence case at normal tracking. Hierarchy never comes from uppercase or letter-spaced labels.

## Layout

Full-bleed container: full width, capped at 2200px, with a fluid side gutter (gutter token). The header is 56px tall and sticky; the filter tabs stick directly beneath it (top 56px) with a frosted white ground and a 10% ink baseline.

The intro sits in two columns from 768px: the headline on the left spanning two rows, the avatar row and subhead in a 22rem column on the right, bottom-aligned. On phones it stacks avatar, headline, subhead, so the first product row and its buy buttons land inside a 390x844 viewport.

The product grid is two columns on phones (12px column gap, 20px from 640px, 32px row gap). From 1024px it becomes a 15-column grid: the first three products span 5 columns each (the featured row), every other product spans 3 (five per row), with 48px row gaps. Sections are separated by 96px of vertical space; the Threads strip is bounded by top and bottom hairlines and bleeds edge to edge with a 5% fade mask at each side. FAQ and About use 1:1.5 and 1:1.2 two-column splits from 768px.

## Elevation & Depth

Flat. Nothing casts a shadow at rest. Depth is conveyed by blush panels against white, ink-alpha hairlines, and two frosted surfaces: the sticky header (white at 85% with a medium backdrop blur once the page scrolls) and the sticky tab bar (white at 90%). The only box-shadow in the system is the header's scroll hairline, a 1px line, not a lift.

### Shadow Vocabulary
- **Scroll hairline** (`box-shadow: 0 1px 0 rgba(36,22,26,.08)`): added to the sticky header once the page scrolls past 8px.

### Named Rules
**The Hairline Rule.** Edges are ink at low alpha (6% inside photo tiles, 10% for dividers, 20% to 25% for outlined pills and hovered cards), never a solid grey and never a shadow.

## Shapes

Three radii. Photo tiles, post cards, the tip panel and review cards use soft 16px corners (tile). The About panel uses a wider 24px (panel), since it contains a 16px photo inside it. Every action, chip, nav link and the avatar is fully round (pill). Photo slots are always 4:5 portrait, clip their contents, and carry an inset 6% ink ring so pale tints and white photos still hold an edge on white.

## Components

### Buttons
- **Shape:** full pill (rounded.pill), 48px tall, label left and arrow right, justified apart.
- **Buy, filled:** cherry ground, white label; the first three products in any tab. Phone label reads "Shopee", desktop "Shop on Shopee". Hover darkens to deep cherry over 300ms; the arrow nudges right 4px on the ease.
- **Buy, outlined:** white ground, cherry label, inset cherry ring at 40%; every product after the first three. Hover fills solid cherry with a white label.
- **Focus:** 2px cherry outline, 2px offset.
- **Follow (secondary):** white pill with a 20% ink border; hover brings the border to full ink. Used for "Follow @cherrryyyii".
- **Text link:** semibold ink with a 25% ink underline offset 4px; hover brings the underline to full ink.

### Chips
- **Style:** white pill, 11px semibold ink, sitting in the top-left of a photo tile ("Every day", shade code). "Photo coming" is a white-at-80% pill, 70% ink, bottom-left of an empty slot.

### Cards / Containers
- **Photo tile:** 4:5, 16px corners, inset 6% ink ring, filled with the product tint until a photo arrives. When a photo exists it zooms slowly to 104% over 1.2s on tile hover.
- **Post card:** white, 16px corners, 10% ink border, 20px padding, 288px wide (320px from 640px). Her quote leads at 17px medium; one muted meta line (date, likes, "translated") with a diagonal arrow. Hover lifts 4px and darkens the border to 25%.
- **Tip panel:** blush, 16px corners, 24px padding, max 36rem: "My tip" label then the tip at 18px.
- **About panel:** blush, 24px corners, holds a 4:5 portrait slot beside the heading, paragraph and follow link.
- **Review card:** milk, 16px corners, 24px padding; quote then name and set name.

### Navigation
- **Header:** cherry mark plus bold handle (17px, -0.02em) on the left; Shop, About (hidden under 640px) and Threads with a diagonal arrow on the right, each a pill link that washes blush on hover. White at rest; frosted with a hairline once scrolled.
- **Filter tabs:** a horizontal, scrollable row of 15px semibold labels 24px apart over a 10% ink baseline. Inactive tabs are muted and turn ink on hover; the active tab is ink with a 2px cherry underline that slides between tabs (spring, stiffness 500, damping 40). Changing tabs reflows the grid: tiles animate to their new positions, leaving tiles shrink to 96% and fade in 200ms.

### Product Tile (signature)
Photo tile, then title (larger on the featured three), a muted category line, her translated note in curly quotes with a small "translated" flag, and the buy pill pinned to the bottom so buttons align across a row. Tiles rise 28px and fade in on view, staggered 60ms across each group of four.

### Threads Strip (signature)
A row of post cards that drifts left at 40px per second, loops seamlessly, pauses while a person drags or scrolls it, and holds still under reduced motion.

### FAQ Accordion
Native disclosure rows between 10% ink hairlines; 17px semibold question, muted plus icon that rotates 45 degrees on open; answer in muted body text.

### Footer
10% ink top hairline; mark and handle, the affiliate disclosure with a bold lead-in, and a small draft line, all in 14px muted.

### Motion
One ease, cubic-bezier(0.16, 1, 0.3, 1), at 0.8s by default for every duration-based transition. Headline lines slide up out of a mask with a slight 4-degree rotation on load (1.1s, 120ms apart); the subhead fades up after. The tab underline is the one spring. Everything sits inside a reduced-motion configuration that honours the user's setting.

## Do's and Don'ts

### Do:
- **Do** keep cherry for buy actions and active states only (The Buy-Only Cherry Rule).
- **Do** fill the first three products of a tab with a solid cherry pill and outline the rest, so one buy action leads.
- **Do** set every product image as a 4:5 tile with 16px corners and the inset 6% ink ring; show a flat tint with a "Photo coming" pill until her photo exists.
- **Do** draw edges with ink at low alpha and keep surfaces flat at rest (The Hairline Rule).
- **Do** use Figtree alone, with hierarchy from size and weight; headlines bold with tight negative tracking.
- **Do** use the single ease cubic-bezier(0.16, 1, 0.3, 1) and keep every animation under the reduced-motion configuration.

### Don't:
- **Don't** add drawn or illustrated product art, themed costume scenery or handwriting fonts; real photos are the only imagery (PRODUCT.md visual stance).
- **Don't** bring Gloock or any second display face onto public pages.
- **Don't** use product tints or portrait-slot fills as interface colour.
- **Don't** add shadows to cards, tiles or buttons at rest.
- **Don't** set uppercase, letter-spaced labels above headings.
- **Don't** use stem green anywhere but inside the cherry mark.
