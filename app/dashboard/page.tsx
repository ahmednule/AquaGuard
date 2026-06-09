"use client";

import { useMemo } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Banknote,
  Bell,
  CheckCircle2,
  Clock,
  Droplets,
  Gauge,
  MoreHorizontal,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  Waves,
  Wrench,
  Zap,
} from "lucide-react";
import { useAuth } from "@/lib/apollo-auth";

type Role = "user" | "admin";

const roleCopy = {
  user: {
    eyebrow: "Household view",
    title: "Your water, bills\nand alerts.",
    subtitle: "Track tank status, water quality, and payments without digging through noise.",
    action: "Pay bill",
  },
  admin: {
    eyebrow: "Admin view",
    title: "Community-wide\noversight.",
    subtitle: "Watch all blocks, spot anomalies early, and coordinate repairs before residents are affected.",
    action: "Review incidents",
  },
} as const;

const roleMetrics = {
  user: [
    { label: "Tank level",    value: "74%",      note: "About 3,700 L remaining",    icon: Droplets,    trend: "stable" as const, trendVal: "+0%",   accent: "#3dd4b0", accentBg: "rgba(14,158,127,0.12)",  accentBorder: "rgba(14,158,127,0.2)"  },
    { label: "Water quality", value: "Safe",     note: "TDS 182 ppm",                 icon: ShieldCheck, trend: "up"     as const, trendVal: "Good",  accent: "#6ee7b7", accentBg: "rgba(16,185,129,0.12)",  accentBorder: "rgba(16,185,129,0.2)"  },
    { label: "Usage today",   value: "320 L",    note: "Down 8% from yesterday",      icon: Gauge,       trend: "down"   as const, trendVal: "−8%",   accent: "#93c5fd", accentBg: "rgba(59,130,246,0.12)",  accentBorder: "rgba(59,130,246,0.2)"  },
    { label: "Balance due",   value: "KES 240",  note: "Due in 4 days",               icon: Wallet,      trend: "stable" as const, trendVal: "4d",    accent: "#fcd34d", accentBg: "rgba(245,158,11,0.12)",  accentBorder: "rgba(245,158,11,0.2)"  },
  ],
  admin: [
    { label: "Homes online",      value: "48",        note: "2 pending reconnections", icon: Users,    trend: "up"     as const, trendVal: "+2",   accent: "#3dd4b0", accentBg: "rgba(14,158,127,0.12)",  accentBorder: "rgba(14,158,127,0.2)"  },
    { label: "Active alerts",     value: "3",         note: "1 critical, 2 warnings",  icon: Bell,     trend: "down"   as const, trendVal: "−1",   accent: "#fca5a5", accentBg: "rgba(239,68,68,0.12)",   accentBorder: "rgba(239,68,68,0.2)"   },
    { label: "Leak risk",         value: "Low",       note: "No sustained night flow",  icon: Waves,    trend: "stable" as const, trendVal: "Clear",accent: "#6ee7b7", accentBg: "rgba(16,185,129,0.12)",  accentBorder: "rgba(16,185,129,0.2)"  },
    { label: "Outstanding bills", value: "KES 19,400",note: "11 residents pending",    icon: Banknote, trend: "down"   as const, trendVal: "−3",   accent: "#fcd34d", accentBg: "rgba(245,158,11,0.12)",  accentBorder: "rgba(245,158,11,0.2)"  },
  ],
};

const roleAlerts = {
  user: [
    { title: "Tank refill scheduled", detail: "Block 4 reservoir will be topped up at 4:00 PM.", tone: "info"     as const, time: "10 min ago" },
    { title: "Low usage streak",      detail: "Your household usage is below the community average this week.", tone: "warning"  as const, time: "1 hour ago" },
    { title: "Bill reminder",         detail: "KES 240 is pending for the current cycle.", tone: "critical" as const, time: "Today" },
  ],
  admin: [
    { title: "Critical contamination flag", detail: "Tank C TDS rose above safe threshold on the west line.", tone: "critical" as const, time: "4 min ago" },
    { title: "Unusual night flow",          detail: "Block 2 flow stayed active between 2:15 AM and 3:05 AM.", tone: "warning"  as const, time: "22 min ago" },
    { title: "Payment batch cleared",       detail: "8 residents paid successfully via M-Pesa this morning.", tone: "info"     as const, time: "Today" },
  ],
};

