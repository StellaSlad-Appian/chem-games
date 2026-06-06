import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. Defining a Palette: Use these instead of raw colors
      colors: {
        game: {
          acid: "#ef4444",    // Red
          base: "#3b82f6",    // Blue
          neutral: "#10b981", // Emerald
          amphoteric: "#8b5cf6", // Purple
          bg: "#f8fafc",      // Slate 50
          dark: "#09090b",    // Zinc 950
        },
      },
      // 2. Defining Sizes: Use these for consistent sizing
      fontSize: {
        'molecule-display': ['4rem', { lineHeight: '1', fontWeight: '900' }],
      },
      // 3. Custom Animations for that "Game Juice"
      animation: {
        'shake': 'shake 0.4s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px) rotate(-1deg)' },
          '40%, 80%': { transform: 'translateX(8px) rotate(1deg)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;