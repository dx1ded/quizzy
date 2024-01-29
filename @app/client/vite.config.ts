// @ts-nocheck
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"
import eslintPlugin from "vite-plugin-eslint"

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    eslintPlugin({
      include: ["./src/**/*.ts", "./src/**/*.tsx"]
    })
  ],
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc"
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: false,
        secure: false
      }
    }
  },
})