const roleStatusBars = {
  user: [
    { label: "Water level",      percent: 74, gradient: "linear-gradient(90deg,#0e9e7f,#3dd4b0)", status: "Normal",    statusColor: "#3dd4b0", statusBg: "rgba(14,158,127,0.12)"  },
    { label: "Water quality",    percent: 92, gradient: "linear-gradient(90deg,#059669,#6ee7b7)", status: "Excellent", statusColor: "#6ee7b7", statusBg: "rgba(16,185,129,0.12)"  },
    { label: "Usage efficiency", percent: 68, gradient: "linear-gradient(90deg,#2563eb,#93c5fd)", status: "Good",      statusColor: "#93c5fd", statusBg: "rgba(59,130,246,0.12)"  },
  ],
  admin: [
    { label: "Tank A", percent: 82, gradient: "linear-gradient(90deg,#0e9e7f,#3dd4b0)", status: "Healthy",  statusColor: "#3dd4b0", statusBg: "rgba(14,158,127,0.12)"  },
    { label: "Tank B", percent: 61, gradient: "linear-gradient(90deg,#d97706,#fcd34d)", status: "Monitor",  statusColor: "#fcd34d", statusBg: "rgba(245,158,11,0.12)"  },
    { label: "Tank C", percent: 24, gradient: "linear-gradient(90deg,#dc2626,#fca5a5)", status: "Critical", statusColor: "#fca5a5", statusBg: "rgba(239,68,68,0.12)"   },
  ],
};

const toneMap = {
  critical: { dot: "#ef4444", pill: "rgba(239,68,68,0.12)",  pillText: "#fca5a5", pillBorder: "rgba(239,68,68,0.2)",  label: "Critical", Icon: AlertTriangle },
  warning:  { dot: "#f59e0b", pill: "rgba(245,158,11,0.12)", pillText: "#fcd34d", pillBorder: "rgba(245,158,11,0.2)", label: "Warning",  Icon: Zap           },
  info:     { dot: "#0e9e7f", pill: "rgba(14,158,127,0.12)", pillText: "#3dd4b0", pillBorder: "rgba(14,158,127,0.2)", label: "Info",     Icon: CheckCircle2  },
};

const borderTone = { critical: "#ef444460", warning: "#f59e0b60", info: "#0e9e7f60" };

