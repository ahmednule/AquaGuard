"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Droplets,
  Zap,
  BarChart3,
  ArrowUpRight,
  Calendar,
  Download,
} from "lucide-react";

const periods = ["7 days", "30 days", "90 days"] as const;
type Period = (typeof periods)[number];

const weeklyUsage = [320, 285, 410, 365, 290, 440, 320];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const blockData = [
  { block: "Block A", usage: 2840, residents: 12, pct: 28, color: "#3dd4b0" },
  { block: "Block B", usage: 2210, residents: 10, pct: 22, color: "#1ab896" },
  { block: "Block C", usage: 1950, residents: 9,  pct: 19, color: "#fcd34d" },
  { block: "Block D", usage: 1680, residents: 8,  pct: 17, color: "#93c5fd" },
  { block: "Block E", usage: 1440, residents: 7,  pct: 14, color: "#f87171" },
];

const kpis = [
  { label: "Total usage this week", value: "10,120 L", trend: "up",   trendVal: "+4.2%",  sub: "vs last week",     icon: Droplets   },
  { label: "Peak daily usage",      value: "440 L",    trend: "down",  trendVal: "−8.1%",  sub: "lower than last",  icon: TrendingUp },
  { label: "Avg per household",     value: "211 L",    trend: "up",    trendVal: "+1.9%",  sub: "48 active homes",  icon: BarChart3  },
  { label: "Efficiency score",      value: "78 / 100", trend: "up",    trendVal: "+3 pts", sub: "community average", icon: Zap        },
];

const panel = {
  background: "rgba(255,255,255,0.032)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 18,
  padding: 24,
};

const maxBar = Math.max(...weeklyUsage);

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("7 days");

  return (
    <div className="flex flex-col gap-6 max-w-[1380px]">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Analytics</p>
          <h1
            className="font-extrabold text-slate-50"
            style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em" }}
          >
            Water usage analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">Community-wide consumption trends and block breakdowns</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Period switcher */}
          <div
            className="hidden sm:inline-flex p-1 gap-0.5"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }}
          >
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-3 py-1.5 text-[12px] font-semibold rounded-[8px] transition-all duration-200"
                style={
                  period === p
                    ? { background: "rgba(14,158,127,0.85)", color: "#fff" }
                    : { color: "#475569" }
                }
              >
                {p}
              </button>
            ))}
          </div>
          <button
            className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
            style={{
              padding: "8px 14px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              color: "#64748b",
              cursor: "pointer",
            }}
          >
            <Download size={13} />
            Export
          </button>
        </div>
      </div>

      {/* KPI row */}
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="transition-all duration-250 hover:-translate-y-0.5"
              style={{ ...panel, padding: 20 }}
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">{k.label}</p>
                <div
                  className="flex items-center justify-center rounded-[10px]"
                  style={{ width: 34, height: 34, background: "rgba(14,158,127,0.12)", border: "1px solid rgba(14,158,127,0.2)", color: "#3dd4b0" }}
                >
                  <Icon size={14} />
                </div>
              </div>
              <p className="text-[26px] font-extrabold text-slate-50 leading-none mb-2" style={{ letterSpacing: "-0.03em" }}>
                {k.value}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded-full"
                  style={
                    k.trend === "up"
                      ? { background: "rgba(16,185,129,0.12)", color: "#6ee7b7" }
                      : { background: "rgba(239,68,68,0.1)", color: "#fca5a5" }
                  }
                >
                  {k.trend === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {k.trendVal}
                </span>
                <span className="text-[11px] text-slate-600">{k.sub}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Charts row */}
      <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr] items-start">

        {/* Bar chart — daily usage */}
        <div style={panel}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Usage trend</p>
              <h2 className="text-[17px] font-bold text-slate-100" style={{ letterSpacing: "-0.02em" }}>Daily water consumption</h2>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Calendar size={12} />
              Last 7 days
            </div>
          </div>

          {/* Bars */}
          <div className="flex items-end gap-3 h-44">
            {weeklyUsage.map((val, i) => {
              const pct = (val / maxBar) * 100;
              const isToday = i === weeklyUsage.length - 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">{val}</span>
                  <div className="w-full rounded-t-[6px] transition-all duration-500 relative group/bar" style={{ height: `${pct}%`, background: isToday ? "linear-gradient(180deg,#3dd4b0,#0e9e7f)" : "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-200 text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                      {val} L
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">{weekDays[i]}</span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: "linear-gradient(135deg,#3dd4b0,#0e9e7f)" }} />
              <span className="text-xs text-slate-500">Today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.05)" }} />
              <span className="text-xs text-slate-500">Previous days</span>
            </div>
          </div>
        </div>

        {/* Block distribution */}
        <div style={panel}>
          <div className="mb-6">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Distribution</p>
            <h2 className="text-[17px] font-bold text-slate-100" style={{ letterSpacing: "-0.02em" }}>Usage by block</h2>
          </div>

          <div className="space-y-3">
            {blockData.map((b) => (
              <div key={b.block}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: b.color }} />
                    <span className="text-sm font-medium text-slate-200">{b.block}</span>
                    <span className="text-[11px] text-slate-600">· {b.residents} homes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{b.usage.toLocaleString()} L</span>
                    <span className="text-[10.5px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "#64748b" }}>
                      {b.pct}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${b.pct}%`, background: b.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            className="flex items-center justify-center gap-1.5 w-full mt-5 text-[12.5px] font-semibold transition-all"
            style={{
              padding: "9px 0",
              color: "#3dd4b0",
              background: "rgba(14,158,127,0.07)",
              border: "1px solid rgba(14,158,127,0.15)",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            View full report <ArrowUpRight size={13} />
          </button>
        </div>
      </section>
    </div>
  );
}
