"use client";

import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/config/site-config";
import { School, LogOut, Loader2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/Sidebar";

export function Header() {
    const { user, userData, signOut } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow">
            <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger className="md:hidden mr-2 p-2 hover:bg-slate-100/20 rounded-md transition-colors">
                            <Menu className="h-6 w-6" />
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                            <Sidebar isMobile />
                        </SheetContent>
                    </Sheet>
                    <School className="h-6 w-6 hidden md:block" />
                    <span className="text-lg font-bold tracking-tight">
                        {siteConfig.institutionName}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    {userData ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end text-sm">
                                <span className="font-medium leading-none">{user?.email}</span>
                                <span className="text-primary-foreground/80 mt-1 capitalize text-xs">
                                    {userData.role.replace("_", " ").toLowerCase()}
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={signOut}
                                title="Logout"
                                className="hover:bg-primary-foreground/20 rounded-full"
                            >
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
