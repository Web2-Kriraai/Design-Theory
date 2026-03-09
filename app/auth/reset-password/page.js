'use client';

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");

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
                body: JSON.stringify({ email, otp, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("Password updated successfully. You can now log in.");
                setTimeout(() => router.push("/auth"), 2000); // Redirect after 2 seconds
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
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#F9F7F2", padding: "20px" }}>
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ width: "100%", maxWidth: "420px", background: "#FFF", padding: "40px", borderRadius: "8px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ width: "30px", height: "1px", background: "#7C3AED" }} />
                    <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4em", color: "#7C3AED" }}>
                        Secure
                    </span>
                </div>
                <h1 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "2rem", color: "#2D2926", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px" }}>
                    New <em>Password</em>
                </h1>
                <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "#666", lineHeight: 1.6, marginBottom: "32px", letterSpacing: "0.02em" }}>
                    Your OTP is verified. Please input your new secure credentials below.
                </p>

                <AnimatePresence mode="wait">
                    {message && (
                        <motion.div
                            key={status}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: "hidden", marginBottom: "24px" }}
                        >
                            <div style={{
                                borderLeft: `3px solid ${status === "success" ? "#10B981" : "#EF4444"}`,
                                background: status === "success" ? "#ECFDF5" : "#FEF2F2",
                                padding: "12px 16px",
                                color: status === "success" ? "#065F46" : "#B91C1C",
                                fontSize: "0.85rem",
                                fontFamily: "sans-serif"
                            }}>
                                {message}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "#888", fontFamily: "sans-serif" }}>
                            New Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "100%", padding: "14px 0", background: "transparent", border: "none", borderBottom: "1px solid #E5E5E5", fontSize: "0.95rem", color: "#2D2926", outline: "none", transition: "border-color 0.3s ease" }}
                            onFocus={(e) => e.target.style.borderBottomColor = "#7C3AED"}
                            onBlur={(e) => e.target.style.borderBottomColor = "#E5E5E5"}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "#888", fontFamily: "sans-serif" }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ width: "100%", padding: "14px 0", background: "transparent", border: "none", borderBottom: "1px solid #E5E5E5", fontSize: "0.95rem", color: "#2D2926", outline: "none", transition: "border-color 0.3s ease" }}
                            onFocus={(e) => e.target.style.borderBottomColor = "#7C3AED"}
                            onBlur={(e) => e.target.style.borderBottomColor = "#E5E5E5"}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        style={{ width: "100%", padding: "16px", background: "#2D2926", color: "#FFF", border: "none", borderRadius: "2px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", cursor: (status === "loading" || status === "success") ? "not-allowed" : "pointer", opacity: (status === "loading" || status === "success") ? 0.7 : 1, transition: "background 0.3s ease", marginTop: "12px" }}
                        onMouseEnter={(e) => { if (status !== "loading" && status !== "success") e.target.style.background = "#7C3AED"; }}
                        onMouseLeave={(e) => { if (status !== "loading" && status !== "success") e.target.style.background = "#2D2926"; }}
                    >
                        {status === "loading" ? "UPDATING..." : "RESET PASSWORD"}
                    </button>
                </form>

                <div style={{ marginTop: "40px", textAlign: "center" }}>
                    <Link href="/auth" style={{ fontSize: "0.75rem", fontFamily: "sans-serif", color: "#A09A96", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        &larr; Back to Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
