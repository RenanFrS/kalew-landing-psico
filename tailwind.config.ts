import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Earthy warm palette
          clay:     '#8B5E3C',   // warm clay brown – primary accent
          sand:     '#C9A97A',   // soft sand – secondary accent
          linen:    '#F2EAD8',   // warm linen – main bg
          parchment:'#E8DCC5',  // parchment – card bg
          umber:    '#4A3728',   // deep umber – headings
          soil:     '#2E1E12',   // dark soil – body text
          moss:     '#6B7C5A',   // muted moss green – subtle accent
          fog:      '#B5A89A',   // warm fog – muted text
          cream:    '#FAF6EF',   // near-white cream
        },
      },
      fontFamily: {
        serif:   ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:    ['var(--font-jost)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '44': '11rem',
        '52': '13rem',
        '60': '15rem',
      },
      animation: {
        'fade-up':     'fadeUp 0.8s ease forwards',
        'fade-in':     'fadeIn 1s ease forwards',
        'line-grow':   'lineGrow 1.2s ease forwards',
        'drift':       'drift 8s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        lineGrow: {
          from: { transform: 'scaleX(0)' },
          to:   { transform: 'scaleX(1)' },
        },
        drift: {
          from: { transform: 'translateY(0px) rotate(0deg)' },
          to:   { transform: 'translateY(-20px) rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
