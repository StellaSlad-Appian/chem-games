import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// Unit + component tests. Run with `npm test` (single pass) or
// `npm run test:watch`. End-to-end tests live in ./e2e and use Playwright.
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    // The game-flow tests play a whole game through under fake timers — the
    // Formula Blaster and Acid Classification victory runs drive every level —
    // and were already close to Vitest's 5s default before this change. Raised
    // rather than split, because the value of those tests is that they cover a
    // full playthrough in one go. Still short enough to catch a genuine hang.
    //
    // Raised again with Share to Fill and the redesigned Reaction Balancer:
    // their playthroughs are longer, and every render now goes through the i18n
    // provider. The two victory runs override this to 60s of their own; this
    // value is the headroom for everything else. If a *new* test needs more
    // than this, split it rather than raising this again.
    testTimeout: 30_000,
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
