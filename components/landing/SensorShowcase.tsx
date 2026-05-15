const sensors = [
  {
    model: "HC-SR04",
    name: "Ultrasonic",
    role: "Water level",
    physics: "Wave motion & speed of sound",
    formula: "d = (v × t) / 2",
    description: "Emits a 40kHz pulse, measures echo return time to compute distance to the water surface.",
    pin: "D5 (Trig) · D18 (Echo)",
    price: "KES 200",
    color: "#3dd4b0",
  },
  {
    model: "Analog TDS",
    name: "TDS Meter",
    role: "Water quality",
    physics: "Electrical conductivity & Ohm's Law",
    formula: "Conductivity = 1/R",
    description: "Passes AC current between steel probes. Conductivity inversely indicates dissolved contamination.",
    pin: "A34 (Analog ADC)",
    price: "KES 1,500",
    color: "#60a5fa",
  },
  {
    model: "YF-S201",
    name: "Flow Sensor",
    role: "Usage & theft",
    physics: "Hall effect & electromagnetism",
    formula: "Flow (L/min) = Hz / 7.5",
    description: "Turbine with embedded magnet generates one pulse per revolution. ESP32 counts interrupts.",
    pin: "D4 (Interrupt)",
    price: "KES 500",
    color: "#fbbf24",
  },
  {
    model: "KY-038",
    name: "Sound Sensor",
    role: "Vandalism detection",
    physics: "Longitudinal waves & transducers",
    formula: "dB = 20 × log₁₀(P/P₀)",
    description: "Electret microphone converts pressure waves to voltage. Spike detection flags vandalism events.",
    pin: "A35 (Analog ADC)",
    price: "KES 300",
    color: "#f87171",
  },
];

export default function SensorShowcase() {
  return (
    <section id="sensors" className="py-28 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-semibold text-aqua-400 tracking-widest uppercase font-mono mb-4">
            Hardware · Physics
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            Four sensors.
            <br />
            <span className="text-gradient">Four physics principles.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Every component in AquaGuard is grounded in real physics — from wave mechanics
            to the Hall effect.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {sensors.map((sensor) => (
            <div
              key={sensor.model}
              className="sensor-card glass rounded-3xl p-7 border border-white/6 overflow-hidden relative"
            >
              {/* Decorative glow */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-8 blur-2xl"
                style={{ background: sensor.color }}
              />

              <div className="relative">
                {/* Header row */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span
                      className="text-xs font-mono font-semibold px-3 py-1 rounded-full border mb-3 inline-block"
                      style={{
                        color: sensor.color,
                        borderColor: sensor.color + "40",
                        background: sensor.color + "15",
                      }}
                    >
                      {sensor.model}
                    </span>
                    <h3
                      className="text-xl font-bold text-white"
                    >
                      {sensor.name}
                    </h3>
                    <p className="text-sm text-slate-500">{sensor.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600 mb-1">Cost</p>
                    <p className="text-sm font-semibold text-slate-300">{sensor.price}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-5">
                  {sensor.description}
                </p>

                {/* Physics info */}
                <div className="rounded-2xl bg-slate-900/50 border border-white/5 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Physics principle</span>
                    <span className="text-xs font-medium text-slate-300">
                      {sensor.physics}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Formula</span>
                    <code
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{
                        color: sensor.color,
                        background: sensor.color + "15",
                      }}
                    >
                      {sensor.formula}
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">ESP32 pin</span>
                    <code className="text-xs font-mono text-slate-400">{sensor.pin}</code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
