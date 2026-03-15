"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site-config";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Heart,
  ArrowUpRight,
} from "lucide-react";

const quickLinks = [
  { label: "Beranda", href: "/" },
  { label: "Berita & Informasi", href: "/#berita" },
  ...siteConfig.units.map((unit) => ({
    label: `Unit ${unit}`,
    href: `/${unit}`,
  })),
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden" id="kontak">
      {/* Subtle decorative gradient at the top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#008000] via-[#FFD700] to-[#008000]" />

      {/* Decorative blob */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#008000] rounded-full mix-blend-multiply filter blur-[128px] opacity-[0.07]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-[128px] opacity-[0.05]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Profile */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-white/10 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Logo Sekolah"
                  fill
                  className="object-cover"
                  sizes="48px"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.classList.add("bg-gradient-to-br", "from-[#008000]", "to-[#006400]", "flex", "items-center", "justify-center");
                      parent.innerHTML = '<span class="text-white font-bold text-xl">A</span>';
                    }
                  }}
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">
                  {siteConfig.shortName}
                </h3>
                <p className="text-slate-500 text-xs font-medium">
                  Islamic School Bin Baz 5
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Membangun generasi rabbani yang berakhlak mulia, berprestasi
              akademik, dan mandiri melalui pendidikan Islam yang komprehensif.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#1877F2] flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#FF0000] flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                aria-label="YouTube"
              >
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-8 h-0.5 bg-[#FFD700] rounded-full" />
              Navigasi
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-[#FFD700] transition-colors duration-200"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-8 h-0.5 bg-[#FFD700] rounded-full" />
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-[#FFD700] shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  {siteConfig.contact.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-[#FFD700] shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-[#FFD700] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 mt-6 px-5 py-2.5 bg-[#25D366] hover:bg-[#22c55e] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#25D366]/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              <MessageCircle className="w-4.5 h-4.5" />
              Chat via WhatsApp
            </a>
          </div>

          {/* Column 4: Map / Additional Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-8 h-0.5 bg-[#FFD700] rounded-full" />
              Unit Pendidikan
            </h4>
            <div className="space-y-3">
              {siteConfig.units.map((unit) => (
                <Link
                  key={unit}
                  href={`/${unit}`}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#008000]/20 flex items-center justify-center text-[#FFD700] font-bold text-xs group-hover:bg-[#008000]/40 transition-colors">
                    {unit}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">
                      Unit {unit}
                    </p>
                    <p className="text-xs text-slate-500">
                      Lihat informasi →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} {siteConfig.institutionName}. Hak Cipta
              Dilindungi.
            </p>
            <p className="text-slate-600 text-xs flex items-center gap-1">
              Dibuat dengan <Heart className="w-3 h-3 text-red-500 fill-red-500" /> oleh{" "}
              <a
                href="https://seribudigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#FFD700] transition-colors"
              >
                Seribu Digital
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
