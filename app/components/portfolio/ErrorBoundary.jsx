'use client';

import { Component } from 'react';
import Link from 'next/link';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Portfolio ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[60vh] flex items-center justify-center bg-[#FCFAF7]">
                    <div className="text-center px-6">
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
                            <span className="text-2xl text-purple-900">!</span>
                        </div>
                        <h2 className="font-serif text-3xl text-[#2A1E2F] mb-4">Something went wrong</h2>
                        <p className="text-[#5A5653] mb-8 max-w-md mx-auto">
                            We encountered an unexpected error. Please try refreshing the page.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => this.setState({ hasError: false })}
                                className="px-6 py-3 bg-purple-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-purple-800 transition-colors duration-300"
                            >
                                Try Again
                            </button>
                            <Link
                                href="/portfolio"
                                className="px-6 py-3 bg-[#D4AF37] text-[#2A1E2F] rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#C9A430] transition-colors duration-300 no-underline"
                            >
                                Back to Portfolio
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
