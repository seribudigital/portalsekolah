import { BookOpen, Users, GraduationCap, School } from 'lucide-react';
import { siteConfig } from '@/config/site-config';

const features = [
  {
    title: 'Kurikulum Terintegrasi',
    description:
      'Memadukan kurikulum nasional dengan program tahfidz Al-Quran dan kajian keislaman secara komprehensif.',
    icon: BookOpen,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    hoverIconBg: 'group-hover:bg-emerald-600',
  },
  {
    title: 'Fasilitas Modern',
    description:
      'Ruang kelas ber-AC, laboratorium lengkap, perpustakaan digital, dan area olahraga terpadu.',
    icon: School,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    hoverIconBg: 'group-hover:bg-blue-600',
  },
  {
    title: 'Lingkungan Islami',
    description:
      'Suasana belajar penuh adab, pembiasaan ibadah harian, dan pembinaan akhlak berbasis Sunnah.',
    icon: Users,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    hoverIconBg: 'group-hover:bg-amber-500',
  },
  {
    title: 'Akademik Berprestasi',
    description:
      'Lulusan berdaya saing tinggi, aktif dalam olimpiade sains, dan berprestasi di kompetisi nasional.',
    icon: GraduationCap,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    hoverIconBg: 'group-hover:bg-rose-600',
  },
];

export function Features() {
  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#008000]/10 text-[#008000] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Keunggulan Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Kenapa Memilih{' '}
            <span className="text-[#008000]">{siteConfig.shortName}</span>?
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Membangun generasi rabbani yang berakhlak mulia, berprestasi
            akademik, dan mandiri.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-slate-50/80 p-7 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-default"
            >
              {/* Decorative gradient blob */}
              <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-[#008000]/5 to-[#FFD700]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div
                className={`${feature.iconBg} ${feature.hoverIconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300`}
              >
                <feature.icon
                  className={`w-7 h-7 ${feature.iconColor} group-hover:text-white transition-colors duration-300`}
                />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
