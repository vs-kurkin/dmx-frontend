import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

export const DEFAULT_HOST = '0.0.0.0'
export const DEFAULT_PORT = 80

export default defineConfig({

  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: process.env.VITE_HOST || DEFAULT_HOST,
    port: Number(process.env.VITE_PORT) || DEFAULT_PORT,
    cors: {
      origin: process.env.NODE_ENV === 'production' ? false : ['*'],
    },
  },
})
