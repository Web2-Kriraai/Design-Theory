'use client';

import { useState } from "react";
import Image from "@/app/components/AnimatedImage";
import Link from "next/link";
import styles from "./HomeContact.module.css";
import { validateContactForm } from "@/lib/validators";

export default function HomeContact() {
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

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                setGlobalError(response.status === 413 ? "Submission is too large." : "Server returned an invalid response.");
                setIsLoading(false);
                return;
            }

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
                if (data?.errors) {
                    setErrors(data.errors);
                } else {
                    setGlobalError(data?.message || "Something went wrong. Please try again.");
                }
            }
        } catch (error) {
            setGlobalError("Unable to connect to the server. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={styles.homeContact}>
            <div className={styles.twoCol}>
                {/* LEFT - Form */}
                <div className={styles.leftCol}>
                    <div className={styles.formWrapper}>
                        {submitted ? (
                            <div className={styles.successMsg}>
                                <div className={styles.successIcon}>✓</div>
                                <h3 className={styles.successHeading}>Thank you for reaching out.</h3>
                                <p className={styles.successText}>
                                    We have received your enquiry and will be in touch shortly.
                                </p>
                                <button className={styles.resetBtn} onClick={() => setSubmitted(false)}>
                                    Send Another Enquiry
                                </button>
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
                </div>

                {/* RIGHT - Image */}
                <div className={styles.rightCol}>
                    <div className={styles.imageWrap}>
                        <Image
                            src="/assets/styles/high-living.jpg"
                            alt="The Design Theory"
                            fill
                            className={styles.sideImage}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className={styles.imageOverlay} />
                    </div>
                </div>
            </div>
        </section>
    );
}
