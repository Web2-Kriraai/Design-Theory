'use client';

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../portfolio.module.css";

const projectsData = {
    "high-living-residence": {
        title: "High Living Residence",
        category: "Residential",
        image: "/assets/styles/high-living.jpg",
        year: "2023",
        description: "An opulent luxury villa in Hyderabad blending contemporary minimalism with rich textures and bespoke furniture. The project focuses on light as a material, allowing it to sculpt the interior throughout the day."
    },
    "tailor-made-office": {
        title: "The Tailor Made Office",
        category: "Commercial",
        image: "/assets/styles/tailor-made.jpg",
        year: "2023",
        description: "A collaborative corporate workspace designed to reflect the brand's identity through precise geometric forms. We aimed to create an environment that fosters both productivity and holistic well-being."
    },
    "easy-care-villa": {
        title: "Easy Care Villa",
        category: "Architecture",
        image: "/assets/styles/easy-care.jpg",
        year: "2024",
        description: "A residence designed for effortless living. The architecture follows a modular logic, allowing for future expansion while maintaining a tight, sculptural aesthetic."
    }
};

export default function ProjectDetail() {
    const { id } = useParams();
    const project = projectsData[id];

    if (!project) {
        return (
            <div className={styles.errorPage}>
                <h1>Project not found</h1>
                <Link href="/portfolio">Back to Archive</Link>
            </div>
        );
    }

    return (
        <main className={styles.detailPage}>
            <section className={styles.detailHero}>
                <Image src={project.image} alt={project.title} fill className={styles.heroImage} priority />
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.projectCategory}>
                        {project.category}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.mainTitle}
                    >
                        {project.title}
                    </motion.h1>
                </div>
            </section>

            <section className={styles.projectDescription}>
                <div className={styles.descLeft}>
                    <span className="script-font">The Concept</span>
                    <h2>Intelligent <br /> Luxury</h2>
                </div>
                <div className={styles.descRight}>
                    <p>{project.description}</p>
                    <p>Every corner of this {project.category.toLowerCase()} project was meticulously planned to ensure a seamless flow between spaces. Our team focused on a palette of natural stone, warm wood, and brushed metals.</p>
                </div>
            </section>

            <Link href="/portfolio" className={styles.backBtn}>
                Back to Archive
            </Link>
        </main>
    );
}
