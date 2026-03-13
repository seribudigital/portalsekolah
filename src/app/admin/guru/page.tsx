"use client";

import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Wrench } from "lucide-react";

export default function GuruPage() {
    const { userData } = useAuth();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-primary">Data Guru & Staff</h1>
                <p className="text-muted-foreground">Kelola data guru dan staff administrasi.</p>
            </div>

            <Card className="shadow-sm border-t-4 border-t-primary">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        Daftar Guru & Staff {userData?.unit !== "ALL" ? `Unit ${userData?.unit}` : "Keseluruhan"}
                    </CardTitle>
                    <CardDescription className="mt-1">
                        Fitur sedang dalam tahap pengembangan.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
                        <div className="p-4 bg-muted rounded-full">
                            <Wrench className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <div className="space-y-2 max-w-sm">
                            <h3 className="text-xl font-semibold">Segera Hadir</h3>
                            <p className="text-muted-foreground text-sm">
                                Modul pengelolaan Guru & Staff saat ini sedang dibangun. Silakan kembali lagi nanti setelah pembaruan berikutnya.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
