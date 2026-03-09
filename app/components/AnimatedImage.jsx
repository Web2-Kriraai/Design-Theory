'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function AnimatedImage({ className = '', ...props }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Image
            {...props}
            onLoad={() => setIsLoaded(true)}
            className={`${className} transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-[10px]'
                }`}
        />
    );
}
