import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { portalQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { siteConfig } from "@/config/site-config";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { BookOpen, Users, GraduationCap } from "lucide-react";
import { Metadata } from 'next';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: `Portal Informasi | ${siteConfig.institutionName}`,
  description: 'Portal resmi informasi pendaftaran, kegiatan, dan berita Al-Khoir Islamic School Bin Baz 5.',
};

export default async function Home() {
  const posts = await client.fetch(portalQuery);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Header / Hero */}
      <header className="relative min-h-[65vh] flex items-center justify-center text-white py-24 px-4 md:px-8 shadow-2xl overflow-hidden">
        {/* Background Image */}
        <Image 
          src="/heroportal.jpeg" 
          alt="School Hero" 
          fill 
          priority 
          className="object-cover object-center scale-105 animate-slow-zoom"
        />
        
        {/* Multi-layered overlay for premium feel and text legibility */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#008000]/40 via-transparent to-[#b8860b]/40"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center gap-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-md">
              Portal <span className="text-[#FFD700]">Madrasah</span>
            </h1>
            <p className="text-lg md:text-2xl text-green-50 max-w-3xl drop-shadow-sm font-medium">
              Selamat datang di pusat informasi dan administrasi resmi {siteConfig.institutionName}.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 w-full md:w-auto">
            {siteConfig.units.map(unit => (
              <Link key={unit} href={`/${unit}`} className="bg-white/10 hover:bg-[#FFD700] hover:text-[#008000] border border-white/20 hover:border-transparent backdrop-blur-md transition-all duration-300 ease-in-out px-8 py-4 rounded-2xl font-bold text-xl text-white shadow-lg hover:shadow-2xl hover:-translate-y-1">
                Unit {unit}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Keunggulan / Mengapa Al-Khoir */}
      <section className="bg-white py-20 px-4 md:px-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#008000] drop-shadow-sm mb-4">Kenapa Memilih {siteConfig.shortName}?</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Membangun generasi rabbani yang berakhlak mulia, berprestasi akademik, dan mandiri.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="bg-[#008000]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#008000] transition-colors">
                <BookOpen className="w-8 h-8 text-[#008000] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Kurikulum Tahfidz</h3>
              <p className="text-slate-600 leading-relaxed">Program hafalan Al-Qur'an terstruktur dengan target yang jelas, dibimbing oleh muhaffizh bersanad.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="bg-[#FFD700]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FFD700] transition-colors">
                <GraduationCap className="w-8 h-8 text-[#b8860b] group-hover:text-amber-900 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Akademik Berkualitas</h3>
              <p className="text-slate-600 leading-relaxed">Pendidikan berstandar nasional dipadukan dengan wawasan keislaman yang komprehensif.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="bg-[#008000]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#008000] transition-colors">
                <Users className="w-8 h-8 text-[#008000] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Pembinaan Akhlak</h3>
              <p className="text-slate-600 leading-relaxed">Fokus pada adab dan karakter berbasis Sunnah di lingkungan sekolah dan asrama.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Portal News */}
      <main id="berita" className="max-w-6xl mx-auto py-12 px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-800 border-l-4 border-[#FFD700] pl-4">Berita & Informasi Utama</h2>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
            <p className="text-slate-500 text-lg">Belum ada berita yang dipublikasikan saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <article key={post._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col group">
                {post.mainImage && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={urlForImage(post.mainImage)?.url() || ""}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1 relative bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gradient-to-r from-[#FFD700] to-[#e6c200] text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      Portal Utama
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                      {post.publishedAt ? format(new Date(post.publishedAt), "d MMM yyyy", { locale: id }) : "Baru saja"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#008000] transition-colors">{post.title}</h3>
                  <div className="text-slate-600 line-clamp-3 text-sm leading-relaxed mb-4">
                    {post.body ? <PortableText value={post.body} /> : "Tidak ada detail konten untuk saat ini."}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Professional Footer */}
      <Footer />
    </div>
  );
}
