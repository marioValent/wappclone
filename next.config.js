/** @type {import('next').NextConfig} */
const nextConfig = {
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
