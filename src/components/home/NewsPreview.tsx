import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const dummyNews = [
  {
    id: 1,
    title: 'Penerimaan Santri Baru Tahun Ajaran 2026/2027 Resmi Dibuka',
    date: '15 Mar 2026',
    category: 'Pendaftaran',
    excerpt:
      'Pendaftaran santri baru untuk semua jenjang (TK, SD, MTs, MA) telah dibuka. Segera daftarkan putra-putri Anda untuk mendapatkan pendidikan terbaik.',
    gradient: 'from-emerald-400 to-teal-500',
    bgPattern: 'bg-emerald-50',
  },
  {
    id: 2,
    title: 'Wisuda Tahfidz: 32 Santri Berhasil Menyelesaikan 30 Juz',
    date: '8 Mar 2026',
    category: 'Prestasi',
    excerpt:
      'Alhamdulillah, 32 santri dari jenjang MTs dan MA telah berhasil menyelesaikan hafalan 30 juz Al-Quran dalam wisuda tahfidz tahun ini.',
    gradient: 'from-blue-400 to-indigo-500',
    bgPattern: 'bg-blue-50',
  },
  {
    id: 3,
    title: 'Juara Umum Olimpiade Sains Nasional Tingkat Kabupaten',
    date: '1 Mar 2026',
    category: 'Prestasi',
    excerpt:
      'Tim olimpiade sains berhasil meraih juara umum dalam Olimpiade Sains Nasional tingkat kabupaten. Selamat kepada para santri berprestasi!',
    gradient: 'from-amber-400 to-orange-500',
    bgPattern: 'bg-amber-50',
  },
];

export function NewsPreview() {
  return (
    <section className="bg-slate-50 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block bg-[#FFD700]/20 text-amber-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Informasi Terkini
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Berita <span className="text-[#008000]">Terbaru</span>
            </h2>
          </div>
          <Link
            href="#berita"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#008000] hover:text-emerald-700 transition-colors"
          >
            Lihat Semua Berita
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyNews.map((news) => (
            <article
              key={news.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image Placeholder with gradient */}
              <div
                className={`relative h-48 bg-gradient-to-br ${news.gradient} flex items-center justify-center overflow-hidden`}
              >
                {/* Decorative circles */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10" />
                <div className="absolute bottom-6 left-6 w-12 h-12 rounded-full bg-white/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/5" />

                {/* Category Badge on Image */}
                <span className="relative z-10 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {news.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Date */}
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <time className="text-xs font-medium text-slate-400">
                    {news.date}
                  </time>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-800 mb-3 leading-snug group-hover:text-[#008000] transition-colors line-clamp-2">
                  {news.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4 flex-1">
                  {news.excerpt}
                </p>

                {/* Read More */}
                <div className="pt-3 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#008000] group-hover:gap-2.5 transition-all">
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
