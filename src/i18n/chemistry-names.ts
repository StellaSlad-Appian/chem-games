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
import { speciesName as registrySpeciesName } from '@/core-engine/data/reactions';
import type { ChemicalReaction } from '@/core-engine/data/reactions';
import type { LewisMoleculeData } from '@/core-engine/types/chemistry';
import { DEFAULT_LOCALE, type Locale } from './config';
import {
  COMPOUND_NAMES_DE,
  ELEMENT_NAMES_DE,
  ION_NAMES_DE,
  LEWIS_MOLECULE_TEXT_DE,
  REACTION_TEXT_DE,
  SPECIES_NAMES_DE,
} from './chemistry-names/de';
import {
  COMPOUND_NAMES_FR,
  ELEMENT_NAMES_FR,
  ION_NAMES_FR,
  LEWIS_MOLECULE_TEXT_FR,
  REACTION_TEXT_FR,
  SPECIES_NAMES_FR,
} from './chemistry-names/fr';
import {
  COMPOUND_NAMES_ES,
  ELEMENT_NAMES_ES,
  ION_NAMES_ES,
  LEWIS_MOLECULE_TEXT_ES,
  REACTION_TEXT_ES,
  SPECIES_NAMES_ES,
} from './chemistry-names/es';
import {
  COMPOUND_NAMES_IT,
  ELEMENT_NAMES_IT,
  ION_NAMES_IT,
  LEWIS_MOLECULE_TEXT_IT,
  REACTION_TEXT_IT,
  SPECIES_NAMES_IT,
} from './chemistry-names/it';
import {
  COMPOUND_NAMES_RU,
  ELEMENT_NAMES_RU,
  ION_NAMES_RU,
  LEWIS_MOLECULE_TEXT_RU,
  REACTION_TEXT_RU,
  SPECIES_NAMES_RU,
} from './chemistry-names/ru';

/** The prose a reaction carries in reactions.ts, minus its formulae. */
export interface ReactionTextOverlay {
  name: string;
  description: string;
  hint?: string;
  prompt?: string;
}

/** The prose a molecule carries in lewis-molecules.ts, minus its formulae. */
export interface LewisMoleculeTextOverlay {
  name: string;
  tier2Hint: string;
  propertyLine: string;
}

export interface ChemistryNameOverlay {
  /** Element names by symbol ('Na' -> 'Natrium'). */
  elements: Record<string, string>;
  /** Compound names by registry id. */
  compounds: Record<string, string>;
  /** Ion names by registry id. */
  ions: Record<string, string>;
  /**
   * Everyday species names by bare formula ('H2O' -> 'Wasser'). Keyed by
   * formula because that is how SPECIES_NAMES in reactions.ts is keyed; the
   * compounds registry and this table overlap but are not the same set.
   */
  species: Record<string, string>;
  /** Reaction name, observation, hint and word equation, by reaction id. */
  reactions: Record<string, ReactionTextOverlay>;
  /** Molecule name, strategy hint and property line, by molecule id. */
  lewisMolecules: Record<string, LewisMoleculeTextOverlay>;
}

const EMPTY: ChemistryNameOverlay = {
  elements: {},
  compounds: {},
  ions: {},
  species: {},
  reactions: {},
  lewisMolecules: {},
};

/**
 * Every locale but English, and the type says so.
 *
 * `Record<Exclude<Locale, 'en'>, …>` rather than
 * `Partial<Record<Locale, …>>`, which is what this was until 2026-09-20. The
 * `Partial` was the same construct that let Russian ship with no Explore
 * overlay, and it had the same consequence here: `usesRegistryNames()` returns
 * true for a locale with no overlay, and `chemistry-names.test.ts` builds its
 * locale list by filtering that out — so a missing overlay would not fail a
 * test, it would remove the locale from the suite and serve English names.
 *
 * English is excluded rather than optional: its names come straight from the
 * registries, so there is nothing to duplicate and nothing to keep in sync.
 * That is a different statement from "may be missing".
 */
const OVERLAYS: Record<Exclude<Locale, 'en'>, ChemistryNameOverlay> = {
  de: {
    elements: ELEMENT_NAMES_DE,
    compounds: COMPOUND_NAMES_DE,
    ions: ION_NAMES_DE,
    species: SPECIES_NAMES_DE,
    reactions: REACTION_TEXT_DE,
    lewisMolecules: LEWIS_MOLECULE_TEXT_DE,
  },
  fr: {
    elements: ELEMENT_NAMES_FR,
    compounds: COMPOUND_NAMES_FR,
    ions: ION_NAMES_FR,
    species: SPECIES_NAMES_FR,
    reactions: REACTION_TEXT_FR,
    lewisMolecules: LEWIS_MOLECULE_TEXT_FR,
  },
  es: {
    elements: ELEMENT_NAMES_ES,
    compounds: COMPOUND_NAMES_ES,
    ions: ION_NAMES_ES,
    species: SPECIES_NAMES_ES,
    reactions: REACTION_TEXT_ES,
    lewisMolecules: LEWIS_MOLECULE_TEXT_ES,
  },
  it: {
    elements: ELEMENT_NAMES_IT,
    compounds: COMPOUND_NAMES_IT,
    ions: ION_NAMES_IT,
    species: SPECIES_NAMES_IT,
    reactions: REACTION_TEXT_IT,
    lewisMolecules: LEWIS_MOLECULE_TEXT_IT,
  },
  ru: {
    elements: ELEMENT_NAMES_RU,
    compounds: COMPOUND_NAMES_RU,
    ions: ION_NAMES_RU,
    species: SPECIES_NAMES_RU,
    reactions: REACTION_TEXT_RU,
    lewisMolecules: LEWIS_MOLECULE_TEXT_RU,
  },
};

