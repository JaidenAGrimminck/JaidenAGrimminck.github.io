/** @type {import('next').NextConfig} */
const nextConfig = { //hosted on JaidenAGrimminck.github.io so hosted at root
    output: 'export', // This enables static export
    basePath: process.env.NODE_ENV === 'production' ? '' : '', // Adjust for GitHub Pages URL structure
    assetPrefix: process.env.NODE_ENV === 'production' ? '' : '', // Adjust for GitHub Pages URL structure
};

export default nextConfig;
