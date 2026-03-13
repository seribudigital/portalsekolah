import ProtectedRoute from "@/components/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN_UNIT"]}>
            <div className="flex min-h-screen flex-col bg-muted/40 font-sans">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                    <aside className="hidden md:block z-40 relative border-r">
                        <Sidebar />
                    </aside>
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
