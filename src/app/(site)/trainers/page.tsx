"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Calendar, BadgeCheck, Flame } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import { TRAINERS } from "@/lib/constants";

export default function TrainersPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-brand/10 text-red-brand rounded-full text-sm font-medium mb-4 border border-red-brand/30"><Flame className="w-4 h-4" />Our Team</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">Elite <span className="text-gradient-red">Trainers</span></h1>
            <p className="text-dark-400 text-lg">Our certified coaches bring decades of combined experience to help you achieve your goals.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRAINERS.map((trainer, i) => (
              <AnimatedSection key={trainer.name} delay={i * 0.1}>
                <div className="glass-card rounded-2xl overflow-hidden hover:border-red-brand/30 transition-all group h-full">
                  <div className="relative h-72 overflow-hidden">
                    <Image src={trainer.image} alt={trainer.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 100vw,(max-width:1024px) 50vw,33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4"><h3 className="text-xl font-bold text-white">{trainer.name}</h3><div className="flex items-center gap-2 mt-1"><Award className="w-4 h-4 text-red-brand" /><span className="text-red-brand font-medium text-sm">{trainer.specialty}</span></div></div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-dark-400"><Calendar className="w-4 h-4" />{trainer.experience}</div>
                      <div className="flex items-center gap-2 text-sm text-dark-400"><BadgeCheck className="w-4 h-4 text-green-500" />{trainer.certifications}</div>
                    </div>
                    <p className="text-dark-400 text-sm leading-relaxed">{trainer.bio}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-dark-950 text-center">
        <SectionHeading title="Train With the Best" subtitle="Book a free personal training session with your 14-day trial" />
        <Link href="/#free-trial" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-red text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-red-brand/30 transition-all hover:-translate-y-1">Book Free Session</Link>
      </section>
    </>
  );
}
