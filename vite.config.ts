import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Deploy di subpath GitHub Pages: trynvexa.github.io/it-s-me/
  base: '/it-s-me/',
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
