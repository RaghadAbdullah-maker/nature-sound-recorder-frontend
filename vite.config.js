import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': '/src', 
    },
  },
});
