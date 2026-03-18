import { notFound } from "next/navigation";
import { siteConfig, UNIT_THEMES } from "@/config/site-config";
import { Metadata } from "next";
import { SubNavbar } from "@/components/layout/SubNavbar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UnitHero } from "@/components/layout/UnitHero";

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
            className="min-h-screen bg-slate-50 flex flex-col font-sans"
            style={{
                '--unit-primary': theme.primary,
                '--unit-accent': theme.accent,
            } as React.CSSProperties}
        >
            {/* Sticky Navbar Utama */}
            <Navbar />

            {/* Dynamic Unit Hero with Glassmorphism Overlay & Breadcrumbs */}
            <UnitHero unit={unit} />

            {/* Sub-Navbar Unit (Sticky under Main Navbar) */}
            <SubNavbar unit={unit} />

            {/* Main Content Area with consistent container */}
            <main className="flex-grow w-full py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </div>
            </main>

            {/* Professional Footer */}
            <Footer />
        </div>
    );
}
