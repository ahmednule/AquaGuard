"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Cpu, Bell, Receipt, Settings,
  ChevronLeft, ChevronRight, Droplets, LogOut,
  TrendingUp, Activity, Wallet, Gauge, ShieldCheck,
} from "lucide-react";

type NavItem = { label: string; href: string; icon: any; badge?: string };

const caretakerNav = [
  {
    group: "Main",
    items: [
      { label: "Overview",  href: "/dashboard",           icon: LayoutDashboard },
      { label: "Sensors",   href: "/dashboard/sensors",   icon: Cpu,         badge: "12" },
      { label: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
      { label: "Activity",  href: "/dashboard/activity",  icon: Activity },
    ] as NavItem[],
  },
  {
    group: "Management",
    items: [
      { label: "Alerts",   href: "/dashboard/alerts",   icon: Bell,     badge: "3" },
      { label: "Billing",  href: "/dashboard/billing",  icon: Receipt },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ] as NavItem[],
  },
];

const userNav = [
  {
    group: "My Home",
    items: [
      { label: "Overview",     href: "/dashboard/user",          icon: LayoutDashboard },
      { label: "Usage",        href: "/dashboard/user/usage",    icon: Gauge },
      { label: "Water quality",href: "/dashboard/user/quality",  icon: ShieldCheck },
    ] as NavItem[],
  },
  {
    group: "Account",
    items: [
      { label: "Alerts",   href: "/dashboard/user/alerts",  icon: Bell,    badge: "1" },
      { label: "Billing",  href: "/dashboard/user/billing", icon: Wallet },
      { label: "Settings", href: "/dashboard/settings",     icon: Settings },
    ] as NavItem[],
  },
];




export default function Sidebar({ role = "caretaker" }: { role?: "caretaker" | "user" }) {
  const navGroups = role === "user" ? userNav : caretakerNav;
  const pathname = usePathname() || "/";
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard" || href === "/dashboard/user")
      return pathname === href || pathname === href + "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      className={`hidden lg:flex flex-col flex-shrink-0 h-screen transition-all duration-300 ease-in-out border-r border-white/[0.06] ${
        collapsed ? "w-[72px]" : "w-[232px]"
      }`}
      style={{ background: "rgba(5,12,30,0.96)" }}
    >
      {/* ── Logo ── */}
      <div
        className={`flex items-center gap-3 h-16 flex-shrink-0 border-b border-white/[0.06] ${
          collapsed ? "justify-center px-0" : "px-5"
        }`}
      >
        <div
          className="flex items-center justify-center flex-shrink-0 rounded-[10px]"
          style={{
            width: 34, height: 34,
            background: "linear-gradient(135deg,rgba(14,158,127,0.22),rgba(14,158,127,0.08))",
            border: "1px solid rgba(14,158,127,0.28)",
          }}
        >
          <Droplets size={17} className="text-aqua-300" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="block text-sm font-bold text-slate-100 tracking-tight leading-tight">
              AquaGuard
            </span>
            <span className="block text-[11px] text-slate-500 font-normal">
              Community Platform
            </span>
          </div>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {navGroups.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-600 px-2 mb-1.5">
                {group.group}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="relative group/nav">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-[9px] text-[13px] font-medium transition-all duration-150 ${
                        collapsed ? "justify-center px-0 py-2" : "px-2.5 py-2"
                      } ${
                        active
                          ? "text-slate-100"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                      style={
                        active
                          ? { background: "rgba(14,158,127,0.12)" }
                          : undefined
                      }
                    >
                      {/* Icon wrap */}
                      <span
                        className={`flex items-center justify-center flex-shrink-0 rounded-[8px] transition-all duration-150 ${
                          collapsed ? "w-8 h-8" : "w-7 h-7"
                        }`}
                        style={
                          active
                            ? { background: "rgba(14,158,127,0.18)", color: "#3dd4b0" }
                            : { color: "currentColor" }
                        }
                      >
                        <Icon size={15} />
                      </span>

                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span
                              className="flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                              style={
                                active
                                  ? { background: "rgba(14,158,127,0.2)", color: "#3dd4b0" }
                                  : { background: "rgba(255,255,255,0.07)", color: "#475569" }
                              }
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>

                    {/* Collapsed tooltip */}
                    {collapsed && (
                      <div
                        className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 z-50 flex items-center gap-2
                          whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-slate-200
                          opacity-0 group-hover/nav:opacity-100 transition-opacity duration-150"
                        style={{
                          background: "#0f1729",
                          border: "1px solid rgba(255,255,255,0.1)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
                        }}
                      >
                        {item.label}
                        {item.badge && (
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                            style={{ background: "rgba(14,158,127,0.2)", color: "#3dd4b0" }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Status card ── */}
      {!collapsed && (
        <div className="px-3 mb-3">
          <div
            className="rounded-[10px] px-3 py-2.5"
            style={{
              background: role === "user" ? "rgba(59,130,246,0.06)" : "rgba(14,158,127,0.06)",
              border: `1px solid ${role === "user" ? "rgba(59,130,246,0.13)" : "rgba(14,158,127,0.13)"}`,
            }}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background: role === "user" ? "#3b82f6" : "#0e9e7f",
                  boxShadow: role === "user" ? "0 0 6px rgba(59,130,246,0.8)" : "0 0 6px rgba(14,158,127,0.8)",
                }}
              />
              <span className="text-[11.5px] font-semibold text-slate-200">
                {role === "user" ? "Sensor active" : "System Online"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
              {role === "user" ? "Block B · Unit 04 · Tank 74%" : "48 homes connected · last sync 2m ago"}
            </p>
          </div>
        </div>
      )}

      {/* ── Divider ── */}
      <div className="border-t border-white/[0.06]" />

      {/* ── User ── */}
      <div className={`flex items-center gap-2.5 px-3 py-3 ${collapsed ? "justify-center" : ""}`}>
        <div
          className="flex items-center justify-center flex-shrink-0 rounded-[8px] text-xs font-bold text-white"
          style={{
            width: 30, height: 30,
            background: role === "user"
              ? "linear-gradient(135deg,#2563eb,#1e40af)"
              : "linear-gradient(135deg,#0e9e7f,#075c4a)",
          }}
        >
          {role === "user" ? "J" : "C"}
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {role === "user" ? "Jane Wanjiku" : "Caretaker"}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {role === "user" ? "resident@aquaguard.io" : "admin@aquaguard.io"}
              </p>
            </div>
            <button
              className="flex items-center justify-center rounded-[7px] text-slate-500 hover:text-slate-300 hover:bg-white/[0.06] transition-colors"
              style={{ width: 28, height: 28 }}
              title="Sign out"
            >
              <LogOut size={13} />
            </button>
          </>
        )}
      </div>

      {/* ── Collapse toggle ── */}
      <div className="border-t border-white/[0.06]" />
      <div className={`flex py-2.5 px-3 ${collapsed ? "justify-center" : "justify-end"}`}>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="flex items-center justify-center rounded-[7px] text-slate-500 hover:text-slate-300 transition-colors"
          style={{
            width: 28, height: 28,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </aside>
  );
}
