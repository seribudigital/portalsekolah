import { unstable_cache } from "next/cache";

export interface PublicSiswa {
    id: string;
    namaLengkap: string;
    kelas: string;
    status: string;
}

/**
 * Fetch all students for a specific unit, server-side with caching.
 * Tagged with 'daftar-siswa' for on-demand revalidation.
 * Returns empty array gracefully if Firebase Admin is not configured.
 */
export const getSiswaByUnit = unstable_cache(
    async (unit: string): Promise<PublicSiswa[]> => {
        try {
            // Import client SDK
            const { db } = await import("./index");
            const { collection, getDocs, query, where } = await import("firebase/firestore");
            
            const q = query(collection(db, "siswa"), where("unit", "==", unit));
            const snapshot = await getDocs(q);

            const students: PublicSiswa[] = [];
            snapshot.forEach((doc) => {
                students.push({
                    id: doc.id,
                    namaLengkap: doc.data().namaLengkap as string,
                    kelas: doc.data().kelas as string,
                    status:
                        doc.data().status === "AKTIF"
                            ? "Aktif"
                            : (doc.data().status as string) || "Aktif",
                });
            });

            return students.sort((a, b) => a.namaLengkap.localeCompare(b.namaLengkap));
        } catch (error) {
            console.error("[getSiswaByUnit] Firebase Client error:", error);
            // Return empty array instead of crashing the page
            return [];
        }
    },
    ["siswa-by-unit"], // cache key prefix
    {
        tags: ["daftar-siswa"],
        // No revalidate time — only revalidated on-demand via revalidateTag
    }
);
