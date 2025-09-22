import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // root: 'apps/frontend', // 프로젝트 루트 지정
  server: { // 프록시 설정 추가
    // 이 경우, fetch URL은 http://localhost:8080/auth/signup이 아닌 /auth/signup으로 해야 작동
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
