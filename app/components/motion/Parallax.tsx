"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  /** Max vertical drift in px as the element crosses the viewport (moves from -range to +range). */
  range?: number;
  className?: string;
}

/**
 * Subtle scroll-linked vertical drift for imagery. Positions `children`
 * (typically a `next/image` with `fill`) absolutely, expanded slightly
 * beyond the vertical bounds of its container so the translate never reveals
 * empty edges — the nearest ancestor must be `position: relative` with
 * `overflow-hidden` (the product tiles already are).
 *
 * Under `prefers-reduced-motion`, renders a plain (non-animated) positioned
 * div instead of applying the scroll-linked transform.
 */
export default function Parallax({ children, range = 20, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={`absolute inset-0 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-x-0 ${className}`}
      style={{ y, top: -range, bottom: -range }}
    >
      {children}
    </motion.div>
  );
}
