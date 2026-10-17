import { ImageResponse } from "next/og";

export const alt = "Skincare & makeup yang saya pakai. @cherrryyyii";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LINE1 = "Skincare & makeup";
const LINE2 = "yang saya pakai.";
const SMALL = "@cherrryyyii · katalog skincare & makeup";

// Gloock subset with only the glyphs used, so the share card matches the site's type.
// Google serves TTF when the request has no modern user agent, which Satori needs.
async function gloock(text: string) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Gloock&text=${encodeURIComponent(text)}`)).text();
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!url) throw new Error("Gloock font not found");
  return (await fetch(url)).arrayBuffer();
}

export default async function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#FDF7F8", color: "#24161A", fontFamily: "Gloock" }}>
        <div style={{ fontSize: 30, color: "#2F4A3A" }}>{SMALL}</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, lineHeight: 1, letterSpacing: -3 }}>
          <span>{LINE1}</span>
          <span style={{ color: "#B81D38" }}>{LINE2}</span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {["#B81D38", "#2F4A3A", "#E6E0DC"].map((c) => (
            <div key={c} style={{ width: 56, height: 56, borderRadius: 28, background: c }} />
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Gloock", data: await gloock(LINE1 + LINE2 + SMALL), style: "normal", weight: 400 }] },
  );
}
