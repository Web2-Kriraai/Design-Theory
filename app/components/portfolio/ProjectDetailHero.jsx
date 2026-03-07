'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProjectDetailHero({ project }) {
    return (
        <section className="relative w-full h-[calc(70vh+90px)] min-h-[550px] max-h-[850px] overflow-hidden">
            {/* Background Image */}
            {project.coverImage ? (
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-purple-700" />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/30 to-transparent" />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 max-w-5xl pb-12"
            >
                {/* Category Badge */}
                <div className="mb-5">
                    <span className="inline-block bg-[#D4AF37] text-[#2A1E2F] text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full">
                        {project.category}
                    </span>
                </div>

                {/* Title */}
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-tight m-0 mb-4">
                    {project.title}
                </h1>

                {/* Client */}
                {project.clientName && (
                    <p className="text-[#F5E6B2] text-lg sm:text-xl font-light">
                        {project.clientName}
                    </p>
                )}
            </motion.div>
        </section>
    );
}
