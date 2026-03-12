'use client';

import { useState, useRef } from "react";
import Image from "@/app/components/AnimatedImage";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./careers.module.css";

const WHY_REASONS = [
    {
        icon: "✦",
        title: "Creative Freedom",
        text: "Work on diverse architectural and interior projects where your creativity is celebrated and encouraged.",
    },
    {
        icon: "✦",
        title: "Real Exposure",
        text: "Gain hands-on involvement across residential, commercial, and workspace design — from concept to execution.",
    },
    {
        icon: "✦",
        title: "Growth Mindset",
        text: "Join a collaborative, ambition-driven studio culture that nurtures talent and celebrates individual growth.",
    },
    {
        icon: "✦",
        title: "Purposeful Work",
        text: "Design spaces that truly matter — meaningful, functional environments that shape how people live and work.",
    },
];

const OPENINGS = [
    "Senior Project Manager",
    "Site Engineer",
    "Senior Architect",
    "Interior Designer",
    "Digital Marketing Manager",
    "Executive Assistant",
];

export default function CareersPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        contact: "",
        designation: "",
        message: "",
    });
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState("");
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setFileName(selected.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            let attachmentUrl = "";

            // Upload file to Cloudinary if provided
            if (file) {
                const uploadData = new FormData();
                uploadData.append("images", file);
                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: uploadData,
                });
                const uploadText = await uploadRes.text();
                let uploadJson;
                try {
                    uploadJson = JSON.parse(uploadText);
                } catch (e) {
                    throw new Error(uploadRes.status === 413 ? "File is too large. Please upload a smaller file." : "Server returned an invalid response during upload.");
                }
                if (!uploadRes.ok) throw new Error(uploadJson?.error || "File upload failed.");
                attachmentUrl = uploadJson.urls?.[0] || "";
            }

            // Submit application
            const res = await fetch("/api/careers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, attachmentUrl }),
            });

            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                throw new Error(res.status === 413 ? "Submission is too large." : "Server returned an invalid response.");
            }
            if (!res.ok) throw new Error(data?.error || "Submission failed.");

            setStatus("success");
            setForm({ name: "", email: "", contact: "", designation: "", message: "" });
            setFile(null);
            setFileName("");
        } catch (err) {
            setStatus("error");
            setErrorMsg(err.message || "Something went wrong. Please try again.");
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 32 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] },
        }),
    };

    return (
        <main className={styles.page}>

            {/* ── HERO ── */}
            <section className={styles.hero}>
                <div className={styles.heroImageWrap}>
                    <Image
                        src="/assets/process/design-in-progress.jpg"
                        alt="Careers at The Design Theory"
                        fill
                        className={styles.heroImg}
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <motion.p
                        className={styles.heroEyebrow}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        The Design Theory
                    </motion.p>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                    >
                        Join Our<br /><em>Creative Team</em>
                    </motion.h1>
                    <motion.p
                        className={styles.heroTagline}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                    >
                        Build spaces. Build ideas. Build your future.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <a href="#apply" className={styles.heroCta}>Apply Now →</a>
                    </motion.div>
                </div>
            </section>

            {/* ── WHY WORK WITH US ── */}
            <section className={styles.whySection}>
                <div className={styles.whyInner}>
                    <div className={styles.whyTextBlock}>
                        <motion.p
                            className={styles.sectionEyebrow}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0}
                        >
                            Why Join Us
                        </motion.p>
                        <motion.h2
                            className={styles.sectionTitle}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.1}
                        >
                            Why Work With<br /><em>Design Theory</em>
                        </motion.h2>
                        <motion.p
                            className={styles.sectionBodyText}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.2}
                        >
                            At The Design Theory, we believe great design is born from passionate minds,
                            collaborative energy, and fearless creativity. We are constantly looking for
                            talented individuals who share our vision of transforming spaces into meaningful,
                            functional, and inspiring environments.
                        </motion.p>
                    </div>

                    <div className={styles.whyGrid}>
                        {WHY_REASONS.map((r, i) => (
                            <motion.div
                                key={r.title}
                                className={styles.whyCard}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i * 0.1}
                            >
                                <span className={styles.whyIcon}>{r.icon}</span>
                                <h3 className={styles.whyCardTitle}>{r.title}</h3>
                                <p className={styles.whyCardText}>{r.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TEAM PHOTO ── */}
            <section className={styles.teamPhotoSection}>
                <div className={styles.teamPhotoWrap}>
                    <Image
                        src="/assets/styles/high-living.jpg"
                        alt="The Design Theory Team"
                        fill
                        className={styles.teamPhoto}
                        sizes="100vw"
                    />
                    <div className={styles.teamPhotoOverlay}>
                        <div className={styles.teamPhotoText}>
                            <p className={styles.teamPhotoQuote}>
                                "We don't just design spaces — we create experiences, stories, and environments
                                that reflect individuality and purpose."
                            </p>
                            <span className={styles.teamPhotoAttr}>— Rachitha Modupalli, Founder</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CURRENT OPENINGS ── */}
            {/* <section className={styles.openingsSection}>
                <div className={styles.openingsInner}>
                    <motion.p
                        className={styles.sectionEyebrow}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        We&#39;re Hiring
                    </motion.p>
                    <motion.h2
                        className={styles.sectionTitle}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.1}
                    >
                        Current <em>Openings</em>
                    </motion.h2>
                    <div className={styles.openingsGrid}>
                        {OPENINGS.map((role, i) => (
                            <motion.div
                                key={role}
                                className={styles.openingItem}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i * 0.08}
                            >
                                <span className={styles.openingIndex}>0{i + 1}</span>
                                <span className={styles.openingRole}>{role}</span>
                                <a href="#apply" className={styles.openingApply}>Apply →</a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* ── APPLICATION FORM ── */}
            <section id="apply" className={styles.formSection}>
                <div className={styles.formInner}>
                    <div className={styles.formTextCol}>
                        <motion.p
                            className={styles.sectionEyebrow}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            Get In Touch
                        </motion.p>
                        <motion.h2
                            className={styles.sectionTitle}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.1}
                        >
                            Start Your<br /><em>Application</em>
                        </motion.h2>
                        <motion.p
                            className={styles.sectionBodyText}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.2}
                        >
                            Ready to build with us? Fill in the form to start your journey with The Design Theory.
                            We review all applications and will be in touch if there&#39;s a match.
                        </motion.p>
                        <motion.p
                            className={styles.formNote}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.3}
                        >
                            You can also email us directly at&nbsp;
                            <a href="mailto:careers@thedesigntheory.in" className={styles.formLink}>
                                careers@thedesigntheory.in
                            </a>
                        </motion.p>
                    </div>

                    <motion.div
                        className={styles.formCol}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.15}
                    >
                        {status === "success" ? (
                            <div className={styles.successBox}>
                                <span className={styles.successIcon}>✦</span>
                                <h3 className={styles.successTitle}>Application Received</h3>
                                <p className={styles.successText}>
                                    Thank you for your interest in joining The Design Theory. We will review your
                                    application and reach out if there&#39;s a suitable opportunity.
                                </p>
                                <button
                                    className={styles.resetBtn}
                                    onClick={() => setStatus("idle")}
                                >
                                    Submit Another Application
                                </button>
                            </div>
                        ) : (
                            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                                <div className={styles.fieldRow}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label} htmlFor="name">Full Name *</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className={styles.input}
                                            placeholder="Rachitha Modupalli"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label} htmlFor="contact">Contact Number *</label>
                                        <input
                                            id="contact"
                                            name="contact"
                                            type="tel"
                                            className={styles.input}
                                            placeholder="+91 98765 43210"
                                            value={form.contact}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.fieldRow}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label} htmlFor="email">Email Address *</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className={styles.input}
                                            placeholder="you@email.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label} htmlFor="designation">Designation / Role *</label>
                                        <input
                                            id="designation"
                                            name="designation"
                                            type="text"
                                            className={styles.input}
                                            placeholder="e.g. Interior Designer"
                                            value={form.designation}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="message">Cover Note (Optional)</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className={styles.textarea}
                                        rows={4}
                                        placeholder="Tell us a little about yourself and your experience..."
                                        value={form.message}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* File Attachment */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Resume / Portfolio *</label>
                                    <div
                                        className={styles.fileUploadBox}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                            className={styles.fileInput}
                                            onChange={handleFileChange}
                                        />
                                        <div className={styles.fileUploadInner}>
                                            <span className={styles.fileUploadIcon}>📎</span>
                                            <span className={styles.fileUploadText}>
                                                {fileName || "Click to attach your Resume or Portfolio"}
                                            </span>
                                            <span className={styles.fileUploadHint}>
                                                PDF, DOC, or Image — Max 5MB
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {status === "error" && (
                                    <p className={styles.errorMsg}>⚠ {errorMsg}</p>
                                )}

                                <button
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={status === "loading"}
                                >
                                    {status === "loading" ? "Submitting..." : "Submit Application"}
                                    <span className={styles.submitArrow}>→</span>
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
