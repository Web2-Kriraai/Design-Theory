/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        unoptimized: true,
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
