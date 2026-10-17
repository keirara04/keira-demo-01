import type { Metadata } from "next";
import Pitch from "./pitch";

// A private note to Cherry, not a public page.
export const metadata: Metadata = {
  title: "Untuk @cherrryyyii",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Pitch />;
}
