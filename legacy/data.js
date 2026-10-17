// Shared data for index.html (site) and admin.html (editor).
// ponytail: localStorage only, so edits live in one browser. Swap loadData/saveData
// for a backend (e.g. Supabase) before going live.
const STORE_KEY = "cherry-site-v1";

const SAMPLE_DATA = {
  settings: {
    line1: "Jerebu dah sampai.",
    line2: "Ni rutin saya.",
    lede: "Bila jerebu, kulit senang breakout. Pilih rutin ikut jenis kulit, ikut step satu per satu, dan terus checkout kat Shopee. Tak payah scroll reply lagi.",
    likes: "1.5K",
    aboutTitle: "Hai, saya Cherry.",
    about: "Saya kongsi rutin skincare dan makeup untuk kulit Malaysia yang hadap cuaca panas, lembap dan kadang-kadang berjerebu. Semua produk kat sini saya dah cuba sendiri sebelum saya recommend.",
    threads: "https://www.threads.net/@cherrryyyii",
    disclosure: "Sesetengah link di laman ini ialah link affiliate Shopee. Saya dapat sedikit komisen bila awak beli, tanpa kos tambahan untuk awak.",
    draft: true
  },
  routines: [
    { id: "haze", label: "Breakout jerebu", title: "Rutin breakout musim jerebu", when: "Pagi & malam", order: 1,
      intro: "Fokus cuci muka lembut dan jaga skin barrier. Jangan scrub masa kulit tengah merah dan meradang.",
      tip: "Tip: waktu malam, double cleanse kalau pakai sunscreen atau makeup. Pagi, cuci sekali dah cukup." },
    { id: "dry", label: "Kering & sensitif", title: "Kulit kering & sensitif", when: "Pagi", order: 2,
      intro: "Kurangkan step, banyakkan hidrasi. Patch test produk baru kat rahang dulu.",
      tip: "Tip: sapu moisturiser masa muka masih lembap lepas toner mist." },
    { id: "oily", label: "Berminyak", title: "Kulit berminyak", when: "Pagi", order: 3,
      intro: "Kawal minyak tanpa buat kulit kering. Kulit dehydrated sebenarnya keluarkan lebih banyak minyak.",
      tip: "Tip: guna toner BHA dua tiga kali seminggu je. Lebih dari tu, kulit boleh jadi sensitif." },
    { id: "makeup", label: "Makeup harian hijabi", title: "Makeup harian hijabi", when: "10 minit", order: 4,
      intro: "Look ringan untuk ke kerja atau kelas. Pakai lepas sunscreen.",
      tip: "Tip: tepuk blusher tinggi sikit, dekat garis tudung. Muka nampak lebih segar." }
  ],
  // ponytail: one routine per product; a product used in two routines is added twice.
  products: [
    ["haze", "Embun Lab", "Calm Gel Cleanser", "150ml", 32.9, 4.8, "2.1k", "tube", "#CFE3D6", "Bersihkan habuk jerebu tanpa rasa ketat lepas cuci."],
    ["haze", "Sora Skin", "Rice Water Toner Mist", "120ml", 28.5, 4.7, "1.4k", "pump", "#F6E7C8", "Spray lepas cuci muka, dan tengah hari bila muka rasa panas."],
    ["haze", "Hanaroot", "10% Niacinamide Serum", "30ml", 45.0, 4.9, "3.6k", "dropper", "#F3C6CF", "Bantu kurangkan kemerahan dan minyak."],
    ["haze", "Embun Lab", "Cica Water Gel", "50ml", 39.9, 4.6, "980", "jar", "#D6E9E0", "Melembapkan tapi ringan, tak melekit dalam cuaca panas."],
    ["haze", "Pagi Co.", "Air Shield SPF50 PA++++", "50ml", 42.0, 4.8, "2.7k", "tube", "#FFFFFF", "Step terakhir setiap pagi, walaupun langit nampak mendung."],
    ["dry", "Melur", "Oat Milk Cream Cleanser", "120ml", 34.9, 4.8, "1.7k", "tube", "#F6E7C8", "Tak tarik minyak semula jadi kulit."],
    ["dry", "Sora Skin", "Rice Water Toner Mist", "120ml", 28.5, 4.7, "1.4k", "pump", "#F6E7C8", "Bagi hidrasi awal sebelum serum."],
    ["dry", "Hanaroot", "Ceramide Repair Serum", "30ml", 49.0, 4.9, "2.2k", "dropper", "#D8D3EC", "Untuk kulit yang mudah pedih dan mengelupas."],
    ["dry", "Melur", "Barrier Butter Cream", "50ml", 46.9, 4.9, "3.1k", "jar", "#F3C6CF", "Tekstur pekat, kunci kelembapan sampai petang."],
    ["dry", "Pagi Co.", "Mineral Veil SPF50", "40ml", 44.0, 4.6, "860", "tube", "#E9D7CC", "Lebih selesa untuk kulit sensitif, tak pedih kat mata."],
    ["oily", "Embun Lab", "Green Tea Foam Wash", "150ml", 29.9, 4.7, "1.9k", "tube", "#CFE3D6", "Cuci bersih, rasa segar, tak ketat."],
    ["oily", "Hanaroot", "2% BHA Clear Toner", "150ml", 38.0, 4.6, "1.2k", "pump", "#C8DCEB", "Bantu bersihkan pori yang tersumbat."],
    ["oily", "Hanaroot", "10% Niacinamide Serum", "30ml", 45.0, 4.9, "3.6k", "dropper", "#F3C6CF", "Bantu kawal minyak kat T-zone."],
    ["oily", "Sora Skin", "Oil-Free Water Cream", "50ml", 36.9, 4.7, "1.1k", "jar", "#C8DCEB", "Kulit berminyak pun perlukan moisturiser."],
    ["oily", "Pagi Co.", "Matte Gel SPF50", "50ml", 42.0, 4.8, "2.4k", "tube", "#FFFFFF", "Finish matte, muka tak berkilat walaupun lepas sejam."],
    ["makeup", "Dewlune", "Second Skin Tint", "30ml", 49.9, 4.8, "2.8k", "pump", "#E9C2A6", "Ratakan tona kulit, nampak natural macam kulit sendiri."],
    ["makeup", "Dewlune", "Soft Blur Concealer", "6g", 29.0, 4.6, "1.3k", "stick", "#E9C2A6", "Dab sikit bawah mata dan atas parut jerawat."],
    ["makeup", "Melur", "Pipi Liquid Blush", "8ml", 27.9, 4.9, "3.3k", "dropper", "#F0A3B0", "Satu titik cukup untuk dua pipi."],
    ["makeup", "Cherry Pop", "Juicy Lip Tint", "4g", 22.9, 4.8, "4.2k", "stick", "#B81D38", "Tahan lepas makan minum, boleh guna kat pipi juga."],
    ["makeup", "Sora Skin", "Cool Set Mist", "100ml", 31.0, 4.7, "1.0k", "pump", "#D8D3EC", "Kunci makeup supaya tahan dalam cuaca panas."]
  ].map(([routine, brand, name, size, price, rating, count, type, color, desc], i) => ({
    id: "p" + (i + 1), routine, brand, name, size, price, rating, count, type, color, desc,
    link: "", order: (i % 5) + 1, active: true
  })),
  reviews: [
    { id: "r1", name: "Aina R.", city: "Shah Alam", routine: "dry", stars: 5, visible: true,
      text: "Dah tiga minggu ikut rutin ni. Pipi dah tak mengelupas walaupun pakai tudung seharian. Barrier cream tu memang terbaik." },
    { id: "r2", name: "Nurul H.", city: "Johor Bahru", routine: "haze", stars: 5, visible: true,
      text: "Setiap kali musim jerebu, muka saya mesti breakout teruk. Tahun ni tukar ke gel cleanser dan serum niacinamide, jerawat kurang separuh." },
    { id: "r3", name: "Syaza M.", city: "Kuala Lumpur", routine: "makeup", stars: 4.5, visible: true,
      text: "Skin tint dia ringan gila, tak cair walaupun naik LRT tengah hari. Lip tint pun masih ada lepas lunch." },
    { id: "r4", name: "Farah Z.", city: "Penang", routine: "oily", stars: 4.5, visible: true,
      text: "Senang sebab semua link ada dalam satu tempat. Sunscreen gel tu tak buat muka berkilat, sesuai untuk yang kerja luar." }
  ]
};

const PACK_TYPES = ["tube", "pump", "dropper", "jar", "compact", "stick"];

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved && saved.routines && saved.products && saved.reviews && saved.settings) return saved;
  } catch (e) { /* fall through to sample */ }
  return structuredClone(SAMPLE_DATA);
}

function saveData(data) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); return true; }
  catch (e) { return false; }
}

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
// Only allow http(s) links into href.
const safeUrl = u => /^https?:\/\//i.test(u || "") ? u : "#";
const byOrder = (a, b) => (a.order || 0) - (b.order || 0);
