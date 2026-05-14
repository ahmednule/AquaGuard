import { Droplets } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-aqua-500 flex items-center justify-center">
            <Droplets size={15} className="text-white" />
          </div>
          <span
            className="text-base font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Aqua<span className="text-aqua-400">Guard</span>
          </span>
        </div>

        <p className="text-sm text-slate-600 text-center">
          AquaGuard · BIT1210 Physics for Computing · Mount Kenya University · 2026
        </p>

        <div className="flex items-center gap-6">
          {["GitHub", "Vercel", "Render"].map((link) => (
            <span
              key={link}
              className="text-sm text-slate-600 hover:text-aqua-400 transition-colors cursor-pointer"
            >
              {link}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
