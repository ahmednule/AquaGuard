"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { AuthGate, useAuth } from "@/lib/apollo-auth";

function AdminDashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const { role } = useAuth();

  useEffect(() => {
    if (role === "user" && !pathname.startsWith("/dashboard/user")) {
      router.replace("/dashboard/user");
    }
  }, [pathname, role, router]);

  if (pathname.startsWith("/dashboard/user")) {
    return <>{children}</>;
  }

  if (role === "user") {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#020817" }}>
      <div
        className="fixed pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: -200,
          left: 60,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,158,127,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          width: 400,
          height: 400,
          bottom: -100,
          right: 180,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,158,127,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <Sidebar role="admin" />

      <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
        <header
          className="flex-shrink-0 flex items-center justify-between px-7"
          style={{
            height: 56,
            background: "rgba(2,8,23,0.85)",
            borderBottom: "1px solid rgba(255,255,255,0.055)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: "#0e9e7f", boxShadow: "0 0 7px rgba(14,158,127,0.9)" }}
            />
            <span className="text-xs text-slate-500 font-medium">Live · Refreshed just now</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600 font-medium hidden sm:block">
              {new Date().toLocaleDateString("en-KE", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <div
              className="flex items-center justify-center rounded-[8px] text-xs font-bold text-white cursor-pointer"
              style={{ width: 30, height: 30, background: "linear-gradient(135deg,#0e9e7f,#075c4a)" }}
            >
              A
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-7">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate allowedRoles={["admin", "user"]}>
      <AdminDashboardShell>{children}</AdminDashboardShell>
    </AuthGate>
  );
}