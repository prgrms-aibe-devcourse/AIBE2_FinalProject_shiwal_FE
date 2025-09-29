import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 메인(index.html)은 팀 UI 그대로 사용하고,
// 개발용(dev.html)만 별도 엔트리로 추가.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/admin': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin/, ''),
      },
    },
  },
  resolve: { alias: { '@': '/src' } },
  build: {
    sourcemap: true,
    rollupOptions: {
      // 상대 경로로 충분합니다 (node:url, __dirname 불필요)
      input: {
        main: 'index.html',
        dev:  'dev.html',
      },
    },
  },
  preview: { port: 4173 },
})