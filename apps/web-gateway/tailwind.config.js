/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#065C2B",
          "green-deep": "#043D1D",
          "green-dark": "#032813",
          "green-surface": "#094824",
          "green-card": "#0A4E27",
          "yellow": "#F6CE2C",
          "yellow-light": "#FFD967",
          "yellow-deep": "#E5A812",
          "cream": "#F7F9F4",
          "cream-light": "#FCFDFB",
          "text-light": "#FFFFFF",
          "text-muted": "#BEDACC",
          "text-dim": "#86AB98",
        },
        sakura: {
          50: "#FFF8F9",
          100: "#FDF0F3",
          200: "#FCE4E9",
          300: "#F9CBD5",
          400: "#F5A3B5",
          500: "#ED7691",
          600: "#DC4C70",
          700: "#BC3455",
          800: "#9E2A40",
          900: "#83273B",
        },
        kopkar: {
          emerald: "#065C2B",
          "emerald-dark": "#0B4A25",
          "emerald-light": "#0E7A3D",
          "emerald-surface": "#EEF7F1",
          "blush": "#FFF2F4",
          "peach": "#FFF6EE",
        },
      },
      fontFamily: {
        heading: ['"Okashi"', 'sans-serif'],
        display: ['"Okashi"', 'sans-serif'],
        sans: ['"M PLUS Rounded 1c"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['"M PLUS Rounded 1c"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        kanji: ['"Zen Old Mincho"', 'serif'],
        serif: ['"Zen Old Mincho"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gateway-card': '0 20px 40px -15px rgba(3, 40, 19, 0.4), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
        'gateway-card-hover': '0 30px 60px -12px rgba(3, 40, 19, 0.55), 0 0 0 1px rgba(246, 206, 44, 0.25)',
        'gateway-gold': '0 12px 30px -8px rgba(246, 206, 44, 0.3)',
        'sakura-soft': '0 15px 35px -10px rgba(244, 114, 182, 0.12), 0 0 0 1px rgba(252, 228, 233, 0.6)',
        'sakura-hover': '0 25px 45px -12px rgba(244, 114, 182, 0.2), 0 0 0 1px rgba(244, 114, 182, 0.4)',
      },
    },
  },
  plugins: [],
};
