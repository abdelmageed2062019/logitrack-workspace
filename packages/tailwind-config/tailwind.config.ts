import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../../apps/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F172A",
          primary: "#2563EB",
          accent: "#F97316",
          success: "#22C55E",
        },
      },
    },
  },
  plugins: [],
};

export default config;
