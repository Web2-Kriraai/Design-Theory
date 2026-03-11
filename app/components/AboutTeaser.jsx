import Image from "./AnimatedImage";
import Link from "next/link";
import styles from "./AboutTeaser.module.css";

export default function AboutTeaser() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Image Side */}
                <div className={styles.imageWrap}>
                    <div className={styles.imageFrame}>
                        <Image
                            src="/assets/about/founder.png"
                            alt="Rachitha Modupalli – Founder, The Design Theory"
                            width={520}
                            height={640}
                            className={styles.image}
                        />
                        {/* Gold corner accents */}
                        <span className={styles.cornerTL}></span>
                        <span className={styles.cornerBR}></span>
                    </div>
                </div>

                {/* Text Side */}
                <div className={styles.textWrap}>
                    <p className={styles.label}>The Design Theory</p>
                    <p className={styles.body}>
                        Founded by <strong>Rachitha Modupalli</strong>, an ambitious B.Arch
                        graduate, The Design Theory was created with a vision to design
                        beautiful, functional spaces that transform ideas into reality. With
                        a passion for innovation and a commitment to quality, we approach
                        every project with fresh perspective and purpose.
                    </p>
                    <Link href="/about-us" className={styles.cta}>
                        ABOUT US <span className={styles.arrow}>→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
