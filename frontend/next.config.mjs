/** @type {import('next').NextConfig} */
// Force re-reload to clear build cache
const nextConfig = {
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
