'use client';

import { motion } from 'framer-motion';

export default function PortfolioHero() {
    return (
        <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 pt-[90px] pb-24 md:pb-32 px-6 text-center overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl translate-y-1/2" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-[0.72rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37] block mb-5"
                >
                    The Design Theory
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                    className="font-serif text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] tracking-tight m-0 mb-7"
                >
                    Our Portfolio
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl text-[#F5E6B2] leading-relaxed max-w-2xl mx-auto font-light"
                >
                    A definitive collection of architectural and interior design endeavors,
                    crafted for those who value the language of space.
                </motion.p>

                {/* Decorative divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-10"
                />
            </div>
        </section>
    );
}
