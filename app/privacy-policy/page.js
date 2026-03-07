'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import Header from '../components/Header';
import styles from '../components/legal.module.css';

const privacySections = [
    {
        title: "Introduction",
        content: "At The Design Theory, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services. Please read this policy carefully. By accessing or using our website, you consent to the practices described in this Privacy Policy."
    },
    {
        title: "Information We Collect",
        content: (
            <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
                <li style={{ marginBottom: '8px' }}><strong>Personal Information:</strong> Name, email address, phone number, postal address</li>
                <li style={{ marginBottom: '8px' }}><strong>Project Information:</strong> Design preferences, property details, budget range</li>
                <li style={{ marginBottom: '8px' }}><strong>Technical Data:</strong> IP address, browser type, device information, cookies</li>
                <li style={{ marginBottom: '8px' }}><strong>Communication Data:</strong> Enquiries, consultation notes, feedback</li>
            </ul>
        )
    },
    {
        title: "How We Use Your Information",
        content: (
            <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
                <li style={{ marginBottom: '8px' }}>To respond to your enquiries and provide design consultations</li>
                <li style={{ marginBottom: '8px' }}>To deliver our interior design and architectural services</li>
                <li style={{ marginBottom: '8px' }}>To send project updates, newsletters, and design inspiration (with consent)</li>
                <li style={{ marginBottom: '8px' }}>To improve our website and user experience</li>
                <li style={{ marginBottom: '8px' }}>To comply with legal obligations</li>
            </ul>
        )
    },
    {
        title: "Cookies and Tracking Technologies",
        content: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors come from. For detailed information about the cookies we use, please refer to our Cookie Policy."
    },
    {
        title: "How We Share Your Information",
        content: (
            <>
                <p style={{ marginBottom: '10px' }}>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
                <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
                    <li style={{ marginBottom: '8px' }}>Service providers who assist in delivering our services (with confidentiality agreements)</li>
                    <li style={{ marginBottom: '8px' }}>Professional advisors such as lawyers or accountants</li>
                    <li style={{ marginBottom: '8px' }}>Legal authorities when required by law</li>
                </ul>
            </>
        )
    },
    {
        title: "Data Security",
        content: "We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure."
    },
    {
        title: "Your Rights",
        content: (
            <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
                <li style={{ marginBottom: '8px' }}>Access your personal information</li>
                <li style={{ marginBottom: '8px' }}>Correct inaccurate information</li>
                <li style={{ marginBottom: '8px' }}>Request deletion of your information</li>
                <li style={{ marginBottom: '8px' }}>Withdraw consent for marketing communications</li>
                <li style={{ marginBottom: '8px' }}>Lodge a complaint with data protection authorities</li>
            </ul>
        )
    },
    {
        title: "Third-Party Links",
        content: "Our website may contain links to third-party websites (Instagram, etc.). We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies."
    },
    {
        title: "Children's Privacy",
        content: "Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children."
    },
    {
        title: "Changes to This Policy",
        content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically."
    },
    {
        title: "Contact Us",
        content: (
            <>
                <p style={{ marginBottom: '10px' }}>If you have questions about this Privacy Policy or how we handle your information, please contact us at:</p>
                <ul style={{ paddingLeft: '20px', margin: '10px 0', listStyleType: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '8px' }}><strong>Email:</strong> <a href="mailto:privacy@thedesigntheory.in" style={{ color: 'inherit', textDecoration: 'underline' }}>privacy@thedesigntheory.in</a></li>
                    <li style={{ marginBottom: '8px' }}><strong>Address:</strong> The Design Theory, Kavuri Hills, Madhapur, Hyderabad - 500033</li>
                </ul>
            </>
        )
    }
];

export default function PrivacyPolicyPage() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles.legalPage}>
            <Header />

            <div className={styles.legalContainer}>
                <div className={styles.legalHero}>
                    <h1>Privacy Policy</h1>
                    <p className={styles.lastUpdated}>Last Updated: March 2026</p>
                </div>

                <div className={styles.accordionContainer}>
                    {privacySections.map((section, index) => (
                        <motion.div
                            key={index}
                            className={styles.accordionItem}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <button
                                className={styles.accordionHeader}
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={openIndex === index}
                            >
                                {section.title}
                                <span className={`${styles.accordionIcon} ${openIndex === index ? styles.open : ''}`}>
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        className={styles.accordionContent}
                                    >
                                        <div className={styles.accordionContentInner}>
                                            {typeof section.content === 'string' ? (
                                                <p>{section.content}</p>
                                            ) : (
                                                section.content
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <nav className={styles.legalBottomNav}>
                    <Link href="/terms-conditions">Terms & Conditions</Link>
                    <Link href="/cookie-policy">Cookie Policy</Link>
                    <Link href="/contact">Contact Us</Link>
                </nav>

                <div className={styles.backToTop}>
                    <button onClick={scrollToTop}>Back to Top</button>
                </div>
            </div>
        </div>
    );
}
