import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFFBF5",
        ink: "#22201B",
        saffron: {
          DEFAULT: "#F68B1F",
          deep: "#D9720A",
          light: "#FDECD3",
        },
        leaf: {
          DEFAULT: "#3F7D4C",
          light: "#E7F1E8",
        },
        stone: {
          DEFAULT: "#F0EDE6",
          dark: "#6B6558",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(34, 32, 27, 0.08)",
        softer: "0 2px 10px -2px rgba(34, 32, 27, 0.06)",
        lifted: "0 12px 32px -8px rgba(34, 32, 27, 0.16)",
      },
      keyframes: {
        drip: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(4px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        drip: "drip 2.4s ease-in-out infinite",
        fadeUp: "fadeUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
