'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./services.module.css";

const SERVICE_SECTIONS = [
    {
        id: "residential",
        label: "Living Spaces",
        title: "Residential Interior Design",
        description: "Creating homes that are a true reflection of individuality. From opulent luxury villas to modern minimalist apartments, we design residential spaces that balance comfort with high-end editorial aesthetics.",
        details: [
            "Custom Furniture & Cabinetry",
            "Space Planning & Layout Optimization",
            "Curated Material & Finish Selection",
            "Lighting & Acoustic Design",
        ],
        image: "/assets/styles/interior-render.jpg",
        reverse: false,
    },
    {
        id: "commercial",
        label: "Business environments",
        title: "Commercial Interior Design",
        description: "Designing productive, inspiring, and brand-focused commercial spaces. Whether it's a high-performance corporate office or a boutique retail outlet, we create environments that drive success.",
        details: [
            "Corporate Office Interiors",
            "Retail & Boutique Design",
            "Reception & Lounge Areas",
            "Workplace Ergonomics",
        ],
        image: "/assets/services/service-works.jpg",
        reverse: true,
    },
    {
        id: "architecture",
        label: "Structural Excellence",
        title: "Architectural Design",
        description: "Our architectural philosophy is rooted in structural harmony and functional beauty. We provide end-to-end architectural planning, ensuring that the foundation of your space is as strong as its aesthetic.",
        details: [
            "Conceptual Building Design",
            "Landscape Integration",
            "Sustainable Material Planning",
            "Structural Feasibility Studies",
        ],
        image: "/assets/blog/blog2.jpg",
        reverse: false,
    },
    {
        id: "visualization",
        label: "CGI & Realism",
        title: "3D Visualization & Rendering",
        description: "Experience your future space before a single brick is laid. Our hyper-realistic 3D renderings and walkthroughs provide an immersive preview of every texture, shadow, and light.",
        details: [
            "Photorealistic 3D Renders",
            "Virtual Reality Walkthroughs",
            "Material Preview Simulations",
            "Architectural Flythroughs",
        ],
        image: "/assets/blog/blog3.jpg",
        reverse: true,
    },
    {
        id: "turnkey",
        label: "Total Peace of Mind",
        title: "Turnkey Solutions",
        description: "We take your project from 'Conception to Curation'. Our turnkey management handles everything—procurement, vendor coordination, and on-site execution—delivering a move-in ready masterpiece.",
        details: [
            "End-to-End Project Management",
            "Quality Control & Supervision",
            "Vendor & Timeline Management",
            "Procurement of Premium Materials",
        ],
        image: "/assets/styles/high-living.jpg",
        reverse: false,
    },
];

export default function ServicesPage() {
    return (
        <main className={styles.page}>
            {/* ── PAGE HEADER ── */}
            <header className={styles.pageHeader}>
                <p className={styles.pageLabel}>Our Expertise</p>
                <h1 className={styles.pageTitle}>Services</h1>
                <p className={styles.introText}>
                    At The Design Theory, bespoke architecture and curated interior design are interlinked
                    to create environments that are thoughtful, functional, and visually compelling.
                    We transform visions into living realities.
                </p>
            </header>

            {/* ── SERVICES GRID ── */}
            <div className={styles.sectionsWrapper}>
                {SERVICE_SECTIONS.map((section, index) => (
                    <section
                        key={section.id}
                        id={section.id}
                        className={`${styles.serviceSection} ${section.reverse ? styles.reverse : ""}`}
                    >
                        <div className={styles.sectionInner}>
                            <div className={styles.textContent}>
                                <p className={styles.sectionLabel}>{section.label}</p>
                                <h2 className={styles.sectionTitle}>{section.title}</h2>
                                <p className={styles.sectionDescription}>{section.description}</p>

                                <ul className={styles.detailsList}>
                                    {section.details.map((detail, i) => (
                                        <li key={i} className={styles.detailItem}>
                                            <span className={styles.bullet}>✦</span> {detail}
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/contact" className={styles.sectionLink}>
                                    Enquire About {section.id} <span>→</span>
                                </Link>
                            </div>

                            <div className={styles.imageContent}>
                                <div className={styles.imageOverlay}></div>
                                <Image
                                    src={section.image}
                                    alt={section.title}
                                    fill
                                    className={styles.sectionImage}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <span className={styles.imageNumber}>0{index + 1}</span>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* ── CALL TO ACTION ── */}
            <section className={styles.ctaBanner}>
                <div className={styles.ctaInner}>
                    <h2 className={styles.ctaHeading}>Ready to start your design journey?</h2>
                    <p className={styles.ctaText}>Let's collaborate to build a space that tells your story.</p>
                    <Link href="/contact" className={styles.goldBtn}>
                        Book A Consultation
                    </Link>
                </div>
            </section>
        </main>
    );
}
