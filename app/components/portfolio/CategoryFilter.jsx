'use client';

import { motion, LayoutGroup } from 'framer-motion';

const CATEGORIES = [
    'ALL',
    'RESIDENTIAL',
    'COMMERCIAL',
    'ARCHITECTURE',
    'INTERIOR DESIGN',
    '3D VISUALIZATION',
    'WEB & UI DESIGN',
];

export default function CategoryFilter({ active, onChange }) {
    return (
        <div className="w-full flex flex-col items-center mb-12">

            {/* Pill track */}
            <LayoutGroup>
                <div className="flex flex-wrap justify-center gap-1 md:gap-2 bg-[#F5F0EB] rounded-full p-1.5 md:p-2">
                    {CATEGORIES.map((cat) => {
                        const isActive = active === cat;
                        return (
                            <motion.button
                                key={cat}
                                onClick={() => onChange(cat)}
                                whileTap={{ scale: 0.96 }}
                                className="relative px-4 py-2 md:px-6 md:py-2.5 rounded-full focus:outline-none"
                                style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '0.63rem',
                                    letterSpacing: '0.2em',
                                    fontWeight: 600,
                                }}
                            >
                                {/* Animated sliding pill */}
                                {isActive && (
                                    <motion.span
                                        layoutId="active-pill"
                                        className="absolute inset-0 rounded-full bg-[#2C2A28] shadow-sm"
                                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                                    />
                                )}

                                <span
                                    className={`relative z-10 uppercase whitespace-nowrap transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#8A8480] hover:text-[#2C2A28]'
                                        }`}
                                >
                                    {cat}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </LayoutGroup>

            {/* Thin separator below */}
            <div className="w-full h-[1px] bg-[#E8E3DB] mt-8" />
        </div>
    );
}