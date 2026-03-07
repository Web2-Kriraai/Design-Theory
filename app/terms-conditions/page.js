'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../components/legal.module.css';

export default function TermsConditionsPage() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles.legalPage}>
            <Header />

            <div className={styles.legalContainer}>
                <div className={styles.legalHero}>
                    <h1>Terms & Conditions</h1>
                    <p className={styles.introText}>Please read these terms carefully before using our website or services</p>
                    <p className={styles.lastUpdated}>Last Updated: March 2026</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing or using The Design Theory website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website or services.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>2. Intellectual Property Rights</h2>
                    <p>All content on this website, including but not limited to text, images, logos, designs, project photographs, graphics, and code, is the property of The Design Theory and protected by copyright laws. You may not reproduce, distribute, or use any content without written permission.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>3. Use of Website</h2>
                    <ul>
                        <li>You may browse the website for personal, non-commercial use</li>
                        <li>You may not attempt to gain unauthorized access to our systems</li>
                        <li>You may not use the website for any unlawful purpose</li>
                        <li>You may not transmit malicious code or interfere with website functionality</li>
                    </ul>
                </div>

                <div className={styles.legalSection}>
                    <h2>4. Project Enquiries and Consultations</h2>
                    <p>Submitting an enquiry through our website does not constitute a binding agreement for design services. All projects are subject to a separate written contract detailing scope of work, fees, and timelines.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>5. Fees and Payments</h2>
                    <p>Fees for design services are outlined in individual project proposals and contracts. Website information about services and pricing is for general informational purposes and may be subject to change without notice.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>6. Client Responsibilities</h2>
                    <ul>
                        <li>Provide accurate project information and requirements</li>
                        <li>Obtain necessary permits and approvals (unless specified in contract)</li>
                        <li>Ensure site access for project execution</li>
                        <li>Timely decision-making and feedback</li>
                        <li>Payment according to agreed schedule</li>
                    </ul>
                </div>

                <div className={styles.legalSection}>
                    <h2>7. Project Timelines</h2>
                    <p>Project timelines provided during consultations are estimates based on initial information. Actual timelines may vary due to factors beyond our control including material availability, site conditions, or client decisions.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>8. Cancellation and Refunds</h2>
                    <p>Cancellation terms are specified in individual project contracts. Generally, fees for completed work are non-refundable. Deposits may be partially refundable depending on the stage of work completed.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>9. Limitation of Liability</h2>
                    <p>The Design Theory shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our total liability shall not exceed the amount paid for the specific service in question.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>10. Indemnification</h2>
                    <p>You agree to indemnify and hold The Design Theory harmless from any claims, damages, or expenses arising from your use of our website or breach of these terms.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>11. Third-Party Links</h2>
                    <p>Our website may link to third-party sites. We are not responsible for their content or practices. Accessing these links is at your own risk.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>12. Governing Law</h2>
                    <p>These Terms & Conditions shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Hyderabad, Telangana.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>13. Modifications to Terms</h2>
                    <p>We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the modified terms.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>14. Severability</h2>
                    <p>If any provision of these terms is found unenforceable, the remaining provisions shall remain in full force and effect.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>15. Contact Information</h2>
                    <p>For questions about these Terms & Conditions:</p>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '8px' }}><strong>Email:</strong> <a href="mailto:legal@thedesigntheory.in" style={{ textDecoration: 'underline' }}>legal@thedesigntheory.in</a></li>
                        <li style={{ marginBottom: '8px' }}><strong>Address:</strong> The Design Theory, Kavuri Hills, Madhapur, Hyderabad - 500033</li>
                    </ul>
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <a href="#" className={styles.actionBtn} onClick={(e) => { e.preventDefault(); alert("PDF Download functionality would be implemented here."); }}>
                        Download Terms & Conditions as PDF
                    </a>
                </div>

                <nav className={styles.legalBottomNav}>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                    <Link href="/cookie-policy">Cookie Policy</Link>
                    <Link href="/contact">Contact</Link>
                </nav>

                <div className={styles.backToTop}>
                    <button onClick={scrollToTop}>Back to Top</button>
                </div>
            </div>

        </div>
    );
}
