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
