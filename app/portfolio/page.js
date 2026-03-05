'use client';

import { useState } from "react";
import Image from "next/image";
import styles from "./portfolio.module.css";

const projectsData = [
    {
        id: 1,
        title: "High Living Residence",
        category: "Residential",
        image: "/assets/styles/high-living.jpg",
    },
    {
        id: 2,
        title: "The Tailor Made Office",
        category: "Commercial",
        image: "/assets/styles/tailor-made.jpg",
    },
    {
        id: 3,
        title: "Easy Care Villa",
        category: "Architecture",
        image: "/assets/styles/easy-care.jpg",
    },
    {
        id: 4,
        title: "Modern Minimalist Workspace",
        category: "Commercial",
        image: "/assets/hero/hero1.jpg",
    },
    {
        id: 5,
        title: "Heritage Refurbishment",
        category: "Architecture",
        image: "/assets/hero/hero2.jpg",
    },
    {
        id: 6,
        title: "Urban Loft",
        category: "Residential",
        image: "/assets/hero/hero3.jpg",
    },
    {
        id: 7,
        title: "Bespoke Decor Apartment",
        category: "Residential",
        image: "/assets/services/decor.jpg",
    },
    {
        id: 8,
        title: "Corporate HQ",
        category: "Commercial",
        image: "/assets/services/service-works.jpg",
    },
    {
        id: 9,
        title: "The Glass House",
        category: "Architecture",
        image: "/assets/process/handover.webp",
    },
];

const categories = ["All", "Residential", "Commercial", "Architecture"];

export default function PortfolioPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredProjects =
        activeFilter === "All"
            ? projectsData
            : projectsData.filter((p) => p.category === activeFilter);

    return (
        <main className={styles.page}>
            {/* ── PAGE HEADER ── */}
            <div className={styles.pageHeader}>
                <p className={styles.pageLabel}>Portfolio</p>
                <h1 className={styles.pageTitle}>Selected Projects</h1>
            </div>

            {/* ── FILTERS ── */}
            <div className={styles.filters}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ""
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ── GRID ── */}
            <div className={styles.gridWrap}>
                <div className={styles.grid}>
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={styles.projectItem}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className={styles.projectImage}
                                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className={styles.projectOverlay}>
                                <h3 className={styles.projectName}>{project.title}</h3>
                                <p className={styles.projectCategory}>{project.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
