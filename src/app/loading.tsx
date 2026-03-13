import { siteConfig } from "@/config/site-config";
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="w-16 h-16 bg-[#008000]/10 rounded-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[#008000] animate-spin" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Memuat Portal {siteConfig.shortName}...</h2>
                <p className="text-sm text-slate-500">Mohon tunggu sebentar.</p>
            </div>
        </div>
    );
}
