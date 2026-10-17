"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { Pack, Product, Review, Routine } from "../data";
import { isShopeeLink, newId, useSiteData, type SiteData } from "../store";

const EASE = [0.16, 1, 0.3, 1] as const;
const PACKS: Pack[] = ["tube", "pump", "mist", "dropper", "jar", "stick", "compact"];
const TABS = ["Ringkasan", "Kategori", "Produk", "Ulasan"] as const;
type Tab = (typeof TABS)[number];

type Editing =
  | { kind: "routine"; value: Routine; isNew: boolean }
  | { kind: "product"; value: Product & { routine: string }; isNew: boolean }
  | { kind: "review"; value: Review; isNew: boolean }
  | null;

export default function Admin() {
  const { data, save, reset } = useSiteData();
  const [tab, setTab] = useState<Tab>("Ringkasan");
  const [editing, setEditing] = useState<Editing>(null);
  const [toast, setToast] = useState("");

  const commit = (next: SiteData, msg: string) => {
    save(next);
    setEditing(null);
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="min-h-dvh bg-milk pb-24">
      <div className="bg-stem px-4 py-2.5 text-[13px] leading-snug text-milk">
        <b className="font-semibold">Mockup admin.</b> Data simpan dalam browser ni je, tiada login lagi.
      </div>

      <header className="sticky top-0 z-30 border-b border-ink/10 bg-milk/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div>
            <p className="font-display text-xl leading-none">cherrryyyii</p>
            <p className="text-xs text-muted">Panel admin</p>
          </div>
          <Link href="/" target="_blank" className="rounded-full border border-ink/15 px-3.5 py-1.5 text-sm font-semibold hover:border-cherry hover:text-cherry">
            Lihat laman ↗
          </Link>
        </div>
        <nav className="mx-auto grid max-w-3xl grid-cols-4 gap-1 px-4 pb-3" aria-label="Bahagian admin">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} aria-current={tab === t}
              className={`relative min-h-10 rounded-full text-[13px] font-semibold ${tab === t ? "text-milk" : "text-ink hover:text-cherry"}`}>
              {tab === t && <motion.span layoutId="admin-tab" className="absolute inset-0 rounded-full bg-cherry" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 pt-6">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }}>
            {tab === "Ringkasan" && <Overview data={data} reset={() => { if (confirm("Buang semua perubahan dan guna data asal?")) { reset(); setToast("Data asal dipulihkan"); } }} go={setTab} />}
            {tab === "Kategori" && <RoutineList data={data} edit={setEditing} commit={commit} />}
            {tab === "Produk" && <ProductList data={data} edit={setEditing} commit={commit} />}
            {tab === "Ulasan" && <ReviewList data={data} edit={setEditing} commit={commit} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Sheet open={!!editing} onClose={() => setEditing(null)}>
        {editing?.kind === "routine" && <RoutineForm e={editing} data={data} commit={commit} />}
        {editing?.kind === "product" && <ProductForm e={editing} data={data} commit={commit} />}
        {editing?.kind === "review" && <ReviewForm e={editing} data={data} commit={commit} />}
      </Sheet>

      <AnimatePresence>
        {toast && (
          <motion.div role="status" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            className="fixed inset-x-0 bottom-6 z-50 mx-auto w-max rounded-full bg-ink px-5 py-3 text-sm font-semibold text-milk shadow-lg">
            ✓ {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- shared bits ---------- */

type ListProps = { data: SiteData; edit: (e: Editing) => void; commit: (d: SiteData, msg: string) => void };

function SectionHead({ title, sub, onAdd, addLabel }: { title: string; sub: string; onAdd?: () => void; addLabel?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl leading-none">{title}</h1>
        <p className="mt-1.5 text-sm text-muted">{sub}</p>
      </div>
      {onAdd && (
        <button onClick={onAdd} className="shrink-0 rounded-full bg-cherry px-4 py-2.5 text-sm font-semibold text-milk hover:bg-cherry-deep">
          + {addLabel}
        </button>
      )}
    </div>
  );
}

function Row({ children, onEdit, onDelete, extra }: { children: React.ReactNode; onEdit: () => void; onDelete: () => void; extra?: React.ReactNode }) {
  return (
    <motion.li layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/70 p-3.5">
      <div className="min-w-0 flex-1">{children}</div>
      {extra}
      <button onClick={onEdit} className="rounded-full px-3 py-2 text-sm font-semibold text-cherry hover:bg-blush">Edit</button>
      <button onClick={onDelete} aria-label="Padam" className="rounded-full px-2.5 py-2 text-sm text-muted hover:bg-blush hover:text-cherry">✕</button>
    </motion.li>
  );
}

function Sheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-40 flex items-end justify-center sm:items-center">
          <motion.div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div role="dialog" aria-modal="true"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.45, ease: EASE }}
            className="relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-milk p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:rounded-3xl">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15 sm:hidden" />
            {children}
            <button onClick={onClose} className="mt-3 w-full rounded-full py-3 text-sm font-semibold text-muted hover:bg-blush">Batal</button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const input = "w-full rounded-xl border border-ink/15 bg-white px-3.5 py-3 text-[16px] outline-none focus:border-cherry focus:ring-2 focus:ring-cherry/20";

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs font-semibold text-cherry">{error}</span> : hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

function FormShell({ title, onSubmit, children, submit = "Simpan" }: { title: string; onSubmit: () => void; children: React.ReactNode; submit?: string }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      <h2 className="font-display text-2xl">{title}</h2>
      {children}
      <button className="w-full rounded-full bg-cherry py-3.5 font-semibold text-milk hover:bg-cherry-deep">{submit}</button>
    </form>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || newId();

/* ---------- overview ---------- */

function Overview({ data, reset, go }: { data: SiteData; reset: () => void; go: (t: Tab) => void }) {
  const products = data.routines.flatMap((r) => r.products);
  const checks: { label: string; count: number; tab: Tab }[] = [
    { label: "Produk tanpa nama", count: products.filter((p) => !p.name).length, tab: "Produk" },
    { label: "Produk tanpa jenama", count: products.filter((p) => !p.brand).length, tab: "Produk" },
    { label: "Link bukan Shopee", count: products.filter((p) => !isShopeeLink(p.link)).length, tab: "Produk" },
    { label: "Kategori tanpa produk", count: data.routines.filter((r) => !r.products.length).length, tab: "Kategori" },
    { label: "Ulasan tanpa izin follower", count: data.reviews.filter((r) => !r.consent).length, tab: "Ulasan" },
  ];
  const stats = [
    { n: data.routines.length, l: "Kategori" },
    { n: products.length, l: "Produk" },
    { n: data.reviews.filter((r) => r.visible).length, l: "Ulasan aktif" },
  ];
  return (
    <div>
      <SectionHead title="Hai, Cherry ✿" sub="Semua yang ada kat laman awak, dalam satu tempat." />
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}
            className="rounded-2xl bg-blush p-4">
            <p className="font-display text-4xl leading-none text-cherry">{s.n}</p>
            <p className="mt-1.5 text-xs font-semibold text-muted">{s.l}</p>
          </motion.div>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Perlu perhatian</h2>
      <ul className="space-y-2">
        {checks.map((c) => (
          <li key={c.label}>
            <button onClick={() => go(c.tab)} className="flex w-full items-center justify-between rounded-2xl border border-ink/10 bg-white/70 p-4 text-left text-sm hover:border-cherry">
              <span className="flex items-center gap-3">
                <span className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${c.count ? "bg-cherry text-milk" : "bg-stem/15 text-stem"}`}>{c.count ? c.count : "✓"}</span>
                {c.label}
              </span>
              <span className="text-muted">›</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl bg-stem p-5 text-sm leading-relaxed text-milk">
        <b className="font-semibold">Tip tracking:</b> dalam Shopee app, pergi Me › Shopee Affiliate › Custom Links, tambah SubID (contoh
        <code className="mx-1 rounded bg-milk/15 px-1.5">web_kering_1</code>) dan tampal link tu kat sini. Dashboard Shopee akan tunjuk rutin mana yang paling laku.
      </div>

      <button onClick={reset} className="mt-6 text-sm font-semibold text-muted underline-offset-4 hover:text-cherry hover:underline">
        Guna semula data asal
      </button>
    </div>
  );
}

/* ---------- routines (kategori) ---------- */

function RoutineList({ data, edit, commit }: ListProps) {
  const blank: Routine = { id: "", tab: "", title: "", when: "", intro: "", tip: "", post: "", products: [] };
  return (
    <div>
      <SectionHead title="Kategori" sub="Setiap kategori jadi satu tab rutin kat laman." addLabel="Kategori" onAdd={() => edit({ kind: "routine", value: blank, isNew: true })} />
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {data.routines.map((r) => (
            <Row key={r.id} onEdit={() => edit({ kind: "routine", value: r, isNew: false })}
              onDelete={() => confirm(`Padam "${r.tab}" dan ${r.products.length} produk dalamnya?`) &&
                commit({ ...data, routines: data.routines.filter((x) => x.id !== r.id) }, "Kategori dipadam")}>
              <p className="truncate font-semibold">{r.tab}</p>
              <p className="truncate text-xs text-muted">{r.when || "—"} · {r.products.length} produk</p>
            </Row>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function RoutineForm({ e, data, commit }: { e: Extract<Editing, { kind: "routine" }>; data: SiteData; commit: ListProps["commit"] }) {
  const [v, setV] = useState(e.value);
  const set = (k: keyof Routine) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV({ ...v, [k]: ev.target.value });
  const submit = () => {
    if (e.isNew) {
      const id = data.routines.some((r) => r.id === slug(v.tab)) ? slug(v.tab) + "-" + newId() : slug(v.tab);
      commit({ ...data, routines: [...data.routines, { ...v, id, title: v.title || v.tab }] }, "Kategori ditambah");
    } else {
      commit({ ...data, routines: data.routines.map((r) => (r.id === v.id ? v : r)) }, "Kategori dikemaskini");
    }
  };
  return (
    <FormShell title={e.isNew ? "Kategori baru" : "Edit kategori"} onSubmit={submit}>
      <Field label="Nama tab *" hint="Pendek, muat kat telefon. Contoh: Berminyak"><input required maxLength={20} value={v.tab} onChange={set("tab")} className={input} /></Field>
      <Field label="Tajuk"><input value={v.title} onChange={set("title")} className={input} placeholder="Kulit berminyak & kombinasi" /></Field>
      <Field label="Bila"><input value={v.when} onChange={set("when")} className={input} placeholder="Pagi · 3 step" /></Field>
      <Field label="Intro (ayat awak)"><textarea rows={2} value={v.intro} onChange={set("intro")} className={input} /></Field>
      <Field label="Tip"><textarea rows={2} value={v.tip} onChange={set("tip")} className={input} /></Field>
      <Field label="Link post Threads"><input type="url" value={v.post} onChange={set("post")} className={input} placeholder="https://www.threads.com/@cherrryyyii/post/…" /></Field>
    </FormShell>
  );
}

/* ---------- products ---------- */

function ProductList({ data, edit, commit }: ListProps) {
  const [filter, setFilter] = useState(data.routines[0]?.id ?? "");
  const routine = data.routines.find((r) => r.id === filter) ?? data.routines[0];
  if (!routine) return <SectionHead title="Produk" sub="Tambah kategori dulu, baru boleh tambah produk." />;

  const updateRoutine = (products: Product[], msg: string) =>
    commit({ ...data, routines: data.routines.map((r) => (r.id === routine.id ? { ...r, products } : r)) }, msg);
  const move = (i: number, d: number) => {
    const p = [...routine.products];
    [p[i], p[i + d]] = [p[i + d], p[i]];
    updateRoutine(p, "Susunan dikemaskini");
  };
  const blank = { id: "", routine: routine.id, step: "", name: null, brand: null, note: null, link: "", pack: "tube" as Pack, tint: "#F2C9D1", core: false };

  return (
    <div>
      <SectionHead title="Produk" sub="Ikut susunan guna. Step 1 paling atas." addLabel="Produk" onAdd={() => edit({ kind: "product", value: blank, isNew: true })} />
      <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4">
        {data.routines.map((r) => (
          <button key={r.id} onClick={() => setFilter(r.id)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-semibold ${r.id === routine.id ? "bg-ink text-milk" : "bg-ink/[0.05] hover:text-cherry"}`}>
            {r.tab} <span className="opacity-60">{r.products.length}</span>
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {routine.products.map((p, i) => (
            <Row key={p.id}
              onEdit={() => edit({ kind: "product", value: { ...p, routine: routine.id }, isNew: false })}
              onDelete={() => confirm(`Padam ${p.step}?`) && updateRoutine(routine.products.filter((x) => x.id !== p.id), "Produk dipadam")}
              extra={
                <div className="flex flex-col">
                  <button disabled={i === 0} onClick={() => move(i, -1)} aria-label="Naik" className="px-2 text-xs text-muted disabled:opacity-25">▲</button>
                  <button disabled={i === routine.products.length - 1} onClick={() => move(i, 1)} aria-label="Turun" className="px-2 text-xs text-muted disabled:opacity-25">▼</button>
                </div>
              }>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-lg" style={{ background: p.tint }}>{i + 1}</span>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{p.step}{p.shade ? ` · ${p.shade}` : ""}</p>
                  <p className="truncate text-xs text-muted">
                    {[p.brand, p.name].filter(Boolean).join(" ") || <span className="text-cherry">Nama belum diisi</span>}
                    {!isShopeeLink(p.link) && <span className="ml-1 text-cherry">· link perlu semak</span>}
                  </p>
                </div>
              </div>
            </Row>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function ProductForm({ e, data, commit }: { e: Extract<Editing, { kind: "product" }>; data: SiteData; commit: ListProps["commit"] }) {
  const [v, setV] = useState(e.value);
  const [touched, setTouched] = useState(false);
  const linkOk = isShopeeLink(v.link);
  const text = (k: "step" | "brand" | "name" | "shade" | "note" | "link") => ({
    value: v[k] ?? "",
    onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV({ ...v, [k]: ev.target.value || (k === "step" || k === "link" ? "" : null) }),
  });

  const submit = () => {
    setTouched(true);
    if (!linkOk) return;
    const { routine: target, ...product } = v;
    const id = e.isNew ? newId() : product.id;
    const clean: Product = { ...product, id, shade: product.shade || undefined };
    const routines = data.routines.map((r) => {
      const without = r.products.filter((p) => p.id !== id);
      if (r.id !== target) return { ...r, products: without };
      const at = r.products.findIndex((p) => p.id === id);
      return { ...r, products: at >= 0 ? r.products.map((p) => (p.id === id ? clean : p)) : [...without, clean] };
    });
    commit({ ...data, routines }, e.isNew ? "Produk ditambah" : "Produk dikemaskini");
  };

  return (
    <FormShell title={e.isNew ? "Produk baru" : "Edit produk"} onSubmit={submit}>
      <Field label="Kategori *">
        <select value={v.routine} onChange={(ev) => setV({ ...v, routine: ev.target.value })} className={input}>
          {data.routines.map((r) => <option key={r.id} value={r.id}>{r.tab}</option>)}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Step *"><input required {...text("step")} className={input} placeholder="Serum" /></Field>
        <Field label="Shade / code"><input {...text("shade")} className={input} placeholder="Code 02" /></Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Jenama"><input {...text("brand")} className={input} /></Field>
        <Field label="Nama produk"><input {...text("name")} className={input} /></Field>
      </div>
      <Field label="Link Shopee *" error={touched && !linkOk ? "Guna link Shopee (s.shopee.com.my). Link platform lain tak dibenarkan dalam T&C Shopee Affiliate." : undefined}
        hint="Tampal link affiliate dari Shopee app.">
        <input required inputMode="url" {...text("link")} onBlur={() => setTouched(true)} className={input} placeholder="https://s.shopee.com.my/…" />
      </Field>
      <Field label="Kenapa awak suka" hint="Ayat awak sendiri. Satu baris cukup."><textarea rows={2} {...text("note")} className={input} /></Field>
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <Field label="Bentuk botol">
          <select value={v.pack} onChange={(ev) => setV({ ...v, pack: ev.target.value as Pack })} className={input}>
            {PACKS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Warna">
          <input type="color" value={v.tint} onChange={(ev) => setV({ ...v, tint: ev.target.value })} className="h-[50px] w-16 cursor-pointer rounded-xl border border-ink/15 bg-white p-1" />
        </Field>
      </div>
      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" checked={!!v.core} onChange={(ev) => setV({ ...v, core: ev.target.checked })} className="h-5 w-5 accent-cherry" />
        Produk ni dipakai untuk kulit kering &amp; berminyak
      </label>
    </FormShell>
  );
}

/* ---------- reviews ---------- */

function ReviewList({ data, edit, commit }: ListProps) {
  const blank: Review = { id: "", name: "", routine: data.routines[0]?.id ?? "", text: "", visible: true, consent: false };
  const toggle = (r: Review) =>
    commit({ ...data, reviews: data.reviews.map((x) => (x.id === r.id ? { ...x, visible: !x.visible } : x)) }, r.visible ? "Ulasan disorok" : "Ulasan dipaparkan");
  return (
    <div>
      <SectionHead title="Ulasan" sub="Ulasan sebenar dari followers, dengan izin mereka." addLabel="Ulasan" onAdd={() => edit({ kind: "review", value: blank, isNew: true })} />
      {data.reviews.length === 0 && (
        <div className="rounded-2xl border border-dashed border-ink/20 p-8 text-center text-sm text-muted">
          Belum ada ulasan. Bahagian ulasan kat laman akan muncul bila ada sekurang-kurangnya satu.
        </div>
      )}
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {data.reviews.map((r) => (
            <Row key={r.id} onEdit={() => edit({ kind: "review", value: r, isNew: false })}
              onDelete={() => confirm("Padam ulasan ni?") && commit({ ...data, reviews: data.reviews.filter((x) => x.id !== r.id) }, "Ulasan dipadam")}
              extra={
                <button onClick={() => toggle(r)} role="switch" aria-checked={r.visible} aria-label="Papar kat laman"
                  className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${r.visible ? "bg-stem" : "bg-ink/20"}`}>
                  <motion.span layout className={`absolute top-0.5 h-5 w-5 rounded-full bg-white ${r.visible ? "right-0.5" : "left-0.5"}`} />
                </button>
              }>
              <p className="truncate font-semibold">{r.name}</p>
              <p className="truncate text-xs text-muted">“{r.text}”</p>
            </Row>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function ReviewForm({ e, data, commit }: { e: Extract<Editing, { kind: "review" }>; data: SiteData; commit: ListProps["commit"] }) {
  const [v, setV] = useState(e.value);
  const submit = () => {
    const reviews = e.isNew ? [...data.reviews, { ...v, id: newId() }] : data.reviews.map((r) => (r.id === v.id ? v : r));
    commit({ ...data, reviews }, e.isNew ? "Ulasan ditambah" : "Ulasan dikemaskini");
  };
  return (
    <FormShell title={e.isNew ? "Ulasan baru" : "Edit ulasan"} onSubmit={submit}>
      <Field label="Nama follower *" hint="Nama pendek je, contoh: Aina R."><input required value={v.name} onChange={(ev) => setV({ ...v, name: ev.target.value })} className={input} /></Field>
      <Field label="Rutin yang dia cuba">
        <select value={v.routine} onChange={(ev) => setV({ ...v, routine: ev.target.value })} className={input}>
          {data.routines.map((r) => <option key={r.id} value={r.id}>{r.tab}</option>)}
        </select>
      </Field>
      <Field label="Ulasan *"><textarea required rows={4} value={v.text} onChange={(ev) => setV({ ...v, text: ev.target.value })} className={input} /></Field>
      <label className="flex items-start gap-3 rounded-2xl bg-blush p-4 text-sm">
        <input type="checkbox" required checked={v.consent} onChange={(ev) => setV({ ...v, consent: ev.target.checked })} className="mt-0.5 h-5 w-5 shrink-0 accent-cherry" />
        <span><b className="font-semibold">Follower dah bagi izin</b> untuk ulasan ni dipaparkan kat laman. (Wajib, ikut PDPA.)</span>
      </label>
      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" checked={v.visible} onChange={(ev) => setV({ ...v, visible: ev.target.checked })} className="h-5 w-5 accent-cherry" />
        Papar kat laman
      </label>
    </FormShell>
  );
}
