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

    return (
        <div className="flex flex-col gap-6 md:gap-10">
            {images.map((img, i) => {
                // First image is a massive feature shot
                if (i === 0) {
                    return (
                        <div key={i} className="relative overflow-hidden bg-[#F0EBE3] aspect-[16/9] w-full">
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
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="relative overflow-hidden bg-[#F0EBE3] aspect-[4/3] w-full group">
                                <Image
                                    src={img}
                                    alt={`Project image ${i + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            {nextImg && (
                                <div className="relative overflow-hidden bg-[#F0EBE3] aspect-[4/3] w-full group">
                                    <Image
                                        src={nextImg}
                                        alt={`Project image ${i + 2}`}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
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
        <main className="bg-[#FCFAF7] min-h-screen font-sans w-full flex flex-col items-center">

            <div className="w-full pt-[220px] md:pt-[260px] lg:pt-[300px] pb-16 md:pb-24 flex flex-col items-center">

                {/* ── SINGLE CENTERED WRAPPER — max-w-1280 ── */}
                <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">

                    {/* ── PDF-STYLE MINIMAL HEADER ── */}
                    <section className="pb-16 text-center block w-full">
                        {/* Back link */}
                        <div className="flex justify-center mb-16">
                            <Link
                                href="/portfolio"
                                className="inline-flex items-center gap-3 text-[#9A9490] hover:text-[#2A1E2F] text-[0.65rem] font-bold uppercase tracking-[0.3em] no-underline transition-colors duration-300 group"
                            >
                                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                                BACK TO PORTFOLIO
                            </Link>
                        </div>

                        {/* Title - Elegant Script Font */}
                        <h1 className="font-script text-6xl md:text-7xl lg:text-[5.5rem] text-[#2C2A28] leading-[1.2] m-0 mb-6 font-normal tracking-wide">
                            {project.title}
                        </h1>

                        {/* Decorative Arrow Divider */}
                        <div className="flex items-center justify-center gap-3 text-[#5A5653] mb-10 opacity-70">
                            <span className="text-xl tracking-widest leading-none">»</span>
                            <span className="w-12 h-[1px] bg-current block" />
                            <span className="text-xs">✦</span>
                            <span className="w-12 h-[1px] bg-current block" />
                            <span className="text-xl tracking-widest leading-none">«</span>
                        </div>

                        {/* Centered Elegant Description */}
                        {project.description && (
                            <p className="text-[#5A5653] font-serif text-lg md:text-xl lg:text-[1.35rem] leading-[1.8] max-w-4xl mx-auto px-4">
                                {project.description}
                            </p>
                        )}

                        {/* Client Note (Subtle) */}
                        {project.clientName && (
                            <p className="text-[#9A9490] text-xs uppercase tracking-[0.2em] mt-8">
                                Client: <span className="text-[#5A5653] font-medium">{project.clientName}</span>
                            </p>
                        )}
                    </section>

                    {/* ── EDITORIAL PHOTO GRID ── */}
                    <section className="pb-6">
                        <EditorialGrid images={allImages} />
                    </section>


                    {/* ── MINIMAL FOOTER ── */}
                    <section className="py-24 text-center block w-full">
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-3 text-[#9A9490] hover:text-[#2A1E2F] text-[0.65rem] font-bold uppercase tracking-[0.3em] no-underline transition-colors duration-300 group"
                        >
                            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                            BACK TO PORTFOLIO
                        </Link>
                    </section>

                </div>{/* end centered wrapper */}
            </div>{/* end safe area wrapper */}
        </main>
    );
}
