// Every formula ChemText will typeset on every cheat sheet, in every locale,
// against a checked-in list.
//
// ChemText decides by rule (src/lib/chem-text.ts), and a rule over free prose
// in six languages can go wrong in ways no unit test anticipates: a new
// sentence with an Italian "I2" that means something else, an isotope written
// a new way. This test makes any change to what gets typeset show up as a
// diff to __snapshots__/cheat-sheet-formulas.json, which a person reads. When
// it fails after a prose change, check each new entry is a real formula
// before running `npx vitest run -u` on this file.

import { describe, expect, it } from 'vitest';
import { getCheatSheets } from './cheat-sheets';
import { LOCALES } from './config';
import { detectFormulas, segmentChemText } from '@/lib/chem-text';
import type { CheatSheetTopic } from '@/core-engine/types/general';

/** Every string the sheet page renders through ChemText, in page order. */
function chemTextStrings(sheet: CheatSheetTopic): string[] {
  const strings: string[] = [...sheet.keyTakeaways];
  for (const example of sheet.formulaExamples ?? []) {
    if (example.description) strings.push(example.description);
  }
  for (const table of sheet.tables ?? []) {
    const formulaColumns = new Set(table.formulaColumns ?? []);
    for (const row of table.rows) {
      row.forEach((cell, index) => {
        if (!formulaColumns.has(index)) strings.push(cell);
      });
    }
  }
  for (const section of sheet.sections) {
    strings.push(section.content);
    for (const example of section.examples ?? []) {
      if (example.description) strings.push(example.description);
    }
  }
  strings.push(...(sheet.commonMistakes ?? []));
  return strings;
}

describe('ChemText over every cheat sheet', () => {
  it('loses no character of any string', () => {
    for (const locale of LOCALES) {
      for (const sheet of getCheatSheets(locale)) {
        for (const text of chemTextStrings(sheet)) {
          const joined = segmentChemText(text)
            .map((segment) => segment.value)
            .join('');
          expect(joined, `${locale}/${sheet.slug}`).toBe(text);
        }
      }
    }
  });

  it('typesets exactly the formulae in the reviewed list', async () => {
    const found: Record<string, Record<string, string[]>> = {};
    for (const locale of LOCALES) {
      found[locale] = {};
      for (const sheet of getCheatSheets(locale)) {
        const formulas = chemTextStrings(sheet).flatMap(detectFormulas);
        if (formulas.length > 0) found[locale][sheet.slug] = formulas;
      }
    }
    await expect(`${JSON.stringify(found, null, 2)}\n`).toMatchFileSnapshot(
      './__snapshots__/cheat-sheet-formulas.json'
    );
  });
});
