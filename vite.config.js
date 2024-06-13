import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // host
    port: 9400, // port
	
	headers: {
      'Access-Control-Allow-Origin': 'http://morist.mywire.org',
    },
	
    /*proxy: {
      '/api': {
        target: 'http://morist.mywire.org:3000',
        changeOrigin: true,
        rewrite: (path) => {
          console.log('Rewriting path:', path); // Log the path before rewriting
          return path.replace(/^\/api/, '/api');
        },
        configure: (proxy, options) => {
          console.log('Proxy options:', options); // Log the proxy options
        }
      },
    },*/
  },
})
