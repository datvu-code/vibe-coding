import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    hmr: {
      overlay: true
    }
  },
  build: {
    outDir: 'dist'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'antd', 'recharts']
    }
})

