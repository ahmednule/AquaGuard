"use client";

import { Banknote, CreditCard, Clock, FileText, Wallet } from "lucide-react";

const history = [
  { id: 1, date: "2026-05-01", amount: "KES 1,200", method: "M-Pesa", status: "paid" },
  { id: 2, date: "2026-04-01", amount: "KES 1,150", method: "M-Pesa", status: "paid" },
  { id: 3, date: "2026-03-01", amount: "KES 1,100", method: "M-Pesa", status: "paid" },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-1">Billing</p>
          <h1 className="text-2xl font-bold text-white">Payments & invoices</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-2xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5">Download CSV</button>
          <button className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold">
            Pay now
            <CreditCard size={14} />
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass-strong rounded-2xl border border-white/10 p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Banknote size={18} className="text-aqua-300" />
              <div>
                <div className="text-xs text-slate-400">Amount due</div>
                <div className="text-xl font-black text-white">KES 240</div>
              </div>
            </div>
            <div className="text-xs text-slate-500">Due in 4 days</div>
          </div>

          <div className="text-sm text-slate-400 mb-3">Quick pay options</div>
          <div className="flex gap-3">
            <button className="flex-1 rounded-xl border border-white/8 px-4 py-3 text-sm text-slate-100 hover:bg-white/5">Pay with M-Pesa</button>
            <button className="rounded-xl border border-white/8 px-4 py-3 text-sm text-slate-100 hover:bg-white/5">Pay offline</button>
          </div>
        </div>

        <div className="glass-strong rounded-2xl border border-white/10 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Wallet size={18} className="text-aqua-300" />
            <div>
              <div className="text-xs text-slate-400">Balance</div>
              <div className="text-lg font-black text-white">KES 0</div>
            </div>
          </div>
          <div className="text-xs text-slate-500">No pending refunds</div>
        </div>
      </div>

      <div className="glass-strong rounded-2xl border border-white/10 p-4">
        <div className="text-sm text-slate-400 mb-3">Payment history</div>
        <div className="space-y-2">
          {history.map((h) => (
            <div key={h.id} className="flex items-center justify-between rounded-xl border border-white/6 p-3">
              <div>
                <div className="text-sm font-medium text-white">{h.date}</div>
                <div className="text-xs text-slate-400">{h.method}</div>
              </div>
              <div className="text-sm font-semibold text-slate-100">{h.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
