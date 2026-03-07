'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
            className="group flex flex-col"
        >
            <Link href={`/portfolio/${project._id}`} className="flex flex-col flex-1 no-underline">

                {/* ── IMAGE ── */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F0EBE3]">
                    {project.coverImage ? (
                        <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-[#E8E3DB]" />
                    )}
                </div>

                {/* ── TEXT CONTENT ── */}
                <div className="pt-4 pb-2 flex flex-col items-center text-center gap-1">
                    {/* Category — site standard: Montserrat uppercase micro-label */}
                    {project.category && (
                        <span
                            style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.28em' }}
                            className="text-[0.6rem] font-semibold uppercase text-[#9A9490]"
                        >
                            {project.category}
                        </span>
                    )}

                    {/* Title — site standard: Cormorant Garamond heading */}
                    <h3
                        style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.25 }}
                        className="text-xl md:text-2xl text-[#2C2A28] font-normal mt-1 group-hover:text-[#D4AF37] transition-colors duration-300"
                    >
                        {project.title}
                    </h3>

                    {/* Explore link — minimal animated underline dash */}
                    <div
                        style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.2em' }}
                        className="mt-3 text-[#9A9490] flex items-center gap-2 group-hover:text-[#2C2A28] transition-colors duration-300"
                    >
                        <span className="w-5 h-[1px] bg-current block transition-all duration-300 group-hover:w-7" />
                        <span className="text-[0.58rem] font-bold uppercase">View Project</span>
                    </div>
                </div>

            </Link>
        </motion.div>
    );
}
