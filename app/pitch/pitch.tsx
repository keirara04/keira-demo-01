"use client";

import Link from "next/link";
import { MotionConfig, motion } from "motion/react";
import { CountUp, EASE, MaskLines, RevealWords } from "../motion";

// Where "Jom mula" sends her (WhatsApp wa.me link or your Threads profile).
// Empty = button hidden. ⚑ fill in before sending the pitch.
const CONTACT_URL = "";

// Her own numbers, read from her public Threads posts on 18 Oct 2026 (RESEARCH.md §1).
// main = likes on the routine post; reply = likes on her reply that holds the Shopee links.
const BURIED = [
  { label: "Makeup hari kerja", date: "22 Sep", main: 1533, reply: 3 },
  { label: "Skincare 3 steps", date: "13 Okt", main: 1180, reply: 26 },
  { label: "Rutin musim jerebu", date: "17 Okt", main: 182, reply: 0 },
];
const MAX = Math.max(...BURIED.map((b) => b.main));

// Shopee Affiliate Storefront vs this page (RESEARCH.md §2). Only rows we could verify.
const COMPARE: [string, boolean, boolean][] = [
  ["Semua produk dalam satu link", true, true],
  ["Susun ikut rutin dan step", false, true],
  ["Ayat awak sendiri: kenapa awak suka", false, true],
  ["Gaya dan susun atur awak sendiri", false, true],
  ["Tahu rutin mana yang paling laku (SubID)", false, true],
  ["Tak ada link platform lain (ikut T&C Shopee)", true, true],
];

const NEEDS = [
  "Nama penuh setiap produk dalam link awak",
  "Satu gambar rak / produk awak, dan satu gambar muka",
  "Semak ayat kat laman, tukar apa yang tak macam awak",
  "Satu baris dalam reply link kat Threads: “link afiliasi”",
];

const STEPS = [
  { n: "01", t: "Buka /admin", d: "Kat telefon, macam buka app biasa." },
  { n: "02", t: "Tekan + Produk", d: "Tampal link Shopee, tulis satu ayat kenapa awak suka." },
  { n: "03", t: "Siap", d: "Terus keluar kat laman. Tak payah reply satu-satu kat Threads." },
];

const eyebrow = "mb-3 text-xs font-semibold uppercase tracking-[0.14em]";
const h2 = "max-w-4xl font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.02em]";
const rise = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-10% 0px" } };

