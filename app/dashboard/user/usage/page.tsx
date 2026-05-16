"use client";

import { useState } from "react";
import { Gauge, Droplets, TrendingDown, Calendar, BarChart3, AlertCircle, ArrowDown } from "lucide-react";

const periods = ["7 days", "30 days", "This year"] as const;
type Period = (typeof periods)[number];

const dailyUsage = [290, 340, 280, 410, 360, 300, 320];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxBar = Math.max(...dailyUsage);

const panel = {
  background: "rgba(255,255,255,0.032)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 18,
  padding: 24,
};

export default function UserUsagePage() {
  const [period, setPeriod] = useState<Period>("7 days");

  return (
    <div className="flex flex-col gap-6 max-w-[1380px]">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">My Home</p>
          <h1 className="font-extrabold text-slate-50" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em" }}>
            Water Usage
          </h1>
          <p className="text-sm text-slate-500 mt-1">Detailed breakdown of your household water consumption</p>
        </div>
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
                  ? { background: "rgba(37,99,235,0.85)", color: "#fff" } // Blue accent
                  : { color: "#475569" }
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div style={panel} className="flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", color: "#93c5fd" }}>
              <Droplets size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Consumed</p>
              <p className="text-2xl font-bold text-white">2,300 L</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-medium">
              <TrendingDown size={12} /> 12%
            </span>
            <span className="text-slate-500">vs last week</span>
          </div>
        </div>

        <div style={panel} className="flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.2)", color: "#d8b4fe" }}>
              <Gauge size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Daily Average</p>
              <p className="text-2xl font-bold text-white">328 L</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-medium">
              <ArrowDown size={12} /> 42 L
            </span>
            <span className="text-slate-500">below community avg</span>
          </div>
        </div>

        <div style={panel} className="flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)", color: "#6ee7b7" }}>
              <AlertCircle size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Leak Detection</p>
              <p className="text-xl font-bold text-emerald-400">No Leaks Detected</p>
            </div>
          </div>
          <p className="text-xs text-slate-500">Continuous flow monitored normally.</p>
        </div>
      </div>

      {/* Main Chart */}
      <div style={panel}>
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Trends</p>
            <h2 className="text-[17px] font-bold text-slate-100" style={{ letterSpacing: "-0.02em" }}>Consumption History</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "#93c5fd", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", padding: "4px 10px", borderRadius: 20 }}>
            <Calendar size={12} />
            {period}
          </div>
        </div>

        <div className="flex items-end gap-3 h-64 mt-4">
          {dailyUsage.map((val, i) => {
            const pct = (val / maxBar) * 100;
            const isToday = i === dailyUsage.length - 1;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar">
                <span className="text-xs text-slate-500 font-mono opacity-0 group-hover/bar:opacity-100 transition-opacity">{val}</span>
                <div
                  className="w-full max-w-[60px] rounded-t-lg transition-all duration-500 relative"
                  style={{
                    height: `${pct}%`,
                    background: isToday ? "linear-gradient(180deg,#93c5fd,#2563eb)" : "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-200 text-xs px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10 z-10">
                    {val} Liters
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium">{weekDays[i]}</span>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-white/5">
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded bg-blue-500" />
             <span className="text-xs text-slate-400">Selected Day</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded bg-white/10 border border-white/10" />
             <span className="text-xs text-slate-400">Previous Days</span>
           </div>
        </div>
      </div>
    </div>
  );
}
