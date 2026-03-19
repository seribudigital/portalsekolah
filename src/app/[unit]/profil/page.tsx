import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
import { ScrollAnimate } from "@/components/ui/ScrollAnimate";
import { BookOpen, CheckCircle, GraduationCap, HeartHandshake, Languages, Users } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const unit = resolvedParams.unit.toUpperCase();
    return {
        title: `Profil & Kurikulum | Unit ${unit} | ${siteConfig.institutionName}`,
        description: `Profil dan Kurikulum Unit ${unit} di ${siteConfig.institutionName}.`,
    };
}

export default async function ProfilPage({ params }: { params: Promise<{ unit: string }> }) {
    const resolvedParams = await params;
    const unit = resolvedParams.unit.toUpperCase();

    // Placeholder data that could later be fetched from Sanity
    const visiMisi = {
        visi: "Menjadi lembaga pendidikan Islam terdepan yang mengintegrasikan nilai-nilai Al-Qur'an dengan ilmu pengetahuan modern untuk mencetak generasi berprestasi dan berakhlak mulia.",
        misi: [
            "Menyelenggarakan pendidikan berkualitas yang memadukan kurikulum nasional dan kepesantrenan.",
            "Membina karakter peserta didik melalui pembiasaan ibadah dan adab islami.",
            "Mengembangkan potensi minat dan bakat peserta didik secara optimal.",
            "Mewujudkan lingkungan sekolah yang aman, nyaman, dan Islami."
        ],
        nilai: [
            { title: "Taqwa", desc: "Berpegang teguh pada ajaran tauhid dan syariat." },
            { title: "Adab", desc: "Mengutamakan akhlak mulia sebelum ilmu." },
            { title: "Prestasi", desc: "Berusaha menjadi yang terbaik dalam segala bidang." },
            { title: "Mandiri", desc: "Mampu berdiri sendiri dan bertanggung jawab." }
        ]
    };

    const keunggulan = [
        { icon: <BookOpen className="w-6 h-6" />, title: "Tahfidz Al-Qur'an", desc: "Program hafalan Al-Qur'an dengan target capaian yang terukur dan bersanad." },
        { icon: <Languages className="w-6 h-6" />, title: "Bahasa Arab & Inggris", desc: "Pembiasaan bahasa asing sebagai bahasa pengantar dalam lingkungan sekolah." },
        { icon: <GraduationCap className="w-6 h-6" />, title: "Kurikulum Terpadu", desc: "Integrasi antara kurikulum Kementerian Pendidikan dan kurikulum khusus kepesantrenan." },
        { icon: <CheckCircle className="w-6 h-6" />, title: "Fasilitas Berstandar", desc: "Dilengkapi laboratorium, perpustakaan, dan area olahraga yang mendukung bakat siswa." },
    ];

    const kurikulumData = [
        { kategori: "Pendidikan Agama", mapel: "Al-Qur'an Hadits, Aqidah Akhlak, Fiqih, SKI", alokasi: "8 Jam/Minggu" },
        { kategori: "Pendidikan Umum", mapel: "Matematika, IPA, IPS, PKn, Bahasa Indonesia", alokasi: "16 Jam/Minggu" },
        { kategori: "Bahasa", mapel: "Bahasa Arab, Bahasa Inggris, Bahasa Daerah", alokasi: "6 Jam/Minggu" },
        { kategori: "Pengembangan Diri", mapel: "Pramuka, Muhadharah, Ekstrakurikuler", alokasi: "4 Jam/Minggu" },
    ];

    return (
        <div className="w-full">
            {/* Section 1: Visi & Misi */}
            <section className="py-16 md:py-24">
                <ScrollAnimate>
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-unit-primary tracking-widest uppercase mb-3 text-center">Landasan Kami</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-center">Visi, Misi & Nilai Dasar</h3>
                    </div>
                </ScrollAnimate>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Visi */}
                    <div className="lg:col-span-5 relative group">
                        <ScrollAnimate delay={100} className="bg-white p-10 h-full rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-unit-primary/5 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-125"></div>
                            <div className="w-14 h-14 bg-unit-primary/10 rounded-2xl flex items-center justify-center mb-8 shrink-0">
                                <HeartHandshake className="w-7 h-7 text-unit-primary" />
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-4">Visi</h4>
                            <p className="text-slate-600 leading-relaxed text-lg flex-grow">{visiMisi.visi}</p>
                        </ScrollAnimate>
                    </div>

                    {/* Misi */}
                    <div className="lg:col-span-7">
                        <ScrollAnimate delay={200} className="bg-white p-10 h-full rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                            <h4 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Misi</h4>
                            <ul className="space-y-4">
                                {visiMisi.misi.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-unit-primary/10 flex items-center justify-center shrink-0">
                                            <CheckCircle className="w-4 h-4 text-unit-primary" />
                                        </div>
                                        <p className="text-slate-600 leading-relaxed">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </ScrollAnimate>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

            {/* Section 2: Keunggulan Akademik */}
            <section className="py-16 md:py-24">
                <ScrollAnimate>
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-unit-primary tracking-widest uppercase mb-3 text-center">Mengapa Memilih Kami</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-center">Keunggulan Akademik</h3>
                    </div>
                </ScrollAnimate>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {keunggulan.map((item, idx) => (
                        <div key={idx} className="h-full">
                            <ScrollAnimate delay={idx * 100} className="h-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 group-hover:bg-unit-primary transition-colors duration-500 flex items-center justify-center mb-6 text-unit-primary group-hover:text-white shrink-0">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </ScrollAnimate>
                        </div>
                    ))}
                </div>
            </section>

            {/* Subtle Divider with Pattern */}
            <div className="relative py-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-slate-200 border-dashed"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-slate-50 px-4 text-slate-400">
                        <BookOpen className="w-5 h-5 opacity-50" />
                    </span>
                </div>
            </div>

            {/* Section 3: Tabel Struktur Kurikulum */}
            <section className="py-16 md:py-24">
                <ScrollAnimate>
                    <div className="mb-12 max-w-3xl">
                        <h2 className="text-sm font-bold text-unit-primary tracking-widest uppercase mb-3">Peta Pembelajaran</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Struktur Kurikulum</h3>
                        <p className="mt-4 text-slate-600 text-lg leading-relaxed">
                            Alokasi waktu dan mata pelajaran disusun secara terukur untuk menyeimbangkan pencapaian akademis dan spiritual anak didik.
                        </p>
                    </div>
                </ScrollAnimate>

                <ScrollAnimate delay={200} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow className="hover:bg-slate-50">
                                <TableHead className="w-[30%] py-5 text-slate-900 font-bold px-6">Kategori</TableHead>
                                <TableHead className="w-[50%] py-5 text-slate-900 font-bold px-6">Mata Pelajaran Utama</TableHead>
                                <TableHead className="w-[20%] py-5 text-slate-900 font-bold text-right px-6">Alokasi Waktu</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kurikulumData.map((row, idx) => (
                                <TableRow key={idx} className="group">
                                    <TableCell className="font-medium text-slate-900 py-5 px-6 group-hover:text-unit-primary transition-colors">{row.kategori}</TableCell>
                                    <TableCell className="text-slate-600 py-5 px-6">{row.mapel}</TableCell>
                                    <TableCell className="text-slate-600 text-right py-5 text-sm font-medium px-6">
                                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">{row.alokasi}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollAnimate>
            </section>

            {/* Divider */}
            <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

            {/* Section 4: Metode Pembelajaran */}
            <section className="py-16 md:py-24">
                <ScrollAnimate className="bg-unit-primary/5 rounded-3xl p-8 md:p-16 border border-unit-primary/10 flex flex-col items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                        <div className="order-2 lg:order-1">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 border border-slate-100">
                                <Users className="w-7 h-7 text-unit-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">Metode Pembelajaran</h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                Kami menerapkan pendekatan <strong>Active Learning</strong> yang dipadukan dengan konsep <strong>Adab-First</strong>. Sebelum menerima transfer ilmu pengetahuan, peserta didik dibekali tata krama dan akhlak yang mulia.
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Pendekatan ini didukung dengan <em>Project Based Learning</em>, diskusi interaktif, dan pembiasaan ibadah sehari-hari untuk mengembangkan soft skill serta spiritualitas secara berkesinambungan.
                            </p>
                            <div className="mt-8 flex gap-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-unit-primary" />
                                    <span className="text-slate-700 font-medium">Interaktif</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-unit-primary" />
                                    <span className="text-slate-700 font-medium">Berbasis Proyek</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-unit-primary" />
                                    <span className="text-slate-700 font-medium">Spiritual & Adab</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative h-64 lg:h-full min-h-[300px] w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center text-slate-400 group">
                            {/* Decorative background for the illustration box */}
                            <div className="absolute inset-0 opacity-10 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'radial-gradient(var(--unit-primary) 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
                            <span className="font-medium relative z-10 flex flex-col items-center gap-4">
                                <div className="w-20 h-20 rounded-full bg-slate-50 border-4 border-white shadow-sm flex items-center justify-center">
                                    <GraduationCap className="w-10 h-10 text-slate-300 group-hover:text-unit-primary transition-colors duration-500" />
                                </div>
                                <span className="text-sm tracking-wider uppercase">Metode Integratif</span>
                            </span>
                        </div>
                    </div>
                </ScrollAnimate>
            </section>
        </div>
    );
}
