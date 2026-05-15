const stats = [
  { value: "4", label: "IoT sensors per tank", suffix: "" },
  { value: "30", label: "Second data refresh", suffix: "s" },
  { value: "99", label: "Uptime guarantee", suffix: "%" },
  { value: "M-Pesa", label: "Integrated billing", suffix: "" },
];

export default function StatsBar() {
  return (
    <section className="relative z-10 py-12 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl md:text-4xl font-black text-white mb-1"
              >
                <span className="text-gradient">
                  {stat.value}
                  {stat.suffix}
                </span>
              </p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
