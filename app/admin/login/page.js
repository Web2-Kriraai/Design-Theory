'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (res.error) {
                setError(res.error);
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError("Failed to connect to authentication server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F9F7F2]">
            {/* Artistic Left Side */}
            <div className="hidden lg:block relative overflow-hidden bg-[#2D2926]">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 grayscale bg-[url('/assets/styles/high-living.jpg')] bg-cover bg-center"
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
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <h2 className="text-5xl font-serif text-white leading-tight">
                            Bespoke <br /><i>Excellence</i>
                        </h2>
                        <p className="mt-6 text-white/60 font-sans text-sm max-w-sm leading-relaxed tracking-wide">
                            Access the studio gateway to manage architectural narratives and curated interior expressions.
                        </p>
                    </motion.div>

                    <div className="flex gap-8 text-white/30 text-[10px] uppercase tracking-widest font-sans">
                        <span>© 2024</span>
                        <span>Internal Archive</span>
                    </div>
                </div>
            </div>

            {/* Login Form Side */}
            <div className="flex items-center justify-center p-8 lg:p-24 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-12">
                        <span className="script-font text-[#7C3AED] text-2xl block mb-2">Welcome Back</span>
                        <h1 className="text-4xl font-serif text-[#2D2926] tracking-tight">Studio Access</h1>
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
                            <label className="block text-[10px] uppercase tracking-[0.3em] text-[#999] font-sans font-bold mb-3 transition-colors group-focus-within:text-[#7C3AED]">
                                Email Identifier
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full px-0 py-4 bg-transparent border-b border-[#EAE6DF] focus:border-[#7C3AED] outline-none transition-all font-sans text-sm tracking-wide placeholder:text-gray-300"
                                placeholder="studio@thedesigntheory.in"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="group">
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-[10px] uppercase tracking-[0.3em] text-[#999] font-sans font-bold transition-colors group-focus-within:text-[#7C3AED]">
                                    Secret Key
                                </label>
                                <Link href="/auth/forgot-password" className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-[#7C3AED] hover:text-[#2D2926] transition-colors">
                                    Forgot?
                                </Link>
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full px-0 py-4 bg-transparent border-b border-[#EAE6DF] focus:border-[#7C3AED] outline-none transition-all font-sans text-sm tracking-wide placeholder:text-gray-300"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-[#2D2926] text-white text-[10px] uppercase tracking-[0.4em] font-sans font-bold hover:bg-[#7C3AED] transition-all duration-500 disabled:opacity-50 relative group overflow-hidden"
                            >
                                <span className="relative z-10">{loading ? "Authenticating..." : "Enter Workspace"}</span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 flex flex-col items-center gap-6">
                        <div className="h-px w-12 bg-[#EAE6DF]" />
                        <p className="text-[10px] text-[#999] font-sans uppercase tracking-[0.25em]">
                            New Collective Member?{" "}
                            <Link href="/admin/signup" className="text-[#7C3AED] hover:text-[#2D2926] transition-colors font-bold underline underline-offset-4">
                                Register Here
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2D2926]/5 rounded-full -ml-24 -mb-24 blur-3xl" />
            </div>
        </div>
    );
}
