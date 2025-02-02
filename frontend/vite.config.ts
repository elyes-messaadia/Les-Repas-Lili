import { defineConfig } from 'npm:vite@^5.0.0';
import react from 'npm:@vitejs/plugin-react-swc@^3.3.2';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
}); 