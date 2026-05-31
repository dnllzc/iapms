import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:30093',
        changeOrigin: true,
      },
    },
    host: '0.0.0.0',
    allowedHosts: 'all',
    port: 30092,
  },
})
