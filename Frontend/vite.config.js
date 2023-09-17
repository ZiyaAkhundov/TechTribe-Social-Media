import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'TechTribe Social Media',
        short_name: 'TechTribe',
        description: 'Social Media',
        theme_color: '#BC15E7',
        background_color: '#fff',
        display:'standalone',
        orientation:'portrait',
        start_url: '/Feeds',
        icons: [
          {
            src: './pwa/img/36x36.png',
            sizes: '36x36',
            type: 'image/png',
          },
          {
            src: './pwa/img/48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: './pwa/img/72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: './pwa/img/96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: './pwa/img/144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: './pwa/img/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['@emoji-mart/data', '@emoji-mart/react']
  },
})

