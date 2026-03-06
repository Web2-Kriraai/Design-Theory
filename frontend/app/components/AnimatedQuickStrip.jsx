"use client";

import React from "react";
import Link from "next/link";
import styles from "./AnimatedQuickStrip.module.css";

const links = [
    { label: "View Portfolio", href: "/portfolio" },
    { label: "Our Services", href: "/services" },
    { label: "About Us", href: "/about-us" },
    { label: "Careers", href: "/careers" }
];

export default function AnimatedQuickStrip() {
    // We duplicate the links array to create a seamless infinite scroll loop
    const content = (
        <div className={styles.stripContent}>
            {links.map((link, i) => (
                <React.Fragment key={i}>
                    <Link href={link.href} className={styles.stripLink}>
                        {link.label} <span className={styles.arrow}>→</span>
                    </Link>
                    <span className={styles.stripDivider}>|</span>
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <section className={styles.stripWrapper}>
            <div className={styles.stripTrack}>
                {content}
                {content}
                {/* Add more duplicates for ultra-wide screens if necessary to prevent seeing the end */}
                {content}
                {content}
            </div>
        </section>
    );
}
