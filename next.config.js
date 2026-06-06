/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "ts", "jsx", "js", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
