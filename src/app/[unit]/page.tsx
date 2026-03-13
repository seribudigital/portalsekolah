import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { unitQuery, pageContentQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ScrollAnimate } from "@/components/ui/ScrollAnimate";

export default async function UnitNewsPage({ params }: { params: Promise<{ unit: string }> }) {
    const resolvedParams = await params;
    const unit = resolvedParams.unit.toUpperCase();

    // Fetch posts specifically for this unit
    const posts = await client.fetch(unitQuery, { unit });

    // Fetch faqs from profil page content
    const profileData = await client.fetch(pageContentQuery, { slug: "profil", unit });
    const faqs = profileData?.faqs || [];

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-unit-accent pl-3">
                    Berita Terkini
                </h2>
            </div>

            {posts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-lg">Belum ada berita yang dipublikasikan untuk unit {unit} saat ini.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post: any) => (
                        <article key={post._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col group">
                            {post.mainImage && (
                                <div className="relative h-64 w-full overflow-hidden">
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
                                    <span className="bg-unit-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                        {unit}
                                    </span>
                                    <span className="text-sm text-slate-500 font-medium">
                                        {post.publishedAt ? format(new Date(post.publishedAt), "d MMM yyyy", { locale: id }) : "Baru saja"}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-unit-primary transition-colors">{post.title}</h3>
                                <div className="text-slate-600 line-clamp-3 text-sm leading-relaxed mb-4">
                                    {post.body ? <PortableText value={post.body} /> : "Tidak ada detail konten untuk saat ini."}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* FAQ Section */}
            {faqs.length > 0 && (
                <ScrollAnimate animation="slide-up" className="mt-24">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-slate-600 text-lg">Pertanyaan yang sering diajukan seputar Unit {unit}</p>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq: any, index: number) => (
                            <details key={index} className="group bg-white border border-slate-200 rounded-2xl open:shadow-lg transition-all duration-300">
                                <summary className="flex items-center justify-between cursor-pointer font-semibold text-slate-800 text-lg p-6 list-none appearance-none [&::-webkit-details-marker]:hidden">
                                    {faq.question}
                                    <span className="bg-slate-50 text-slate-400 group-open:bg-unit-primary group-open:text-white group-open:rotate-180 transition-all duration-300 rounded-full p-2 flex items-center justify-center shrink-0 ml-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed text-base border-t border-slate-50 animate-in fade-in slide-in-from-top-2 duration-300">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </ScrollAnimate>
            )}
        </div>
    );
}
