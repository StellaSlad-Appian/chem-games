// src/i18n/chemistry-names.ts
//
// Localized names for elements, compounds and ions.
//
// The English names live in the core-engine registries and stay there: they are
// chemistry data, not copy. Each other locale contributes an overlay keyed by
// the registry's own identifiers, and this module resolves a name by looking in
// the overlay first and falling back to the registry.
//
// Deliberately synchronous and dependency-free so it can be called from a
// client component's render as easily as from a server page.

import { ELEMENTS_REGISTRY } from '@/core-engine/data/elements';
import { DEFAULT_LOCALE, type Locale } from './config';
import { COMPOUND_NAMES_DE, ELEMENT_NAMES_DE, ION_NAMES_DE } from './chemistry-names/de';

export interface ChemistryNameOverlay {
  /** Element names by symbol ('Na' -> 'Natrium'). */
  elements: Record<string, string>;
  /** Compound names by registry id. */
  compounds: Record<string, string>;
  /** Ion names by registry id. */
  ions: Record<string, string>;
}

const EMPTY: ChemistryNameOverlay = { elements: {}, compounds: {}, ions: {} };

/**
 * No entry for the default locale: English names come straight from the
 * registries, so there is nothing to duplicate and nothing to keep in sync.
 */
const OVERLAYS: Partial<Record<Locale, ChemistryNameOverlay>> = {
  de: {
    elements: ELEMENT_NAMES_DE,
    compounds: COMPOUND_NAMES_DE,
    ions: ION_NAMES_DE,
  },
};

export function chemistryNameOverlay(locale: Locale): ChemistryNameOverlay {
  return OVERLAYS[locale] ?? EMPTY;
}

/** Whether a locale relies on the registries' English names. */
export const usesRegistryNames = (locale: Locale): boolean =>
  locale === DEFAULT_LOCALE || !OVERLAYS[locale];

export function elementName(locale: Locale, symbol: string): string {
  const overlay = chemistryNameOverlay(locale).elements[symbol];
  if (overlay) return overlay;
  return ELEMENTS_REGISTRY.find((element) => element.symbol === symbol)?.name ?? symbol;
}

export function compoundName(
  locale: Locale,
  compound: { id?: string; name: string }
): string {
  const overlay = compound.id ? chemistryNameOverlay(locale).compounds[compound.id] : undefined;
  return overlay ?? compound.name;
}

export function ionName(locale: Locale, ion: { id: string; name: string }): string {
  return chemistryNameOverlay(locale).ions[ion.id] ?? ion.name;
}
