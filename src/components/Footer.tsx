import Link from "next/link";
import { Dumbbell, MapPin, Phone, Mail, Clock } from "lucide-react";
import { CONTACT_INFO, NAV_LINKS, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-red rounded-lg flex items-center justify-center"><Dumbbell className="w-6 h-6 text-white" /></div>
              <span className="text-xl font-extrabold text-white">Iron<span className="text-red-brand">Core</span></span>
            </Link>
            <p className="text-sm text-dark-400 leading-relaxed">Mumbai&apos;s premier fitness destination. Elite equipment, expert trainers, and a community dedicated to forging champions.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (<li key={link.href}><Link href={link.href} className="text-sm text-dark-400 hover:text-red-brand transition-colors">{link.label}</Link></li>))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm"><MapPin className="w-4 h-4 text-red-brand mt-0.5 shrink-0" /><span className="text-dark-400">{CONTACT_INFO.address}</span></li>
              <li className="flex items-center gap-3 text-sm"><Phone className="w-4 h-4 text-red-brand shrink-0" /><span className="text-dark-400">{CONTACT_INFO.phone}</span></li>
              <li className="flex items-center gap-3 text-sm"><Mail className="w-4 h-4 text-red-brand shrink-0" /><span className="text-dark-400">{CONTACT_INFO.email}</span></li>
              <li className="flex items-start gap-3 text-sm"><Clock className="w-4 h-4 text-red-brand mt-0.5 shrink-0" /><span className="text-dark-400">{CONTACT_INFO.hours}</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Start Today</h3>
            <p className="text-sm text-dark-400 mb-4">Join {SITE_NAME} and claim your 14-day free trial.</p>
            <Link href="/#free-trial" className="inline-block px-6 py-3 bg-gradient-red text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-red-brand/30 transition-all">Claim Free Trial</Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dark-500">© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <Link href="/admin/login" className="text-xs text-dark-600 hover:text-dark-400 transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
