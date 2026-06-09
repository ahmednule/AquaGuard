"use client";
import { useState, useCallback, useEffect } from "react";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { CREDENTIALS } from "@/lib/auth";
import { graphqlRequest, AUTH_MUTATIONS, isBackendAvailable, storeAuthCookies, type AuthResult } from "@/lib/graphql";

interface FormState {
  email: string;
  password: string;
}

const initialForm: FormState = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const showDemoAccounts = true;

  const useTestCreds = (role: "caretaker" | "user") => {
    const creds = CREDENTIALS[role];
    setForm((prev) => ({ ...prev, email: creds.email, password: creds.password }));
    setError(null);
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
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    setError(null);

    try {
      const backendAvailable = await isBackendAvailable();

      if (backendAvailable) {
        const result = await graphqlRequest<{
          login?: AuthResult;
        }>(AUTH_MUTATIONS.LOGIN, { email: form.email, password: form.password });

        const authResult = result.login as AuthResult;
        if (!authResult?.token) {
          setError("Authentication failed");
          setLoading(false);
          return;
        }

        storeAuthCookies(authResult.token, authResult.user.role || "user");
      } else {
        let detectedRole: "caretaker" | "user" | null = null;
        if (form.email === CREDENTIALS.caretaker.email && form.password === CREDENTIALS.caretaker.password) {
          detectedRole = "caretaker";
        } else if (form.email === CREDENTIALS.user.email && form.password === CREDENTIALS.user.password) {
          detectedRole = "user";
        }

        if (detectedRole) {
          const token = btoa(JSON.stringify({ email: form.email, role: detectedRole, iat: Date.now() }));
          const maxAge = 60 * 60 * 24 * 7;
          document.cookie = `aqua_auth=${token}; path=/; max-age=${maxAge}`;
          document.cookie = `aqua_role=${detectedRole}; path=/; max-age=${maxAge}`;
        } else {
          setError("Invalid credentials");
          setLoading(false);
          return;
        }
      }

      setLoading(false);
      setSuccess(true);

      const dest = "/dashboard";
      setTimeout(() => {
        setSuccess(false);
        try { router.push(dest); } catch (e) { window.location.href = dest; }
      }, 900);
    } catch (e) {
      setLoading(false);
      setError(e instanceof Error ? e.message : "Network error");
    }
  };

  if (success) {
    return (
      <AuthLayout mode="login" subtitle="Welcome back!" description="Redirecting to your dashboard...">
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-aqua-500/15 border border-aqua-500/30 flex items-center justify-center mx-auto mb-4">
            <Loader2 size={28} className="text-aqua-400 animate-spin" />
          </div>
          <p className="text-slate-400 text-sm">Setting up your session...</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      mode="login"
      subtitle="Smart Water Management"
      description="Monitor your community's water quality in real-time. Get alerts, insights, and actionable data all in one place."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">
            Email address
          </label>
          <input
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="you@example.com"
            className="input-field w-full rounded-xl px-4 py-3 text-sm border border-white/10 bg-white/5 focus:bg-white/10 focus:border-aqua-500 transition-colors"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-slate-400">Password</label>
            <button
              type="button"
              className="text-xs text-aqua-400 hover:text-aqua-300 transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              placeholder="Enter your password"
              className="input-field w-full rounded-xl px-4 py-3 pr-12 text-sm border border-white/10 bg-white/5 focus:bg-white/10 focus:border-aqua-500 transition-colors"
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

        {/* Demo accounts */}
        {showDemoAccounts && (
          <div className="space-y-3 pt-2">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-slate-600">Demo accounts</p>
            {([
              { role: "caretaker" as const, label: "Caretaker", sub: "Community admin view", color: "rgba(14,158,127,0.1)", border: "rgba(14,158,127,0.2)", textColor: "#3dd4b0" },
              { role: "user" as const, label: "Resident", sub: "Household member view", color: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)", textColor: "#93c5fd" },
            ]).map(({ role, label, sub, color, border, textColor }) => {
              const creds = CREDENTIALS[role];
              return (
                <div
                  key={role}
                  className="rounded-lg px-3 py-2.5 flex items-center justify-between"
                  style={{ background: color, border: `1px solid ${border}` }}
                >
                  <div>
                    <div className="text-xs font-bold mb-0.5" style={{ color: textColor }}>{label}</div>
                    <div className="text-[11px] text-slate-500">{creds.email}</div>
                    <div className="text-[11px] text-slate-600">Password: <span className="text-slate-400 font-mono text-[10px]">{creds.password}</span></div>
                  </div>
                  <button
                    type="button"
                    onClick={() => useTestCreds(role)}
                    className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap ml-2 flex-shrink-0"
                    style={{ background: color, border: `1px solid ${border}`, color: textColor, cursor: "pointer" }}
                  >
                    Fill
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-7 py-3 text-sm font-semibold text-white rounded-xl flex items-center justify-center gap-2 bg-aqua-500 hover:bg-aqua-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in to dashboard
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
