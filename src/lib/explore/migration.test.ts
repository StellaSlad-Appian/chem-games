// src/lib/explore/migration.test.ts
//
// AC-11, both halves.
//
// The registry tables are seeded by hand in SQL from the same twenty pairs that
// live in TypeScript. Two copies of a list is two things to keep in step, and
// the one that goes stale is always the one nobody looks at — so this reads the
// migration and compares. It is the same idea as
// src/core-engine/tests/compounds.test.ts: derive the answer from the source of
// truth, and name every mismatch rather than stopping at the first.
//
// The second half is the claim that the page renders identically with Supabase
// unconfigured. That is true because nothing under the Explore route imports a
// client at all, which is a thing a test can check by reading the files.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { EXPLORE_MOLECULES } from './molecules';
import { EXPLORE_SCIENTISTS } from './scientists';
import { EXPLORE_SCHEDULE } from './schedule';

const ROOT = process.cwd();
const MIGRATION = join(ROOT, 'supabase/migrations/20260919_create_explore.sql');
const sql = readFileSync(MIGRATION, 'utf8');

/**
 * The migration with its `--` comments stripped.
 *
 * Needed by exactly one assertion below, and the distinction is the point: the
 * comments talk about `represents` at length, explaining why there is no such
 * column. Matching against the raw file would fail on the explanation for the
 * very decision it is checking.
 */
const executableSql = sql
  .split('\n')
  .filter((line) => !line.trimStart().startsWith('--'))
  .join('\n');

/** The first column of every row in the `values (...)` block after `marker`. */
function seededSlugs(marker: string): string[] {
  const start = sql.indexOf(marker);
  expect(start, `migration is missing: ${marker}`).toBeGreaterThan(-1);
  const block = sql.slice(start, sql.indexOf('on conflict', start));
  return [...block.matchAll(/^\s*\(\s*'([a-z0-9-]+)'/gm)].map((match) => match[1]);
}

describe('the migration seeds what the code actually ships', () => {
  it('lists every molecule, and no molecule that does not exist', () => {
    expect(seededSlugs('insert into public.explore_molecules').sort()).toEqual(
      EXPLORE_MOLECULES.map((molecule) => molecule.id).sort()
    );
  });

  it('lists every scientist, and no scientist that does not exist', () => {
    expect(seededSlugs('insert into public.explore_scientists').sort()).toEqual(
      EXPLORE_SCIENTISTS.map((scientist) => scientist.id).sort()
    );
  });

  it('seeds the schedule in the same order as EXPLORE_SCHEDULE', () => {
    const start = sql.indexOf('insert into public.explore_schedule');
    const block = sql.slice(start, sql.indexOf('on conflict', start));
    const rows = [...block.matchAll(/\(\s*(\d+),\s*'([a-z0-9-]+)',\s*'([a-z0-9-]+)'\s*\)/g)].map(
      (match) => ({
        weekIndex: Number(match[1]),
        moleculeId: match[2],
        scientistId: match[3],
      })
    );

    expect(rows).toEqual(
      EXPLORE_SCHEDULE.map((pair, index) => ({
        weekIndex: index,
        moleculeId: pair.moleculeId,
        scientistId: pair.scientistId,
      }))
    );
  });

  it('carries the same compound registry ids the entries do', () => {
    const start = sql.indexOf('insert into public.explore_molecules');
    const block = sql.slice(start, sql.indexOf('on conflict', start));
    const seeded = new Map(
      [...block.matchAll(/\(\s*'([a-z0-9-]+)',\s*(null|'(\d+)')/g)].map((match) => [
        match[1],
        match[3] ?? undefined,
      ])
    );

    const mismatches = EXPLORE_MOLECULES.filter(
      (molecule) => seeded.get(molecule.id) !== molecule.compoundId
    ).map((molecule) => `${molecule.id}: sql ${seeded.get(molecule.id)} !== ts ${molecule.compoundId}`);

    expect(mismatches).toEqual([]);
  });

  it('does not record `represents` anywhere in the database', () => {
    // Deliberate. It is scheduling metadata, the invariant is asserted over the
    // ordered list in schedule.test.ts, and a column recording the gender of
    // real people is not a thing to create because it might be handy later.
    expect(executableSql).not.toMatch(/represents/i);
    expect(executableSql).not.toMatch(/\b(gender|woman|man)\b/i);
  });

  it('turns RLS on for every table it creates, with no client writes', () => {
    const created = [...sql.matchAll(/create table if not exists (public\.\w+)/g)].map(
      (match) => match[1]
    );
    expect(created.length).toBeGreaterThan(0);

    for (const table of created) {
      expect(sql, `${table} has no RLS`).toContain(`alter table ${table} enable row level security`);
    }
    // Only `for select` policies: nothing here is writable from a client.
    const policies = [...sql.matchAll(/create policy [^\n]*\n\s*on public\.\w+ for (\w+)/g)].map(
      (match) => match[1]
    );
    expect(policies.length).toBeGreaterThan(0);
    expect([...new Set(policies)]).toEqual(['select']);
  });

  it('is idempotent, so re-running it is safe', () => {
    const inserts = sql.match(/insert into/g) ?? [];
    const conflicts = sql.match(/on conflict/g) ?? [];
    expect(conflicts.length).toBe(inserts.length);
  });

  it('is a new file rather than an edit to an existing migration', () => {
    // Cheap, but it is the rule most easily broken by a merge.
    const migrations = readdirSync(join(ROOT, 'supabase/migrations'));
    expect(migrations).toContain('20260919_create_explore.sql');
  });
});

describe('the page renders with Supabase unconfigured', () => {
  const sources = [
    // All three tab pages and the layout above them, not just the one page
    // there used to be. The layout earns its place on the list: it reads
    // `getExploreContent` for the tab strip's two entry names, which makes it
    // the newest place a database import could plausibly be reached for.
    'src/app/[lang]/(main)/explore/(tabs)/layout.tsx',
    'src/app/[lang]/(main)/explore/(tabs)/page.tsx',
    'src/app/[lang]/(main)/explore/(tabs)/scientist/page.tsx',
    'src/app/[lang]/(main)/explore/(tabs)/archive/page.tsx',
    'src/components/explore/ExploreTabs.tsx',
    'src/components/explore/MoleculeCard.tsx',
    'src/components/explore/ScientistCard.tsx',
    'src/components/explore/InwardLink.tsx',
    'src/components/explore/SourceList.tsx',
    'src/i18n/explore.ts',
    'src/lib/explore/molecules.ts',
    'src/lib/explore/scientists.ts',
    'src/lib/explore/schedule.ts',
    'src/lib/explore/rotation.ts',
  ];

  it.each(sources)('%s imports no Supabase client and no database helper', (relative) => {
    const source = readFileSync(join(ROOT, relative), 'utf8');
    // Comments mention Supabase on purpose — the point is that nothing is
    // *imported*, so only import statements are checked.
    const imports = [...source.matchAll(/^\s*import[\s\S]*?from\s+'([^']+)';/gm)].map(
      (match) => match[1]
    );

    const database = imports.filter(
      (specifier) =>
        specifier.includes('supabase') ||
        specifier.includes('dashboard-data') ||
        specifier.includes('lib/actions')
    );
    expect(database).toEqual([]);
  });
});
