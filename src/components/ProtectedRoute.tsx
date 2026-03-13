"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth, Role, Unit } from "@/context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: Role[];
    allowedUnits?: Unit[];
}

export default function ProtectedRoute({
    children,
    allowedRoles,
    allowedUnits,
}: ProtectedRouteProps) {
    const { user, userData, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            if (!user || !userData) {
                // Not logged in or no firestore data
                if (pathname !== "/login") {
                    router.push("/login");
                }
            } else {
                // Logged in, check roles and units
                let hasAccess = true;

                if (allowedRoles && !allowedRoles.includes(userData.role)) {
                    hasAccess = false;
                }

                if (allowedUnits && !allowedUnits.includes(userData.unit)) {
                    // SUPER_ADMIN usually has 'ALL' unit, which overrides specific unit checks if logic requires
                    if (userData.unit !== "ALL") {
                        hasAccess = false;
                    }
                }

                if (!hasAccess) {
                    router.push("/unauthorized"); // Or back to a safe dashboard
                }
            }
        }
    }, [user, userData, loading, router, pathname, allowedRoles, allowedUnits]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    // Prevent rendering children if routing should happen soon
    if (!user || !userData) {
        return null;
    }

    return <>{children}</>;
}
