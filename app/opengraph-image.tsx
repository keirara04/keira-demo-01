import { ImageResponse } from "next/og";

export const alt = "Jerebu dah sampai. Ni rutin saya. — @cherrryyyii";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#FDF7F8", color: "#24161A", fontFamily: "serif" }}>
        <div style={{ fontSize: 30, color: "#2F4A3A" }}>@cherrryyyii · rutin skincare & makeup</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 1, letterSpacing: -3 }}>
          <span>Jerebu dah sampai.</span>
          <span style={{ color: "#B81D38" }}>Ni rutin saya.</span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {["#B81D38", "#2F4A3A", "#E6E0DC"].map((c) => (
            <div key={c} style={{ width: 56, height: 56, borderRadius: 28, background: c }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
