"use client";

import { useEffect, useRef, useState } from "react";
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
import { DISCLOSURE, THREADS, posts, routines, type Pack, type Product } from "./data";

// One easing curve everywhere — the long-tail "expo out" that After Effects' easy-ease
// gets dragged into. Consistency is what makes it read as sleek rather than busy.
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Cherry() {
  const [active, setActive] = useState(routines[0].id);
  const routine = routines.find((r) => r.id === active)!;

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: EASE }}>
      <div className="grain min-h-dvh overflow-x-clip">
        <DraftBanner />
        <Header />
        <Hero routine={routine} />
        <Ribbon />
        <Routines active={active} setActive={setActive} />
        <FromThreads />
        <About />
        <Footer />
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
          <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-2.5 text-[13px] leading-snug sm:items-center">
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
    <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <a href="#" className="flex items-center gap-2 font-display text-2xl tracking-tight">
        <CherryMark className="h-9 w-9" />
        cherrryyyii
      </a>
      <nav className="flex items-center gap-5 text-sm font-medium">
        <a href="#rutin" className="hidden hover:text-cherry sm:inline">Rutin</a>
        <a href="#about" className="hidden hover:text-cherry sm:inline">Tentang</a>
        <a href={THREADS} target="_blank" rel="noopener" className="rounded-full border border-ink/15 px-3.5 py-1.5 hover:border-cherry hover:text-cherry">
          Threads ↗
        </a>
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

