'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../components/legal.module.css';

export default function CookiePolicyPage() {
    const [showBanner, setShowBanner] = useState(true);
    const [showPreferencesModal, setShowPreferencesModal] = useState(false);

    const [preferences, setPreferences] = useState({
        essential: true, // Always true
        performance: false,
        functionality: false,
        marketing: false
    });

    const handleAcceptAll = () => {
        setPreferences({
            essential: true,
            performance: true,
            functionality: true,
            marketing: true
        });
        setShowBanner(false);
    };

    const handleSavePreferences = () => {
        setShowPreferencesModal(false);
        setShowBanner(false);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const togglePreference = (key) => {
        if (key === 'essential') return;
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className={styles.legalPage}>
            <Header />

            <div className={styles.legalContainer}>
                <div className={styles.legalHero}>
                    <h1>Cookie Policy</h1>
                    <p className={styles.introText}>How we use cookies to enhance your experience</p>
                    <p className={styles.lastUpdated}>Last Updated: March 2026</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>1. What Are Cookies</h2>
                    <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide valuable information to website owners.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>2. How We Use Cookies</h2>
                    <ul>
                        <li><strong>Essential cookies:</strong> Required for website functionality</li>
                        <li><strong>Performance cookies:</strong> Analyze how visitors use our site</li>
                        <li><strong>Functionality cookies:</strong> Remember your preferences</li>
                        <li><strong>Marketing cookies:</strong> Deliver relevant content (with consent)</li>
                    </ul>
                </div>

                <div className={styles.legalSection}>
                    <h2>3. Types of Cookies We Use</h2>
                    <div className={styles.tableContainer}>
                        <table className={styles.legalTable}>
                            <thead>
                                <tr>
                                    <th>Cookie Type</th>
                                    <th>Purpose</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>session_id</strong></td>
                                    <td>Maintains login state</td>
                                    <td>Session</td>
                                </tr>
                                <tr>
                                    <td><strong>_ga</strong></td>
                                    <td>Google Analytics - visitor tracking</td>
                                    <td>2 years</td>
                                </tr>
                                <tr>
                                    <td><strong>_gid</strong></td>
                                    <td>Google Analytics - user identification</td>
                                    <td>24 hours</td>
                                </tr>
                                <tr>
                                    <td><strong>preferences</strong></td>
                                    <td>Stores your design preferences</td>
                                    <td>1 year</td>
                                </tr>
                                <tr>
                                    <td><strong>cookie_consent</strong></td>
                                    <td>Records your cookie preferences</td>
                                    <td>1 year</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2>4. Third-Party Cookies</h2>
                    <p>We use third-party services that may place cookies on your device:</p>
                    <ul>
                        <li><strong>Google Analytics</strong> (website traffic analysis)</li>
                        <li><strong>Instagram</strong> (social media integration)</li>
                        <li><strong>Vimeo/YouTube</strong> (project video embeds)</li>
                    </ul>
                </div>

                <div className={styles.legalSection}>
                    <h2>5. Managing Cookies</h2>
                    <p>You can control and manage cookies in your browser settings. Please note that blocking certain cookies may affect your experience on our website.</p>
                    <p>Learn more about managing cookies across different browsers at: <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>www.aboutcookies.org</a></p>
                </div>

                <div className={styles.legalSection}>
                    <h2>6. Updates to This Policy</h2>
                    <p>We may update this Cookie Policy periodically. Check this page for the latest version.</p>
                </div>

                <div className={styles.legalSection}>
                    <h2>7. Contact Us</h2>
                    <p>For questions about our cookie usage:</p>
                    <p><strong>Email:</strong> <a href="mailto:privacy@thedesigntheory.in" style={{ textDecoration: 'underline' }}>privacy@thedesigntheory.in</a></p>
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button
                        className={styles.actionBtn}
                        onClick={() => setShowPreferencesModal(true)}
                    >
                        Manage Preferences
                    </button>
                </div>

                <nav className={styles.legalBottomNav}>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                    <Link href="/terms-conditions">Terms & Conditions</Link>
                    <Link href="/contact">Contact Us</Link>
                </nav>

                <div className={styles.backToTop}>
                    <button onClick={scrollToTop}>Back to Top</button>
                </div>
            </div>


            {/* Interactive Cookie Consent Banner */}
            <AnimatePresence>
                {showBanner && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={styles.cookieBanner}
                    >
                        <p>We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.</p>
                        <div className={styles.cookieBannerActions}>
                            <button
                                className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                                style={{ margin: 0, padding: '10px 20px', fontSize: '0.75rem' }}
                                onClick={handleAcceptAll}
                            >
                                Accept All
                            </button>
                            <button
                                className={styles.actionBtn}
                                style={{ margin: 0, padding: '10px 20px', fontSize: '0.75rem' }}
                                onClick={() => setShowPreferencesModal(true)}
                            >
                                Cookie Settings
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cookie Preferences Modal */}
            <AnimatePresence>
                {showPreferencesModal && (
                    <div style={{
                        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{
                                background: 'white', maxWidth: '500px', width: '90%', borderRadius: '8px', overflow: 'hidden', padding: '30px'
                            }}
                        >
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '20px' }}>
                                Privacy Preference Center
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '30px' }}>
                                When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. Manage your preferences below.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                                {/* Essential */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Strictly Necessary Cookies</h3>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Required for functionality. Cannot be switched off.</p>
                                    </div>
                                    <div style={{ padding: '4px 12px', background: '#e0e0e0', color: '#666', fontSize: '0.75rem', fontWeight: 600, borderRadius: '12px' }}>Always Active</div>
                                </div>

                                {/* Performance */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Performance Cookies</h3>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Allows us to count visits and traffic sources.</p>
                                    </div>
                                    <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                                        <input type="checkbox" checked={preferences.performance} onChange={() => togglePreference('performance')} style={{ opacity: 0, width: 0, height: 0 }} />
                                        <span style={{
                                            position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                            backgroundColor: preferences.performance ? 'var(--accent-purple)' : '#ccc',
                                            transition: '.4s', borderRadius: '34px'
                                        }}>
                                            <span style={{
                                                position: 'absolute', content: '""', height: '16px', width: '16px', left: '4px', bottom: '4px',
                                                backgroundColor: 'white', transition: '.4s', borderRadius: '50%',
                                                transform: preferences.performance ? 'translateX(16px)' : 'translateX(0)'
                                            }}></span>
                                        </span>
                                    </label>
                                </div>

                                {/* Functionality */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Functionality Cookies</h3>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Enables advanced personalization.</p>
                                    </div>
                                    <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                                        <input type="checkbox" checked={preferences.functionality} onChange={() => togglePreference('functionality')} style={{ opacity: 0, width: 0, height: 0 }} />
                                        <span style={{
                                            position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                            backgroundColor: preferences.functionality ? 'var(--accent-purple)' : '#ccc',
                                            transition: '.4s', borderRadius: '34px'
                                        }}>
                                            <span style={{
                                                position: 'absolute', content: '""', height: '16px', width: '16px', left: '4px', bottom: '4px',
                                                backgroundColor: 'white', transition: '.4s', borderRadius: '50%',
                                                transform: preferences.functionality ? 'translateX(16px)' : 'translateX(0)'
                                            }}></span>
                                        </span>
                                    </label>
                                </div>

                                {/* Marketing */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Targeting Cookies</h3>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Used to deliver relevant advertisements.</p>
                                    </div>
                                    <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                                        <input type="checkbox" checked={preferences.marketing} onChange={() => togglePreference('marketing')} style={{ opacity: 0, width: 0, height: 0 }} />
                                        <span style={{
                                            position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                            backgroundColor: preferences.marketing ? 'var(--accent-purple)' : '#ccc',
                                            transition: '.4s', borderRadius: '34px'
                                        }}>
                                            <span style={{
                                                position: 'absolute', content: '""', height: '16px', width: '16px', left: '4px', bottom: '4px',
                                                backgroundColor: 'white', transition: '.4s', borderRadius: '50%',
                                                transform: preferences.marketing ? 'translateX(16px)' : 'translateX(0)'
                                            }}></span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
                                <button className={styles.actionBtn} style={{ margin: 0 }} onClick={handleSavePreferences}>Confirm My Choices</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
