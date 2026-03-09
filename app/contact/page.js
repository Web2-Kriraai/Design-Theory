'use client';

import { useState } from "react";
import Image from "@/app/components/AnimatedImage";
import Link from "next/link";
import AnimatedQuickStrip from "../components/AnimatedQuickStrip";
import styles from "./contact.module.css";
import { validateContactForm } from "@/lib/validators";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        projectType: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalError, setGlobalError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear field error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
        if (globalError) setGlobalError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateContactForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        setGlobalError("");

        try {
            const response = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitted(true);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    projectType: "",
                    message: "",
                });
            } else {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setGlobalError(data.message || "Something went wrong. Please try again.");
                }
            }
        } catch (error) {
            setGlobalError("Unable to connect to the server. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.page}>
            {/* ── PAGE HEADER ── */}
            <div className={styles.pageHeader}>
                <p className={styles.pageLabel}>Get In Touch</p>
                <h1 className={styles.pageTitle}>Contact Us</h1>
                <p className={styles.pageIntro}>
                    We would love to hear from you. Whether you are planning your dream
                    home, designing a workspace, or looking for architectural consultation,
                    our team at The Design Theory is here to help bring your vision to
                    life.
                </p>
            </div>

            {/* ── TWO-COLUMN SECTION ── */}
            <section className={styles.twoCol}>

                {/* LEFT – Details + Form */}
                <div className={styles.leftCol}>

                    {/* Studio Details */}
                    <div className={styles.details}>
                        <h2 className={styles.detailsHeading}>Studio</h2>

                        <div className={styles.detailRow}>
                            <span className={styles.detailIcon}>
                                {/* location pin */}
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </span>
                            <address className={styles.address}>
                                <strong>The Design Theory</strong><br />
                                Block-B, Plot No. 1-64/205<br />
                                Kavuri Hills Road<br />
                                Kavuri Hills, Madhapur<br />
                                Hyderabad, Telangana – 500033<br />
                                India
                            </address>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailIcon}>
                                {/* phone */}
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                            </span>
                            <a href="tel:+91XXXXXXXXXX" className={styles.contactLink}>
                                +91 XXXXX XXXXX
                            </a>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailIcon}>
                                {/* envelope */}
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </span>
                            <a href="mailto:info@thedesigntheory.in" className={styles.contactLink}>
                                info@thedesigntheory.in
                            </a>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className={styles.divider} />

                    {/* Enquiry Form */}
                    {submitted ? (
                        <div className={styles.successMsg}>
                            <div className={styles.successIcon}>✓</div>
                            <h3 className={styles.successHeading}>Thank you for reaching out.</h3>
                            <p className={styles.successText}>
                                We have received your enquiry and will be in touch shortly.
                            </p>
                        </div>
                    ) : (
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            <h2 className={styles.formHeading}>Send Enquiry</h2>

                            {globalError && (
                                <div style={{ color: '#d9534f', fontSize: '0.85rem', marginBottom: '15px', fontFamily: 'var(--font-sans)' }}>
                                    {globalError}
                                </div>
                            )}

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="firstName">First Name <span className={styles.req}>*</span></label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Rachitha"
                                    />
                                    {errors.firstName && <span style={{ color: '#d9534f', fontSize: '0.7rem', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.firstName}</span>}
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="lastName">Last Name <span className={styles.req}>*</span></label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Modupalli"
                                    />
                                    {errors.lastName && <span style={{ color: '#d9534f', fontSize: '0.7rem', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.lastName}</span>}
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="email">Email Address <span className={styles.req}>*</span></label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="hello@example.com"
                                    />
                                    {errors.email && <span style={{ color: '#d9534f', fontSize: '0.7rem', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.email}</span>}
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="phoneNumber">Phone Number <span className={styles.req}>*</span></label>
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        maxLength={10}
                                        type="tel"
                                        required
                                        className={`${styles.input} ${errors.phoneNumber ? styles.inputError : ""}`}
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                    {errors.phoneNumber && <span style={{ color: '#d9534f', fontSize: '0.7rem', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.phoneNumber}</span>}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="projectType">Project Type <span className={styles.req}>*</span></label>
                                <select
                                    id="projectType"
                                    name="projectType"
                                    className={`${styles.input} ${styles.select} ${errors.projectType ? styles.inputError : ""}`}
                                    value={formData.projectType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a project type…</option>
                                    <option value="residential">Residential Interiors</option>
                                    <option value="commercial">Commercial Interiors</option>
                                    <option value="architecture">Architecture</option>
                                    <option value="renovation">Renovation / Refurbishment</option>
                                    <option value="visualization">3D Visualization</option>
                                    <option value="turnkey">Turnkey Project</option>
                                    <option value="consultation">Consultation</option>
                                </select>
                                {errors.projectType && <span style={{ color: '#d9534f', fontSize: '0.7rem', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.projectType}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="message">Your Message <span className={styles.req}>*</span></label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your project, timeline, and any specific requirements…"
                                />
                                {errors.message && <span style={{ color: '#d9534f', fontSize: '0.7rem', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.message}</span>}
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                                {isLoading ? "Sending..." : "Send Enquiry"} <span className={styles.btnArrow}>→</span>
                            </button>

                            <p className={styles.privacyNote}>
                                By submitting this form, you agree to our{" "}
                                <Link href="/privacy-policy" className={styles.privacyLink}>Privacy Policy</Link>{" "}
                                and consent to being contacted regarding your enquiry.
                            </p>
                        </form>
                    )}
                </div>

                {/* RIGHT – Image */}
                <div className={styles.rightCol}>
                    <div className={styles.imageWrap}>
                        <Image
                            src="/assets/styles/high-living.jpg"
                            alt="The Design Theory — Premium Interior"
                            fill
                            className={styles.sideImage}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className={styles.imageOverlay} />
                    </div>
                </div>

            </section>

            {/* ── GOOGLE MAP ── */}
            <section className={styles.mapSection}>
                <div className={styles.mapHeader}>
                    <p className={styles.pageLabel}>Find Us</p>
                    <h2 className={styles.mapHeading}>Our Studio Location</h2>
                </div>
                <div className={styles.mapWrap}>
                    <iframe
                        title="The Design Theory – Kavuri Hills, Madhapur"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.271940988703!2d78.38356547489218!3d17.447034983433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dce2ac5c07%3A0x2f20e0e9c3e19ef1!2sKavuri%20Hills%2C%20Madhapur%2C%20Hyderabad%2C%20Telangana%20500033!5e0!3m2!1sen!2sin!4v1709629200000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>

            {/* ── QUICK LINKS STRIP ── */}
            <AnimatedQuickStrip />
        </main>
    );
}
