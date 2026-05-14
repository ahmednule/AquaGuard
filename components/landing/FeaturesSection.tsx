import {
  Droplets,
  AlertTriangle,
  Activity,
  Volume2,
  CreditCard,
  Brain,
} from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "Water quality monitoring",
    description:
      "TDS sensor continuously measures dissolved solids in ppm. Instant contamination alerts before residents are at risk.",
    accent: "aqua",
    tag: "Sensor: TDS Analog",
  },
  {
    icon: Activity,
    title: "Tank level tracking",
    description:
      "HC-SR04 ultrasonic sensor maps distance to water surface every 30 seconds. Never run out unexpectedly again.",
    accent: "blue",
    tag: "Sensor: HC-SR04",
  },
  {
    icon: AlertTriangle,
    title: "Theft detection",
    description:
      "YF-S201 flow sensor detects abnormal drainage at night. Gemini AI distinguishes pipe bursts from deliberate theft.",
    accent: "amber",
    tag: "Sensor: YF-S201",
  },
  {
    icon: Volume2,
    title: "Vandalism alerts",
    description:
      "KY-038 sound sensor detects impact spikes above 70 dB. Correlated with flow anomalies for high-confidence alerts.",
    accent: "red",
    tag: "Sensor: KY-038",
  },
  {
    icon: Brain,
    title: "Gemini AI insights",
    description:
      `Google Gemini analyses patterns and generates plain-language alerts like: "Unusual 38L drainage at 2:17AM — possible theft."`,
    accent: "purple",
    tag: "Google Gemini API",
  },
  {
    icon: CreditCard,
    title: "M-Pesa billing",
    description:
      "Per-household usage calculated from flow data. Simulated STK Push payment requests via Safaricom Daraja API.",
    accent: "green",
    tag: "Daraja API",
  },
];

const accentMap: Record<string, { border: string; icon: string; tag: string }> = {
  aqua:   { border: "border-aqua-500/20",   icon: "text-aqua-400",   tag: "bg-aqua-500/10 text-aqua-300 border-aqua-500/20" },
  blue:   { border: "border-blue-500/20",   icon: "text-blue-400",   tag: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
  amber:  { border: "border-amber-500/20",  icon: "text-amber-400",  tag: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
  red:    { border: "border-red-500/20",    icon: "text-red-400",    tag: "bg-red-500/10 text-red-300 border-red-500/20" },
  purple: { border: "border-purple-500/20", icon: "text-purple-400", tag: "bg-purple-500/10 text-purple-300 border-purple-500/20" },
  green:  { border: "border-green-500/20",  icon: "text-green-400",  tag: "bg-green-500/10 text-green-300 border-green-500/20" },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-semibold text-aqua-400 tracking-widest uppercase font-mono mb-4">
            What AquaGuard does
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Every angle of your water,
            <br />
            <span className="text-gradient">fully covered.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Four sensors. One smart system. Continuous protection for Kenyan communities
            that share communal water tanks.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const accent = accentMap[feature.accent];
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`sensor-card glass rounded-3xl p-7 border ${accent.border} group`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 glass border ${accent.border}`}
                >
                  <Icon size={22} className={accent.icon} />
                </div>

                {/* Tag */}
                <div className="mb-4">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full border font-mono ${accent.tag}`}
                  >
                    {feature.tag}
                  </span>
                </div>

                <h3
                  className="text-lg font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
