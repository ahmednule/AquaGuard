"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplets, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Track scroll for header background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["features", "how-it-works", "sensors", "cta"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHash(`#${id}`); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  // Sync with URL hash
  useEffect(() => {
    const sync = () => setActiveHash(window.location.hash || "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const openAuth = (mode: "login" | "signup") => {
    window.dispatchEvent(new CustomEvent("aquaguard:auth", { detail: { mode } }));
  };

  const navLinks = [
    { label: "Features",     href: "#features"    },
    { label: "How it works", href: "#how-it-works" },
    { label: "Sensors",      href: "#sensors"      },
    { label: "Pricing",      href: "#cta"          },
  ];

  const isActive = (href: string) =>
    href.startsWith("#")
      ? activeHash === href
      : pathname === href || pathname.startsWith(href + "/");

  const HEADER_BG =
    mobileOpen
      ? "bg-[#0a1929]"
      : scrolled
      ? "glass-strong border-b border-white/8"
      : "bg-transparent";

  return (
    <>
      {/* ─── Header bar ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen ? "py-3" : "py-5"
        } ${HEADER_BG}`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-aqua-500 flex items-center justify-center shadow-lg shadow-aqua-500/30 group-hover:shadow-aqua-500/50 transition-shadow">
              <Droplets size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Aqua<span className="text-aqua-400">Guard</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      active ? "text-aqua-300" : "text-slate-400 hover:text-aqua-300"
                    }`}
                  >
                    {link.label}
                  </a>
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-aqua-400 transition-all duration-300 origin-center ${
                      active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                  />
                </li>
              );
            })}
          </ul>

          {/* Desktop auth */}
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1 text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </nav>
      </header>

      {/* ─── Mobile full-screen overlay ─────────────────────────────
          Outside <header> so it truly fills the whole viewport.
          z-40 keeps it below header (z-50) but above all page content.
          bg-[#0a1929] is fully opaque — zero hero bleed-through.      */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] z-40 bg-[#0a1929] flex flex-col px-5 pt-6 pb-10 overflow-y-auto">

          {/* Nav links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-2xl text-[1.0625rem] font-medium transition-all duration-200 ${
                    active
                      ? "bg-aqua-500/10 text-aqua-300"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full bg-aqua-400 flex-shrink-0 transition-opacity duration-200 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-6 h-px bg-white/8" />

          {/* Auth buttons — full-width, stacked */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { openAuth("signup"); setMobileOpen(false); }}
              className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white btn-primary"
            >
              Get started
            </button>
            <button
              onClick={() => { openAuth("login"); setMobileOpen(false); }}
              className="w-full py-3.5 rounded-2xl text-sm font-medium text-slate-300 border border-white/10 hover:border-aqua-500/40 hover:text-white transition-colors"
            >
              Sign in
            </button>
          </div>

        </div>
      )}
    </>
  );
}