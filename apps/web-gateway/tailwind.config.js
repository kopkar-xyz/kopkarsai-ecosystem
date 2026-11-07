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
          yellow: "#F6CE2C",
          "yellow-light": "#FFD967",
          "yellow-deep": "#E5A812",
          cream: "#F7F9F4",
          "cream-light": "#FCFDFB",
          "text-light": "#FFFFFF",
          "text-muted": "#BEDACC",
          "text-dim": "#86AB98",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gateway-card': '0 20px 40px -15px rgba(3, 40, 19, 0.4), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
        'gateway-card-hover': '0 30px 60px -12px rgba(3, 40, 19, 0.55), 0 0 0 1px rgba(246, 206, 44, 0.25)',
        'gateway-gold': '0 12px 30px -8px rgba(246, 206, 44, 0.3)',
      },
    },
  },
  plugins: [],
};
