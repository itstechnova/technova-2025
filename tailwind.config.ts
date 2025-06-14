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
        navSecondaryHover: "#5B5BA9",
        textPrimary: "#19123C",
        textSecondary: "#06402B",
        buttonPrimary: "#CD5769",
        buttonSecondary: "#5B5BA9",
        buttonTertiary: "#FAC4BD",
        backgroundSecondary: "rgba(255, 196, 188, 0.3)",
        backgroundTertiary: "rgba(105, 96, 175, 0.3)",
        checkMarkGreen: "#AABD9C",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
