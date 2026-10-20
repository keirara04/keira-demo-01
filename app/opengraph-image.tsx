import { ImageResponse } from "next/og";

export const alt = "cherrryyyii: everything I actually use, one tap to Shopee.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LINE1 = "Everything I";
const LINE2 = "actually use.";
const SMALL = "cherrryyyii · skincare & makeup, one tap to Shopee";

// Figtree subset with only the glyphs used, so the share card matches the site's type.
// Google serves TTF when the request has no modern user agent, which Satori needs.
async function figtree(text: string, weight: number) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Figtree:wght@${weight}&text=${encodeURIComponent(text)}`)).text();
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!url) throw new Error("Figtree font not found");
  return (await fetch(url)).arrayBuffer();
}

export default async function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#FFFFFF", color: "#24161A", fontFamily: "Figtree" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700 }}>
          cherrryyyii
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 124, fontWeight: 700, lineHeight: 0.98, letterSpacing: -5 }}>
          <span>{LINE1}</span>
          <span>{LINE2}</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#6E5A60" }}>{SMALL.split(" · ")[1]}</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Figtree", data: await figtree(LINE1 + LINE2 + SMALL + "cherrryyyii", 700), style: "normal", weight: 700 }] },
  );
}
