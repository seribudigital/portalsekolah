import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { pageContentQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { siteConfig } from "@/config/site-config";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { ScrollAnimate } from "@/components/ui/ScrollAnimate";

export default async function ProfilPage({ params }: { params: Promise<{ unit: string }> }) {
    const resolvedParams = await params;
    const unit = resolvedParams.unit.toUpperCase();

    // Validate unit
    if (!siteConfig.units.includes(unit)) {
        notFound();
    }

    // Fetch profiling data from Sanity
    const profileData = await client.fetch(pageContentQuery, { slug: "profil", unit });

    return (
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-100 p-8 md:p-16">
                <ScrollAnimate animation="fade-in" duration="duration-700">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 border-l-4 border-unit-accent pl-6 mb-12 tracking-tight">
                        {profileData?.title || `Profil & Kurikulum Unit ${unit}`}
                    </h2>
                </ScrollAnimate>

                {profileData?.content ? (
                    <div className="prose prose-slate max-w-none prose-a:text-unit-primary">
                        <PortableText
                            value={profileData.content}
                            components={{
                                block: {
                                    normal: ({ children }) => (
                                        <ScrollAnimate animation="slide-up" duration="duration-700">
                                            <p className="mb-8 text-lg md:text-xl text-slate-700 leading-loose font-medium font-sans">
                                                {children}
                                            </p>
                                        </ScrollAnimate>
                                    ),
                                    h2: ({ children }) => (
                                        <ScrollAnimate animation="fade-in">
                                            <h2 className="text-3xl font-bold text-slate-800 mt-12 mb-6 tracking-tight">{children}</h2>
                                        </ScrollAnimate>
                                    ),
                                    h3: ({ children }) => (
                                        <ScrollAnimate animation="fade-in">
                                            <h3 className="text-2xl font-semibold text-slate-800 mt-10 mb-4">{children}</h3>
                                        </ScrollAnimate>
                                    ),
                                    blockquote: ({ children }) => (
                                        <ScrollAnimate animation="slide-up">
                                            <blockquote className="border-l-4 border-unit-primary pl-8 italic text-xl md:text-2xl text-slate-600 my-10 py-4 bg-slate-50/50 rounded-r-2xl leading-relaxed">
                                                {children}
                                            </blockquote>
                                        </ScrollAnimate>
                                    ),
                                },
                                types: {
                                    image: ({ value }) => {
                                        if (!value?.asset?._ref) {
                                            return null
                                        }
                                        return (
                                            <ScrollAnimate animation="fade-in" duration="duration-1000">
                                                <div className="relative w-full h-96 md:h-[500px] my-12 rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-900/5">
                                                    <Image
                                                        src={urlForImage(value).fit('max').auto('format').url()}
                                                        alt="Profile Image"
                                                        fill
                                                        className="object-cover transition-transform hover:scale-105 duration-700"
                                                    />
                                                </div>
                                            </ScrollAnimate>
                                        )
                                    }
                                }
                            }}
                        />
                    </div>
                ) : (
                    <ScrollAnimate animation="fade-in">
                        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <p className="text-slate-500 text-lg">Konten profil belum diisi untuk Unit {unit}. Silakan tambahkan melalui Sanity Studio (Schema: pageContent, Slug: profil).</p>
                        </div>
                    </ScrollAnimate>
                )}
            </div>
        </div>
    );
}
