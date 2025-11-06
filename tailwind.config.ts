// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        // A subtle "breathing" glow animation
        'background-glow': 'backgroundGlow 8s infinite alternate ease-in-out',
      },
      keyframes: {
        backgroundGlow: {
          '0%': { opacity: '0.1' },
          '100%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
};
export default config;