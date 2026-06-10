"use client";
import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-white">{title}</h2>
      <div className="w-20 h-1 bg-gradient-red rounded-full mx-auto mb-4" />
      {subtitle && <p className="max-w-2xl mx-auto text-lg text-dark-400">{subtitle}</p>}
    </motion.div>
  );
}
