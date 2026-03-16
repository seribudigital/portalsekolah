import { siteConfig } from "@/config/site-config";
import { Metadata } from 'next';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Features } from "@/components/home/Features";
import { NewsPreview } from "@/components/home/NewsPreview";


export const metadata: Metadata = {
  title: `Portal Informasi | ${siteConfig.institutionName}`,
  description: 'Portal resmi informasi pendaftaran, kegiatan, dan berita Al-Khoir Islamic School Bin Baz 5.',
};

export default async function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats />

      {/* Features: Kenapa Memilih Kami */}
      <Features />

      {/* Berita Terbaru */}
      <NewsPreview />

      {/* Professional Footer */}
      <Footer />
    </div>
  );
}
