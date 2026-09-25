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
import type { CheatSheetTopic } from '@/core-engine/types/general';
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

type Example = { name: string; description?: string };

/**
 * How long an overlay's description array must be for this English list: the
 * list's length when any example in it has a description, otherwise none.
 */
const descriptionCount = (examples: Example[] | undefined): number =>
  examples?.some((example) => example.description) ? examples.length : 0;

/**
 * A worked sum such as "2 × 1 + 16 = 18": digits, operators and brackets,
 * with an equals sign. Everything else ("17 protons, 18 neutrons") is prose.
 */
const isCalculation = (text: string): boolean => /^[\d\s.,+\-×()=]+$/.test(text) && text.includes('=');

/**
 * The numbers in a sum, in order, with the decimal separator normalised, so
 * a German "23 + 35,5 = 58,5" agrees with the English "23 + 35.5 = 58.5".
 */
const numbersIn = (text: string): string[] =>
  (text.match(/\d+(?:[.,]\d+)?/g) ?? []).map((number) => number.replace(',', '.'));

/** A letter x standing for "times" between two numbers: "2 x 16", "2 x (". */
const LETTER_X_TIMES = /\d\s*x\s*[\d(]/;

/** Every string a sheet shows a reader, labelled with where it came from. */
function readerStrings(sheet: CheatSheetTopic): [where: string, text: string][] {
  const out: [string, string][] = [
    ['title', sheet.title],
    ['summary', sheet.summary],
    ...sheet.keyTakeaways.map((text, i): [string, string] => [`keyTakeaways[${i}]`, text]),
    ...(sheet.commonMistakes ?? []).map((text, i): [string, string] => [`commonMistakes[${i}]`, text]),
  ];
  sheet.formulaExamples?.forEach((example, i) => {
    out.push([`formulaExamples[${i}].name`, example.name]);
    if (example.description) out.push([`formulaExamples[${i}].description`, example.description]);
  });
  sheet.sections.forEach((section, i) => {
    out.push([`sections[${i}].content`, section.content]);
    section.steps?.forEach((step, j) => out.push([`sections[${i}].steps[${j}]`, step]));
    section.examples?.forEach((example, j) => {
      if (example.description) {
        out.push([`sections[${i}].examples[${j}].description`, example.description]);
      }
    });
    section.table?.rows.forEach((row, r) =>
      row.forEach((cell, c) => out.push([`sections[${i}].table.rows[${r}][${c}]`, cell]))
    );
  });
  sheet.tables?.forEach((table, i) => {
    table.rows.forEach((row, r) =>
      row.forEach((cell, c) => out.push([`tables[${i}].rows[${r}][${c}]`, cell]))
    );
  });
  return out;
}

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
        formulaExampleDescriptions: overlay.formulaExampleDescriptions?.length ?? 0,
        sections: overlay.sections.length,
        sectionSteps: overlay.sections.map((s) => s.steps?.length ?? 0),
        sectionExampleNames: overlay.sections.map((s) => s.exampleNames?.length ?? 0),
        sectionExampleDescriptions: overlay.sections.map((s) => s.exampleDescriptions?.length ?? 0),
        sectionTableColumns: overlay.sections.map((s) => s.table?.columns.length ?? 0),
        sectionTableRows: overlay.sections.map((s) => s.table?.rows.length ?? 0),
        tables: overlay.tables?.length ?? 0,
        tableColumns: overlay.tables?.map((t) => t.columns.length) ?? [],
        tableRows: overlay.tables?.map((t) => t.rows.length) ?? [],
        commonMistakes: overlay.commonMistakes?.length ?? 0,
      }).toEqual({
        keyTakeaways: source.keyTakeaways.length,
        formulaExampleNames: source.formulaExamples?.length ?? 0,
        formulaExampleDescriptions: descriptionCount(source.formulaExamples),
        sections: source.sections.length,
        sectionSteps: source.sections.map((s) => s.steps?.length ?? 0),
        sectionExampleNames: source.sections.map((s) => s.examples?.length ?? 0),
        sectionExampleDescriptions: source.sections.map((s) => descriptionCount(s.examples)),
        sectionTableColumns: source.sections.map((s) => s.table?.columns.length ?? 0),
        sectionTableRows: source.sections.map((s) => s.table?.rows.length ?? 0),
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
      expect(target.sections[index].steps?.length ?? 0).toBe(section.steps?.length ?? 0);

      const table = section.table;
      const localizedTable = target.sections[index].table;
      if (table) {
        expect(localizedTable?.columns).toHaveLength(table.columns.length);
        expect(localizedTable?.rows).toHaveLength(table.rows.length);
        localizedTable?.rows.forEach((row, rowIndex) => {
          expect(row).toHaveLength(table.rows[rowIndex].length);
        });
      } else {
        expect(localizedTable).toBeUndefined();
      }
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
      source.sections.forEach((section, index) => {
        section.table?.formulaColumns?.forEach((column) => {
          section.table!.rows.forEach((row, rowIndex) => {
            expect(target.sections[index].table!.rows[rowIndex][column]).toBe(row[column]);
          });
        });
      });
    }
  );

  // An example card's description is often the whole point of the card — on
  // the formula-mass sheet it is the working — so a locale that lost one
  // would show a formula with no answer, and one that added one would say
  // something the English sheet does not. `localizeSheet()` falls back to the
  // English description, so this reads the overlay, not the output.
  it.each(CHEAT_SHEETS.map((sheet) => sheet.slug))(
    '%s has a description wherever the English has one, and nowhere else',
    (slug) => {
      const source = CHEAT_SHEETS.find((sheet) => sheet.slug === slug)!;
      const overlay = overlays[slug]!;
      const present = (text: string | undefined) => Boolean(text?.trim());

      expect({
        formulaExamples: (source.formulaExamples ?? []).map((_, i) =>
          present(overlay.formulaExampleDescriptions?.[i])
        ),
        sections: source.sections.map((section, s) =>
          (section.examples ?? []).map((_, i) =>
            present(overlay.sections[s]?.exampleDescriptions?.[i])
          )
        ),
      }).toEqual({
        formulaExamples: (source.formulaExamples ?? []).map((e) => present(e.description)),
        sections: source.sections.map((section) =>
          (section.examples ?? []).map((e) => present(e.description))
        ),
      });
    }
  );

  it.each(CHEAT_SHEETS.map((sheet) => sheet.slug))(
    '%s keeps the numbers of every worked sum',
    (slug) => {
      const source = CHEAT_SHEETS.find((sheet) => sheet.slug === slug)!;
      const target = getCheatSheet(locale, slug)!;
      const pairs: [english: string | undefined, translated: string | undefined][] = [
        ...(source.formulaExamples ?? []).map((e, i): [string | undefined, string | undefined] => [
          e.description,
          target.formulaExamples![i].description,
        ]),
        ...source.sections.flatMap((section, s) =>
          (section.examples ?? []).map((e, i): [string | undefined, string | undefined] => [
            e.description,
            target.sections[s].examples![i].description,
          ])
        ),
      ];
      for (const [english, translated] of pairs) {
        if (!english || !isCalculation(english)) continue;
        expect(numbersIn(translated ?? ''), `${english} → ${translated}`).toEqual(numbersIn(english));
        // A decimal point in a sum is an untranslated number.
        expect(translated, 'decimal comma').not.toMatch(/\d\.\d/);
      }
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
        section.steps?.forEach((step) => expect(step.trim()).not.toBe(''));
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

describe('worked sums', () => {
  // "2 x 16" reads as algebra to a student who has just met x as an unknown,
  // and it is the letter, not the sign. Every locale, English included.
  it.each(LOCALES)('%s writes × for times, never the letter x', (locale) => {
    const found = getCheatSheets(locale).flatMap((sheet) =>
      readerStrings(sheet)
        .filter(([, text]) => LETTER_X_TIMES.test(text))
        .map(([where, text]) => `${sheet.slug} ${where}: ${text}`)
    );
    expect(found).toEqual([]);
  });

  /**
   * The one deliberate exception to "a locale restates the same numbers":
   * the German stoichiometry sheet's molar-gas-volume cell. English states
   * V_m at the VCE reference point (25 °C, 100 kPa); German instead follows
   * the Abitur formula sheets' own two reference points (0 °C and 25 °C, at
   * 1013 hPa), which give different rounded values (22,4 / 24,5 L/mol, not
   * 24,8). This is an owner decision (option b for German, see
   * docs/i18n/glossary-de.md, "molar gas volume (V_m)"), not a translation
   * slip, so it is named here rather than loosening the check for everyone.
   */
  const NUMBER_EXCEPTIONS: Partial<Record<Exclude<Locale, 'en'>, Set<string>>> = {
    de: new Set(['stoichiometry:tables[0].rows[3][2]']),
  };

  // The table cells that are numbers or sums ("2 × 1 + 16", "58,5") are
  // prose columns, so each locale restates them. They must restate the same
  // numbers, in the locale's own decimal separator.
  it.each(translatedLocales)('%s keeps the numbers in every table cell that is a sum', (locale) => {
    const mismatches: string[] = [];
    const exceptions = NUMBER_EXCEPTIONS[locale] ?? new Set<string>();
    for (const source of CHEAT_SHEETS) {
      const target = getCheatSheet(locale, source.slug)!;
      source.tables?.forEach((table, t) => {
        table.rows.forEach((row, r) =>
          row.forEach((cell, c) => {
            if (table.formulaColumns?.includes(c) || !/^[\d\s.,+\-×()]+$/.test(cell)) return;
            if (exceptions.has(`${source.slug}:tables[${t}].rows[${r}][${c}]`)) return;
            const translated = target.tables![t].rows[r][c];
            const same = numbersIn(translated).join(' ') === numbersIn(cell).join(' ');
            if (!same || /\d\.\d/.test(translated)) {
              mismatches.push(`${source.slug} tables[${t}] ${cell} → ${translated}`);
            }
          })
        );
      });
      source.sections.forEach((section, s) => {
        const table = section.table;
        if (!table) return;
        table.rows.forEach((row, r) =>
          row.forEach((cell, c) => {
            if (table.formulaColumns?.includes(c) || !/^[\d\s.,+\-×()]+$/.test(cell)) return;
            if (exceptions.has(`${source.slug}:sections[${s}].table.rows[${r}][${c}]`)) return;
            const translated = target.sections[s].table!.rows[r][c];
            const same = numbersIn(translated).join(' ') === numbersIn(cell).join(' ');
            if (!same || /\d\.\d/.test(translated)) {
              mismatches.push(`${source.slug} sections[${s}].table ${cell} → ${translated}`);
            }
          })
        );
      });
    }
    expect(mismatches).toEqual([]);
  });
});

describe('lookup', () => {
  it('returns undefined for an unknown slug', () => {
    expect(getCheatSheet('de', 'not-a-sheet')).toBeUndefined();
  });
});
