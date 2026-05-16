"use client";
import { useState, useEffect, useCallback } from "react";
import { X, Eye, EyeOff, Droplets, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { CREDENTIALS } from "@/lib/auth";

type AuthMode = "login" | "signup";

interface FormState {
  name: string;
  email: string;
  password: string;
  phone: string;
  community: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  password: "",
  phone: "",
  community: "",
};

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState<FormState>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [showDev, setShowDev] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = window.location.hostname || "";
    if (
      process.env.NODE_ENV === "development" ||
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.startsWith("192.168.")
    ) {
      setShowDev(true);
    }
  }, []);

  const useTestCreds = (role: "caretaker" | "user") => {
    const creds = CREDENTIALS[role];
    setForm((prev) => ({ ...prev, email: creds.email, password: creds.password }));
    setError(null);
  };

  // Listen for custom events from Navbar / CTA buttons
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ mode: AuthMode }>).detail;
      setMode(detail.mode);
      setForm(initialForm);
      setError(null);
      setSuccess(false);
      setOpen(true);
    };
    window.addEventListener("aquaguard:auth", handler);
    return () => window.removeEventListener("aquaguard:auth", handler);
  }, []);

  // ESC key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); },
    []
  );
  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  const switchMode = (m: AuthMode) => {
    setMode(m);
    setError(null);
    setForm(initialForm);
    setSuccess(false);
  };

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError(null);
  };

  const validate = (): string | null => {
    if (!form.email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
    if (!form.password || form.password.length < 6)
      return "Password must be at least 6 characters.";
    if (mode === "signup") {
      if (!form.name.trim()) return "Full name is required.";
      if (!form.community.trim()) return "Community name is required.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    setError(null);

    try {
      // Determine role from credentials match (client-side for dev)
      let detectedRole: "caretaker" | "user" | null = null;
      if (form.email === CREDENTIALS.caretaker.email && form.password === CREDENTIALS.caretaker.password) {
        detectedRole = "caretaker";
      } else if (form.email === CREDENTIALS.user.email && form.password === CREDENTIALS.user.password) {
        detectedRole = "user";
      }

      const payload = { email: form.email, password: form.password };
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 404 || detectedRole) {
        // Client-side fallback for dev / known credentials
        try {
          const role = detectedRole ?? "user";
          const token = btoa(JSON.stringify({ email: form.email, role, iat: Date.now() }));
          const maxAge = 60 * 60 * 24 * 7;
          document.cookie = `aqua_auth=${token}; path=/; max-age=${maxAge}`;
          document.cookie = `aqua_role=${role}; path=/; max-age=${maxAge}`;
        } catch (e) {}
      } else if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body?.error || "Authentication failed");
        setLoading(false);
        return;
      }

      setLoading(false);
      setSuccess(true);

      const role = detectedRole ?? "caretaker";
      const dest = role === "user" ? "/dashboard/user" : "/dashboard";
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        try { router.push(dest); } catch (e) { window.location.href = dest; }
      }, 900);
    } catch (e) {
      setLoading(false);
      setError("Network error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-strong rounded-3xl border border-white/12 shadow-2xl shadow-black/60 overflow-hidden">
        {/* Top teal bar */}
        <div className="h-1 w-full bg-gradient-to-r from-aqua-600 via-aqua-400 to-aqua-600" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-aqua-500 flex items-center justify-center shadow-lg shadow-aqua-500/30">
                <Droplets size={18} className="text-white" />
              </div>
              <div>
                <h2
                  className="text-lg font-bold text-white leading-tight"
                >
                  {mode === "login" ? "Welcome back" : "Join AquaGuard"}
                </h2>
                <p className="text-xs text-slate-500">
                  {mode === "login"
                    ? "Sign in to your dashboard"
                    : "Create your community account"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-500 hover:text-white transition-colors p-1"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mode tabs */}
          <div className="flex gap-1 glass rounded-2xl p-1 mb-8">
            {(["login", "signup"] as AuthMode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  mode === m
                    ? "bg-aqua-500 text-white shadow-lg shadow-aqua-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {m === "login" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          {/* Success state */}
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-aqua-500/15 border border-aqua-500/30 flex items-center justify-center mx-auto mb-4">
                <Droplets size={28} className="text-aqua-400" />
              </div>
              <h3
                className="text-xl font-bold text-white mb-2"
              >
                {mode === "login" ? "Welcome back!" : "Account created!"}
              </h3>
              <p className="text-sm text-slate-400">
                {mode === "login"
                  ? "Redirecting to your dashboard..."
                  : "Setting up your community dashboard..."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Sign-up only fields */}
              {mode === "signup" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="e.g. Jane Wanjiku"
                      className="input-field w-full rounded-xl px-4 py-3 text-sm"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Community / estate name
                    </label>
                    <input
                      type="text"
                      value={form.community}
                      onChange={handleChange("community")}
                      placeholder="e.g. Githurai 44 Estate"
                      className="input-field w-full rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      M-Pesa phone number
                      <span className="text-slate-600 font-normal ml-1">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      placeholder="07XX XXX XXX"
                      className="input-field w-full rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Email address
                </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="you@example.com"
                    className="input-field w-full rounded-xl px-4 py-3 text-sm"
                  />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-400">Password</label>
                  {mode === "login" && (
                    <button
                      type="button"
                      className="text-xs text-aqua-400 hover:text-aqua-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange("password")}
                    placeholder={mode === "signup" ? "Min. 6 characters" : "Enter password"}
                    className="input-field w-full rounded-xl px-4 py-3 pr-12 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
                  <p className="text-xs text-red-400">{error}</p>
                </div>
              )}

              {/* Dev test credentials hint */}
              {showDev && (
                <div className="space-y-2">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-slate-600">Demo accounts</p>
                  {([
                    { role: "caretaker" as const, label: "Caretaker", sub: "Community admin view",  color: "rgba(14,158,127,0.1)",  border: "rgba(14,158,127,0.2)",  textColor: "#3dd4b0" },
                    { role: "user"      as const, label: "Resident",  sub: "Household member view", color: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.2)",  textColor: "#93c5fd" },
                  ]).map(({ role, label, sub, color, border, textColor }) => {
                    const creds = CREDENTIALS[role];
                    return (
                      <div
                        key={role}
                        className="rounded-xl px-3.5 py-3"
                        style={{ background: color, border: `1px solid ${border}` }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold mb-0.5" style={{ color: textColor }}>{label}</div>
                            <div className="text-[11px] text-slate-500">{creds.email}</div>
                            <div className="text-[11px] text-slate-600">Password: <span className="text-slate-400 font-mono">{creds.password}</span></div>
                          </div>
                          <button
                            type="button"
                            onClick={() => useTestCreds(role)}
                            className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all"
                            style={{ background: color, border: `1px solid ${border}`, color: textColor, cursor: "pointer" }}
                          >
                            Fill
                          </button>
                        </div>
                        <p className="text-[10.5px] text-slate-600 mt-1">{sub}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-sm font-semibold text-white rounded-xl flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {mode === "login" ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>
                    {mode === "login" ? "Sign in to dashboard" : "Create account"}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Switch mode */}
              <p className="text-center text-xs text-slate-500 pt-1">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                  className="text-aqua-400 hover:text-aqua-300 font-medium transition-colors"
                >
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
