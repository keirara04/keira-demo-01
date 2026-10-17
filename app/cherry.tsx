"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { DISCLOSURE, THREADS, posts, type Pack, type Product, type Review, type Routine } from "./data";
import { useSiteData } from "./store";

// One easing curve everywhere — the long-tail "expo out" that After Effects' easy-ease
// gets dragged into. Consistency is what makes it read as sleek rather than busy.
const EASE = [0.16, 1, 0.3, 1] as const;

const ALL = "semua";

/** "Semua" tab first: every affiliate product once (shared skincare items aren't repeated). */
function withAllTab(routines: Routine[]): Routine[] {
  const seen = new Set<string>();
  const products = routines.flatMap((r) => r.products).filter((p) => {
    const key = p.core ? "core:" + p.step.toLowerCase() : p.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (!products.length) return routines;
  return [
    { id: ALL, tab: "Semua", title: "Semua produk saya", when: "Skincare & makeup",
      intro: "Semua yang saya pakai dan recommend, dalam satu tempat.", tip: "", post: "", products },
    ...routines,
  ];
}

export default function Cherry() {
  const { data } = useSiteData();
  const { reviews } = data;
  const routines = withAllTab(data.routines);
  const [active, setActive] = useState(ALL);
  const routine = routines.find((r) => r.id === active) ?? routines[0];
  const shown = reviews.filter((r) => r.visible && r.consent);

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: EASE }}>
      <div className="grain min-h-dvh overflow-x-clip">
        <DraftBanner />
        <Header />
        {routine && <Hero routine={routine} routines={routines} open={(id) => { setActive(id); document.getElementById("rutin")?.scrollIntoView(); }} />}
        <Ribbon />
        {routine && <Routines routines={routines} routine={routine} setActive={setActive} />}
        <FromThreads />
        {shown.length > 0 && <Reviews reviews={shown} routines={routines} />}
        <About />
        <Footer />
        <FloatingNav />
      </div>
    </MotionConfig>
  );
}

/* ---------- small pieces ---------- */

function DraftBanner() {
  const [open, setOpen] = useState(true);
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="overflow-hidden bg-stem text-milk"
        >
          <div className="wrap flex items-start gap-3 py-2.5 text-[13px] leading-snug sm:items-center">
            <p className="flex-1">
              <b className="font-semibold">Mockup untuk @cherrryyyii.</b> Link Shopee ni link sebenar dari Threads awak. Nama
              produk, gambar &amp; ayat masih draf — awak sahkan dulu.
            </p>
            <button onClick={() => setOpen(false)} className="shrink-0 rounded-full px-2 py-0.5 text-milk/80 hover:bg-white/10" aria-label="Tutup nota draf">
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CherryMark({ className = "" }: { className?: string }) {
  // Stems draw on, then the two cherries pop — a classic AE trim-path + scale reveal.
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <motion.path
        d="M14 27 C 15 18, 19 10, 27 5 M26 26 C 25 18, 25 11, 27 5 M27 5 C 30 6, 33 9, 33 12 C 30 12, 28 9, 27 5"
        fill="none" stroke="var(--color-stem)" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      />
      {[[13, 30], [26, 30]].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="7" fill="var(--color-cherry)"
          initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ transformOrigin: `${cx}px ${cy}px` }}
          transition={{ type: "spring", stiffness: 500, damping: 14, delay: 0.9 + i * 0.12 }}
        />
      ))}
    </svg>
  );
}

function Header() {
  return (
    <header className="wrap flex items-center justify-between py-4">
      <a href="#" className="flex items-center gap-2 font-display text-2xl tracking-tight">
        <CherryMark className="h-9 w-9" />
        cherrryyyii
      </a>
      <nav className="flex items-center gap-2 text-sm font-medium sm:gap-5">
        <a href="#rutin" className="hidden hover:text-cherry sm:inline">Produk</a>
        <a href="#about" className="hidden hover:text-cherry sm:inline">Tentang</a>
        <a href={THREADS} target="_blank" rel="noopener" className="rounded-full border border-ink/15 px-3.5 py-1.5 hover:border-cherry hover:text-cherry">
          Threads ↗
        </a>
        {/* ponytail: open link for the mockup; hide behind login before going live */}
        <Link href="/admin" className="rounded-full bg-ink px-3.5 py-1.5 text-milk hover:bg-cherry">Admin</Link>
      </nav>
    </header>
  );
}

