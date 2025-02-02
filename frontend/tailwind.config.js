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
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#1a1e21',
          950: '#0d0f10',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
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
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 