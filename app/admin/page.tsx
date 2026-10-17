import type { Metadata } from "next";
import Admin from "./admin";

// No login yet — keep this out of search engines.
export const metadata: Metadata = {
  title: "Admin · cherrryyyii",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Admin />;
}
