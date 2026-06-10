"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Dumbbell } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-red rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform glow-red">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">Iron<span className="text-red-brand">Core</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathname === link.href ? "text-red-brand bg-red-brand/10" : "text-dark-300 hover:text-white hover:bg-white/5"}`}>
                {link.label}
              </Link>
            ))}
            <Link href="/#free-trial" className="ml-3 px-5 py-2.5 bg-gradient-red text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-red-brand/30 transition-all hover:-translate-y-0.5">Free Trial</Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg text-dark-300 hover:text-white hover:bg-white/10 transition-colors" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden glass border-t border-white/5 overflow-hidden">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === link.href ? "text-red-brand bg-red-brand/10" : "text-dark-300 hover:text-white hover:bg-white/5"}`}>
                  {link.label}
                </Link>
              ))}
              <Link href="/#free-trial" onClick={() => setIsOpen(false)} className="block mt-3 px-4 py-3 bg-gradient-red text-white rounded-lg text-sm font-semibold text-center">Start 14-Day Free Trial</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
