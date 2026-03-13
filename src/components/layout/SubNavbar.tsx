"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SubNavbarProps {
    unit: string;
}

export function SubNavbar({ unit }: SubNavbarProps) {
    const pathname = usePathname();
    const lowerUnit = unit.toLowerCase();

    const basePath = `/${lowerUnit}`;

    const navItems = [
        { label: "Berita", href: basePath },
        { label: "Profil & Kurikulum", href: `${basePath}/profil` },
        { label: "Pengajar", href: `${basePath}/pengajar` },
        { label: "Daftar Siswa", href: `${basePath}/siswa` },
        { label: "Galeri", href: `${basePath}/galeri` },
        { label: "Cari Siswa", href: `${basePath}/cari` },
    ];

    return (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
            <div className="max-w-5xl mx-auto px-4">
                {/* Scrollable Container for Mobile */}
                <nav className="flex space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide py-3 md:py-0 md:h-14 md:items-center -mb-px">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors px-1 py-2 md:py-4 border-b-2",
                                    isActive
                                        ? "border-unit-accent text-unit-primary drop-shadow-sm"
                                        : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
