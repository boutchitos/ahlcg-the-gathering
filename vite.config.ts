import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: [{ find: '$gathering', replacement: resolve(__dirname, './src/gathering') }],
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
