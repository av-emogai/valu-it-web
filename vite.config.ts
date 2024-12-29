import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from "vite-plugin-compression";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),compression(),
    inject({
      $: "jquery", // Inject jQuery as $
      jQuery: "jquery", // Inject jQuery as jQuery
    }),
  ],
  //change port for production
  preview: {
    port: 3001,
  },
// for dev
  server: {
    port: 3120,
  },
})
