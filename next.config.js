/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["storage.googleapis.com", "coinpayments.net"],
        minimumCacheTTL: 1500000,
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.node/,
            use: "raw-loader",
        });

        if (isServer) {
            config.externals.push("ws");
        }
        return config;
    },
};

module.exports = nextConfig;
