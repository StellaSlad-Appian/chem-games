// src/lib/cheat-sheet-diagrams.ts
//
// Loads the generated cheat-sheet diagrams for one locale. Server-side only:
// the detail page is a Server Component, and the markup reaches the browser as
// prerendered HTML, never as client JavaScript. Imported from that page and
// from tests, never from a client component.
//
// Each entry is a dynamic import, as in src/i18n/dictionaries.ts, so a build
// keeps each locale's markup in a chunk of its own and a German page only ever
// loads the German drawings.
//
// The modules are written by scripts/cheat-sheet-diagrams.mts; see its header
// and docs/CHEAT_SHEET_IMAGES.md.

import {
  CHEAT_SHEET_DIAGRAMS,
  CSS_PX_PER_UNIT,
  type CheatSheetDiagramId,
} from '@/generated/cheat-sheet-diagrams';
import type { Locale } from '@/i18n/config';

export type { CheatSheetDiagramId };
export { CSS_PX_PER_UNIT };

type DiagramMarkup = Record<CheatSheetDiagramId, string>;

const loaders: Record<Locale, () => Promise<DiagramMarkup>> = {
  en: () => import('@/generated/cheat-sheet-diagrams/en').then((module) => module.markup),
  de: () => import('@/generated/cheat-sheet-diagrams/de').then((module) => module.markup),
  fr: () => import('@/generated/cheat-sheet-diagrams/fr').then((module) => module.markup),
  es: () => import('@/generated/cheat-sheet-diagrams/es').then((module) => module.markup),
  it: () => import('@/generated/cheat-sheet-diagrams/it').then((module) => module.markup),
  ru: () => import('@/generated/cheat-sheet-diagrams/ru').then((module) => module.markup),
};

export interface CheatSheetDiagram {
  id: CheatSheetDiagramId;
  /**
   * In drawing units, measured from what the diagram draws. The page draws
   * every diagram at `CSS_PX_PER_UNIT`, so this is also the size of its box.
   */
  width: number;
  height: number;
  /**
   * What goes inside the `<svg>`. Generated at build time from strings in this
   * repository, never from user input, with every string XML-escaped by the
   * script — which is what makes it safe to insert as HTML.
   */
  markup: string;
}

/** Every generated diagram, drawn in `locale`. */
export async function getCheatSheetDiagrams(
  locale: Locale
): Promise<Record<CheatSheetDiagramId, CheatSheetDiagram>> {
  const markup = await loaders[locale]();
  const ids = Object.keys(CHEAT_SHEET_DIAGRAMS) as CheatSheetDiagramId[];
  return Object.fromEntries(
    ids.map((id) => [id, { id, ...CHEAT_SHEET_DIAGRAMS[id], markup: markup[id] }])
  ) as Record<CheatSheetDiagramId, CheatSheetDiagram>;
}
