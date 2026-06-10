"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Heart, Flame } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import Counter from "@/components/Counter";
import { STATS } from "@/lib/constants";

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-brand/10 text-red-brand rounded-full text-sm font-medium mb-4 border border-red-brand/30"><Flame className="w-4 h-4" />About Us</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Building Mumbai&apos;s<br /><span className="text-gradient-red">Strongest Legacy</span></h1>
              <p className="text-dark-300 text-lg leading-relaxed mb-6">Founded in 2016, IronCore Mumbai was born from a vision to create a gym that doesn&apos;t compromise. Today, we&apos;re home to 5,000+ active members, 25 certified trainers, and 15,000+ documented transformations.</p>
              <Link href="/#free-trial" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-red text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-brand/30 transition-all">Start Free Trial<ArrowRight className="w-5 h-5" /></Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden"><Image src="https://images.pexels.com/photos/6739958/pexels-photo-6739958.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200" alt="IronCore gym" fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" /><div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent" /></div>
              <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-6 glow-red"><div className="text-4xl font-black text-red-brand">8+</div><div className="text-sm text-dark-300">Years of Excellence</div></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">{STATS.map((s) => <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />)}</div>
        </div>
      </section>

      <section className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What Drives Us" subtitle="Our core values shape every decision" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ icon: Target, title: "Our Mission", desc: "To empower every individual to unlock their full physical potential." }, { icon: Eye, title: "Our Vision", desc: "To become India's most trusted fitness brand." }, { icon: Heart, title: "Our Values", desc: "Intensity, integrity, and innovation in everything we do." }].map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.15}>
                <div className="glass-card rounded-2xl p-8 text-center h-full hover:border-red-brand/30 transition-colors">
                  <div className="w-16 h-16 bg-red-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-5"><v.icon className="w-8 h-8 text-red-brand" /></div>
                  <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-dark-400 leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
