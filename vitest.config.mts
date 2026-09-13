import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// Unit + component tests. Run with `npm test` (single pass) or
// `npm run test:watch`. End-to-end tests live in ./e2e and use Playwright.
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    environmentOptions: { jsdom: { pretendToBeVisual: true } },
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules/**', 'e2e/**', '.next/**'],
    css: false,
    restoreMocks: true,
    reporters: process.env.CI ? ['default', 'junit'] : ['default'],
    outputFile: { junit: 'test-results/vitest-junit.xml' },
  },
});
