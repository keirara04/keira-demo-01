"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

// One easing curve everywhere — the long-tail "expo out" that After Effects' easy-ease
// gets dragged into. Consistency is what makes it read as sleek rather than busy.
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Each line slides up out of a mask — the signature kinetic-type move. */
export function MaskLines({ lines, delay = 0, className = "" }: { lines: React.ReactNode[]; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.16em] block overflow-hidden pb-[0.24em]">
          <motion.span
            className="block origin-bottom-left"
            initial={{ y: "110%", rotate: 4 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Words rise + unblur when scrolled into view. */
export function RevealWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ staggerChildren: 0.06 }}>
      {words.map((w, i) => (
        <span key={i} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.24em] align-bottom">
          <motion.span className="inline-block"
            variants={{ hidden: { y: "100%", opacity: 0, filter: "blur(6px)" }, show: { y: "0%", opacity: 1, filter: "blur(0px)" } }}
            transition={{ duration: 0.8, ease: EASE }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function CountUp({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    if (reduce) { el.textContent = to.toLocaleString("en-MY"); return; }
    const c = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: (v) => (el.textContent = Math.round(v).toLocaleString("en-MY")) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref} className={className}>0</span>;
}
