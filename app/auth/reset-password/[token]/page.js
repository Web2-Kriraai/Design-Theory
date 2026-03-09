'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ResetPasswordPage({ params }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [message, setMessage] = useState("");
    const router = useRouter();

    // Unwrap the params properly (Next.js 15+ patterns handle params as a promise but here simple access usually works, or React.use(params) in recent versions. Just using params.token is fine for client component in app router next 14)
    const token = params?.token;

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setStatus("error");
            setMessage("Passwords do not match.");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("Password updated successfully. Redirecting to login...");
                setTimeout(() => {
                    router.push("/auth");
                }, 2000);
            } else {
                setStatus("error");
                setMessage(data.error || "Failed to reset password.");
            }
        } catch {
            setStatus("error");
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#F9F7F2", fontFamily: "var(--font-primary, serif)", padding: "20px" }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ width: "100%", maxWidth: "420px", background: "#FFF", padding: "40px", borderRadius: "8px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ width: "30px", height: "1px", background: "#7C3AED" }} />
                    <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4em", color: "#7C3AED" }}>
                        Recovery
                    </span>
                </div>
                <h1 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "2rem", color: "#2D2926", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px" }}>
                    Reset <em>Password</em>
                </h1>
                <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "#666", lineHeight: 1.6, marginBottom: "32px", letterSpacing: "0.02em" }}>
                    Please enter your new password below.
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

                <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div>
                        <label style={{ display: "block", fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#999", marginBottom: "8px" }}>
                            New Password
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "100%", padding: "14px 0", background: "transparent", border: "none", borderBottom: "1px solid #EAE6DF", outline: "none", fontFamily: "sans-serif", fontSize: "0.875rem", letterSpacing: "0.05em", color: "#2D2926", transition: "border-color 0.3s ease" }}
                            onFocus={(e) => e.target.style.borderBottomColor = "#7C3AED"}
                            onBlur={(e) => e.target.style.borderBottomColor = "#EAE6DF"}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "#999", marginBottom: "8px" }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ width: "100%", padding: "14px 0", background: "transparent", border: "none", borderBottom: "1px solid #EAE6DF", outline: "none", fontFamily: "sans-serif", fontSize: "0.875rem", letterSpacing: "0.05em", color: "#2D2926", transition: "border-color 0.3s ease" }}
                            onFocus={(e) => e.target.style.borderBottomColor = "#7C3AED"}
                            onBlur={(e) => e.target.style.borderBottomColor = "#EAE6DF"}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        style={{ width: "100%", padding: "18px 24px", background: "#2D2926", color: "white", border: "none", fontFamily: "sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", cursor: (status === "loading" || status === "success") ? "not-allowed" : "pointer", opacity: (status === "loading" || status === "success") ? 0.6 : 1, transition: "background 0.4s ease", marginTop: "8px" }}
                        onMouseOver={(e) => { if (status !== "loading" && status !== "success") e.target.style.background = "#EAB308" }}
                        onMouseOut={(e) => { if (status !== "loading" && status !== "success") e.target.style.background = "#2D2926" }}
                    >
                        {status === "loading" ? "Resetting…" : "Set New Password"}
                    </button>
                </form>

                <div style={{ marginTop: "32px", textAlign: "center" }}>
                    <Link href="/auth" style={{ fontFamily: "sans-serif", fontSize: "0.65rem", color: "#999", letterSpacing: "0.15em", textDecoration: "none", fontWeight: 700, textTransform: "uppercase" }}>
                        <span style={{ color: "#7C3AED", marginRight: "4px" }}>←</span> Back to Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
