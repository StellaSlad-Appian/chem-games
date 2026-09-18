// src/i18n/game-data.ts
//
// Localizing the chemistry *data* a game plays with, as opposed to its UI copy.
//
// Reaction Balancer and Share to Fill both read prose straight out of the
// core-engine datasets: a reaction's name, its observation, its strategy hint
// and its word equation; a molecule's name, its hint and its property line; a
// species' everyday name. None of that belongs in the UI dictionary — it is
// keyed by the dataset's own ids, so it lives in the chemistry-names overlay
// next to the element and compound names (docs/i18n/README.md § Why overlays).
//
// The translation happens once, where a level plan is built, rather than at
// every place a name is rendered. That keeps the rules engines and the
// components reading `round.reaction.name` exactly as they did before, and it
// means a name cannot be localized in one message and left English in another.
//
// What is never touched: equations, formulae, bond lines, state symbols, atom
// lists and level assignments. Those are notation and rules.

import type { LewisMoleculeData } from '@/core-engine/types/chemistry';
import type { BalancerRound, ParsedReaction, Species } from '@/core-engine/utils/balancer-utils';
import { localizeLewisMolecule, localizeReaction, speciesName } from './chemistry-names';
import type { Locale } from './config';

/** A species with its everyday name in `locale`; the formula is untouched. */
export const localizeSpecies = (species: Species, locale: Locale): Species => ({
  ...species,
  name: speciesName(locale, species.bare),
});

export const localizeParsedReaction = (parsed: ParsedReaction, locale: Locale): ParsedReaction => {
  const reactants = parsed.reactants.map((s) => localizeSpecies(s, locale));
  const products = parsed.products.map((s) => localizeSpecies(s, locale));
  return { ...parsed, reactants, products, species: [...reactants, ...products] };
};

export const localizeBalancerRound = (round: BalancerRound, locale: Locale): BalancerRound => ({
  ...round,
  reaction: localizeReaction(locale, round.reaction),
  parsed: localizeParsedReaction(round.parsed, locale),
});

export const localizeBalancerRounds = (rounds: BalancerRound[], locale: Locale): BalancerRound[] =>
  rounds.map((round) => localizeBalancerRound(round, locale));

/** A Lewis molecule with its prose in `locale`; atoms, bonds and formula untouched. */
export const localizeMolecule = (molecule: LewisMoleculeData, locale: Locale): LewisMoleculeData =>
  localizeLewisMolecule(locale, molecule);

/** The molecules of a planned level, translated. `T` keeps the round's own shape. */
export const localizeMoleculeRounds = <T extends { molecule: LewisMoleculeData }>(
  rounds: T[],
  locale: Locale
): T[] => rounds.map((round) => ({ ...round, molecule: localizeMolecule(round.molecule, locale) }));
