"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");

    // if (isAdminPage) return null;

    return (
        <footer className={styles.footer}>
            {/* Top Border Accent */}
            <div className={styles.topAccent}></div>

            <div className={styles.container}>
                {/* Main Grid */}
                <div className={styles.grid}>

                    {/* Column 1: Get in Touch */}
                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Get In Touch</h4>

                        <div className={styles.brandName}>The Design Theory</div>

                        <address className={styles.address}>
                            <div className={styles.addressRow}>
                                <span className={styles.addrIcon}>
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </span>
                                <span>
                                    1st Floor, Krishnaveer's Euphoria<br />
                                    Jubilee Enclave, Madhapur<br />
                                    Hyderabad, Telangana, India – 500084
                                </span>
                            </div>
                            <div className={styles.addressRow}>
                                <span className={styles.addrIcon}>
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </span>
                                <a href="tel:+91XXXXXXXXXX" className={styles.contactLink}>+91 XXXXX XXXXX</a>
                            </div>
                            <div className={styles.addressRow}>
                                <span className={styles.addrIcon}>
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </span>
                                <a href="mailto:info@thedesigntheory.in" className={styles.contactLink}>info@thedesigntheory.in</a>
                            </div>
                        </address>

                        {/* Social */}
                        <div className={styles.socialRow}>
                            <a href="https://www.instagram.com/the.designtheory/?hl=en" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="https://in.linkedin.com/company/the-design-theory-in" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.989v-10.1c0-7.865-8.801-7.601-10.132-5.127v-1.173z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Services */}
                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Services</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/services/#residential">Residential Interior Design</Link></li>
                            <li><Link href="/services/#commercial">Commercial Interior Design</Link></li>
                            <li><Link href="/services/#architecture">Architectural Design</Link></li>
                            <li><Link href="/services/#visualization">3D Visualization & Rendering</Link></li>
                            <li><Link href="/services/#turnkey">Turnkey Solutions</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Help */}
                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Help</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/contact">Contact</Link></li>
                            <li><Link href="/careers">Careers</Link></li>
                            <li><Link href="/faqs">FAQs</Link></li>
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link href="/cookie-policy">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Company */}
                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Company</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/portfolio">Portfolio</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            <li><Link href="/about-us">About</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li>
                                <a href="https://www.instagram.com/the.designtheory/?hl=en" target="_blank" rel="noopener noreferrer">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://in.linkedin.com/company/the-design-theory-in" target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        &copy; 2024 – 2028 The Design Theory. All Rights Reserved.
                    </p>
                    <div className={styles.legalLinks}>
                        <Link href="/terms-conditions">Terms &amp; Conditions</Link>
                        <span className={styles.divider}>|</span>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                        <span className={styles.divider}>|</span>
                        <Link href="/cookie-policy">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
