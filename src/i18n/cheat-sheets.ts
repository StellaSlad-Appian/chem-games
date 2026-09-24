// src/i18n/cheat-sheets.ts
//
// The cheat sheets are the largest body of prose on the site (~860 lines of
// chemistry teaching content), and most of what is in them must NOT be
// translated: formulae, element symbols, state symbols, IUPAC notation, the
// URLs and the structural metadata (slug, icon, colour theme, related games,
// year level).
//
// So a locale does not restate a cheat sheet; it *overlays* the prose onto the
// English structure in src/lib/cheat-sheet-data.ts, which stays the single
// source of truth for the chemistry. That means:
//
//   - adding a sheet, a table row or a takeaway in English cannot silently
//     leave a locale rendering a stale sheet: the arrays no longer line up and
//     src/i18n/cheat-sheets.test.ts fails;
//   - a formula can never be translated by accident, because formulae are not
//     in the overlay at all;
//   - the overlay files stay readable as translation units.
//
// Everything here runs on the server only (the cheat-sheet pages are Server
// Components), so none of this prose reaches the client bundle except the
// summaries the index page passes to the filter grid — the same as before.

import type {
  CheatSheetResource,
  CheatSheetTable,
  CheatSheetTopic,
} from '@/core-engine/types/general';
import { CHEAT_SHEETS, GLOBAL_TEACHER_RESOURCES } from '@/lib/cheat-sheet-data';
import { DEFAULT_LOCALE, type Locale } from './config';
import { CHEAT_SHEET_OVERLAY_DE } from './cheat-sheets/de';
import { CHEAT_SHEET_OVERLAY_FR } from './cheat-sheets/fr';
import { CHEAT_SHEET_OVERLAY_ES } from './cheat-sheets/es';
import { CHEAT_SHEET_OVERLAY_IT } from './cheat-sheets/it';
import { CHEAT_SHEET_OVERLAY_RU } from './cheat-sheets/ru';

/** Prose for one table; `rows` must match the English table row for row. */
export interface CheatSheetTableOverlay {
  heading: string;
  caption?: string;
  columns: string[];
  rows: string[][];
}

export interface CheatSheetSectionOverlay {
  heading: string;
  content: string;
  /**
   * Alt text for this section's diagram, when it has one.
   *
   * Optional because most sections have no image. When a section *does* have
   * one and a locale omits this, the reader gets the English alt — which
   * `cheat-sheets.test.ts` treats as a missing translation rather than a
   * fallback, for the same reason the rest of this file does.
   */
  imageAlt?: string;
  /** Names of the worked examples, in the English order. Formulae are not here. */
  exampleNames?: string[];
  /**
   * The line under each worked example's formula, in the English order. Same
   * shape and rules as `CheatSheetOverlay.formulaExampleDescriptions`.
   */
  exampleDescriptions?: string[];
}

export interface CheatSheetOverlay {
  title: string;
  summary: string;
  keyTakeaways: string[];
  /** Names of `formulaExamples`, in the English order. */
  formulaExampleNames?: string[];
  /**
   * The line under each of `formulaExamples`' formulae — "17 protons,
   * 18 neutrons", or on the formula-mass sheet the whole sum — in the English
   * order.
   *
   * A parallel array like the names beside it, rather than turning both into
   * `{ name, description }` objects: the names are already parallel arrays in
   * five files, and one shape for both keeps an overlay readable as a
   * translation unit. Present only when the English list has descriptions,
   * and then exactly as long as it, with `''` for an example the English
   * leaves bare. A sum keeps the English numbers and writes them the
   * locale's way (decimal comma). `cheat-sheets.test.ts` enforces all three.
   */
  formulaExampleDescriptions?: string[];
  sections: CheatSheetSectionOverlay[];
  tables?: CheatSheetTableOverlay[];
  commonMistakes?: string[];
}

export type CheatSheetOverlaySet = Record<string, CheatSheetOverlay>;

// ---------------------------------------------------------------------------
// What a non-English sheet does NOT get, and why
// ---------------------------------------------------------------------------
//
// Two things on an English sheet are tied to one country and one language, and
// translating them made them worse rather than better. Both are now
// **withheld** from every locale but English.
//
//   1. **The outside links.** `src/lib/cheat-sheet-data.ts` points at 21 URLs
//      across 13 domains — VCAA, Khan Academy, PhET's `/en/` simulations,
//      LibreTexts, the IUPAC Gold Book, PubChem, NIST, the RSC, chemguide,
//      Compound Interest, ptable, MolView and SDBS. Every one of them is an
//      English-language page. Until now only the *description* was localised,
//      so a Russian student read a Russian sentence recommending a page they
//      cannot read. A link a student cannot read is worse than no link, so the
//      whole `resources` list is dropped, together with the global teacher
//      resources the detail page appends at render time.
//
//   2. **`curriculumRef`.** It cites the Victorian Curriculum and the VCE
//      study design — the syllabus of one Australian state. All five overlays
//      were translating it, so the Russian acids sheet read «Victorian
//      Curriculum Science, уровень 10 …; VCE Unit 2 AoS 1 (Брёнстед —
//      Лоури).» to a student who will never sit any of it.
//
// **Both are withheld explicitly, and that is the whole point.** Deleting the
// values from the overlays alone would not have worked: `localizeSheet()` fell
// back to the English field whenever the overlay had none, so a deleted
// translation would have restored the *English Australian* string — the worse
// of the two outcomes. The fields are set here instead, and the overlays no
// longer carry them at all.
//
// English is untouched: `getCheatSheets('en')` still returns `CHEAT_SHEETS` by
// identity, with every resource and every curriculum line on it.
//
// This is a withholding, not a finding that these locales need nothing. What
// they need — a curriculum mapping per country, and outside links a student
// can actually read — is subject-expert work that has not been done. It is
// written up as the deferred follow-up in docs/i18n/README.md
// § Locale-appropriate content.

