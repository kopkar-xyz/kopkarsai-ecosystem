/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#650f26',
          container: '#83273b',
        },
        sakura: {
          50: '#FFF8F9',
          100: '#FDF0F3',
          200: '#FCE4E9',
          300: '#F7BAC7',
          400: '#F092A8',
          500: '#ED7691',
          600: '#DC4C70',
          700: '#BC3455',
          800: '#9E2A40',
          900: '#83273B',
          950: '#5E1526',
        },
        crimson: {
          DEFAULT: '#83273B',
          deep: '#5E1526',
          dark: '#4B101E',
        },
        washi: {
          canvas: '#FAF6F0',
          cream: '#F7F2E7',
          white: '#FFFFFF',
          border: '#EAE3D5',
        },
        sumi: {
          black: '#1A1615',
          dark: '#2B2627',
          muted: '#665E60',
          light: '#9E9496',
        },
        kyoto: {
          gold: '#E5A812',
          'amber-light': '#FEF6DC',
          matcha: '#2E6B4F',
          indigo: '#1E3A5F',
        },
        origami: {
          gold: '#F6CE2C',
          'gold-light': '#FFD967',
        },
        surface: {
          DEFAULT: '#fdf9f3',
          container: '#f1ede7',
          'container-low': '#f7f3ed',
          variant: '#e6e2dc',
        },
      },
      fontFamily: {
        heading: ['"Okashi"', 'cursive', 'sans-serif'],
        display: ['"Okashi"', 'cursive', 'sans-serif'],
        brush: ['"Okashi"', 'cursive', 'sans-serif'],
        geist: ['"Geist"', 'sans-serif'],
        sans: ['"Geist"', 'sans-serif'],
        body: ['"Geist"', 'sans-serif'],
        kanji: ['"Zen Old Mincho"', 'serif'],
        serif: ['"Zen Old Mincho"', 'serif'],
      },
      borderRadius: {
        '2.5xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'sakura-soft': '0 4px 20px -2px rgba(131, 39, 59, 0.12)',
        'sakura-card': '0 4px 16px -2px rgba(131, 39, 59, 0.08), 0 2px 6px -1px rgba(94, 21, 38, 0.04)',
        'bento': '0 2px 12px -2px rgba(131, 39, 59, 0.08), 0 1px 4px -1px rgba(131, 39, 59, 0.04)',
        'bento-hover': '0 10px 28px -4px rgba(131, 39, 59, 0.16), 0 4px 10px -2px rgba(131, 39, 59, 0.08)',
        'drawer': '0 -10px 30px -5px rgba(94, 21, 38, 0.25)',
      },
    },
  },
  plugins: [],
};