export default function Pitch() {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: EASE }}>
      <main className="grain min-h-dvh overflow-x-clip">
        {/* hero */}
        <section className="wrap flex min-h-[92dvh] flex-col justify-center py-16">
          <p className={`${eyebrow} text-cherry`}>Untuk @cherrryyyii · 18 Okt 2026</p>
          <h1 className="font-display text-[clamp(3rem,8vw,9rem)] leading-[0.92] tracking-[-0.03em]">
            <MaskLines delay={0.2} lines={["Post awak sampai", "ribu likes. Link", <span key="r" className="text-cherry">tenggelam.</span>]} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted xl:text-xl">
            Saya buat satu laman untuk semua link Shopee awak. Ni sebab kenapa, apa beza dia, dan apa yang awak perlu buat. Ringkas je.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-8 flex flex-wrap gap-3">
            <Link href="/" target="_blank" className="rounded-full bg-ink px-6 py-3.5 font-semibold text-milk hover:bg-cherry">Tengok laman awak ↗</Link>
            <a href="#nombor" className="rounded-full border border-ink/15 px-6 py-3.5 font-semibold hover:border-cherry hover:text-cherry">Kenapa? ↓</a>
          </motion.div>
        </section>

        {/* 1. the numbers */}
        <section id="nombor" className="bg-ink py-24 text-milk">
          <div className="wrap">
            <p className={`${eyebrow} text-blush/70`}>01 · Nombor awak sendiri</p>
            <h2 className={h2}><RevealWords text="Orang suka post. Tapi link ada kat bawah." /></h2>
            <p className="mt-5 max-w-xl text-milk/70">
              Awak letak link Shopee dalam reply. Reply tu dapat jauh kurang perhatian dari post utama. Ramai yang suka post, tak pernah nampak link.
            </p>
            <div className="mt-12 space-y-8">
              {BURIED.map((b, i) => (
                <motion.div key={b.label} {...rise} transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}>
                  <div className="mb-3 flex items-baseline justify-between gap-4">
                    <span className="font-semibold">{b.label} <span className="text-sm font-normal text-milk/50">· {b.date}</span></span>
                  </div>
                  <Bar label="Post" value={b.main} tone="bg-blush" />
                  <Bar label="Reply dengan link" value={b.reply} tone="bg-cherry" />
                </motion.div>
              ))}
            </div>
            <p className="mt-10 text-xs text-milk/50">Likes dari post awak kat Threads, dibaca 18 Okt 2026.</p>
          </div>
        </section>

        {/* 2. storefront vs page */}
        <section className="wrap py-24">
          <p className={`${eyebrow} text-cherry`}>02 · Kenapa bukan Shopee Storefront je?</p>
          <h2 className={h2}><RevealWords text="Storefront tu senarai. Ni rutin awak." /></h2>
          <motion.div {...rise} className="mt-12 overflow-hidden rounded-3xl border border-ink/10 bg-white/70">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-ink/10 px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted sm:gap-x-10 sm:px-8">
              <span />
              <span className="w-16 text-center sm:w-28">Storefront</span>
              <span className="w-16 text-center text-cherry sm:w-28">Laman ni</span>
            </div>
            {COMPARE.map(([row, a, b], i) => (
              <motion.div key={row} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-ink/10 px-5 py-4 last:border-0 sm:gap-x-10 sm:px-8">
                <span className="text-[15px]">{row}</span>
                <Mark on={a} />
                <Mark on={b} strong />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 3. subID */}
        <section className="bg-blush py-24">
          <div className="wrap grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className={`${eyebrow} text-cherry`}>03 · Tahu apa yang laku</p>
              <h2 className={h2}><RevealWords text="Setiap butang ada tag sendiri." /></h2>
              <p className="mt-5 max-w-lg leading-relaxed text-muted">
                Shopee bagi awak letak SubID kat link afiliasi. Setiap butang kat laman ni boleh ada SubID sendiri, ikut rutin dan step.
                Dashboard Shopee awak akan tunjuk klik dan order ikut SubID tu. Jadi awak tahu rutin mana yang orang betul-betul beli.
              </p>
            </div>
            <motion.div {...rise} className="rounded-3xl bg-milk p-6 shadow-[0_30px_60px_-30px_rgba(184,29,56,.35)]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Contoh tag</p>
              {["web_kering_1", "web_kering_2", "web_berminyak_1", "web_makeup_3"].map((t, i) => (
                <motion.div key={t} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: EASE }}
                  className="mt-3 flex items-center justify-between rounded-2xl border border-ink/10 px-4 py-3">
                  <code className="text-sm">{t}</code>
                  <span className="text-xs text-muted">klik · order · komisen</span>
                </motion.div>
              ))}
              <p className="mt-4 text-xs text-muted">Angka sebenar keluar dalam dashboard Shopee Affiliate awak, bukan kat sini.</p>
            </motion.div>
          </div>
        </section>

        {/* 4. her effort */}
        <section className="wrap py-24">
          <p className={`${eyebrow} text-cherry`}>04 · Kerja awak</p>
          <h2 className={h2}><RevealWords text="Tambah produk baru: 2 minit." /></h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div key={s.n} {...rise} transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
                className="rounded-3xl border border-ink/10 bg-white/70 p-6">
                <span className="font-display text-5xl text-cherry">{s.n}</span>
                <p className="mt-4 font-display text-2xl">{s.t}</p>
                <p className="mt-2 text-muted">{s.d}</p>
              </motion.div>
            ))}
          </div>
          <Link href="/admin" target="_blank" className="mt-8 inline-flex font-semibold text-cherry underline-offset-4 hover:underline">Cuba admin sekarang ↗</Link>
        </section>

        {/* 5. honest offer */}
        <section className="bg-stem py-24 text-milk">
          <div className="wrap grid gap-12 md:grid-cols-2">
            <div>
              <p className={`${eyebrow} text-milk/60`}>05 · Tawaran</p>
              <h2 className={h2}><RevealWords text="Percuma untuk awak." /></h2>
              <p className="mt-5 max-w-lg leading-relaxed text-milk/80">
                Sebagai balasan, saya minta testimoni ringkas bila laman ni dah live, dan izin untuk tunjuk laman ni sebagai contoh kerja saya.
              </p>
            </div>
            <motion.div {...rise} className="rounded-3xl bg-milk/[0.07] p-6 sm:p-8">
              <p className="font-display text-2xl">Apa yang saya takkan janji</p>
              <p className="mt-3 leading-relaxed text-milk/80">
                Berapa ringgit awak akan dapat. Tak ada data yang boleh dipercayai untuk creator saiz awak, jadi saya tak nak teka.
                Yang saya janji: semua link awak dalam satu tempat yang cantik, dan awak boleh tengok sendiri apa yang laku.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 6. what I need + CTA */}
        <section className="wrap py-24">
          <p className={`${eyebrow} text-cherry`}>06 · Apa saya perlukan dari awak</p>
          <h2 className={h2}><RevealWords text="Empat benda je." /></h2>
          <ol className="mt-10 max-w-2xl border-t border-ink/15">
            {NEEDS.map((n, i) => (
              <motion.li key={n} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="flex items-start gap-4 border-b border-ink/15 py-4">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-cherry text-xs text-cherry">{i + 1}</span>
                <span className="text-lg">{n}</span>
              </motion.li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            {CONTACT_URL && (
              <a href={CONTACT_URL} target="_blank" rel="noopener" className="rounded-full bg-cherry px-7 py-4 font-semibold text-milk hover:bg-cherry-deep">Jom mula →</a>
            )}
            <Link href="/" target="_blank" className="rounded-full border border-ink/15 px-7 py-4 font-semibold hover:border-cherry hover:text-cherry">Tengok laman awak ↗</Link>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}

function Bar({ label, value, tone }: { label: string; value: number; tone: string }) {
  const pct = Math.max((value / MAX) * 100, 0.6);
  return (
    <div className="mb-2 grid grid-cols-[7.5rem_1fr_auto] items-center gap-3 text-sm sm:grid-cols-[10rem_1fr_auto]">
      <span className="text-milk/60">{label}</span>
      <div className="h-3 overflow-hidden rounded-full bg-milk/10">
        <motion.div className={`h-full rounded-full ${tone}`} initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }} />
      </div>
      <CountUp to={value} className="w-14 text-right font-display text-xl" />
    </div>
  );
}

function Mark({ on, strong }: { on: boolean; strong?: boolean }) {
  return (
    <span className="grid w-16 place-items-center sm:w-28" aria-label={on ? "Ya" : "Tidak"}>
      <span className={`grid h-7 w-7 place-items-center rounded-full text-sm ${on ? (strong ? "bg-cherry text-milk" : "bg-stem/15 text-stem") : "bg-ink/5 text-muted"}`}>
        {on ? "✓" : "✕"}
      </span>
    </span>
  );
}
