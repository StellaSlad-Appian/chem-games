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
 * No entry for the default locale: English names come straight from the
 * registries, so there is nothing to duplicate and nothing to keep in sync.
 */
const OVERLAYS: Partial<Record<Locale, ChemistryNameOverlay>> = {
  de: {
    elements: ELEMENT_NAMES_DE,
    compounds: COMPOUND_NAMES_DE,
    ions: ION_NAMES_DE,
    species: SPECIES_NAMES_DE,
    reactions: REACTION_TEXT_DE,
    lewisMolecules: LEWIS_MOLECULE_TEXT_DE,
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
