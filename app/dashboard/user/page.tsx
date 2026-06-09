"use client";

import {
  Droplets, ShieldCheck, Gauge, Wallet,
  ArrowUpRight, Bell, Sparkles, TrendingDown,
  TrendingUp, CheckCircle2, AlertTriangle, Clock,
  Zap, CreditCard, BarChart3,
} from "lucide-react";
import { useAuth } from "@/lib/apollo-auth";

const metrics = [
  { label: "Tank level",    value: "74%",     note: "~3,700 L remaining",   icon: Droplets,    trend: "stable", trendVal: "OK",    accentBg: "rgba(14,158,127,0.12)",  accent: "#3dd4b0", accentBorder: "rgba(14,158,127,0.2)"  },
  { label: "Water quality", value: "Safe",    note: "TDS 182 ppm",          icon: ShieldCheck, trend: "up",     trendVal: "Good",  accentBg: "rgba(16,185,129,0.12)",  accent: "#6ee7b7", accentBorder: "rgba(16,185,129,0.2)"  },
  { label: "Usage today",   value: "320 L",   note: "Down 8% from yesterday",icon: Gauge,      trend: "down",   trendVal: "−8%",   accentBg: "rgba(59,130,246,0.12)",  accent: "#93c5fd", accentBorder: "rgba(59,130,246,0.2)"  },
  { label: "Balance due",   value: "KES 240", note: "Due in 4 days",        icon: Wallet,      trend: "stable", trendVal: "4d",    accentBg: "rgba(245,158,11,0.12)",  accent: "#fcd34d", accentBorder: "rgba(245,158,11,0.2)"  },
];

const weekBars = [
  { day: "Mon", liters: 290 }, { day: "Tue", liters: 340 }, { day: "Wed", liters: 280 },
  { day: "Thu", liters: 410 }, { day: "Fri", liters: 360 }, { day: "Sat", liters: 300 },
  { day: "Sun", liters: 320 },
];
const maxBar = Math.max(...weekBars.map((b) => b.liters));

const alerts = [
  { title: "Tank refill scheduled",  detail: "Block 4 reservoir topped up at 4:00 PM today.",           tone: "info"     as const, time: "10 min ago" },
  { title: "Low usage streak",        detail: "Your household usage is below community average this week.", tone: "warning"  as const, time: "1 hour ago"  },
  { title: "Bill reminder",           detail: "KES 240 pending for current cycle — due in 4 days.",        tone: "critical" as const, time: "Today"       },
];

const toneMap = {
  info:     { dot: "#3b82f6", pill: "rgba(59,130,246,0.12)",  text: "#93c5fd", label: "Info",     Icon: CheckCircle2  },
  warning:  { dot: "#f59e0b", pill: "rgba(245,158,11,0.12)",  text: "#fcd34d", label: "Warning",  Icon: Zap           },
  critical: { dot: "#ef4444", pill: "rgba(239,68,68,0.12)",   text: "#fca5a5", label: "Action",   Icon: AlertTriangle },
};

const borderTone = { info: "#3b82f660", warning: "#f59e0b60", critical: "#ef444460" };

const healthBars = [
  { label: "Water level",   percent: 74, gradient: "linear-gradient(90deg,#0e9e7f,#3dd4b0)", status: "Normal",    statusColor: "#3dd4b0", statusBg: "rgba(14,158,127,0.12)"  },
  { label: "Water quality", percent: 92, gradient: "linear-gradient(90deg,#059669,#6ee7b7)", status: "Excellent", statusColor: "#6ee7b7", statusBg: "rgba(16,185,129,0.12)"  },
  { label: "Efficiency",    percent: 68, gradient: "linear-gradient(90deg,#2563eb,#93c5fd)", status: "Good",      statusColor: "#93c5fd", statusBg: "rgba(59,130,246,0.12)"  },
];

const panel = {
  background: "rgba(255,255,255,0.032)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 18,
  padding: 24,
};
const subCard = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.055)",
  borderRadius: 12,
};

