"use client";

import { useState, useEffect } from "react";
import styles from "./SubscriptionPopup.module.css";

export default function SubscriptionPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Check if user has already seen or subscribed
        const hasSeenPopup = localStorage.getItem("tdt_popup_seen");

        if (!hasSeenPopup) {
            // Show popup after 5 seconds delay
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        // Mark as seen so it doesn't bother them constantly
        localStorage.setItem("tdt_popup_seen", "true");
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
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                // Mark as subscribed/seen so it never shows again
                localStorage.setItem("tdt_popup_seen", "true");

                // Optional: Auto close after success
                setTimeout(() => {
                    setIsVisible(false);
                }, 4000);
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
