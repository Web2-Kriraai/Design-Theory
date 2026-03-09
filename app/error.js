'use client';

import { useEffect } from 'react';
import { RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service if available
        console.error("Global Error Caught:", error);
    }, [error]);

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F9F7F2", padding: "40px", textAlign: "center" }}>
            <div style={{ maxWidth: "400px", background: "white", border: "1px solid #EAE6DF", padding: "48px", borderRadius: "8px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>

                <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.45em", color: "#e53e3e", display: "block", marginBottom: "16px" }}>
                    Runtime Anomaly
                </span>

                <h1 style={{ fontFamily: "var(--font-primary, serif)", fontSize: "2rem", color: "#2D2926", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px", marginTop: 0 }}>
                    We encountered an issue.
                </h1>

                <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "#999", lineHeight: 1.6, marginBottom: "32px" }}>
                    A technical anomaly prevented this page from loading correctly. We're actively looking into it.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <button
                        onClick={() => reset()}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px 24px", background: "#2D2926", border: "none", color: "white", fontSize: "0.7rem", fontFamily: "sans-serif", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", borderRadius: "4px", transition: "background 0.3s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#7C3AED"}
                        onMouseLeave={e => e.currentTarget.style.background = "#2D2926"}
                    >
                        <RefreshCcw size={14} /> Try Again
                    </button>

                    <Link
                        href="/"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px 24px", background: "transparent", border: "1px solid #EAE6DF", color: "#2D2926", fontSize: "0.7rem", fontFamily: "sans-serif", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", borderRadius: "4px", transition: "all 0.3s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#F9F7F2"; e.currentTarget.style.borderColor = "#ccc"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#EAE6DF"; }}
                    >
                        <Home size={14} /> Return to Main Site
                    </Link>
                </div>
            </div>

            <div style={{ marginTop: "48px", display: "flex", gap: "24px" }}>
                <span style={{ fontFamily: "sans-serif", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: "#ccc" }}>© {new Date().getFullYear()} The Design Theory</span>
            </div>
        </div>
    );
}
