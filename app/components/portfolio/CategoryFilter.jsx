'use client';

import { motion } from 'framer-motion';

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
        <div className="w-full flex justify-center">
            <div className="flex flex-wrap justify-center gap-3 md:gap-5 max-w-5xl mx-auto">
                {CATEGORIES.map((cat) => {
                    const isActive = active === cat;
                    return (
                        <motion.button
                            key={cat}
                            onClick={() => onChange(cat)}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                            className="relative px-5 py-3 md:px-6 md:py-4 focus:outline-none group"
                        >
                            <span
                                className={`
                                    block uppercase whitespace-nowrap
                                    text-[0.65rem] md:text-[0.7rem] tracking-[0.25em] font-medium
                                    transition-all duration-300
                                    ${isActive 
                                        ? 'text-[#2C2A28] scale-105 font-semibold' 
                                        : 'text-[#9A9490] group-hover:text-[#2C2A28] group-hover:scale-105'
                                    }
                                `}
                            >
                                {cat}
                            </span>
                            
                            {/* Optional: Very subtle active indicator (can be removed) */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-[#2C2A28]"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}