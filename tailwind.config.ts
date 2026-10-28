import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'neo': '6px 6px 0px #000000',
        'neo-sm': '4px 4px 0px #000000',
        'neo-lg': '8px 8px 0px #000000',
        'neo-active': '2px 2px 0px #000000',
      },
      colors: {
        comic: {
          yellow: '#FFE600',
          pink: '#FF3366',
          cyan: '#00E5FF',
          purple: '#9933FF',
          dark: '#111111',
          bg: '#FAFAFA',
          panel: '#FFFFFF',
          green: '#00FF66',
          orange: '#FF6600',
        },
      },
      fontFamily: {
        heading: ['var(--font-bebas-neue)', 'Impact', 'sans-serif'],
        comic: ['var(--font-bebas-neue)', 'Impact', 'sans-serif'],
        nav: ['var(--font-space-grotesk)', 'sans-serif'],
        btn: ['var(--font-space-grotesk)', 'sans-serif'],
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        comic: '0.05em',
      },
    },
  },
  plugins: [],
};

export default config;
