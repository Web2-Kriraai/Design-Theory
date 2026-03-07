'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function PortfolioCard({ project, index, className = "" }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the image
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: index * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
            className={`group relative overflow-hidden rounded-[32px] bg-white border border-[#EAE6DF] ${className}`}
            style={{ height: '100%', minHeight: '450px' }}
        >
            <Link href={`/portfolio/${project._id}`} className="block h-full w-full no-underline relative overflow-hidden">
                {/* Image Container with Parallax */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div style={{ y, height: '130%', top: '-15%' }} className="relative w-full">
                        <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A28]/80 via-[#2C2A28]/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#7C3AED] bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                                {project.category}
                            </span>
                            <div className="w-8 h-[1px] bg-white/30" />
                            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/70">
                                {project.clientName}
                            </span>
                        </div>

                        <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-2 group-hover:text-white transition-colors duration-300">
                            {project.title}
                        </h3>

                        <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white/0 group-hover:text-white/100 transition-all duration-500 delay-200">
                            View Project <ArrowUpRight size={16} />
                        </div>
                    </div>
                </div>

                {/* Floating Badge (Original Style) */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 ease-[0.34,1.56,0.64,1]">
                    <ArrowUpRight size={20} />
                </div>
            </Link>
        </motion.div>
    );
}
