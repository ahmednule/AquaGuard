"use client";

import { Wallet, CreditCard, Receipt, ArrowUpRight, CheckCircle2, Download, HelpCircle, Info } from "lucide-react";

const panel = {
  background: "rgba(255,255,255,0.032)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 18,
  padding: 24,
};

const history = [
  { id: "INV-26-04", date: "Apr 28, 2026", amount: "KES 210", status: "Paid", method: "M-Pesa" },
  { id: "INV-26-03", date: "Mar 29, 2026", amount: "KES 195", status: "Paid", method: "M-Pesa" },
  { id: "INV-26-02", date: "Feb 27, 2026", amount: "KES 230", status: "Paid", method: "M-Pesa" },
  { id: "INV-26-01", date: "Jan 28, 2026", amount: "KES 215", status: "Paid", method: "M-Pesa" },
];

export default function UserBillingPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1380px]">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600 mb-1">Account</p>
        <h1 className="font-extrabold text-slate-50" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em" }}>
          Billing & Payments
        </h1>
        <p className="text-sm text-slate-500 mt-1">Manage your water bills and view payment history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 items-start">
        {/* Left Column - Current Bill */}
        <div style={panel} className="relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400" />
           <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
               <Wallet size={20} />
             </div>
             <div>
               <h2 className="text-lg font-bold text-white">Current Bill</h2>
               <p className="text-xs text-slate-400">May 2026 Cycle</p>
             </div>
           </div>

           <div className="mb-8">
             <p className="text-xs text-slate-500 font-medium mb-1">Amount Due</p>
             <div className="flex items-end gap-2">
               <p className="text-4xl font-extrabold text-white" style={{ letterSpacing: "-0.03em" }}>KES 240</p>
             </div>
             <div className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Due in 4 days (May 20)
             </div>
           </div>

           <div className="space-y-3 pt-6 border-t border-white/5 mb-8">
             <div className="flex justify-between text-sm">
               <span className="text-slate-400">Water usage (9.6 m³)</span>
               <span className="text-white font-medium">KES 192</span>
             </div>
             <div className="flex justify-between text-sm">
               <span className="text-slate-400">Fixed maintenance fee</span>
               <span className="text-white font-medium">KES 48</span>
             </div>
           </div>

           <button
             className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
             style={{ background: "#2563eb", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}
           >
             Pay via M-Pesa <ArrowUpRight size={16} />
           </button>
           <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
             <Info size={12} /> Secure payments processed instantly.
           </p>
        </div>

        {/* Right Column - History */}
        <div style={panel}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Payment History</h2>
            <button className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
              <Download size={14} /> Download PDF
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-white/[0.02] text-slate-500 border-b border-white/5">
                <tr>
                  <th className="px-4 py-3 font-semibold rounded-tl-lg">Invoice</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Method</th>
                  <th className="px-4 py-3 font-semibold rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                    <td className="px-4 py-4 font-medium text-slate-300">{item.id}</td>
                    <td className="px-4 py-4 text-slate-400">{item.date}</td>
                    <td className="px-4 py-4 font-bold text-white">{item.amount}</td>
                    <td className="px-4 py-4 text-slate-400">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs">
                        {item.method}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                        <CheckCircle2 size={12} /> {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
