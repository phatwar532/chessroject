import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--ivory)",
        primary: "var(--cobalt)",
        secondary: "var(--gold)",
        text: "var(--charcoal)",
        divider: "var(--platinum)",
        card: "var(--white)",
        muted: "var(--muted)",
        offwhite: "var(--cream)",
        navy: "var(--navy)",
        gold: "var(--gold)"
      },
      fontFamily: {
        hero: ['var(--font-cormorant)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        label: ['var(--font-dm-sans)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        quote: ['var(--font-cormorant)', 'serif'],
        nav: ['var(--font-dm-sans)', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        }
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'scroll-line': 'scrollLine 1.5s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
