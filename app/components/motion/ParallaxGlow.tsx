"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxGlowProps {
  /** Max vertical drift in px as the section crosses the viewport. */
  range?: number;
  className?: string;
}

/**
 * A decorative, blurred glow blob that drifts vertically as its parent
 * section scrolls through the viewport — a lightweight way to add real
 * scroll-linked depth to sections that have no image to attach `Parallax`
 * to (e.g. HomeTrade, HomeCTA). Purely `aria-hidden`, `pointer-events-none`.
 *
 * Must be placed inside a `position: relative` ancestor with `overflow-
 * hidden` so the drift never exposes hard edges. Self-contained client leaf
 * so the parent section can stay a server component.
 *
 * Under `prefers-reduced-motion`, renders the same glow statically centered,
 * no scroll-linked transform.
 */
export default function ParallaxGlow({ range = 40, className = "" }: ParallaxGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
      style={shouldReduceMotion ? undefined : { y }}
    >
      <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/10 blur-[100px]" />
    </motion.div>
  );
}
