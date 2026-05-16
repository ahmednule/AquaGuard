"use client";

import { useState } from "react";
import {
  Activity, Droplets, Bell, ShieldCheck, Wrench,
  CreditCard, Wifi, WifiOff, Filter, RefreshCw, Clock,
} from "lucide-react";

type EventTone = "info" | "success" | "warning" | "critical";
type Cat = "all" | "sensors" | "alerts" | "billing" | "system";

const events = [
  { id: 1,  time: "Just now",   title: "Sensor ping received",        detail: "All 48 online sensors responded within 200ms.",         tone: "success"  as EventTone, icon: Wifi,        category: "sensors" },
  { id: 2,  time: "4 min ago",  title: "Critical contamination flag", detail: "Tank C TDS rose above 250ppm safe threshold.",          tone: "critical" as EventTone, icon: Bell,        category: "alerts"  },
  { id: 3,  time: "12 min ago", title: "M-Pesa payment received",     detail: "KES 1,200 from household B-04 — processed.",           tone: "success"  as EventTone, icon: CreditCard,  category: "billing" },
  { id: 4,  time: "22 min ago", title: "Unusual night flow detected",  detail: "Block 2 flow stayed active 2:15 AM – 3:05 AM.",        tone: "warning"  as EventTone, icon: Droplets,    category: "sensors" },
  { id: 5,  time: "1 hr ago",   title: "Valve D-12 auto-closed",      detail: "Valve triggered after sustained high-pressure reading.", tone: "info"     as EventTone, icon: Wrench,      category: "system"  },
  { id: 6,  time: "2 hrs ago",  title: "Sensor recalibrated",         detail: "Flow meter F-03 recalibrated by Technician #2.",        tone: "info"     as EventTone, icon: ShieldCheck, category: "sensors" },
  { id: 7,  time: "3 hrs ago",  title: "Batch payment cleared",       detail: "8 residents paid via M-Pesa — KES 9,600 total.",       tone: "success"  as EventTone, icon: CreditCard,  category: "billing" },
  { id: 8,  time: "5 hrs ago",  title: "Sensor offline — A-07",       detail: "Sensor A-07 offline. Auto-reconnect pending.",         tone: "critical" as EventTone, icon: WifiOff,     category: "sensors" },
  { id: 9,  time: "Yesterday",  title: "Daily report generated",      detail: "Automated report for 2026-05-15 sent to admin.",       tone: "info"     as EventTone, icon: Activity,    category: "system"  },
  { id: 10, time: "Yesterday",  title: "Low pressure alert — Block E", detail: "Pressure dropped below 1.2 bar for >30 minutes.",     tone: "warning"  as EventTone, icon: Bell,        category: "alerts"  },
];

const toneStyles: Record<EventTone, { bg: string; border: string; text: string; badge: string }> = {
  success:  { bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.18)",  text: "#86efac", badge: "rgba(34,197,94,0.12)"  },
  info:     { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.18)", text: "#93c5fd", badge: "rgba(59,130,246,0.12)" },
  warning:  { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.18)", text: "#fcd34d", badge: "rgba(245,158,11,0.12)" },
  critical: { bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.18)",  text: "#fca5a5", badge: "rgba(239,68,68,0.12)"  },
};

const categories: { key: Cat; label: string }[] = [
  { key: "all",     label: "All"     },
  { key: "sensors", label: "Sensors" },
  { key: "alerts",  label: "Alerts"  },
  { key: "billing", label: "Billing" },
  { key: "system",  label: "System"  },
];

const panel = { background: "rgba(255,255,255,0.032)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: 24 };

export default function ActivityPage() {
  const [filter, setFilter] = useState<Cat>("all");
  const filtered = filter === "all" ? events : events.filter((e) => e.category === filter);

  return (
    <div className="flex flex-col gap-6 max-w-[1380px]">

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Activity</p>
          <h1 className="font-extrabold text-slate-50" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em" }}>
            System activity log
          </h1>
          <p className="text-sm text-slate-500 mt-1">Real-time feed of all system events, alerts, and transactions</p>
        </div>
        <button
          className="flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ padding: "8px 14px", background: "rgba(14,158,127,0.08)", border: "1px solid rgba(14,158,127,0.16)", borderRadius: 10, color: "#3dd4b0", cursor: "pointer" }}
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={13} style={{ color: "#475569" }} />
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className="text-[12px] font-semibold px-3 py-1.5 rounded-full transition-all duration-200"
            style={
              filter === key
                ? { background: "rgba(14,158,127,0.85)", color: "#fff" }
                : { background: "rgba(255,255,255,0.05)", color: "#475569", border: "1px solid rgba(255,255,255,0.07)" }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div style={panel}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[16px] font-bold text-slate-100" style={{ letterSpacing: "-0.02em" }}>{filtered.length} events</h2>
          <span className="text-[11px] text-slate-600">Newest first</span>
        </div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.05)" }} />

          <div className="space-y-4">
            {filtered.map((ev) => {
              const t = toneStyles[ev.tone];
              const Icon = ev.icon;
              return (
                <div key={ev.id} className="relative flex gap-4">
                  <div
                    className="relative z-10 flex items-center justify-center flex-shrink-0 rounded-full"
                    style={{ width: 38, height: 38, background: t.bg, border: `1px solid ${t.border}`, color: t.text }}
                  >
                    <Icon size={14} />
                  </div>
                  <div
                    className="flex-1 rounded-[12px] p-3.5"
                    style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-[13px] font-semibold text-slate-200">{ev.title}</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize" style={{ background: t.badge, color: t.text }}>
                            {ev.tone}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{ev.detail}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 text-slate-600">
                        <Clock size={10} />
                        <span className="text-[11px]">{ev.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12" style={{ color: "#334155" }}>
              <Activity size={28} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No events in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
