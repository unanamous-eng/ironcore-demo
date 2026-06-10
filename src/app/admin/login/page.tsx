"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Login failed"); setLoading(false); return; }
      router.push("/admin/dashboard");
    } catch { setError("Network error."); setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6"><div className="w-12 h-12 bg-gradient-red rounded-xl flex items-center justify-center glow-red"><Dumbbell className="w-7 h-7 text-white" /></div><span className="text-2xl font-extrabold text-white">Iron<span className="text-red-brand">Core</span></span></Link>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1><p className="text-dark-500 text-sm mt-1">Sign in to access the dashboard</p>
        </div>
        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div><label className="block text-sm font-medium text-dark-300 mb-1.5">Email</label><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" /><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-red-brand focus:border-transparent transition" placeholder="admin@ironcoremumbai.demo" required /></div></div>
            <div><label className="block text-sm font-medium text-dark-300 mb-1.5">Password</label><div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" /><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-red-brand focus:border-transparent transition" placeholder="••••••••" required /></div></div>
            {error && <p className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-red text-white rounded-xl font-bold hover:shadow-lg hover:shadow-red-brand/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2">{loading ? <><Loader2 className="w-5 h-5 animate-spin" />Signing in...</> : "Sign In"}</button>
          </form>
        </div>
        <p className="text-center text-xs text-dark-600 mt-6"><Link href="/" className="hover:text-red-brand transition-colors">← Back to website</Link></p>
      </div>
    </div>
  );
}
