import React from 'react';
import Image from 'next/image';

export default function PhoneMockup({ imageUrl, altText }) {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '300px',
            margin: '0 auto',
            padding: '12px',
            background: '#2D2926',
            borderRadius: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.1)'
        }}>
            {/* Top Notch/Dynamic Island */}
            <div style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '35%',
                height: '24px',
                background: '#1A1817',
                borderRadius: '20px',
                zIndex: 10
            }} />

            {/* Screen Container */}
            <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '9/19.5',
                overflow: 'hidden',
                borderRadius: '30px',
                background: '#EAE6DF'
            }}>
                <Image
                    src={imageUrl}
                    alt={altText || 'Project Preview'}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 300px"
                />
            </div>

            {/* Bottom Indicator */}
            <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '30%',
                height: '4px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '10px'
            }} />
        </div>
    );
}
