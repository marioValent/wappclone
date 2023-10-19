import type { Config } from "tailwindcss";

const config: Config = {
    mode: "jit",
    safelist: [{ pattern: /^btn-/, variants: ["hover", "focus"] }],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "main-green": "#00a884",
                "dark-green": "#008069",
                "main-gray": "#f0f2f5",
                "app-gray": "#eae6df",
                "app-gray-deeper": "#d1d7db",
                "main-green-hover": "#017561",
                "chat-panel": "#efeae2",
            },
            filter: {
                "color-white": "brightness(0) invert(1)",
            },
        },
    },
};
export default config;
