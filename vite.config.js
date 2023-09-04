import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      reporter: ["text", "html"],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
  },
  // server:{
  //   //host: true,
  //   //port:80,
  //   proxy:{
  //     '/api': 'http://18.224.15.179:8080'
  //   }
  // },
  //plugins: [react()],
  /* build: {
    chunkSizeWarningLimit: 1600,
  }, */
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }

})
