import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area,
} from "recharts";
import { supabase } from "../lib/supabase";

// ── helpers ──────────────────────────────────────────────────────────────────

const SITE_META = {
  "chatgpt.com":       { label: "ChatGPT",  color: "#8b5cf6" },
  "chat.openai.com":   { label: "ChatGPT",  color: "#8b5cf6" },
  "claude.ai":         { label: "Claude",   color: "#6366f1" },
  "gemini.google.com": { label: "Gemini",   color: "#a78bfa" },
};
const SITE_OTHER = { label: "Other", color: "#475569" };

const INTENT_COLORS = [
  "#8b5cf6","#6366f1","#a78bfa","#4f46e5","#c084fc","#818cf8","#7c3aed","#d8b4fe",
];

function siteInfo(site = "") {
  for (const [key, val] of Object.entries(SITE_META)) {
    if (site.includes(key)) return val;
  }
  return SITE_OTHER;
}

function estimateTokens(text = "") {
  return Math.round(text.length / 4);
}

function formatNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function monthLabel(bucket) {
  const [y, m] = bucket.split("-");
  return new Date(Number(y), Number(m) - 1).toLocaleString("default", { month: "short", year: "2-digit" });
}

// ── custom tooltip ────────────────────────────────────────────────────────────

function DarkTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm shadow-xl">
      {label && <p className="text-slate-400 mb-1 text-xs">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill }} className="font-medium">
          {p.name}: {typeof p.value === "number" ? formatNumber(Math.round(p.value)) : p.value}
        </p>
      ))}
    </div>
  );
}

function PieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm shadow-xl">
      <p style={{ color: payload[0].payload.color }} className="font-semibold">{name}</p>
      <p className="text-slate-300">{formatNumber(Math.round(value))}</p>
    </div>
  );
}

// ── stat card ─────────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub, accent = "purple" }) {
  const colors = {
    purple: "from-violet-500/10 to-violet-600/5 border-violet-500/20 text-violet-400",
    cyan:   "from-indigo-500/10 to-indigo-600/5 border-indigo-500/20 text-indigo-400",
    green:  "from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400",
    amber:  "from-fuchsia-500/10 to-fuchsia-600/5 border-fuchsia-500/20 text-fuchsia-400",
  };
  return (
    <div className={`bg-gradient-to-br ${colors[accent]} border rounded-2xl p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
        </div>
        <div className="text-2xl opacity-80">{icon}</div>
      </div>
    </div>
  );
}

// ── section wrapper ───────────────────────────────────────────────────────────

function Section({ title, children, className = "" }) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 ${className}`}>
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-5">{title}</h2>
      {children}
    </div>
  );
}

// ── empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p className="text-slate-400 text-sm">No data yet</p>
      <p className="text-slate-600 text-xs mt-1">Use the extension to compress prompts and your stats will appear here.</p>
    </div>
  );
}