export default function DashboardPage() {
  const { role: sessionRole } = useAuth();
  const role: Role = sessionRole === "user" ? "user" : "admin";
  const copy      = roleCopy[role];
  const metrics   = useMemo(() => roleMetrics[role],   [role]);
  const alerts    = useMemo(() => roleAlerts[role],    [role]);
  const statusBars= useMemo(() => roleStatusBars[role],[role]);

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

  return (
    <div className="flex flex-col gap-6 max-w-[1380px]">

      {/* ── Hero banner ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "32px 36px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Glow overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 95% 50%, rgba(14,158,127,0.13) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 60% at 5% 90%, rgba(10,125,100,0.09) 0%, transparent 60%)" }} />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Copy */}
          <div className="max-w-xl">
            <div
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em] uppercase mb-4"
              style={{
                color: "#3dd4b0",
                background: "rgba(14,158,127,0.1)",
                border: "1px solid rgba(14,158,127,0.22)",
                padding: "4px 12px",
                borderRadius: 20,
              }}
            >
              <Sparkles size={12} />
              {copy.eyebrow}
            </div>
            <h1
              className="whitespace-pre-line font-extrabold text-slate-50 mb-3"
              style={{ fontSize: "clamp(26px,3.5vw,42px)", lineHeight: 1.07, letterSpacing: "-0.035em" }}
            >
              {copy.title}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[420px]">{copy.subtitle}</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                padding: "11px 22px",
                background: "linear-gradient(135deg,#0e9e7f 0%,#075c4a 100%)",
                borderRadius: 12,
                boxShadow: "0 4px 18px rgba(14,158,127,0.38)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {copy.action}
              <ArrowUpRight size={15} />
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
              className="group transition-all duration-250 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.032)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: 20,
                animationDelay: `${i * 70}ms`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                cursor: "default",
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {m.label}
                </p>
                <div
                  className="flex items-center justify-center flex-shrink-0 rounded-[10px]"
                  style={{ width: 36, height: 36, background: m.accentBg, border: `1px solid ${m.accentBorder}`, color: m.accent }}
                >
                  <Icon size={15} />
                </div>
              </div>
              <p
                className="font-extrabold text-slate-50 leading-none mb-3"
                style={{ fontSize: "clamp(20px,2.5vw,28px)", letterSpacing: "-0.03em" }}
              >
                {m.value}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">{m.note}</p>
                <span
                  className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-full"
                  style={
                    m.trend === "up"
                      ? { background: "rgba(16,185,129,0.12)", color: "#6ee7b7" }
                      : m.trend === "down"
                      ? { background: "rgba(239,68,68,0.1)",   color: "#fca5a5" }
                      : { background: "rgba(100,116,139,0.12)", color: "#64748b" }
                  }
                >
                  {TrendIcon && <TrendIcon size={10} />}
                  {m.trendVal}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── Bottom split ── */}
      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr] items-start">

        {/* Left — health panel */}
        <div style={panel}>
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Operations</p>
              <h2 className="text-[17px] font-bold text-slate-100" style={{ letterSpacing: "-0.02em" }}>System health snapshot</h2>
            </div>
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold"
              style={{
                color: "#3dd4b0",
                background: "rgba(14,158,127,0.1)",
                border: "1px solid rgba(14,158,127,0.2)",
                padding: "4px 10px",
                borderRadius: 20,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#0e9e7f", boxShadow: "0 0 5px rgba(14,158,127,0.8)" }} />
              Live
            </span>
          </div>

          {/* Progress bars */}
          <div className="space-y-3">
            {statusBars.map((bar) => (
              <div key={bar.label} style={{ ...subCard, padding: 14 }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-200">{bar.label}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: bar.statusBg, color: bar.statusColor }}
                    >
                      {bar.status}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{bar.percent}%</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${bar.percent}%`, background: bar.gradient }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mini info cards */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              {
                icon: Wrench,
                title: "Maintenance queue",
                body: role === "admin"
                  ? "2 sensors need recalibration this week, one valve check is due tomorrow."
                  : "Your home sensors are healthy, no maintenance action required.",
                foot: "Next window: tomorrow 9:00 AM",
              },
              {
                icon: ShieldCheck,
                title: "AI insight",
                body: role === "admin"
                  ? "No leak pattern detected in last 24h. Monitor Tank C contamination closely."
                  : "Household consumption stable. No anomalies detected in last 24h.",
                foot: "Model confidence: 96%",
              },
            ].map((card) => {
              const CardIcon = card.icon;
              return (
                <div key={card.title} style={{ ...subCard, padding: 14 }}>
                  <div className="flex items-center gap-2 mb-2">
                    <CardIcon size={13} className="text-aqua-400 flex-shrink-0" style={{ color: "#1ab896" }} />
                    <span className="text-xs font-semibold text-slate-200">{card.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-2.5">{card.body}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <Clock size={10} />
                    {card.foot}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">

          {/* Alerts */}
          <div style={panel}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Alerts</p>
                <h2 className="text-[17px] font-bold text-slate-100" style={{ letterSpacing: "-0.02em" }}>Recent activity</h2>
              </div>
              <button
                className="flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
                style={{
                  width: 30, height: 30,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                <MoreHorizontal size={14} />
              </button>
            </div>
            <div className="space-y-2.5">
              {alerts.map((alert) => {
                const t = toneMap[alert.tone];
                return (
                  <div
                    key={alert.title}
                    className="transition-colors duration-150"
                    style={{
                      ...subCard,
                      padding: "13px 14px 13px 15px",
                      borderLeft: `2px solid ${borderTone[alert.tone]}`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: t.dot }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-[13px] font-semibold text-slate-200 leading-tight">{alert.title}</h3>
                          <span
                            className="text-[10.5px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ background: t.pill, color: t.pillText, border: `1px solid ${t.pillBorder}` }}
                          >
                            {t.label}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{alert.detail}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock size={10} className="text-slate-600" />
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
                <h2 className="text-[17px] font-bold text-slate-100" style={{ letterSpacing: "-0.02em" }}>Current billing status</h2>
              </div>
              <Banknote size={16} style={{ color: "#1ab896" }} />
            </div>
            <div
              className="mb-4"
              style={{
                background: "rgba(14,158,127,0.06)",
                border: "1px solid rgba(14,158,127,0.14)",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">
                  {role === "admin" ? "Collections this month" : "Amount due"}
                </span>
                <span className="text-[18px] font-extrabold text-white" style={{ letterSpacing: "-0.02em" }}>
                  {role === "admin" ? "KES 82,600" : "KES 240"}
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full w-[72%] rounded-full" style={{ background: "linear-gradient(90deg,#0e9e7f,#3dd4b0)" }} />
              </div>
              <p className="text-xs text-slate-500">
                {role === "admin"
                  ? "72% of monthly target collected via M-Pesa."
                  : "Pay before the due date to avoid service interruption."}
              </p>
            </div>
            <button
              className="flex items-center justify-center gap-1.5 w-full text-[13px] font-semibold transition-all duration-200"
              style={{
                padding: "10px 0",
                color: "#3dd4b0",
                background: "rgba(14,158,127,0.08)",
                border: "1px solid rgba(14,158,127,0.16)",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              {role === "admin" ? "View all transactions" : "Pay now"}
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
