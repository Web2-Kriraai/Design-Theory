"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./faqs.module.css";

const faqData = [
    {
        category: "process",
        title: "Our Process",
        items: [
            {
                question: "What is your design process like?",
                answer: "Our design process begins with understanding your vision, lifestyle, and requirements. We then move through concept development, design refinement, technical drawings, material selection, and finally execution. Throughout each stage, we maintain close collaboration with you to ensure the outcome reflects your aspirations."
            },
            {
                question: "How do you approach a new project?",
                answer: "Every project begins with an in-depth consultation to understand your needs, preferences, and budget. We then conduct site analysis, research, and conceptual brainstorming before presenting initial design directions. Our approach is always collaborative and client-focused."
            },
            {
                question: "Do you handle both architecture and interiors?",
                answer: "Yes, we offer integrated services covering both architecture and interior design. This holistic approach ensures that the architectural planning and interior detailing work harmoniously together, creating cohesive and well-executed spaces."
            }
        ]
    },
    {
        category: "services",
        title: "Services",
        items: [
            {
                question: "What services do you offer?",
                answer: "We offer a comprehensive range of services including residential interior design, commercial interior design, architectural design, 3D visualization and rendering, and turnkey solutions. Each service is tailored to meet the specific needs of our clients."
            },
            {
                question: "Do you take on projects outside Hyderabad?",
                answer: "Yes, we work on projects across India including Vijayawada and Nellore. For locations outside these areas, please contact us to discuss feasibility and logistics."
            },
            {
                question: "Do you offer turnkey solutions?",
                answer: "Absolutely. Our turnkey solutions cover everything from concept to completion, including design, procurement, project management, and execution. This allows you to have a single point of contact and a hassle-free experience."
            }
        ]
    },
    {
        category: "timeline",
        title: "Timeline & Budget",
        items: [
            {
                question: "How long does a typical project take?",
                answer: "Project timelines vary depending on scope, size, and complexity. A residential apartment may take 3-6 months, while a full-scale villa or commercial project could take 8-12 months. We provide a detailed timeline during the initial consultation."
            },
            {
                question: "How do you charge for your services?",
                answer: "We offer flexible fee structures including fixed fees for specific services, percentage-based fees for turnkey projects, and hourly consultations. We'll discuss the best option based on your project requirements during our initial meeting."
            },
            {
                question: "What is the payment schedule?",
                answer: "Typically, we work with a milestone-based payment schedule: an initial booking amount, design phase payments, and stage-wise payments during execution. This ensures transparency and alignment with project progress."
            }
        ]
    },
    {
        category: "consultation",
        title: "Consultation",
        items: [
            {
                question: "How do I schedule a consultation?",
                answer: "You can schedule a consultation by filling out the contact form on our website, emailing us at info@thedesigntheory.in, or calling us at +91 XXXXX XXXXX. We'll get back to you within 24-48 hours to set up an appointment."
            },
            {
                question: "Is the initial consultation free?",
                answer: "Yes, our first consultation is complimentary. This meeting helps us understand your project, discuss your vision, and explore how we can work together. Following this, if you wish to proceed, we'll share a detailed proposal."
            },
            {
                question: "What should I prepare for the first meeting?",
                answer: "It's helpful to bring any inspiration images, ideas about your preferred style, a rough budget range, and any specific requirements you have. The more we understand your vision, the better we can tailor our approach."
            }
        ]
    }
];

export default function FAQsPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [openItems, setOpenItems] = useState({});

    const toggleAccordion = (categoryId, itemIndex) => {
        const key = `${categoryId}-${itemIndex}`;
        setOpenItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const filteredData = activeCategory === "all"
        ? faqData
        : faqData.filter(section => section.category === activeCategory);

    return (
        <main className={styles.page}>
            <div className={styles.container}>

                {/* Page Header */}
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
                    <p className={styles.pageSubtitle}>
                        Find answers to common questions about our design process, services, and working with us.
                    </p>
                </div>

                {/* FAQ Categories Filter */}
                <div className={styles.faqCategories}>
                    <button
                        className={`${styles.categoryBtn} ${activeCategory === "all" ? styles.active : ""}`}
                        onClick={() => setActiveCategory("all")}
                    >
                        All Questions
                    </button>
                    <button
                        className={`${styles.categoryBtn} ${activeCategory === "process" ? styles.active : ""}`}
                        onClick={() => setActiveCategory("process")}
                    >
                        Our Process
                    </button>
                    <button
                        className={`${styles.categoryBtn} ${activeCategory === "services" ? styles.active : ""}`}
                        onClick={() => setActiveCategory("services")}
                    >
                        Services
                    </button>
                    <button
                        className={`${styles.categoryBtn} ${activeCategory === "timeline" ? styles.active : ""}`}
                        onClick={() => setActiveCategory("timeline")}
                    >
                        Timeline & Budget
                    </button>
                    <button
                        className={`${styles.categoryBtn} ${activeCategory === "consultation" ? styles.active : ""}`}
                        onClick={() => setActiveCategory("consultation")}
                    >
                        Consultation
                    </button>
                </div>

                {/* FAQ Accordion Grid */}
                <div className={styles.faqGrid}>
                    {filteredData.map((section) => (
                        <div key={section.category} className={styles.faqCategorySection}>
                            <h2 className={styles.categoryHeading}>{section.title}</h2>

                            <div className={styles.faqAccordion}>
                                {section.items.map((item, index) => {
                                    const key = `${section.category}-${index}`;
                                    const isOpen = openItems[key];

                                    return (
                                        <div key={index} className={styles.faqItem}>
                                            <button
                                                className={styles.faqQuestion}
                                                onClick={() => toggleAccordion(section.category, index)}
                                                aria-expanded={isOpen}
                                            >
                                                <span>{item.question}</span>
                                                <span className={`${styles.faqIcon} ${isOpen ? styles.open : ""}`}>+</span>
                                            </button>
                                            <div className={`${styles.faqAnswerWrap} ${isOpen ? styles.open : ""}`}>
                                                <div className={styles.faqAnswerInner}>
                                                    <div className={styles.faqAnswer}>
                                                        <p>{item.answer}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Still Have Questions Section */}
                <div className={styles.stillQuestions}>
                    <h3 className={styles.questionsHeading}>Still have questions?</h3>
                    <p className={styles.questionsText}>We're here to help. Reach out to us anytime.</p>
                    <div className={styles.questionsCta}>
                        <Link href="/contact" className={styles.ctaLink}>CONTACT US →</Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
