"use client";

import { useState } from "react";
import { Bell, CreditCard, Droplets, Zap, Clock, Info, AlertTriangle, CheckCircle2 } from "lucide-react";

type AlertTone = "info" | "warning" | "critical" | "success";

const userAlerts = [
  { id: 1, title: "Bill reminder", detail: "KES 240 pending for current cycle — due in 4 days.", tone: "critical" as AlertTone, time: "Today, 09:00 AM", icon: CreditCard },
  { id: 2, title: "Low usage streak", detail: "Your household usage is 15% below community average this week. Great job conserving water!", tone: "success" as AlertTone, time: "Yesterday, 06:00 PM", icon: Droplets },
  { id: 3, title: "Tank refill scheduled", detail: "Block B reservoir topped up. Pressure might fluctuate slightly for 10 minutes.", tone: "info" as AlertTone, time: "Yesterday, 04:00 PM", icon: Info },
  { id: 4, title: "Maintenance complete", detail: "Routine sensor recalibration in your block finished successfully.", tone: "info" as AlertTone, time: "May 14, 02:30 PM", icon: CheckCircle2 },
  { id: 5, title: "Unusual flow warning", detail: "Minor continuous flow detected on May 12 at 2 AM. Suspected dripping tap.", tone: "warning" as AlertTone, time: "May 12, 08:00 AM", icon: Zap },
  { id: 6, title: "Payment received", detail: "Thank you! KES 210 received for April 2026 cycle.", tone: "success" as AlertTone, time: "May 02, 11:15 AM", icon: CreditCard },
];

const toneStyles: Record<AlertTone, { bg: string; border: string; text: string }> = {
  success:  { bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.2)",  text: "#4ade80" },
  info:     { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.2)", text: "#60a5fa" },
  warning:  { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.2)", text: "#fbbf24" },
  critical: { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.2)",  text: "#f87171" },
};

const panel = {
  background: "rgba(255,255,255,0.032)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 18,
  padding: 24,
};

export default function UserAlertsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[900px] mx-auto">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Account</p>
        <h1 className="font-extrabold text-slate-50" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em" }}>
          Alerts & Notifications
        </h1>
        <p className="text-sm text-slate-500 mt-1">Updates regarding your usage, billing, and community announcements</p>
      </div>

      <div style={panel}>
        <div className="space-y-4">
          {userAlerts.map((alert) => {
            const t = toneStyles[alert.tone];
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className="flex gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mt-1"
                  style={{ background: t.bg, border: `1px solid ${t.border}`, color: t.text }}
                >
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-sm font-bold text-slate-200">{alert.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={12} />
                      {alert.time}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{alert.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
