'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleForgot = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
            } else {
                setStatus("error");
                setMessage(data.error || "Failed to send reset link.");
            }
        } catch {
            setStatus("error");
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#F9F7F2", fontFamily: "var(--font-primary, serif)", padding: "20px" }}>
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ width: "100%", maxWidth: "420px", background: "#FFF", padding: "40px", borderRadius: "8px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ width: "30px", height: "1px", background: "#31275c" }} />
                    <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4em", color: "#31275c" }}>
                        Recovery
                    </span>
                </div>
                <h1 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "2rem", color: "#2D2926", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px" }}>
                    Forgot <em>Password</em>
                </h1>
                <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "#666", lineHeight: 1.6, marginBottom: "32px", letterSpacing: "0.02em" }}>
                    Enter your email identifier below. If an account exists, we will send you a secure link to reset your password.
                </p>

                <AnimatePresence>
                    {status === "error" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ marginBottom: "24px", padding: "14px 18px", background: "#fff0f0", borderLeft: "3px solid #e57373", fontFamily: "sans-serif", fontSize: "0.8rem", color: "#c0392b", overflow: "hidden" }}
                        >
                            {message}
                        </motion.div>
                    )}
                    {status === "success" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ marginBottom: "24px", padding: "14px 18px", background: "#f0fff4", borderLeft: "3px solid #48bb78", fontFamily: "sans-serif", fontSize: "0.8rem", color: "#276749", overflow: "hidden" }}
                        >
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleForgot} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div>
                        <label style={{ display: "block", fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#999", marginBottom: "8px" }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="studio@thedesigntheory.in"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%", padding: "14px 0", background: "transparent", border: "none", borderBottom: "1px solid #EAE6DF", outline: "none", fontFamily: "sans-serif", fontSize: "0.875rem", letterSpacing: "0.05em", color: "#2D2926", transition: "border-color 0.3s ease" }}
                            onFocus={(e) => e.target.style.borderBottomColor = "#31275c"}
                            onBlur={(e) => e.target.style.borderBottomColor = "#EAE6DF"}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        style={{ width: "100%", padding: "18px 24px", background: "#2D2926", color: "white", border: "none", fontFamily: "sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.6 : 1, transition: "background 0.4s ease", marginTop: "8px" }}
                        onMouseOver={(e) => { if (status !== "loading") e.target.style.background = "#EAB308" }}
                        onMouseOut={(e) => { if (status !== "loading") e.target.style.background = "#2D2926" }}
                    >
                        {status === "loading" ? "Sending…" : "Send Reset Link"}
                    </button>
                </form>

                <div style={{ marginTop: "32px", textAlign: "center" }}>
                    <Link href="/auth" style={{ fontFamily: "sans-serif", fontSize: "0.65rem", color: "#999", letterSpacing: "0.15em", textDecoration: "none", fontWeight: 700, textTransform: "uppercase" }}>
                        <span style={{ color: "#31275c", marginRight: "4px" }}>←</span> Back to Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
