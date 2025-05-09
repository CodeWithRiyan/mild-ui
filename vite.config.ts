import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4000,
    open: true,
  },
  resolve: {
    alias: {
      '@mild-ui/core': resolve(__dirname, 'packages/core/src'),
      '@mild-ui/react': resolve(__dirname, 'packages/react/src'),
      '@mild-ui/vue': resolve(__dirname, 'packages/vue/src'),
      '@mild-ui/tailwind-preset': resolve(__dirname, 'packages/tailwind-preset/src'),
    },
  },
});