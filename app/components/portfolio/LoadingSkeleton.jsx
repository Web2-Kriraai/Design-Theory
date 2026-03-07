'use client';

export default function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full mb-16">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col animate-pulse">
                    {/* Image Placeholder */}
                    <div className="relative aspect-[4/3] bg-[#E8E3DB] w-full mb-4" />

                    {/* Text Content Placeholder */}
                    <div className="flex flex-col items-center gap-2">
                        {/* Category */}
                        <div className="h-2 bg-[#E8E3DB] w-16 mb-1" />
                        {/* Title */}
                        <div className="h-5 bg-[#E8E3DB] w-48 mb-2" />
                        {/* Explore Dash */}
                        <div className="flex items-center gap-2">
                            <div className="h-[1px] bg-[#E8E3DB] w-5" />
                            <div className="h-1.5 bg-[#E8E3DB] w-14" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
