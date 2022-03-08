/* eslint-env node */

import { chrome } from '../../.electron-vendors.cache.json'
import { join } from 'path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import { loadAndSetEnv } from '../../scripts/loadAndSetEnv.mjs'

const PACKAGE_ROOT = __dirname

loadAndSetEnv(process.env.MODE, process.cwd())

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  /*mode: process.env.MODE,*/
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '/@/': join(PACKAGE_ROOT, 'src') + '/'
    }
  },
  plugins: [],
  base: '',
  server: {
    fs: {
      strict: true
    }
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
      external: [
        ...builtinModules
          .filter(m => m !== 'process' && m !== 'assert')
          .flatMap(m => [m, `node:${m}`])
      ]
    },
    emptyOutDir: true,
    brotliSize: false
  },
  test: {
    environment: 'happy-dom'
  },
  define: {
    global: {}
  }
})
