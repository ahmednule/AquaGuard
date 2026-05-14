import Link from "next/link";
import { Droplets, LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-3xl bg-aqua-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-aqua-500/30">
          <Droplets size={36} className="text-white" />
        </div>
        <h1
          className="text-4xl font-black text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Dashboard
        </h1>
        <p className="text-slate-400 mb-3">
          You're authenticated! This is where the AquaGuard real-time monitoring
          dashboard will live.
        </p>
        <p className="text-sm text-slate-600 mb-10">
          Use the Vibe Prompt Agent to generate each dashboard module with Claude AI.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-300 glass rounded-2xl border border-white/10 hover:border-aqua-500/40 transition-all"
        >
          ← Back to landing page
        </Link>
      </div>
    </main>
  );
}
