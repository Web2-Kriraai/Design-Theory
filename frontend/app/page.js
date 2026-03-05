'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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

  return (
    <div>
      {/* ==========================================
          SECTION 1 — HERO
          ========================================== */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src="/assets/hero/hero1.jpg"
            alt="The Design Theory — Editorial Interior"
            fill
            className={styles.heroImg}
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>The Design Theory</h1>
          <p className={styles.heroTagline}>
            Designing thoughtful spaces for modern living.
          </p>
        </div>
      </section>

      {/* ==========================================
          SECTION 2 — INTRODUCTORY TEXT
          ========================================== */}
      <section className={styles.intro}>
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
      </section>

      {/* ==========================================
          SECTION 3 — FEATURED PROJECTS
          ========================================== */}
      <section className={styles.featuredProjects}>
        <div className={styles.fpInner}>
          <div className={styles.fpImages}>
            <div className={styles.fpImageWrap}>
              <Image
                src="/assets/styles/high-living.jpg"
                alt="Featured Project — High Living"
                width={600}
                height={600}
                className={styles.fpImg}
              />
            </div>
            <div className={styles.fpImageWrap}>
              <Image
                src="/assets/styles/tailor-made.jpg"
                alt="Featured Project — Tailor Made"
                width={600}
                height={600}
                className={styles.fpImg}
              />
            </div>
          </div>
          <div className={styles.fpContent}>
            <p className={styles.sectionLabel}>Our Work</p>
            <h2 className={styles.serifHeading}>Selected Projects</h2>
            <p className={styles.bodyText}>
              Each project begins with understanding the people who inhabit a
              space. From intimate residences to expansive commercial interiors,
              we craft environments that tell a story — rooted in purpose,
              elevated by design.
            </p>
            <Link href="/portfolio" className={styles.goldCta}>
              VIEW PORTFOLIO <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4 — DESIGN PHILOSOPHY
          ========================================== */}
      <section className={styles.philosophy}>
        <div className={styles.philoInner}>
          <div className={styles.philoImages}>
            <div className={styles.philoImgWrap}>
              <Image
                src="/assets/services/decor.jpg"
                alt="Design Philosophy — Decor Detail"
                width={480}
                height={360}
                className={styles.philoImg}
              />
            </div>
            <div className={styles.philoImgWrap}>
              <Image
                src="/assets/services/furniture-carte.jpg"
                alt="Design Philosophy — Furniture"
                width={480}
                height={360}
                className={styles.philoImg}
              />
            </div>
          </div>
          <div className={styles.philoText}>
            <p className={styles.sectionLabel}>Our Approach</p>
            <h2 className={styles.serifHeading}>Design Philosophy</h2>
            <p className={styles.bodyText}>
              We believe design should be intentional — a harmonious balance
              between form and function, beauty and comfort. Every material,
              texture, and spatial decision is guided by purpose. Our philosophy
              centres on creating spaces that are not only visually striking but
              deeply personal, reflecting the unique essence of those who
              inhabit them.
            </p>
            <Link href="/services" className={styles.goldCta}>
              LEARN MORE <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5 — TESTIMONIALS
          ========================================== */}
      <section className={styles.testimonials}>
        <div className={styles.testiInner}>
          <h2 className={styles.testiHeading}>Client Testimonials</h2>
          <div className={styles.testiSlider} key={testiIndex}>
            <div className={styles.testiSlide}>
              <p className={styles.testiQuote}>
                {testimonials[testiIndex].quote}
              </p>
              <p className={styles.testiAuthor}>
                {testimonials[testiIndex].author}
              </p>
              <p className={styles.testiRole}>
                {testimonials[testiIndex].role}
              </p>
            </div>
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
      </section>

      {/* ==========================================
          SECTION 6 — FEATURED PROJECT
          ========================================== */}
      <section className={styles.featuredProject}>
        <div className={styles.fpSingleInner}>
          <div className={styles.fpSingleImgWrap}>
            <Image
              src="/assets/styles/easy-care.jpg"
              alt="Featured Project — Easy Care"
              width={600}
              height={800}
              className={styles.fpSingleImg}
            />
          </div>
          <div className={styles.fpSingleText}>
            <p className={styles.sectionLabel}>Spotlight</p>
            <h2 className={styles.serifHeading}>Featured Project</h2>
            <p className={styles.bodyText}>
              A contemporary residence designed to embrace natural light and
              fluid living. Clean lines, warm materials, and curated details
              come together to create a home that feels both sophisticated and
              deeply comfortable — a true reflection of modern living.
            </p>
            <Link href="/portfolio" className={styles.goldCta}>
              VIEW PROJECT <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 7 — ABOUT TEASER
          ========================================== */}
      <AboutTeaser />

      {/* ==========================================
          SECTION 8 — UTILITY GRID
          ========================================== */}
      <section className={styles.utilityGrid}>
        <div className={styles.ugInner}>
          {/* Block 1 */}
          <div className={styles.ugBlock}>
            <h3 className={styles.ugHeading}>Contact Us</h3>
            <p className={styles.ugBody}>
              Get in touch to discuss your project. We'd love to hear about your
              vision and explore how we can bring it to life.
            </p>
            <Link href="/contact" className={styles.goldCta}>
              VIEW DETAILS <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>

          {/* Block 2 */}
          <div className={styles.ugBlock}>
            <h3 className={styles.ugHeading}>Our Process</h3>
            <p className={styles.ugBody}>
              Learn about our workflow — from initial consultation and concept
              development through to execution and final handover.
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
              design offerings tailored to your unique needs.
            </p>
            <Link href="/services" className={styles.goldCta}>
              VIEW DETAILS <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>

          {/* Block 4 */}
          <div className={styles.ugBlock}>
            <h3 className={styles.ugHeading}>Newsletter</h3>
            <p className={styles.ugBody}>
              Sign up to receive studio updates, project reveals, design
              inspiration, and exclusive insights from The Design Theory.
            </p>
            <Link href="#newsletter" className={styles.goldCta}>
              SIGN UP <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
