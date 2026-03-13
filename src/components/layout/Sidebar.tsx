"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    Users,
    DatabaseBackup,
    GraduationCap,
    FileText,
    Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
    isMobile?: boolean;
}

export function Sidebar({ isMobile }: SidebarProps) {
    const pathname = usePathname();
    const { userData } = useAuth();

    const links = [
        {
            title: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
            roles: ["SUPER_ADMIN", "ADMIN_UNIT"],
        },
        {
            title: "Data Siswa",
            href: "/admin/siswa",
            icon: Users,
            roles: ["SUPER_ADMIN", "ADMIN_UNIT"],
        },
        {
            title: "Guru & Staff",
            href: "/admin/guru",
            icon: GraduationCap,
            roles: ["SUPER_ADMIN", "ADMIN_UNIT"],
        },
        {
            title: "Database Seeder",
            href: "/admin/seed",
            icon: DatabaseBackup,
            roles: ["SUPER_ADMIN"]
        },
        {
            title: "Postingan & Galeri",
            href: "/admin/content",
            icon: ImageIcon,
            roles: ["SUPER_ADMIN", "ADMIN_UNIT"]
        }
    ];

    const visibleLinks = links.filter((link) => {
        if (!userData) return false;
        return link.roles.includes(userData.role);
    });

    return (
        <div className={cn("flex h-full flex-col border-r bg-card text-card-foreground", isMobile ? "w-full" : "w-64 hidden md:flex")}>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid items-start px-4 text-sm font-medium gap-2">
                    {visibleLinks.map((link, index) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:text-primary",
                                    isActive
                                        ? "bg-secondary text-secondary-foreground font-semibold"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "")} />
                                {link.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
