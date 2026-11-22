import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const base = `${(env.VITE_BASE_PATH || '/').replace(/\/$/, '')}/`

  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: 'prompt',
        injectRegister: 'script-defer',
        includeManifestIcons: false,
        manifest: {
          id: base,
          name: 'Christmas Bingo',
          short_name: 'Christmas Bingo',
          description:
            'Kalėdinių dekoracijų bingo pasivaikščiojimams su šeima ir draugais.',
          lang: 'lt',
          start_url: base,
          scope: base,
          display: 'standalone',
          theme_color: '#134b38',
          background_color: '#fffaf0',
          categories: ['games', 'entertainment'],
          icons: [
            {
              src: 'icons/icon-green-padded-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'icons/icon-green-padded-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'icons/icon-maskable-green-padded-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: 'icons/icon-maskable-green-padded-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
          navigateFallback: `${base}index.html`,
          cleanupOutdatedCaches: true,
          skipWaiting: false,
          clientsClaim: false,
        },
      }),
    ],
    server: {
      port: 3005,
      strictPort: true,
    },
  }
})
