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
            <main className="pt-[220px] md:pt-[260px] lg:pt-[300px] pb-20 w-full flex flex-col items-center mx-auto px-6 sm:px-8 lg:px-16 flex ">
                <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-16 flex flex-col items-center">

                    {/* ── HERO TEXT ── Matching site Cormorant Garamond headings */}
                    <div className="flex flex-col items-center text-center my-12 pt-30">
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.35em' }}
                            className="uppercase text-[#9A9490] font-semibold mb-5"
                        >
                            The Design Theory
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            style={{ fontFamily: 'var(--font-script)', lineHeight: 1.15 }}
                            className="text-5xl md:text-6xl lg:text-7xl text-[#2C2A28] mb-6 font-normal"
                        >
                            Our Portfolio
                        </motion.h1>

                        {/* Decorative divider - matches subpage style */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="flex items-center gap-3 text-[#5A5653] mb-6 opacity-60"
                        >
                            <span className="text-lg">»</span>
                            <span className="w-10 h-[1px] bg-current block" />
                            <span className="text-[0.6rem]">✦</span>
                            <span className="w-10 h-[1px] bg-current block" />
                            <span className="text-lg">«</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.8 }}
                            className="text-[#5A5653] text-base md:text-lg max-w-2xl"
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
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16 w-full"
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