export function chemistryNameOverlay(locale: Locale): ChemistryNameOverlay {
  return locale === 'en' ? EMPTY : OVERLAYS[locale];
}

/**
 * Whether a locale relies on the registries' English names.
 *
 * English alone, now that the registry above is strict. It used to be true of
 * any locale with no overlay as well, which is what made a missing overlay
 * invisible instead of fatal.
 */
export const usesRegistryNames = (locale: Locale): boolean => locale === DEFAULT_LOCALE;

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

/**
 * Locales that write a chemistry name in lower case inside a sentence. English
 * does ("then check oxygen again"); German does not, because German capitalises
 * every noun — "sauerstoff" is a spelling mistake, not a style choice.
 *
 * The game message catalogues used to call `.toLowerCase()` at every such spot,
 * which is right for English and wrong for every language that capitalises
 * nouns. This is that decision, made once, per locale.
 */
const LOWERCASES_NAMES_IN_SENTENCE: Record<Locale, boolean> = {
  en: true,
  de: false,
  // French capitalises only proper nouns, so a chemical name mid-sentence is
  // lower case: « deux molécules d'eau ». Checked against every call site:
  // nameInSentence() only ever sees element and molecule names, none of which
  // carry a Roman numeral, so the naive toLowerCase() cannot produce
  // "fer(iii)". Species names like « nitrate de cuivre(II) » reach the screen
  // through speciesName(), which does not lowercase.
  fr: true,
  // Spanish capitalises only proper nouns, so a chemical name mid-sentence is
  // lower case: «dos moléculas de agua». Checked against every call site the
  // same way French was: nameInSentence() only ever sees element and molecule
  // names, none of which carry a Roman numeral, so the naive toLowerCase()
  // cannot produce "hierro(iii)". Species names like «nitrato de cobre(II)»
  // reach the screen through speciesName(), which does not lowercase.
  es: true,
  // Italian capitalises only proper nouns, so a chemical name mid-sentence is
  // lower case: «due molecole di acqua». Checked against every call site the
  // same way French and Spanish were: nameInSentence() only ever sees element
  // and molecule names, none of which carry a Roman numeral, so the naive
  // toLowerCase() cannot produce "ferro(iii)". Species names like «nitrato di
  // rame(II)» reach the screen through speciesName(), which does not lowercase.
  it: true,
  // Russian capitalises only proper nouns, so a chemical name mid-sentence is
  // lower case: «две молекулы воды». Checked against every call site the same
  // way French, Spanish and Italian were: nameInSentence() only ever sees
  // element and molecule names, none of which carry a Roman numeral, so the
  // naive toLowerCase() cannot produce «железо(iii)». Species names like
  // «нитрат меди(II)» reach the screen through speciesName(), which does not
  // lowercase.
  //
  // One extra check Russian needed and the Latin locales did not: Cyrillic
  // case folding. `'Натрий'.toLowerCase()` is `'натрий'`, and — the part worth
  // verifying rather than assuming — **Ё lowercases to ё, not to е**, so the
  // yo convention this locale insists on survives the call.
  ru: true,
};

/** A chemistry name as it should appear mid-sentence in `locale`. */
export function nameInSentence(locale: Locale, name: string): string {
  return LOWERCASES_NAMES_IN_SENTENCE[locale] ? name.toLowerCase() : name;
}

/** The everyday name of a species, by formula with or without a state symbol. */
export function speciesName(locale: Locale, formula: string): string {
  const bare = formula.replace(/\((?:s|l|g|aq)\)$/, '');
  return chemistryNameOverlay(locale).species[bare] ?? registrySpeciesName(formula);
}

/**
 * A reaction with its prose in `locale`. The equation, the state symbols and
 * the level assignments are untouched — they are notation and rules, not copy.
 */
export function localizeReaction(locale: Locale, reaction: ChemicalReaction): ChemicalReaction {
  const overlay = chemistryNameOverlay(locale).reactions[reaction.id];
  if (!overlay) return reaction;
  return {
    ...reaction,
    name: overlay.name,
    description: overlay.description,
    // A reaction with no English hint or prompt must not gain one in German:
    // the game checks for their absence to decide what to show.
    hint: reaction.hint === undefined ? undefined : (overlay.hint ?? reaction.hint),
    prompt: reaction.prompt === undefined ? undefined : (overlay.prompt ?? reaction.prompt),
  };
}

/** A Lewis molecule with its prose in `locale`; atoms, bonds and formula untouched. */
export function localizeLewisMolecule(
  locale: Locale,
  molecule: LewisMoleculeData
): LewisMoleculeData {
  const overlay = chemistryNameOverlay(locale).lewisMolecules[molecule.id];
  if (!overlay) return molecule;
  return {
    ...molecule,
    name: overlay.name,
    tier2Hint: overlay.tier2Hint,
    propertyLine: overlay.propertyLine,
  };
}
