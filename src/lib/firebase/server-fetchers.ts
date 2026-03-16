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
            // Dynamically import to avoid build-time crashes if env vars are missing
            const { getAdminDb } = await import("./admin");
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
        } catch (error) {
            console.error("[getSiswaByUnit] Firebase Admin error:", error);
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
