'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./services.module.css";

const SERVICE_SECTIONS = [
    {
        id: "residential",
        label: "Living Spaces",
        title: "Bespoke Residential Architecture",
        description: "Creating homes that are a true reflection of individuality. From opulent luxury villas to modern minimalist apartments, we design residential spaces that balance comfort with high-end editorial aesthetics.",
        details: [
            "Custom Furniture & Cabinetry",
            "Space Planning & Layout Optimization",
            "Curated Material & Finish Selection",
            "Lighting & Acoustic Design",
        ],
        image: "/assets/styles/high-living.jpg"
    },
    {
        id: "commercial",
        label: "Business environments",
        title: "High-Performance Commercial Design",
        description: "Designing productive, inspiring, and brand-focused commercial spaces. Whether it's a high-performance corporate office or a boutique retail outlet, we create environments that drive success.",
        details: [
            "Corporate Office Interiors",
            "Retail & Boutique Design",
            "Reception & Lounge Areas",
            "Workplace Ergonomics",
        ],
        image: "/assets/services/service-works.jpg"
    },
    {
        id: "architecture",
        label: "Structural Excellence",
        title: "End-to-End Architectural Planning",
        description: "Our architectural philosophy is rooted in structural harmony and functional beauty. We provide end-to-end architectural planning, ensuring that the foundation of your space is as strong as its aesthetic.",
        details: [
            "Conceptual Building Design",
            "Landscape Integration",
            "Sustainable Material Planning",
            "Structural Feasibility Studies",
        ],
        image: "/assets/blog/blog2.jpg"
    },
    {
        id: "visualization",
        label: "CGI & Realism",
        title: "Immersive 3D Visualization",
        description: "Experience your future space before a single brick is laid. Our hyper-realistic 3D renderings and walkthroughs provide an immersive preview of every texture, shadow, and light.",
        details: [
            "Photorealistic 3D Renders",
            "Virtual Reality Walkthroughs",
            "Material Preview Simulations",
            "Architectural Flythroughs",
        ],
        image: "/assets/blog/blog3.jpg"
    }
];

const ServiceCard = ({ section, index, progress, range, targetScale }) => {
    const container = useRef(null);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className={styles.cardContainer}>
            <motion.div
                style={{
                    scale,
                    top: `calc(-10% + ${index * 25}px)`
                }}
                className={styles.card}
            >
                <div className={styles.cardHeader}>
                    <span className={styles.cardIndex}>0{index + 1}</span>
                    <p className={styles.sectionLabel}>{section.label}</p>
                </div>

                <div className={styles.cardBody}>
                    <div className={styles.cardText}>
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
                            Consult our experts <span>→</span>
                        </Link>
                    </div>

                    <div className={styles.cardImageInner}>
                        <motion.div
                            className={styles.imageReveal}
                            initial={{ scale: 1.2 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        >
                            <Image
                                src={section.image}
                                alt={section.title}
                                fill
                                className={styles.sectionImg}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function ServicesPage() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <main className={styles.page}>
            {/* Header Section */}
            <header className={styles.header}>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="script-font">
                    Our Expertise
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={styles.title}
                >
                    Design <i>Philosophy</i>
                </motion.h1>
                <div className={styles.introText}>
                    <p>At The Design Theory, architecture and interior design are seamlessly interwoven to create spaces that are thoughtful, functional, and visually compelling. We believe a well-designed space begins with strong architectural planning and evolves through carefully curated interiors that reflect the client's personality and lifestyle.</p>
                    <p style={{ marginTop: '1rem' }}>Our approach focuses on designing spaces that are not only aesthetically refined but also practical and sustainable. From conceptual planning and space optimisation to detailed interior styling and execution, we ensure that every element works harmoniously to create a cohesive design narrative.</p>
                    <p style={{ marginTop: '1rem' }}>We collaborate closely with our clients throughout the design journey, translating their vision into spaces that are timeless, comfortable, and inspiring. Whether designing residential homes, luxury villas, apartments, or commercial workspaces, our team delivers tailor-made solutions that balance creativity with functionality.</p>
                    <p style={{ marginTop: '1rem' }}>Our expertise covers layout planning, material selection, lighting design, furniture planning, colour consultation, and complete project execution. We pay meticulous attention to detailing, ensuring that every corner of the space contributes to a unified and sophisticated outcome.</p>
                    <p style={{ marginTop: '1rem' }}>At The Design Theory, we believe that architecture forms the foundation, while interiors bring life, warmth, and identity to the space — together creating environments that elevate everyday living.</p>
                </div>
            </header>

            {/* Stacked Cards */}
            <div ref={container} className={styles.sectionsWrapper}>
                {SERVICE_SECTIONS.map((section, index) => {
                    const targetScale = 1 - ((SERVICE_SECTIONS.length - index) * 0.05);
                    return (
                        <ServiceCard
                            key={section.id}
                            index={index}
                            section={section}
                            progress={scrollYProgress}
                            range={[index * 0.25, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>

            {/* Newsletter Subscription (New Footer CTA) */}
            <section className={styles.newsletter}>
                <div className={styles.newsletterInner}>
                    <span className="script-font">Join the inner circle</span>
                    <h2 className={styles.nsTitle}>
                        {status === "success"
                            ? "Thank you for joining us."
                            : "Occasional insights delivered to your inbox"}
                    </h2>

                    {status !== "success" && (
                        <form className={styles.nsForm} onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder={status === "error" ? "Try again..." : "Your email address"}
                                className={styles.nsInput}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className={styles.nsBtn}
                                disabled={status === "loading"}
                            >
                                {status === "loading" ? "..." : "Subscribe"}
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
}
