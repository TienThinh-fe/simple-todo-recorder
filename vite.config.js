import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // Enable file watching with polling (useful for Windows/WSL)
    watch: {
      usePolling: true,
    },
    // Hot Module Replacement settings
    hmr: {
      overlay: true, // Show errors as overlay
    },
    // Ensure the server is accessible
    host: true,
    port: 5173
  }
})
