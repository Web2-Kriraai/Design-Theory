import React from 'react';
import connectMongo from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';
import PortfolioClient from '../components/PortfolioClient';

export const metadata = {
    title: 'Portfolio | The Design Theory',
    description: 'A definitive collection of architectural and interior design endeavors, crafted for those who value the language of space.',
};

export const revalidate = 60;

export default async function PortfolioPage() {
    let projects = [];
    try {
        await connectMongo();
        const docs = await Portfolio.find().sort({ createdAt: -1 });
        projects = JSON.parse(JSON.stringify(docs));
    } catch (err) {
        console.error('Error fetching portfolio projects:', err);
    }

    return <PortfolioClient initialProjects={projects} />;
}
