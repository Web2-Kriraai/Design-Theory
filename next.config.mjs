/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    // Allow larger file uploads in API routes (prevents 413 "Request Entity Too Large")
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
    async redirects() {
        return [
            {
                source: '/login',
                destination: '/admin/login',
                permanent: true,
            },
            {
                source: '/signup',
                destination: '/admin/signup',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
