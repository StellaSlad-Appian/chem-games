// src/i18n/teachers-boundary.test.ts
//
// The For Teachers catalogue is server-only. This file is the gate that keeps
// it that way.
//
// Why it needs a test rather than a comment. `src/i18n/teachers/<locale>.ts`
// holds every sentence on the For Teachers page — about 8 KB of prose per
// locale — and it was moved out of the shared dictionary precisely because
// `src/app/[lang]/layout.tsx` serialises the whole dictionary into the RSC
// payload of every page (docs/i18n/README.md § "The dictionary is a budget,
// and a game will eat it"). The page reads it in a Server Component, so none
// of it travels to a browser.
//
// One `import { teachersCopy } from '@/i18n/teachers'` inside a `'use client'`
// module puts all of it back, in the route's JavaScript chunk this time. It
// compiles. It type-checks. Every other test passes. Nothing about the page
// looks different. The only symptom is a bundle that is 8 KB bigger, which is
// not a symptom anybody notices — and the sign-up form, a client component
// that renders two dozen of those very strings, is exactly the component most
// likely to reach for it.
//
// So: a source scan. It reads the files rather than the module graph, because
// the thing being forbidden is the *import statement*, and an import that a
// bundler would tree-shake is still a dependency this rule is about. It is
// the same style of gate as the one in dictionary.test.ts that asserts the
// `teachers` namespace has not drifted back into the shared dictionary.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const SRC = join(process.cwd(), 'src');

/** Every .ts/.tsx file under src/, tests included. */
function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

/** A module is a client module if its first non-comment, non-blank line says so. */
function isClientModule(source: string): boolean {
  for (const line of source.split('\n')) {
    const trimmed = line.trim();
    if (trimmed === '' || trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
      continue;
    }
    return /^['"]use client['"];?$/.test(trimmed);
  }
  return false;
}

/**
 * Matches an import or a re-export of the catalogue by any of the paths that
 * reach it: the loader, a locale file, the directory, and the relative forms
 * of each. `import type` counts as a hit too — a type-only import is erased,
 * but writing one is the first half of writing the value import by mistake,
 * and the component has `CollaboratorFormCopy` so that it never needs either.
 */
const CATALOGUE_IMPORT =
  /(?:from|import)\s*\(?\s*['"](?:@\/i18n\/teachers(?:\/[a-z-]+)?|(?:\.{1,2}\/)+(?:i18n\/)?teachers(?:\/[a-z-]+)?)['"]/;

const files = sourceFiles(SRC);

describe('the For Teachers catalogue stays server-only', () => {
  it('finds the source tree at all', () => {
    // Without this, a bad path turns every assertion below into a vacuous
    // pass — the failure mode of every test that scans a directory.
    expect(files.length).toBeGreaterThan(100);
    expect(files.some((path) => path.endsWith(join('i18n', 'teachers.ts')))).toBe(true);
  });

  it('recognises a client module, and does not mistake a server one for it', () => {
    expect(isClientModule("'use client';\n\nexport function A() {}\n")).toBe(true);
    expect(isClientModule('// a comment\n\n"use client";\n')).toBe(true);
    expect(isClientModule("import { x } from 'y';\n'use client';\n")).toBe(false);
    expect(isClientModule('export const a = 1;\n')).toBe(false);
  });

  it('recognises the import forms that reach the catalogue', () => {
    for (const line of [
      "import { teachersCopy } from '@/i18n/teachers';",
      "import { en } from '@/i18n/teachers/en';",
      "import type { TeachersCopy } from '@/i18n/teachers';",
      "import { ru } from '../i18n/teachers/ru';",
      "import { de } from './teachers/de';",
      "export { en } from '@/i18n/teachers/en';",
      "const c = await import('@/i18n/teachers');",
    ]) {
      expect(CATALOGUE_IMPORT.test(line), line).toBe(true);
    }
    // Not a false positive on the page, the docs or an unrelated word.
    for (const line of [
      "import { getDictionary } from '@/i18n/dictionaries';",
      "import { CollaboratorForm } from '@/components/teachers/CollaboratorForm';",
      "// see src/i18n/teachers/en.ts",
    ]) {
      expect(CATALOGUE_IMPORT.test(line), line).toBe(false);
    }
  });

  it('is not imported from any client module', () => {
    const offenders = files.filter((path) => {
      const source = readFileSync(path, 'utf8');
      return isClientModule(source) && CATALOGUE_IMPORT.test(source);
    });

    expect(
      offenders.map((path) => path.slice(SRC.length + 1).split('\\').join('/'))
    ).toEqual([]);
  });

  it('is not imported by the sign-up form, which is the one most tempted to', () => {
    // Named on its own so the failure says what to do instead: take the
    // strings as props, the way the page already passes them.
    const form = readFileSync(
      join(SRC, 'components', 'teachers', 'CollaboratorForm.tsx'),
      'utf8'
    );
    expect(isClientModule(form)).toBe(true);
    expect(CATALOGUE_IMPORT.test(form)).toBe(false);
  });

  it('is not imported by the shared dictionary either, which would undo the split', () => {
    // The dictionary *is* shipped to every page, so importing the catalogue
    // from it would put the prose back on every route by a different door.
    for (const locale of ['en', 'de', 'fr', 'es', 'it', 'ru']) {
      const source = readFileSync(join(SRC, 'i18n', 'dictionaries', `${locale}.ts`), 'utf8');
      expect(CATALOGUE_IMPORT.test(source), locale).toBe(false);
    }
  });
});
