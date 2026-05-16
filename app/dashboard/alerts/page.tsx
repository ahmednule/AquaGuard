"use client";

import { useState } from "react";
import { BadgeAlert, Clock, ExternalLink, Flag, Wrench } from "lucide-react";

const sampleAlerts = [
  { id: 1, title: "Critical contamination flag", desc: "Tank C TDS above threshold.", severity: "critical", time: "4m" },
  { id: 2, title: "Unusual night flow", desc: "Sustained flow detected 02:10-03:05.", severity: "warning", time: "22m" },
  { id: 3, title: "Payment batch cleared", desc: "8 residents paid successfully.", severity: "info", time: "Today" },
];

export default function AlertsPage() {
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");

  const visible = sampleAlerts.filter((a) => filter === "all" || a.severity === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Alerts</p>
          <h1 className="text-2xl font-bold text-white">Incidents & notifications</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-2xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5">Mark all read</button>
          <button className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold">
            Create alert
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      <div className="glass-strong rounded-2xl border border-white/10 p-4">
        <div className="flex items-center gap-2 mb-4">
          <BadgeAlert size={16} className="text-aqua-300" />
          <div className="text-sm text-slate-400">Filter</div>
          <div className="ml-3 inline-flex rounded-full border border-white/8 bg-white/4 p-1">
            {(["all", "critical", "warning", "info"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs rounded-full ${filter === f ? "bg-aqua-500 text-white" : "text-slate-300 hover:text-white"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {visible.map((a) => (
            <div key={a.id} className="rounded-xl border border-white/6 p-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold text-white">{a.title}</div>
                  <div className="text-xs text-slate-500">{a.time}</div>
                </div>
                <p className="text-sm text-slate-400 mt-2">{a.desc}</p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="text-xs text-slate-300 rounded-md px-3 py-1 border border-white/8 hover:bg-white/5">Acknowledge</button>
                  <button className="text-xs text-slate-300 rounded-md px-3 py-1 border border-white/8 hover:bg-white/5">Assign</button>
                </div>
              </div>
              <div className="text-slate-400">
                {a.severity === "critical" ? <Flag className="text-red-400" /> : a.severity === "warning" ? <Wrench /> : <Clock />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
