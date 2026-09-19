import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
    // Agent worktrees. Each one is a full checkout of this repository with
    // its own .next/ build output, and the `.next/**` pattern above only
    // matches at the root — so a bare `npm run lint` was linting several
    // copies of the project plus their generated bundles and reporting
    // ~15,000 problems. Scoped to this checkout's source the real count is
    // 21, which is why every instruction said to run
    // `npx eslint src e2e scripts` instead. Now the plain command means what
    // everyone already thought it meant.
    //
    // Ignoring them is not pruning them: whether a finished worktree stays on
    // disk is the repository owner's call, and lint should not be the thing
    // that forces it.
    ".claude/**",
  ]),
]);

export default eslintConfig;
