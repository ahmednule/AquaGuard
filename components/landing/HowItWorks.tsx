const steps = [
  {
    number: "01",
    title: "Sensors collect data",
    description:
      "Four sensors mounted on your water tank continuously measure level, quality, flow, and ambient sound — every 30 seconds.",
    detail: "ESP32 microcontroller → 4 sensor pins",
  },
  {
    number: "02",
    title: "ESP32 sends to cloud",
    description:
      "The ESP32 posts a JSON payload to the backend server via WiFi (2.4GHz, λ = 12.5 cm). Data lands in PostgreSQL within milliseconds.",
    detail: "REST POST /api/readings → Node.js + PostgreSQL",
  },
  {
    number: "03",
    title: "Gemini AI analyses",
    description:
      "Google Gemini cross-references sensor patterns against thresholds, historical baselines, and time-of-day context to generate intelligent alerts.",
    detail: "Google Gemini API → plain-language alerts",
  },
  {
    number: "04",
    title: "Dashboard notifies you",
    description:
      "The React dashboard updates in real time. Critical alerts trigger push notifications. Community managers can resolve or escalate from any device.",
    detail: "React + Recharts → live charts & alert feed",
  },
  {
    number: "05",
    title: "M-Pesa bills households",
    description:
      "Flow data is aggregated per household. Monthly usage reports trigger M-Pesa STK Push payment requests via Safaricom's Daraja API.",
    detail: "Daraja API → automated household billing",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-semibold text-aqua-400 tracking-widest uppercase font-mono mb-4">
            System flow
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From sensor to
            <br />
            <span className="text-gradient">your phone.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-aqua-500/60 via-aqua-500/20 to-transparent hidden md:block" />

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative flex gap-8 group"
                style={{ paddingBottom: i < steps.length - 1 ? "2.5rem" : 0 }}
              >
                {/* Step number bubble */}
                <div className="relative shrink-0 hidden md:flex">
                  <div className="w-16 h-16 rounded-2xl glass border border-aqua-500/30 flex items-center justify-center z-10">
                    <span
                      className="text-sm font-black text-aqua-400 font-mono"
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Step content */}
                <div className="glass rounded-2xl p-6 border border-white/6 flex-1 group-hover:border-aqua-500/20 transition-colors duration-300">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3
                      className="text-lg font-bold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-600 shrink-0 pt-1 hidden sm:block">
                      {step.detail}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
