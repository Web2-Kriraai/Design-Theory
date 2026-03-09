'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/login");
            } else {
                const data = await res.json();
                setError(data.error || "Signup failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F9F7F2]">
            {/* Login Form Side */}
            <div className="flex items-center justify-center p-8 lg:p-24 relative overflow-hidden order-2 lg:order-1">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-12">
                        <span className="script-font text-[#31275c] text-2xl block mb-2">Join the Studio</span>
                        <h1 className="text-4xl font-serif text-[#2D2926] tracking-tight">Create Access</h1>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-8 p-4 bg-red-50 text-red-600 text-sm rounded border-l-2 border-red-400 italic font-sans"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="group">
                            <label className="block text-[10px] uppercase tracking-[0.3em] text-[#999] font-sans font-bold mb-3 transition-colors group-focus-within:text-[#31275c]">
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-0 py-4 bg-transparent border-b border-[#EAE6DF] focus:border-[#31275c] outline-none transition-all font-sans text-sm tracking-wide placeholder:text-gray-300"
                                placeholder="Alexander Design"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="group">
                            <label className="block text-[10px] uppercase tracking-[0.3em] text-[#999] font-sans font-bold mb-3 transition-colors group-focus-within:text-[#31275c]">
                                Email Identifier
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full px-0 py-4 bg-transparent border-b border-[#EAE6DF] focus:border-[#31275c] outline-none transition-all font-sans text-sm tracking-wide placeholder:text-gray-300"
                                placeholder="studio@thedesigntheory.in"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="group">
                            <label className="block text-[10px] uppercase tracking-[0.3em] text-[#999] font-sans font-bold mb-3 transition-colors group-focus-within:text-[#31275c]">
                                Role Assignment
                            </label>
                            <input
                                type="text"
                                className="w-full px-0 py-4 bg-transparent border-b border-[#EAE6DF] focus:border-[#31275c] outline-none transition-all font-sans text-sm tracking-wide placeholder:text-gray-300"
                                placeholder="editor, moderator, manager..."
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>

                        <div className="group">
                            <label className="block text-[10px] uppercase tracking-[0.3em] text-[#999] font-sans font-bold mb-3 transition-colors group-focus-within:text-[#31275c]">
                                Secret Key
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full px-0 py-4 bg-transparent border-b border-[#EAE6DF] focus:border-[#31275c] outline-none transition-all font-sans text-sm tracking-wide placeholder:text-gray-300"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-[#2D2926] text-white text-[10px] uppercase tracking-[0.4em] font-sans font-bold hover:bg-[#31275c] transition-all duration-500 disabled:opacity-50 relative group overflow-hidden"
                            >
                                <span className="relative z-10">{loading ? "Registering..." : "Create Account"}</span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 flex flex-col items-center gap-6">
                        <div className="h-px w-12 bg-[#EAE6DF]" />
                        <p className="text-[10px] text-[#999] font-sans uppercase tracking-[0.25em]">
                            Already Have Access?{" "}
                            <Link href="/admin/login" className="text-[#31275c] hover:text-[#2D2926] transition-colors font-bold underline underline-offset-4">
                                Log In
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Artistic Side */}
            <div className="hidden lg:block relative overflow-hidden bg-[#2D2926] order-1 lg:order-2">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 grayscale bg-[url('/assets/styles/tailor-made.jpg')] bg-cover bg-center"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-16 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <span className="text-white/40 text-xs uppercase tracking-[0.4em] font-sans">The Design Theory</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-right"
                    >
                        <h2 className="text-5xl font-serif text-white leading-tight">
                            Design <br /><i>Narratives</i>
                        </h2>
                        <p className="mt-6 text-white/60 font-sans text-sm max-w-sm ml-auto leading-relaxed tracking-wide">
                            Begin your journey as an administrator of high-performance architectural and interior design environments.
                        </p>
                    </motion.div>

                    <div className="flex justify-end gap-8 text-white/30 text-[10px] uppercase tracking-widest font-sans">
                        <span>© 2024</span>
                        <span>Internal Archive</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
