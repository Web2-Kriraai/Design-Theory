"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
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
    const isAdminPage = pathname?.startsWith("/admin");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle click outside to close user menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleMouseEnter = (menu) => {
        setActiveDropdown(menu);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const toggleDropdown = (menu) => {
        if (window.innerWidth <= 1024) {
            setActiveDropdown(activeDropdown === menu ? null : menu);
        }
    };

    // if (isAdminPage) return null;

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${!isHomePage ? styles.notHome : ""}`}>
            <div className={styles.mainNav}>
                {/* Mobile menu button */}
                <button className={styles.hamburger} onClick={toggleMobileMenu}>
                    ☰
                </button>

                {/* Left Navigation */}
                <nav className={`${styles.navLeft} ${styles.desktopNav}`}>
                    <div
                        className={styles.navItem}
                        onMouseEnter={() => handleMouseEnter('story')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link href="#" onClick={(e) => { e.preventDefault(); toggleDropdown('story'); }}>
                            Our Story
                        </Link>
                        <div className={`${styles.dropdownContent} ${activeDropdown === 'story' ? styles.showDropdown : ''}`}>
                            <Link href="/about-us">About Us</Link>
                            <Link href="/services">Services</Link>
                        </div>
                    </div>
                    <div className={styles.navItem}>
                        <Link href="/portfolio">Portfolio</Link>
                    </div>
                </nav>

                {/* Center Logo */}
                <div className={styles.logoContainer}>
                    <Link href="/" className={styles.logo}>
                        <Image
                            src="/assets/logo/logo.png"
                            alt="Design Theory Logo"
                            width={100}
                            height={60}
                            className={styles.logo}
                            priority
                        />
                    </Link>
                </div>

                {/* Right Navigation */}
                <nav className={`${styles.navRight} ${styles.desktopNav}`}>
                    <div
                        className={styles.navItem}
                        onMouseEnter={() => handleMouseEnter('inspiration')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link href="#" onClick={(e) => { e.preventDefault(); toggleDropdown('inspiration'); }}>
                            Inspiration
                        </Link>
                        <div className={`${styles.dropdownContent} ${activeDropdown === 'inspiration' ? styles.showDropdown : ''}`}>
                            <Link href="/blog">Blog</Link>
                            <Link href="https://www.instagram.com/the.designtheory/?hl=en">Instagram</Link>
                        </div>
                    </div>
                    <div className={styles.navItem}>
                        <Link href="/contact">Contact</Link>
                    </div>
                    <div className={styles.navItem}>
                        <Link href="/careers">Careers</Link>
                    </div>
                    <div className={styles.navItem}>
                        <Link href="/faqs">FAQs</Link>
                    </div>
                </nav>

                {/* Studio Access Toggle */}
                {/* <div className={styles.studioAccess}>
                    <Link href={session ? "/dashboard" : "/admin/login"} className={styles.accessBtn}>
                        <span>{session ? "Studio Dashboard" : "Studio Access"}</span>
                        <div className={styles.accessIcon}>
                            {session ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                                </svg>
                            ) : (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                                </svg>
                            )}
                        </div>
                    </Link>
                </div> */}

                <div className={styles.topBar}>
                    <div className={styles.topRight}>
                        <div className={styles.userMenuWrapper} ref={userMenuRef}>
                            <button
                                className={styles.iconBtn}
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            >
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path></svg>
                            </button>

                            {/* User Auth Dropdown */}
                            {isUserMenuOpen && (
                                <div className={styles.userDropdown}>
                                    {/* <div className={styles.userDropdownHeader}>
                                        System Authentication
                                    </div> */}
                                    <div className={styles.userDropdownLinks}>
                                        {session ? (
                                            <Link href="/dashboard" className={styles.userDropdownLink} onClick={() => setIsUserMenuOpen(false)}>
                                                <span>Studio Dashboard</span>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                            </Link>
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
                </div>
            </div>
            {/* Mobile Navigation Overlay */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <div className={styles.mobileHeader}>
                    <Link href={session ? "/dashboard" : "/auth"} className={styles.mobileAccessBtn} onClick={toggleMobileMenu}>
                        {session ? "Studio Dashboard" : "Login / Sign-up"}
                    </Link>
                    <button className={styles.closeBtn} onClick={toggleMobileMenu}>✕</button>
                </div>
                <div className={styles.mobileNavLinks}>
                    <div className={styles.mobileNavItem}>
                        <div className={styles.mobileNavTitle} onClick={() => toggleDropdown('story')}>
                            Our Story <span className={styles.toggleIcon}>{activeDropdown === 'story' ? '-' : '+'}</span>
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
                            Inspiration <span className={styles.toggleIcon}>{activeDropdown === 'inspiration' ? '-' : '+'}</span>
                        </div>
                        {activeDropdown === 'inspiration' && (
                            <div className={styles.mobileSubNav}>
                                <Link href="/blog" onClick={toggleMobileMenu}>Blog</Link>
                                <Link href="https://www.instagram.com/the.designtheory/?hl=en" onClick={toggleMobileMenu}>Instagram</Link>
                            </div>
                        )}
                    </div>
                    <Link href="/contact" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Contact</Link>
                    <Link href="/careers" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Careers</Link>
                    <Link href="/faqs" className={styles.mobileNavLink} onClick={toggleMobileMenu}>FAQs</Link>
                </div>
            </div>
        </header>
    );
}
