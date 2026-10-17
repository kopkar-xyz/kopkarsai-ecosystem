/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kopkar: {
          primary: "#0F5132",
          "primary-dark": "#0B3D25",
          "primary-light": "#198754",
          gold: "#F5B324",
          "gold-hover": "#E5A417",
          "gold-light": "#FEF3C7",
          mint: "#EAF6EE",
          "mint-light": "#F0FDF4",
          cream: "#FEF9E7",
          "cream-light": "#FFFDF5",
          dock: "#0B2E1E",
          "dock-active": "#134B32",
          bg: "#F8FAF9",
          dark: "#0B2E1E",
          muted: "#4A5568",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2.5xl': '22px',
        '3xl': '26px',
        '3.5xl': '30px',
        '4xl': '36px',
      },
      boxShadow: {
        'bento': '0 4px 20px -2px rgba(11, 46, 30, 0.06), 0 2px 6px -1px rgba(11, 46, 30, 0.04)',
        'bento-hover': '0 10px 30px -4px rgba(11, 46, 30, 0.12), 0 4px 10px -2px rgba(11, 46, 30, 0.06)',
        'dock': '0 12px 40px -6px rgba(11, 46, 30, 0.35)',
        'card-gold': '0 8px 24px -4px rgba(245, 179, 36, 0.25)',
      },
      keyframes: {
        'scale-up': {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'scale-up': 'scale-up 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
