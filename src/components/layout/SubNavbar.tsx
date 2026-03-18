"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
    const [isSticky, setIsSticky] = useState(false);
    const [logoError, setLogoError] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the sentinel is ABOVE the intersection box (rootMargin: -72px), it means we've scrolled past it.
                // We check the bounding client rect top relative to the offset to be sure.
                const sticky = entry.boundingClientRect.top < 72 && !entry.isIntersecting;
                
                setIsSticky(sticky);
                
                // Dispatch event to main Navbar
                window.dispatchEvent(new CustomEvent("navbar-toggle", { 
                    detail: { hide: sticky } 
                }));
            },
            { threshold: [0], rootMargin: "-72px 0px 0px 0px" } 
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, []);

    return (
        <>
            {/* Sentinel for sticky detection - placed exactly where SubNavbar starts */}
            <div ref={sentinelRef} className="h-px w-full pointer-events-none" />

            <div className={cn(
                "sticky z-40 w-full transition-all duration-300 ease-in-out",
                isSticky ? "top-0" : "top-16 md:top-[72px]"
            )}>
                {/* Glassmorphism Background */}
                <div className={cn(
                    "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all duration-300",
                    isSticky ? "py-1.5 shadow-md" : "py-2"
                )}>
                    <div className="max-w-7xl mx-auto px-4 flex items-center h-12 md:h-14">
                        {/* Unit Identity - Visible only when sticky */}
                        <div className={cn(
                            "flex items-center gap-3 transition-all duration-500 ease-in-out overflow-hidden origin-left",
                            isSticky ? "max-w-[200px] opacity-100 mr-4" : "max-w-0 opacity-0 mr-0"
                        )}>
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 ring-2 ring-unit-primary/20 bg-unit-primary flex items-center justify-center">
                                {!logoError ? (
                                    <Image
                                        src="/logo.png"
                                        alt="Logo"
                                        fill
                                        className="object-cover"
                                        sizes="32px"
                                        onError={() => setLogoError(true)}
                                    />
                                ) : (
                                    <span className="text-white text-xs font-bold">{unit[0]}</span>
                                )}
                            </div>
                            <span className="font-bold text-slate-800 text-sm whitespace-nowrap">
                                Unit {unit}
                            </span>
                        </div>

                        {/* Centered Nav Layer */}
                        <div className="flex-1 flex justify-center overflow-hidden">
                            <nav className="flex items-center gap-1 md:gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide py-1 px-2">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "group flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold transition-all duration-200 rounded-xl relative whitespace-nowrap",
                                                isActive
                                                    ? "text-unit-primary bg-unit-primary/5"
                                                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                                            )}
                                        >
                                            <item.icon className={cn(
                                                "w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:scale-110",
                                                isActive ? "text-unit-accent" : "text-slate-400 group-hover:text-slate-600"
                                            )} />
                                            {item.label}
                                            
                                            {/* Active Indicator */}
                                            {isActive && (
                                                <div className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-unit-accent rounded-full shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                        
                        {/* Hidden Spacer for Symmetry on Desktop when Identity is shown */}
                        <div className={cn(
                            "transition-all duration-500 overflow-hidden shrink-0",
                            isSticky ? "hidden lg:block lg:w-48" : "w-0"
                        )} />
                    </div>
                </div>
            </div>
        </>
    );
}
