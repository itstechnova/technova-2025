import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navPrimary: "#FFFAF3",
        navSecondary: "#19123C",
        textPrimary: "#19123C",
        textSecondary: "#06402B",
        buttonPrimary:"#CD5769",
        buttonSecondary: "#5B5BA9",
        backgroundSecondary: "rgba(255, 196, 188, 0.2)",
      },
    },
  },
  plugins: [],
} satisfies Config;
