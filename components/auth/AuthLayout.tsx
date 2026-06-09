"use client";
import React from "react";
import { Droplets, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  mode: "login" | "signup";
  subtitle: string;
  description: string;
}

export default function AuthLayout({
  children,
  mode,
  subtitle,
  description,
}: AuthLayoutProps) {
  const isLogin = mode === "login";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Back button */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-10 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </Link>

      {/* Main container */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Left side - Branding & Hero (hidden on mobile) */}
        <div className="hidden md:flex flex-col items-center justify-center px-12 py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-black relative overflow-hidden">
          {/* Ambient background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-aqua-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-aqua-500/5 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-md">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 rounded-3xl bg-aqua-500 flex items-center justify-center shadow-2xl shadow-aqua-500/30">
                <Droplets size={32} className="text-white" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              AquaGuard
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-aqua-300 font-semibold mb-6">{subtitle}</p>

            {/* Description */}
            <p className="text-slate-300 text-base leading-relaxed mb-10">{description}</p>

            {/* Features list */}
            <div className="space-y-4">
              {[
                { icon: "💧", text: "Real-time water quality monitoring" },
                { icon: "📊", text: "Community insights & analytics" },
                { icon: "🔐", text: "Secure & encrypted data" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-300 text-sm">
                  <span className="text-xl">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-20">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? "Welcome back" : "Join AquaGuard"}
              </h2>
              <p className="text-slate-400">
                {isLogin
                  ? "Sign in to access your dashboard"
                  : "Create your community account in minutes"}
              </p>
            </div>

            {/* Form content */}
            {children}

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-slate-500 font-medium">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Switch auth mode */}
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-3">
                {isLogin
                  ? "Don't have an account yet?"
                  : "Already have an account?"}
              </p>
              <Link
                href={isLogin ? "/signup" : "/login"}
                className="inline-block px-6 py-2.5 text-sm font-semibold text-aqua-400 hover:text-aqua-300 border border-aqua-500/30 hover:border-aqua-500 rounded-xl transition-all duration-200"
              >
                {isLogin ? "Create account" : "Sign in"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
