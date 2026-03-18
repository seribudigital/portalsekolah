"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
    Newspaper, 
    BookOpen, 
    Users, 
    GraduationCap, 
    Image as ImageIcon, 
    Search 
} from "lucide-react";

interface SubNavbarProps {
    unit: string;
}

export function SubNavbar({ unit }: SubNavbarProps) {
    const pathname = usePathname();
    const lowerUnit = unit.toLowerCase();
    const basePath = `/${lowerUnit}`;

    const navItems = [
        { label: "Berita", href: basePath, icon: Newspaper },
        { label: "Profil & Kurikulum", href: `${basePath}/profil`, icon: BookOpen },
        { label: "Pengajar", href: `${basePath}/pengajar`, icon: Users },
        { label: "Daftar Siswa", href: `${basePath}/siswa`, icon: GraduationCap },
        { label: "Galeri", href: `${basePath}/galeri`, icon: ImageIcon },
        { label: "Cari Siswa", href: `${basePath}/cari`, icon: Search },
    ];

    return (
        <div className="sticky top-16 md:top-[72px] z-40 w-full transition-all duration-300">
            {/* Glassmorphism Background */}
            <div className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm shadow-black/5">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Scrollable Nav for Mobile */}
                    <nav className="flex items-center space-x-1 md:space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "group flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all duration-200 rounded-xl relative",
                                        isActive
                                            ? "text-unit-primary bg-unit-primary/5"
                                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/80"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "w-4 h-4 transition-transform group-hover:scale-110",
                                        isActive ? "text-unit-accent" : "text-slate-400 group-hover:text-slate-600"
                                    )} />
                                    {item.label}
                                    
                                    {/* Active Indicator (Glowing line) */}
                                    {isActive && (
                                        <div className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-unit-accent rounded-full shadow-[0_0_8px_rgba(255,215,0,0.6)] animate-in fade-in zoom-in-95 duration-300" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
}
