import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// Raw palette
const palette = {
  green: {
    700: "#2A6254",
    800: "#1E4A3E",
  },
  white: "#F8F9F9",
  gold: {
    500: "#D8A33B",
  },
  teal: {
    500: "#74B4A4",
  },
};

// Tag colors for specialty badges
const tagColors = {
  sage: { bg: "#E8F0ED", text: "#2A6254" },    
  sky: { bg: "#E3F1F9", text: "#1E6091" },     
  lavender: { bg: "#EDE8F5", text: "#5B4B8A" },
  peach: { bg: "#FBE9E4", text: "#9E4A35" },   
  honey: { bg: "#F9F0DC", text: "#8B6914" },   
  mint: { bg: "#E2F5F0", text: "#1D7A64" },    
  rose: { bg: "#F9E8EC", text: "#A14462" },    
  sand: { bg: "#F5F0E6", text: "#6B5D45" },    
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-lato)", "system-ui", "sans-serif"],
        display: ["var(--font-mollie-glaston)", "cursive"],
      },
      colors: {
        ...palette,
        primary: palette.green[700],
        secondary: palette.teal[500],
        accent: palette.gold[500],
        background: palette.white,
        foreground: palette.green[700],
        tag: tagColors,
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addUtilities }) {
      addBase({
        body: {
          backgroundColor: "#FFFFFF",
          color: palette.green[700],
        },
      });
      addUtilities({
        ".font-display": {
          "font-feature-settings": '"liga" 1, "ss01" 1',
        },
      });
    }),
  ],
};
export default config;
