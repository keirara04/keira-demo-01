// Content for the mockup. Everything here comes from @cherrryyyii's public Threads
// posts (Sep–Oct 2026) — see RESEARCH.md. Nothing is invented:
// - links are her real s.shopee.com.my affiliate links, copied verbatim from her replies
// - `note` is her own words; null where she said nothing about the product
// - product names are unknown (Shopee blocks lookups), so `name` is null until she fills it in
// - no prices or ratings: she never posted them, and Shopee's T&C forbid scraping them
//
// Next step once live: add `sub_id` per button so her dashboard shows which routine sells.
// Shopee format: s.shopee.com.my/an_redir?origin_link=…&affiliate_id=…&sub_id=web-<routine>-<step>
// (hyphen separates the 5 sub_id values, so no hyphens inside a value).

export type Pack = "tube" | "pump" | "mist" | "dropper" | "jar" | "stick" | "compact";

export type Product = {
  id: string;
  step: string; // category, as she labels it
  name: string | null;
  brand: string | null;
  shade?: string;
  note: string | null;
  link: string;
  core?: boolean; // same product in both skincare routines
  pack: Pack;
  tint: string;
};

export type Review = {
  id: string;
  name: string;
  routine: string; // routine id
  text: string;
  visible: boolean;
  consent: boolean; // follower agreed to be quoted (PDPA)
};

export type Routine = {
  id: string;
  tab: string;
  title: string;
  when: string;
  intro: string; // her words, from the post
  tip: string; // draft copy in her voice — she signs off
  post: string;
  products: Product[];
};

const POST = "https://www.threads.com/@cherrryyyii/post/";

export const routines: Routine[] = [
  {
    id: "kering",
    tab: "Kering & jerebu",
    title: "Kulit kering, sensitif & musim jerebu",
    when: "Pagi · 5 step",
    // Her 17 Oct haze post: its link reply *is* the dry/sensitive routine.
    intro: "Musim musim jerebu ni, the only thing yang buat muka i tak break out is hydrating skincare.",
    tip: "Key is to hydrate betul betul.",
    post: POST + "DemADMejx04",
    products: [
      { id: "p1", step: "Cleanser", name: null, brand: null, note: null, link: "https://s.shopee.com.my/8fTCWdHrvp", pack: "tube", tint: "#F3E3D3" },
      { id: "p2", step: "Toner mist", name: null, brand: null, note: "Toner mist ni paling function.", link: "https://s.shopee.com.my/7fafKryHAg", core: true, pack: "mist", tint: "#DCE8E0" },
      { id: "p3", step: "Serum", name: null, brand: null, note: null, link: "https://s.shopee.com.my/3qNwlrloDV", core: true, pack: "dropper", tint: "#F2C9D1" },
      // Brand inferred: same Shopee item as the one she calls "ceradan" in a reply. Confirm with her.
      { id: "p4", step: "Moisturiser", name: null, brand: "Ceradan", note: "Kalau skin i macam extra dry, i akan pakai ceradan malam.", link: "https://s.shopee.com.my/9APT7h7zyo", core: true, pack: "jar", tint: "#FFFFFF" },
      { id: "p5", step: "Sunscreen", name: null, brand: null, note: null, link: "https://s.shopee.com.my/6AlrYDRgbR", pack: "tube", tint: "#F7EBC9" },
    ],
  },
  {
    id: "berminyak",
    tab: "Berminyak",
    title: "Kulit berminyak & kombinasi",
    when: "Pagi · 3 step je",
    intro: "Skincare 3 steps je koranggg.",
    tip: "Toner mist tu yang paling lifesaver. Kalau beli satu je, beli yang tu.",
    post: POST + "DebtxRuj8Xd",
    products: [
      { id: "p6", step: "Toner mist", name: null, brand: null, note: "Paling lifesaverrr, tolongla beli yang ni.", link: "https://s.shopee.com.my/1qcm0dZNcY", core: true, pack: "mist", tint: "#DCE8E0" },
      { id: "p7", step: "Serum", name: null, brand: null, note: null, link: "https://s.shopee.com.my/6L5BMztpJM", core: true, pack: "dropper", tint: "#F2C9D1" },
      { id: "p8", step: "Moisturiser", name: null, brand: "Ceradan", note: null, link: "https://s.shopee.com.my/2gBt0RgFft", core: true, pack: "jar", tint: "#FFFFFF" },
    ],
  },
  {
    id: "makeup",
    tab: "Makeup harian",
    title: "Makeup hari kerja",
    when: "Isnin sampai Jumaat",
    intro: "My makeup look every Isnin sampai Jumaat pagi. Weekend baru all out!!!",
    tip: "I pakai ni je korang. Tiga barang, siap.",
    post: POST + "DdlNBYUjyai",
    products: [
      { id: "p9", step: "Skin tint", shade: "Code 02", name: null, brand: null, note: null, link: "https://s.shopee.com.my/2LYV2wrUss", pack: "pump", tint: "#E7BFA2" },
      { id: "p10", step: "Blusher", shade: "Code 03", name: null, brand: null, note: null, link: "https://s.shopee.com.my/6AlDc36YiR", pack: "compact", tint: "#EFA3B1" },
      { id: "p11", step: "Lip tint", shade: "Code 012", name: null, brand: null, note: null, link: "https://s.shopee.com.my/8V98OOfHoW", pack: "stick", tint: "#B81D38" },
    ],
  },
];

