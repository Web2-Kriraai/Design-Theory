'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    MessageSquare,
    Mail,
    LogOut,
    ChevronRight,
    Compass,
    X
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Enquiries", href: "/enquiries", icon: MessageSquare },
    { label: "Subscribers", href: "/newsletter", icon: Mail },
];

export default function Sidebar({ isOpen, onClose }) {
    const pathname = usePathname();

    return (
        <aside className={cn(
            "w-80 min-h-screen bg-white border-r border-[#EAE6DF] flex flex-col p-10 fixed left-0 top-0 h-full z-50 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            {/* Mobile Close Button */}
            <button
                onClick={onClose}
                className="lg:hidden absolute top-10 right-10 text-[#CCC] hover:text-[#2D2926] transition-colors"
            >
                <X size={20} />
            </button>
            {/* Studio Branding */}
            <div className="mb-20">
                <Link href="/" className="group inline-block">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-px bg-[#31275c] group-hover:w-12 transition-all duration-700" />
                        <span className="text-[10px] uppercase tracking-[0.6em] font-sans font-bold text-[#31275c]">Studio</span>
                    </div>
                    <h2 className="text-3xl font-serif text-[#2D2926] italic tracking-tight leading-none">Theory</h2>
                </Link>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1">
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-sans font-bold text-[#CCC]">System Navigation</span>
                    <div className="flex-1 h-px bg-[#F9F7F2]" />
                </div>

                <div className="space-y-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-between group px-5 py-4 rounded-none transition-all duration-500 relative overflow-hidden",
                                    isActive
                                        ? "bg-[#2D2926] text-white"
                                        : "text-[#9e9690] hover:text-[#2D2926] hover:bg-[#F9F7F2]"
                                )}
                            >
                                <div className="flex items-center gap-5 relative z-10">
                                    <item.icon
                                        size={18}
                                        strokeWidth={isActive ? 2 : 1.2}
                                        className={cn(
                                            "transition-colors duration-500",
                                            isActive ? "text-[#31275c]" : "text-[#CCC] group-hover:text-[#31275c]"
                                        )}
                                    />
                                    <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-bold">{item.label}</span>
                                </div>
                                <ChevronRight
                                    size={12}
                                    className={cn(
                                        "transition-all duration-500 z-10",
                                        isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                    )}
                                />
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 w-1 h-full bg-[#31275c] z-10"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Footer Section */}
            <div className="pt-10 border-t border-[#EAE6DF]">
                <div className="mb-8">
                    <div className="p-6 bg-[#F9F7F2] border border-[#EAE6DF] relative group overflow-hidden">
                        <Compass className="absolute -right-4 -bottom-4 text-[#31275c]/10 w-24 h-24 group-hover:rotate-45 transition-transform duration-1000" />
                        <p className="text-[9px] uppercase tracking-widest text-[#31275c] font-sans font-bold mb-2">Live Environment</p>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                            </div>
                            <p className="text-[10px] font-sans text-[#2D2926] font-bold tracking-widest uppercase">Encryption Active</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-5 px-5 py-4 w-full text-[#9e9690] hover:text-red-600 transition-all duration-500 group border border-transparent hover:border-red-100"
                >
                    <LogOut size={18} strokeWidth={1.2} className="group-hover:rotate-12 transition-transform" />
                    <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-bold">Studio Log-out</span>
                </button>

                <div className="mt-8 text-center text-[9px] text-[#CCC] uppercase tracking-[0.4em] font-bold">
                    © 2024 Design Theory
                </div>
            </div>
        </aside>
    );
}
