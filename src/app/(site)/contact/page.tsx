"use client";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2, Send, Flame } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { CONTACT_INFO } from "@/lib/constants";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [state, setState] = useState<{ status: "idle" | "loading" | "success" | "error"; message: string; errors: Record<string, string> }>({ status: "idle", message: "", errors: {} });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState({ status: "loading", message: "", errors: {} });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) {
        const fieldErrors: Record<string, string> = {};
        if (data.errors) { for (const err of data.errors) { fieldErrors[err.field] = err.message; } }
        setState({ status: "error", message: data.message || "Something went wrong", errors: fieldErrors });
        return;
      }
      setState({ status: "success", message: data.message, errors: {} });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch { setState({ status: "error", message: "Network error.", errors: {} }); }
  }

  const contactDetails = [
    { icon: MapPin, label: "Visit Us", value: CONTACT_INFO.address },
    { icon: Phone, label: "Call Us", value: CONTACT_INFO.phone },
    { icon: Mail, label: "Email Us", value: CONTACT_INFO.email },
    { icon: Clock, label: "Hours", value: CONTACT_INFO.hours },
  ];

  return (
    <>
      <section className="pt-32 pb-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-brand/10 text-red-brand rounded-full text-sm font-medium mb-4 border border-red-brand/30"><Flame className="w-4 h-4" />Get In Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">Contact <span className="text-gradient-red">IronCore</span></h1>
            <p className="text-dark-400 text-lg">Have questions? We&apos;d love to hear from you.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <AnimatedSection direction="right">
              <h2 className="text-2xl font-bold text-white mb-6">Reach Us Directly</h2>
              <div className="space-y-6">{contactDetails.map((d) => <div key={d.label} className="flex items-start gap-4"><div className="w-12 h-12 bg-red-brand/10 rounded-xl flex items-center justify-center shrink-0"><d.icon className="w-5 h-5 text-red-brand" /></div><div><p className="font-semibold text-white text-sm">{d.label}</p><p className="text-dark-400 text-sm mt-0.5">{d.value}</p></div></div>)}</div>
              <div className="mt-8 rounded-2xl glass-card h-48 flex items-center justify-center"><div className="text-center text-dark-500"><MapPin className="w-8 h-8 mx-auto mb-2 text-red-brand" /><p className="text-sm">West Fitness Zone, Mumbai</p></div></div>
            </AnimatedSection>
          </div>
          <div className="lg:col-span-3">
            <AnimatedSection direction="left">
              {state.status === "success" ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 text-center border border-green-500/20">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" /><h3 className="text-2xl font-bold text-white mb-2">Message Sent! ✉️</h3><p className="text-dark-300">We&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => setState({ status: "idle", message: "", errors: {} })} className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">Send Another Message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
                  <h2 className="text-2xl font-bold text-white mb-2">Send Us a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(["name", "email", "phone", "subject"] as const).map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-dark-300 mb-1.5 capitalize">{field} *</label>
                        <input type={field === "email" ? "email" : field === "phone" ? "tel" : "text"} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className={`w-full px-4 py-3 bg-dark-800 border rounded-xl text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-red-brand focus:border-transparent transition ${state.errors[field] ? "border-red-500" : "border-dark-700"}`} placeholder={field === "subject" ? "Membership inquiry" : ""} />
                        {state.errors[field] && <p className="text-red-400 text-xs mt-1">{state.errors[field]}</p>}
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1.5">Message *</label>
                    <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`w-full px-4 py-3 bg-dark-800 border rounded-xl text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-red-brand focus:border-transparent transition resize-none ${state.errors.message ? "border-red-500" : "border-dark-700"}`} placeholder="Tell us what you'd like to know..." />
                    {state.errors.message && <p className="text-red-400 text-xs mt-1">{state.errors.message}</p>}
                  </div>
                  {state.status === "error" && !Object.keys(state.errors).length && <p className="text-red-400 text-sm">{state.message}</p>}
                  <button type="submit" disabled={state.status === "loading"} className="w-full py-4 bg-gradient-red text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-red-brand/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                    {state.status === "loading" ? <><Loader2 className="w-5 h-5 animate-spin" />Sending...</> : <><Send className="w-5 h-5" />Send Message</>}
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
