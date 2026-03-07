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
        <div className="w-full flex flex-col items-center mt-24 mb-24 px-4">
            <LayoutGroup>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 bg-[#F5F0EB]/60 backdrop-blur-sm rounded-full p-2.5 md:p-4 border border-[#E8E3DB]">
                    {CATEGORIES.map((cat) => {
                        const isActive = active === cat;
                        return (
                            <motion.button
                                key={cat}
                                onClick={() => onChange(cat)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative px-5 py-2.5 md:px-8 md:py-3 rounded-full focus:outline-none transition-all duration-300"
                                style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.25em',
                                    fontWeight: isActive ? 700 : 500,
                                }}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="active-pill"
                                        className="absolute inset-0 rounded-full bg-[#2C2A28] shadow-lg shadow-black/10"
                                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                                    />
                                )}

                                <span
                                    className={`relative z-10 uppercase whitespace-nowrap tracking-widest transition-colors duration-300 ${isActive ? 'text-[#FCFAF7]' : 'text-[#8A8480] hover:text-[#2C2A28]'
                                        }`}
                                >
                                    {cat}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </LayoutGroup>
        </div>
    );
}