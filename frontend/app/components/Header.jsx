"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${!isHomePage ? styles.notHome : ""}`}>
            {/* Top utility bar */}
            {/* <div className={styles.topBar}>
                <div className={styles.topRight}>
                    <button className={styles.iconBtn}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>
                    </button>
                    <button className={styles.iconBtn}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path></svg>
                    </button>
                    <button className={styles.iconBtn}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path></svg>
                        <span className={styles.cartCount}>0</span>
                    </button>
                </div>
            </div> */}

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
                            className={styles.logoImg}
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
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <button className={styles.closeBtn} onClick={toggleMobileMenu}>✕</button>
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
