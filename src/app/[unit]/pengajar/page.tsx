import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { guruQuery } from "@/sanity/lib/queries";
import { siteConfig } from "@/config/site-config";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

export default async function PengajarPage({ params }: { params: Promise<{ unit: string }> }) {
    const resolvedParams = await params;
    const unit = resolvedParams.unit.toUpperCase();

    // Validate unit
    if (!siteConfig.units.includes(unit)) {
        notFound();
    }

    // Fetch teachers data from Sanity
    const teachers = await client.fetch(guruQuery, { unit });

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 drop-shadow-sm">
                    Tenaga <span className="text-unit-primary">Pengajar</span>
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Mengenal lebih dekat asatidzah dan tenaga pengajar berkompeten di Unit {unit} {siteConfig.institutionName}.
                </p>
                <div className="w-24 h-1 bg-unit-accent mx-auto mt-6 rounded-full"></div>
            </div>

            {teachers.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-lg">Belum ada data pengajar yang ditambahkan untuk Unit {unit}.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {teachers.map((guru: any) => (
                        <div key={guru._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col items-center text-center p-6">
                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-4 border-slate-50 shadow-md group-hover:border-unit-primary transition-colors duration-300">
                                {guru.image ? (
                                    <Image
                                        src={urlForImage(guru.image)?.width(400).height(400).fit('crop').url() || ""}
                                        alt={guru.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                    />
                                ) : (
                                    // Elegant placeholder silhouette
                                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-slate-400 group-hover:text-slate-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-unit-primary transition-colors">{guru.name}</h3>
                            <p className="text-sm text-slate-500 font-medium mb-2">{guru.mapel}</p>
                            <span className="mt-auto px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full font-semibold">
                                Unit {unit}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
