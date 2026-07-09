"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  /** Vertical offset (px) the content slides up from. Ignored under prefers-reduced-motion. */
  y?: number;
  /**
   * Horizontal offset (px) the content slides in from — negative slides in
   * from the left, positive from the right. Opt-in and independent of `y`
   * (pass `y={0}` alongside it for a pure horizontal translation). Ignored
   * under prefers-reduced-motion.
   */
  x?: number;
  /** Optional scale-in, e.g. 0.94. Ignored under prefers-reduced-motion. */
  scale?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Delay before the animation starts, in seconds — use to sequence siblings by hand. */
  delay?: number;
  /** Fraction of the element that must be visible before it triggers (0–1). */
  amount?: number;
}

/**
 * Fades (+ optionally slides/scales) content into place once it enters the
 * viewport. Triggers a single time (`viewport.once`) so scrolling back up
 * and down never re-plays the animation. Only animates `opacity`/`transform`.
 *
 * Under `prefers-reduced-motion`, falls back to an opacity-only fade with no
 * translate/scale so content never appears to "fly in" or get stuck offset.
 */
export default function ScrollReveal({
  children,
  y = 32,
  x,
  scale,
  duration = 0.5,
  delay = 0,
  amount = 0.2,
  className,
  ...rest
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const hidden = shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y,
        ...(x !== undefined ? { x } : {}),
        ...(scale !== undefined ? { scale } : {}),
      };
  const visible = shouldReduceMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        y: 0,
        ...(x !== undefined ? { x: 0 } : {}),
        ...(scale !== undefined ? { scale: 1 } : {}),
      };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
