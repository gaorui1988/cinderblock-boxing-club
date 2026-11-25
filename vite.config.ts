import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 4731,
    host: '0.0.0.0',
    strictPort: true,
  },
  preview: {
    port: 4731,
    host: '0.0.0.0',
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        timetable: resolve(__dirname, 'timetable.html'),
      },
    },
  },
})
