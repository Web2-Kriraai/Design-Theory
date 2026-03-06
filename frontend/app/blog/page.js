'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./blog.module.css";

const CATEGORIES = [
  "All",
  "Interior Design",
  "Modular Kitchen",
  "Bedroom Ideas",
  "Living Room",
  "Home Decor",
  "Architecture",
];

const BLOG_POSTS = [
  {
    id: 1,
    category: "Architecture",
    title: "The Honesty of Stone: Sourcing Arabescato Marble",
    excerpt: "Exploring the emotional resonance of natural marble in contemporary architectural design and how it defines luxury.",
    date: "Jan 12, 2026",
    image: "/assets/blog/blog1.webp",
    featured: true,
  },
  {
    id: 2,
    category: "Interior Design",
    title: "Light as a Building Material",
    excerpt: "How light shapes space, mood, and the human experience within modern minimalist architecture.",
    date: "Jan 05, 2026",
    image: "/assets/blog/blog2.jpg",
  },
  {
    id: 3,
    category: "Home Decor",
    title: "The Studio Notebook: Winter Textiles",
    excerpt: "A visual diary of textile experiments and material discoveries from our studio this season.",
    date: "Dec 28, 2025",
    image: "/assets/blog/blog3.jpg",
  },
  {
    id: 4,
    category: "Bedroom Ideas",
    title: "Minimalist Master Bedrooms",
    excerpt: "Creating a sanctuary with neutral palettes and intentional functional furniture selections.",
    date: "Dec 20, 2025",
    image: "/assets/styles/high-living.jpg",
  },
  {
    id: 5,
    category: "Modular Kitchen",
    title: "Future of Modular Kitchens",
    excerpt: "Smart appliances and hidden storage solutions that are revolutionizing modern kitchen design in 2026.",
    date: "Dec 15, 2025",
    image: "/assets/services/appliances.jpg",
  },
  {
    id: 6,
    category: "Living Room",
    title: "Open Concept Living: A Guide",
    excerpt: "Balancing privacy and social flow in open-plan residential designs for multi-generational homes.",
    date: "Dec 10, 2025",
    image: "/assets/services/service-works.jpg",
  }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  const featuredPost = BLOG_POSTS.find(post => post.featured);

  return (
    <main className={styles.page}>
      {/* ── HEADER ── */}
      <header className={styles.header}>
        <p className={styles.label}>Journal & Insights</p>
        <h1 className={styles.title}>The Design Blog</h1>
        <p className={styles.subtitle}>
          Inspiring stories, professional tips, and deep dives into the world of bespoke design.
        </p>
      </header>

      {/* ── FEATURED POST ── */}
      {activeCategory === "All" && featuredPost && (
        <section className={styles.featuredSection}>
          <div className={styles.featuredCard}>
            <div className={styles.featuredImageWrap}>
              <Image 
                src={featuredPost.image} 
                alt={featuredPost.title}
                fill
                className={styles.image}
                priority
              />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.tag}>{featuredPost.category}</span>
              <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
              <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
              <div className={styles.meta}>
                <span>{featuredPost.date}</span>
                <Link href={`/blog/${featuredPost.id}`} className={styles.readMore}>
                  READ ARTICLE →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CATEGORY FILTER ── */}
      <nav className={styles.filterBar}>
        <div className={styles.filterInner}>
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* ── POST GRID ── */}
      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {filteredPosts.filter(p => !p.featured || activeCategory !== "All").map(post => (
            <article key={post.id} className={styles.postCard}>
              <div className={styles.cardImageWrap}>
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className={styles.cardTag}>{post.category}</span>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardDate}>{post.date}</span>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} className={styles.cardLink}>
                  Continue Reading
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className={styles.emptyState}>
            <p>No articles found in this category.</p>
            <button onClick={() => setActiveCategory("All")} className={styles.resetBtn}>View All</button>
          </div>
        )}
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <h2 className={styles.newsletterTitle}>Never Miss An Inspiration.</h2>
          <p className={styles.newsletterText}>Get our latest design journals delivered straight to your inbox.</p>
          <div className={styles.subscribeBox}>
             <p className={styles.subscribedNote}>Join our community of design enthusiasts.</p>
             <Link href="#subscribe" className={styles.goldBtn}>Subscribe Now</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
