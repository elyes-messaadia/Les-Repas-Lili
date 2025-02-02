/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lili': {
          'green': '#2F6B39', // Vert principal
          'gold': '#C5A572', // Or/Ocre
          'light-green': '#4A8B55', // Version plus claire du vert
          'dark-green': '#1E4A26', // Version plus foncée du vert
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'handwriting': ['Dancing Script', 'cursive'],
      },
      spacing: {
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem',
      }
    },
  },
  plugins: [],
} 