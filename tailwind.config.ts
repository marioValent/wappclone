import type { Config } from "tailwindcss";

const config: Config = {
    mode: "jit",
    safelist: [
        { pattern: /^btn-/, variants: ["hover", "focus"] },
        "self-end",
        "self-start",
    ],
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
                "green-msg": "#d9fdd3",
                "main-gray": "#f0f2f5",
                "dark-gray": "#8696a0",
                "app-gray": "#eae6df",
                "app-gray-deeper": "#d1d7db",
                "gray-char": "#667781",
                "main-green-hover": "#017561",
                "chat-panel": "#efeae2",
                "blue-link": "#027eb5",
                "msg-select-hover": "rgba(0,128,105,0.08)",
                "meta-msg": "#d1f4cc",
            },
            filter: {
                "color-white": "brightness(0) invert(1)",
            },
        },
    },
};
export default config;
