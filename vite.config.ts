import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    coverage: {
      all: true,
      exclude: ['**/*.d.ts', '**/*.server.ts'],
      extension: ['.js', '.cjs', '.mjs', '.ts'],
      include: ['src/**'],
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
