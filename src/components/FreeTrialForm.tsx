"use client";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, User, Mail, Phone } from "lucide-react";

export default function FreeTrialForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [state, setState] = useState<{ status: "idle" | "loading" | "success" | "error"; message: string; errors: Record<string, string> }>({ status: "idle", message: "", errors: {} });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState({ status: "loading", message: "", errors: {} });
    try {
      const res = await fetch("/api/trial", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) {
        const fieldErrors: Record<string, string> = {};
        if (data.errors) { for (const err of data.errors) { fieldErrors[err.field] = err.message; } }
        setState({ status: "error", message: data.message || "Something went wrong", errors: fieldErrors });
        return;
      }
      setState({ status: "success", message: data.message, errors: {} });
      setForm({ name: "", email: "", phone: "" });
    } catch { setState({ status: "error", message: "Network error. Please try again.", errors: {} }); }
  }

  if (state.status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 text-center border border-green-500/20">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Welcome to IronCore! 💪</h3>
        <p className="text-dark-300">Your 14-day free trial has been activated. Our team will call you within 24 hours!</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {([["name", "Your Full Name", User], ["email", "Email Address", Mail], ["phone", "Phone Number", Phone]] as const).map(([field, placeholder, Icon]) => (
        <div key={field}>
          <div className="relative">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
            <input type={field === "email" ? "email" : field === "phone" ? "tel" : "text"} placeholder={placeholder} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className={`w-full pl-12 pr-4 py-4 bg-dark-800 border rounded-xl text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-red-brand focus:border-transparent transition ${state.errors[field] ? "border-red-500" : "border-dark-700"}`} />
          </div>
          {state.errors[field] && <p className="text-red-400 text-sm mt-1 ml-1">{state.errors[field]}</p>}
        </div>
      ))}
      {state.status === "error" && !Object.keys(state.errors).length && <p className="text-red-400 text-sm text-center">{state.message}</p>}
      <button type="submit" disabled={state.status === "loading"} className="w-full py-4 bg-gradient-red text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-red-brand/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2 glow-red">
        {state.status === "loading" ? (<><Loader2 className="w-5 h-5 animate-spin" />Activating Trial...</>) : "Start My 14-Day Free Trial →"}
      </button>
      <p className="text-xs text-dark-500 text-center">No credit card required · Full access for 14 days</p>
    </form>
  );
}
