// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/create-pdf': 'http://localhost:5000',
      '/fetch-pdf': 'http://localhost:5000',
    }
  }
})