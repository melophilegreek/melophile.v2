import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `process` is a genuine Node global available at runtime here (Vite config
// files execute under Node), but this project has no `@types/node` installed,
// so `tsc -b` failed with "Cannot find name 'process'" (TS2580). Installing
// @types/node would mean updating package-lock.json too, which isn't
// necessary just for this one line — declaring the small shape we actually
// use satisfies the type-checker without adding a dependency.
declare const process: { env: Record<string, string | undefined> }

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/fixed/',
  plugins: [react()],
})
