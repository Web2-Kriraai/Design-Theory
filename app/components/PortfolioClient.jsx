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
        <div className="min-h-screen bg-[#FCFAF7] w-full overflow-x-hidden">
            <main className="pt-[120px] md:pt-[140px] lg:pt-[160px] w-full flex flex-col items-center" style={{ transform: 'translateY(150px)' }}>
                <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col items-center">

                    {/* Hero Section with proper spacing */}
                    <div className="flex flex-col items-center text-center mb-24 md:mb-32 w-full">
                        <div className="flex flex-col items-center space-y-6">
                            <div className="w-full mb-16 md:mb-20  pt-10 pr-10 pb-10 pl-10 mt-5 mr-4 mb-6 ml-3">

                                <motion.p
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.5em' }}
                                    className="uppercase text-[#9A9490] font-bold"
                                >
                                    The Design Theory
                                </motion.p>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
                                style={{ fontFamily: 'var(--font-script)', lineHeight: 1 }}
                                className="text-6xl md:text-7xl lg:text-8xl text-[#2C2A28] font-normal"
                            >
                                Portfolio
                            </motion.h1>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex items-center gap-4 md:gap-6 text-[#D6CDC4] my-8"
                        >
                            <span className="text-lg md:text-xl">»</span>
                            <span className="w-12 md:w-16 h-[1px] bg-current block" />
                            <span className="text-[#D4AF37] text-sm md:text-base">✦</span>
                            <span className="w-12 md:w-16 h-[1px] bg-current block" />
                            <span className="text-lg md:text-xl">«</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.5 }}
                            className="text-[#5A5653] text-xl md:text-2xl max-w-5xl italic font-light px-10"
                        >
                            A definitive collection of architectural and interior design endeavors,
                            crafted for those who value the language of space.
                        </motion.p>
                    </div>

                    {/* Filter Bar with reduced bottom margin */}
                    <div className="w-full mb-16 md:mb-20  pt-10 pr-10 pb-10 pl-10 mt-5 mr-4 mb-6 ml-3">
                        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
                    </div>

                    {/* Projects Grid with proper bottom spacing */}
                    <LayoutGroup>
                        {filteredProjects.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16 lg:gap-y-24 w-full pb-24 md:pb-32"
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
                                className="flex flex-col items-center justify-center py-32 md:py-48 w-full pb-32"
                            >
                                <p
                                    style={{ fontFamily: 'var(--font-serif)' }}
                                    className="text-xl md:text-2xl text-[#5A5653] italic mb-10 text-center px-4 font-light"
                                >
                                    No projects found in this category.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveCategory('ALL')}
                                    style={{
                                        fontFamily: 'var(--font-sans)',
                                        letterSpacing: '0.3em'
                                    }}
                                    className="px-10 py-4 border border-[#D6CDC4] text-[0.7rem] md:text-[0.75rem] font-bold uppercase text-[#9A9490] hover:text-[#2C2A28] hover:border-[#2C2A28] transition-all duration-300"
                                >
                                    View All Projects
                                </motion.button>
                            </motion.div>
                        )}
                    </LayoutGroup>
                </div>
            </main>
        </div>
    );
}