export default function UserDashboardPage() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-6 max-w-[1380px]">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "28px 32px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 80% at 95% 50%, rgba(59,130,246,0.1) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 60% at 5% 90%, rgba(14,158,127,0.08) 0%, transparent 60%)" }} />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-lg">
            <div
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em] uppercase mb-3"
              style={{ color: "#93c5fd", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.22)", padding: "4px 12px", borderRadius: 20 }}
            >
              <Sparkles size={12} />
              Household view · {user?.community ?? "Block B, Unit 04"}
            </div>
            <h1
              className="font-extrabold text-slate-50 mb-2"
              style={{ fontSize: "clamp(24px,3.5vw,38px)", lineHeight: 1.08, letterSpacing: "-0.035em" }}
            >
              Good morning,{"\n"}{user?.name?.split(" ")[0] ?? "Jane"} 👋
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md">
              Your tank is at 74% and water quality is excellent. Your next bill of KES 240 is due in 4 days.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ padding: "11px 22px", background: "linear-gradient(135deg,#2563eb,#1e40af)", borderRadius: 12, border: "none", cursor: "pointer", boxShadow: "0 4px 18px rgba(37,99,235,0.35)" }}
            >
              Pay KES 240
              <ArrowUpRight size={15} />
            </button>
            <button
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
              style={{ padding: "11px 18px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#94a3b8", cursor: "pointer" }}
            >
              <Bell size={14} />
              Alerts
            </button>
          </div>
        </div>
      </section>

      {/* ── Metric cards ── */}
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          const TrendIcon = m.trend === "up" ? TrendingUp : m.trend === "down" ? TrendingDown : null;
          return (
            <div
              key={m.label}
              className="transition-all duration-250 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.032)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 20, animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">{m.label}</p>
                <div className="flex items-center justify-center flex-shrink-0 rounded-[10px]" style={{ width: 36, height: 36, background: m.accentBg, border: `1px solid ${m.accentBorder}`, color: m.accent }}>
                  <Icon size={15} />
                </div>
              </div>
              <p className="font-extrabold text-slate-50 leading-none mb-3" style={{ fontSize: "clamp(20px,2.5vw,28px)", letterSpacing: "-0.03em" }}>
                {m.value}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">{m.note}</p>
                <span
                  className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-full"
                  style={m.trend === "up" ? { background: "rgba(16,185,129,0.12)", color: "#6ee7b7" } : m.trend === "down" ? { background: "rgba(239,68,68,0.1)", color: "#fca5a5" } : { background: "rgba(100,116,139,0.12)", color: "#64748b" }}
                >
                  {TrendIcon && <TrendIcon size={10} />}
                  {m.trendVal}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── Main split ── */}
      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr] items-start">

        {/* Left — usage + health */}
        <div className="flex flex-col gap-5">

          {/* Weekly usage chart */}
          <div style={panel}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Usage</p>
                <h2 className="text-[17px] font-bold text-slate-100" style={{ letterSpacing: "-0.02em" }}>Daily usage this week</h2>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "#93c5fd", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", padding: "4px 10px", borderRadius: 20 }}>
                <BarChart3 size={12} />
                Avg: 329 L/day
              </div>
            </div>

            {/* Bars */}
            <div className="flex items-end gap-2.5 h-36">
              {weekBars.map((b, i) => {
                const pct = (b.liters / maxBar) * 100;
                const isToday = i === weekBars.length - 1;
                return (
                  <div key={b.day} className="flex-1 flex flex-col items-center gap-1.5 group/bar">
                    <span className="text-[10px] text-slate-600 font-mono opacity-0 group-hover/bar:opacity-100 transition-opacity">{b.liters}</span>
                    <div
                      className="w-full rounded-t-[6px] transition-all duration-500 relative"
                      style={{
                        height: `${pct}%`,
                        background: isToday ? "linear-gradient(180deg,#93c5fd,#2563eb)" : "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        minHeight: 6,
                      }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-200 text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                        {b.liters} L
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{b.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Health bars */}
          <div style={panel}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Home health</p>
                <h2 className="text-[17px] font-bold text-slate-100" style={{ letterSpacing: "-0.02em" }}>System snapshot</h2>
              </div>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold"
                style={{ color: "#3dd4b0", background: "rgba(14,158,127,0.1)", border: "1px solid rgba(14,158,127,0.2)", padding: "4px 10px", borderRadius: 20 }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#0e9e7f", boxShadow: "0 0 5px rgba(14,158,127,0.8)" }} />
                Live
              </span>
            </div>
            <div className="space-y-3">
              {healthBars.map((bar) => (
                <div key={bar.label} style={{ ...subCard, padding: 14 }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-200">{bar.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: bar.statusBg, color: bar.statusColor }}>{bar.status}</span>
                      <span className="text-xs font-mono text-slate-500">{bar.percent}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${bar.percent}%`, background: bar.gradient }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — alerts + billing */}
        <div className="flex flex-col gap-5">

          {/* Alerts */}
          <div style={panel}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Alerts</p>
                <h2 className="text-[17px] font-bold text-slate-100" style={{ letterSpacing: "-0.02em" }}>Your notifications</h2>
              </div>
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(239,68,68,0.12)", color: "#fca5a5" }}
              >
                {alerts.length} new
              </span>
            </div>
            <div className="space-y-2.5">
              {alerts.map((alert) => {
                const t = toneMap[alert.tone];
                const AlertIcon = t.Icon;
                return (
                  <div
                    key={alert.title}
                    style={{ ...subCard, padding: "13px 14px 13px 15px", borderLeft: `2px solid ${borderTone[alert.tone]}` }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: t.dot }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-[13px] font-semibold text-slate-200 leading-tight">{alert.title}</h3>
                          <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: t.pill, color: t.text }}>
                            {t.label}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{alert.detail}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock size={10} style={{ color: "#334155" }} />
                          <span className="text-[11px] text-slate-600">{alert.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Billing */}
          <div style={panel}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Billing</p>
                <h2 className="text-[17px] font-bold text-slate-100" style={{ letterSpacing: "-0.02em" }}>Your bill this month</h2>
              </div>
              <CreditCard size={16} style={{ color: "#93c5fd" }} />
            </div>

            {/* Due amount */}
            <div className="mb-4" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.14)", borderRadius: 12, padding: 16 }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Amount due</span>
                <span className="text-[18px] font-extrabold text-white" style={{ letterSpacing: "-0.02em" }}>KES 240</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full" style={{ width: "40%", background: "linear-gradient(90deg,#2563eb,#93c5fd)" }} />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Cycle: May 2026</span>
                <span className="font-semibold" style={{ color: "#fcd34d" }}>Due in 4 days</span>
              </div>
            </div>

            {/* M-Pesa payment history */}
            <div className="space-y-2 mb-4">
              {[
                { label: "Apr 2026", amount: "KES 210", status: "Paid", ok: true  },
                { label: "Mar 2026", amount: "KES 195", status: "Paid", ok: true  },
                { label: "Feb 2026", amount: "KES 230", status: "Paid", ok: true  },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span className="text-xs text-slate-500">{row.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-300">{row.amount}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#6ee7b7" }}>{row.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="flex items-center justify-center gap-1.5 w-full text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ padding: "11px 0", background: "linear-gradient(135deg,#2563eb,#1e40af)", borderRadius: 10, border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}
            >
              Pay now via M-Pesa
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
