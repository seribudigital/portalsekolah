import { unstable_cache } from "next/cache";
import { getAdminDb } from "./admin";

export interface PublicSiswa {
    id: string;
    namaLengkap: string;
    kelas: string;
    status: string;
}

/**
 * Fetch all students for a specific unit, server-side with caching.
 * Tagged with 'daftar-siswa' for on-demand revalidation.
 * Only re-fetches from Firestore when revalidateTag('daftar-siswa') is called.
 */
export const getSiswaByUnit = unstable_cache(
    async (unit: string): Promise<PublicSiswa[]> => {
        const adminDb = getAdminDb();
        const snapshot = await adminDb
            .collection("siswa")
            .where("unit", "==", unit)
            .get();

        const students: PublicSiswa[] = snapshot.docs
            .map((doc) => ({
                id: doc.id,
                namaLengkap: doc.data().namaLengkap as string,
                kelas: doc.data().kelas as string,
                status:
                    doc.data().status === "AKTIF"
                        ? "Aktif"
                        : (doc.data().status as string) || "Aktif",
            }))
            .sort((a, b) => a.namaLengkap.localeCompare(b.namaLengkap));

        return students;
    },
    ["siswa-by-unit"], // cache key prefix
    {
        tags: ["daftar-siswa"],
        // No revalidate time — only revalidated on-demand via revalidateTag
    }
);
