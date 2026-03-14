import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site-config";
import { ClientCariSiswa } from "./ClientCariSiswa";
import { getSiswaByUnit } from "@/lib/firebase/server-fetchers";

export default async function CariSiswaPage({ params }: { params: Promise<{ unit: string }> }) {
    const resolvedParams = await params;
    const unit = resolvedParams.unit.toUpperCase();

    // Validate unit
    if (!siteConfig.units.includes(unit)) {
        notFound();
    }

    // Fetch data on the server — cached & tagged with 'daftar-siswa'
    const allStudents = await getSiswaByUnit(unit);

    return (
        <div className="max-w-5xl mx-auto py-12 px-4 min-h-[60vh]">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 drop-shadow-sm">
                    Pencarian <span className="text-unit-primary">Data Siswa</span>
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Masukkan nama siswa atau alumni untuk mencari informasi status dan kelas di Unit {unit}.
                </p>
                <div className="w-24 h-1 bg-unit-accent mx-auto mt-6 rounded-full mb-12"></div>
            </div>

            <ClientCariSiswa unit={unit} allStudents={allStudents} />
        </div>
    );
}
