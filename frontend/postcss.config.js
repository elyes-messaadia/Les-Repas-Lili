export default {
  plugins: [
    {
      postcssPlugin: 'tailwindcss',
      Once(root, { result }) {
        // Tailwind sera géré par l'import direct dans le CSS
      },
    },
    {
      postcssPlugin: 'autoprefixer',
      Once(root, { result }) {
        // Configuration minimale pour autoprefixer
      },
    },
  ],
} 