import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site-config";
import { ClientSiswaTable } from "./ClientSiswaTable";
import { getSiswaByUnit } from "@/lib/firebase/server-fetchers";

export default async function SiswaPublicPage({ params }: { params: Promise<{ unit: string }> }) {
    const resolvedParams = await params;
    const unit = resolvedParams.unit.toUpperCase();

    // Validate unit
    if (!siteConfig.units.includes(unit)) {
        notFound();
    }

    // Fetch data on the server — cached & tagged with 'daftar-siswa'
    // Only re-fetches when revalidateTag('daftar-siswa') is called from admin
    const students = await getSiswaByUnit(unit);

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 drop-shadow-sm">
                    Daftar <span className="text-unit-primary">Siswa</span>
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Daftar nama dan kelas siswa yang berstatus aktif maupun alumni di Unit {unit}.
                </p>
                <div className="w-24 h-1 bg-unit-accent mx-auto mt-6 rounded-full"></div>
            </div>

            <ClientSiswaTable students={students} unit={unit} />
        </div>
    );
}
