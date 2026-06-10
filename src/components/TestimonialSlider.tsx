"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => { setDirection(1); setCurrent((p) => (p + 1) % TESTIMONIALS.length); }, 6000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 300 : -300, opacity: 0 }),
  };
  const t = TESTIMONIALS[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="glass-card rounded-2xl p-8 md:p-10 overflow-hidden min-h-[280px]">
        <Quote className="absolute top-6 left-6 w-10 h-10 text-red-brand/20" />
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="relative z-10">
            <p className="text-lg md:text-xl text-dark-200 leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center justify-between">
              <div><p className="font-bold text-white">{t.name}</p><p className="text-red-brand text-sm">{t.role}</p></div>
              <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-red-brand text-red-brand" />)}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={() => { setDirection(-1); setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); }} className="w-10 h-10 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-dark-400 hover:text-white hover:border-red-brand transition-colors"><ChevronLeft className="w-5 h-5" /></button>
        <div className="flex gap-2">{TESTIMONIALS.map((_, i) => <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-red-brand w-6" : "bg-dark-600 hover:bg-dark-500"}`} />)}</div>
        <button onClick={() => { setDirection(1); setCurrent((p) => (p + 1) % TESTIMONIALS.length); }} className="w-10 h-10 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-dark-400 hover:text-white hover:border-red-brand transition-colors"><ChevronRight className="w-5 h-5" /></button>
      </div>
    </div>
  );
}