// Real numbers from her posts as of 18 Oct 2026.
export const posts = [
  { quote: "my makeup look every isnin, selasa, rabu, khamis and jumaat pagi. weekend baru all out!!!", likes: 1533, shares: 60, date: "22 Sep", url: POST + "DdlNBYUjyai" },
  { quote: "skincare 3 steps je koranggg", likes: 1180, shares: 58, date: "13 Okt", url: POST + "DebtxRuj8Xd" },
  { quote: "musim musim jerebu ni, the only thing yang buat muka i tak break out is hydrating skincare", likes: 182, shares: 3, date: "17 Okt", url: POST + "DemADMejx04" },
  { quote: "trauma dah nak tukar skincare lain. 2 months difference with the same shawl", likes: 117, shares: 6, date: "14 Okt", url: POST + "DeeUil0DzE6" },
];

export const THREADS = "https://www.threads.com/@cherrryyyii";
export const DISCLOSURE = "Link Shopee kat sini ialah link afiliasi. Saya dapat komisen kecil bila awak beli, harga awak sama je.";

// "Kulit awak?" picker: plain-language symptoms that point at an existing routine id.
export const SKIN_QUIZ = [
  { label: "Kering / sensitif", hint: "Rasa ketat, mudah pedih", routine: "kering" },
  { label: "Breakout masa jerebu", hint: "Naik jerawat bila berjerebu", routine: "kering" },
  { label: "Berminyak / kombinasi", hint: "Berkilat kat T-zone", routine: "berminyak" },
];

// Draft answers — factual, no product claims. Cherry signs off before launch.
export const FAQ = [
  { q: "Sesuai untuk kulit sensitif?", a: "Rutin Kering & jerebu tu memang untuk kulit kering dan sensitif. Tapi kulit setiap orang lain, jadi cuba sikit kat rahang dulu (patch test) sebelum pakai satu muka." },
  { q: "Kenapa semua link pergi Shopee?", a: "Saya join program afiliasi Shopee, jadi semua link kat sini link Shopee. Satu tempat, senang nak checkout." },
  { q: "Link afiliasi tu apa?", a: "Bila awak beli guna link saya, Shopee bagi saya komisen kecil. Harga awak tak berubah langsung." },
  { q: "Kenapa tak ada harga?", a: "Harga kat Shopee selalu berubah, lagi-lagi masa sale. Tekan Beli di Shopee untuk tengok harga terkini." },
  { q: "Bila senarai ni dikemaskini?", a: "Setiap kali saya tukar atau tambah produk dalam rutin. Produk yang saya dah tak pakai, saya buang dari sini." },
];
