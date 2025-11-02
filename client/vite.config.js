import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   // base: '/muebleria-hermanos-jota/',
//   base: '/',
// })
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'https://muebleria-hermanos-jota-mry8.onrender.com', // ← tu backend (puerto del servidor Node/Express)
        changeOrigin: true,
        secure: false,
      },
    },
  },
});