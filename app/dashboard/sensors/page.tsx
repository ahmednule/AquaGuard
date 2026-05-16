"use client";

import { useState } from "react";
import { Thermometer, ServerCog, Activity } from "lucide-react";

const sample = [
  { id: "A", name: "Tank A", status: "online", tds: 182, level: 74 },
  { id: "B", name: "Tank B", status: "online", tds: 210, level: 62 },
  { id: "C", name: "Tank C", status: "offline", tds: 999, level: 12 },
];

export default function SensorsPage() {
  const [q] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-1">Sensors</p>
          <h1 className="text-2xl font-bold text-white">Connected devices</h1>
        </div>
        <div className="text-sm text-slate-400">{sample.length} devices</div>
      </div>

      <div className="glass-strong rounded-2xl border border-white/10 p-4">
        <div className="grid gap-3">
          {sample.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-3 rounded-xl border border-white/6">
              <div className="flex items-center gap-3">
                <ServerCog className="text-aqua-300" />
                <div>
                  <div className="text-sm text-white font-medium">{s.name}</div>
                  <div className="text-xs text-slate-400">TDS: {s.tds} ppm · Level: {s.level}%</div>
                </div>
              </div>
              <div className={`text-xs ${s.status === "online" ? "text-green-300" : "text-amber-300"}`}>{s.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
