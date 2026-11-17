/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Japanese-Inspired Green Palette from UI Style Direction
        kopkar: {
          'deep-forest': '#1F5B45',
          'jade': '#2F6F56',
          'moss': '#4F8A67',
          'sage': '#A9C3A2',
          'ivory': '#F3ECDD',
          'ivory-light': '#F8F4EC',
          // Aliases for convenience
          emerald: '#1F5B45',
          'emerald-dark': '#174736',
          'emerald-light': '#2F6F56',
          pine: '#1F5B45',
          accent: '#4F8A67',
          mint: '#EAF4EE',
          gold: '#F6CE2C',
          'gold-hover': '#E5A812',
          'gold-light': '#FEF6DC',
        },
        washi: {
          canvas: '#F3ECDD',
          cream: '#F8F4EC',
          border: '#DED5C3',
        },
        sumi: {
          black: '#1A2421',
          dark: '#24332F',
          muted: '#5C6F67',
          light: '#8FA39A',
        },
      },
      fontFamily: {
        heading: ['"Okashi"', 'sans-serif'],
        display: ['"Okashi"', 'sans-serif'],
        geist: ['"Geist"', 'sans-serif'],
        sans: ['"Geist"', 'sans-serif'],
        body: ['"Geist"', 'sans-serif'],
        accent: ['"Yatra One"', 'sans-serif'],
        kanji: ['"Zen Old Mincho"', 'serif'],
        serif: ['"Zen Old Mincho"', 'serif'],
      },
      borderRadius: {
        '2.5xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'bento': '0 2px 12px -2px rgba(31, 91, 69, 0.08), 0 1px 4px -1px rgba(31, 91, 69, 0.04)',
        'bento-hover': '0 8px 24px -4px rgba(31, 91, 69, 0.14), 0 3px 8px -2px rgba(31, 91, 69, 0.08)',
        'dock': '0 -4px 20px -2px rgba(23, 71, 54, 0.25)',
        'pill': '0 2px 8px -1px rgba(31, 91, 69, 0.15)',
      },
    },
  },
  plugins: [],
};
