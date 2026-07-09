"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

interface StaggerGroupProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  /** Delay (seconds) added between each direct `StaggerItem` child's entrance. */
  stagger?: number;
  /** Delay (seconds) before the first child starts. */
  delayChildren?: number;
  /** Fraction of the group that must be visible before it triggers (0–1). */
  amount?: number;
  /**
   * Replay the stagger every time the group crosses the viewport boundary,
   * in both scroll directions, instead of triggering once and staying.
   * Defaults to `true`.
   */
  repeat?: boolean;
}

/**
 * Orchestrates a staggered entrance for a group of `StaggerItem` children.
 * Pair with `StaggerItem` — this component only sets up the "when" (viewport
 * trigger + per-child delay), each `StaggerItem` defines its own "how"
 * (offset/scale/duration). By default the whole group reverses out when it
 * scrolls out of view (either direction), then replays on re-entry.
 */
export default function StaggerGroup({
  children,
  stagger = 0.08,
  delayChildren = 0,
  amount = 0.2,
  repeat = true,
  className,
  ...rest
}: StaggerGroupProps) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount }}
      variants={container}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
