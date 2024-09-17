import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { type ConfigEnv, defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, import.meta.dirname)

  return {
    base: env.BASE_URL,

    mode,

    plugins: [
      vue(),
      vueJsx(),

      Components({
        dts: 'src/types/components.d.ts',
        resolvers: [
          PrimeVueResolver(),
        ],
      }),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      cors: {
        origin: env.PROD ? false : ['*'],
      },
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT) || undefined,
    },
  }
})

