"use client";

import { useCallback, useEffect, useState } from "react";
import { routines as DEFAULT_ROUTINES, type Review, type Routine } from "./data";

// ponytail: localStorage only — edits live in the browser they're made in, no login.
// Swap load/save for a real backend (e.g. Supabase + auth) before going live.
const KEY = "cherry-site-v3";

export type SiteData = { routines: Routine[]; reviews: Review[] };

const DEFAULTS: SiteData = { routines: DEFAULT_ROUTINES, reviews: [] };

function load(): SiteData {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (saved?.routines && saved?.reviews) return saved;
  } catch {}
  return DEFAULTS;
}

/** Defaults on the server and first render (no hydration mismatch), saved data after mount. */
export function useSiteData() {
  const [data, setData] = useState<SiteData>(DEFAULTS);
  useEffect(() => {
    setData(load());
    // keep the site tab in sync when admin saves in another tab
    const onStorage = (e: StorageEvent) => e.key === KEY && setData(load());
    addEventListener("storage", onStorage);
    return () => removeEventListener("storage", onStorage);
  }, []);

  const save = useCallback((next: SiteData) => {
    setData(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  }, []);

  const reset = useCallback(() => {
    setData(DEFAULTS);
    try { localStorage.removeItem(KEY); } catch {}
  }, []);

  return { data, save, reset };
}

/** Shopee T&C §6.2(e): only Shopee links allowed on pages carrying her affiliate links. */
export function isShopeeLink(url: string) {
  try {
    const host = new URL(url).hostname;
    return url.startsWith("https://") && (host === "s.shopee.com.my" || host === "shopee.com.my" || host.endsWith(".shopee.com.my"));
  } catch {
    return false;
  }
}

export const newId = () => Math.random().toString(36).slice(2, 9);
