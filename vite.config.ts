import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Deploy di root domain (Netlify): aset di /assets/...
  base: '/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
  },
})
