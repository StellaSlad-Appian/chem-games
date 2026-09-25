// src/lib/cheat-sheet-diagrams.test.ts
//
// The generated cheat-sheet diagrams, from the page's side.
//
// scripts/cheat-sheet-diagrams.mts checks each drawing as it makes it, but it
// only runs when someone runs it. These run with every `npm test`, and cover
// what the script cannot see: that the colours it names exist in globals.css
// in both themes and still clear their contrast thresholds there, and that the
// data, the generated index and the six locale modules agree about which
// diagrams exist.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CHEAT_SHEETS } from './cheat-sheet-data';
import { getCheatSheetDiagrams } from './cheat-sheet-diagrams';
import { CHEAT_SHEET_DIAGRAMS } from '@/generated/cheat-sheet-diagrams';
import { LOCALES } from '@/i18n/config';

const globalsCss = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8');

/**
 * The custom properties each theme sets, read from every rule whose selector
 * names that theme. The dark theme is also `:root`, so it is the default.
 */
function themeProperties(theme: 'light' | 'dark'): Map<string, string> {
  const properties = new Map<string, string>();
  const withoutComments = globalsCss.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const [, selector, body] of withoutComments.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!selector.includes(`[data-theme='${theme}']`)) continue;
    for (const [, name, value] of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      properties.set(name, value.trim());
    }
  }
  return properties;
}

function resolve(properties: Map<string, string>, value: string): string {
  const reference = /^var\((--[\w-]+)\)$/.exec(value);
  if (!reference) return value;
  const target = properties.get(reference[1]);
  if (!target) throw new Error(`${reference[1]} is not defined`);
  return resolve(properties, target);
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

/** Text tokens need 4.5:1 (WCAG 1.4.3); graphic tokens 3:1 (1.4.11). */
const THRESHOLD: Record<string, number> = {
  '--diagram-ink': 4.5,
  '--diagram-ink-muted': 4.5,
  '--diagram-proton': 4.5,
  '--diagram-electron': 4.5,
  '--diagram-neutron': 3,
  '--diagram-accent': 3,
};

const markupByLocale = Object.fromEntries(
  await Promise.all(
    LOCALES.map(async (locale) => [locale, await getCheatSheetDiagrams(locale)] as const)
  )
);

describe('diagram colour tokens', () => {
  const used = new Set<string>();
  for (const diagrams of Object.values(markupByLocale)) {
    for (const diagram of Object.values(diagrams)) {
      for (const [, token] of diagram.markup.matchAll(/var\((--[\w-]+)\)/g)) used.add(token);
    }
  }

  it('uses only tokens this test holds to a threshold', () => {
    expect(used.size).toBeGreaterThan(0);
    expect([...used].filter((token) => !(token in THRESHOLD))).toEqual([]);
  });

  for (const theme of ['light', 'dark'] as const) {
    it(`meets its threshold against --diagram-bg in the ${theme} theme`, () => {
      const properties = themeProperties(theme);
      // The light block only overrides; anything it leaves out is the default.
      const effective = theme === 'light' ? new Map([...themeProperties('dark'), ...properties]) : properties;
      const background = resolve(effective, effective.get('--diagram-bg') ?? '');
      expect(background).toMatch(/^#[0-9a-f]{6}$/i);

      for (const [token, threshold] of Object.entries(THRESHOLD)) {
        const value = properties.get(token);
        expect(value, `${token} is not set in the ${theme} theme`).toBeDefined();
        const ratio = contrast(resolve(effective, value!), background);
        expect(ratio, `${token} ${value} on ${background}`).toBeGreaterThanOrEqual(threshold);
      }
    });
  }
});

describe('generated diagrams', () => {
  const ids = Object.keys(CHEAT_SHEET_DIAGRAMS);

  it('has every diagram the cheat-sheet data names', () => {
    const named = CHEAT_SHEETS.flatMap((sheet) =>
      sheet.sections.flatMap((section) =>
        section.image && 'diagram' in section.image ? [section.image.diagram] : []
      )
    );
    expect(named.length).toBeGreaterThan(0);
    for (const id of named) expect(ids).toContain(id);
  });

  it('keys every slot by its sheet', () => {
    const slugs = new Set(CHEAT_SHEETS.map((sheet) => sheet.slug));
    for (const id of ids) expect(slugs).toContain(id.split('/')[0]);
  });

  it.each(LOCALES)('has markup for every diagram in %s', (locale) => {
    const diagrams = markupByLocale[locale];
    expect(Object.keys(diagrams).sort()).toEqual([...ids].sort());
    for (const diagram of Object.values(diagrams)) {
      expect(diagram.markup).toContain('<text');
      // The page names the drawing; nothing inside it may compete.
      expect(diagram.markup).not.toMatch(/<title|<desc|<style|<script/i);
    }
  });
});
