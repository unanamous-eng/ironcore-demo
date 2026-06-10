"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Flame, HelpCircle } from "lucide-react";
import { FAQS } from "@/lib/constants";

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
        <span className="font-semibold text-white pr-4">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0"><ChevronDown className="w-5 h-5 text-red-brand" /></motion.div>
      </button>
      <AnimatePresence>{isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><div className="px-5 pb-5 text-dark-400 leading-relaxed border-t border-white/5 pt-4">{answer}</div></motion.div>}</AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <>
      <section className="pt-32 pb-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-brand/10 text-red-brand rounded-full text-sm font-medium mb-4 border border-red-brand/30"><HelpCircle className="w-4 h-4" />FAQ</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">Frequently Asked <span className="text-gradient-red">Questions</span></h1>
            <p className="text-dark-400 text-lg">Everything you need to know about IronCore Mumbai.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-dark-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">{FAQS.map((faq, i) => <FAQItem key={i} question={faq.question} answer={faq.answer} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />)}</div>
      </section>
      <section className="py-20 bg-dark-950 text-center">
        <Flame className="w-12 h-12 text-red-brand mx-auto mb-4" /><h2 className="text-3xl font-black text-white mb-4">Still Have Questions?</h2><p className="text-dark-400 text-lg mb-8">Our team is ready to help.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-red text-white rounded-lg font-bold hover:shadow-lg hover:shadow-red-brand/30 transition-all">Contact Us<ArrowRight className="w-5 h-5" /></Link>
          <Link href="/#free-trial" className="inline-flex items-center gap-2 px-8 py-4 glass border border-red-brand/30 text-red-brand rounded-lg font-bold hover:bg-red-brand/10 transition-all">Start 14-Day Free Trial</Link>
        </div>
      </section>
    </>
  );
}
