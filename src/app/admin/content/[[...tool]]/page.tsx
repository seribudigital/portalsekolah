"use client";

import { useAuth } from "@/context/AuthContext";
import { UNIT_THEMES } from "@/config/site-config";
import { NextStudio } from "next-sanity/studio";
import baseConfig from "../../../../../sanity.config";
import { AlertCircle } from "lucide-react";

export default function AdminContentPage() {
    const { userData } = useAuth();
    
    // Safety check unit, default to TK theme if ALL or undefined
    const unit = userData?.unit && userData.unit !== "ALL" ? userData.unit : "TK";
    const themeColor = UNIT_THEMES[unit as keyof typeof UNIT_THEMES]?.primary || '#000000';

    return (
        <div className="flex flex-col gap-4 w-full h-full min-h-[80vh]">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Postingan & Galeri</h1>
                <p className="text-muted-foreground w-full flex items-center gap-2 p-3 bg-blue-50 text-blue-800 rounded-md text-sm border border-blue-200">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>
                        <strong>Catatan Login:</strong> Jika panel di bawah meminta login, silakan gunakan akun Google yang telah didaftarkan. Anda hanya perlu login satu kali.
                    </span>
                </p>
            </div>
            
            <div 
                className="flex-1 w-full rounded-lg overflow-hidden border-2 shadow-sm relative z-0" 
                style={{ borderColor: themeColor }}
            >
                {/* z-0 ensures the sanity studio doesn't overlap with the sidebar/header (which should be higher z-index) */}
                {/* Override basePath for this specific route so Sanity internal routing works properly */}
                <NextStudio config={{ ...baseConfig, basePath: '/admin/content' }} />
            </div>
        </div>
    );
}
