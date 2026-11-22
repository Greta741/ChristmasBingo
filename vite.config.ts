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
        manifest: false,
        workbox: {
          globPatterns: [
            '**/*.{js,css,html,svg,png,ico,woff,woff2,webmanifest}',
          ],
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
