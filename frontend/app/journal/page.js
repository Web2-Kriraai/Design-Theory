'use client';

import Image from "next/image";
import { useState } from "react";

export default function Journal() {
  const articles = [
    {
      id: 1,
      title: "The Honesty of Stone: Sourcing Arabescato Marble",
      excerpt: "Exploring the emotional resonance of natural marble in contemporary design...",
      date: "January 12, 2026",
      image: "/assets/blog/blog1.webp",
    },
    {
      id: 2,
      title: "Light as a Building Material",
      excerpt: "How light shapes space, mood, and the human experience within architecture...",
      date: "January 5, 2026",
      image: "/assets/blog/blog2.jpg",
    },
    {
      id: 3,
      title: "The Studio Notebook: Winter Textiles",
      excerpt: "A visual diary of textile experiments and material discoveries from our studio...",
      date: "December 28, 2025",
      image: "/assets/blog/blog3.jpg",
    },
  ];

  const [expanded, setExpanded] = useState(null);

  return (
    <section style={styles.container}>
      <h1 style={styles.title}>Journal</h1>

      <div style={styles.feedContainer}>
        {articles.map((article) => (
          <article key={article.id} style={styles.articleCard}>
            <div style={styles.articleImage}>
              <Image
                src={article.image}
                alt={article.title}
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={styles.articleContent}>
              <h2 style={styles.articleTitle}>{article.title}</h2>
              <p style={styles.articleDate}>{article.date}</p>
              <p style={styles.articleExcerpt}>{article.excerpt}</p>
              <button
                onClick={() => setExpanded(expanded === article.id ? null : article.id)}
                style={styles.readMoreBtn}
              >
                {expanded === article.id ? "Read Less" : "Read More"}
              </button>
              {expanded === article.id && (
                <p style={styles.fullContent}>
                  Full article content would appear here with detailed exploration of the topic, supporting
                  photography, and design insights from Design Theory's perspective.
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const styles = {
  container: {
    padding: "120px 60px",
    backgroundColor: "#F9F8F6",
  },
  title: {
    marginBottom: "80px",
    fontSize: "4rem",
    textAlign:"center",
  },
  feedContainer: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  articleCard: {
    marginBottom: "100px",
    display: "flex",
    gap: "40px",
    alignItems: "flex-start",
  },
  articleImage: {
    flex: "0 0 40%",
    height: "300px",
    overflow: "hidden",
  },
  articleContent: {
    flex: "1",
  },
  articleTitle: {
    fontSize: "1.8rem",
    marginBottom: "10px",
  },
  articleDate: {
    fontSize: "11px",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    marginBottom: "20px",
  },
  articleExcerpt: {
    fontSize: "14px",
    lineHeight: 1.8,
    marginBottom: "20px",
    textTransform: "none",
    letterSpacing: "normal",
  },
  readMoreBtn: {
    background: "none",
    border: "1px solid #333",
    padding: "10px",
    cursor: "pointer",
    fontSize: "12px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    transition: "all 0.8s ease-in-out",
  },
  fullContent: {
    marginTop: "20px",
    fontSize: "14px",
    lineHeight: 1.8,
    textTransform: "none",
    color: "#666",
  },
};
