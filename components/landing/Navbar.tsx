"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Droplets, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openAuth = (mode: "login" | "signup") => {
    window.dispatchEvent(new CustomEvent("aquaguard:auth", { detail: { mode } }));
  };

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Sensors", href: "#sensors" },
    { label: "Pricing", href: "#cta" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 glass-strong border-b border-white/8"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-aqua-500 flex items-center justify-center shadow-lg shadow-aqua-500/30 group-hover:shadow-aqua-500/50 transition-shadow">
            <Droplets size={18} className="text-white" />
          </div>
          <span
            className="text-lg font-bold text-white tracking-tight"
          >
            Aqua<span className="text-aqua-400">Guard</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-slate-400 hover:text-aqua-300 transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => openAuth("login")}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign in
          </button>
          <button
            onClick={() => openAuth("signup")}
            className="btn-primary px-5 py-2 text-sm font-semibold text-white rounded-xl"
          >
            Get started
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-white/8 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-aqua-300 transition-colors font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-white/8">
            <button
              onClick={() => { openAuth("login"); setMobileOpen(false); }}
              className="flex-1 py-2.5 text-sm font-medium text-slate-300 border border-white/10 rounded-xl hover:border-aqua-500/50 transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => { openAuth("signup"); setMobileOpen(false); }}
              className="flex-1 py-2.5 text-sm font-semibold text-white btn-primary rounded-xl"
            >
              Get started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
