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
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
            className={`group relative bg-white border border-[#D6CDC4] rounded-sm overflow-hidden transition-shadow duration-500 hover:shadow-xl ${className}`}
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <Link href={`/portfolio/${project._id}`} className="flex flex-col h-full w-full no-underline">
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#FCFAF7] border-b border-[#D6CDC4]">
                    {project.coverImage ? (
                        <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[#5A5653] font-sans text-sm">
                            Image Unavailable
                        </div>
                    )}
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between bg-white">
                    <div>
                        {/* Meta */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#7C3AED]">
                                {project.category}
                            </span>
                            {project.clientName && (
                                <>
                                    <span className="text-[#D6CDC4] text-[10px]">|</span>
                                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#5A5653]">
                                        {project.clientName}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-2xl md:text-3xl text-[#2C2A28] leading-[1.2] m-0 group-hover:text-[#7C3AED] transition-colors duration-300">
                            {project.title}
                        </h3>
                    </div>

                    {/* Action Link */}
                    <div className="mt-8 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#2C2A28] group-hover:text-[#7C3AED] transition-colors duration-300">
                        Explore <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
