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
import { CHEAT_SHEET_OVERLAY_DE, RESOURCE_DESCRIPTIONS_DE } from './cheat-sheets/de';
import { CHEAT_SHEET_OVERLAY_FR, RESOURCE_DESCRIPTIONS_FR } from './cheat-sheets/fr';
import { CHEAT_SHEET_OVERLAY_ES, RESOURCE_DESCRIPTIONS_ES } from './cheat-sheets/es';
import { CHEAT_SHEET_OVERLAY_IT, RESOURCE_DESCRIPTIONS_IT } from './cheat-sheets/it';
import { CHEAT_SHEET_OVERLAY_RU, RESOURCE_DESCRIPTIONS_RU } from './cheat-sheets/ru';

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
  /** Names of the worked examples, in the English order. Formulae are not here. */
  exampleNames?: string[];
}

export interface CheatSheetOverlay {
  title: string;
  summary: string;
  curriculumRef?: string;
  keyTakeaways: string[];
  /** Names of `formulaExamples`, in the English order. */
  formulaExampleNames?: string[];
  sections: CheatSheetSectionOverlay[];
  tables?: CheatSheetTableOverlay[];
  commonMistakes?: string[];
}

export type CheatSheetOverlaySet = Record<string, CheatSheetOverlay>;

/**
 * Resource *descriptions* are keyed by URL rather than by position, because the
 * same resource (the VCAA data book, Khan Academy) appears on many sheets and
 * the global teacher resources are appended at render time.
 *
 * Resource *labels* are deliberately left in English: they are the names of
 * English-language sites and documents ("Khan Academy — High School
 * Chemistry", "VCAA VCE Chemistry Data Book"), and renaming them would make
 * them harder to find, not easier. That the linked material is English-only is
 * a real gap for a German reader — it is recorded in docs/i18n/README.md
 * § Known gaps rather than papered over here.
 */
export type ResourceDescriptions = Record<string, string>;

interface LocaleContent {
  sheets: CheatSheetOverlaySet;
  resourceDescriptions: ResourceDescriptions;
}

const LOCALE_CONTENT: Partial<Record<Locale, LocaleContent>> = {
  de: {
    sheets: CHEAT_SHEET_OVERLAY_DE,
    resourceDescriptions: RESOURCE_DESCRIPTIONS_DE,
  },
  fr: {
    sheets: CHEAT_SHEET_OVERLAY_FR,
    resourceDescriptions: RESOURCE_DESCRIPTIONS_FR,
  },
  es: {
    sheets: CHEAT_SHEET_OVERLAY_ES,
    resourceDescriptions: RESOURCE_DESCRIPTIONS_ES,
  },
  it: {
    sheets: CHEAT_SHEET_OVERLAY_IT,
    resourceDescriptions: RESOURCE_DESCRIPTIONS_IT,
  },
  ru: {
    sheets: CHEAT_SHEET_OVERLAY_RU,
    resourceDescriptions: RESOURCE_DESCRIPTIONS_RU,
  },
};

function localizeResource(
  resource: CheatSheetResource,
  descriptions: ResourceDescriptions
): CheatSheetResource {
  const description = descriptions[resource.url];
  return description ? { ...resource, description } : resource;
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

function localizeSheet(
  sheet: CheatSheetTopic,
  overlay: CheatSheetOverlay,
  descriptions: ResourceDescriptions
): CheatSheetTopic {
  return {
    ...sheet,
    title: overlay.title,
    summary: overlay.summary,
    curriculumRef: overlay.curriculumRef ?? sheet.curriculumRef,
    keyTakeaways: overlay.keyTakeaways,
    formulaExamples: sheet.formulaExamples?.map((example, index) => ({
      ...example,
      name: overlay.formulaExampleNames?.[index] ?? example.name,
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
        })),
      };
    }),
    tables: sheet.tables?.map((table, index) => localizeTable(table, overlay.tables?.[index])),
    commonMistakes: overlay.commonMistakes ?? sheet.commonMistakes,
    resources: sheet.resources?.map((resource) => localizeResource(resource, descriptions)),
  };
}

/** Every cheat sheet, with prose in the requested locale. */
export function getCheatSheets(locale: Locale): CheatSheetTopic[] {
  const content = LOCALE_CONTENT[locale];
  if (locale === DEFAULT_LOCALE || !content) return CHEAT_SHEETS;

  return CHEAT_SHEETS.map((sheet) => {
    const overlay = content.sheets[sheet.slug];
    // A sheet with no overlay renders in English rather than disappearing.
    // The test asserts this never happens for a shipped locale.
    return overlay ? localizeSheet(sheet, overlay, content.resourceDescriptions) : sheet;
  });
}

export function getCheatSheet(locale: Locale, slug: string): CheatSheetTopic | undefined {
  return getCheatSheets(locale).find((sheet) => sheet.slug === slug);
}

/** The global teacher resources, with localized descriptions. */
export function getGlobalTeacherResources(locale: Locale): CheatSheetResource[] {
  const content = LOCALE_CONTENT[locale];
  if (!content) return GLOBAL_TEACHER_RESOURCES;
  return GLOBAL_TEACHER_RESOURCES.map((resource) =>
    localizeResource(resource, content.resourceDescriptions)
  );
}

/** Exposed for the completeness test. */
export { LOCALE_CONTENT as CHEAT_SHEET_LOCALE_CONTENT };
