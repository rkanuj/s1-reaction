import { defineConfig } from 'vite';

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  build: {
    lib: {
      entry: '/src/main.ts',
      name: 'shared',
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
