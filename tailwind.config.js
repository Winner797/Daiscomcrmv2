/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#ff6b35',
        'primary-orange-hover': '#e55a2b',
        'primary-orange-light': '#fff3f0',
      },
    },
  },
  plugins: [],
}
