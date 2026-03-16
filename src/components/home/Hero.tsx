import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site-config';

export function Hero() {
  return (
    <section className="relative bg-slate-50 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 hidden lg:block -skew-x-12 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 pt-32 pb-20 md:pt-40 md:pb-32">
          {/* Left Column: Text Content */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs md:text-sm font-bold text-blue-700 tracking-wider uppercase">
                Tahun Ajaran 2024/2025
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Membangun Generasi <br className="hidden md:block" />
                <span className="text-blue-600">Rabbani & Berprestasi</span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Selamat datang di {siteConfig.institutionName}. Kami menghadirkan pendidikan berkualitas yang memadukan nilai keislaman dan keunggulan akademik untuk masa depan cemerlang.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link 
                href="/pendaftaran" 
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 text-center"
              >
                Daftar Sekarang
              </Link>
              <Link 
                href="/kurikulum" 
                className="w-full sm:w-auto px-10 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 text-center shadow-sm"
              >
                Lihat Kurikulum
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-[2.5rem] blur-2xl group-hover:bg-blue-600/20 transition-colors duration-500"></div>
            <div className="relative aspect-[4/3] md:aspect-video lg:aspect-square w-full bg-slate-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1523050335191-c896bd208ad3?q=80&w=2070&auto=format&fit=crop"
                alt="Al-Khoir Islamic School Activities"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Terakreditasi</p>
                  <p className="text-sm font-bold text-slate-900">Grade A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
