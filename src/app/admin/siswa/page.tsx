"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { columns, Siswa } from "./columns";
import { DataTable } from "./data-table";
import { SiswaForm } from "./siswa-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Loader2, Plus } from "lucide-react";

export default function SiswaPage() {
    const { userData } = useAuth();
    const [data, setData] = useState<Siswa[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);

    async function fetchSiswa() {
        if (!userData) return;
        setLoading(true);

        try {
            let q;
            const siswaRef = collection(db, "siswa");

            // RBAC Logic
            if (userData.role === "SUPER_ADMIN" || userData.unit === "ALL") {
                // Fetch all
                q = query(siswaRef);
            } else if (userData.role === "ADMIN_UNIT") {
                // Fetch only their unit
                q = query(
                    siswaRef,
                    where("unit", "==", userData.unit)
                );
            } else {
                // Fail safe
                setLoading(false);
                return;
            }

            const querySnapshot = await getDocs(q);
            const students: Siswa[] = [];

            querySnapshot.forEach((doc) => {
                students.push({ id: doc.id, ...doc.data() } as Siswa);
            });

            setData(students);
        } catch (error) {
            console.error("Error fetching siswa:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSiswa();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-primary">Data Siswa</h1>
                <p className="text-muted-foreground">Kelola data induk siswa aktif maupun alumni.</p>
            </div>

            <Card className="shadow-sm border-t-4 border-t-primary">
                <CardHeader className="pb-4 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            Daftar Siswa {userData?.unit !== "ALL" ? `Unit ${userData?.unit}` : "Keseluruhan"}
                        </CardTitle>
                        <CardDescription className="mt-1">
                            {loading ? "Memuat data dari server..." : `Total ${data.length} siswa ditemukan.`}
                        </CardDescription>
                    </div>

                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Siswa
                        </Button>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Tambah Siswa Baru</DialogTitle>
                                <DialogDescription>
                                    Masukkan detail siswa baru. Klik simpan setelah selesai.
                                </DialogDescription>
                            </DialogHeader>
                            <SiswaForm
                                currentAdminUnit={userData?.unit}
                                onSuccess={() => {
                                    setIsAddOpen(false);
                                    fetchSiswa();
                                }}
                                onCancel={() => setIsAddOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
                        </div>
                    ) : (
                        <DataTable columns={columns} data={data} allowEdit={true} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
