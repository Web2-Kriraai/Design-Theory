'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    MessageSquare,
    Mail,
    ArrowUpRight,
    User,
    Clock,
    Activity,
    Layers,
    Shield
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalEnquiries: 0,
        totalSubscribers: 0,
    });
    const [latestEnquiry, setLatestEnquiry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/dashboard/stats");
                const data = await res.json();
                if (data.stats) {
                    setStats(data.stats);
                    setLatestEnquiry(data.latestEnquiry);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.165, 0.84, 0.44, 1]
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-12 h-px bg-[#31275c] animate-[width_2s_ease-in-out_infinite]" />
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#31275c] font-bold">Initializing Archive</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col lg:flex-row justify-between lg:items-end gap-8 mb-16"
            >
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-[#31275c]" />
                        <span className="text-[10px] uppercase tracking-[0.5em] text-[#31275c] font-bold">Studio Matrix | v1.0</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-serif text-[#2D2926] leading-[1.1] tracking-tight">
                        Editorial <br /><i>Archive</i>
                    </h1>
                </div>
                <div className="flex flex-col items-start lg:items-end gap-2">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#999] font-bold font-sans">System Integrity</p>
                    <div className="px-4 py-2 bg-white border border-[#EAE6DF] flex items-center gap-3 shadow-sm">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#2D2926]">Access: Secure</span>
                    </div>
                </div>
            </motion.div>

            {/* CTA Card - Square */}
            <motion.div
                variants={item}
                className="md:col-span-2 lg:col-span-2 bg-[#31275c] p-10 flex flex-col justify-between text-white group cursor-pointer hover:bg-[#2D2926] transition-colors duration-700"
            >
                <div>
                    <h3 className="text-3xl font-serif leading-tight mb-4">System <br />Maintenance</h3>
                    <p className="text-white/80 text-xs font-sans leading-relaxed tracking-wide">
                        Periodic cleanup of redundant archival data and legacy configurations.
                    </p>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-white/20">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Optimization Log</span>
                    <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
            </motion.div>
        </div>
    );
}