/** Each line slides up out of a mask — the signature kinetic-type move. */
function MaskLines({ lines, delay = 0, className = "" }: { lines: React.ReactNode[]; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block origin-bottom-left"
            initial={{ y: "110%", rotate: 4 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Words rise + unblur when scrolled into view. */
function RevealWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ staggerChildren: 0.06 }}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span className="inline-block"
            variants={{ hidden: { y: "100%", opacity: 0, filter: "blur(6px)" }, show: { y: "0%", opacity: 1, filter: "blur(0px)" } }}
            transition={{ duration: 0.8, ease: EASE }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function CountUp({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    if (reduce) { el.textContent = to.toLocaleString("en-MY"); return; }
    const c = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: (v) => (el.textContent = Math.round(v).toLocaleString("en-MY")) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref} className={className}>0</span>;
}

/* ---------- hero ---------- */

function Hero({ routine, routines, open }: { routine: Routine; routines: Routine[]; open: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shelfY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const all = routines.find((r) => r.id === ALL);
  const sections = routines.filter((r) => r.id !== ALL);

  return (
    <section ref={ref} className="wrap relative grid gap-10 pb-16 pt-6 md:min-h-[calc(100dvh-7rem)] md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16 md:pt-8">
      <HazeBlobs />
      <motion.div style={{ y: textY }} className="relative">
        <motion.p initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-cherry">
          <span>Katalog Cherry</span>
          <motion.span className="h-px w-10 origin-left bg-cherry" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 1 }} />
          <span className="text-muted">Edisi Okt 2026</span>
        </motion.p>
        <h1 className="font-display text-[clamp(3rem,6vw,8.5rem)] leading-[0.92] tracking-[-0.03em]">
          <MaskLines delay={0.25} lines={["Skincare &", "makeup yang", <span key="c" className="text-cherry">saya pakai.</span>]} />
        </h1>
        <motion.p initial={{ opacity: 0, y: 14, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.75 }}
          className="mt-6 max-w-md text-[17px] leading-relaxed text-muted xl:max-w-lg xl:text-xl">
          Semua produk dari post Threads saya, dikumpul dalam satu tempat. Setiap satu ada link Shopee.
        </motion.p>

        {/* catalogue contents: one line per section, like the index page of a magazine */}
        <motion.ol initial="hidden" animate="show" transition={{ staggerChildren: 0.07, delayChildren: 0.95 }}
          className="mt-8 max-w-lg border-t border-ink/15">
          {sections.map((r, i) => (
            <motion.li key={r.id} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.7, ease: EASE }}>
              <button onClick={() => open(r.id)}
                className="group flex w-full items-baseline gap-4 border-b border-ink/15 py-3 text-left transition-colors hover:text-cherry">
                <span className="w-6 font-display text-sm text-muted group-hover:text-cherry">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-semibold">{r.tab}</span>
                <span className="text-sm text-muted">{r.products.length} produk</span>
                <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">→</span>
              </button>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-8">
          <button onClick={() => open(ALL)} className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-milk transition-colors hover:bg-cherry">
            Buka katalog{all ? ` · ${all.products.length} produk` : ""}
            <span className="transition-transform duration-500 ease-out-expo group-hover:translate-y-1">↓</span>
          </button>
        </motion.div>
      </motion.div>
      <motion.div style={{ y: shelfY }} className="relative">
        <Shelf routine={routine} />
      </motion.div>
    </section>
  );
}

function HazeBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-blush blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-haze blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}

function Shelf({ routine }: { routine: Routine }) {
  return (
    <motion.figure
      initial={{ clipPath: "inset(12% 12% 12% 12% round 2rem)", opacity: 0 }}
      animate={{ clipPath: "inset(0% 0% 0% 0% round 2rem)", opacity: 1 }}
      transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-blush sm:aspect-[5/4] md:aspect-[4/5] xl:aspect-[5/4]">
      {/* slow push-in, like a camera drifting toward the shelf */}
      <motion.div className="absolute inset-0" initial={{ scale: 1.25 }} animate={{ scale: 1.05 }} transition={{ duration: 6, ease: EASE, delay: 0.3 }}>
        <Image src="/shelf.jpg" alt="Produk skincare dan makeup atas latar pink" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />

      <figcaption className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-milk sm:p-6">
        <span className="rounded-full bg-milk/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">Rak Cherry</span>
        <AnimatePresence mode="wait">
          <motion.span key={routine.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}
            className="rounded-full bg-cherry px-3 py-1 font-display text-sm">
            {routine.tab}
          </motion.span>
        </AnimatePresence>
      </figcaption>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-milk sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={routine.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease: EASE }}>
            <p className="font-display text-5xl leading-none">{routine.products.length}</p>
            <p className="mt-1 text-sm text-milk/85">produk · {routine.when}</p>
          </motion.div>
        </AnimatePresence>
        {/* ponytail: stock mockup photo; swap for Cherry's own shelf photo */}
        <a href="https://unsplash.com/photos/pink-cosmetic-containers-and-makeup-brush-dMjkQJs58uo" target="_blank" rel="noopener"
          className="text-[10px] text-milk/70 hover:text-milk">Foto contoh: pmv chamara / Unsplash</a>
      </div>
    </motion.figure>
  );
}

/** Illustrated packaging — placeholder until Cherry's own product photos are shot. */
function Bottle({ pack, tint, label }: { pack: Pack; tint: string; label: string }) {
  const body = "var(--color-ink)";
  const shapes: Record<Pack, React.ReactNode> = {
    tube: <><rect x="14" y="18" width="32" height="88" rx="6" fill={tint} /><rect x="20" y="6" width="20" height="14" rx="3" fill={body} /></>,
    pump: <><rect x="10" y="40" width="40" height="66" rx="10" fill={tint} /><rect x="24" y="24" width="12" height="18" fill={body} /><rect x="24" y="16" width="26" height="8" rx="3" fill={body} /></>,
    mist: <><rect x="13" y="34" width="34" height="72" rx="12" fill={tint} /><rect x="22" y="18" width="16" height="18" rx="3" fill={body} /><rect x="26" y="10" width="8" height="10" rx="2" fill={body} /></>,
    dropper: <><rect x="12" y="50" width="36" height="56" rx="8" fill={tint} /><rect x="20" y="36" width="20" height="16" rx="3" fill={body} /><ellipse cx="30" cy="26" rx="8" ry="12" fill={body} /></>,
    jar: <><rect x="6" y="66" width="48" height="40" rx="10" fill={tint} /><rect x="4" y="54" width="52" height="14" rx="5" fill={body} /></>,
    stick: <><rect x="17" y="46" width="26" height="60" rx="5" fill={tint} /><rect x="17" y="24" width="26" height="24" rx="5" fill={body} /></>,
    compact: <><rect x="6" y="84" width="48" height="22" rx="11" fill={tint} /><rect x="6" y="76" width="48" height="12" rx="6" fill={body} /></>,
  };
  return (
    <svg viewBox="0 0 60 112" className="w-full drop-shadow-[0_10px_10px_rgba(36,22,26,.15)]" role="img" aria-label={label}>
      <g stroke="rgba(36,22,26,.12)" strokeWidth="1">{shapes[pack]}</g>
      <rect x="18" y="80" width="24" height="10" rx="2" fill="rgba(255,255,255,.75)" />
    </svg>
  );
}

/* ---------- ribbon ---------- */

function Ribbon() {
  const words = ["Cleanser", "Toner mist", "Serum", "Moisturiser", "Sunscreen", "Skin tint", "Blusher", "Lip tint"];
  // Two identical halves slide -50% forever, so the seam never shows.
  return (
    <div aria-hidden className="relative -rotate-2 overflow-hidden bg-cherry py-4 text-milk">
      <div className="ribbon flex w-max whitespace-nowrap font-display text-3xl sm:text-4xl">
        {[0, 1].map((half) => (
          <div key={half} className="flex">
            {[...words, ...words].map((w, i) => (
              <span key={i} className="flex items-center gap-8 pr-8">{w}<span className="text-xl text-milk/60">✿</span></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- routines ---------- */

const cardVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0% round 1.5rem)", y: 40 },
  show: (i: number) => ({
    clipPath: "inset(0% 0% 0% 0% round 1.5rem)", y: 0,
    transition: { duration: 1, ease: EASE, delay: 0.08 * i },
  }),
  exit: { opacity: 0, y: -16, filter: "blur(8px)", transition: { duration: 0.3 } },
};

function Routines({ routines, routine, setActive }: { routines: Routine[]; routine: Routine; setActive: (id: string) => void }) {
  const active = routine.id;
  // ≤4 tabs share the width evenly (nothing clipped on a phone); more than that scrolls.
  const fit = routines.length <= 4;
  return (
    <section id="rutin" className="wrap scroll-mt-4 pb-20 pt-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cherry">Produk</p>
      <h2 className="max-w-3xl font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.02em]">
        <RevealWords text="Produk yang saya guna setakat ni." />
      </h2>

      {/* sticky tab bar: sits under the thumb while scrolling cards */}
      <div className="sticky top-0 z-30 mx-[calc(var(--gutter)*-1)] mt-8 bg-milk/80 px-[var(--gutter)] py-3 backdrop-blur-md">
        <div role="tablist" aria-label="Pilih rutin" className={fit ? "grid grid-flow-col auto-cols-fr gap-1.5 sm:flex sm:gap-2" : "no-scrollbar flex gap-2 overflow-x-auto"}>
          {routines.map((r) => {
            const on = r.id === active;
            return (
              <button key={r.id} role="tab" id={`tab-${r.id}`} aria-selected={on} aria-controls="rutin-panel" onClick={() => setActive(r.id)}
                className={`relative min-h-11 shrink-0 rounded-full px-3 py-2 text-[13px] font-semibold leading-tight transition-colors sm:px-4 sm:text-sm ${on ? "text-milk" : "bg-ink/[0.04] text-ink hover:text-cherry"}`}>
                {on && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-cherry" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="relative">{r.tab}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted">{DISCLOSURE}</p>
      </div>

      <div id="rutin-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div key={routine.id} initial="hidden" animate="show" exit="exit">
            <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <motion.h3 variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 }, exit: { opacity: 0 } }} className="font-display text-3xl">
                  {routine.title}
                </motion.h3>
                <motion.blockquote variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { delay: 0.1 } }, exit: { opacity: 0 } }}
                  className="mt-2 max-w-xl text-lg text-muted">
                  {routine.post ? `“${routine.intro}”` : routine.intro}{" "}
                  {routine.post && <a href={routine.post} target="_blank" rel="noopener" className="whitespace-nowrap text-sm font-semibold text-cherry underline-offset-4 hover:underline">post asal ↗</a>}
                </motion.blockquote>
              </div>
              <motion.span variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 }, exit: { opacity: 0 } }}
                className="justify-self-start rounded-full border border-ink/15 px-4 py-1.5 text-sm font-semibold md:justify-self-end">
                {routine.when}
              </motion.span>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
              {routine.products.map((p, i) => (
                <StepCard key={p.id} p={p} i={i} label={routine.id === ALL ? p.step : `Langkah ${i + 1} · ${p.step}`} />
              ))}
            </ol>

            {routine.tip && <motion.aside variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8, ease: EASE } }, exit: { opacity: 0 } }}
              className="mt-6 flex items-start gap-3 rounded-3xl bg-stem p-5 text-milk sm:p-6">
              <span className="font-display text-2xl leading-none">✿</span>
              <p className="text-[15px] leading-relaxed"><b className="font-semibold">Tip Cherry</b> <span className="text-milk/60">(draf)</span>: {routine.tip}</p>
            </motion.aside>}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function StepCard({ p, i, label }: { p: Product; i: number; label: string }) {
  return (
    <motion.li custom={i} variants={cardVariants}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white/70 p-5 shadow-[0_1px_0_rgba(36,22,26,.04)] transition-shadow duration-500 hover:shadow-[0_24px_48px_-24px_rgba(184,29,56,.35)]">
      <div className="flex items-start justify-between">
        <span className="font-display text-5xl leading-none text-cherry/90">{String(i + 1).padStart(2, "0")}</span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {p.core && <span className="rounded-full bg-stem/10 px-2.5 py-1 text-[11px] font-semibold text-stem">Kering &amp; berminyak</span>}
          {p.shade && <span className="rounded-full bg-blush px-2.5 py-1 text-[11px] font-semibold text-cherry">{p.shade}</span>}
        </div>
      </div>

      <div className="relative my-4 grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-haze/60 to-blush">
        <motion.div className="w-1/4" whileHover={{ rotate: -6, y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 12 }}>
          <Bottle pack={p.pack} tint={p.tint} label={p.step} />
        </motion.div>
        <span className="absolute bottom-2 right-3 text-[10px] uppercase tracking-[0.14em] text-muted/70">foto produk nanti</span>
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
      <h4 className="mt-1 font-display text-2xl leading-tight">
        {p.brand ?? <span className="text-muted/60">Jenama</span>}{" "}
        <span className="text-muted/60">{p.name ?? "— nama produk"}</span>
      </h4>
      {p.note && <p className="mt-3 border-l-2 border-stem/40 pl-3 text-[15px] italic leading-snug text-stem">“{p.note}”</p>}

      <a href={p.link} target="_blank" rel="sponsored noopener" aria-label={`Beli ${p.step} di Shopee (tab baru, link afiliasi)`}
        className="group/btn relative mt-auto flex min-h-12 translate-y-5 items-center justify-between overflow-hidden rounded-full bg-cherry px-5 font-semibold text-milk">
        {/* fill wipe on hover — a horizontal track-matte */}
        <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out-expo group-hover/btn:scale-x-100" />
        <span className="relative">Beli di Shopee</span>
        <span className="relative transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-1">→</span>
      </a>
      <span className="mt-7 text-center text-[11px] text-muted">link afiliasi</span>
    </motion.li>
  );
}

/* ---------- from threads ---------- */

function ThreadCard({ p, hidden }: { p: (typeof posts)[number]; hidden?: boolean }) {
  return (
    <a href={p.url} target="_blank" rel="noopener" draggable={false} aria-hidden={hidden} tabIndex={hidden ? -1 : undefined}
      className="flex w-72 shrink-0 flex-col rounded-3xl border border-milk/10 bg-milk/[0.04] p-5 transition-[transform,background-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:bg-milk/[0.08] sm:w-80">
      <span className="text-xs text-milk/50">{p.date} · @cherrryyyii</span>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-milk/90">“{p.quote}”</p>
      <div className="mt-6 flex items-end justify-between">
        <div>
          <CountUp to={p.likes} className="block font-display text-4xl text-blush" />
          <span className="text-xs text-milk/50">likes · {p.shares} shares</span>
        </div>
        <span className="text-sm text-milk/60">↗</span>
      </div>
    </a>
  );
}

/**
 * Real scroll container that drifts left at a constant speed. Swipe, drag or trackpad
 * take over instantly; the drift picks up again from wherever they leave it.
 * Wraps by one copy-width so the loop never ends.
 */
function AutoScroller({ children, speed = 40 /* px per second */ }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const track = el.firstElementChild as HTMLElement;
    // distance from a card to the same card in the next copy = one loop period
    const copyWidth = () => {
      const kids = track.children as HTMLCollectionOf<HTMLElement>;
      return kids[kids.length / 4].offsetLeft - kids[0].offsetLeft;
    };
    let pos = el.scrollLeft, last = performance.now(), frame = 0, idleUntil = 0;
    const hold = (ms: number) => (idleUntil = performance.now() + ms);

    // mouse drag (touch already scrolls natively)
    let drag: { x: number; start: number; moved: boolean } | null = null;
    const down = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; drag = { x: e.clientX, start: el.scrollLeft, moved: false }; hold(1e9); };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) drag.moved = true;
      el.scrollLeft = drag.start - dx;
    };
    const up = () => { if (drag) hold(400); setTimeout(() => (drag = null)); };
    const click = (e: MouseEvent) => drag?.moved && e.preventDefault(); // a drag isn't a tap on the card link
    const user = () => hold(900); // touch / wheel: let momentum finish first

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      const w = copyWidth();
      if (now < idleUntil || reduce) {
        pos = el.scrollLeft;
      } else {
        if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft; // user moved it; continue from there
        pos += speed * dt;
      }
      if (pos >= w) pos -= w;
      if (pos < 1) pos += w;
      if (Math.abs(el.scrollLeft - pos) >= 0.5) el.scrollLeft = pos;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    el.addEventListener("pointerdown", down);
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
    el.addEventListener("click", click, true);
    el.addEventListener("touchstart", user, { passive: true });
    el.addEventListener("touchmove", user, { passive: true });
    el.addEventListener("wheel", user, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerdown", down);
      removeEventListener("pointermove", move);
      removeEventListener("pointerup", up);
      el.removeEventListener("click", click, true);
      el.removeEventListener("touchstart", user);
      el.removeEventListener("touchmove", user);
      el.removeEventListener("wheel", user);
    };
  }, [speed, reduce]);

  return (
    <div ref={ref} className="no-scrollbar cursor-grab overflow-x-auto overscroll-x-contain active:cursor-grabbing [&_a]:select-none" style={{ scrollbarWidth: "none" }}>
      <div className="flex w-max gap-4 px-[var(--gutter)] pb-2">{children}</div>
    </div>
  );
}

