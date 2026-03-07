import React from 'react';
import PortfolioCard from '../components/PortfolioCard';
import connectMongo from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

export const revalidate = 60; // ISR cache revalidation

export default async function PortfolioPage() {
    let projects = [];
    try {
        await connectMongo();
        const docs = await Portfolio.find().sort({ createdAt: -1 });
        projects = JSON.parse(JSON.stringify(docs)); // serialize for client transmission
    } catch (err) {
        console.error('Error fetching portfolio:', err);
    }

    return (
        <main style={{ background: '#FCFAF7', minHeight: '100vh', paddingTop: '160px', paddingBottom: '100px' }}>
            <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>

                {/* ── HEADER ── */}
                <header style={{ marginBottom: '80px', textAlign: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-secondary, sans-serif)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#7C3AED', display: 'block', marginBottom: '16px' }}>
                        Our Work
                    </span>
                    <h1 style={{ fontFamily: 'var(--font-primary, serif)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: '#2C2A28', lineHeight: 1.1, margin: '0 0 24px 0' }}>
                        Selected <i>Projects</i>
                    </h1>
                    <p style={{ fontFamily: 'var(--font-secondary, sans-serif)', fontSize: '1rem', color: '#5A5653', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        Explore a curated collection of our finest architectural and interior design
                        endeavors, transforming visions into tangible masterpieces.
                    </p>
                </header>

                {/* ── GRID ── */}
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                        {projects.map((project, index) => {
                            // Define staggered grid logic:
                            // 0: 8 columns, 1: 4 columns
                            // 2: 6 columns, 3: 6 columns
                            // 4: 12 columns
                            // 5: 4 columns, 6: 8 columns

                            const patternIndex = index % 5;
                            let colSpan = "md:col-span-6"; // default

                            switch (patternIndex) {
                                case 0: colSpan = "md:col-span-12 lg:col-span-8"; break;
                                case 1: colSpan = "md:col-span-12 lg:col-span-4"; break;
                                case 2: colSpan = "md:col-span-12 lg:col-span-6"; break;
                                case 3: colSpan = "md:col-span-12 lg:col-span-6"; break;
                                case 4: colSpan = "md:col-span-12"; break;
                            }

                            return (
                                <div key={project._id} className={colSpan}>
                                    <PortfolioCard project={project} index={index} />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '100px 0', color: '#999' }}>
                        <p style={{ fontFamily: 'var(--font-secondary, sans-serif)', fontSize: '1.2rem' }}>No projects found yet. Admin can upload projects via the Dashboard.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
