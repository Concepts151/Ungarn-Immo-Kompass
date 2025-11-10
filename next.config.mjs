import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config options here
   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);

