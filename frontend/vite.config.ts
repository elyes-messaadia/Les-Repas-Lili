import { defineConfig } from 'npm:vite';
import react from 'npm:@vitejs/plugin-react';
import { fromFileUrl, dirname, resolve } from "https://deno.land/std@0.220.1/path/mod.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
}); 