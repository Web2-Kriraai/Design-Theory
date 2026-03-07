'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
    const [mode, setMode] = useState("login"); // "login" | "signup"
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: loginData.email,
                password: loginData.password,
            });

            if (res?.error) {
                setError("Invalid email or password. Please try again.");
            } else {
                router.push("/dashboard");
            }
        } catch {
            setError("Failed to connect to authentication server.");
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupData),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("Account created successfully. Please log in.");
                setSignupData({ name: "", email: "", password: "" });
                setTimeout(() => {
                    setMode("login");
                    setSuccess("");
                }, 1500);
            } else {
                setError(data.error || "Signup failed. Please try again.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setError("");
        setSuccess("");
    };

    return (
        <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr", background: "#F9F7F2", fontFamily: "var(--font-primary, serif)" }}>

            <style>{`
                @media (min-width: 1024px) {
                    .auth-grid { grid-template-columns: 1fr 1fr !important; }
                    .auth-mural { display: flex !important; }
                }
                .auth-input {
                    width: 100%;
                    padding: 16px 0;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid #EAE6DF;
                    outline: none;
                    font-family: sans-serif;
                    font-size: 0.875rem;
                    letter-spacing: 0.05em;
                    color: #2D2926;
                    transition: border-color 0.3s ease;
                    box-sizing: border-box;
                }
                .auth-input:focus { border-bottom-color: #B89E7B; }
                .auth-input::placeholder { color: #ccc; }
                .auth-btn {
                    width: 100%;
                    padding: 18px 24px;
                    background: #2D2926;
                    color: white;
                    border: none;
                    font-family: sans-serif;
                    font-size: 0.65rem;
                    font-weight: 700;
                    letter-spacing: 0.4em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: background 0.4s ease;
                    position: relative;
                    overflow: hidden;
                }
                .auth-btn:hover:not(:disabled) { background: #B89E7B; }
                .auth-btn:disabled { opacity: 0.55; cursor: not-allowed; }
                .tab-btn {
                    flex: 1;
                    padding: 14px 0;
                    background: transparent;
                    border: none;
                    font-family: sans-serif;
                    font-size: 0.65rem;
                    font-weight: 700;
                    letter-spacing: 0.35em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-bottom: 2px solid transparent;
                }
                .tab-btn.active {
                    color: #2D2926;
                    border-bottom-color: #B89E7B;
                }
                .tab-btn:not(.active) {
                    color: #bbb;
                }
                .tab-btn:not(.active):hover { color: #999; }
                .field-label {
                    display: block;
                    font-family: sans-serif;
                    font-size: 0.6rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.3em;
                    color: #999;
                    margin-bottom: 8px;
                    transition: color 0.3s;
                }
            `}</style>

            <div className="auth-grid" style={{ display: "grid", gridTemplateColumns: "1fr", minHeight: "100vh" }}>

                {/* LEFT – Form Panel */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "140px 40px 60px", background: "#F9F7F2", position: "relative", overflow: "hidden" }}>

                    {/* Decorative blobs */}
                    <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "240px", height: "240px", background: "rgba(184,158,123,0.07)", borderRadius: "50%", filter: "blur(40px)" }} />
                    <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "300px", height: "300px", background: "rgba(45,41,38,0.04)", borderRadius: "50%", filter: "blur(50px)" }} />

                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1, margin: "0 auto" }}
                    >
                        {/* Brand */}
                        <div style={{ marginBottom: "40px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                                <div style={{ width: "30px", height: "1px", background: "#B89E7B" }} />
                                <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4em", color: "#B89E7B" }}>
                                    Studio Access
                                </span>
                            </div>
                            <h1 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2D2926", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
                                The Design<br /><em>Theory</em>
                            </h1>
                        </div>

                        {/* Mode Tabs */}
                        <div style={{ display: "flex", borderBottom: "1px solid #EAE6DF", marginBottom: "36px" }}>
                            <button className={`tab-btn ${mode === "login" ? "active" : ""}`} onClick={() => switchMode("login")}>
                                Sign In
                            </button>
                            <button className={`tab-btn ${mode === "signup" ? "active" : ""}`} onClick={() => switchMode("signup")}>
                                Register
                            </button>
                        </div>

                        {/* Error / Success */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    key="err"
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    style={{ marginBottom: "24px", padding: "14px 18px", background: "#fff0f0", borderLeft: "3px solid #e57373", fontFamily: "sans-serif", fontSize: "0.8rem", color: "#c0392b", letterSpacing: "0.02em" }}
                                >
                                    {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div
                                    key="suc"
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    style={{ marginBottom: "24px", padding: "14px 18px", background: "#f0fff4", borderLeft: "3px solid #48bb78", fontFamily: "sans-serif", fontSize: "0.8rem", color: "#276749", letterSpacing: "0.02em" }}
                                >
                                    {success}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Forms */}
                        <AnimatePresence mode="wait">
                            {mode === "login" ? (
                                <motion.form
                                    key="login"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.35 }}
                                    onSubmit={handleLogin}
                                    style={{ display: "flex", flexDirection: "column", gap: "28px" }}
                                >
                                    <div>
                                        <label className="field-label">Email Address</label>
                                        <input
                                            className="auth-input"
                                            type="email"
                                            required
                                            placeholder="studio@thedesigntheory.in"
                                            value={loginData.email}
                                            onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="field-label">Password</label>
                                        <input
                                            className="auth-input"
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            value={loginData.password}
                                            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                        />
                                    </div>
                                    <button className="auth-btn" type="submit" disabled={loading}>
                                        {loading ? "Authenticating…" : "Enter Workspace"}
                                    </button>
                                    <p style={{ fontFamily: "sans-serif", fontSize: "0.65rem", textAlign: "center", color: "#aaa", letterSpacing: "0.15em" }}>
                                        No account?{" "}
                                        <button type="button" onClick={() => switchMode("signup")} style={{ background: "none", border: "none", color: "#B89E7B", fontWeight: 700, cursor: "pointer", letterSpacing: "0.15em", fontSize: "0.65rem", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                                            Register here
                                        </button>
                                    </p>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="signup"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.35 }}
                                    onSubmit={handleSignup}
                                    style={{ display: "flex", flexDirection: "column", gap: "28px" }}
                                >
                                    <div>
                                        <label className="field-label">Full Name</label>
                                        <input
                                            className="auth-input"
                                            type="text"
                                            required
                                            placeholder="Alex Design"
                                            value={signupData.name}
                                            onChange={e => setSignupData({ ...signupData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="field-label">Email Address</label>
                                        <input
                                            className="auth-input"
                                            type="email"
                                            required
                                            placeholder="studio@thedesigntheory.in"
                                            value={signupData.email}
                                            onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="field-label">Password</label>
                                        <input
                                            className="auth-input"
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            value={signupData.password}
                                            onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                                        />
                                    </div>
                                    <button className="auth-btn" type="submit" disabled={loading}>
                                        {loading ? "Creating Account…" : "Create Account"}
                                    </button>
                                    <p style={{ fontFamily: "sans-serif", fontSize: "0.65rem", textAlign: "center", color: "#aaa", letterSpacing: "0.15em" }}>
                                        Already a member?{" "}
                                        <button type="button" onClick={() => switchMode("login")} style={{ background: "none", border: "none", color: "#B89E7B", fontWeight: 700, cursor: "pointer", letterSpacing: "0.15em", fontSize: "0.65rem", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                                            Sign in
                                        </button>
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        {/* Footer hint */}
                        <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #EAE6DF", display: "flex", gap: "24px" }}>
                            <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: "#ccc" }}>© 2024 The Design Theory</span>
                            <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: "#ccc" }}>Internal Archive</span>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT – Mural Panel (desktop only) */}
                <div className="auth-mural" style={{ display: "none", position: "relative", overflow: "hidden", background: "#2D2926" }}>
                    <motion.div
                        initial={{ scale: 1.08, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.35 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        style={{ position: "absolute", inset: 0, backgroundImage: "url('/assets/styles/high-living.jpg')", backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(100%)" }}
                    />
                    {/* Grain overlay */}
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.4 }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px", zIndex: 10 }}>
                        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                            <span style={{ fontFamily: "sans-serif", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.45em", color: "rgba(255,255,255,0.35)" }}>
                                The Design Theory
                            </span>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                            <div style={{ width: "32px", height: "1px", background: "#B89E7B", marginBottom: "24px" }} />
                            <h2 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "white", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                                Bespoke<br /><em>Excellence</em>
                            </h2>
                            <p style={{ marginTop: "20px", fontFamily: "sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", maxWidth: "320px", lineHeight: 1.8, letterSpacing: "0.04em" }}>
                                Access the studio gateway to manage architectural narratives and curated interior expressions.
                            </p>
                        </motion.div>

                        <div style={{ display: "flex", gap: "32px" }}>
                            <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)" }}>Secure Access</span>
                            <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)" }}>Internal Archive</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
