import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// Raw palette
const palette = {
  green: {
    700: "#2A6254",
    800: "#1E4A3E",
  },
  white: "#F8F9F9",
  sage: {
    300: "#ABC7B9",
  },
  gold: {
    500: "#D8A33B",
  },
  brown: {
    600: "#916248",
  },
  teal: {
    500: "#74B4A4",
  },
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
        text: {
          primary: 'black',
          secondary: 'gray',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addUtilities }) {
      addBase({
        body: {
          backgroundColor: palette.white,
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
