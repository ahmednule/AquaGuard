"use client";

import { ShieldCheck, Activity, AlertTriangle, Droplet, CheckCircle2, Info } from "lucide-react";

const panel = {
  background: "rgba(255,255,255,0.032)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 18,
  padding: 24,
};

const parameters = [
  { name: "pH Level", value: "7.2", ideal: "6.5 - 8.5", status: "Optimal", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  { name: "TDS (Total Dissolved Solids)", value: "182 ppm", ideal: "< 300 ppm", status: "Excellent", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  { name: "Turbidity", value: "0.8 NTU", ideal: "< 1.0 NTU", status: "Good", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  { name: "Residual Chlorine", value: "0.4 mg/L", ideal: "0.2 - 0.5 mg/L", status: "Optimal", color: "#14b8a6", bg: "rgba(20,184,166,0.12)" },
];

export default function UserQualityPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1380px]">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">My Home</p>
          <h1 className="font-extrabold text-slate-50" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em" }}>
            Water Quality
          </h1>
          <p className="text-sm text-slate-500 mt-1">Real-time purity metrics from your block's supply</p>
        </div>
      </div>

      {/* Main Status */}
      <div style={panel} className="relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="w-32 h-32 rounded-full flex flex-shrink-0 items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-emerald-400 border-t-transparent animate-[spin_3s_linear_infinite]" />
          <ShieldCheck size={48} className="text-emerald-400 relative z-10" />
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 size={14} /> Safe for consumption
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Water Quality is Excellent</h2>
          <p className="text-slate-400 text-sm max-w-lg">
            All measured parameters are within World Health Organization (WHO) and local guidelines. The water is perfectly safe for drinking and household use.
          </p>
        </div>
      </div>

      {/* Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parameters.map((param) => (
          <div key={param.name} style={panel} className="flex items-center gap-5 hover:bg-white/[0.04] transition-colors">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: param.bg, color: param.color }}>
              <Droplet size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-medium text-slate-300">{param.name}</p>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: param.bg, color: param.color }}>
                  {param.status}
                </span>
              </div>
              <div className="flex items-end gap-3 mt-2">
                <p className="text-2xl font-bold text-white leading-none">{param.value}</p>
                <p className="text-xs text-slate-500 pb-0.5">Ideal: {param.ideal}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Information Banner */}
      <div className="flex items-start gap-4 p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
        <Info size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-blue-100 mb-1">How do we measure this?</h3>
          <p className="text-xs text-blue-200/70 leading-relaxed">
            Measurements are taken continuously by smart sensors installed at the main reservoir for Block B. Data is refreshed every 5 minutes. If any parameter falls outside safe limits, you will be notified immediately and the admin team will be dispatched.
          </p>
        </div>
      </div>
    </div>
  );
}
