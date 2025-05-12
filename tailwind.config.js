/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
      },
      colors: {
        'pink-primary': '#E5989B',
        'pink-secondary': '#F7C9C0',
        'pink-dark': '#B5838D',
      }
    },
  },
  plugins: [],
}