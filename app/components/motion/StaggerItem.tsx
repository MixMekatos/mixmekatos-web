"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";

interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  /** Vertical offset (px) the item slides up from. Ignored under prefers-reduced-motion. */
  y?: number;
  /** Optional scale-in, e.g. 0.94. Ignored under prefers-reduced-motion. */
  scale?: number;
  /** Animation duration in seconds. */
  duration?: number;
}

/**
 * A single entrance step inside a `StaggerGroup`. Must be a direct child of
 * `StaggerGroup` (it reads `hidden`/`visible` variants from that ancestor's
 * orchestration — the per-child delay comes from the group, not from here).
 */
export default function StaggerItem({
  children,
  y = 20,
  scale,
  duration = 0.5,
  className,
  ...rest
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y, ...(scale !== undefined ? { scale } : {}) },
        visible: {
          opacity: 1,
          y: 0,
          ...(scale !== undefined ? { scale: 1 } : {}),
          transition: { duration, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <motion.div className={className} variants={variants} {...rest}>
      {children}
    </motion.div>
  );
}
