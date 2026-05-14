"use client";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const openAuth = (mode: "login" | "signup") => {
    window.dispatchEvent(new CustomEvent("aquaguard:auth", { detail: { mode } }));
  };

  return (
    <section id="cta" className="py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-strong rounded-3xl p-12 md:p-16 border border-aqua-500/20 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-aqua-500/5 via-transparent to-transparent" />

          <div className="relative">
            <span className="inline-block text-xs font-semibold text-aqua-400 tracking-widest uppercase font-mono mb-6">
              Ready to protect your community?
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Clean water, tracked
              <br />
              <span className="text-gradient">intelligently.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Set up AquaGuard on any shared tank in under an hour. Start monitoring water
              quality, preventing theft, and billing fairly — today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openAuth("signup")}
                className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-2xl"
              >
                Create free account
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => openAuth("login")}
                className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-slate-300 glass rounded-2xl border border-white/10 hover:border-aqua-500/40 transition-all"
              >
                Sign in to dashboard
              </button>
            </div>

            {/* Trust note */}
            <p className="text-xs text-slate-600 mt-8">
              BIT1210 Physics for Computing · Mount Kenya University · Group Project 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
