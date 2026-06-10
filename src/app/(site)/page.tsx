"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Clock, Flame, Target, Trophy, Zap, Heart } from "lucide-react";
import Counter from "@/components/Counter";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import FreeTrialForm from "@/components/FreeTrialForm";
import TestimonialSlider from "@/components/TestimonialSlider";
import { STATS, GALLERY_IMAGES, SITE_TAGLINE } from "@/lib/constants";

const features = [
  { icon: Shield, title: "Elite Equipment", desc: "Premium Hammer Strength, Life Fitness & Rogue gear maintained to perfection" },
  { icon: Users, title: "25+ Expert Trainers", desc: "Certified coaches specializing in strength, HIIT, yoga, MMA & more" },
  { icon: Clock, title: "Extended Hours", desc: "Open 5 AM–11 PM Mon–Sat, 6 AM–9 PM Sunday for ultimate flexibility" },
  { icon: Flame, title: "CrossFit & MMA Zone", desc: "Dedicated functional training and combat sports area" },
  { icon: Target, title: "Precision Nutrition", desc: "Personalized diet plans and supplement guidance included" },
  { icon: Trophy, title: "15,000+ Transformations", desc: "Proven track record of results with monthly progress tracking" },
];

export default function HomePage() {
  return (
    <>
      <div className="bg-gradient-red text-white py-2 text-center text-sm font-medium">
        <span className="inline-flex items-center gap-2"><Zap className="w-4 h-4" />Limited Offer: 14-Day FREE Trial — No Credit Card Required<Link href="/#free-trial" className="underline font-bold ml-2">Claim Now →</Link></span>
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.pexels.com/photos/7031706/pexels-photo-7031706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000" alt="Dark gym atmosphere" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/80 to-dark-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium mb-6 text-red-brand border border-red-brand/30"><Flame className="w-4 h-4" />Mumbai&apos;s Premier Fitness Destination</span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.1] mb-6">Forge Your<br /><span className="text-gradient-red">Strength</span></h1>
              <p className="text-lg md:text-xl text-dark-300 mb-8 max-w-lg leading-relaxed">{SITE_TAGLINE}. Join 5,000+ members starting at just <span className="text-red-brand font-bold">₹1,999/month</span>.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#free-trial" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-red text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-red-brand/30 transition-all hover:-translate-y-1 glow-red">Start 14-Day Free Trial<ArrowRight className="w-5 h-5" /></Link>
                <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 glass border border-white/10 text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all">View Plans</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-dark-900 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">{STATS.map((s) => <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />)}</div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Why IronCore?" subtitle="Everything you need for a world-class training experience" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-6 hover:border-red-brand/30 transition-all group h-full">
                  <div className="w-14 h-14 bg-red-brand/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-red-brand/20 transition-colors"><f.icon className="w-7 h-7 text-red-brand" /></div>
                  <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-dark-400 leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Facility" subtitle="Experience the IronCore atmosphere" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"><div className="absolute bottom-4 left-4"><p className="text-white font-medium text-sm">{img.alt}</p></div></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Member Stories" subtitle="Real results from real members" />
          <TestimonialSlider />
        </div>
      </section>

      {/* Free Trial */}
      <section id="free-trial" className="py-24 bg-dark-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="right">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-brand/10 text-red-brand rounded-full text-sm font-medium mb-4 border border-red-brand/30"><Zap className="w-4 h-4" />Limited Time Offer</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">Start Your <span className="text-gradient-red">14-Day Free Trial</span></h2>
              <p className="text-dark-400 text-lg mb-8">Experience everything IronCore has to offer — completely free. No credit card. No commitment. Just results.</p>
              <ul className="space-y-4">
                {["Full access to all equipment & zones", "One complimentary personal training session", "Free fitness assessment & body composition analysis", "Access to 30+ weekly group classes", "Locker room & steam room access"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-dark-300"><div className="w-6 h-6 rounded-full bg-red-brand/20 flex items-center justify-center shrink-0"><Heart className="w-3 h-3 text-red-brand" /></div>{item}</li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection direction="left"><div className="glass-card rounded-2xl p-8"><FreeTrialForm /></div></AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0"><Image src="https://images.pexels.com/photos/6390234/pexels-photo-6390234.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600" alt="Training" fill className="object-cover" /><div className="absolute inset-0 bg-dark-950/90" /></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to Transform?</h2>
            <p className="text-dark-300 text-lg mb-8 max-w-2xl mx-auto">Join 5,000+ members who have started their journey with IronCore Mumbai.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#free-trial" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-red text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-red-brand/30 transition-all hover:-translate-y-1">Claim 14-Day Free Trial<ArrowRight className="w-5 h-5" /></Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 glass border border-white/10 text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
