'use client';

import { useState } from "react";
import Image from "@/app/components/AnimatedImage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./blog.module.css";

const blogPosts = [
  {
    id: 1,
    slug: "the-art-of-minimalism",
    title: "The Art of Multi-Sensory Minimalism",
    category: "Interior Design",
    date: "March 15, 2024",
    image: "/assets/hero/hero3.jpg",
    excerpt: "Exploring how textures and light redefine spatial luxury in modern homes.",
    featured: true
  },
  {
    id: 2,
    slug: "curating-bespoke-furniture",
    title: "Curating Bespoke Furniture for Luxury Living",
    category: "Furniture",
    date: "March 10, 2024",
    image: "/assets/services/furniture-carte.jpg",
    excerpt: "How custom-made pieces ground a room and provide effortless character."
  },
  {
    id: 3,
    slug: "architectural-rhythm",
    title: "Architectural Rhythm & Structural Integrity",
    category: "Architecture",
    date: "March 05, 2024",
    image: "/assets/process/design-in-progress.jpg",
    excerpt: "A study on the balance between form and the raw materials that define it."
  },
  {
    id: 4,
    slug: "the-psychology-of-lighting",
    title: "The Subtle Psychology of Mood Lighting",
    category: "Interior Design",
    date: "Feb 28, 2024",
    image: "/assets/services/decor.jpg",
    excerpt: "Transforming environments through the intentional use of shadow and illumination."
  }
];

const categories = ["All", "Interior Design", "Architecture", "Furniture"];

const BlogCard = ({ post, index }) => {
  const isFeatured = post.featured;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={isFeatured ? styles.featuredCard : styles.postCard}
    >
      <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
        <div className={styles.imageWrap}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className={styles.cardImage}
            sizes={isFeatured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
          />
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardMeta}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.date}>{post.date}</span>
          </div>
          <h3 className={styles.cardTitle}>{post.title}</h3>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <div className={styles.readMore}>
            Read Article <span className={styles.arrow}>→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <main className={styles.blogPage}>
      {/* Header Section */}
      <header className={styles.header}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="script-font"
        >
          The Journal
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.title}
        >
          Perspectives in <br /> <i>Intentional Design</i>
        </motion.h1>
      </header>

      {/* Filter Navigation */}
      <nav className={styles.filterNav}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ""}`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Posts Grid */}
      <section className={styles.gridContainer}>
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <span className="script-font">Join the inner circle</span>
          <h2 className={styles.nsTitle}>Occasional insights delivered to your inbox</h2>
          <form className={styles.nsForm}>
            <input type="email" placeholder="Your email address" className={styles.nsInput} />
            <button type="submit" className={styles.nsBtn}>Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
}
