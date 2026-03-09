'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            className="group flex flex-col"
        >
            <Link href={`/portfolio/${project._id}`} className="flex flex-col no-underline">

                {/* ── IMAGE FRAME ── */}
                <div
                    className={`relative overflow-hidden bg-[#F0EBE3] transition-all duration-700 ease-out border-[12px] border-[#FCFAF7] shadow-[0_15px_35px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] group-hover:border-[#E8E1D7] ${index % 3 === 0 ? 'aspect-[4/5]' :
                        index % 3 === 1 ? 'aspect-square' :
                            'aspect-[1.4/1]'
                        }`}
                >
                    {project.coverImage ? (
                        <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            loading="lazy"
                            quality={85}
                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05] grayscale-[20%] group-hover:grayscale-0"
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-[#E8E3DB]" />
                    )}

                    {/* Subtle Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* ── TEXT CONTENT ── */}
                <div className="pt-8 pb-4 flex flex-col items-center text-center">
                    {/* Category */}
                    {project.category && (
                        <span
                            style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.4em' }}
                            className="text-[0.55rem] font-bold uppercase text-[#9A9490] mb-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            {project.category}
                        </span>
                    )}

                    {/* Title */}
                    <h3
                        style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}
                        className="text-2xl md:text-3xl lg:text-[2rem] text-[#2C2A28] font-normal group-hover:text-[#D4AF37] transition-all duration-500 tracking-tight"
                    >
                        {project.title}
                    </h3>

                    {/* View Button */}
                    <div
                        style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.25em' }}
                        className="mt-6 text-[#9A9490] flex items-center gap-3 group-hover:text-[#2C2A28] transition-all duration-300"
                    >
                        <span className="w-8 h-[1px] bg-[#D6CDC4] block transition-all duration-500 group-hover:w-12 group-hover:bg-[#2C2A28]" />
                        <span className="text-[0.6rem] font-bold uppercase">Explore</span>
                    </div>
                </div>

            </Link>
        </motion.div>
    );
}
