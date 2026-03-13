"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PublicSiswa {
    id: string;
    namaLengkap: string;
    kelas: string;
    status: string;
}

export function ClientSiswaTable({ unit }: { unit: string }) {
    const [students, setStudents] = useState<PublicSiswa[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        async function fetchStudents() {
            try {
                const q = query(
                    collection(db, "siswa"),
                    where("unit", "==", unit)
                );
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    namaLengkap: doc.data().namaLengkap,
                    kelas: doc.data().kelas,
                    status: doc.data().status === "AKTIF" ? "Aktif" : (doc.data().status || "Aktif")
                })).sort((a, b) => a.namaLengkap.localeCompare(b.namaLengkap));
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStudents();
    }, [unit]);

    if (loading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" />
                ))}
            </div>
        );
    }

    // Pagination Logic
    const totalPages = Math.ceil(students.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentStudents = students.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-semibold">
                        <tr>
                            <th className="px-6 py-4">No</th>
                            <th className="px-6 py-4">Nama Lengkap</th>
                            <th className="px-6 py-4">Kelas</th>
                            <th className="px-6 py-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {currentStudents.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                    Data siswa untuk Unit {unit} belum tersedia.
                                </td>
                            </tr>
                        ) : (
                            currentStudents.map((siswa, index) => (
                                <tr key={siswa.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-400">
                                        {startIndex + index + 1}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-slate-800">
                                        {siswa.namaLengkap}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200">
                                            {siswa.kelas}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${siswa.status === "Aktif"
                                            ? "bg-green-100 text-green-700"
                                            : siswa.status === "Lulus"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-orange-100 text-orange-700"
                                            }`}>
                                            {siswa.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                    <span className="text-sm text-slate-500">
                        Menampilkan <span className="font-semibold text-slate-700">{startIndex + 1}</span> - <span className="font-semibold text-slate-700">{Math.min(startIndex + itemsPerPage, students.length)}</span> dari <span className="font-semibold text-slate-700">{students.length}</span> Siswa
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
