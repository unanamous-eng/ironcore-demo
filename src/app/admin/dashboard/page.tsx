"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dumbbell, Users, MessageSquare, BarChart3, LogOut, Loader2, RefreshCw, UserPlus, TrendingUp, Percent, Calendar } from "lucide-react";

interface TrialSignup { id: number; name: string; email: string; phone: string; createdAt: string }
interface ContactSubmission { id: number; name: string; email: string; phone: string; subject: string; message: string; createdAt: string }
interface DashboardData { totalTrials: number; totalContacts: number; planStats: { plan: string; count: number }[]; recentTrials: TrialSignup[]; recentContacts: ContactSubmission[] }

function BarChart({ data }: { data: { plan: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (<div className="space-y-4">{data.map((item) => (<div key={item.plan}><div className="flex justify-between mb-1"><span className="text-sm font-medium text-dark-300">{item.plan}</span><span className="text-sm font-bold text-white">{item.count}</span></div><div className="h-3 bg-dark-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-red rounded-full transition-all duration-500" style={{ width: `${(item.count / max) * 100}%` }} /></div></div>))}</div>);
}

function ConversionChart({ data }: { data: { month: string; rate: number }[] }) {
  const max = Math.max(...data.map((d) => d.rate), 1);
  return (<div className="flex items-end gap-3 h-40">{data.map((item) => (<div key={item.month} className="flex-1 flex flex-col items-center gap-2"><div className="w-full bg-gradient-red rounded-t-lg transition-all" style={{ height: `${(item.rate / max) * 100}%` }} /><span className="text-xs text-dark-500">{item.month}</span></div>))}</div>);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"trials" | "contacts">("trials");
  const conversionData = [{ month: "Jan", rate: 32 }, { month: "Feb", rate: 45 }, { month: "Mar", rate: 38 }, { month: "Apr", rate: 52 }, { month: "May", rate: 48 }, { month: "Jun", rate: 61 }];

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.status === 401) { router.push("/admin/login"); return; }
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch { console.error("Failed to fetch"); } finally { setLoading(false); }
  }, [router]);

  useEffect(() => { fetchData(); }, [fetchData]);
  async function handleLogout() { await fetch("/api/admin/logout", { method: "POST" }); router.push("/admin/login"); }
  const conversionRate = data ? (data.totalTrials > 0 ? "35" : "0") : "0";

  if (loading) return <div className="min-h-screen bg-dark-950 flex items-center justify-center"><Loader2 className="w-8 h-8 text-red-brand animate-spin" /></div>;
  if (!data) return <div className="min-h-screen bg-dark-950 flex items-center justify-center"><button onClick={fetchData} className="px-4 py-2 bg-red-brand text-white rounded-lg text-sm">Retry</button></div>;

  const statCards = [
    { label: "Trial Signups", value: data.totalTrials, icon: UserPlus, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Contact Messages", value: data.totalContacts, icon: MessageSquare, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "Conversion Rate", value: `${conversionRate}%`, icon: Percent, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "This Month", value: data.recentTrials.filter((t) => new Date(t.createdAt).getMonth() === new Date().getMonth()).length, icon: Calendar, color: "text-orange-400", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <header className="glass border-b border-white/5 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3"><Link href="/" className="flex items-center gap-2"><div className="w-9 h-9 bg-gradient-red rounded-lg flex items-center justify-center"><Dumbbell className="w-5 h-5 text-white" /></div><span className="text-lg font-extrabold text-white hidden sm:inline">Iron<span className="text-red-brand">Core</span></span></Link><span className="text-dark-600">|</span><span className="text-sm font-medium text-dark-400">Dashboard</span></div>
          <div className="flex items-center gap-3"><button onClick={fetchData} className="p-2 text-dark-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Refresh"><RefreshCw className="w-4 h-4" /></button><button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark-400 hover:text-red-brand hover:bg-red-500/10 rounded-lg transition-colors"><LogOut className="w-4 h-4" /><span className="hidden sm:inline">Logout</span></button></div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">{statCards.map((c) => <div key={c.label} className="glass-card rounded-xl p-5"><div className="flex items-center gap-3 mb-3"><div className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.bg}`}><c.icon className={`w-5 h-5 ${c.color}`} /></div></div><div className="text-2xl font-bold text-white">{c.value}</div><div className="text-sm text-dark-500 mt-0.5">{c.label}</div></div>)}</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6 lg:col-span-2"><div className="flex items-center gap-2 mb-6"><TrendingUp className="w-5 h-5 text-red-brand" /><h3 className="font-semibold text-white">Conversion Trend (Mock)</h3></div><ConversionChart data={conversionData} /></div>
          <div className="glass-card rounded-xl p-6"><div className="flex items-center gap-2 mb-6"><BarChart3 className="w-5 h-5 text-red-brand" /><h3 className="font-semibold text-white">Plan Interest</h3></div><BarChart data={data.planStats} /></div>
        </div>
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="flex border-b border-white/5">
            <button onClick={() => setActiveTab("trials")} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "trials" ? "border-red-brand text-red-brand" : "border-transparent text-dark-500 hover:text-dark-300"}`}><Users className="w-4 h-4" />Trial Signups</button>
            <button onClick={() => setActiveTab("contacts")} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "contacts" ? "border-red-brand text-red-brand" : "border-transparent text-dark-500 hover:text-dark-300"}`}><MessageSquare className="w-4 h-4" />Contact Messages</button>
          </div>
          <div className="overflow-x-auto">
            {activeTab === "trials" ? (data.recentTrials.length === 0 ? <div className="p-12 text-center text-dark-500"><Users className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>No trial signups yet</p></div> : <table className="w-full"><thead><tr className="border-b border-white/5"><th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-3">Name</th><th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-3">Email</th><th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-3">Phone</th><th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-3">Date</th></tr></thead><tbody>{data.recentTrials.map((t) => <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="px-6 py-4 text-sm font-medium text-white">{t.name}</td><td className="px-6 py-4 text-sm text-dark-400">{t.email}</td><td className="px-6 py-4 text-sm text-dark-400">{t.phone}</td><td className="px-6 py-4 text-sm text-dark-500">{new Date(t.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td></tr>)}</tbody></table>) : (data.recentContacts.length === 0 ? <div className="p-12 text-center text-dark-500"><MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>No contact submissions yet</p></div> : <table className="w-full"><thead><tr className="border-b border-white/5"><th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-3">Name</th><th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-3">Subject</th><th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-3">Email</th><th className="text-left text-xs font-medium text-dark-500 uppercase tracking-wider px-6 py-3">Date</th></tr></thead><tbody>{data.recentContacts.map((c) => <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="px-6 py-4 text-sm font-medium text-white">{c.name}</td><td className="px-6 py-4 text-sm text-dark-400">{c.subject}</td><td className="px-6 py-4 text-sm text-dark-400">{c.email}</td><td className="px-6 py-4 text-sm text-dark-500">{new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td></tr>)}</tbody></table>)}
          </div>
        </div>
      </div>
    </div>
  );
}
