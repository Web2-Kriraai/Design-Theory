'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-24 left-6 z-50"
        >
            <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#2A1E2F] px-4 py-2.5 rounded-full
                    text-[0.72rem] font-bold uppercase tracking-[0.15em] no-underline
                    shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#C9A430] group"
            >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                Back to Portfolio
            </Link>
        </motion.div>
    );
}
