/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.ignoreWarnings = [
      (warning) =>
        warning.message.includes("autoprefixer") &&
        warning.message.includes("mixed support"),
    ];
    return config;
  },
};

module.exports = nextConfig;
