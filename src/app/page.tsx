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
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";


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

      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats />


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
