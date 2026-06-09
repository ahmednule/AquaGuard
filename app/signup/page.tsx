"use client";
import { useState } from "react";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { graphqlRequest, AUTH_MUTATIONS, isBackendAvailable, storeAuthCookies, type AuthResult } from "@/lib/graphql";
import { useAuth } from "@/lib/apollo-auth";

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

export default function SignupPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { refreshSession } = useAuth();

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError(null);
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return "Full name is required.";
    if (!form.email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
    if (!form.password || form.password.length < 6)
      return "Password must be at least 6 characters.";
    if (!form.community.trim()) return "Community name is required.";
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
          signup?: AuthResult;
        }>(AUTH_MUTATIONS.SIGNUP, {
          email: form.email,
          password: form.password,
          name: form.name,
          role: "user",
          community: form.community || null,
          phone: form.phone || null,
        });

        const authResult = result.signup as AuthResult;
        if (!authResult?.token) {
          setError("Account creation failed");
          setLoading(false);
          return;
        }

        storeAuthCookies(authResult.token, authResult.user.role || "user");
      } else {
        setError("Backend is not available. Please try again later or contact support.");
        setLoading(false);
        return;
      }

      const sessionReady = await refreshSession();
      if (!sessionReady) {
        setLoading(false);
        setError("Unable to establish your session.");
        return;
      }

      setLoading(false);
      setSuccess(true);

      const dest = "/dashboard";
      setTimeout(() => {
        setSuccess(false);
        try { router.push(dest); } catch { window.location.href = dest; }
      }, 900);
    } catch (e) {
      setLoading(false);
      setError(e instanceof Error ? e.message : "Network error");
    }
  };

  if (success) {
    return (
      <AuthLayout mode="signup" subtitle="Account created!" description="Setting up your community dashboard...">
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-aqua-500/15 border border-aqua-500/30 flex items-center justify-center mx-auto mb-4">
            <Loader2 size={28} className="text-aqua-400 animate-spin" />
          </div>
          <p className="text-slate-400 text-sm">Redirecting to your dashboard...</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      mode="signup"
      subtitle="Build Your Water Community"
      description="Join thousands of communities monitoring water quality. Empower residents with real-time insights and data-driven decisions."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Two-column layout for form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full name */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Full name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Jane Wanjiku"
              className="input-field w-full rounded-xl px-4 py-3 text-sm border border-white/10 bg-white/5 focus:bg-white/10 focus:border-aqua-500 transition-colors"
              autoComplete="name"
            />
          </div>

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

          {/* Community name */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Community / Estate name
            </label>
            <input
              type="text"
              value={form.community}
              onChange={handleChange("community")}
              placeholder="Githurai 44 Estate"
              className="input-field w-full rounded-xl px-4 py-3 text-sm border border-white/10 bg-white/5 focus:bg-white/10 focus:border-aqua-500 transition-colors"
            />
          </div>

          {/* Phone (optional) */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              M-Pesa phone <span className="text-slate-600 font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="07XX XXX XXX"
              className="input-field w-full rounded-xl px-4 py-3 text-sm border border-white/10 bg-white/5 focus:bg-white/10 focus:border-aqua-500 transition-colors"
            />
          </div>
        </div>

        {/* Password - Full width */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-slate-400">Password</label>
            <span className="text-[11px] text-slate-600">Min. 6 characters</span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              placeholder="Create a strong password"
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

        {/* Terms & Conditions */}
        <div className="text-[11px] text-slate-500">
          By signing up, you agree to our{" "}
          <button type="button" className="text-aqua-400 hover:text-aqua-300">
            Terms of Service
          </button>{" "}
          and{" "}
          <button type="button" className="text-aqua-400 hover:text-aqua-300">
            Privacy Policy
          </button>
          .
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-3 text-sm font-semibold text-white rounded-xl flex items-center justify-center gap-2 bg-aqua-500 hover:bg-aqua-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
