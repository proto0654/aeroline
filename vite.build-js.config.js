import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'assets/js/main.js'),
      name: 'app',
      formats: ['iife'],
      fileName: () => 'assets/js/bundle.js'
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.css$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].[ext]`;
          }
          return `assets/[ext]/[name].[ext]`;
        }
      }
    }
  }
}); 