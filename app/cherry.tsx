"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, animate, motion, useReducedMotion, useScroll } from "motion/react";
import { ABOUT, DISCLOSURE, FAQ, THREADS, posts, type Product, type Review, type Routine } from "./data";
import { useSiteData } from "./store";
import { EASE, MaskLines } from "./motion";

const ALL = "all";

/** "All" tab first: every product once (shared skincare items aren't repeated), everyday ones first. */
function withAllTab(routines: Routine[]): Routine[] {
  const seen = new Set<string>();
  const products = routines.flatMap((r) => r.products).filter((p) => {
    const key = p.core ? "core:" + p.step.toLowerCase() : p.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (!products.length) return routines;
  products.sort((a, b) => Number(!!b.core) - Number(!!a.core));
  return [{ id: ALL, tab: "All products", title: "Everything I use", when: "", intro: "", tip: "", post: "", products }, ...routines];
}

/** Which of her sets a product belongs to, so a tile without a quote still says something true. */
function setsFor(p: Product, routines: Routine[]) {
  return routines
    .filter((r) => r.id !== ALL && r.products.some((x) => x.id === p.id || (p.core && x.core && x.step === p.step)))
    .map((r) => r.tab);
}

export default function Cherry() {
  const { data } = useSiteData();
  const routines = withAllTab(data.routines);
  const [active, setActive] = useState(ALL);
  const routine = routines.find((r) => r.id === active) ?? routines[0];
  const shown = data.reviews.filter((r) => r.visible && r.consent);
  // bumped when the first-visit opening lifts, so the hero's own entrance plays as it's revealed
  const [run, setRun] = useState(0);
  const reveal = useCallback(() => setRun((n) => n + 1), []);

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.8, ease: EASE }}>
      <Opening products={routines[0]?.products ?? []} onReveal={reveal} />
      <div key={run} className="min-h-dvh overflow-x-clip bg-milk text-ink">
        <DraftBanner />
        <Header />
        <Intro picks={routines[0]?.products.filter((p) => p.core).slice(0, 3) ?? []} />
        {routine && <Shop routines={routines} routine={routine} setActive={setActive} />}
        <FromThreads />
        {shown.length > 0 && <Reviews reviews={shown} routines={routines} />}
        <Faq />
        <About />
        <Footer />
      </div>
    </MotionConfig>
  );
}

/* ---------- first-visit opening ---------- */

const OPENING_KEY = "cherry-intro-seen";
const IN_OUT = [0.76, 0, 0.24, 1] as const; // hard ease-in-out for the wipe
// each card's time on screen: the deck shuffles faster and faster, like flicking through her shelf
const BEATS = [420, 300, 230, 180, 150, 130, 120, 110];

/**
 * Plays once per browser. Her products flick past as a deck of colour cards, each named,
 * speeding up; the deck drops away, her name rises, then a white and a blush panel wipe up
 * to reveal the page. Rendered on the server too, so a first visit never flashes the page;
 * returning visitors have it removed on the first client tick.
 */
