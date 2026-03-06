'use client';

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../blog.module.css";

const blogPosts = {
    "the-art-of-minimalism": {
        title: "The Art of Multi-Sensory Minimalism",
        category: "Interior Design",
        date: "March 15, 2024",
        image: "/assets/hero/hero3.jpg",
        content: "Minimalism is more than just empty space; it's the intentional curation of textures, light, and form that speaks to the soul. In this piece, we explore how natural materials like travertine and white oak interplay with sunlight to create a rhythmic calmness."
    },
    "curating-bespoke-furniture": {
        title: "Curating Bespoke Furniture for Luxury Living",
        category: "Furniture",
        date: "March 10, 2024",
        image: "/assets/services/furniture-carte.jpg",
        content: "Bespoke furniture is the anchor of a curated room. Unlike mass-produced items, custom furniture reflects the inhabitant's personality and the architect's vision in a singular, tangible form."
    },
    "architectural-rhythm": {
        title: "Architectural Rhythm & Structural Integrity",
        category: "Architecture",
        date: "March 05, 2024",
        image: "/assets/process/design-in-progress.jpg",
        content: "Architecture is frozen music. The rhythm of columns, the pause of a courtyard, and the crescendo of a double-height ceiling all contribute to the emotional impact of a building."
    },
    "the-psychology-of-lighting": {
        title: "The Subtle Psychology of Mood Lighting",
        category: "Interior Design",
        date: "Feb 28, 2024",
        image: "/assets/services/decor.jpg",
        content: "Lighting is the invisible hand that defines how we feel within a space. By layering task, ambient, and accent lighting, we can transform a cold room into a warm sanctuary."
    }
};

export default function BlogPost() {
    const { slug } = useParams();
    const post = blogPosts[slug];

    if (!post) {
        return (
            <div className={styles.errorPage}>
                <h1>Post not found</h1>
                <Link href="/blog">Back to Journal</Link>
            </div>
        );
    }

    return (
        <main className={styles.postPage}>
            <header className={styles.postHeader}>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="script-font">
                    {post.category}
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.postTitle}
                >
                    {post.title}
                </motion.h1>
                <p className={styles.postDate}>{post.date}</p>
            </header>

            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className={styles.postHero}
            >
                <Image src={post.image} alt={post.title} fill className={styles.postImage} priority />
            </motion.div>

            <article className={styles.postContent}>
                <div className={styles.contentInner}>
                    <p>{post.content}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </article>

            <footer className={styles.postFooter}>
                <Link href="/blog" className={styles.backLink}>
                    ← Back to Journal
                </Link>
            </footer>
        </main>
    );
}
