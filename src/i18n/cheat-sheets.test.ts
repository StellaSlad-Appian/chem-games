// src/i18n/cheat-sheets.test.ts
//
// The cheat sheets are overlays onto the English structure (see
// src/i18n/cheat-sheets.ts), so the thing that can go wrong is not a missing
// key but a *shape* mismatch: a takeaway added in English and not in German
// would leave the German sheet one bullet short, and an extra table row would
// silently fall back to English mid-table.
//
// These tests therefore compare the localized sheet against the English one
// item for item, and check that the parts that must never be translated —
// slugs, formulae, URLs, icons, year levels — are byte-identical.

import { describe, expect, it } from 'vitest';
import { CHEAT_SHEETS } from '@/lib/cheat-sheet-data';
import { LOCALES, DEFAULT_LOCALE } from './config';
import {
  CHEAT_SHEET_LOCALE_CONTENT,
  getCheatSheet,
  getCheatSheets,
  getGlobalTeacherResources,
} from './cheat-sheets';

const translatedLocales = LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE && CHEAT_SHEET_LOCALE_CONTENT[locale]
);

describe('English', () => {
  it('is the source data, untouched', () => {
    expect(getCheatSheets(DEFAULT_LOCALE)).toBe(CHEAT_SHEETS);
  });
});

describe.each(translatedLocales)('cheat sheets: %s', (locale) => {
  const localized = getCheatSheets(locale);
  const content = CHEAT_SHEET_LOCALE_CONTENT[locale]!;

  it('covers every sheet', () => {
    const missing = CHEAT_SHEETS.filter((sheet) => !content.sheets[sheet.slug]).map((s) => s.slug);
    expect(missing).toEqual([]);
  });

  it('has no overlay for a sheet that does not exist', () => {
    const slugs = new Set(CHEAT_SHEETS.map((sheet) => sheet.slug));
    expect(Object.keys(content.sheets).filter((slug) => !slugs.has(slug))).toEqual([]);
  });

  it.each(CHEAT_SHEETS.map((sheet) => sheet.slug))('%s keeps the English shape', (slug) => {
    const source = CHEAT_SHEETS.find((sheet) => sheet.slug === slug)!;
    const target = getCheatSheet(locale, slug)!;

    expect(target.keyTakeaways).toHaveLength(source.keyTakeaways.length);
    expect(target.formulaExamples?.length ?? 0).toBe(source.formulaExamples?.length ?? 0);
    expect(target.sections).toHaveLength(source.sections.length);
    expect(target.tables?.length ?? 0).toBe(source.tables?.length ?? 0);
    expect(target.commonMistakes?.length ?? 0).toBe(source.commonMistakes?.length ?? 0);
    expect(target.resources?.length ?? 0).toBe(source.resources?.length ?? 0);

    source.tables?.forEach((table, index) => {
      const localizedTable = target.tables![index];
      expect(localizedTable.columns).toHaveLength(table.columns.length);
      expect(localizedTable.rows).toHaveLength(table.rows.length);
      localizedTable.rows.forEach((row, rowIndex) => {
        expect(row).toHaveLength(table.rows[rowIndex].length);
      });
    });

    source.sections.forEach((section, index) => {
      expect(target.sections[index].examples?.length ?? 0).toBe(section.examples?.length ?? 0);
    });
  });

  it.each(CHEAT_SHEETS.map((sheet) => sheet.slug))(
    '%s does not translate what must not be translated',
    (slug) => {
      const source = CHEAT_SHEETS.find((sheet) => sheet.slug === slug)!;
      const target = getCheatSheet(locale, slug)!;

      expect(target.slug).toBe(source.slug);
      expect(target.yearLevel).toBe(source.yearLevel);
      expect(target.category).toBe(source.category);
      expect(target.iconName).toBe(source.iconName);
      expect(target.colorTheme).toBe(source.colorTheme);
      expect(target.relatedGames).toEqual(source.relatedGames);

      // Formulae, everywhere they appear.
      source.formulaExamples?.forEach((example, index) => {
        expect(target.formulaExamples![index].formula).toBe(example.formula);
      });
      source.sections.forEach((section, index) => {
        section.examples?.forEach((example, exampleIndex) => {
          expect(target.sections[index].examples![exampleIndex].formula).toBe(example.formula);
        });
      });
      // Cells flagged as formula columns.
      source.tables?.forEach((table, index) => {
        table.formulaColumns?.forEach((column) => {
          table.rows.forEach((row, rowIndex) => {
            expect(target.tables![index].rows[rowIndex][column]).toBe(row[column]);
          });
        });
      });

      // Resource URLs.
      source.resources?.forEach((resource, index) => {
        expect(target.resources![index].url).toBe(resource.url);
        expect(target.resources![index].audience).toBe(resource.audience);
      });
    }
  );

  it('actually translates the prose', () => {
    const untranslatedTitles = CHEAT_SHEETS.filter((source) => {
      const target = getCheatSheet(locale, source.slug)!;
      return target.summary === source.summary;
    }).map((s) => s.slug);
    expect(untranslatedTitles).toEqual([]);
  });

  it('has no empty prose', () => {
    for (const sheet of localized) {
      expect(sheet.title.trim()).not.toBe('');
      expect(sheet.summary.trim()).not.toBe('');
      sheet.keyTakeaways.forEach((takeaway) => expect(takeaway.trim()).not.toBe(''));
      sheet.sections.forEach((section) => {
        expect(section.heading.trim()).not.toBe('');
        expect(section.content.trim()).not.toBe('');
      });
    }
  });

  it('describes every resource the app can show, including the global ones', () => {
    const urls = new Set<string>();
    for (const sheet of CHEAT_SHEETS) {
      sheet.resources?.forEach((resource) => urls.add(resource.url));
    }
    getGlobalTeacherResources(DEFAULT_LOCALE).forEach((resource) => urls.add(resource.url));

    const missing = [...urls].filter((url) => !content.resourceDescriptions[url]);
    expect(missing).toEqual([]);
  });

  it('has no resource description for a URL nothing links to', () => {
    const urls = new Set<string>();
    for (const sheet of CHEAT_SHEETS) {
      sheet.resources?.forEach((resource) => urls.add(resource.url));
    }
    getGlobalTeacherResources(DEFAULT_LOCALE).forEach((resource) => urls.add(resource.url));

    expect(Object.keys(content.resourceDescriptions).filter((url) => !urls.has(url))).toEqual([]);
  });
});

describe('lookup', () => {
  it('returns undefined for an unknown slug', () => {
    expect(getCheatSheet('de', 'not-a-sheet')).toBeUndefined();
  });
});
