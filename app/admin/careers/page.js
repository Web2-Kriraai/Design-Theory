'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Briefcase, Clock, CheckCircle, XCircle } from 'lucide-react';

const STATUS_COLORS = {
    new: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', label: 'New' },
    reviewing: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', label: 'Reviewing' },
    shortlisted: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', label: 'Shortlisted' },
    rejected: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', label: 'Rejected' },
};

export default function AdminCareersPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await fetch('/api/careers');
                const data = await res.json();
                if (data.applications) setApplications(data.applications);
            } catch (err) {
                console.error('Failed to fetch career applications:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const updateStatus = async (id, status) => {
        setUpdating(id);
        try {
            await fetch(`/api/careers/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            setApplications((prev) =>
                prev.map((app) => (app._id === id ? { ...app, status } : app))
            );
        } catch (err) {
            console.error('Failed to update status:', err);
        } finally {
            setUpdating(null);
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: 'easeOut' } }),
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-12 h-px bg-[#31275c] animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#31275c] font-bold">
                        Loading Applications
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-px bg-[#31275c]" />
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#31275c] font-bold font-sans">
                        Admin Panel
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <h1 className="text-5xl lg:text-6xl font-serif text-[#2D2926] leading-tight">
                        Career <i>Applications</i>
                    </h1>
                    <span className="text-[10px] uppercase tracking-widest font-bold font-sans text-[#999] bg-white border border-[#EAE6DF] px-4 py-2 self-start sm:self-auto">
                        {applications.length} Total
                    </span>
                </div>
            </motion.div>

            {/* Applications List */}
            {applications.length === 0 ? (
                <div className="text-center py-24">
                    <Briefcase size={40} className="text-[#E8E3DB] mx-auto mb-6" />
                    <p className="font-serif text-2xl text-[#9A9490] font-light italic">
                        No applications yet.
                    </p>
                    <p className="text-[0.8rem] uppercase tracking-widest text-[#CCC8C3] font-bold font-sans mt-3">
                        Submissions will appear here
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {applications.map((app, i) => {
                        const s = STATUS_COLORS[app.status] || STATUS_COLORS.new;
                        return (
                            <motion.div
                                key={app._id}
                                variants={fadeUp}
                                initial="hidden"
                                animate="show"
                                custom={i}
                                className="bg-white border border-[#E8E3DB] p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 hover:border-[#31275c] transition-colors duration-300"
                            >
                                {/* Applicant Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h2 className="font-serif text-2xl text-[#2D2926] font-light">
                                            {app.name}
                                        </h2>
                                        <span className={`text-[9px] uppercase tracking-widest font-bold font-sans px-2 py-1 border ${s.bg} ${s.text} ${s.border}`}>
                                            {s.label}
                                        </span>
                                    </div>
                                    <p className="text-[0.8rem] uppercase tracking-[0.15em] text-[#31275c] font-bold font-sans mb-3">
                                        {app.designation}
                                    </p>
                                    <div className="flex flex-wrap gap-6 text-[0.75rem] text-[#9A9490] font-sans">
                                        <span>📧 {app.email}</span>
                                        <span>📞 {app.contact}</span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={10} />
                                            {new Date(app.createdAt).toLocaleDateString('en-IN', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    {app.message && (
                                        <p className="mt-3 text-[0.82rem] text-[#6B6560] font-sans leading-relaxed line-clamp-2">
                                            {app.message}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 flex-shrink-0">
                                    {app.attachmentUrl && (
                                        <a
                                            href={app.attachmentUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-bold font-sans text-[#31275c] border border-[#31275c] px-4 py-2 hover:bg-[#31275c] hover:text-white transition-all duration-300"
                                        >
                                            <ExternalLink size={10} />
                                            View Resume
                                        </a>
                                    )}
                                    <select
                                        value={app.status}
                                        disabled={updating === app._id}
                                        onChange={(e) => updateStatus(app._id, e.target.value)}
                                        className="text-[9px] uppercase tracking-[0.2em] font-bold font-sans text-[#2D2926] border border-[#E8E3DB] px-3 py-2 bg-white cursor-pointer hover:border-[#31275c] transition-colors outline-none"
                                    >
                                        <option value="new">New</option>
                                        <option value="reviewing">Reviewing</option>
                                        <option value="shortlisted">Shortlisted</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
