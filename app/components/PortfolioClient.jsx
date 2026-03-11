'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import ProjectCard from '../components/portfolio/ProjectCard';
import CategoryFilter from '../components/portfolio/CategoryFilter';

/*
 * ─────────────────────────────────────────────────────────────────
 *  DESIGN TOKEN SHEET  — edit values here only, nowhere else
 * ─────────────────────────────────────────────────────────────────
 */
const TOKENS = `
  :root {
    --nav-h         : 100px;
    --page-px       : clamp(1rem, 3vw, 3rem);
    --section-gap   : clamp(1.5rem, 3vw, 3rem);
    --grid-col-gap  : clamp(1.5rem, 3vw, 3rem);
    --grid-row-gap  : clamp(2rem, 5vw, 5rem);
  }

  @media (min-width: 1024px) {
    :root { --nav-h: 110px; }
  }
`;

export default function PortfolioClient({ initialProjects }) {
    const [activeCategory, setActiveCategory] = useState('ALL');

    const filteredProjects =
        activeCategory === 'ALL'
            ? initialProjects
            : initialProjects.filter(p =>
                p.category?.toUpperCase() === activeCategory ||
                p.category?.toUpperCase().includes(activeCategory)
            );

    return (
        <div className="relative z-0">
            {/* ── Global design tokens ──────────────────────────────── */}
            <style>{TOKENS}</style>

            {/*
              PAGE SHELL
              padding-top = var(--nav-h)  →  clears fixed header
              min-h-screen                →  ensures footer positioning and scroll
            */}
            <div
                className="w-full min-h-screen bg-[#FCFAF7]"
                style={{ paddingTop: 'var(--nav-h)' }}
            >
                <main className="w-full flex flex-col items-center">
                    <div
                        className="w-full max-w-[1600px] mx-auto flex flex-col items-center"
                        style={{
                            paddingLeft: 'var(--page-px)',
                            paddingRight: 'var(--page-px)',
                            paddingBottom: 'var(--section-gap)',
                        }}
                    >

                        {/* ── HERO (Ultra-Compact) ──────────────────────── */}
                        <section
                            className="flex flex-col items-center justify-center text-center w-full"
                            style={{
                                paddingTop: 'calc(var(--section-gap) / 4)',
                                paddingBottom: 'calc(var(--section-gap) / 4)',
                            }}
                        >
                            {/* Eyebrow label */}
                            <motion.p
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '0.58rem',
                                    letterSpacing: '0.35em',
                                    marginBottom: '0.4rem',
                                }}
                                className="uppercase text-[#9A9490] font-bold"
                            >
                                The Design Theory
                            </motion.p>

                            {/* Page title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.05, ease: 'easeOut' }}
                                style={{
                                    fontFamily: 'var(--font-script)',
                                    lineHeight: 0.85,
                                    marginBottom: '0.4rem',
                                }}
                                className="text-5xl md:text-6xl lg:text-7xl text-[#2C2A28] font-normal"
                            >
                                Portfolio
                            </motion.h1>

                            {/* Ornamental divider */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex items-center text-[#D6CDC4]"
                                style={{ gap: '0.75rem', margin: '0.4rem 0' }}
                            >
                                <span className="text-base">»</span>
                                <span className="block h-px w-8 bg-current" />
                                <span className="text-[#D4AF37] text-[10px]">✦</span>
                                <span className="block h-px w-8 bg-current" />
                                <span className="text-base">«</span>
                            </motion.div>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                style={{
                                    fontFamily: 'var(--font-serif)',
                                    lineHeight: 1.4,
                                    maxWidth: '65ch',
                                }}
                                className="text-[#5A5653] text-[0.95rem] md:text-base lg:text-lg italic font-light"
                            >
                                A definitive collection of architectural and interior design endeavors,
                                crafted for those who value the language of space.
                            </motion.p>
                        </section>

                        {/* ── FILTER BAR ───────────────────────────────── */}
                        <div
                            className="w-full"
                            style={{ marginBottom: 'var(--section-gap)' }}
                        >
                            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
                        </div>

                        {/* ── PROJECTS GRID ────────────────────────────── */}
                        <LayoutGroup>
                            {filteredProjects.length > 0 ? (
                                <motion.div
                                    layout
                                    className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                    style={{
                                        columnGap: 'var(--grid-col-gap)',
                                        rowGap: 'var(--grid-row-gap)',
                                    }}
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filteredProjects.map((project, index) => (
                                            <motion.div
                                                key={project._id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{
                                                    duration: 0.4,
                                                    ease: 'easeOut',
                                                    delay: index * 0.05,
                                                }}
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
                                    className="flex flex-col items-center justify-center w-full"
                                    style={{
                                        paddingTop: 'var(--section-gap)',
                                        paddingBottom: 'var(--section-gap)',
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: 'var(--font-serif)',
                                            marginBottom: '2.5rem',
                                        }}
                                        className="text-xl md:text-2xl text-[#5A5653] italic font-light text-center"
                                    >
                                        No projects found in this category.
                                    </p>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setActiveCategory('ALL')}
                                        style={{
                                            fontFamily: 'var(--font-sans)',
                                            letterSpacing: '0.3em',
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
        </div>
    );
}