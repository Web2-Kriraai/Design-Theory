'use client';

import { useState } from "react";
import Image from "@/app/components/AnimatedImage";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./services.module.css";

const SERVICE_SECTIONS = [
    {
        id: "residential",
        label: "Living Spaces",
        title: "Bespoke Residential Architecture",
        description: "Creating homes that are a true reflection of individuality. From opulent luxury villas to modern minimalist apartments, we design residential spaces that balance comfort with high-end editorial aesthetics.",
        details: [
            "Custom Furniture & Cabinetry",
            "Space Planning & Layout Optimization",
            "Curated Material & Finish Selection",
            "Lighting & Acoustic Design",
        ],
        image: "/assets/styles/high-living.jpg"
    },
    {
        id: "commercial",
        label: "Business environments",
        title: "High-Performance Commercial Design",
        description: "Designing productive, inspiring, and brand-focused commercial spaces. Whether it's a high-performance corporate office or a boutique retail outlet, we create environments that drive success.",
        details: [
            "Corporate Office Interiors",
            "Retail & Boutique Design",
            "Reception & Lounge Areas",
            "Workplace Ergonomics",
        ],
        image: "/assets/services/service-works.jpg"
    },
    {
        id: "architecture",
        label: "Structural Excellence",
        title: "End-to-End Architectural Planning",
        description: "Our architectural philosophy is rooted in structural harmony and functional beauty. We provide end-to-end architectural planning, ensuring that the foundation of your space is as strong as its aesthetic.",
        details: [
            "Conceptual Building Design",
            "Landscape Integration",
            "Sustainable Material Planning",
            "Structural Feasibility Studies",
        ],
        image: "/assets/blog/blog2.jpg"
    },
    {
        id: "visualization",
        label: "CGI & Realism",
        title: "Immersive 3D Visualization",
        description: "Experience your future space before a single brick is laid. Our hyper-realistic 3D renderings and walkthroughs provide an immersive preview of every texture, shadow, and light.",
        details: [
            "Photorealistic 3D Renders",
            "Virtual Reality Walkthroughs",
            "Material Preview Simulations",
            "Architectural Flythroughs",
        ],
        image: "/assets/blog/blog3.jpg"
    }
];

const ServiceBlock = ({ section, index }) => {
    const isEven = index % 2 === 0;

    return (
        <section className={`${styles.editorialSection} ${isEven ? styles.even : styles.odd}`} id={section.id}>
            <div className={styles.edContainer}>
                {/* Image Side */}
                <div className={styles.edImageCol}>
                    <motion.div
                        className={styles.edImageWrap}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            className={styles.edImage}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>
                </div>

                {/* Text Side */}
                <div className={styles.edTextCol}>
                    <motion.div
                        className={styles.edTextInner}
                        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className={styles.edHeader}>
                            <span className={styles.edIndex}>0{index + 1}</span>
                            <span className={styles.edLabel}>{section.label}</span>
                        </div>

                        <h2 className={styles.edTitle}>{section.title}</h2>
                        <p className={styles.edDescription}>{section.description}</p>

                        <ul className={styles.edDetailsList}>
                            {section.details.map((detail, i) => (
                                <li key={i} className={styles.edDetailItem}>
                                    <span className={styles.edBullet}>✦</span> {detail}
                                </li>
                            ))}
                        </ul>

                        <Link href="/contact" className={styles.edLink}>
                            Consult our experts <span className={styles.edArrow}>→</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default function ServicesPage() {

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <main className={styles.page}>
            {/* Header Section */}
            <header className={styles.header}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={styles.title}
                >
                    Our <i>Expertise</i>
                </motion.h1>
                <motion.div
                    className={styles.fourBoxGrid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {/* ROW 1 */}
                    <div className={`${styles.textWrap} ${styles.text1}`}>
                        <p className={styles.boxDesc}>We begin by understanding your unique vision, lifestyle, and operational needs to develop a comprehensive structural blueprint.</p>
                    </div>
                    <div className={`${styles.coloredBox} ${styles.boxPurple} ${styles.box1}`}>
                        <div className={styles.boxIcon}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        </div>
                        <h3 className={styles.boxHeadline}>Consultation</h3>
                    </div>
                    <div className={`${styles.coloredBox} ${styles.boxDark} ${styles.box2}`}>
                        <div className={styles.boxIcon}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                        <h3 className={styles.boxHeadline}>Architecture</h3>
                    </div>
                    <div className={`${styles.textWrap} ${styles.text2}`}>
                        <p className={styles.boxDesc}>Our approach focuses on designing environments that are aesthetically refined and built upon a foundation of structural harmony.</p>
                    </div>

                    {/* ROW 2 */}
                    <div className={`${styles.textWrap} ${styles.text3}`}>
                        <p className={styles.boxDesc}>From bespoke furnishings and curated materials to precise lighting design, we meticulously execute every detail.</p>
                    </div>
                    <div className={`${styles.coloredBox} ${styles.boxLight} ${styles.box3}`}>
                        <div className={styles.boxIcon}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
                        </div>
                        <h3 className={styles.boxHeadline}>Execution</h3>
                    </div>
                    <div className={`${styles.coloredBox} ${styles.boxGold} ${styles.box4}`}>
                        <div className={styles.boxIcon}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                        </div>
                        <h3 className={styles.boxHeadline}>Impressions</h3>
                    </div>
                    <div className={`${styles.textWrap} ${styles.text4}`}>
                        <p className={styles.boxDesc}>We focus on the emotional resonance of a space, crafting environments that leave a striking impact and elevate everyday experiences.</p>
                    </div>
                </motion.div>
            </header>

            {/* Editorial Sections */}
            <div className={styles.sectionsWrapper}>
                {SERVICE_SECTIONS.map((section, index) => (
                    <ServiceBlock
                        key={section.id}
                        index={index}
                        section={section}
                    />
                ))}
            </div>

            {/* Newsletter Subscription (New Footer CTA) */}
            <section className={styles.newsletter}>
                <div className={styles.newsletterInner}>
                    <span className="script-font">Join the inner circle</span>
                    <h2 className={styles.nsTitle}>
                        {status === "success"
                            ? "Thank you for joining us."
                            : "Occasional insights delivered to your inbox"}
                    </h2>

                    {status !== "success" && (
                        <form className={styles.nsForm} onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder={status === "error" ? "Try again..." : "Your email address"}
                                className={styles.nsInput}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className={styles.nsBtn}
                                disabled={status === "loading"}
                            >
                                {status === "loading" ? "..." : "Subscribe"}
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
}
