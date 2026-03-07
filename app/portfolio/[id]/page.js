import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import mongoose from 'mongoose';
import connectMongo from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';
import ImageGallery from '../../components/ImageGallery';

export const revalidate = 60;

export default async function PortfolioDetailsPage({ params }) {
    const { id } = await params;
    await connectMongo();

    let project = null;
    try {
        if (mongoose.isValidObjectId(id)) {
            const doc = await Portfolio.findById(id);
            if (doc) project = JSON.parse(JSON.stringify(doc));
        }
    } catch (err) {
        console.error('Error fetching project:', err);
    }

    if (!project) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FCFAF7' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'var(--font-primary, serif)', fontSize: '3rem', color: '#2D2926' }}>Project Not Found</h1>
                    <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#7C3AED', textDecoration: 'none', marginTop: '16px', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-[#FCFAF7] min-h-screen">
            {/* ── HERO SECTION ── */}
            <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Immersive Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A28] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6 sm:px-12">
                    <div className="max-w-[1440px] mx-auto w-full">
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 mb-8 font-bold text-[0.7rem] uppercase tracking-[0.3em] no-underline group"
                        >
                            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Portfolio
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[0.8rem] font-bold uppercase tracking-[0.4em] text-[#C6A87D]">
                                {project.category}
                            </span>
                            <div className="w-12 h-[1px] bg-white/40" />
                            <span className="text-[0.8rem] font-bold uppercase tracking-[0.2em] text-white/80">
                                {project.clientName}
                            </span>
                        </div>

                        <h1 className="font-serif text-[clamp(3.5rem,8vw,8rem)] text-white leading-[0.9] tracking-tighter m-0 drop-shadow-2xl">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* ── PROJECT CONTENT ── */}
            <section className="py-24 px-6 sm:px-12">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Column: Description (Sticky Sidebar Layout) */}
                    <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-12">
                        <div className="space-y-8">
                            <h2 className="font-serif text-5xl md:text-6xl text-[#2C2A28] leading-tight">The Vision</h2>
                            <div className="font-sans text-xl md:text-2xl text-[#5A5653] leading-relaxed max-w-[800px] font-light">
                                {project.description}
                            </div>
                        </div>

                        {/* Gallery Section Integrated into flow */}
                        {project.images && project.images.length > 0 && (
                            <div className="pt-12">
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-12 h-[1px] bg-[#7C3AED]" />
                                    <h2 className="font-serif text-3xl md:text-4xl text-[#2C2A28] m-0">Visual Documentation</h2>
                                </div>
                                <ImageGallery images={project.images} />
                            </div>
                        )}
                    </div>

                    {/* Right Column: Metadata (Sticky) */}
                    <div className="lg:col-span-12 xl:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="bg-white border border-[#EAE6DF] rounded-[40px] p-10 md:p-12 shadow-sm">
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[#999] mb-4">Client Representative</h3>
                                    <p className="font-sans text-2xl text-[#2C2A28] font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{project.clientName}</p>
                                </div>

                                <div>
                                    <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[#999] mb-4">Service Category</h3>
                                    <p className="font-sans text-2xl text-[#2C2A28] font-medium tracking-tight">{project.category}</p>
                                </div>

                                {project.technologies && project.technologies.length > 0 && (
                                    <div>
                                        <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[#999] mb-6">Expertise Applied</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map(tech => (
                                                <span key={tech} className="px-5 py-2.5 bg-[#F9F7F2] border border-[#EAE6DF] rounded-full text-[0.8rem] font-bold text-[#5A5653] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors duration-300">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {project.projectLink && (
                                    <div className="pt-6 border-t border-[#EAE6DF]">
                                        <a
                                            href={project.projectLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-full gap-3 px-8 py-5 bg-[#2C2A28] hover:bg-[#7C3AED] text-white no-underline font-bold text-[0.9rem] uppercase tracking-[0.2em] rounded-full transition-all duration-500 hover:shadow-xl hover:shadow-[#7C3AED]/20 group"
                                        >
                                            View Outcome <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Info / CTA */}
                        <div className="mt-8 px-6 text-center">
                            <p className="text-[#5A5653] text-[0.9rem] leading-relaxed italic opacity-70">
                                Interested in a similar project? <br />
                                <Link href="/contact" className="text-[#7C3AED] font-bold not-italic hover:underline">Start a conversation</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
