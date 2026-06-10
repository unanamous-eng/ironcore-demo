"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Flame, Zap } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const monthlyFeatures = ["Unlimited gym access (5 AM – 11 PM)", "All equipment & training zones", "Locker room & steam room access", "Free Wi-Fi", "Personalized workout plan", "30+ weekly group classes", "Mobile app access"];
const yearlyFeatures = [...monthlyFeatures, "4 free PT sessions/month", "Quarterly nutrition consultation", "Monthly body composition analysis", "45-day freeze option", "Guest pass (4/month)", "Priority class booking", "Exclusive member events"];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <>
      <section className="pt-32 pb-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-brand/10 text-red-brand rounded-full text-sm font-medium mb-4 border border-red-brand/30"><Flame className="w-4 h-4" />Simple Pricing</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">Premium Fitness, <span className="text-gradient-red">Fair Price</span></h1>
            <p className="text-dark-400 text-lg mb-10">No hidden fees, no long-term contracts.</p>
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium transition-colors ${!isYearly ? "text-white" : "text-dark-500"}`}>Monthly</span>
              <button onClick={() => setIsYearly(!isYearly)} className={`relative w-16 h-8 rounded-full transition-colors ${isYearly ? "bg-red-brand" : "bg-dark-600"}`} aria-label="Toggle pricing">
                <motion.div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg" animate={{ x: isYearly ? 32 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
              </button>
              <span className={`text-sm font-medium transition-colors ${isYearly ? "text-white" : "text-dark-500"}`}>Yearly</span>
              {isYearly && <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30">Save ₹3,989!</motion.span>}
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-dark-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection><div className={`glass-card rounded-2xl p-8 h-full transition-all ${!isYearly ? "border-red-brand glow-red" : "border-dark-700"}`}>
            <h3 className="text-2xl font-bold text-white mb-1">Monthly Plan</h3><p className="text-dark-500 text-sm mb-6">Perfect to get started</p>
            <div className="flex items-baseline gap-1 mb-6"><span className="text-5xl font-black text-white">₹1,999</span><span className="text-dark-500">/month</span></div>
            <ul className="space-y-3 mb-8">{monthlyFeatures.map((f) => <li key={f} className="flex items-center gap-3 text-sm text-dark-300"><Check className="w-5 h-5 text-red-brand shrink-0" />{f}</li>)}</ul>
            <Link href="/#free-trial" className={`block text-center py-4 rounded-xl font-semibold transition-all ${!isYearly ? "bg-gradient-red text-white hover:shadow-lg hover:shadow-red-brand/30" : "bg-dark-700 text-dark-300 hover:bg-dark-600"}`}>Start 14-Day Free Trial</Link>
          </div></AnimatedSection>
          <AnimatedSection delay={0.15}><div className={`glass-card rounded-2xl p-8 h-full transition-all relative ${isYearly ? "border-red-brand glow-red" : "border-dark-700"}`}>
            <div className="absolute -top-3 right-6"><span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-red text-white rounded-full text-xs font-bold"><Sparkles className="w-3 h-3" />Best Value</span></div>
            <h3 className="text-2xl font-bold text-white mb-1">Yearly Plan</h3><p className="text-dark-500 text-sm mb-6">Maximum value for serious athletes</p>
            <div className="flex items-baseline gap-1 mb-1"><span className="text-5xl font-black text-white">₹19,999</span><span className="text-dark-500">/year</span></div>
            <p className="text-sm text-green-400 font-medium mb-6">That&apos;s just ₹1,667/month!</p>
            <ul className="space-y-3 mb-8">{yearlyFeatures.map((f) => <li key={f} className="flex items-center gap-3 text-sm text-dark-300"><Check className="w-5 h-5 text-red-brand shrink-0" />{f}</li>)}</ul>
            <Link href="/#free-trial" className={`block text-center py-4 rounded-xl font-semibold transition-all ${isYearly ? "bg-gradient-red text-white hover:shadow-lg hover:shadow-red-brand/30" : "bg-dark-700 text-dark-300 hover:bg-dark-600"}`}>Start 14-Day Free Trial</Link>
          </div></AnimatedSection>
        </div>
      </section>
      <section className="py-20 bg-dark-950 text-center">
        <div className="glass-card rounded-2xl p-10 max-w-4xl mx-auto border-red-brand/30"><Zap className="w-12 h-12 text-red-brand mx-auto mb-4" /><h2 className="text-3xl md:text-4xl font-black text-white mb-4">Still Not Sure? Try Us Free!</h2><p className="text-dark-400 text-lg mb-8">14 days of full access. No payment required.</p><Link href="/#free-trial" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-red text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-red-brand/30 transition-all hover:-translate-y-1">Claim Free Trial<ArrowRight className="w-5 h-5" /></Link></div>
      </section>
    </>
  );
}
