'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Tag, ExternalLink } from 'lucide-react';

export default function ProjectInfo({ project }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-[#E8E3DB] p-8 lg:p-10 h-fit shadow-sm"
        >
            <div className="flex items-center gap-3 mb-10">
                <div className="w-1 h-6 bg-[#D4AF37] rounded-full" />
                <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#D4AF37] m-0">
                    Project Details
                </h2>
            </div>

            <div className="space-y-9 divide-y divide-[#F0EBE3]">
                {/* Client */}
                {project.clientName && (
                    <div className="flex items-start gap-5 pt-0 first:pt-0">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <User size={16} className="text-purple-800" />
                        </div>
                        <div>
                            <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-[#9A9490] mb-1.5">Client</p>
                            <p className="text-[#2A1E2F] font-semibold text-base">{project.clientName}</p>
                        </div>
                    </div>
                )}

                {/* Category */}
                {project.category && (
                    <div className="flex items-start gap-5 pt-9">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Tag size={16} className="text-purple-800" />
                        </div>
                        <div>
                            <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-[#9A9490] mb-1.5">Category</p>
                            <p className="text-[#2A1E2F] font-semibold text-base">{project.category}</p>
                        </div>
                    </div>
                )}

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                    <div className="pt-9">
                        <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-[#9A9490] mb-4">Technologies</p>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map(tech => (
                                <span
                                    key={tech}
                                    className="bg-purple-50 text-purple-900 text-[10px] font-bold uppercase tracking-wide px-3.5 py-2 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors duration-200"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Project URL */}
            {project.projectLink && (
                <div className="mt-10 pt-8 border-t border-[#F0EBE3]">
                    <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full gap-3 px-6 py-4 bg-purple-900
                            hover:bg-[#D4AF37] text-white hover:text-[#2A1E2F] no-underline font-bold text-[0.72rem] uppercase
                            tracking-[0.2em] rounded-xl transition-all duration-400 hover:shadow-lg group"
                    >
                        <ExternalLink size={14} />
                        View Live Project
                    </a>
                </div>
            )}
        </motion.div>
    );
}
