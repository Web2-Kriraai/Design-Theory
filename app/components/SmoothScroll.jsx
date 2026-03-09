'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Global click listener to handle same-page navigation
        const handleLinkClick = (e) => {
            const link = e.target.closest('a');
            if (link && link.href) {
                const url = new URL(link.href, window.location.origin);
                const isInternal = url.origin === window.location.origin;
                const isSamePage = url.pathname === window.location.pathname;
                const hasNoHash = !url.hash;

                // If clicking an internal link to the current page with no hash, scroll to top
                if (isInternal && isSamePage && hasNoHash) {
                    if (lenisRef.current) {
                        lenisRef.current.scrollTo(0);
                    }
                }
            }
        };

        window.addEventListener('click', handleLinkClick);

        return () => {
            window.removeEventListener('click', handleLinkClick);
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return <>{children}</>;
}
