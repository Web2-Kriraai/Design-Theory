'use client';

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import {
    ArrowUpRight, MessageSquare, Bell, LogOut,
    Activity, Users, Trash2, Eye, X, ChevronLeft, ChevronRight, Briefcase, Plus, Edit
} from "lucide-react";

import dynamic from "next/dynamic";

const fetcher = (url) => fetch(url).then((res) => res.json());

// Lazy load heavy components
const UploadForm = dynamic(() => import("../components/UploadForm"), {
    loading: () => <div style={{ padding: "40px", textAlign: "center", color: "#999", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.2em" }}>Loading Editor...</div>
});

/* ── tiny reusable stat card ── */
function StatCard({ icon, label, value, dark, gold }) {
    const bg = dark ? "#2D2926" : gold ? "#31275c" : "white";
    const fg = dark || gold ? "white" : "#2D2926";
    const accent = dark || gold ? "rgba(255,255,255,0.2)" : "#EAE6DF";

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260 }}
            style={{
                background: bg, border: `1px solid ${accent}`,
                padding: "36px", position: "relative", overflow: "hidden",
                boxShadow: "0 2px 20px rgba(45,41,38,0.04)"
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
                <div style={{ color: dark || gold ? "rgba(255,255,255,0.45)" : "#31275c" }}>{icon}</div>
                <ArrowUpRight size={14} color={dark || gold ? "rgba(255,255,255,0.2)" : "#ccc"} />
            </div>
            <div style={{ fontFamily: "var(--font-primary, serif)", fontSize: "clamp(2.5rem,4vw,4rem)", color: fg, lineHeight: 1, marginBottom: "10px" }}>
                {value}
            </div>
            <div style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.35em", color: dark || gold ? "rgba(255,255,255,0.5)" : "#31275c" }}>
                {label}
            </div>
        </motion.div>
    );
}

/* ── detail modal ── */
function DetailModal({ item, type, onClose }) {
    const fields = type === "enquiry"
        ? [
            { label: "Name", value: `${item.firstName || ""} ${item.lastName || ""}`.trim() },
            { label: "Email", value: item.email },
            { label: "Phone", value: item.phoneNumber },
            { label: "Project Type", value: item.projectType },
            { label: "Message", value: item.message },
            { label: "Submitted", value: item.createdAt ? new Date(item.createdAt).toLocaleString() : "—" },
        ]
        : type === "user"
            ? [
                { label: "Name", value: item.name },
                { label: "Email", value: item.email },
                { label: "Role", value: item.role },
                { label: "Created", value: item.createdAt ? new Date(item.createdAt).toLocaleString() : "—" },
            ]
            : [
                { label: "Email", value: item.email },
                { label: "Subscribed", value: item.subscribedAt ? new Date(item.subscribedAt).toLocaleString() : "—" },
            ];

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(45,41,38,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                style={{ background: "white", maxWidth: "520px", width: "100%", padding: "48px", position: "relative" }}
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", cursor: "pointer", color: "#999" }}>
                    <X size={18} />
                </button>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}> {/* Modified from original: display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" */}
                    <div style={{ width: "24px", height: "1px", background: "#31275c" }} /> {/* Changed from #7C3AED */}
                    <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4em", color: "#31275c" }}> {/* Changed from #7C3AED */}
                        {type.charAt(0).toUpperCase() + type.slice(1)} Details
                    </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {fields.map(f => (
                        <div key={f.label} style={{ borderBottom: "1px solid #F9F7F2", paddingBottom: "16px" }}>
                            <div style={{ fontFamily: "sans-serif", fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.35em", color: "#ccc", marginBottom: "6px" }}>
                                {f.label}
                            </div>
                            <div style={{ fontFamily: "sans-serif", fontSize: "0.9rem", color: "#2D2926", lineHeight: 1.6 }}>{f.value || "—"}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ── data table ── */
function DataTable({ rows, columns, onDelete, onEdit, onView, loading, emptyText = "No records found." }) {
    if (loading) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}> {/* Modified from original: padding: "60px", textAlign: "center" */}
                <div style={{ width: "32px", height: "1px", background: "#31275c", margin: "0 auto 16px" }} /> {/* Changed from #7C3AED */}
                <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4em", color: "#31275c" }}>Loading…</span> {/* Changed from #7C3AED */}
            </div>
        );
    }
    if (!rows.length) {
        return (
            <div style={{ padding: "60px", textAlign: "center", color: "#ccc", fontFamily: "sans-serif", fontSize: "0.85rem" }}>{emptyText}</div>
        );
    }
    return (
        <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif" }}>
                <thead>
                    <tr style={{ borderBottom: "2px solid #EAE6DF" }}>
                        {columns.map(c => (
                            <th key={c.key} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.35em", color: "#999", whiteSpace: "nowrap" }}>
                                {c.label}
                            </th>
                        ))}
                        <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.35em", color: "#999" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <motion.tr
                            key={row._id || i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            style={{ borderBottom: "1px solid #F9F7F2" }}
                        >
                            {columns.map(c => (
                                <td key={c.key} style={{ padding: "14px 16px", fontSize: "0.82rem", color: "#2D2926", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {c.render ? c.render(row[c.key], row) : (row[c.key] || "—")}
                                </td>
                            ))}
                            <td style={{ padding: "14px 16px", textAlign: "right", whiteSpace: "nowrap" }}>
                                <div style={{ display: "inline-flex", gap: "8px" }}>
                                    {onView && (
                                        <button onClick={() => onView(row)} title="View details" style={{ padding: "6px 12px", background: "#F9F7F2", border: "1px solid #EAE6DF", cursor: "pointer", color: "#31275c", display: "flex", alignItems: "center", gap: "4px", transition: "all 0.2s" }}> {/* Changed from #7C3AED */}
                                            <Eye size={13} />
                                        </button>
                                    )}
                                    {onEdit && (
                                        <button onClick={() => onEdit(row)} title="Edit" style={{ padding: "6px 12px", background: "#F9F7F2", border: "1px solid #EAE6DF", cursor: "pointer", color: "#f59e0b", display: "flex", alignItems: "center", gap: "4px", transition: "all 0.2s" }}>
                                            <Edit size={13} />
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button onClick={() => onDelete(row._id)} title="Delete" style={{ padding: "6px 12px", background: "#fff0f0", border: "1px solid #fecaca", cursor: "pointer", color: "#c0392b", display: "flex", alignItems: "center", gap: "4px", transition: "all 0.2s" }}>
                                            <Trash2 size={13} />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ══════════════════════════════════════
   MAIN DASHBOARD PAGE
══════════════════════════════════════ */
export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("overview");
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [enquiryPage, setEnquiryPage] = useState(1);
    /* redirect if not authenticated */
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth");
        }
    }, [status, router]);

    /* SWR Data Fetching */
    const { data: statsData, isLoading: loadingStats } = useSWR(
        status === "authenticated" ? "/api/dashboard/stats" : null,
        fetcher
    );
    const stats = statsData?.stats || { totalEnquiries: 0, totalSubscribers: 0, totalUsers: 0 };

    /* Tab-specific fetchers */
    const shouldFetchTab = (tabName) => status === "authenticated" && activeTab === tabName;

    const { data: enquiriesData, isLoading: loadingEnquiries } = useSWR(
        shouldFetchTab("enquiries") ? `/api/enquiries?page=${enquiryPage}` : null,
        fetcher, { keepPreviousData: true }
    );
    const enquiries = enquiriesData?.enquiries || [];
    const enquiryTotal = enquiriesData?.total || 0;
    const enquiryTotalPages = enquiriesData?.totalPages || 1;

    const { data: usersData, isLoading: loadingUsers } = useSWR(
        shouldFetchTab("users") ? "/api/users" : null,
        fetcher
    );
    const users = usersData?.users || [];

    const { data: subscribersData, isLoading: loadingSubscribers } = useSWR(
        shouldFetchTab("subscribers") ? "/api/newsletter" : null,
        fetcher
    );
    const subscribers = Array.isArray(subscribersData) ? subscribersData : [];

    const { data: portfolioData, isLoading: loadingPortfolio } = useSWR(
        shouldFetchTab("portfolio") ? "/api/portfolio" : null,
        fetcher
    );
    const portfolioProjects = portfolioData?.projects || [];

    const loadingTab = loadingEnquiries || loadingUsers || loadingSubscribers || loadingPortfolio;

    const deleteEnquiry = async (id) => {
        if (!confirm("Delete this enquiry?")) return;
        const currentData = await mutate(`/api/enquiries?page=${enquiryPage}`, async () => {
            await fetch(`/api/enquiries?id=${id}`, { method: "DELETE" });
            return fetcher(`/api/enquiries?page=${enquiryPage}`);
        }, { optimisticData: { enquiries: enquiries.filter(e => e._id !== id), total: enquiryTotal - 1, totalPages: enquiryTotalPages } });
        mutate("/api/dashboard/stats");
    };

    const deleteUser = async (id) => {
        if (!confirm("Delete this user?")) return;
        mutate("/api/users", async () => {
            await fetch(`/api/users?id=${id}`, { method: "DELETE" });
            return fetcher("/api/users");
        }, { optimisticData: { users: users.filter(u => u._id !== id) } });
    };

    const deleteSubscriber = async (id) => {
        if (!confirm("Remove this subscriber?")) return;
        mutate("/api/newsletter", async () => {
            await fetch(`/api/newsletter?id=${id}`, { method: "DELETE" });
            return fetcher("/api/newsletter");
        }, { optimisticData: subscribers.filter(s => s._id !== id) });
        mutate("/api/dashboard/stats");
    };

    const deletePortfolioProject = async (id) => {
        if (!confirm("Are you sure you want to delete this portfolio project forever?")) return;
        mutate("/api/portfolio", async () => {
            await fetch(`/api/portfolio?id=${id}`, { method: "DELETE" });
            return fetcher("/api/portfolio");
        }, { optimisticData: { projects: portfolioProjects.filter(p => p._id !== id) } });
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setShowUploadForm(true);
    };

    const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
    const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.165, 0.84, 0.44, 1] } } };

    if (status === "loading" || loadingStats) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F9F7F2" }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ width: "48px", height: "1px", background: "#31275c", margin: "0 auto 16px" }} />
                    <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5em", color: "#31275c" }}>Initializing</span>
                </div>
            </div>
        );
    }

    // ── ROLE BASED TABS ──
    const isAdmin = session?.user?.role === "admin";

    const tabs = [
        { key: "overview", label: "Overview" },
        { key: "enquiries", label: `Enquiries${stats.totalEnquiries ? ` (${stats.totalEnquiries})` : ""}` },
        { key: "users", label: "Users" },
        { key: "subscribers", label: `Subscribers${stats.totalSubscribers ? ` (${stats.totalSubscribers})` : ""}` },
    ];

    if (isAdmin) {
        tabs.push({ key: "portfolio", label: "Portfolio" });
    }

    const portfolioCols = [
        { key: "title", label: "Title" },
        { key: "clientName", label: "Client" },
        { key: "category", label: "Category" },
        { key: "createdAt", label: "Created", render: v => v ? new Date(v).toLocaleDateString() : "—" },
    ];

    const enquiryCols = [
        { key: "firstName", label: "Name", render: (_, r) => `${r.firstName || ""} ${r.lastName || ""}`.trim() },
        { key: "email", label: "Email" },
        { key: "phoneNumber", label: "Phone" },
        { key: "projectType", label: "Project" },
        { key: "createdAt", label: "Date", render: v => v ? new Date(v).toLocaleDateString() : "—" },
    ];

    const userCols = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role", render: v => <span style={{ padding: "3px 10px", background: v === "admin" ? "#2D2926" : "#F9F7F2", color: v === "admin" ? "#ffffff" : "#999", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>{v}</span> },
        { key: "createdAt", label: "Created", render: v => v ? new Date(v).toLocaleDateString() : "—" },
    ];

    const subCols = [
        { key: "email", label: "Email" },
        { key: "subscribedAt", label: "Subscribed", render: v => v ? new Date(v).toLocaleDateString() : "—" },
    ];

    return (
        <div style={{ minHeight: "100vh", background: "#F9F7F2", paddingTop: "120px", paddingBottom: "80px" }}>

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <DetailModal item={selectedItem} type={selectedType} onClose={() => { setSelectedItem(null); setSelectedType(null); }} />
                )}
            </AnimatePresence>

            <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px" }}>

                {/* ── PAGE HEADER ── */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", marginBottom: "48px" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}> {/* Modified from original: commented out block */}
                            <div style={{ width: "30px", height: "1px", background: "#31275c" }} /> {/* Changed from #7C3AED */}
                            <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.45em", color: "#31275c" }}> {/* Changed from #7C3AED */}
                                Dashboard
                            </span>
                        </div>
                        <h1 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "clamp(2.2rem,4.5vw,4.5rem)", color: "#2D2926", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
                            Studio<br /><em>Dashboard</em>
                        </h1>
                        {session?.user?.name && (
                            <p style={{ marginTop: "10px", fontFamily: "sans-serif", fontSize: "0.75rem", color: "#999", letterSpacing: "0.08em" }}>
                                Signed in as <strong style={{ color: "#31275c" }}>{session.user.name}</strong> {/* Changed from #7C3AED */}
                            </p>
                        )}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 20px", background: "white", border: "1px solid #EAE6DF" }}>
                            <div style={{ width: "6px", height: "6px", background: "#10b981", borderRadius: "50%" }} />
                            <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#2D2926" }}>
                                Access: Secure
                            </span>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: "/auth" })}
                            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "transparent", border: "1px solid #EAE6DF", fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#999", cursor: "pointer", transition: "all 0.3s" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "#2D2926"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "#2D2926"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#999"; e.currentTarget.style.borderColor = "#EAE6DF"; }}
                        >
                            <LogOut size={12} /> Sign Out
                        </button>
                    </div>
                </motion.div>

                <div style={{ height: "1px", background: "#EAE6DF", marginBottom: "48px" }} />

                {/* ── STATS ROW ── */}
                <motion.div
                    variants={container} initial="hidden" animate="show"
                    style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "48px" }}
                >
                    <motion.div variants={item}><StatCard icon={<MessageSquare size={20} />} label="Enquiries" value={stats.totalEnquiries} dark /></motion.div>
                    <motion.div variants={item}><StatCard icon={<Bell size={20} />} label="Subscribers" value={stats.totalSubscribers} /></motion.div>
                    <motion.div variants={item}><StatCard icon={<Users size={20} />} label="Registered Users" value={stats.totalUsers || 0} gold /></motion.div>
                    <motion.div variants={item}><StatCard icon={<Activity size={20} />} label="Admin Role" value={session?.user?.role || "admin"} /></motion.div>
                </motion.div>

                {/* ── TABS ── */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <div style={{ display: "flex", borderBottom: "2px solid #EAE6DF", marginBottom: "32px", overflowX: "auto" }}>
                        {tabs.map(t => (
                            <button
                                key={t.key}
                                onClick={() => setActiveTab(t.key)}
                                style={{
                                    padding: "12px 24px",
                                    background: "none", border: "none",
                                    borderBottom: activeTab === t.key ? "2px solid #31275c" : "2px solid transparent",
                                    marginBottom: "-2px", cursor: "pointer", fontFamily: "sans-serif",
                                    fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
                                    letterSpacing: "0.35em", whiteSpace: "nowrap",
                                    color: activeTab === t.key ? "#2D2926" : "#bbb",
                                    transition: "all 0.25s"
                                }}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* ── OVERVIEW TAB ── */}
                    <AnimatePresence mode="wait">
                        {activeTab === "overview" && (
                            <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                                    {/* Studio Brand */}
                                    <div style={{ background: "white", border: "1px solid #EAE6DF", padding: "40px" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginBottom: "20px" }}> {/* Modified from original: display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" */}
                                            <div style={{ width: "24px", height: "1px", background: "#31275c" }} /> {/* Changed from #7C3AED */}
                                            <span style={{ fontFamily: "sans-serif", fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.35em", color: "#31275c" }}>The Studio</span> {/* Changed from #7C3AED */}
                                        </div>
                                        <h3 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "1.8rem", color: "#2D2926", lineHeight: 1.15, marginBottom: "16px" }}>
                                            The Design<br /><em>Theory</em>
                                        </h3>
                                        <p style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#999", lineHeight: 1.75, letterSpacing: "0.04em", marginBottom: "24px" }}>
                                            Bespoke architecture &amp; interior design. Curated for those who demand the extraordinary.
                                        </p>
                                        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#2D2926", textDecoration: "none" }}>
                                            Visit Website <ArrowUpRight size={12} />
                                        </a>
                                    </div>

                                    {/* Admin Profile */}
                                    <div style={{ background: "white", border: "1px solid #EAE6DF", padding: "40px" }}>
                                        <div style={{ fontFamily: "sans-serif", fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.35em", color: "#ccc", marginBottom: "20px" }}>Administrator</div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}> {/* Modified from original: gap: "16px", marginBottom: "20px" */}
                                            <div style={{ width: "52px", height: "52px", background: "#2D2926", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <Users size={22} color="#31275c" /> {/* Changed from #7C3AED */}
                                            </div>
                                            <div style={{ textAlign: "left" }}> {/* Added div for text alignment */}
                                                <div style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#2D2926" }}>{session?.user?.name || "Studio Admin"}</div> {/* Modified from original: fontFamily: "var(--font-primary, serif)", fontSize: "1.1rem", color: "#2D2926" */}
                                                <div style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "#31275c", letterSpacing: "0.08em", marginTop: "2px" }}>{session?.user?.email}</div> {/* Changed from #7C3AED */}
                                            </div>
                                        </div>
                                        <div style={{ padding: "10px 16px", background: "#F9F7F2", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                                            <div style={{ width: "6px", height: "6px", background: "#10b981", borderRadius: "50%" }} />
                                            <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#2D2926" }}>Role: {session?.user?.role || "admin"}</span>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div style={{ background: "#2D2926", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <div>
                                            <h3 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "1.6rem", color: "white", lineHeight: 1.15, marginBottom: "12px" }}>
                                                Quick<br /><em>Actions</em>
                                            </h3>
                                            <p style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>
                                                Navigate to data sections using the tabs above.
                                            </p>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "24px" }}>
                                            {[["enquiries", "View Enquiries"], ["users", "Manage Users"], ["subscribers", "Subscribers"]].map(([tab, lbl]) => (
                                                <button key={tab} onClick={() => setActiveTab(tab)}
                                                    style={{ padding: "12px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
                                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(49, 39, 92, 0.2)"}
                                                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                                                >
                                                    {lbl} →
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── ENQUIRIES TAB ── */}
                        {activeTab === "enquiries" && (
                            <motion.div key="enquiries" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                                <div style={{ background: "white", border: "1px solid #EAE6DF" }}>
                                    <div style={{ padding: "24px 32px", borderBottom: "1px solid #EAE6DF", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                                        <div>
                                            <h2 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "1.4rem", color: "#2D2926", margin: 0 }}>All Enquiries</h2>
                                            <p style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "#999", margin: "4px 0 0", letterSpacing: "0.05em" }}>{enquiryTotal} total records</p>
                                        </div>
                                    </div>
                                    <DataTable
                                        rows={enquiries}
                                        columns={enquiryCols}
                                        onDelete={deleteEnquiry}
                                        onView={r => { setSelectedItem(r); setSelectedType("enquiry"); }}
                                        loading={loadingTab}
                                        emptyText="No enquiries yet."
                                    />
                                    {/* Pagination */}
                                    {enquiryTotalPages > 1 && (
                                        <div style={{ padding: "20px 32px", borderTop: "1px solid #EAE6DF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <button
                                                onClick={() => setEnquiryPage(p => Math.max(1, p - 1))}
                                                disabled={enquiryPage === 1}
                                                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "none", border: "1px solid #EAE6DF", cursor: enquiryPage === 1 ? "not-allowed" : "pointer", opacity: enquiryPage === 1 ? 0.4 : 1, fontFamily: "sans-serif", fontSize: "0.65rem", color: "#2D2926" }}
                                            >
                                                <ChevronLeft size={14} /> Prev
                                            </button>
                                            <span style={{ fontFamily: "sans-serif", fontSize: "0.65rem", color: "#999" }}>Page {enquiryPage} of {enquiryTotalPages}</span>
                                            <button
                                                onClick={() => setEnquiryPage(p => Math.min(enquiryTotalPages, p + 1))}
                                                disabled={enquiryPage === enquiryTotalPages}
                                                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "none", border: "1px solid #EAE6DF", cursor: enquiryPage === enquiryTotalPages ? "not-allowed" : "pointer", opacity: enquiryPage === enquiryTotalPages ? 0.4 : 1, fontFamily: "sans-serif", fontSize: "0.65rem", color: "#2D2926" }}
                                            >
                                                Next <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* ── USERS TAB ── */}
                        {activeTab === "users" && (
                            <motion.div key="users" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                                <div style={{ background: "white", border: "1px solid #EAE6DF" }}>
                                    <div style={{ padding: "24px 32px", borderBottom: "1px solid #EAE6DF" }}>
                                        <h2 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "1.4rem", color: "#2D2926", margin: 0 }}>Signed-up Users</h2>
                                        <p style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "#999", margin: "4px 0 0", letterSpacing: "0.05em" }}>{users.length} registered accounts</p>
                                    </div>
                                    <DataTable
                                        rows={users}
                                        columns={userCols}
                                        onDelete={deleteUser}
                                        onView={r => { setSelectedItem(r); setSelectedType("user"); }}
                                        loading={loadingTab}
                                        emptyText="No registered users yet."
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* ── SUBSCRIBERS TAB ── */}
                        {activeTab === "subscribers" && (
                            <motion.div key="subscribers" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                                <div style={{ background: "white", border: "1px solid #EAE6DF" }}>
                                    <div style={{ padding: "24px 32px", borderBottom: "1px solid #EAE6DF" }}>
                                        <h2 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "1.4rem", color: "#2D2926", margin: 0 }}>Newsletter Subscribers</h2>
                                        <p style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "#999", margin: "4px 0 0", letterSpacing: "0.05em" }}>{subscribers.length} subscribers</p>
                                    </div>
                                    <DataTable
                                        rows={subscribers}
                                        columns={subCols}
                                        onDelete={deleteSubscriber}
                                        loading={loadingTab}
                                        emptyText="No subscribers yet."
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* ── PORTFOLIO TAB ── */}
                        {activeTab === "portfolio" && (
                            <motion.div key="portfolio" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                                {showUploadForm ? (
                                    <UploadForm
                                        initialData={editingProject}
                                        onSuccess={() => { setShowUploadForm(false); setEditingProject(null); mutate("/api/portfolio"); }}
                                        onCancel={() => { setShowUploadForm(false); setEditingProject(null); }}
                                    />
                                ) : (
                                    <div style={{ background: "white", border: "1px solid #EAE6DF" }}>
                                        <div style={{ padding: "24px 32px", borderBottom: "1px solid #EAE6DF", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h2 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "1.4rem", color: "#2D2926", margin: 0 }}>Portfolio Projects</h2>
                                                <p style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "#999", margin: "4px 0 0", letterSpacing: "0.05em" }}>Manage your showcased work</p>
                                            </div>
                                            <button
                                                onClick={() => { setEditingProject(null); setShowUploadForm(true); }}
                                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#2D2926', color: 'white', border: 'none', fontFamily: 'sans-serif', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'background 0.3s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#31275c'}
                                                onMouseLeave={e => e.currentTarget.style.background = '#2D2926'}
                                            >
                                                <Plus size={16} /> New Project
                                            </button>
                                        </div>
                                        <DataTable
                                            rows={portfolioProjects}
                                            columns={portfolioCols}
                                            onDelete={deletePortfolioProject}
                                            onEdit={handleEditProject}
                                            loading={loadingTab}
                                            emptyText="No projects added yet."
                                        />
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
