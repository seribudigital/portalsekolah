"use client";

import { useState } from "react";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { Search, Loader2 } from "lucide-react";

interface PublicSiswa {
    id: string;
    namaLengkap: string;
    kelas: string;
    status: string;
}

export function ClientCariSiswa({ unit }: { unit: string }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState<PublicSiswa[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Client-side quick search (Case insensitive approximation using regex matching if pulling all, but we will fetch all unit students once to allow fast searching, as Firebase case-insensitive search requires specific architectural setups).
    // Given SD has 240 students, we can safely pull them all and filter locally for a lightning-fast UX.
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        setHasSearched(true);

        try {
            const q = query(
                collection(db, "siswa"),
                where("unit", "==", unit)
            );
            const snapshot = await getDocs(q);

            const allStudentsInUnit = snapshot.docs.map(doc => ({
                id: doc.id,
                namaLengkap: doc.data().namaLengkap,
                kelas: doc.data().kelas,
                status: doc.data().status === "AKTIF" ? "Aktif" : (doc.data().status || "Aktif")
            }));

            // Perform case-insensitive local search
            const lowerQuery = searchQuery.toLowerCase().trim();
            const filtered = allStudentsInUnit.filter(siswa =>
                siswa.namaLengkap.toLowerCase().includes(lowerQuery)
            );

            setResults(filtered);
        } catch (error) {
            console.error("Error searching students:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative flex items-center mb-8">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-full text-lg shadow-sm focus:ring-2 focus:ring-unit-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-800"
                        placeholder={`Ketik nama siswa Unit ${unit}...`}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading || !searchQuery.trim()}
                    className="absolute right-2 px-6 py-2.5 bg-unit-primary text-white font-semibold rounded-full hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Cari"}
                </button>
            </form>

            {hasSearched && !loading && results && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-semibold text-slate-800">Hasil Pencarian</h3>
                        <span className="text-sm font-medium bg-slate-200 text-slate-600 px-3 py-1 rounded-full">{results.length} ditemukan</span>
                    </div>

                    {results.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            Maaf, tidak ditemukan siswa dengan nama <span className="font-semibold text-slate-700">"{searchQuery}"</span> di Unit {unit}.
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {results.map(siswa => (
                                <div key={siswa.id} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-800">{siswa.namaLengkap}</h4>
                                        <p className="text-sm text-slate-500 font-medium mt-1">Siswa Unit {unit}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-sm font-bold border border-slate-200">
                                            Kelas {siswa.kelas}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${siswa.status === "Aktif"
                                            ? "bg-green-100 text-green-700"
                                            : siswa.status === "Lulus"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-orange-100 text-orange-700"
                                            }`}>
                                            {siswa.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
