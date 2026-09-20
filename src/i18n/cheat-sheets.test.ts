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
// slugs, formulae, icons, year levels — are byte-identical.
//
// Since 2026-09-20 they also check the opposite: that a non-English sheet
// shows **no** outside links and **no** curriculum reference. Those are the
// two things on an English sheet that belong to one language and one country,
// and translating them was the defect. The last group in this file pins the
// other side of it — English keeps both, unchanged.

import { describe, expect, it } from 'vitest';
import { CHEAT_SHEETS, GLOBAL_TEACHER_RESOURCES } from '@/lib/cheat-sheet-data';
import { LOCALES, DEFAULT_LOCALE, type Locale } from './config';
import {
  CHEAT_SHEET_OVERLAYS,
  getCheatSheet,
  getCheatSheets,
  getGlobalTeacherResources,
} from './cheat-sheets';

const translatedLocales = LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE
) as Exclude<Locale, 'en'>[];

describe('English', () => {
  it('is the source data, untouched', () => {
    expect(getCheatSheets(DEFAULT_LOCALE)).toBe(CHEAT_SHEETS);
  });
});

describe.each(translatedLocales)('cheat sheets: %s', (locale) => {
  const localized = getCheatSheets(locale);
  const overlays = CHEAT_SHEET_OVERLAYS[locale];

  it('covers every sheet', () => {
    const missing = CHEAT_SHEETS.filter((sheet) => !overlays[sheet.slug]).map((s) => s.slug);
    expect(missing).toEqual([]);
  });

  it('has no overlay for a sheet that does not exist', () => {
    const slugs = new Set(CHEAT_SHEETS.map((sheet) => sheet.slug));
    expect(Object.keys(overlays).filter((slug) => !slugs.has(slug))).toEqual([]);
  });

  // The gate that actually bites. The test below this one compares the
  // *localized sheet* against the English one, which can never fail on a
  // length: `localizeSheet()` maps over the English arrays and falls back to
  // the English item whenever the overlay has no entry at that index, so its
  // output is the right shape by construction. It is comparing the function's
  // output against the function's input.
  //
  // The thing that can really be wrong is the *overlay*, and it fails silently
  // because the mapping is positional: an overlay one section short does not
  // drop a section, it shifts every heading and body onto the wrong slot and
  // leaves the last one in English. That shipped on the German
  // `lewis-structures` sheet — three section overlays against four English
  // sections — and every assertion in this file passed.
  it.each(CHEAT_SHEETS.map((sheet) => sheet.slug))(
    '%s has an overlay the same shape as the English sheet',
    (slug) => {
      const source = CHEAT_SHEETS.find((sheet) => sheet.slug === slug)!;
      const overlay = overlays[slug]!;

      // One object rather than six assertions, so a failure names every field
      // that is out of step instead of stopping at the first.
      expect({
        keyTakeaways: overlay.keyTakeaways.length,
        formulaExampleNames: overlay.formulaExampleNames?.length ?? 0,
        sections: overlay.sections.length,
        sectionExampleNames: overlay.sections.map((s) => s.exampleNames?.length ?? 0),
        tables: overlay.tables?.length ?? 0,
        tableColumns: overlay.tables?.map((t) => t.columns.length) ?? [],
        tableRows: overlay.tables?.map((t) => t.rows.length) ?? [],
        commonMistakes: overlay.commonMistakes?.length ?? 0,
      }).toEqual({
        keyTakeaways: source.keyTakeaways.length,
        formulaExampleNames: source.formulaExamples?.length ?? 0,
        sections: source.sections.length,
        sectionExampleNames: source.sections.map((s) => s.examples?.length ?? 0),
        tables: source.tables?.length ?? 0,
        tableColumns: source.tables?.map((t) => t.columns.length) ?? [],
        tableRows: source.tables?.map((t) => t.rows.length) ?? [],
        commonMistakes: source.commonMistakes?.length ?? 0,
      });
    }
  );

  it.each(CHEAT_SHEETS.map((sheet) => sheet.slug))('%s keeps the English shape', (slug) => {
    const source = CHEAT_SHEETS.find((sheet) => sheet.slug === slug)!;
    const target = getCheatSheet(locale, slug)!;

    expect(target.keyTakeaways).toHaveLength(source.keyTakeaways.length);
    expect(target.formulaExamples?.length ?? 0).toBe(source.formulaExamples?.length ?? 0);
    expect(target.sections).toHaveLength(source.sections.length);
    expect(target.tables?.length ?? 0).toBe(source.tables?.length ?? 0);
    expect(target.commonMistakes?.length ?? 0).toBe(source.commonMistakes?.length ?? 0);

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

  // -------------------------------------------------------------------------
  // What this locale must NOT show
  // -------------------------------------------------------------------------
  //
  // These replace the two tests that used to check the *descriptions* of the
  // outside links were complete and had no orphans. Both were gates on
  // maintaining translations for material this locale no longer shows at all:
  // every linked page is English-language, and `curriculumRef` names one
  // Australian state's syllabus. See src/i18n/cheat-sheets.ts for the argument
  // and docs/i18n/README.md § Locale-appropriate content for the follow-up.

  it('shows no outside links, because every one of them is an English page', () => {
    const withLinks = localized
      .filter((sheet) => (sheet.resources?.length ?? 0) > 0)
      .map((sheet) => sheet.slug);
    expect(
      withLinks,
      'A non-English sheet must not link out to English-language sites. ' +
        'A link a student cannot read is worse than no link.'
    ).toEqual([]);
  });

  it('appends no global teacher resources either', () => {
    expect(getGlobalTeacherResources(locale)).toEqual([]);
  });

  /*
   * The one that would have failed before this change *and* would still fail
   * if somebody merely deleted the translated values from the overlay:
   * `localizeSheet()` used to fall back to `sheet.curriculumRef`, so a deleted
   * translation restored the English Australian line rather than removing it.
   */
  it('cites no curriculum, and does not fall back to the Australian one', () => {
    const withCurriculum = localized
      .filter((sheet) => sheet.curriculumRef !== undefined)
      .map((sheet) => `${sheet.slug}: ${sheet.curriculumRef}`);
    expect(withCurriculum).toEqual([]);
  });

  it('carries no curriculumRef in the overlay itself', () => {
    const stillThere = Object.entries(overlays)
      .filter(([, overlay]) => 'curriculumRef' in overlay)
      .map(([slug]) => slug);
    expect(stillThere).toEqual([]);
  });
});

describe('English keeps everything', () => {
  it('still shows every resource on every sheet', () => {
    for (const sheet of CHEAT_SHEETS) {
      const target = getCheatSheet(DEFAULT_LOCALE, sheet.slug)!;
      expect(target.resources).toBe(sheet.resources);
    }
  });

  it('still appends the global teacher resources', () => {
    expect(getGlobalTeacherResources(DEFAULT_LOCALE)).toBe(GLOBAL_TEACHER_RESOURCES);
  });

  it('still cites the Victorian Curriculum on every sheet that has one', () => {
    const cited = CHEAT_SHEETS.filter((sheet) => sheet.curriculumRef !== undefined);
    expect(cited.length).toBeGreaterThan(0);
    for (const sheet of cited) {
      expect(getCheatSheet(DEFAULT_LOCALE, sheet.slug)!.curriculumRef).toBe(sheet.curriculumRef);
    }
  });
});

describe('lookup', () => {
  it('returns undefined for an unknown slug', () => {
    expect(getCheatSheet('de', 'not-a-sheet')).toBeUndefined();
  });
});
