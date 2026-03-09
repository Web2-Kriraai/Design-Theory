'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, Trash2, Mail, Phone, Calendar } from "lucide-react";
import useSWR, { mutate } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

// Custom hook for debouncing search input
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function EnquiriesPage() {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [page, setPage] = useState(1);

    const { data, isLoading: loading } = useSWR(
        `/api/enquiries?page=${page}&email=${debouncedSearch}`,
        fetcher,
        { keepPreviousData: true }
    );

    const enquiries = data?.enquiries || [];
    const totalPages = data?.totalPages || 1;

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to remove this enquiry?")) return;

        mutate(`/api/enquiries?page=${page}&email=${debouncedSearch}`, async () => {
            await fetch(`/api/enquiries?id=${id}`, { method: "DELETE" });
            return fetcher(`/api/enquiries?page=${page}&email=${debouncedSearch}`);
        }, { optimisticData: { enquiries: enquiries.filter(e => e._id !== id), totalPages } });
    };

    return (
        <div className="max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <span className="script-font text-[#7C3AED] text-2xl block mb-2">Management</span>
                    <h1 className="text-4xl font-serif text-[#2D2926]">Project Enquiries</h1>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" size={18} />
                    <input
                        type="text"
                        placeholder="Search by email..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-[#EAE6DF] focus:border-[#7C3AED] outline-none rounded font-sans text-sm transition-colors"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    />
                </div>
            </header>

            <div className="bg-white rounded-lg border border-[#EAE6DF] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F9F7F2] border-bottom border-[#EAE6DF]">
                                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#999]">Client</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#999]">Contact Intel</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#999]">Project Type</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#999]">Submission</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F9F7F2]">
                            <AnimatePresence mode="popLayout">
                                {enquiries.map((enquiry, idx) => (
                                    <motion.tr
                                        key={enquiry._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-[#FDFCFB] transition-colors group"
                                    >
                                        <td className="px-6 py-5">
                                            <p className="font-serif text-[#2D2926] text-base">{enquiry.firstName} {enquiry.lastName}</p>
                                        </td>
                                        <td className="px-6 py-5 space-y-1">
                                            <div className="flex items-center gap-2 text-xs text-[#6B6560]">
                                                <Mail size={12} className="text-[#7C3AED]" />
                                                {enquiry.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-[#6B6560]">
                                                <Phone size={12} className="text-[#7C3AED]" />
                                                {enquiry.phoneNumber}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-[#F9F7F2] text-[#7C3AED] border border-[#EAE6DF] rounded font-bold">
                                                {enquiry.projectType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-xs text-[#9e9690]">
                                                <Calendar size={12} />
                                                {new Date(enquiry.createdAt).toLocaleDateString("en-US", {
                                                    month: "short", day: "numeric", year: "numeric"
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button
                                                onClick={() => handleDelete(enquiry._id)}
                                                className="p-2 text-[#999] hover:text-red-500 hover:bg-red-50 rounded transition-all"
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

                {enquiries.length === 0 && !loading && (
                    <div className="py-20 text-center">
                        <span className="script-font text-[#7C3AED] text-2xl block mb-2">Quiet Studio</span>
                        <p className="text-xs uppercase tracking-widest text-[#999]">No enquiries found matching your criteria</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="px-6 py-4 bg-[#F9F7F2] flex items-center justify-between border-t border-[#EAE6DF]">
                    <p className="text-[10px] uppercase tracking-widest text-[#999] font-bold">
                        Page {page} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="p-2 border border-[#EAE6DF] rounded bg-white hover:bg-[#F9F7F2] disabled:opacity-30 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="p-2 border border-[#EAE6DF] rounded bg-white hover:bg-[#F9F7F2] disabled:opacity-30 transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
