'use client';

import Image from "./components/AnimatedImage";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import styles from "./home.module.css";

const HomeContact = dynamic(() => import("./components/HomeContact"));
const PortfolioGlimpse = dynamic(() => import("./components/PortfolioGlimpse"));

/* ── Workflow Steps ── */
const WORKFLOW = [
    { step: "01", title: "Consultation", desc: "Understanding your vision, requirements, and lifestyle." },
    { step: "02", title: "Planning", desc: "Space planning, budgeting, and concept development." },
    { step: "03", title: "Design", desc: "Detailed drawings, 3D renders, and material selection." },
    { step: "04", title: "Execution", desc: "On-site coordination, vendor management, and quality checks." },
    { step: "05", title: "Delivery", desc: "Final handover of a polished, complete space." },
];

/* ── Portfolio Categories ── */
const PORTFOLIO_CATEGORIES = [
    {
        label: "Interior Design",
        href: "/portfolio",
        images: [
            "/assets/styles/high-living.jpg",
            "/assets/styles/tailor-made.jpg",
        ],
    },
    {
        label: "Architecture",
        href: "/portfolio",
        images: [
            "/assets/process/work-in-progress.jpg",
            "/assets/styles/easy-care.jpg",
        ],
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.85, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] },
    }),
};

export default function Home() {
    return (
        <div>

            {/* ============================================
                HERO — Full-width banner
            ============================================ */}
            <section className={styles.hero}>
                <div className={styles.heroImageWrap}>
                    <Image
                        src="/assets/hero/hero1.jpg"
                        alt="The Design Theory — Hero"
                        fill
                        className={styles.heroImg}
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className={styles.heroOverlay} />
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                    className={styles.heroText}
                >
                    <h1 className={styles.heroEyebrow}>The Design Theory</h1>
                    <p className={styles.heroTitle}>
                        Designing Thoughtful<br /><em>Spaces for Modern Living</em>
                    </p>
                </motion.div>
            </section>

            {/* ============================================
            ABOUT COMPANY — Side by side Layout
        ============================================ */}
            <section className={styles.aboutCompany}>
                <div className={styles.aboutCompanyInner}>

                    {/* Left Side: Text Box */}
                    <div className={styles.aboutCompanyText}>
                        <motion.h2
                            className={styles.aboutCompanyTitle}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.1}
                        >
                            A Contemporary Studio<br />Rooted in Thoughtful Design
                        </motion.h2>
                        <div className={styles.aboutCompanyBody}>
                            <motion.p
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={0.2}
                            >
                                The Design Theory is a young, dynamic interior and architectural design studio based in
                                Hyderabad, India. We specialise in creating refined residential and commercial spaces
                                that balance aesthetics, functionality, and individuality.
                            </motion.p>
                            <motion.p
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={0.3}
                            >
                                Led by a deep understanding of design principles and client aspirations, our work is
                                rooted in thoughtful planning, attention to detail, and timeless design sensibility.
                                We deliver spaces that feel personal, purposeful, and enduring.
                            </motion.p>
                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={0.4}
                            >
                                <Link href="/about-us" className={styles.textCta}>
                                    Our Story <span>→</span>
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side: Image Box */}
                    <motion.div
                        className={styles.aboutCompanyImage}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        <div className={styles.aboutImgWrapper}>
                            <Image
                                src="/assets/testimonial/avatar1.jpg"
                                alt="The Design Theory Studio"
                                fill
                                className={styles.aboutImg}
                                sizes="(max-width: 768px) 100vw, 45vw"
                            />
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* ============================================
                ABOUT FOUNDER — Image + Bio, full-width
            ============================================ */}
            <section className={styles.aboutFounder}>
                <div className={styles.founderInner}>
                    <motion.div
                        className={styles.founderImageCol}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className={styles.founderImageWrap}>
                            <Image
                                src="/assets/about/founder.png"
                                alt="Rachitha Modupalli — Founder, The Design Theory"
                                fill
                                className={styles.founderImage}
                                sizes="(max-width: 768px) 100vw, 45vw"
                            />
                        </div>
                        <div className={styles.founderCaption}>
                            <span className={styles.founderName}>Rachitha Modupalli</span>
                            <span className={styles.founderRole}>Founder &amp; Principal Architect</span>
                        </div>
                    </motion.div>

                    <div className={styles.founderTextCol}>
                        <motion.p
                            className={styles.sectionEyebrow}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            About the Founder
                        </motion.p>
                        <motion.h2
                            className={styles.founderHeading}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.1}
                        >
                            Design Begins<br /><em>with a Vision</em>
                        </motion.h2>
                        <motion.p
                            className={styles.founderBio}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.2}
                        >
                            Rachitha Modupalli, Founder and Principal Architect of The Design Theory, holds a
                            Bachelor's degree in Architecture from SVCA, Hyderabad. Her professional journey
                            began with leading design and build firms where she gained extensive experience in
                            architectural planning, project execution, and client collaboration.
                        </motion.p>
                        <motion.p
                            className={styles.founderBio}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.3}
                        >
                            Inspired by her passion for creating meaningful spaces, she established The Design
                            Theory to pursue a design vision that prioritises individuality, innovation, and
                            emotional connection — resulting in interiors that feel serene, sophisticated, and enduring.
                        </motion.p>
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.4}
                        >
                            <Link href="/about-us" className={styles.textCta}>
                                Read Full Story <span>→</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============================================
                PORTFOLIO — Two category sections
            ============================================ */}
            <section className={styles.portfolioSection}>
                <div className={styles.portfolioHeader}>
                    <motion.h2
                        className={styles.portfolioTitle}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.1}
                    >
                        Portfolio
                    </motion.h2>
                </div>

                {PORTFOLIO_CATEGORIES.map((cat, ci) => (
                    <div key={cat.label} className={`${styles.portfolioCategory} ${ci % 2 !== 0 ? styles.portfolioCategoryAlt : ''}`}>
                        <div className={styles.portfolioCategoryInner}>
                            <div className={styles.portfolioImages}>
                                {cat.images.map((src, ii) => (
                                    <motion.div
                                        key={src}
                                        className={styles.portfolioImageWrap}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        custom={ii * 0.15}
                                    >
                                        <Image
                                            src={src}
                                            alt={`${cat.label} project ${ii + 1}`}
                                            fill
                                            className={styles.portfolioImage}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <div className={styles.portfolioCategoryText}>
                                <motion.h3
                                    className={styles.portfolioCategoryLabel}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    {cat.label}
                                </motion.h3>
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    custom={0.1}
                                >
                                    <Link href={cat.href} className={styles.viewMoreBtn}>
                                        View More →
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* ============================================
                DESIGN PHILOSOPHY + WORKFLOW
            ============================================ */}
            <section className={styles.philosophySection}>
                <div className={styles.philosophyInner}>
                    <div className={styles.philosophyText}>
                        <motion.h2
                            className={styles.philosophyHeading}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.1}
                        >
                            Design<br /><em>Philosophy</em>
                        </motion.h2>
                        <motion.p
                            className={styles.philosophyBody}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.2}
                        >
                            At The Design Theory, every space tells a story. Our design approach is
                            collaborative, client-focused, and driven by innovation. From concept to
                            execution, we ensure that every project reflects the client's vision
                            while maintaining functionality, comfort, and elegance.
                        </motion.p>
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.3}
                        >
                            <Link href="/services" className={styles.textCta}>
                                Our Services <span>→</span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Workflow Steps */}
                    <div className={styles.workflowSteps}>
                        {WORKFLOW.map((step, i) => (
                            <motion.div
                                key={step.step}
                                className={styles.workflowStep}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i * 0.1}
                            >
                                <div className={styles.workflowConnector}>
                                    <span className={styles.workflowNum}>{step.step}</span>
                                    {i < WORKFLOW.length - 1 && (
                                        <span className={styles.workflowLine} />
                                    )}
                                </div>
                                <h3 className={styles.workflowTitle}>{step.title}</h3>
                                <p className={styles.workflowDesc}>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================
                ENQUIRY FORM — HomeContact matches /contact
            ============================================ */}
            <HomeContact />

            {/* ============================================
                PORTFOLIO GLIMPSE — Auto-scrolling Masonry
            ============================================ */}
            <PortfolioGlimpse />

        </div>
    );
}
