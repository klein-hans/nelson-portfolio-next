/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'nelson-portfolio-next.vercel.app',
      'fathomless-ridge-86673.herokuapp.com',
      'assets.vercel.com',
      'localhost',
      'http://localhost:1337',
      'res.cloudinary.com',
    ],
    // formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