function Opening({ products, onReveal }: { products: Product[]; onReveal: () => void }) {
  const [show, setShow] = useState(true);
  const [first, setFirst] = useState(false);
  const [card, setCard] = useState(0);
  const [named, setNamed] = useState(false);
  const count = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const started = useRef(false);
  const done = useRef(false);
  const deck = products.slice(0, BEATS.length);

  const finish = useCallback(() => {
    if (done.current) return; // skip and the timeline both land here
    done.current = true;
    setShow(false);
    onReveal();
  }, [onReveal]);

  useEffect(() => {
    if (started.current) return; // once, even under React dev's double effects
    started.current = true;
    let seen = false;
    try { seen = localStorage.getItem(OPENING_KEY) === "1"; localStorage.setItem(OPENING_KEY, "1"); } catch {}
    if (seen) { setShow(false); return; }
    setFirst(true);
    // no cleanup on purpose: clearing these timers in dev's double effect would strand the opening
    if (reduce || !deck.length) { setNamed(true); setTimeout(finish, 900); return; }
    let t = 350;
    deck.forEach((_, i) => { if (i) setTimeout(() => setCard(i), t); t += BEATS[i]; });
    setTimeout(() => setNamed(true), t - 150); // her name starts rising as the last card leaves
    setTimeout(finish, t + 1100);
    const total = (t + 1100) / 1000;
    animate(0, 100, { duration: total - 0.2, ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => count.current && (count.current.textContent = String(Math.round(v)).padStart(3, "0")) });
  }, [reduce, finish, deck]);

  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="blush" aria-hidden className="fixed inset-0 z-[99] bg-blush"
          exit={first ? { y: "-100%", transition: { duration: 0.9, ease: IN_OUT, delay: 0.14 } } : { opacity: 0, transition: { duration: 0 } }} />
      )}
      {show && (
        <motion.div key="white" role="status" aria-label="Loading" className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-milk text-ink"
          exit={first ? { y: "-100%", transition: { duration: 0.9, ease: IN_OUT } } : { opacity: 0, transition: { duration: 0.15 } }}>
          <div className={`wrap flex items-center justify-between py-4 text-[13px] font-semibold uppercase tracking-[0.06em] ${first ? "" : "opacity-0"}`}>
            <span className="text-muted">Everything I actually use</span>
            {first && <button onClick={finish} className="min-h-11 rounded-md px-3 hover:bg-blush">Skip</button>}
          </div>

          <div className={`relative flex flex-1 items-center justify-center ${first ? "" : "opacity-0"}`}>
            {/* the deck: a stack of her products; the top card flicks away to show the next */}
            {first && (
              <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: EASE }}
                className="relative aspect-[4/5] w-[min(56vw,15rem)]">
                {deck.map((p, i) => {
                  const gone = named || i < card;
                  const depth = Math.min(i - card, 3);
                  const tilt = i % 2 ? -1 : 1;
                  return (
                    <motion.div key={p.id} style={{ zIndex: deck.length - i }}
                      animate={gone
                        ? { y: "-115vh", rotate: tilt * 16, transition: { duration: 0.55, ease: [0.55, 0, 0.75, 0] } }
                        : { y: depth * -10, rotate: depth ? tilt * (2 + depth * 2) : 0, scale: 1 - depth * 0.04 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="absolute inset-x-0 top-0 rounded-lg bg-white p-2 shadow-[0_24px_60px_-24px_rgba(36,22,26,.35)]">
                      <Photo tint={p.tint} alt="" label={p.brand ?? p.step} sizes="15rem" className="aspect-[4/5]" />
                      <span className="block px-1 pt-2 text-[13px] font-semibold">{p.brand ? `${p.brand} ${p.step.toLowerCase()}` : p.step}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
            {/* her name rises once the deck is through */}
            {first && named && (
              <p className="absolute flex overflow-hidden pb-[0.12em] text-[clamp(3.25rem,15vw,12rem)] font-bold leading-none tracking-[-0.04em]">
                {"cherrryyyii".split("").map((ch, i) => (
                  <motion.span key={i} className="inline-block" initial={{ y: "105%" }} animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: EASE, delay: i * 0.035 }}>
                    {ch}
                  </motion.span>
                ))}
              </p>
            )}
          </div>

          <div className={`wrap pb-6 ${first ? "" : "opacity-0"}`}>
            <div className="flex items-end justify-between gap-4">
              <span className="text-[13px] text-muted">Skincare &amp; makeup, each one tap from Shopee</span>
              <span ref={count} className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-none tabular-nums tracking-[-0.04em]">000</span>
            </div>
            <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-ink/10">
              {first && <motion.div className="h-full origin-left bg-cherry" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: reduce ? 0.6 : 3, ease: [0.65, 0, 0.35, 1] }} />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- small pieces ---------- */

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={`h-4 w-4 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}



function Heading({ children, className = "" }: { children: string; className?: string }) {
  return (
    <h2 className={`text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.035em] [text-wrap:balance] ${className}`}>
      {children}
    </h2>
  );
}

/** Photo slot: her photo when there is one, otherwise the product's name set large on its colour, like a label. */
const isDark = (hex: string) => {
  const n = parseInt(hex.slice(1, 7), 16);
  return ((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114 < 140;
};

function Photo({ src, tint, alt, label, className = "", sizes }: { src?: string; tint: string; alt: string; label?: string; className?: string; sizes: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`@container relative overflow-hidden rounded-lg ${className}`}
      style={{ background: `radial-gradient(120% 90% at 30% 15%, rgba(255,255,255,.35), transparent 60%), ${tint}` }}>
      {src && !broken ? (
        <Image src={src} alt={alt} fill sizes={sizes} onError={() => setBroken(true)}
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]" />
      ) : label ? (
        <span aria-hidden className="absolute inset-x-4 bottom-3 text-[clamp(1.25rem,15cqw,3rem)] font-bold lowercase leading-[0.95] tracking-[-0.04em] transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 sm:inset-x-5 sm:bottom-4"
          style={{ color: `color-mix(in oklab, ${tint} 45%, ${isDark(tint) ? "#FFFFFF" : "#24161A"})` }}>
          {label}
        </span>
      ) : null}
    </div>
  );
}

function DraftBanner() {
  const [open, setOpen] = useState(true);
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden bg-blush">
          <div className="wrap flex items-center gap-3 py-2 text-[13px] leading-snug text-ink/80">
            <p className="flex-1"><b className="font-semibold text-ink">Draft for @cherrryyyii.</b> Links are real; photos and product names are waiting for you.</p>
            <button onClick={() => setOpen(false)} aria-label="Close draft note" className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-white/70">
              <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" /></svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Sticky header: picks up a hairline and a frosted ground once the page scrolls under it. */
function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => scrollY.on("change", (y) => setScrolled(y > 8)), [scrollY]);
  return (
    <header className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${scrolled ? "bg-milk/85 shadow-[0_1px_0_rgba(36,22,26,.08)] backdrop-blur-md" : "bg-milk"}`}>
      <div className="wrap flex h-14 items-center justify-between">
        <a href="#" className="text-lg font-bold tracking-[-0.02em]">
          cherrryyyii
        </a>
        <nav className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.06em]">
          <a href="#shop" className="hidden rounded-full px-3 py-2 hover:bg-blush sm:block">Shop</a>
          <a href="#about" className="hidden rounded-full px-3 py-2 hover:bg-blush sm:block">About</a>
          <a href={THREADS} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 hover:bg-blush">
            Threads <Arrow className="h-3.5 w-3.5 -rotate-45" />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Intro({ picks }: { picks: Product[] }) {
  return (
    <section className="relative overflow-hidden bg-blush">
      <div className="wrap relative z-10 flex items-start justify-between gap-10 pb-[clamp(4rem,15vw,15rem)] pt-3 md:pt-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}
          className="max-w-xl rounded-lg bg-white p-4 shadow-[0_12px_40px_-16px_rgba(36,22,26,.18)] md:p-8">
          <div className="mb-3 md:mb-5">
            <span className="leading-tight">
              <b className="block font-semibold">@cherrryyyii</b>
              <span className="text-[13px] text-muted">Skincare &amp; makeup</span>
            </span>
          </div>
          <h1 className="text-[clamp(2.25rem,4.6vw,4rem)] font-bold leading-[0.98] tracking-[-0.04em]">
            <MaskLines delay={0.15} lines={["Everything I", "actually use."]} />
          </h1>
          <p className="mt-3 text-[17px] leading-relaxed text-muted md:mt-4 md:text-lg">
            My moisturiser, toner mist, lip tint and more, each one tap from Shopee.
          </p>
        </motion.div>
        {/* her most-used products, fanned like they're on the shelf (desktop only) */}
        {picks.length > 0 && <div className="relative mr-[2vw] mt-6 hidden h-80 w-[34rem] shrink-0 xl:block">
          {picks.map((p, i) => (
            <motion.a key={p.id} href={p.link} target="_blank" rel="sponsored noopener" aria-label={`Buy ${p.brand ?? p.step} on Shopee (new tab, affiliate link)`}
              initial={{ opacity: 0, y: 40, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: (i - 1) * 7 }}
              whileHover={{ y: -12, rotate: 0, zIndex: 10 }}
              transition={{ duration: 1, ease: EASE, delay: 0.35 + i * 0.1 }}
              style={{ left: `${i * 11}rem`, top: i === 1 ? 0 : "1.5rem", zIndex: i === 1 ? 2 : 1 }}
              className="group absolute w-48 rounded-lg bg-white p-2 shadow-[0_18px_40px_-18px_rgba(36,22,26,.35)]">
              <Photo src={p.photo} tint={p.tint} alt={p.brand ?? p.step} label={p.brand ?? p.step} sizes="12rem" className="aspect-[4/5]" />
              <span className="flex items-center justify-between px-1 pb-0.5 pt-2 text-[13px] font-semibold">
                {p.brand ? `${p.brand} ${p.step.toLowerCase()}` : p.step}
                <Arrow className="h-3.5 w-3.5 -rotate-45 text-cherry" />
              </span>
            </motion.a>
          ))}
        </div>}
      </div>
      {/* the wordmark, set huge and cropped by the band's bottom edge */}
      <motion.p aria-hidden initial={{ y: "30%" }} animate={{ y: "-4%" }} transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none whitespace-nowrap text-center text-[clamp(4.5rem,18.5vw,26rem)] font-bold leading-[0.8] tracking-[-0.04em] text-white">
        cherrryyyii
      </motion.p>
    </section>
  );
}

/* ---------- shop ---------- */

function Shop({ routines, routine, setActive }: { routines: Routine[]; routine: Routine; setActive: (id: string) => void }) {
  return (
    <section id="shop" aria-label="Products" className="wrap scroll-mt-16 pb-24 pt-2 md:pt-6">
      <div className="sticky top-14 z-30 -mx-[var(--gutter)] bg-milk/90 px-[var(--gutter)] backdrop-blur-md">
        <div role="tablist" aria-label="Show" className="no-scrollbar flex gap-6 overflow-x-auto border-b border-ink/10">
          {routines.map((r) => {
            const on = r.id === routine.id;
            return (
              <button key={r.id} role="tab" id={`tab-${r.id}`} aria-selected={on} aria-controls="shop-panel" onClick={() => setActive(r.id)}
                className={`relative min-h-11 shrink-0 whitespace-nowrap text-[15px] font-semibold transition-colors ${on ? "text-ink" : "text-muted hover:text-ink"}`}>
                {r.tab}
                {on && <motion.span layoutId="tab-line" className="absolute inset-x-0 -bottom-px h-0.5 bg-cherry" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-2 text-[13px] text-muted"><span className="sm:hidden">Affiliate links: I earn a little, you pay the same.</span><span className="hidden sm:inline">{DISCLOSURE}</span></p>

      <div id="shop-panel" role="tabpanel" aria-labelledby={`tab-${routine.id}`} className="mt-4 md:mt-6">
        <AnimatePresence mode="wait" initial={false}>
          {routine.intro ? (
            <motion.div key={routine.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
              className="mb-8 max-w-xl">
              <ThreadsPost text={routine.intro} url={routine.post} post={posts.find((x) => x.url === routine.post)} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.ul layout className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4 lg:gap-y-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {routine.products.map((p, i) => (
              <Tile key={p.id} p={p} i={i} sets={setsFor(p, routines)} />
            ))}
          </AnimatePresence>
        </motion.ul>
        {routine.products.length === 0 && <p className="py-16 text-center text-muted">No products here yet. Check back after my next post.</p>}

        {routine.tip && (
          <motion.aside key={routine.id + "-tip"} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-12 max-w-xl rounded-2xl bg-blush p-6">
            <p className="text-sm font-semibold">My tip <span className="font-normal text-muted">· draft</span></p>
            <p lang="ms" className="mt-1 text-lg leading-snug">{routine.tip}</p>
          </motion.aside>
        )}
      </div>
    </section>
  );
}

function Tile({ p, i, sets }: { p: Product; i: number; sets: string[] }) {
  const title = p.name ? `${p.brand ? p.brand + " " : ""}${p.name}` : p.brand ? `${p.brand} ${p.step.toLowerCase()}` : p.step;
  const detail = p.name || p.brand ? p.step : sets.join(" · ");
  const label = `Buy ${p.step}${p.shade ? ` ${p.shade}` : ""} on Shopee (new tab, affiliate link)`;
  return (
    <motion.li layout initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5% 0px" }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.8, ease: EASE, delay: (i % 4) * 0.06 }}
      className="group flex flex-col">
      <a href={p.link || undefined} target="_blank" rel="sponsored noopener" tabIndex={-1} aria-hidden className="relative block">
        <Photo src={p.photo} tint={p.tint} alt={title} label={p.brand ?? p.step} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-square" />
        <span className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5 sm:left-3 sm:top-3">
          {p.core && <span className="rounded bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]">Most used</span>}
          {p.shade && <span className="rounded bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]">{p.shade}</span>}
        </span>
      </a>
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-[-0.01em] sm:text-lg">{title}</h3>
        {detail && <p className="mt-0.5 text-[13px] text-muted">{detail}</p>}
        {p.note && <p lang="ms" className="mt-2 text-[15px] leading-snug text-ink/80">“{p.note}”</p>}
        <div className="mt-auto pt-3">
          {!p.link ? (
            <span className="flex min-h-11 items-center justify-center rounded-md text-sm font-semibold text-muted ring-1 ring-inset ring-ink/15">Link coming</span>
          ) : (
            <a href={p.link} target="_blank" rel="sponsored noopener" aria-label={label}
              className="group/btn flex min-h-11 items-center justify-center gap-2 rounded-md text-[15px] font-semibold text-cherry ring-1 ring-inset ring-cherry transition-colors duration-300 hover:bg-cherry hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry">
              <span className="sm:hidden">Buy</span><span className="hidden sm:inline">Buy on Shopee</span>
              <Arrow className="h-3.5 w-3.5 -rotate-45 transition-transform duration-500 ease-out-expo group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.li>
  );
}

/* ---------- proof: her Threads ---------- */

/** One of her Threads posts, shown the way Threads shows it: her words exactly as posted. */
function ThreadsPost({ text, url, post, hidden, className = "" }: { text: string; url?: string; post?: (typeof posts)[number]; hidden?: boolean; className?: string }) {
  return (
    <a href={url || THREADS} target="_blank" rel="noopener" draggable={false} aria-hidden={hidden} tabIndex={hidden ? -1 : undefined}
      className={`flex flex-col rounded-2xl border border-ink/10 bg-white p-5 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink/25 ${className}`}>
      <span className="flex items-center gap-2.5">
        <span className="text-[15px] font-semibold">cherrryyyii</span>
        {post && <span className="text-[15px] text-muted">{post.date}</span>}
        <Arrow className="ml-auto h-3.5 w-3.5 -rotate-45 text-muted" />
      </span>
      <p lang="ms" className="mt-3 flex-1 text-[17px] leading-snug">{text}</p>
      {post && <span className="mt-4 text-[13px] text-muted">{post.likes.toLocaleString("en-MY")} likes · View on Threads</span>}
    </a>
  );
}

function FromThreads() {
  return (
    <section className="border-y border-ink/10 py-20 md:py-24">
      <div className="wrap flex flex-wrap items-end justify-between gap-6">
        <div>
          <Heading>From my Threads.</Heading>
          <p className="mt-3 max-w-md text-muted">New products, questions and reviews go up there first.</p>
        </div>
        <a href={THREADS} target="_blank" rel="noopener" className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 px-5 font-semibold transition-colors hover:border-ink">
          Follow @cherrryyyii <Arrow className="-rotate-45 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5" />
        </a>
      </div>
      <div className="mt-10 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
        <AutoScroller>
          {/* 4 copies so the strip is always wider than the screen, even on ultra-wide */}
          {[0, 1, 2, 3].map((copy) => posts.map((p) => <ThreadsPost key={copy + p.url} text={p.quote} url={p.url} post={p} hidden={copy > 0} className="w-72 shrink-0 sm:w-80" />))}
        </AutoScroller>
      </div>
    </section>
  );
}

function Reviews({ reviews, routines }: { reviews: Review[]; routines: Routine[] }) {
  return (
    <section className="wrap pt-24">
      <Heading>From people who tried it.</Heading>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.id} className="rounded-2xl bg-milk p-6">
            <blockquote className="text-[15px] leading-relaxed">“{r.text}”</blockquote>
            <figcaption className="mt-4 flex items-center justify-between text-sm">
              <b className="font-semibold">{r.name}</b>
              <span className="text-muted">{routines.find((x) => x.id === r.routine)?.tab}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- questions, about, footer ---------- */

function Faq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className="wrap grid gap-8 py-24 md:grid-cols-[1fr_1.5fr] md:gap-16">
      <Heading>Questions.</Heading>
      <div className="border-t border-ink/10">
        {FAQ.map((f) => (
          <details key={f.q} className="group border-b border-ink/10">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4 shrink-0 text-muted transition-transform duration-500 ease-out-expo group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M8 3v10M3 8h10" /></svg>
            </summary>
            <p className="max-w-prose pb-5 pr-10 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}

function About() {
  const quote = posts.find((p) => p.url === ABOUT.quote);
  const best = Math.max(...posts.map((p) => p.likes));
  return (
    <section id="about" className="scroll-mt-16 bg-blush">
      <div className={`wrap grid gap-10 py-20 md:items-start md:gap-16 md:py-28 ${ABOUT.portrait ? "md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]" : "md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"}`}>
        <div>
          {ABOUT.portrait && (
            <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-lg">
              <Image src={ABOUT.portrait} alt="Cherry" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
          )}
          <h2 className="text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            {["Hi, I’m", "Cherry."].map((line, i) => (
              <span key={line} className="-mb-[0.14em] block overflow-hidden pb-[0.18em]">
                <motion.span className="block" initial={{ y: "105%" }} whileInView={{ y: "0%" }} viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        <div className="md:pt-3">
          <p lang="ms" className="max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl">{ABOUT.intro}</p>
          {quote && (
            <figure className="mt-10 max-w-xl border-t border-ink/15 pt-6">
              <blockquote lang="ms" className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-snug tracking-[-0.02em]">“{quote.quote}”</blockquote>
              <figcaption className="mt-3 text-[13px] text-muted">
                <a href={quote.url} target="_blank" rel="noopener" className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink">My post, {quote.date}</a>
                {" · "}{best.toLocaleString("en-MY")} likes on my most-liked post so far
              </figcaption>
            </figure>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={THREADS} target="_blank" rel="noopener"
              className="group inline-flex min-h-12 items-center gap-2 rounded-md bg-ink px-5 font-semibold text-milk transition-colors hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
              Follow @cherrryyyii on Threads <Arrow className="h-3.5 w-3.5 -rotate-45 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href="#shop" className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-ink/80 hover:text-ink">
              Back to products <Arrow className="h-3.5 w-3.5 -rotate-90" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="wrap grid gap-6 py-10 text-sm text-muted md:grid-cols-[auto_1fr_auto] md:items-start md:gap-12">
        <span className="font-bold text-ink">cherrryyyii</span>
        <p className="max-w-2xl"><b className="font-semibold text-ink">Affiliate disclosure.</b> {DISCLOSURE}</p>
        <p className="flex gap-4 text-xs md:flex-col md:items-end md:gap-1">
          <span>© 2026 · Draft, not live yet</span>
        </p>
      </div>
    </footer>
  );
}

/** Endless strip at a constant speed. Moves with a sub-pixel transform (scrollLeft rounds to whole
 *  pixels, which made it stutter); drag with mouse or finger, pauses while a card has keyboard focus. */
function AutoScroller({ children, speed = 40 /* px per second */ }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    // distance from a card to the same card in the next copy = one loop period
    const copyWidth = () => {
      const kids = track.children as HTMLCollectionOf<HTMLElement>;
      return kids[kids.length / 4].offsetLeft - kids[0].offsetLeft;
    };
    let pos = 0, last = performance.now(), frame = 0, focused = false;
    let drag: { x: number; start: number; moved: boolean } | null = null;

    const down = (e: PointerEvent) => { drag = { x: e.clientX, start: pos, moved: false }; };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) drag.moved = true;
      if (drag.moved) pos = drag.start - dx;
    };
    const up = () => setTimeout(() => (drag = null)); // after the click event, so it can see `moved`
    const click = (e: MouseEvent) => drag?.moved && e.preventDefault(); // a drag isn't a tap on the card link
    const focusIn = () => { focused = true; track.parentElement!.scrollLeft = 0; };
    const focusOut = () => (focused = false);

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000; // a backgrounded tab doesn't jump on return
      last = now;
      if (!drag && !focused && !reduce) pos += speed * dt;
      const w = copyWidth();
      pos = ((pos % w) + w) % w;
      track.style.transform = `translate3d(${-pos}px,0,0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    track.addEventListener("pointerdown", down);
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
    addEventListener("pointercancel", up);
    track.addEventListener("click", click, true);
    track.addEventListener("focusin", focusIn);
    track.addEventListener("focusout", focusOut);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("pointerdown", down);
      removeEventListener("pointermove", move);
      removeEventListener("pointerup", up);
      removeEventListener("pointercancel", up);
      track.removeEventListener("click", click, true);
      track.removeEventListener("focusin", focusIn);
      track.removeEventListener("focusout", focusOut);
    };
  }, [speed, reduce]);

  return (
    <div className="overflow-hidden">
      <div ref={ref} className="flex w-max cursor-grab gap-4 px-[var(--gutter)] py-2 will-change-transform [touch-action:pan-y] active:cursor-grabbing [&_a]:select-none">
        {children}
      </div>
    </div>
  );
}
