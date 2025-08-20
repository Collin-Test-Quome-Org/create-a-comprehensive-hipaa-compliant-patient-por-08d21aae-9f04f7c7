import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, HmrContext } from "vite"

const HotReloadImages = () => ({
  name: 'hot-reload-images',
  handleHotUpdate({file, server}: HmrContext) {
      if (file.endsWith('.png') || file.endsWith('.svg') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
          server.ws.send({
              type: 'full-reload',
              path: '*'
          });
      }
  },
})

export default defineConfig({
  server: {
    allowedHosts: true, // Enables access from any host
    hmr: {
      overlay: false
    }
  },
  plugins: [react(), HotReloadImages()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
