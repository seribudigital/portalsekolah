"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/config/site-config";

interface UnitHeroProps {
    unit: string;
    title?: string;
    description?: string;
}

export function UnitHero({ unit, title, description }: UnitHeroProps) {
    const pathname = usePathname();
    const lowerUnit = unit.toLowerCase();
    
    // Dynamic Hero Logic
    const heroImage = `/hero${lowerUnit}.jpg`;

    // Breadcrumb Logic
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;
        
        // Map common segments to readable labels
        let label = segment.charAt(0) + segment.slice(1);
        if (segment.toUpperCase() === unit.toUpperCase()) label = `Unit ${unit.toUpperCase()}`;
        if (segment === "profil") label = "Profil & Kurikulum";
        if (segment === "pengajar") label = "Pengajar";
        if (segment === "siswa") label = "Daftar Siswa";
        if (segment === "galeri") label = "Galeri";
        if (segment === "cari") label = "Cari Siswa";

        return { label, href, isLast };
    });

    return (
        <section className="relative min-h-[40vh] flex items-center overflow-hidden">
            {/* Background Image with Dynamic Logic */}
            <div 
                className="absolute inset-0 z-0 bg-slate-900"
                style={{
                    backgroundImage: `url('${heroImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Dark Overlay for Contrast */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
                
                {/* Gradient overlay for better bottom transition */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 md:py-20 lg:py-24">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-white/70 text-sm mb-6 md:mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                        <Home className="w-4 h-4" />
                        <span className="hidden sm:inline">Beranda</span>
                    </Link>
                    {breadcrumbs.map((crumb, idx) => (
                        <div key={crumb.href} className="flex items-center space-x-2">
                            <ChevronRight className="w-4 h-4 opacity-50" />
                            {crumb.isLast ? (
                                <span className="text-[#FFD700] font-semibold drop-shadow-sm">
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link href={crumb.href} className="hover:text-white transition-colors">
                                    {crumb.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Hero Text */}
                <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
                        {title || `Unit ${unit.toUpperCase()}`}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl drop-shadow-md">
                        {description || "Portal Informasi dan Administrasi Terpadu untuk kemajuan pendidikan."}
                    </p>
                    
                    {/* Decorative accent line */}
                    <div className="w-24 h-1.5 bg-[#FFD700] rounded-full mt-8 shadow-lg shadow-[#FFD700]/20"></div>
                </div>
            </div>
            
            {/* Subtle bottom decorative pattern overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
        </section>
    );
}
