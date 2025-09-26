
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ⚡ configuración de Vite
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      // Proxy para redirigir peticiones API al backend en FastAPI
      '/api': 'http://localhost:8000'
    }
  }
})
