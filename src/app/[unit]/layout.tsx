import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig, UNIT_THEMES } from "@/config/site-config";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { SubNavbar } from "@/components/layout/SubNavbar";

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const unit = resolvedParams.unit.toUpperCase();
    return {
        title: {
            template: `%s | Unit ${unit} | ${siteConfig.institutionName}`,
            default: `Beranda | Unit ${unit} | ${siteConfig.institutionName}`,
        },
        description: `Informasi dan Portal Administrasi Terpadu Unit ${unit} di ${siteConfig.institutionName}.`,
    };
}

export default async function UnitLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ unit: string }>;
}) {
    const resolvedParams = await params;
    const unit = resolvedParams.unit.toUpperCase();

    // Validate unit
    if (!siteConfig.units.includes(unit)) {
        notFound();
    }

    const theme = UNIT_THEMES[unit as keyof typeof UNIT_THEMES] || { primary: siteConfig.colors.primary, accent: siteConfig.colors.secondary };

    return (
        <div
            className="min-h-screen bg-slate-50 flex flex-col"
            style={{
                '--unit-primary': theme.primary,
                '--unit-accent': theme.accent,
            } as React.CSSProperties}
        >
            {/* Header / Hero */}
            <header className="relative bg-unit-primary text-white py-12 md:py-16 px-4 overflow-hidden shrink-0">
                {/* Subtle decorative background pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] md:bg-cover"></div>
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-unit-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

                <div className="relative max-w-5xl mx-auto">
                    <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 md:mb-8 transition font-medium backdrop-blur-sm bg-black/10 px-4 py-2 rounded-full text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Portal Utama
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-3 md:mb-4 tracking-tight drop-shadow-md">
                        Unit <span className="text-unit-accent">{unit}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-sm font-medium">
                        Seputar Informasi dan Administrasi Terpadu.
                    </p>
                </div>
            </header>

            {/* Sub-Navbar (Client Component with horizontal scroll on mobile) */}
            <SubNavbar unit={unit} />

            {/* Main Content Area */}
            <main className="flex-grow w-full">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 border-t-4 border-unit-primary text-slate-400 py-8 text-center shrink-0 relative">
                <p>© {new Date().getFullYear()} {siteConfig.institutionName} - Unit {unit}.</p>
                <Link href="/login" className="absolute bottom-4 right-4 text-[10px] text-slate-800 hover:text-slate-600 transition-colors opacity-50">
                    admin access
                </Link>
            </footer>
        </div>
    );
}
