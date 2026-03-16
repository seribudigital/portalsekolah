import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site-config';

export function Hero() {
  return (
    <section className="relative bg-slate-50 overflow-hidden border-b border-slate-100">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-600/5 hidden lg:block -skew-x-12 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 pt-28 pb-16 md:pt-36 md:pb-24">
          {/* Left Column: Text Content */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-[10px] md:text-xs font-bold text-blue-700 tracking-wider uppercase">
                Tahun Ajaran 2024/2025
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Membangun Generasi <br className="hidden md:block" />
                <span className="text-blue-600">Rabbani & Berprestasi</span>
              </h1>
              <p className="text-sm md:text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                Selamat datang di {siteConfig.institutionName}. Kami menghadirkan pendidikan berkualitas yang memadukan nilai keislaman dan keunggulan akademik.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link 
                href="/pendaftaran" 
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center"
              >
                Daftar Sekarang
              </Link>
              <Link 
                href="/kurikulum" 
                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 text-center shadow-sm"
              >
                Lihat Kurikulum
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-1/2 relative group px-2 sm:px-0">
            <div className="absolute -inset-2 bg-blue-600/5 rounded-[2rem] blur-xl hidden md:block"></div>
            <div className="relative aspect-[4/3] md:aspect-video lg:aspect-[4/3] w-full bg-slate-200 rounded-2xl overflow-hidden shadow-xl border-2 border-white">
              <Image
                src="/heroportal.jpeg"
                alt="Al-Khoir Islamic School Activities"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

