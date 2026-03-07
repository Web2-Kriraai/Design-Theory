"use client";

import { useState, useEffect } from "react";
import styles from "./SubscriptionPopup.module.css";

export default function SubscriptionPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Only suppress for users who already subscribed
        const hasSubscribed = localStorage.getItem("tdt_subscribed");
        if (hasSubscribed) return;

        // Show popup after 3 seconds on every page load/refresh
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Listen for manual trigger events from other components (like the homepage button)
    useEffect(() => {
        const handleOpenPopup = () => setIsVisible(true);
        window.addEventListener('open-newsletter-popup', handleOpenPopup);
        return () => window.removeEventListener('open-newsletter-popup', handleOpenPopup);
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        // Don't mark as seen - popup will show again on next page load
        // Only subscribing permanently suppresses it
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setErrorMessage("Please enter an email address.");
            setStatus("error");
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                // Mark as subscribed so popup never shows again
                localStorage.setItem("tdt_subscribed", "true");

                // Auto close after success
                setTimeout(() => {
                    setIsVisible(false);
                }, 3000);
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Failed to subscribe. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Network error. Please check your connection and try again.");
        }
    };

    if (!isVisible && status !== "success") return null;

    return (
        <div className={`${styles.overlay} ${isVisible ? styles.visible : ""}`}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={closePopup} aria-label="Close popup">
                    ✕
                </button>

                {status === "success" ? (
                    <div className={styles.successWrap}>
                        <div className={styles.successIcon}>✓</div>
                        <h3 className={styles.successHeading}>Thank You!</h3>
                        <p className={styles.successText}>You've been successfully subscribed to The Design Theory updates.</p>
                    </div>
                ) : (
                    <>
                        <h2 className={styles.heading}>Be Inspired. Stay Updated.</h2>
                        <p className={styles.subtext}>
                            Discover our latest interior projects, design inspirations, styling ideas, and exclusive updates from The Design Theory.
                        </p>
                        <p className={styles.supportingLine}>
                            Be the first to experience our newest creations and design journeys.
                        </p>

                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="📩 Enter your email address"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === 'error') setStatus('idle');
                                    }}
                                    required
                                />
                                {status === "error" && <p className={styles.errorText}>{errorMessage}</p>}
                            </div>
                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={status === "loading"}
                            >
                                {status === "loading" ? "Subscribing..." : "Subscribe"}
                            </button>
                        </form>

                        <p className={styles.microText}>
                            We respect your privacy. No spam — only design inspiration.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
