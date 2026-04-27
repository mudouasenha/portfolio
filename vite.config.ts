import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { boneyardPlugin } from 'boneyard-js/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), boneyardPlugin()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
  },
})