/**
 * One prose overlay per locale, English excluded.
 *
 * `Record<Exclude<Locale, 'en'>, …>` rather than `Partial<Record<Locale, …>>`:
 * strict, so a new locale is a compile error until its overlay exists. The
 * `Partial` this replaces is the same construct that let Russian ship with no
 * Explore overlay at all (src/i18n/explore.ts), and it was no safer here.
 */
const OVERLAYS: Record<Exclude<Locale, 'en'>, CheatSheetOverlaySet> = {
  de: CHEAT_SHEET_OVERLAY_DE,
  fr: CHEAT_SHEET_OVERLAY_FR,
  es: CHEAT_SHEET_OVERLAY_ES,
  it: CHEAT_SHEET_OVERLAY_IT,
  ru: CHEAT_SHEET_OVERLAY_RU,
};

/** The overlay set for a locale, or `undefined` for English. */
function overlaysFor(locale: Locale): CheatSheetOverlaySet | undefined {
  return locale === 'en' ? undefined : OVERLAYS[locale];
}

function localizeTable(
  table: CheatSheetTable,
  overlay: CheatSheetTableOverlay | undefined
): CheatSheetTable {
  if (!overlay) return table;
  return {
    ...table,
    heading: overlay.heading,
    caption: overlay.caption ?? table.caption,
    columns: overlay.columns,
    // Cells listed in `formulaColumns` are rendered through MoleculeText and
    // are pure notation, so the English cell always wins over the overlay.
    rows: table.rows.map((row, rowIndex) =>
      row.map((cell, cellIndex) =>
        table.formulaColumns?.includes(cellIndex)
          ? cell
          : (overlay.rows[rowIndex]?.[cellIndex] ?? cell)
      )
    ),
  };
}

/**
 * An example's description in the locale.
 *
 * Only where the English has one. A description is part of the chemistry of
 * the card — on the formula-mass sheet it *is* the card — so an overlay cannot
 * add one the English lacks. A missing or empty translation falls back to the
 * English like every other field here, and the test treats that as a failure.
 */
function localizeDescription(
  english: string | undefined,
  translated: string | undefined
): string | undefined {
  if (!english) return english;
  return translated?.trim() ? translated : english;
}

function localizeSheet(sheet: CheatSheetTopic, overlay: CheatSheetOverlay): CheatSheetTopic {
  return {
    ...sheet,
    title: overlay.title,
    summary: overlay.summary,
    // Withheld, not translated — and explicitly, because the old
    // `overlay.curriculumRef ?? sheet.curriculumRef` would otherwise restore
    // the English Australian line. See the note above.
    curriculumRef: undefined,
    keyTakeaways: overlay.keyTakeaways,
    formulaExamples: sheet.formulaExamples?.map((example, index) => ({
      ...example,
      name: overlay.formulaExampleNames?.[index] ?? example.name,
      description: localizeDescription(
        example.description,
        overlay.formulaExampleDescriptions?.[index]
      ),
    })),
    sections: sheet.sections.map((section, index) => {
      const sectionOverlay = overlay.sections[index];
      if (!sectionOverlay) return section;
      return {
        ...section,
        heading: sectionOverlay.heading,
        content: sectionOverlay.content,
        examples: section.examples?.map((example, exampleIndex) => ({
          ...example,
          name: sectionOverlay.exampleNames?.[exampleIndex] ?? example.name,
          description: localizeDescription(
            example.description,
            sectionOverlay.exampleDescriptions?.[exampleIndex]
          ),
        })),
        // The image itself is structure — same file, same size, every locale.
        // Only the alt text is prose.
        image: section.image
          ? { ...section.image, alt: sectionOverlay.imageAlt ?? section.image.alt }
          : undefined,
      };
    }),
    tables: sheet.tables?.map((table, index) => localizeTable(table, overlay.tables?.[index])),
    commonMistakes: overlay.commonMistakes ?? sheet.commonMistakes,
    // Withheld for the same reason: every one of them is an English-language
    // page. `undefined` rather than `[]`, so the shape matches a sheet that
    // lists no resources at all and the detail page needs no special case.
    resources: undefined,
  };
}

/** Every cheat sheet, with prose in the requested locale. */
export function getCheatSheets(locale: Locale): CheatSheetTopic[] {
  const overlays = overlaysFor(locale);
  if (locale === DEFAULT_LOCALE || !overlays) return CHEAT_SHEETS;

  return CHEAT_SHEETS.map((sheet) => {
    const overlay = overlays[sheet.slug];
    // A sheet with no overlay renders in English rather than disappearing.
    // The test asserts this never happens for a shipped locale.
    return overlay ? localizeSheet(sheet, overlay) : sheet;
  });
}

export function getCheatSheet(locale: Locale, slug: string): CheatSheetTopic | undefined {
  return getCheatSheets(locale).find((sheet) => sheet.slug === slug);
}

/**
 * The global teacher resources — English only.
 *
 * The VCAA study design is the syllabus of one Australian state and the RSC
 * periodic table is an English-language site, so a non-English sheet gets
 * neither. Empty rather than translated, for the reason in the note above.
 */
export function getGlobalTeacherResources(locale: Locale): CheatSheetResource[] {
  return locale === DEFAULT_LOCALE ? GLOBAL_TEACHER_RESOURCES : [];
}

/** Exposed for the completeness test. */
export { OVERLAYS as CHEAT_SHEET_OVERLAYS };
