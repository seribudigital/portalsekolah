"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site-config";
import {
  Menu,
  X,
  ChevronDown,
  LogIn,
  Home,
  School,
  Newspaper,
  Phone,
} from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Berita", href: "/#berita", icon: Newspaper },
  { label: "Kontak", href: "/#kontak", icon: Phone },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unitDropdownOpen, setUnitDropdownOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen for navbar toggle events from SubNavbar
  useEffect(() => {
    const handleToggle = (e: any) => {
      setIsHidden(e.detail.hide);
    };
    window.addEventListener("navbar-toggle", handleToggle as EventListener);
    return () => window.removeEventListener("navbar-toggle", handleToggle as EventListener);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        } ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-slate-200/50"
            : "bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo + School Name */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[#008000]/20 group-hover:ring-[#008000]/40 transition-all shadow-md">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                  onError={(e) => {
                    // Fallback if no logo exists
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.classList.add("bg-gradient-to-br", "from-[#008000]", "to-[#006400]", "flex", "items-center", "justify-center");
                      parent.innerHTML = '<span class="text-white font-bold text-lg">A</span>';
                    }
                  }}
                />
              </div>
              {/* School/Foundation Name (Responsive) */}
              <div className="flex flex-col justify-center">
                <p className="text-sm sm:text-base font-bold text-slate-800 leading-tight tracking-tight sm:block hidden">
                  {siteConfig.shortName}
                </p>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                  Islamic School
                </p>
                
                {/* Mobile Specific Branding */}
                <div className="sm:hidden flex flex-col">
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {siteConfig.foundationName}
                  </p>
                  <p className="text-[9px] text-[#008000] font-bold">
                    {siteConfig.shortName}
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#008000] rounded-lg hover:bg-[#008000]/5 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}

              {/* Unit Sekolah Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setUnitDropdownOpen(true)}
                onMouseLeave={() => setUnitDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#008000] rounded-lg hover:bg-[#008000]/5 transition-all duration-200">
                  Unit Sekolah
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      unitDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-full left-0 mt-1 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/10 border border-slate-200/60 overflow-hidden transition-all duration-200 origin-top ${
                    unitDropdownOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="p-1.5">
                    {siteConfig.units.map((unit) => (
                      <Link
                        key={unit}
                        href={`/${unit}`}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-600 hover:text-[#008000] hover:bg-[#008000]/5 rounded-lg transition-colors"
                      >
                        <School className="w-4 h-4" />
                        Unit {unit}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#008000] to-[#006400] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#008000]/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                <LogIn className="w-4 h-4" />
                Portal Admin
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-2xl transition-all duration-300 ${
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-[#008000] hover:bg-[#008000]/5 rounded-xl transition-colors font-medium"
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}

            {/* Unit Sekolah Section */}
            <div className="px-4 pt-3 pb-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Unit Sekolah
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 px-4">
              {siteConfig.units.map((unit) => (
                <Link
                  key={unit}
                  href={`/${unit}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 hover:bg-[#008000]/5 text-slate-700 hover:text-[#008000] rounded-xl transition-colors font-medium text-sm border border-slate-100"
                >
                  <School className="w-4 h-4" />
                  {unit}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="px-4 pt-3 pb-1">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-[#008000] to-[#006400] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <LogIn className="w-5 h-5" />
                Portal Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under navbar */}
      <div className="h-16 md:h-18" />
    </>
  );
}
