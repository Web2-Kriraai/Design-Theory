'use client';

import { useState } from "react";
import Image from "@/app/components/AnimatedImage";
import Link from "next/link";
import styles from "./careers.module.css";

export default function CareersPage() {
    const [openJob, setOpenJob] = useState(null);

    const toggleJob = (index) => {
        setOpenJob(openJob === index ? null : index);
    };

    return (
        <main className={styles.page}>
            {/* ── HERO BANNER ── */}
            <section className={styles.hero}>
                <div className={styles.heroImageWrap}>
                    <Image
                        src="/assets/process/design-in-progress.jpg"
                        alt="Careers at The Design Theory"
                        fill
                        className={styles.heroImg}
                        priority={true}
                        sizes="100vw"
                    />
                </div>
                <div className={styles.heroOverlay} />
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>Careers at The Design Theory</h1>
                    <p className={styles.heroTagline}>
                        Build spaces. Build ideas. Build your future.
                    </p>
                    <Link href="#openings" className={styles.goldBtn}>
                        View Openings
                    </Link>
                </div>
            </section>

            {/* ── STUDIO CULTURE / WHY WORK WITH US ── */}
            <section className={styles.twoColSection}>
                <div className={styles.twoColInner}>
                    <div className={styles.colText}>
                        <h2 className={styles.headingLeft}>Join Our Creative Journey</h2>
                        <p className={styles.bodyTextLeft}>
                            At The Design Theory, we believe great design is born from
                            passionate minds, collaborative energy, and fearless creativity. We
                            are constantly looking for talented individuals who share our vision
                            of transforming spaces into meaningful, functional, and inspiring
                            environments.
                        </p>

                        <h3 className={styles.subHeadingLeft}>Why Work With Us</h3>
                        <ul className={styles.bulletListLeft}>
                            <li className={styles.bulletItem}>
                                Opportunity to work on diverse architectural and interior projects
                            </li>
                            <li className={styles.bulletItem}>
                                Exposure to residential, commercial, and workspace design
                            </li>
                            <li className={styles.bulletItem}>
                                Collaborative and growth-oriented studio culture
                            </li>
                            <li className={styles.bulletItem}>
                                Hands-on project involvement from concept to execution
                            </li>
                        </ul>
                    </div>
                    <div className={styles.colImageWrap}>
                        <Image
                            src="/assets/styles/high-living.jpg"
                            alt="Studio Environment"
                            fill
                            className={styles.colImage}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </section>

            {/* ── CURRENT OPENINGS ── */}
            <section id="openings" className={styles.sectionBlockAlt}>
                <div className={styles.innerWide}>
                    <h2 className={styles.heading}>Current Openings</h2>

                    <div className={styles.accordionList}>
                        {/* Job 1 */}
                        <div className={styles.accordionItem}>
                            <button
                                className={styles.accordionToggle}
                                onClick={() => toggleJob(0)}
                                aria-expanded={openJob === 0}
                            >
                                <span className={styles.jobTitle}>Interior Designer</span>
                                <span className={`${styles.plusIcon} ${openJob === 0 ? styles.open : ""}`}>
                                    +
                                </span>
                            </button>
                            <div className={`${styles.accordionContentWrap} ${openJob === 0 ? styles.open : ""}`}>
                                <div className={styles.accordionContent}>
                                    <p className={styles.roleSubhead}>Role Overview</p>
                                    <p className={styles.roleText}>
                                        We are looking for a creative and detail-oriented Interior
                                        Designer to join our team. You will be responsible for developing
                                        design concepts, preparing presentations, and executing design
                                        plans for high-end residential and commercial projects.
                                    </p>

                                    <div className={styles.jobDetailsGrid}>
                                        <div>
                                            <p className={styles.roleSubhead}>Responsibilities</p>
                                            <ul className={styles.roleList}>
                                                <li>Develop conceptual designs and space plans</li>
                                                <li>Create detailed 2D/3D layouts and mood boards</li>
                                                <li>Select and specify materials, finishes, and furniture</li>
                                                <li>Coordinate with vendors, contractors, and clients</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className={styles.roleSubhead}>Requirements</p>
                                            <ul className={styles.roleList}>
                                                <li>Bachelor’s degree in Interior Design or Architecture</li>
                                                <li>2-3 years of proven experience in luxury interiors</li>
                                                <li>Proficiency in AutoCAD, SketchUp, and rendering software</li>
                                                <li>Strong understanding of materials and detailing</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <a href="mailto:careers@thedesigntheory.in?subject=Application for Interior Designer" className={styles.goldBtnDark}>
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Job 2 */}
                        <div className={styles.accordionItem}>
                            <button
                                className={styles.accordionToggle}
                                onClick={() => toggleJob(1)}
                                aria-expanded={openJob === 1}
                            >
                                <span className={styles.jobTitle}>Architectural Designer</span>
                                <span className={`${styles.plusIcon} ${openJob === 1 ? styles.open : ""}`}>
                                    +
                                </span>
                            </button>
                            <div className={`${styles.accordionContentWrap} ${openJob === 1 ? styles.open : ""}`}>
                                <div className={styles.accordionContent}>
                                    <p className={styles.roleSubhead}>Role Overview</p>
                                    <p className={styles.roleText}>
                                        Seeking a talented Architectural Designer to assist in all phases
                                        of architectural planning and execution. The ideal candidate will
                                        have a strong eye for form, proportion, and structural harmony.
                                    </p>

                                    <div className={styles.jobDetailsGrid}>
                                        <div>
                                            <p className={styles.roleSubhead}>Responsibilities</p>
                                            <ul className={styles.roleList}>
                                                <li>Assist in conceptualizing building designs</li>
                                                <li>Produce detailed architectural working drawings</li>
                                                <li>Ensure compliance with local building codes</li>
                                                <li>Visit sites and monitor construction progress</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className={styles.roleSubhead}>Requirements</p>
                                            <ul className={styles.roleList}>
                                                <li>B.Arch degree</li>
                                                <li>1-3 years of architectural design experience</li>
                                                <li>Expert proficiency in AutoCAD and Revit/SketchUp</li>
                                                <li>Excellent problem-solving and communication skills</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <a href="mailto:careers@thedesigntheory.in?subject=Application for Architectural Designer" className={styles.goldBtnDark}>
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── HOW TO APPLY & INTERNSHIPS ── */}
            <section className={styles.sectionBlockAlt}>
                <div className={styles.inner}>
                    <h2 className={styles.heading}>How To Apply</h2>
                    <p className={styles.bodyText}>
                        If you are excited to build with us, please share the following
                        documents to process your application:
                    </p>

                    <ul className={styles.bulletList} style={{ alignItems: "center" }}>
                        <li className={styles.bulletItem}>Updated Resume</li>
                        <li className={styles.bulletItem}>Portfolio (PDF or Drive Link)</li>
                        <li className={styles.bulletItem}>
                            Cover Letter (optional but recommended)
                        </li>
                    </ul>

                    <div className={styles.applyBox}>
                        <p className={styles.bodyText} style={{ marginBottom: 0 }}>
                            <em>
                                * Please mention the position you are applying for in the
                                subject line.
                            </em>
                        </p>
                        <a
                            href="mailto:careers@thedesigntheory.in"
                            className={styles.emailCta}
                        >
                            📩 Email your application to: careers@thedesigntheory.in
                        </a>
                    </div>

                    {/* ── INTERNSHIPS ── */}
                    <div className={styles.internshipBlock}>
                        <h2 className={styles.headingSoft}>Internship Opportunities</h2>
                        <p className={styles.bodyText} style={{ maxWidth: "700px", margin: "0 auto" }}>
                            We also welcome enthusiastic design students who are eager to
                            learn and gain real-world experience in architecture and interior
                            design projects. Send your portfolio to the email above with
                            "Internship Application" in the subject line.
                        </p>
                    </div>

                    {/* ── CONTACT CTA ── */}
                    <div className={styles.contactCtaBlock}>
                        <h3 className={styles.contactCtaText}>
                            Don’t see a suitable opening? <br />
                            <a href="mailto:careers@thedesigntheory.in" className={styles.goldLink}>Send us your portfolio anyway.</a>
                        </h3>
                    </div>
                </div>
            </section>

            {/* ── CLOSING STATEMENT ── */}
            <section className={styles.closingSection}>
                <div className={styles.closingInner}>
                    <p className={styles.closingText}>
                        "At The Design Theory, we don’t just design spaces — we create experiences, stories, and environments that reflect individuality and purpose. We value dedication, creativity, and integrity, and we look forward to welcoming talented professionals who share our passion."
                    </p>
                </div>
            </section>
        </main>
    );
}
