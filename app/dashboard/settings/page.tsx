"use client";

import { useState } from "react";
import {
  Bell,
  ChevronRight,
  Globe,
  Moon,
  Save,
  Settings,
  Shield,
  Smartphone,
  User,
} from "lucide-react";
import { CREDENTIALS } from "@/lib/auth";

const panel = { background: "rgba(255,255,255,0.032)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: 24 };
const subCard = { background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", borderRadius: 12, padding: "14px 16px" };

const tabs = [
  { key: "profile",       label: "Profile",        icon: User      },
  { key: "notifications", label: "Notifications",  icon: Bell      },
  { key: "security",      label: "Security",        icon: Shield    },
  { key: "appearance",    label: "Appearance",      icon: Moon      },
  { key: "integrations",  label: "Integrations",    icon: Smartphone},
] as const;
type Tab = (typeof tabs)[number]["key"];

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="flex-shrink-0 transition-all duration-200"
      style={{
        width: 40, height: 22, borderRadius: 11,
        background: on ? "rgba(14,158,127,0.85)" : "rgba(255,255,255,0.1)",
        border: on ? "1px solid rgba(14,158,127,0.4)" : "1px solid rgba(255,255,255,0.1)",
        position: "relative", cursor: "pointer",
      }}
    >
      <span
        className="absolute top-[3px] transition-all duration-200"
        style={{
          width: 16, height: 16, borderRadius: "50%",
          background: "#fff",
          left: on ? 21 : 3,
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}

function SettingRow({ label, sub, children }: { label: string; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4" style={subCard}>
      <div>
        <p className="text-sm font-medium text-slate-200">{label}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");
  const role = "caretaker";
  const creds = CREDENTIALS[role];
  const isUser = false;

  return (
    <div className="flex flex-col gap-6 max-w-[1380px]">

      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Settings</p>
        <h1 className="font-extrabold text-slate-50" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em" }}>
          Account & preferences
        </h1>
        <p className="text-sm text-slate-500 mt-1">Manage your profile, notifications, and platform settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* Sidebar nav */}
        <div className="lg:w-[200px] flex-shrink-0" style={panel}>
          <ul className="space-y-0.5">
            {tabs.map(({ key, label, icon: Icon }) => (
              <li key={key}>
                <button
                  onClick={() => setTab(key)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[9px] text-[13px] font-medium text-left transition-all duration-150"
                  style={
                    tab === key
                      ? { background: "rgba(14,158,127,0.12)", color: "#e2e8f0" }
                      : { color: "#475569" }
                  }
                >
                  <Icon size={14} style={tab === key ? { color: "#3dd4b0" } : {}} />
                  {label}
                  {tab === key && <ChevronRight size={12} className="ml-auto" style={{ color: "#3dd4b0" }} />}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0" style={panel}>

          {/* Profile */}
          {tab === "profile" && (
            <div className="space-y-4">
              <h2 className="text-[16px] font-bold text-slate-100 mb-5" style={{ letterSpacing: "-0.02em" }}>Profile information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex items-center justify-center rounded-[14px] text-xl font-bold text-white"
                  style={{
                    width: 56, height: 56,
                    background: isUser ? "linear-gradient(135deg,#2563eb,#1e40af)" : "linear-gradient(135deg,#0e9e7f,#075c4a)"
                  }}
                >
                  {creds.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{creds.name}</p>
                  <p className="text-xs text-slate-500">{creds.email}</p>
                  <button className="text-[11.5px] font-semibold mt-1" style={{ color: isUser ? "#60a5fa" : "#3dd4b0" }}>Change photo</button>
                </div>
              </div>

              {[
                { label: "Full name",    placeholder: creds.name     },
                { label: "Email",        placeholder: creds.email  },
                { label: "Phone",        placeholder: "+254 700 000 000"    },
                { label: "Community ID", placeholder: isUser ? "Block B, Unit 04" : "COMM-NAIROBI-001"    },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-[0.08em]">{f.label}</label>
                  <input
                    defaultValue={f.placeholder}
                    className="w-full text-sm text-slate-200 rounded-[10px] px-3.5 py-2.5 outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={(e) => (e.target.style.borderColor = "#0e9e7f")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>
              ))}

              <button
                className="flex items-center gap-2 text-[13px] font-bold text-white mt-2 transition-all hover:opacity-90"
                style={{
                  padding: "10px 20px",
                  background: isUser ? "linear-gradient(135deg,#2563eb,#1e40af)" : "linear-gradient(135deg,#0e9e7f,#075c4a)",
                  borderRadius: 10, border: "none", cursor: "pointer",
                  boxShadow: isUser ? "0 4px 16px rgba(37,99,235,0.3)" : "0 4px 16px rgba(14,158,127,0.3)"
                }}
              >
                <Save size={14} /> Save changes
              </button>
            </div>
          )}

          {/* Notifications */}
          {tab === "notifications" && (
            <div className="space-y-3">
              <h2 className="text-[16px] font-bold text-slate-100 mb-5" style={{ letterSpacing: "-0.02em" }}>Notification preferences</h2>
              <SettingRow label="Critical alerts" sub="Contamination & sensor failures"><Toggle defaultOn /></SettingRow>
              <SettingRow label="Leak warnings" sub="Unusual night-time flow detected"><Toggle defaultOn /></SettingRow>
              <SettingRow label="Payment receipts" sub="M-Pesa transaction confirmations"><Toggle defaultOn /></SettingRow>
              <SettingRow label="Daily digest" sub="Morning summary of system status"><Toggle /></SettingRow>
              <SettingRow label="Maintenance reminders" sub="Sensor recalibration due dates"><Toggle defaultOn /></SettingRow>
              <SettingRow label="SMS notifications" sub="Receive alerts via text message"><Toggle /></SettingRow>
            </div>
          )}

          {/* Security */}
          {tab === "security" && (
            <div className="space-y-4">
              <h2 className="text-[16px] font-bold text-slate-100 mb-5" style={{ letterSpacing: "-0.02em" }}>Security settings</h2>
              <SettingRow label="Two-factor authentication" sub="Add an extra layer of account security"><Toggle /></SettingRow>
              <SettingRow label="Login notifications" sub="Get notified of new sign-ins"><Toggle defaultOn /></SettingRow>
              <SettingRow label="Session timeout" sub="Auto-logout after 30 minutes of inactivity"><Toggle defaultOn /></SettingRow>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-[0.08em]">Current password</label>
                <input type="password" placeholder="••••••••" className="w-full text-sm text-slate-200 rounded-[10px] px-3.5 py-2.5 outline-none mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-[0.08em]">New password</label>
                <input type="password" placeholder="••••••••" className="w-full text-sm text-slate-200 rounded-[10px] px-3.5 py-2.5 outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
              <button
                className="flex items-center gap-2 text-[13px] font-bold text-white mt-1 hover:opacity-90"
                style={{
                  padding: "10px 20px",
                  background: isUser ? "linear-gradient(135deg,#2563eb,#1e40af)" : "linear-gradient(135deg,#0e9e7f,#075c4a)",
                  borderRadius: 10, border: "none", cursor: "pointer"
                }}
              >
                <Save size={14} /> Update password
              </button>
            </div>
          )}

          {/* Appearance */}
          {tab === "appearance" && (
            <div className="space-y-3">
              <h2 className="text-[16px] font-bold text-slate-100 mb-5" style={{ letterSpacing: "-0.02em" }}>Appearance</h2>
              <SettingRow label="Dark mode" sub="Currently active — optimized for low light"><Toggle defaultOn /></SettingRow>
              <SettingRow label="Compact mode" sub="Reduce spacing and show more data per screen"><Toggle /></SettingRow>
              <SettingRow label="Animated charts" sub="Enable smooth transitions on data updates"><Toggle defaultOn /></SettingRow>
              <SettingRow label="High contrast" sub="Improve readability for accessibility"><Toggle /></SettingRow>

              <div className="pt-2">
                <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-[0.08em]">Accent color</p>
                <div className="flex gap-3">
                  {["#0e9e7f","#3b82f6","#8b5cf6","#f59e0b","#ef4444"].map((c) => (
                    <button key={c} className="w-7 h-7 rounded-full transition-transform hover:scale-110" style={{ background: c, border: c === "#0e9e7f" ? "2px solid #fff" : "2px solid transparent", cursor: "pointer" }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Integrations */}
          {tab === "integrations" && (
            <div className="space-y-3">
              <h2 className="text-[16px] font-bold text-slate-100 mb-5" style={{ letterSpacing: "-0.02em" }}>Integrations</h2>
              {[
                { name: "M-Pesa",       sub: "Mobile payments connected",   active: true  },
                { name: "WhatsApp API", sub: "Broadcast alerts to residents",active: true  },
                { name: "Google Sheets",sub: "Sync usage data to sheets",    active: false },
                { name: "Twilio SMS",   sub: "SMS alert delivery",           active: false },
              ].map((int) => (
                <div key={int.name} className="flex items-center justify-between gap-4" style={subCard}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-[8px]" style={{ width: 34, height: 34, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Globe size={14} style={{ color: "#64748b" }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{int.name}</p>
                      <p className="text-xs text-slate-500">{int.sub}</p>
                    </div>
                  </div>
                  <Toggle defaultOn={int.active} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
