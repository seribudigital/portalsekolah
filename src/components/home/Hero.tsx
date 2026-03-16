import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site-config';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-16 overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1523050853064-80786a893452?q=80&w=2070&auto=format&fit=crop"
          alt="School Environment"
          fill
          className="object-cover opacity-40 scale-105 animate-pulse-slow"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">
              Tahun Ajaran 2024/2025
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Membangun Generasi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Rabbani & Berprestasi
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
              Selamat datang di {siteConfig.institutionName}. Kami berkomitmen memberikan pendidikan berkualitas yang mengintegrasikan nilai-nilai Islam dengan keunggulan akademik.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/pendaftaran" 
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1 text-center"
            >
              Daftar Sekarang
            </Link>
            <Link 
              href="/kurikulum" 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 text-center"
            >
              Lihat Kurikulum
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
}
