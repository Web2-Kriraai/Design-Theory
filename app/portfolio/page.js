'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./portfolio.module.css";

const projectsData = [
    {
        id: "high-living-residence",
        title: "High Living Residence",
        category: "Residential",
        image: "/assets/styles/high-living.jpg",
        type: "hero",
        year: "2023"
    },
    {
        id: "tailor-made-office",
        title: "The Tailor Made Office",
        category: "Commercial",
        image: "/assets/styles/tailor-made.jpg",
        type: "portrait",
        year: "2023"
    },
    {
        id: "easy-care-villa",
        title: "Easy Care Villa",
        category: "Architecture",
        image: "/assets/styles/easy-care.jpg",
        type: "square",
        year: "2024"
    },
    {
        id: "modern-minimalist",
        title: "Modern Minimalist",
        category: "Commercial",
        image: "/assets/hero/hero1.jpg",
        type: "portrait",
        year: "2022"
    },
    {
        id: "heritage-refurb",
        title: "Heritage Refurbishment",
        category: "Architecture",
        image: "/assets/hero/hero2.jpg",
        type: "hero",
        year: "2023"
    }
];

const categories = ["All", "Residential", "Commercial", "Architecture"];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            className={`${styles.projectCard} ${styles[project.type]}`}
        >
            <Link href={`/portfolio/${project.id}`} className={styles.cardLink}>
                <div className={styles.imageWrap}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={styles.projectImage}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className={styles.projectInfo}>
                    <div className={styles.meta}>
                        <span className={styles.category}>{project.category}</span>
                        <span className={styles.year}>{project.year}</span>
                    </div>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>
            </Link>
        </motion.div>
    );
};

export default function PortfolioPage() {
    const [activeFilter, setActiveFilter] = useState("All");
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

    const filteredProjects = activeFilter === "All"
        ? projectsData
        : projectsData.filter(p => p.category === activeFilter);

    return (
        <main className={styles.portfolioPage}>
            <header className={styles.header}>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="script-font">
                    Curated Works
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={styles.title}
                >
                    The <i>Archive</i>
                </motion.h1>
            </header>

            <nav className={styles.filterNav}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterActive : ""}`}
                    >
                        {cat}
                    </button>
                ))}
            </nav>

            <section className={styles.gridContainer}>
                <div className={styles.grid}>
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* Newsletter Subscription (Consistent Footer CTA) */}
            {/* <section className={styles.newsletter}>
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
            </section> */}
        </main>
    );
}
