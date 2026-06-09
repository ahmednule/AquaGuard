import Sidebar from "@/components/dashboard/Sidebar";
import { AuthGate } from "@/lib/apollo-auth";

export const metadata = {
  title: "AquaGuard — My Home",
  description: "Your household water usage, quality, billing and alerts.",
};

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate allowedRoles={["user"]} redirectTo="/dashboard">
      <div className="flex h-screen overflow-hidden" style={{ background: "#020817" }}>
      {/* Ambient blobs */}
      <div
        className="fixed pointer-events-none"
        style={{
          width: 500, height: 500,
          top: -160, left: 80,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          width: 380, height: 380,
          bottom: -100, right: 140,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,158,127,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <Sidebar role="user" />

      <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
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
              className="w-2 h-2 rounded-full"
              style={{ background: "#0e9e7f", boxShadow: "0 0 7px rgba(14,158,127,0.9)" }}
            />
            <span className="text-xs text-slate-500 font-medium">Live · Synced just now</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600 font-medium hidden sm:block">
              Block B · Unit 04
            </span>
            <div
              className="flex items-center justify-center rounded-[8px] text-xs font-bold text-white cursor-pointer"
              style={{ width: 30, height: 30, background: "linear-gradient(135deg,#2563eb,#1e40af)" }}
            >
              J
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-7">
          {children}
        </main>
      </div>
    </AuthGate>
  );
}
