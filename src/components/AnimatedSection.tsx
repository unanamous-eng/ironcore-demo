"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function AnimatedSection({ children, className = "", delay = 0, direction = "up" }: { children: ReactNode; className?: string; delay?: number; direction?: "up" | "down" | "left" | "right" }) {
  const offset = { up: { y: 50, x: 0 }, down: { y: -50, x: 0 }, left: { y: 0, x: 50 }, right: { y: 0, x: -50 } }[direction];
  return (
    <motion.div initial={{ opacity: 0, ...offset }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}