function Hero({ routine }: { routine: (typeof routines)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shelfY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  return (
    <section ref={ref} className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-6 sm:px-6 md:grid-cols-[1.15fr_1fr] md:items-end md:pt-14">
      <HazeBlobs />
      <motion.div style={{ y: textY }} className="relative">
        <motion.p initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-blush px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cherry">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cherry" /> Musim jerebu · Okt 2026
        </motion.p>
        <h1 className="font-display text-[clamp(3rem,13vw,6.5rem)] leading-[0.92] tracking-[-0.03em]">
          <MaskLines delay={0.25} lines={["Jerebu", "dah sampai.", <span key="c" className="text-cherry">Ni rutin saya.</span>]} />
        </h1>
        <motion.p initial={{ opacity: 0, y: 14, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.75 }}
          className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">
          Pilih rutin ikut jenis kulit, ikut step satu per satu, terus checkout kat Shopee. Tak payah scroll reply lagi.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#rutin" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-milk transition-colors hover:bg-cherry">
            Pilih rutin
            <span className="transition-transform duration-500 ease-out-expo group-hover:translate-y-1">↓</span>
          </a>
          <div className="text-sm leading-tight text-muted">
            <CountUp to={1533} className="block font-display text-3xl text-ink" />
            likes untuk satu post makeup
          </div>
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

function Shelf({ routine }: { routine: (typeof routines)[number] }) {
  return (
    <div className="relative aspect-[5/4] w-full rounded-[2rem] bg-gradient-to-b from-blush to-haze/70 p-6">
      <div className="absolute left-6 top-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Rak Cherry</div>
      <AnimatePresence mode="wait">
        <motion.div key={routine.id + "-label"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }} className="absolute right-6 top-5 font-display text-sm text-cherry">
          {routine.tab}
        </motion.div>
      </AnimatePresence>
      {/* bottles stand on the shelf line */}
      <div className="absolute inset-x-6 bottom-[22%] flex items-end justify-center gap-[3%]">
        <AnimatePresence mode="popLayout">
          {routine.products.map((p, i) => (
            <motion.div key={routine.id + i} className="relative w-[17%] max-w-24"
              initial={{ y: -260, rotate: i % 2 ? 10 : -10, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0, filter: "blur(6px)", transition: { duration: 0.35, delay: i * 0.03 } }}
              transition={{ type: "spring", stiffness: 260, damping: 13, mass: 0.9, delay: 0.35 + i * 0.09, opacity: { duration: 0.2, delay: 0.35 + i * 0.09 } }}>
              <Bottle pack={p.pack} tint={p.tint} label={p.step} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="absolute inset-x-4 bottom-[18%] h-3 rounded-full bg-ink/85 shadow-[0_14px_24px_-10px_rgba(36,22,26,.45)]" />
      <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[11px] text-muted">
        <span>{routine.products.length} produk</span>
        <span>{routine.when}</span>
      </div>
    </div>
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
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-35%"]);
  const words = ["hydrate betul betul", "3 step je", "musim jerebu", "tak payah scroll reply", "skin barrier dulu", "weekend baru all out"];
  return (
    <div ref={ref} aria-hidden className="relative -rotate-2 overflow-hidden bg-cherry py-4 text-milk">
      <motion.div style={{ x }} className="flex w-max gap-8 whitespace-nowrap font-display text-3xl sm:text-4xl">
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-8">{w}<span className="text-xl text-milk/60">✿</span></span>
        ))}
      </motion.div>
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

function Routines({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const routine = routines.find((r) => r.id === active)!;
  return (
    <section id="rutin" className="mx-auto max-w-6xl scroll-mt-4 px-4 pb-20 pt-24 sm:px-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cherry">Rutin</p>
      <h2 className="max-w-2xl font-display text-[clamp(2.2rem,7vw,4rem)] leading-[0.98] tracking-[-0.02em]">
        <RevealWords text="Pilih kulit awak. Ikut step, terus beli." />
      </h2>

      {/* sticky tab bar: sits under the thumb while scrolling cards */}
      <div className="sticky top-0 z-30 -mx-4 mt-8 bg-milk/80 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div role="tablist" aria-label="Pilih rutin" className="no-scrollbar flex gap-2 overflow-x-auto">
          {routines.map((r) => {
            const on = r.id === active;
            return (
              <button key={r.id} role="tab" id={`tab-${r.id}`} aria-selected={on} aria-controls="rutin-panel" onClick={() => setActive(r.id)}
                className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${on ? "text-milk" : "text-ink hover:text-cherry"}`}>
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
                  “{routine.intro}”{" "}
                  <a href={routine.post} target="_blank" rel="noopener" className="whitespace-nowrap text-sm font-semibold text-cherry underline-offset-4 hover:underline">post asal ↗</a>
                </motion.blockquote>
              </div>
              <motion.span variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 }, exit: { opacity: 0 } }}
                className="justify-self-start rounded-full border border-ink/15 px-4 py-1.5 text-sm font-semibold md:justify-self-end">
                {routine.when}
              </motion.span>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {routine.products.map((p, i) => (
                <StepCard key={i} p={p} i={i} />
              ))}
            </ol>

            <motion.aside variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8, ease: EASE } }, exit: { opacity: 0 } }}
              className="mt-6 flex items-start gap-3 rounded-3xl bg-stem p-5 text-milk sm:p-6">
              <span className="font-display text-2xl leading-none">✿</span>
              <p className="text-[15px] leading-relaxed"><b className="font-semibold">Tip Cherry</b> <span className="text-milk/60">(draf)</span>: {routine.tip}</p>
            </motion.aside>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function StepCard({ p, i }: { p: Product; i: number }) {
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

      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Langkah {i + 1} · {p.step}</p>
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

function FromThreads() {
  return (
    <section className="bg-ink py-20 text-milk">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-blush/70">Dari Threads</p>
        <h2 className="max-w-2xl font-display text-[clamp(2.2rem,7vw,4rem)] leading-[0.98] tracking-[-0.02em]">
          <RevealWords text="Post yang korang dah like." />
        </h2>
        <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
          {posts.map((p, i) => (
            <motion.a key={p.url} href={p.url} target="_blank" rel="noopener"
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="flex w-[78%] shrink-0 snap-start flex-col rounded-3xl border border-milk/10 bg-milk/[0.04] p-5 sm:w-auto">
              <span className="text-xs text-milk/50">{p.date} · @cherrryyyii</span>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-milk/90">“{p.quote}”</p>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <CountUp to={p.likes} className="block font-display text-4xl text-blush" />
                  <span className="text-xs text-milk/50">likes · {p.shares} shares</span>
                </div>
                <span className="text-sm text-milk/60">↗</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- about + footer ---------- */

function About() {
  return (
    <section id="about" className="mx-auto grid max-w-6xl scroll-mt-4 gap-8 px-4 py-24 sm:px-6 md:grid-cols-[auto_1fr] md:items-center">
      <motion.div initial={{ scale: 0.6, opacity: 0, rotate: -12 }} whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        viewport={{ once: true }} transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="grid h-40 w-40 place-items-center rounded-full bg-blush md:h-56 md:w-56">
        <span className="text-center text-[11px] uppercase tracking-[0.14em] text-muted">foto<br />Cherry</span>
      </motion.div>
      <div>
        <h2 className="font-display text-[clamp(2.2rem,7vw,4rem)] leading-none tracking-[-0.02em]"><RevealWords text="Hai, saya Cherry." /></h2>
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
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted sm:px-6">
        <p className="max-w-2xl"><b className="text-ink">Pendedahan afiliasi:</b> {DISCLOSURE} Saya hanya letak produk yang saya betul-betul pakai.</p>
        <p className="mt-4 text-xs">© 2026 cherrryyyii · Draf mockup — bukan laman rasmi lagi.</p>
      </div>
    </footer>
  );
}
