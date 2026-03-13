import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { galleryQuery } from "@/sanity/lib/queries";
import { siteConfig } from "@/config/site-config";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ImageIcon } from "lucide-react";

export default async function GaleriPage({ params }: { params: Promise<{ unit: string }> }) {
    const resolvedParams = await params;
    const unit = resolvedParams.unit.toUpperCase();

    // Validate unit
    if (!siteConfig.units.includes(unit)) {
        notFound();
    }

    // Fetch gallery images from Sanity
    const photos = await client.fetch(galleryQuery, { unit });

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 drop-shadow-sm flex items-center justify-center gap-3">
                    <ImageIcon className="w-8 h-8 text-unit-accent" />
                    Galeri <span className="text-unit-primary">Kegiatan</span>
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Koleksi foto dan dokumentasi berbagai kegiatan menarik di Unit {unit} {siteConfig.institutionName}.
                </p>
                <div className="w-24 h-1 bg-unit-accent mx-auto mt-6 rounded-full"></div>
            </div>

            {photos.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-lg">Belum ada foto kegiatan yang diunggah untuk Unit {unit}.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((photo: any) => (
                        <div key={photo._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 group">
                            <div className="relative h-64 w-full overflow-hidden">
                                {photo.image ? (
                                    <Image
                                        src={urlForImage(photo.image)?.width(800).height(600).fit('crop').url() || ""}
                                        alt={photo.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-slate-400" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <h3 className="text-white font-bold text-lg mb-1 leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {photo.title}
                                    </h3>
                                    <p className="text-slate-300 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        {photo.date ? format(new Date(photo.date), "dd MMMM yyyy", { locale: id }) : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
