/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["www.thecocktaildb.com"],
  },
};

module.exports = nextConfig;
