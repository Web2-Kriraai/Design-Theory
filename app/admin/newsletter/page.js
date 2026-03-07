'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Download, CheckCircle2, Mail, Calendar } from "lucide-react";

export default function NewsletterPage() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/newsletter");
            const data = await res.json();
            setSubscribers(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Unsubscribe this user?")) return;
        try {
            const res = await fetch(`/api/newsletter?id=${id}`, { method: "DELETE" });
            if (res.ok) fetchSubscribers();
        } catch (err) {
            console.error(err);
        }
    };

    const exportCSV = () => {
        const headers = ["Email", "Subscription Date"];
        const rows = subscribers.map(s => [
            s.email,
            new Date(s.subscribedAt).toISOString()
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <span className="script-font text-[#B89E7B] text-2xl block mb-2">The Inner Circle</span>
                    <h1 className="text-4xl font-serif text-[#2D2926]">Newsletter Subscribers</h1>
                </div>

                <button
                    onClick={exportCSV}
                    disabled={subscribers.length === 0}
                    className="flex items-center gap-3 px-6 py-3 bg-[#2D2926] text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#B89E7B] transition-colors rounded disabled:opacity-50"
                >
                    <Download size={14} />
                    Export CSV
                </button>
            </header>

            <div className="bg-white rounded-lg border border-[#EAE6DF] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F9F7F2] border-bottom border-[#EAE6DF]">
                                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#999]">Subscriber Address</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#999]">Status</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#999]">Joined Date</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F9F7F2]">
                            <AnimatePresence mode="popLayout">
                                {subscribers.map((sub, idx) => (
                                    <motion.tr
                                        key={sub._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="hover:bg-[#FDFCFB] transition-colors"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3 text-sm font-sans text-[#2D2926]">
                                                <Mail size={14} className="text-[#B89E7B]" />
                                                {sub.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#4CAF50] font-bold">
                                                <CheckCircle2 size={12} />
                                                Active
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-xs text-[#9e9690] font-sans">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={12} />
                                                {new Date(sub.subscribedAt).toLocaleDateString("en-US", {
                                                    month: "long", year: "numeric"
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button
                                                onClick={() => handleDelete(sub._id)}
                                                className="p-2 text-[#999] hover:text-red-500 rounded transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {subscribers.length === 0 && !loading && (
                    <div className="py-20 text-center">
                        <span className="script-font text-[#B89E7B] text-2xl block mb-2">Quiet List</span>
                        <p className="text-xs uppercase tracking-widest text-[#999]">No subscribers currently active</p>
                    </div>
                )}
            </div>
        </div>
    );
}
