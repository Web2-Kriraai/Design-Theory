'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const heroImages = [
    "/assets/hero/hero1.jpg",
    "/assets/hero/hero2.jpg",
    "/assets/hero/hero3.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleImageChange = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div>
      {/* Hero Section with Fade-in Slider */}
      <section style={styles.heroSection}>
        {/* Gradient Overlay */}
        <div style={styles.gradientOverlay}></div>

        <div style={styles.heroContent}>
          <div style={{ ...styles.imageWrapper, opacity: isTransitioning ? 0 : 1 }}>
            <Image
              src={heroImages[currentImageIndex]}
              alt="Design Theory - Hero Image"
              width={1200}
              height={800}
              style={styles.heroImage}
              priority
            />
          </div>
        </div>

        {/* Hero Branding Text */}
        <div style={styles.heroBranding}>
          <p style={styles.brandingText}>Design Theory</p>
        </div>

        {/* Navigation Dots */}
        <div style={styles.dotsContainer}>
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              style={{
                ...styles.dot,
                backgroundColor: currentImageIndex === index ? "#D4AF37" : "rgba(255, 255, 255, 0.5)",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => handleImageChange((currentImageIndex - 1 + heroImages.length) % heroImages.length)}
          style={styles.prevArrow}
          aria-label="Previous image"
        >
          ❮
        </button>
        <button
          onClick={() => handleImageChange((currentImageIndex + 1) % heroImages.length)}
          style={styles.nextArrow}
          aria-label="Next image"
        >
          ❯
        </button>

        {/* Scroll Indicator */}
        <div style={styles.scrollIndicator}>
          <span style={styles.scrollText}>Scroll to Explore</span>
          <div style={styles.scrollArrow}>↓</div>
        </div>
      </section>

      {/* Statement Section */}
      <section style={styles.statementSection}>
        <h2 style={styles.statement}>
          Design Theory: Where intellectual rigor meets aesthetic soul.
        </h2>
      </section>
    </div>
  );
}

const styles = {
  heroSection: {
    position: "relative",
    padding: 0,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#F9F8F6",
  },
  heroContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.5s ease-in-out",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    quality: 100,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(51, 40, 91, 0.4) 0%, rgba(212, 175, 55, 0.2) 100%)",
    zIndex: 5,
  },
  heroBranding: {
    position: "absolute",
    top: "60px",
    left: "60px",
    zIndex: 8,
  },
  brandingText: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    margin: 0,
    fontWeight: "300",
  },
  scrollIndicator: {
    position: "absolute",
    bottom: "80px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    zIndex: 8,
    animation: "bounce 2s infinite",
  },
  scrollText: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.7)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  scrollArrow: {
    fontSize: "20px",
    color: "rgba(255, 255, 255, 0.7)",
    animation: "bounce 2s infinite",
  },
  dotsContainer: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "12px",
    zIndex: 10,
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  prevArrow: {
    position: "absolute",
    left: "30px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0, 0, 0, 0.3)",
    color: "white",
    border: "none",
    fontSize: "24px",
    padding: "15px 20px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    zIndex: 10,
  },
  nextArrow: {
    position: "absolute",
    right: "30px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0, 0, 0, 0.3)",
    color: "white",
    border: "none",
    fontSize: "24px",
    padding: "15px 20px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    zIndex: 10,
  },
  statementSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    backgroundColor: "#F9F8F6",
  },
  statement: {
    maxWidth: "650px",
    textAlign: "center",
    fontSize: "2.5rem",
    lineHeight: 1.4,
  },
};
