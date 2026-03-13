"use client";

import { useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, GraduationCap, School, BookOpen, UserCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
    const { userData } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        ALL: 0,
        TK: 0,
        SD: 0,
        MTS: 0,
        MA: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            if (!userData) return;

            try {
                let q = query(collection(db, "siswa"));
                if (userData.role === "ADMIN_UNIT") {
                    q = query(collection(db, "siswa"), where("unit", "==", userData.unit));
                }
                const snapshot = await getDocs(q);

                let total = 0;
                let tk = 0;
                let sd = 0;
                let mts = 0;
                let ma = 0;

                snapshot.forEach((doc) => {
                    const unit = doc.data().unit;
                    if (doc.data().status === "AKTIF") {
                        total++;
                        if (unit === "TK") tk++;
                        if (unit === "SD") sd++;
                        if (unit === "MTS") mts++;
                        if (unit === "MA") ma++;
                    }
                });

                setStats({
                    ALL: total,
                    TK: tk,
                    SD: sd,
                    MTS: mts,
                    MA: ma,
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex h-full min-h-[50vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    const cards = [
        { title: "Total Siswa Aktif", value: stats.ALL, icon: Users, color: "text-primary", bg: "bg-primary/10" },
        { title: "Unit TK", value: stats.TK, icon: UserCheck, color: "text-secondary", bg: "bg-secondary/20" },
        { title: "Unit SD", value: stats.SD, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
        { title: "Unit MTs", value: stats.MTS, icon: School, color: "text-secondary", bg: "bg-secondary/20" },
        { title: "Unit MA", value: stats.MA, icon: GraduationCap, color: "text-primary", bg: "bg-primary/10" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                <p className="text-muted-foreground">
                    Ringkasan data siswa Al-Khoir Islamic School Bin Baz 5
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, idx) => (
                    <Card key={idx} className={`shadow-sm border-t-4 ${card.title === "Total Siswa Aktif" ? "border-t-primary lg:col-span-3 md:col-span-2" : (idx % 2 !== 0 ? "border-t-secondary" : "border-t-primary")}`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {card.title}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${card.bg}`}>
                                <card.icon className={`h-5 w-5 ${card.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{card.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Siswa Aktif Terdaftar
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
