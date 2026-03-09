'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import ProjectCard from '../components/portfolio/ProjectCard';
import CategoryFilter from '../components/portfolio/CategoryFilter';

export default function PortfolioClient({ initialProjects }) {
    const [activeCategory, setActiveCategory] = useState('ALL');

    const filteredProjects = activeCategory === 'ALL'
        ? initialProjects
        : initialProjects.filter(p =>
            p.category?.toUpperCase() === activeCategory ||
            p.category?.toUpperCase().includes(activeCategory)
        );

    return (
        <div className="min-h-screen bg-[#FCFAF7] w-full">
            <main className="pt-[140px] md:pt-[180px] lg:pt-[220px] pb-20 w-full flex flex-col items-center" style={{ transform: "translateY(150px)", marginBottom: "150px" }}>
                <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-16 flex flex-col items-center">

                    {/* ── HERO TEXT ── Matching site Cormorant Garamond headings */}
                    <div className="flex flex-col items-center text-center mt-28 mb-32 max-w-4xl mx-auto space-y-12">
                        <div className="flex flex-col items-center space-y-4">
                            <motion.p
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.5em' }}
                                className="uppercase text-[#9A9490] font-bold"
                            >
                                The Design Theory
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
                                style={{ fontFamily: 'var(--font-script)', lineHeight: 1 }}
                                className="text-6xl md:text-8xl lg:text-9xl text-[#2C2A28] font-normal"
                            >
                                Portfolio
                            </motion.h1>
                        </div>

                        {/* Decorative divider - matches subpage style */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex items-center gap-6 text-[#D6CDC4]"
                        >
                            <span className="text-xl">»</span>
                            <span className="w-16 h-[1px] bg-current block" />
                            <span className="text-[0.7rem] text-[#D4AF37]">✦</span>
                            <span className="w-16 h-[1px] bg-current block" />
                            <span className="text-xl">«</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.8 }}
                            className="text-[#5A5653] text-lg md:text-xl lg:text-2xl max-w-2xl italic font-light px-4"
                        >
                            A definitive collection of architectural and interior design endeavors,
                            crafted for those who value the language of space.
                        </motion.p>
                    </div>

                    {/* ── FILTER BAR ── */}
                    <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

                    {/* ── PROJECT GRID ── */}
                    <LayoutGroup>
                        {filteredProjects.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 mb-32 w-full"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredProjects.map((project, index) => (
                                        <motion.div
                                            key={project._id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
                                        >
                                            <ProjectCard project={project} index={index} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-28 mb-16"
                            >
                                <p
                                    style={{ fontFamily: 'var(--font-serif)' }}
                                    className="text-xl text-[#5A5653] italic mb-5"
                                >
                                    No projects found in this category.
                                </p>
                                <button
                                    onClick={() => setActiveCategory('ALL')}
                                    style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.2em' }}
                                    className="text-[0.65rem] font-bold uppercase text-[#9A9490] hover:text-[#2C2A28] transition-colors duration-300"
                                >
                                    View All Projects
                                </button>
                            </motion.div>
                        )}
                    </LayoutGroup>

                </div>
            </main>
        </div>
    );
}
