'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./PortfolioGlimpse.module.css";

export default function PortfolioGlimpse() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPortfolio() {
            try {
                const res = await fetch("/api/portfolio");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();

                if (data && data.projects) {
                    // Extract main images and any gallery images to make a rich glimpse
                    let allImages = [];
                    data.projects.forEach(project => {
                        if (project.coverImage) {
                            allImages.push({
                                src: project.coverImage,
                                title: project.title,
                                id: project._id
                            });
                        }
                    });
                    if (allImages.length === 0) {
                        // Fallback placeholder images if database is empty 
                        allImages = [
                            { src: "/assets/styles/interior-living.jpg", title: "Living Room", id: "fb1" },
                            { src: "/assets/styles/high-living.jpg", title: "High Living", id: "fb3" },
                        ];
                    }

                    setImages(allImages);
                }
            } catch (err) {
                console.error("Error fetching portfolio glimpse:", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPortfolio();
    }, []);

    if (isLoading || images.length === 0) return null;

    // Duplicate images for infinite scrolling effect
    const scrollingImages = [...images, ...images, ...images, ...images];

    // Split into two rows if there are enough images
    const row1 = scrollingImages.filter((_, i) => i % 2 === 0);
    const row2 = scrollingImages.filter((_, i) => i % 2 !== 0);

    return (
        <section className={styles.glimpseSection}>
            <div className={styles.glimpseHeader}>
                <h2 className={styles.glimpseTitle}>GLIMPSE</h2>
                <Link href="/portfolio" className={styles.glimpseLink}>
                    View Full Portfolio <span>→</span>
                </Link>
            </div>

            <div className={styles.marqueeContainer}>
                <div className={styles.marqueeTrack}>
                    {row1.map((img, idx) => (
                        <div key={`r1-${idx}`} className={styles.imageCard}>
                            <Image
                                src={img.src}
                                alt={img.title || "Portfolio Image"}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.marqueeContainer} style={{ marginTop: "24px" }}>
                <div className={`${styles.marqueeTrack} ${styles.reverseTrack}`}>
                    {row2.map((img, idx) => (
                        <div key={`r2-${idx}`} className={styles.imageCard}>
                            <Image
                                src={img.src}
                                alt={img.title || "Portfolio Image"}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
