"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Shield, Wifi, Zap } from "lucide-react";

// Simulated live sensor values for the hero preview card
const useLiveSensorFaker = () => {
  const [values, setValues] = useState({
    level: 74,
    tds: 182,
    flow: 2.4,
    sound: 38,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setValues((v) => ({
        level: Math.max(10, Math.min(100, v.level + (Math.random() - 0.5) * 2)),
        tds: Math.max(50, Math.min(500, v.tds + (Math.random() - 0.5) * 8)),
        flow: Math.max(0, Math.min(8, v.flow + (Math.random() - 0.5) * 0.3)),
        sound: Math.max(20, Math.min(90, v.sound + (Math.random() - 0.5) * 5)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return values;
};

const tdsStatus = (ppm: number) => {
  if (ppm < 300) return { label: "Safe", color: "text-aqua-400", dot: "bg-aqua-400" };
  if (ppm < 600) return { label: "Warning", color: "text-amber-400", dot: "bg-amber-400" };
  return { label: "Danger", color: "text-red-400", dot: "bg-red-400" };
};

export default function HeroSection() {
  const sensors = useLiveSensorFaker();
  const status = tdsStatus(sensors.tds);

  const openAuth = (mode: "login" | "signup") => {
    window.dispatchEvent(new CustomEvent("aquaguard:auth", { detail: { mode } }));
  };

  return (
    <section className="relative min-h-screen mesh-bg flex items-center pt-24 pb-16 overflow-hidden">
      {/* Animated background blobs */}
      <div
        className="animate-blob absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #0e9e7f 0%, transparent 70%)",
          animationDelay: "0s",
        }}
      />
      <div
        className="animate-blob absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #0a7d64 0%, transparent 70%)",
          animationDelay: "3s",
        }}
      />
      <div
        className="animate-blob absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, #3dd4b0 0%, transparent 70%)",
          animationDelay: "5s",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — copy */}
        <div>
          {/* Badge */}
          <div className="animate-float-up inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-aqua-400 animate-pulse-ring" />
            <span className="text-xs font-medium text-aqua-300 font-mono">
              BIT1210 · Mount Kenya University · 2025
            </span>
          </div>

          <h1
            className="animate-float-up delay-100 text-5xl md:text-6xl xl:text-7xl font-black text-white mb-6 leading-[1.0]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Smart water.
            <br />
            <span className="text-gradient">Safer communities.</span>
          </h1>

          <p className="animate-float-up delay-200 text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
            AquaGuard is an IoT-powered water monitoring system that detects contamination,
            tracks usage, alerts on theft, and bills households via M-Pesa — all in real time.
          </p>

          {/* Trust badges */}
          <div className="animate-float-up delay-300 flex flex-wrap gap-3 mb-10">
            {[
              { icon: Shield, label: "Contamination alerts" },
              { icon: Wifi, label: "Real-time monitoring" },
              { icon: Zap, label: "Gemini AI insights" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-slate-300"
              >
                <Icon size={14} className="text-aqua-400" />
                {label}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="animate-float-up delay-400 flex flex-wrap gap-4">
            <button
              onClick={() => openAuth("signup")}
              className="btn-primary flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-2xl"
            >
              Get started free
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => openAuth("login")}
              className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-slate-300 glass rounded-2xl border border-white/10 hover:border-aqua-500/40 transition-all"
            >
              Sign in to dashboard
            </button>
          </div>
        </div>

        {/* Right — Live sensor preview card */}
        <div className="animate-float-up delay-300 flex justify-center">
          <div className="w-full max-w-sm">
            {/* Card header */}
            <div className="glass-strong rounded-3xl p-6 border border-white/10 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-1">
                    Live sensor feed
                  </p>
                  <h3
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Tank A — Block 4
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 bg-aqua-500/10 border border-aqua-500/30 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-aqua-400 animate-pulse" />
                  <span className="text-xs text-aqua-300 font-medium">Live</span>
                </div>
              </div>

              {/* Water level tank visual */}
              <div className="mb-6 p-4 rounded-2xl bg-slate-900/60 border border-white/5">
                <div className="flex items-end justify-between mb-2">
                  <span className="text-xs text-slate-500">Water level</span>
                  <span className="text-lg font-bold text-white font-mono">
                    {Math.round(sensors.level)}%
                  </span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-in-out"
                    style={{
                      width: `${sensors.level}%`,
                      background: "linear-gradient(90deg, #0a7d64, #3dd4b0)",
                    }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-1.5">
                  ≈ {Math.round((sensors.level / 100) * 5000)} L remaining of 5,000 L
                </p>
              </div>

              {/* Sensor readings grid */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  {
                    label: "TDS",
                    value: `${Math.round(sensors.tds)}`,
                    unit: "ppm",
                    color: status.color,
                    sub: status.label,
                  },
                  {
                    label: "Flow",
                    value: sensors.flow.toFixed(1),
                    unit: "L/min",
                    color: "text-blue-400",
                    sub: "Normal",
                  },
                  {
                    label: "Sound",
                    value: `${Math.round(sensors.sound)}`,
                    unit: "dB",
                    color: sensors.sound > 70 ? "text-red-400" : "text-slate-300",
                    sub: sensors.sound > 70 ? "Alert" : "Quiet",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl bg-slate-900/60 border border-white/5 p-3 text-center"
                  >
                    <p className="text-xs text-slate-600 mb-1">{s.label}</p>
                    <p className={`text-base font-bold font-mono ${s.color}`}>
                      {s.value}
                      <span className="text-xs font-normal text-slate-600 ml-0.5">
                        {s.unit}
                      </span>
                    </p>
                    <p className={`text-xs mt-0.5 ${s.color}`}>{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Alert banner */}
              <div className="rounded-xl bg-aqua-500/8 border border-aqua-500/20 p-3">
                <div className="flex items-start gap-2.5">
                  <div className={`w-2 h-2 rounded-full mt-1 ${status.dot} shrink-0`} />
                  <div>
                    <p className="text-xs font-medium text-aqua-300 mb-0.5">
                      Gemini AI · Water quality
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {sensors.tds < 300
                        ? "Water quality is within safe parameters. No anomalies detected."
                        : sensors.tds < 600
                        ? "Elevated TDS detected. Consider notifying residents."
                        : "Critical contamination level. Immediate action required!"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating info chips below card */}
            <div className="flex gap-3 mt-4 justify-center">
              <div className="glass rounded-full px-4 py-2 text-xs text-slate-400">
                Updates every 30s
              </div>
              <div className="glass rounded-full px-4 py-2 text-xs text-slate-400">
                4 sensors active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
