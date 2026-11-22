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
          name: 'Kalėdinis bingo',
          short_name: 'Bingo',
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
              src: 'icons/icon-transparent-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'icons/icon-transparent-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
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
