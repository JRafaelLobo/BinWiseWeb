import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      // El backend NestJS expone sus rutas bajo /api (ej. /api/auth/login).
      // Reenviamos esas peticiones al backend para evitar problemas de CORS.
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
