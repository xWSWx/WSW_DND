import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


//target: 'http://localhost:3000',//ExpressJs
//target: 'http://localhost:7210',//DotNetCoreApi
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ],
  server: {
      proxy: {
          '/api': {              
              target: 'https://localhost:7210',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
          }
      }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

