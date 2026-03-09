'use client';

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function VerifyOtpForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [message, setMessage] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!email) {
            setStatus("error");
            setMessage("Email is missing. Please restart the reset process.");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                router.push(`/auth/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
            } else {
                setStatus("error");
                setMessage(data.error || "Invalid or expired OTP.");
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
                    <div style={{ width: "30px", height: "1px", background: "#31275c" }} />
                    <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4em", color: "#31275c" }}>
                        Verification
                    </span>
                </div>
                <h1 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "2rem", color: "#2D2926", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px" }}>
                    Enter <em>OTP</em>
                </h1>
                <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "#666", lineHeight: 1.6, marginBottom: "32px", letterSpacing: "0.02em" }}>
                    We sent a 6-digit code to <strong>{email}</strong>. Please enter it below.
                </p>

                <AnimatePresence mode="wait">
                    {message && status === "error" && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: "hidden", marginBottom: "24px" }}
                        >
                            <div style={{ borderLeft: "3px solid #EF4444", background: "#FEF2F2", padding: "12px 16px", color: "#B91C1C", fontSize: "0.85rem", fontFamily: "sans-serif" }}>
                                {message}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "#888", fontFamily: "sans-serif" }}>
                            6-Digit Code
                        </label>
                        <input
                            type="text"
                            required
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            style={{ width: "100%", padding: "14px 0", background: "transparent", border: "none", borderBottom: "1px solid #E5E5E5", fontSize: "1.5rem", letterSpacing: "0.4em", textAlign: "center", color: "#2D2926", outline: "none", transition: "border-color 0.3s ease" }}
                            onFocus={(e) => e.target.style.borderBottomColor = "#31275c"}
                            onBlur={(e) => e.target.style.borderBottomColor = "#E5E5E5"}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading" || otp.length < 6}
                        style={{ width: "100%", padding: "16px", background: "#2D2926", color: "#FFF", border: "none", borderRadius: "2px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", cursor: (status === "loading" || otp.length < 6) ? "not-allowed" : "pointer", opacity: (status === "loading" || otp.length < 6) ? 0.7 : 1, transition: "background 0.3s ease", marginTop: "12px" }}
                        onMouseEnter={(e) => { if (status !== "loading" && otp.length === 6) e.target.style.background = "#31275c"; }}
                        onMouseLeave={(e) => { if (status !== "loading" && otp.length === 6) e.target.style.background = "#2D2926"; }}
                    >
                        {status === "loading" ? "VERIFYING..." : "VERIFY CODE"}
                    </button>
                </form>

                <div style={{ marginTop: "40px", textAlign: "center" }}>
                    <Link href="/auth/forgot-password" style={{ fontSize: "0.75rem", fontFamily: "sans-serif", color: "#A09A96", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        &larr; Resend Code
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOtpForm />
        </Suspense>
    );
}
