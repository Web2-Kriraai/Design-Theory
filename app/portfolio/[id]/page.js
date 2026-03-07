import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import mongoose from 'mongoose';
import connectMongo from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { id } = await params;
    try {
        await connectMongo();
        if (!mongoose.isValidObjectId(id)) return { title: 'Project Not Found' };
        const doc = await Portfolio.findById(id).lean();
        if (!doc) return { title: 'Project Not Found' };
        return {
            title: `${doc.title} | The Design Theory`,
            description: doc.description?.slice(0, 160) || '',
        };
    } catch {
        return { title: 'Portfolio | The Design Theory' };
    }
}

const SLOGANS = [
    "Space is the language we speak, beauty is how we say it.",
    "Every room tells a story. We make sure it's worth reading.",
    "Design is not decoration — it is intention made tangible.",
    "Great spaces don't happen by accident. They are crafted with care.",
];

// Render images in PDF-style minimal layout: One full-width, then 2x2 grids
function EditorialGrid({ images }) {
    if (!images || images.length === 0) return null;

    const frameClass = "relative overflow-hidden bg-[#F0EBE3] w-full border-[10px] md:border-[16px] border-[#FCFAF7] shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-700 hover:border-[#E8E1D7]";

    return (
        <div className="flex flex-col gap-10 md:gap-16">
            {images.map((img, i) => {
                // First image is a massive feature shot
                if (i === 0) {
                    return (
                        <div key={i} className={`${frameClass} aspect-[16/9]`}>
                            <Image
                                src={img}
                                alt={`Project feature image`}
                                fill
                                className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
                                sizes="(max-width: 1200px) 100vw, 1280px"
                                priority
                            />
                        </div>
                    );
                }

                // Render the rest in pairs (2-column grid matching PDF page 2)
                if (i % 2 !== 0) {
                    const nextImg = images[i + 1];
                    return (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div className={`${frameClass} aspect-[4/3]`}>
                                <Image
                                    src={img}
                                    alt={`Project image ${i + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            {nextImg && (
                                <div className={`${frameClass} aspect-[4/3]`}>
                                    <Image
                                        src={nextImg}
                                        alt={`Project image ${i + 2}`}
                                        fill
                                        className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            )}
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
}

export default async function PortfolioDetailsPage({ params }) {
    const { id } = await params;
    let project = null;
    let latestProjects = [];

    try {
        await connectMongo();

        if (!mongoose.isValidObjectId(id)) {
            project = null;
        } else {
            const allProjects = await Portfolio.find().sort({ createdAt: -1 }).lean();
            const currentIndex = allProjects.findIndex(p => p._id.toString() === id);

            if (currentIndex !== -1) {
                project = JSON.parse(JSON.stringify(allProjects[currentIndex]));
                // Latest = all other projects (excluding current), up to 4
                latestProjects = allProjects
                    .filter(p => p._id.toString() !== id)
                    .slice(0, 4)
                    .map(p => JSON.parse(JSON.stringify(p)));
            }
        }
    } catch (err) {
        console.error('Error fetching project:', err);
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FCFAF7] pt-[90px]">
                <div className="text-center px-6">
                    <h1 className="font-serif text-4xl text-[#2A1E2F] mb-4">Project Not Found</h1>
                    <p className="text-[#5A5653] mb-8 max-w-md mx-auto">This project doesn&apos;t exist or may have been removed.</p>
                    <Link href="/portfolio" className="inline-flex items-center gap-3 bg-[#2A1E2F] text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] no-underline hover:bg-purple-900 transition-colors duration-300">
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    const allImages = [
        ...(project.coverImage ? [project.coverImage] : []),
        ...(project.images || []),
    ];

    return (
        <main className="bg-[#FCFAF7] min-h-screen flex flex-col items-center pt-[220px] md:pt-[260px] lg:pt-[300px]" style={{ transform: "translateY(150px)", marginBottom: "150px" }}>
            <div className="w-full pb-16 md:pb-32 flex flex-col items-center">

                {/* ── SINGLE CENTERED WRAPPER — max-w-1280 ── */}
                <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-16">

                    {/* ── PREMIUM HEADER ── */}
                    <header className="pb-24 text-center block w-full relative">
                        {/* Elegant Back Link */}
                        <div className="flex justify-center mb-16">
                            <Link
                                href="/portfolio"
                                className="inline-flex items-center gap-4 text-[#9A9490] hover:text-[#2A1E2F] text-[0.65rem] font-bold uppercase tracking-[0.4em] no-underline transition-all duration-300 group"
                            >
                                <span className="w-8 h-[1px] bg-[#D6CDC4] block transition-all group-hover:w-12 group-hover:bg-[#2A1E2F]" />
                                BACK TO PORTFOLIO
                            </Link>
                        </div>

                        {/* Title - Elegant Script Font */}
                        <h1
                            style={{ fontFamily: 'var(--font-script)', lineHeight: 1 }}
                            className="text-7xl md:text-8xl lg:text-[7.5rem] text-[#2C2A28] m-0 mb-10 font-normal tracking-tight"
                        >
                            {project.title}
                        </h1>

                        {/* Decorative Divider */}
                        <div className="flex items-center justify-center gap-6 text-[#D6CDC4] mb-12">
                            <span className="text-xl">»</span>
                            <span className="w-20 h-[1px] bg-current block" />
                            <span className="text-[0.65rem] text-[#D4AF37]">✦</span>
                            <span className="w-20 h-[1px] bg-current block" />
                            <span className="text-xl">«</span>
                        </div>

                        {/* Project Metadata Section */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto mb-16 py-8 border-y border-[#E8E3DB]">
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#9A9490]">Category</span>
                                <span className="font-serif text-lg text-[#2C2A28] italic lowercase tracking-wider">{project.category || 'Architecture'}</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#9A9490]">Client</span>
                                <span className="font-serif text-lg text-[#2C2A28] italic lowercase tracking-wider">{project.clientName || 'Private Client'}</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 col-span-2 md:col-span-1">
                                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#9A9490]">Year</span>
                                <span className="font-serif text-lg text-[#2C2A28] italic lowercase tracking-wider">{project.year || '2024'}</span>
                            </div>
                        </div>

                        {/* Elegant Description */}
                        {project.description && (
                            <p className="text-[#5A5653] font-serif text-xl md:text-2xl lg:text-[1.65rem] leading-[1.8] max-w-4xl mx-auto font-light italic">
                                &ldquo;{project.description}&rdquo;
                            </p>
                        )}
                    </header>

                    {/* ── EDITORIAL PHOTO GRID ── */}
                    <section className="pb-20">
                        <EditorialGrid images={allImages} />
                    </section>


                    {/* ── FINAL CTA ── */}
                    <section className="py-24 text-center block w-full border-t border-[#E8E3DB]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <h4 className="font-serif text-2xl italic text-[#5A5653]">Interested in a similar project?</h4>
                            <Link
                                href="/portfolio"
                                className="inline-flex items-center gap-4 text-[#9A9490] hover:text-[#2A1E2F] text-[0.65rem] font-bold uppercase tracking-[0.4em] no-underline transition-all duration-300 group"
                            >
                                <span className="w-12 h-[1px] bg-[#D6CDC4] block transition-all group-hover:w-16 group-hover:bg-[#2A1E2F]" />
                                EXPLORE MORE WORK
                            </Link>
                        </motion.div>
                    </section>

                </div>{/* end centered wrapper */}
            </div>{/* end safe area wrapper */}
        </main>
    );
}
