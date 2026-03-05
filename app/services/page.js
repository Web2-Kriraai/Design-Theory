'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./services.module.css";

export default function ServicesPage() {
    return (
        <main className={styles.page}>
            {/* ── PAGE HEADER ── */}
            <div className={styles.pageHeader}>
                <p className={styles.pageLabel}>Our Expertise</p>
                <h1 className={styles.pageTitle}>Services</h1>
                <p className={styles.introText} style={{ textAlign: 'center' }}>
                    At The Design Theory, architecture and interior design are seamlessly
                    interwoven to create spaces that are thoughtful, functional, and
                    visually compelling. We believe a well-designed space begins with
                    strong architectural planning and evolves through carefully curated
                    interiors that reflect the client’s personality and lifestyle.
                </p>
            </div>

            {/* ── ARCHITECTURE & INTERIORS SECTION ── */}
            <section className={styles.contentArea}>
                <div className={styles.grid}>
                    <div className={styles.textContent}>
                        <h2 className={styles.heading}>Architecture & Interiors</h2>
                        <p className={styles.bodyText}>
                            Our approach focuses on designing spaces that are not only aesthetically
                            refined but also practical and sustainable. From conceptual planning
                            and space optimisation to detailed interior styling and execution, we
                            ensure that every element works harmoniously to create a cohesive
                            design narrative.
                        </p>
                        <p className={styles.bodyText}>
                            We collaborate closely with our clients throughout the design journey,
                            translating their vision into spaces that are timeless, comfortable,
                            and inspiring. Whether designing residential homes, luxury villas,
                            apartments, or commercial workspaces, our team delivers tailor-made
                            solutions that balance creativity with functionality.
                        </p>
                        <p className={styles.bodyText}>
                            Our expertise covers layout planning, material selection, lighting
                            design, furniture planning, colour consultation, and complete
                            project execution. We pay meticulous attention to detailing, ensuring
                            that every corner of the space contributes to a unified and
                            sophisticated outcome.
                        </p>
                        <p className={styles.bodyText}>
                            At The Design Theory, we believe that architecture forms the
                            foundation, while interiors bring life, warmth, and identity to
                            the space — together creating environments that elevate everyday living.
                        </p>
                        <Link href="/contact" className={styles.goldCta}>
                            START YOUR PROJECT <span className={styles.ctaArrow}>→</span>
                        </Link>
                    </div>

                    <div className={styles.imagesStack}>
                        <div className={styles.imageWrap}>
                            <Image
                                src="/assets/services/service-works.jpg"
                                alt="The Design Theory — Architecture & Interiors Planning"
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className={styles.imageWrap}>
                            <Image
                                src="/assets/services/appliances.jpg"
                                alt="The Design Theory — Interior Detailing"
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 90vw, 40vw"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