function FromThreads() {
  return (
    <section className="overflow-hidden bg-ink py-20 text-milk">
      <div className="wrap">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-blush/70">Jom connect</p>
        <h2 className="max-w-3xl font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.02em]">
          <RevealWords text="Apa yang saya kongsi kat Threads." />
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a href={THREADS} target="_blank" rel="noopener"
            className="group inline-flex items-center gap-2 rounded-full bg-milk px-5 py-3 font-semibold text-ink transition-colors hover:bg-blush">
            Follow @cherrryyyii
            <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
          <span className="text-sm text-milk/60">Rutin baru, soalan, review — semua kat sana dulu.</span>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }}
        className="mt-10 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <AutoScroller>
          {/* 4 copies so the strip is always wider than the screen, even on ultra-wide */}
          {[0, 1, 2, 3].map((copy) => posts.map((p) => <ThreadCard key={copy + p.url} p={p} hidden={copy > 0} />))}
        </AutoScroller>
      </motion.div>
    </section>
  );
}

function Reviews({ reviews, routines }: { reviews: Review[]; routines: Routine[] }) {
  return (
    <section className="wrap pt-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cherry">Kata followers</p>
      <h2 className="max-w-3xl font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.02em]">
        <RevealWords text="Dah cuba? Ni cerita korang." />
      </h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {reviews.map((r, i) => (
          <motion.figure key={r.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }} className="rounded-3xl bg-blush p-6">
            <blockquote className="text-[15px] leading-relaxed">“{r.text}”</blockquote>
            <figcaption className="mt-5 flex items-center justify-between gap-3 text-sm">
              <b className="font-semibold">{r.name}</b>
              <span className="rounded-full bg-milk px-2.5 py-1 text-[11px] font-semibold text-cherry">
                {routines.find((x) => x.id === r.routine)?.tab ?? "Rutin"}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/** Always-there pill: jumps to the routines, then flips to "back to top" once you're past the hero. */
function FloatingNav() {
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);
  useEffect(() => scrollY.on("change", (y) => setPast(y > innerHeight * 0.9)), [scrollY]);
  return (
    <motion.a href={past ? "#" : "#rutin"} onClick={(e) => { if (past) { e.preventDefault(); scrollTo({ top: 0, behavior: "smooth" }); } }}
      initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 22 }}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex h-12 items-center gap-2 overflow-hidden rounded-full bg-ink pl-4 pr-5 text-sm font-semibold text-milk shadow-[0_12px_30px_-8px_rgba(36,22,26,.55)] hover:bg-cherry sm:right-6"
      aria-label={past ? "Kembali ke atas" : "Pergi ke produk"}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={past ? "up" : "down"} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }} className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-milk/15">{past ? "↑" : "↓"}</span>
          {past ? "Atas" : "Lihat produk"}
        </motion.span>
      </AnimatePresence>
    </motion.a>
  );
}

