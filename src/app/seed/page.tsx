"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db, auth } from "@/lib/firebase";
import { collection, doc, writeBatch } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { DatabaseBackup, Loader2, CheckCircle2 } from "lucide-react";
// import ProtectedRoute from "@/components/ProtectedRoute";

export default function SeedPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [success, setSuccess] = useState(false);

    // Constants mapping logic from SEED_DATA.md
    const generateData = () => {
        let data: any[] = [];

        const tingkatList = [
            { unit: "TK", prefixes: ["TK A", "TK B"], total: 40 },
            { unit: "SD", prefixes: ["1", "2", "3", "4", "5", "6"], total: 240 },
            { unit: "MTS", prefixes: ["7", "8", "9"], total: 120 },
            { unit: "MA", prefixes: ["10", "11", "12"], total: 120 }
        ];

        tingkatList.forEach((tingkat) => {
            const perRombel = 20;
            tingkat.prefixes.forEach((kelas) => {
                ["A", "B"].forEach((rombel) => {
                    for (let i = 1; i <= perRombel; i++) {
                        const noUrut = i.toString().padStart(2, '0');
                        data.push({
                            namaLengkap: `Siswa ${kelas} ${rombel} - ${noUrut}`,
                            unit: tingkat.unit,
                            kelas: kelas,
                            rombel: rombel,
                            status: "AKTIF",
                            nisn: `00${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`
                        });
                    }
                });
            });
        });

        return data;
    };

    const handleSeed = async () => {
        setLoading(true);
        setSuccess(false);
        setStatus("Generating 520 student records...");

        try {
            const students = generateData();

            setStatus("Creating SUPER_ADMIN user account & document...");
            try {
                const userCred = await createUserWithEmailAndPassword(auth, "admin@alkhoir.sch.id", "admin123");

                const batchAdmin = writeBatch(db);
                const adminRef = doc(db, "users", userCred.user.uid);
                batchAdmin.set(adminRef, {
                    uid: userCred.user.uid,
                    email: "admin@alkhoir.sch.id",
                    displayName: "Administrator Al-Khoir",
                    role: "SUPER_ADMIN",
                    unit: "ALL"
                });
                await batchAdmin.commit();
            } catch (authErr: any) {
                if (authErr.code === 'auth/email-already-in-use') {
                    console.log("Admin auth already exists, skipping creation");
                    setStatus("Admin account exists, proceeding to students...");
                } else {
                    throw authErr;
                }
            }

            setStatus(`Executing batch writes for ${students.length} students...`);
            const sizeList = 500;
            for (let i = 0; i < students.length; i += sizeList) {
                const chunk = students.slice(i, i + sizeList);
                const batch = writeBatch(db);

                chunk.forEach(student => {
                    const newDocRef = doc(collection(db, "siswa"));
                    batch.set(newDocRef, student);
                });

                await batch.commit();
                setStatus(`Batch ${i / sizeList + 1} completed (${chunk.length} items)...`);
            }

            setStatus("Data seeded successfully!");
            setSuccess(true);
        } catch (error: any) {
            console.error(error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-xl mx-auto mt-10 space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-primary">Database Seeder</h1>
                <p className="text-muted-foreground">Internal page to initialize system data.</p>

                <Card className="border-secondary/20 shadow-md">
                    <CardHeader className="bg-secondary/10">
                        <CardTitle className="flex items-center gap-2">
                            <DatabaseBackup className="w-5 h-5 text-primary" />
                            Initialize Demo Data
                        </CardTitle>
                        <CardDescription>
                            This script will create 1 Admin Auth account and 520 Student records in Firestore.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <ul className="list-disc pl-5 space-y-1 mb-6 text-sm">
                            <li>Create `admin@alkhoir.sch.id` (SUPER_ADMIN)</li>
                            <li>Add 40 TK Students</li>
                            <li>Add 240 SD Students</li>
                            <li>Add 120 MTs Students</li>
                            <li>Add 120 MA Students</li>
                        </ul>

                        <div className="space-y-4">
                            <Button
                                onClick={handleSeed}
                                disabled={loading || success}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                            >
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {success ? "Seeding Completed" : "Start Database Seeding"}
                            </Button>

                            {status && (
                                <div className={`p-4 rounded-md text-sm font-medium ${success ? "bg-green-50 text-green-700 border border-green-200" : "bg-muted text-muted-foreground"}`}>
                                    {success && <CheckCircle2 className="inline-block mr-2 w-4 h-4" />}
                                    {status}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
