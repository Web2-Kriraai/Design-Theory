'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AboutTeaser from "./components/AboutTeaser";
import styles from "./home.module.css";

export default function Home() {
  /* ---- Testimonial slider ---- */
  const testimonials = [
    {
      quote: "The Design Theory transformed our space beyond expectations. Their attention to detail, transparency, and design sensibility made the entire experience seamless.",
      author: "Priya & Arvind Sharma",
      role: "Residential Client, Hyderabad",
    },
    {
      quote: "Working with The Design Theory was a truly collaborative experience. They understood our brand identity and translated it into a space that feels both inviting and professional.",
      author: "Rahul Mehta",
      role: "Commercial Client, Hyderabad",
    },
    {
      quote: "From concept to completion, the team brought a level of creativity and precision that exceeded every expectation. Our home feels like it was designed just for us.",
      author: "Ananya Reddy",
      role: "Residential Client, Hyderabad",
    },
  ];

  const [testiIndex, setTestiIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const SECTION_ANIM = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div>
      {/* ==========================================
          SECTION 1 — HERO
          ========================================== */}
      <section className={styles.hero}>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={styles.heroImageWrap}
        >
          <Image
            src="/assets/hero/hero1.jpg"
            alt="The Design Theory — Editorial Interior"
            fill
            className={styles.heroImg}
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className={styles.heroOverlay} />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={styles.heroText}
        >
          <h1 className={styles.heroTitle}>The Design Theory</h1>
          <p className={styles.heroTagline}>
            Designing thoughtful spaces for modern living.
          </p>
        </motion.div>
      </section>

      {/* ==========================================
          SECTION 2 — INTRODUCTORY TEXT
          ========================================== */}
      <motion.section
        {...SECTION_ANIM}
        className={styles.intro}
      >
        <div className={styles.introInner}>
          <p className={styles.introText}>
            The Design Theory is a young, dynamic interior and architectural
            design studio based in Hyderabad, India. We specialise in creating
            refined residential and commercial spaces that balance aesthetics,
            functionality, and individuality. Led by a deep understanding of
            design principles and client aspirations, our work is rooted in
            thoughtful planning, attention to detail, and timeless design.
          </p>
        </div>
      </motion.section>

      {/* ==========================================
          SECTION 3 — FEATURED PROJECTS
          ========================================== */}
      <motion.section
        {...SECTION_ANIM}
        className={styles.featuredProjects}
      >
        <div className={styles.fpInner}>
          <div className={styles.fpImages}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={styles.fpImageWrap}
            >
              <Image
                src="/assets/styles/high-living.jpg"
                alt="Featured Project — High Living"
                width={600}
                height={600}
                className={styles.fpImg}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={styles.fpImageWrap}
            >
              <Image
                src="/assets/styles/tailor-made.jpg"
                alt="Featured Project — Tailor Made"
                width={600}
                height={600}
                className={styles.fpImg}
              />
            </motion.div>
          </div>
          <div className={styles.fpContent}>
            <p className={styles.sectionLabel}>Our Work</p>
            <h2 className={styles.serifHeading}>Selected Projects</h2>
            <p className={styles.bodyText}>
              A curated selection of our architectural and interior design projects,
              showcaseing our approach to space, materiality, and detail.
            </p>
            <Link href="/portfolio" className={styles.goldCta}>
              VIEW PORTFOLIO <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ==========================================
          SECTION 4 — DESIGN PHILOSOPHY
          ========================================== */}
      <motion.section
        {...SECTION_ANIM}
        className={styles.philosophy}
      >
        <div className={styles.philoInner}>
          <div className={styles.philoImages}>
            <motion.div
              whileHover={{ rotate: -1 }}
              className={styles.philoImgWrap}
            >
              <Image
                src="/assets/services/decor.jpg"
                alt="Design Philosophy — Decor Detail"
                width={480}
                height={360}
                className={styles.philoImg}
              />
            </motion.div>
            <motion.div
              whileHover={{ rotate: 1 }}
              className={styles.philoImgWrap}
            >
              <Image
                src="/assets/services/furniture-carte.jpg"
                alt="Design Philosophy — Furniture"
                width={480}
                height={360}
                className={styles.philoImg}
              />
            </motion.div>
          </div>
          <div className={styles.philoText}>
            <p className={styles.sectionLabel}>Our Approach</p>
            <h2 className={styles.serifHeading}>Design Philosophy</h2>
            <p className={styles.bodyText}>
              At The Design Theory, we believe every space should tell a story.
              Our design approach is collaborative, client-focused, and driven by
              innovation. From concept to execution, we ensure that every project
              reflects the client's vision while maintaining functionality,
              comfort, and elegance.
            </p>
            <Link href="/services" className={styles.goldCta}>
              LEARN MORE <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ==========================================
          SECTION 5 — TESTIMONIALS
          ========================================== */}
      <motion.section
        {...SECTION_ANIM}
        className={styles.testimonials}
      >
        <div className={styles.testiInner}>
          <h2 className={styles.testiHeading}>Client Testimonials</h2>
          <div className={styles.testiSlider}>
            <AnimatePresence mode="wait">
              <motion.div
                key={testiIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className={styles.testiSlide}
              >
                <p className={styles.testiQuote}>
                  {testimonials[testiIndex].quote}
                </p>
                <p className={styles.testiAuthor}>
                  {testimonials[testiIndex].author}
                </p>
                <p className={styles.testiRole}>
                  {testimonials[testiIndex].role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={styles.testiDots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.testiDot} ${i === testiIndex ? styles.testiDotActive : ""}`}
                onClick={() => setTestiIndex(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ==========================================
          SECTION 6 — FEATURED PROJECT
          ========================================== */}
      <motion.section
        {...SECTION_ANIM}
        className={styles.featuredProject}
      >
        <div className={styles.fpSingleInner}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={styles.fpSingleImgWrap}
          >
            <Image
              src="/assets/styles/easy-care.jpg"
              alt="Featured Project — Easy Care"
              width={600}
              height={800}
              className={styles.fpSingleImg}
            />
          </motion.div>
          <div className={styles.fpSingleText}>
            <p className={styles.sectionLabel}>Spotlight</p>
            <h2 className={styles.serifHeading}>Featured Project</h2>
            <p className={styles.bodyText}>
              A thoughtfully designed residential interior that blends modern
              aesthetics with everyday functionality. Each element was curated to
              reflect the client's lifestyle, preferences, and budget.
            </p>
            <Link href="/portfolio" className={styles.goldCta}>
              VIEW PROJECT <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ==========================================
          SECTION 7 — ABOUT TEASER
          ========================================== */}
      <AboutTeaser />

      {/* ==========================================
          SECTION 8 — UTILITY GRID
          ========================================== */}
      <motion.section
        {...SECTION_ANIM}
        className={styles.utilityGrid}
      >
        <div className={styles.ugInner}>
          {/* Block 1 */}
          <div className={styles.ugBlock}>
            <h3 className={styles.ugHeading}>Contact Us</h3>
            <p className={styles.ugBody}>
              Get in touch to discuss your project, design requirements, or
              general enquiries.
            </p>
            <Link href="/contact" className={styles.goldCta}>
              VIEW DETAILS <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>

          {/* Block 2 */}
          <div className={styles.ugBlock}>
            <h3 className={styles.ugHeading}>Our Process</h3>
            <p className={styles.ugBody}>
              Learn about our workflow, design stages, and how we bring
              concepts to life.
            </p>
            <Link href="/services" className={styles.goldCta}>
              VIEW DETAILS <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>

          {/* Block 3 */}
          <div className={styles.ugBlock}>
            <h3 className={styles.ugHeading}>Design Services</h3>
            <p className={styles.ugBody}>
              Explore our residential, commercial, architectural, and turnkey
              solutions.
            </p>
            <Link href="/services" className={styles.goldCta}>
              VIEW DETAILS <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>

          {/* Block 4 */}
          <div className={styles.ugBlock}>
            <h3 className={styles.ugHeading}>Newsletter</h3>
            <p className={styles.ugBody}>
              Sign up to receive studio updates, design inspiration, and project highlights.
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new Event('open-newsletter-popup'));
              }}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              className={styles.goldCta}
            >
              SIGN UP <span className={styles.ctaArrow}>→</span>
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
