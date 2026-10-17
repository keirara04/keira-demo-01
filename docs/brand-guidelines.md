# Brand guide: cherrryyyii

Source of truth for the page. Tokens are mirrored in `app/globals.css` (`@theme`).

## Who it's for
Malaysian women, often hijabi, with dry, sensitive or oily skin. They arrive from Threads on a phone.

**Primary message:** "Rutin saya, step by step. Satu tap terus ke Shopee." (My routine, step by step. One tap to Shopee.)

**Proof points:** these all come from her real posts (see RESEARCH.md): 1,533 likes on a makeup post, her real affiliate links, and her own quotes. There are no invented ratings or reviews.

## Voice
| Trait | Do | Don't |
|---|---|---|
| Kawan, bukan kedai (a friend, not a shop) | "tolongla beli yang ni" | "Dapatkan sekarang! Stok terhad!" |
| Pendek (short) | "3 steps je koranggg" | Long ingredient lectures |
| Jujur (honest) | "Link afiliasi — harga awak sama je" | Hiding the commission |
| Rojak (Malay–English mix) | Casual Malay plus English beauty terms | Formal Bahasa Baku or full English |

Her quotes are used verbatim, stretched letters included. New copy that sounds like her (tips, about text) needs her sign-off.

## Colour
| Token | Hex | Use |
|---|---|---|
| milk | `#FDF7F8` | Page background |
| blush | `#F7E4E8` | Soft panels, chips |
| cherry | `#B81D38` | Main accent, CTA buttons, active tab |
| stem | `#2F4A3A` | Tips, her quotes, draft banner |
| haze | `#E6E0DC` | Secondary panels |
| ink | `#24161A` | Text, dark section |
| muted | `#6E5A60` | Secondary text |

- Milk text on cherry passes AA contrast; so does ink on milk.
- Never use Shopee orange or the Shopee logo. Shopee affiliate T&C §2.2 / §6.4(o) forbid it.

## Type
| Use | Font | Size |
|---|---|---|
| Display / headings / step numbers | Gloock 400 | clamp(3rem, 13vw, 6.5rem) hero; 2.2–4rem section |
| Body | Figtree 400/600 | 15–17px |
| Labels | Figtree 600, uppercase, 0.14em tracking | 11–12px |

## Motion
- **One curve everywhere:** `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out).
- **Moves used:** masked line reveals, words un-blurring, a stem that draws on, a spring "drop" for bottles, a clip-path wipe on cards, a fill wipe on buttons, and a scroll-linked ribbon and parallax.
- **Reduced motion:** under `prefers-reduced-motion`, `MotionConfig reducedMotion="user"` and CSS guards switch off movement, parallax and grain. Fades, blur reveals and clip-path wipes still play.

## Imagery
- The illustrated bottles are placeholders.
- The goal is Cherry's own photos of each product on her shelf: natural light on a milk or blush background. Don't use seller photos, since sellers own the rights (T&C §6.2(b)).
