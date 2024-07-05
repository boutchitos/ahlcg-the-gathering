import { resolve } from 'node:path';

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: [{ find: '$gathering', replacement: resolve(__dirname, './src/gathering') }],
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    coverage: {
      all: true,
      exclude: ['**/*.d.ts', '**/*.server.ts'],
      include: ['src/**'],
      extension: ['.js', '.cjs', '.mjs', '.ts'],
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