/* ---------- about + footer ---------- */

function About() {
  return (
    <section id="about" className="wrap grid scroll-mt-4 gap-8 py-24 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
      <motion.div initial={{ scale: 0.6, opacity: 0, rotate: -12 }} whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        viewport={{ once: true }} transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="grid h-40 w-40 place-items-center rounded-full bg-blush md:h-64 md:w-64 xl:h-80 xl:w-80">
        <span className="text-center text-[11px] uppercase tracking-[0.14em] text-muted">foto<br />Cherry</span>
      </motion.div>
      <div>
        <h2 className="font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-none tracking-[-0.02em]"><RevealWords text="Hai, saya Cherry." /></h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Saya kongsi rutin skincare dan makeup untuk kulit Malaysia yang hadap panas, lembap dan kadang-kadang jerebu. Semua produk kat
          sini saya pakai sendiri dulu sebelum recommend.
        </motion.p>
        <a href={THREADS} target="_blank" rel="noopener" className="mt-6 inline-flex font-semibold text-cherry underline-offset-4 hover:underline">
          Follow @cherrryyyii kat Threads ↗
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="wrap py-10 text-sm text-muted">
        <p className="max-w-2xl"><b className="text-ink">Pendedahan afiliasi:</b> {DISCLOSURE} Saya hanya letak produk yang saya betul-betul pakai.</p>
        <p className="mt-4 flex flex-wrap justify-between gap-2 text-xs">
          <span>© 2026 cherrryyyii · Draf mockup — bukan laman rasmi lagi.</span>
          <Link href="/admin" className="font-semibold hover:text-cherry">Admin ›</Link>
        </p>
      </div>
    </footer>
  );
}