// ── main dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { navigate("/login", { replace: true }); return; }
      setUser(data.session.user);
      loadData(data.session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") navigate("/login", { replace: true });
      if (session) setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  async function loadData(userId) {
    const [{ data: prof }, { data: feedback }] = await Promise.all([
      supabase.from("user_profiles").select("*").eq("id", userId).single(),
      supabase
        .from("prompt_feedback")
        .select("action,original_text,optimized_text,intent,reduction_percent,site,created_at,validation_score")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(500),
    ]);
    setProfile(prof);
    setRows(feedback ?? []);
    setLoading(false);
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  // ── derived stats ────────────────────────────────────────────────────────────

  const applied = rows.filter((r) => r.action === "applied");

  const totalTokensSaved = applied.reduce((sum, r) => {
    const before = estimateTokens(r.original_text);
    return sum + Math.round(before * (r.reduction_percent / 100));
  }, 0);

  const avgReduction = applied.length
    ? Math.round(applied.reduce((s, r) => s + r.reduction_percent, 0) / applied.length)
    : 0;

  const acceptRate = rows.length
    ? Math.round((applied.length / rows.length) * 100)
    : 0;

  // Per-platform breakdown (token savings)
  const bySite = {};
  for (const r of applied) {
    const key = siteInfo(r.site).label;
    const saved = Math.round(estimateTokens(r.original_text) * (r.reduction_percent / 100));
    bySite[key] = (bySite[key] || { tokens: 0, count: 0, color: siteInfo(r.site).color });
    bySite[key].tokens += saved;
    bySite[key].count += 1;
  }
  const platformData = Object.entries(bySite).map(([name, v]) => ({
    name, value: v.tokens, count: v.count, color: v.color,
  })).sort((a, b) => b.value - a.value);

  // Accept vs reject
  const actionData = [
    { name: "Applied", value: applied.length, color: "#8b5cf6" },
    { name: "Rejected", value: rows.length - applied.length, color: "#1e293b" },
  ].filter((d) => d.value > 0);

  // Intent breakdown
  const byIntent = {};
  for (const r of applied) {
    const k = (r.intent || "other").replace(/_/g, " ");
    byIntent[k] = (byIntent[k] || 0) + 1;
  }
  const intentData = Object.entries(byIntent)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value], i) => ({ name, value, color: INTENT_COLORS[i % INTENT_COLORS.length] }));

  // Monthly token savings
  const byMonth = {};
  for (const r of applied) {
    const bucket = r.created_at.slice(0, 7); // "YYYY-MM"
    if (!byMonth[bucket]) byMonth[bucket] = { tokens: 0, compressions: 0 };
    byMonth[bucket].tokens += Math.round(estimateTokens(r.original_text) * (r.reduction_percent / 100));
    byMonth[bucket].compressions += 1;
  }
  const monthlyData = Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([bucket, v]) => ({ month: monthLabel(bucket), ...v }));

  // Per-platform compression count for bar chart
  const platformCountData = Object.entries(bySite).map(([name, v]) => ({
    name, compressions: v.count, color: v.color,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-xl tracking-tight">
            <span className="text-purple-400">Lean</span>Prompt
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-slate-400 text-sm">{user?.email}</span>
            <button
              onClick={signOut}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Your Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Token savings and compression insights across all your AI tools.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon="⚡" label="Total compressions" value={formatNumber(rows.length)} sub={`${applied.length} applied`} accent="purple" />
          <StatCard icon="🪙" label="Tokens saved" value={formatNumber(profile?.total_tokens_saved || totalTokensSaved)} sub="estimated" accent="green" />
          <StatCard icon="📉" label="Avg reduction" value={`${avgReduction}%`} sub="per applied prompt" accent="cyan" />
          <StatCard icon="✅" label="Accept rate" value={`${acceptRate}%`} sub={`${rows.length} total prompts`} accent="amber" />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Platform breakdown pie */}
          <Section title="Tokens saved by platform" className="lg:col-span-1">
            {platformData.length === 0 ? <EmptyState /> : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={platformData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                    {platformData.map((d, i) => <Cell key={i} fill={d.color} stroke="transparent" />)}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend
                    formatter={(value, entry) => (
                      <span style={{ color: entry.color, fontSize: 12 }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Section>

          {/* Monthly area chart */}
          <Section title="Monthly token savings" className="lg:col-span-2">
            {monthlyData.length === 0 ? <EmptyState /> : (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tokenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={formatNumber} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} width={45} />
                  <Tooltip content={<DarkTooltip />} />
                  <Area type="monotone" dataKey="tokens" name="Tokens saved" stroke="#8b5cf6" strokeWidth={2} fill="url(#tokenGrad)" dot={{ fill: "#a78bfa", r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Section>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Intent distribution pie */}
          <Section title="Prompt intent breakdown" className="lg:col-span-1">
            {intentData.length === 0 ? <EmptyState /> : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={intentData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2} dataKey="value">
                    {intentData.map((d, i) => <Cell key={i} fill={d.color} stroke="transparent" />)}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: "#94a3b8", fontSize: 11 }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Section>

          {/* Compressions per platform bar */}
          <Section title="Compressions per platform" className="lg:col-span-2">
            {platformCountData.length === 0 ? <EmptyState /> : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={platformCountData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
                  <Tooltip content={<DarkTooltip />} cursor={{ fill: "rgba(148,163,184,0.05)" }} />
                  <Bar dataKey="compressions" name="Compressions" radius={[6, 6, 0, 0]}>
                    {platformCountData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </Section>
        </div>

        {/* Accept vs reject + monthly compressions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Accept/reject donut */}
          <Section title="Apply vs reject rate" className="lg:col-span-1">
            {actionData.length === 0 ? <EmptyState /> : (
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={actionData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value" startAngle={90} endAngle={-270}>
                      {actionData.map((d, i) => <Cell key={i} fill={d.color} stroke="transparent" />)}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex gap-6 mt-1">
                  {actionData.map((d) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                      <span className="text-slate-400 text-xs">{d.name} ({d.value})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* Monthly compressions bar */}
          <Section title="Monthly compressions" className="lg:col-span-2">
            {monthlyData.length === 0 ? <EmptyState /> : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
                  <Tooltip content={<DarkTooltip />} cursor={{ fill: "rgba(148,163,184,0.05)" }} />
                  <Bar dataKey="compressions" name="Compressions" radius={[6, 6, 0, 0]}>
                    {monthlyData.map((_, i) => (
                      <Cell key={i} fill={i % 2 === 0 ? "#8b5cf6" : "#6366f1"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </Section>
        </div>

        {/* Recent compressions table */}
        <Section title="Recent compressions">
          {rows.length === 0 ? <EmptyState /> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    {["Platform", "Intent", "Reduction", "Status", "Date"].map((h) => (
                      <th key={h} className="text-left text-slate-500 font-medium pb-3 pr-4 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {rows.slice(0, 20).map((r, i) => {
                    const site = siteInfo(r.site);
                    return (
                      <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 pr-4">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: site.color + "20", color: site.color }}>
                            {site.label}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-slate-300 capitalize">{(r.intent || "—").replace(/_/g, " ")}</td>
                        <td className="py-3 pr-4">
                          <span className="text-green-400 font-semibold">−{Math.round(r.reduction_percent)}%</span>
                        </td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            r.action === "applied"
                              ? "bg-purple-500/15 text-purple-400"
                              : "bg-slate-700/50 text-slate-400"
                          }`}>
                            {r.action}
                          </span>
                        </td>
                        <td className="py-3 text-slate-500 text-xs">
                          {new Date(r.created_at).toLocaleDateString("en", { month: "short", day: "numeric" })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      </main>
    </div>
  );
}
