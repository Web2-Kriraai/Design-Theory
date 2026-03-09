'use client';

import Image from "@/app/components/AnimatedImage";
import Link from "next/link";
import styles from "./about.module.css";

export default function AboutUsPage() {
    return (
        <main className={styles.page}>
            {/* ── PAGE HEADER ── */}
            <div className={styles.pageHeader}>
                <p className={styles.pageLabel}>Who We Are</p>
                <h1 className={styles.pageTitle}>The Design Theory</h1>
                <p className={styles.introText}>
                    The Design Theory is a contemporary architecture and interior design
                    studio based in Hyderabad, dedicated to creating thoughtfully curated
                    residential, commercial, and workspace environments. Established by
                    architect Rachitha Modupalli, the studio was founded with a clear
                    vision — to craft spaces that seamlessly blend functionality,
                    individuality, and refined aesthetics.
                </p>
                <p className={styles.introText}>
                    Young, dynamic, and deeply client-focused, The Design Theory
                    approaches each project as a unique narrative. The studio specialises
                    in architecture, luxury residential interiors, workplace design, and
                    refurbishment projects, offering complete design and build solutions
                    tailored to each client’s lifestyle and aspirations.
                </p>
                <p className={styles.introText}>
                    With an expanding presence across Hyderabad, Vijayawada, and Nellore,
                    The Design Theory continues to grow while maintaining its commitment
                    to personalised service, meticulous execution, and timeless design
                    sensibilities.
                </p>
            </div>

            {/* ── OUR APPROACH (Image Left, Text Right) ── */}
            <section className={styles.section}>
                <div className={styles.inner}>
                    <div className={`${styles.imageWrap} ${styles.imageWrapHover}`}>
                        <Image
                            src="/assets/process/personal-stage.jpg"
                            alt="The Design Theory — Our Approach"
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className={styles.textContent}>
                        <h2 className={styles.heading}>Our Approach</h2>
                        <p className={styles.bodyText}>
                            At The Design Theory, design begins with understanding people.
                            Every project is approached through a multidisciplinary lens,
                            ensuring that architecture, interior design, spatial planning,
                            and material selection work cohesively to create harmonious
                            environments.
                        </p>
                        <p className={styles.bodyText}>
                            The studio is recognised for delivering client-centric design
                            solutions that balance creativity with practicality. Each space
                            is carefully crafted to reflect the personality, functionality,
                            and long-term vision of its occupants.
                        </p>
                        <p className={styles.bodyText}>
                            The Design Theory believes that exceptional design should be
                            accessible and sustainable. The team actively sources eco-conscious
                            materials, innovative construction solutions, and responsibly
                            manufactured components, ensuring that projects are not only
                            aesthetically refined but also environmentally mindful.
                        </p>
                        <p className={styles.bodyText}>
                            Driven by precision and attention to detail, the studio is committed
                            to delivering superior quality while maintaining transparency in cost
                            and execution. Client satisfaction remains the foundation of every
                            project undertaken.
                        </p>
                        <Link href="/services" className={styles.goldCta}>
                            DISCOVER OUR SERVICES <span className={styles.ctaArrow}>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── DESIGN PHILOSOPHY (Text Left, Image Right) ── */}
            <section className={styles.sectionAlt}>
                <div className={styles.innerRev}>
                    <div className={`${styles.imageWrap} ${styles.imageWrapHover}`}>
                        <Image
                            src="/assets/process/work-in-progress.jpg"
                            alt="The Design Theory — Design Philosophy"
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className={styles.textContent}>
                        <h2 className={styles.heading}>Design Philosophy</h2>
                        <p className={styles.bodyText}>
                            The Design Theory is guided by a philosophy that celebrates the
                            delicate balance between modern sophistication and understated
                            minimalism. Every project is designed to be distinctive, yet timeless
                            — spaces that evolve naturally with the lives of those who inhabit them.
                        </p>
                        <p className={styles.bodyText}>
                            The studio believes that every environment carries a story waiting
                            to be told. Through careful spatial planning, material exploration,
                            and thoughtful detailing, The Design Theory transforms abstract
                            ideas into immersive, functional, and emotionally resonant spaces.
                        </p>
                        <p className={styles.bodyText}>
                            Design decisions are driven by clarity, proportion, and craftsmanship.
                            From conceptual development to final execution, the studio focuses
                            on creating interiors and architectural spaces that are elegant,
                            practical, and deeply personal.
                        </p>
                        <Link href="/portfolio" className={styles.goldCta}>
                            VIEW OUR WORK <span className={styles.ctaArrow}>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FOUNDER'S MESSAGE ── */}
            <section className={styles.founderProfile}>
                <div className={styles.founderInner}>
                    <div className={styles.founderHeader}>
                        <h2 className={styles.founderTitle}>Founder’s Message</h2>
                        <p className={styles.founderSubtitle}>Rachitha Modupalli</p>
                    </div>

                    <div className={styles.founderContent}>
                        <div className={styles.founderImageWrap}>
                            <div className={styles.cornerTL}></div>
                            <div className={styles.cornerBR}></div>
                            <div className={styles.founderImageInner}>
                                <Image
                                    src="/assets/about/founder.webp"
                                    alt="Rachitha Modupalli – Founder, The Design Theory"
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                            </div>
                        </div>

                        <div className={styles.founderText}>
                            <p>
                                Rachitha Modupalli, Founder and Principal Architect of The Design
                                Theory, holds a Bachelor’s degree in Architecture from SVCA,
                                Hyderabad. Her professional journey began with leading design and
                                build firms in Hyderabad, where she gained extensive hands-on
                                experience in architectural planning, project execution, and client
                                collaboration.
                            </p>
                            <p>
                                Inspired by her passion for creating meaningful spaces, Rachitha
                                established The Design Theory to pursue her independent design
                                vision — one that prioritises individuality, innovation, and
                                emotional connection within design.
                            </p>
                            <p>
                                Her work is characterised by contemporary aesthetics layered with
                                transitional influences, resulting in interiors that feel serene,
                                sophisticated, and enduring. Rachitha strongly believes in exceeding
                                client expectations while respecting their vision, lifestyle, and
                                functional requirements.
                            </p>
                            <p>
                                Her creative process is driven by curiosity, experimentation, and
                                attention to the finest details. She approaches every project with
                                complete ownership, ensuring that each design reflects precision,
                                craftsmanship, and authenticity.
                            </p>
                            <p>
                                For Rachitha, design is more than a profession — it is an evolving
                                creative journey. She embraces challenges as opportunities to innovate
                                and believes that the act of creation is what continually inspires her work.
                            </p>
                            <Link href="/contact" className={styles.goldCta}>
                                WORK WITH US <span className={styles.ctaArrow}>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
