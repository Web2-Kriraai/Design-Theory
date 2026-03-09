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
                        {/* <div className={styles.accordionItem}>
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
                        </div> */}

                        {/* Job 2 */}
                        {/* <div className={styles.accordionItem}>
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
                        </div> */}

                        {/* Job 1-6 */}
                        <div className={styles.accordionItem}>
                            <button
                                className={styles.accordionToggle}
                                onClick={() => toggleJob(0)}
                                aria-expanded={openJob === 0}
                            >
                                <span className={styles.jobTitle}>Senior Project Manager</span>
                                <span className={`${styles.plusIcon} ${openJob === 0 ? styles.open : ""}`}>
                                    +
                                </span>
                            </button>
                            <div className={`${styles.accordionContentWrap} ${openJob === 0 ? styles.open : ""}`}>
                                <div className={styles.accordionContent}>
                                    <p className={styles.roleSubhead}>Role Overview</p>
                                    <p className={styles.roleText}>
                                        We are looking for an experienced Senior Project Manager to lead and manage projects from initiation to completion while ensuring timely delivery and high quality standards.
                                    </p>

                                    <div className={styles.jobDetailsGrid}>
                                        <div>
                                            <p className={styles.roleSubhead}>Responsibilities</p>
                                            <ul className={styles.roleList}>
                                                <li>Plan and oversee project activities from start to completion</li>
                                                <li>Coordinate with architects, engineers, and contractors</li>
                                                <li>Monitor project timelines, budgets, and resources</li>
                                                <li>Ensure compliance with safety and quality standards</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className={styles.roleSubhead}>Requirements</p>
                                            <ul className={styles.roleList}>
                                                <li>Bachelor’s degree in Engineering, Architecture, or related field</li>
                                                <li>4+ years of project management experience</li>
                                                <li>Strong leadership and communication skills</li>
                                                <li>Experience with project planning tools</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <a href="mailto:info@thedesigntheory.in?subject=Application for Senior Project Manager" className={styles.goldBtnDark}>
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className={styles.accordionItem}>
                            <button
                                className={styles.accordionToggle}
                                onClick={() => toggleJob(1)}
                                aria-expanded={openJob === 1}
                            >
                                <span className={styles.jobTitle}>Site Engineer</span>
                                <span className={`${styles.plusIcon} ${openJob === 1 ? styles.open : ""}`}>
                                    +
                                </span>
                            </button>
                            <div className={`${styles.accordionContentWrap} ${openJob === 1 ? styles.open : ""}`}>
                                <div className={styles.accordionContent}>
                                    <p className={styles.roleSubhead}>Role Overview</p>
                                    <p className={styles.roleText}>
                                        We are seeking a dedicated Site Engineer to supervise on-site construction activities and ensure projects are executed according to plans and safety standards.
                                    </p>

                                    <div className={styles.jobDetailsGrid}>
                                        <div>
                                            <p className={styles.roleSubhead}>Responsibilities</p>
                                            <ul className={styles.roleList}>
                                                <li>Supervise day-to-day construction activities</li>
                                                <li>Ensure work follows approved drawings and specifications</li>
                                                <li>Coordinate with contractors and suppliers</li>
                                                <li>Monitor site safety and quality standards</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className={styles.roleSubhead}>Requirements</p>
                                            <ul className={styles.roleList}>
                                                <li>Bachelor’s degree in Civil Engineering</li>
                                                <li>2-3 years of site supervision experience</li>
                                                <li>Ability to read technical drawings</li>
                                                <li>Strong communication and coordination skills</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <a href="mailto:info@thedesigntheory.in?subject=Application for Site Engineer" className={styles.goldBtnDark}>
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className={styles.accordionItem}>
                            <button
                                className={styles.accordionToggle}
                                onClick={() => toggleJob(2)}
                                aria-expanded={openJob === 2}
                            >
                                <span className={styles.jobTitle}>Senior Architect Engineer</span>
                                <span className={`${styles.plusIcon} ${openJob === 2 ? styles.open : ""}`}>
                                    +
                                </span>
                            </button>
                            <div className={`${styles.accordionContentWrap} ${openJob === 2 ? styles.open : ""}`}>
                                <div className={styles.accordionContent}>
                                    <p className={styles.roleSubhead}>Role Overview</p>
                                    <p className={styles.roleText}>
                                        We are looking for a creative Senior Architect to develop architectural concepts and oversee design execution for residential and commercial projects.
                                    </p>

                                    <div className={styles.jobDetailsGrid}>
                                        <div>
                                            <p className={styles.roleSubhead}>Responsibilities</p>
                                            <ul className={styles.roleList}>
                                                <li>Develop architectural concepts and design plans</li>
                                                <li>Lead client presentations and discussions</li>
                                                <li>Coordinate with engineering and project teams</li>
                                                <li>Ensure compliance with building regulations</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className={styles.roleSubhead}>Requirements</p>
                                            <ul className={styles.roleList}>
                                                <li>Bachelor’s or Master’s degree in Architecture</li>
                                                <li>5+ years of architectural experience</li>
                                                <li>Proficiency in AutoCAD, SketchUp, or Revit</li>
                                                <li>Strong design and visualization skills</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <a href="mailto:info@thedesigntheory.in?subject=Application for Senior Architect" className={styles.goldBtnDark}>
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className={styles.accordionItem}>
                            <button
                                className={styles.accordionToggle}
                                onClick={() => toggleJob(3)}
                                aria-expanded={openJob === 3}
                            >
                                <span className={styles.jobTitle}>Executive Assistant</span>
                                <span className={`${styles.plusIcon} ${openJob === 3 ? styles.open : ""}`}>
                                    +
                                </span>
                            </button>
                            <div className={`${styles.accordionContentWrap} ${openJob === 3 ? styles.open : ""}`}>
                                <div className={styles.accordionContent}>
                                    <p className={styles.roleSubhead}>Role Overview</p>
                                    <p className={styles.roleText}>
                                        We are seeking an organized Executive Assistant to provide administrative support and assist management in daily operations.
                                    </p>

                                    <div className={styles.jobDetailsGrid}>
                                        <div>
                                            <p className={styles.roleSubhead}>Responsibilities</p>
                                            <ul className={styles.roleList}>
                                                <li>Manage schedules, meetings, and appointments</li>
                                                <li>Handle emails, documentation, and reports</li>
                                                <li>Prepare presentations and meeting notes</li>
                                                <li>Coordinate internal communications</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className={styles.roleSubhead}>Requirements</p>
                                            <ul className={styles.roleList}>
                                                <li>Bachelor’s degree in Business Administration</li>
                                                <li>2–4 years of administrative experience</li>
                                                <li>Strong organizational and communication skills</li>
                                                <li>Proficiency in MS Office</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <a href="mailto:info@thedesigntheory.in?subject=Application for Executive Assistant" className={styles.goldBtnDark}>
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className={styles.accordionItem}>
                            <button
                                className={styles.accordionToggle}
                                onClick={() => toggleJob(4)}
                                aria-expanded={openJob === 4}
                            >
                                <span className={styles.jobTitle}>Digital Marketing Manager</span>
                                <span className={`${styles.plusIcon} ${openJob === 4 ? styles.open : ""}`}>
                                    +
                                </span>
                            </button>
                            <div className={`${styles.accordionContentWrap} ${openJob === 4 ? styles.open : ""}`}>
                                <div className={styles.accordionContent}>
                                    <p className={styles.roleSubhead}>Role Overview</p>
                                    <p className={styles.roleText}>
                                        We are looking for a Digital Marketing Manager to plan and execute marketing strategies that increase brand visibility and generate business leads.
                                    </p>

                                    <div className={styles.jobDetailsGrid}>
                                        <div>
                                            <p className={styles.roleSubhead}>Responsibilities</p>
                                            <ul className={styles.roleList}>
                                                <li>Develop and manage digital marketing campaigns</li>
                                                <li>Manage social media platforms and branding</li>
                                                <li>Optimize website content for SEO</li>
                                                <li>Analyze campaign performance</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className={styles.roleSubhead}>Requirements</p>
                                            <ul className={styles.roleList}>
                                                <li>Bachelor’s degree in Marketing or Business</li>
                                                <li>3+ years of digital marketing experience</li>
                                                <li>Knowledge of SEO, SEM, and analytics tools</li>
                                                <li>Strong analytical skills</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <a href="mailto:info@thedesigntheory.in?subject=Application for Digital Marketing Manager" className={styles.goldBtnDark}>
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className={styles.accordionItem}>
                            <button
                                className={styles.accordionToggle}
                                onClick={() => toggleJob(5)}
                                aria-expanded={openJob === 5}
                            >
                                <span className={styles.jobTitle}>Operations Manager</span>
                                <span className={`${styles.plusIcon} ${openJob === 5 ? styles.open : ""}`}>
                                    +
                                </span>
                            </button>
                            <div className={`${styles.accordionContentWrap} ${openJob === 5 ? styles.open : ""}`}>
                                <div className={styles.accordionContent}>
                                    <p className={styles.roleSubhead}>Role Overview</p>
                                    <p className={styles.roleText}>
                                        We are seeking an experienced Operations Manager to oversee daily operations and ensure smooth workflow across departments.
                                    </p>

                                    <div className={styles.jobDetailsGrid}>
                                        <div>
                                            <p className={styles.roleSubhead}>Responsibilities</p>
                                            <ul className={styles.roleList}>
                                                <li>Manage daily operational activities</li>
                                                <li>Coordinate between departments</li>
                                                <li>Improve operational efficiency</li>
                                                <li>Monitor budgets and resources</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className={styles.roleSubhead}>Requirements</p>
                                            <ul className={styles.roleList}>
                                                <li>Bachelor’s degree in Business Administration</li>
                                                <li>5+ years of operations management experience</li>
                                                <li>Strong leadership and problem-solving skills</li>
                                                <li>Excellent organizational abilities</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <a href="mailto:info@thedesigntheory.in?subject=Application for Operations Manager" className={styles.goldBtnDark}>
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
