"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import styles from "./Header.module.css";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();
    const userMenuRef = React.useRef(null);
    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const handleMouseEnter = (menu) => setActiveDropdown(menu);
    const handleMouseLeave = () => setActiveDropdown(null);
    const toggleDropdown = (menu) => {
        if (window.innerWidth <= 1024) {
            setActiveDropdown(activeDropdown === menu ? null : menu);
        }
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${!isHomePage ? styles.notHome : ""}`}>
            <div className={styles.mainNav}>

                {/* Mobile Hamburger — far left */}
                <button className={styles.hamburger} onClick={toggleMobileMenu} aria-label="Menu">
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                </button>

                {/* Left Navigation */}
                <nav className={`${styles.navLeft} ${styles.desktopNav}`}>
                    {/* Our Story (dropdown) */}
                    <div
                        className={styles.navItem}
                        onMouseEnter={() => handleMouseEnter('story')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className={styles.navBtn} onClick={() => toggleDropdown('story')}>
                            Our Story
                            <svg className={styles.chevron} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                        </button>
                        <div className={`${styles.dropdownContent} ${activeDropdown === 'story' ? styles.showDropdown : ''}`}>
                            <Link href="/about-us">About Us</Link>
                            <Link href="/services">Services</Link>
                        </div>
                    </div>

                    {/* Portfolio */}
                    <div className={styles.navItem}>
                        <Link href="/portfolio">Portfolio</Link>
                    </div>
                </nav>

                {/* Center Logo */}
                <div className={styles.logoContainer}>
                    <Link href="/" className={styles.logoLink}>
                        <Image
                            src="/assets/logo/L2.png"
                            alt="The Design Theory"
                            width={240}
                            height={120}
                            className={styles.logoImg}
                            priority
                            loading="eager"
                        />
                    </Link>
                </div>

                {/* Right Navigation */}
                <nav className={`${styles.navRight} ${styles.desktopNav}`}>
                    {/* Inspiration (dropdown) */}
                    <div
                        className={styles.navItem}
                        onMouseEnter={() => handleMouseEnter('inspiration')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className={styles.navBtn} onClick={() => toggleDropdown('inspiration')}>
                            Inspiration
                            <svg className={styles.chevron} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                        </button>
                        <div className={`${styles.dropdownContent} ${activeDropdown === 'inspiration' ? styles.showDropdown : ''}`}>
                            <Link href="/blog">Blog</Link>
                            <a href="https://www.instagram.com/the.designtheory/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://in.linkedin.com/company/the-design-theory-in" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className={styles.navItem}>
                        <Link href="/contact">Contact</Link>
                    </div>

                    {/* Careers */}
                    <div className={styles.navItem}>
                        <Link href="/careers">Careers</Link>
                    </div>
                </nav>

                {/* User icon — far right */}
                <div className={styles.userArea} ref={userMenuRef}>
                    <button
                        className={styles.iconBtn}
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path></svg>
                    </button>

                    {isUserMenuOpen && (
                        <div className={styles.userDropdown}>
                            <div className={styles.userDropdownLinks}>
                                {session ? (
                                    <>
                                        <Link href="/dashboard" className={styles.userDropdownLink} onClick={() => setIsUserMenuOpen(false)}>
                                            <span>Studio Dashboard</span>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                        </Link>
                                        <button
                                            onClick={() => signOut({ callbackUrl: "/auth" })}
                                            className={styles.userDropdownLink}
                                            style={{ width: "100%", background: "transparent", border: "none", outline: "none", cursor: "pointer", textAlign: "left", color: "#c0392b", padding: "12px 16px" }}
                                        >
                                            <span>Sign Out</span>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
                                        </button>
                                    </>
                                ) : (
                                    <Link href="/auth" className={styles.userDropdownLink} onClick={() => setIsUserMenuOpen(false)}>
                                        <span>Login / Sign-up</span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" /></svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <div className={styles.mobileHeader}>
                    <Link href="/" className={styles.mobileLogoLink} onClick={toggleMobileMenu}>
                        <Image
                            src="/assets/logo/L2.png"
                            alt="The Design Theory"
                            width={100}
                            height={52}
                            className={styles.mobileLogoImg}
                            priority
                            loading="eager"
                        />
                    </Link>
                    <button className={styles.closeBtn} onClick={toggleMobileMenu} aria-label="Close menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className={styles.mobileNavLinks}>
                    <div className={styles.mobileNavItem}>
                        <div className={styles.mobileNavTitle} onClick={() => toggleDropdown('story')}>
                            Our Story <span className={styles.toggleIcon}>{activeDropdown === 'story' ? '−' : '+'}</span>
                        </div>
                        {activeDropdown === 'story' && (
                            <div className={styles.mobileSubNav}>
                                <Link href="/about-us" onClick={toggleMobileMenu}>About Us</Link>
                                <Link href="/services" onClick={toggleMobileMenu}>Services</Link>
                            </div>
                        )}
                    </div>

                    <Link href="/portfolio" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Portfolio</Link>

                    <div className={styles.mobileNavItem}>
                        <div className={styles.mobileNavTitle} onClick={() => toggleDropdown('inspiration')}>
                            Inspiration <span className={styles.toggleIcon}>{activeDropdown === 'inspiration' ? '−' : '+'}</span>
                        </div>
                        {activeDropdown === 'inspiration' && (
                            <div className={styles.mobileSubNav}>
                                <Link href="/blog" onClick={toggleMobileMenu}>Blog</Link>
                                <a href="https://www.instagram.com/the.designtheory/?hl=en" target="_blank" rel="noopener noreferrer" onClick={toggleMobileMenu}>Instagram</a>
                                <a href="https://in.linkedin.com/company/the-design-theory-in" target="_blank" rel="noopener noreferrer" onClick={toggleMobileMenu}>LinkedIn</a>
                            </div>
                        )}
                    </div>

                    <Link href="/contact" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Contact</Link>
                    <Link href="/careers" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Careers</Link>
                </div>

                <div className={styles.mobileFooter}>
                    {session ? (
                        <div className={styles.mobileFooterActions}>
                            <Link href="/dashboard" className={styles.mobileAccessBtn} onClick={toggleMobileMenu}>
                                Studio Dashboard
                            </Link>
                            <button
                                className={`${styles.mobileAccessBtn} ${styles.mobileSignOut}`}
                                onClick={() => { toggleMobileMenu(); signOut({ callbackUrl: "/auth" }); }}
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link href="/auth" className={styles.mobileAccessBtn} onClick={toggleMobileMenu}>
                            Login / Sign-up
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
