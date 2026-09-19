// src/lib/explore/types.ts
//
// The shapes both Explore content types share. Deliberately one small file
// rather than an addition to `core-engine/types/general.ts`: nothing in the
// game engine knows or should know about editorial content, and
// docs/AGENT_INSTRUCTIONS.md Part B records that this repo already has
// competing near-duplicate shapes for reaction data. These are new shapes with
// no existing counterpart — grepped for `writtenOn`, `reviewedOn`,
// `sourcesVerifiedOn`, `represents` and `isActive` before adding them.

import type { GameName } from '@/core-engine/types/general';

/**
 * Where an entry sends the reader next.
 *
 * A discriminated union rather than a bare string, because the two kinds
 * resolve their title differently — a cheat sheet's through the cheat-sheet
 * overlay, a game's through `gameTitle()` — and because a test can then assert
 * each kind against the registry that actually owns it.
 *
 * There is no third kind on purpose. "Link to /games because that is where the
 * games are" is the failure mode AC-6 exists to prevent: the link has to teach
 * the chemistry the card is about, or the entry does not ship.
 */
export type ExploreLink =
  | { kind: 'cheat-sheet'; slug: string }
  | { kind: 'game'; game: GameName };

/**
 * A citable source for the facts in an entry.
 *
 * Labels stay in English, for the same reason the cheat sheets' resource labels
 * do: they are the names of English-language institutions and documents, and
 * renaming "Science History Institute" in French makes it harder to find, not
 * easier. That the linked material is English-only is a real gap for a German
 * reader, recorded in docs/i18n/README.md § Known gaps rather than papered over.
 */
export interface ExploreSource {
  label: string;
  url: string;
}

/**
 * The freshness and provenance every entry carries (AC-9).
 *
 * Three dates rather than one because they rot at different speeds: the prose
 * is written once, the chemistry is re-read on a cycle, and the URLs go stale
 * on their own schedule. `freshness.test.ts` fails the build when an active
 * entry's `reviewedOn` or `sourcesVerifiedOn` passes 3.5 years, and says what
 * to do about it.
 */
export interface ExploreProvenance {
  /** ISO date the English prose was first written. */
  writtenOn: string;
  /** ISO date the chemistry and the claims were last checked. */
  reviewedOn: string;
  /** ISO date every `sources` URL was last confirmed to resolve. */
  sourcesVerifiedOn: string;
  sources: ExploreSource[];
  /**
   * Retires an entry without deleting it or disturbing the ids, so a later
   * archive at /explore/molecules/<id> keeps resolving.
   */
  isActive: boolean;
}

export interface ExploreMolecule extends ExploreProvenance {
  /** Stable, lowercase-hyphen, never translated; the future permalink segment. */
  id: string;
  /**
   * The `COMPOUNDS_REGISTRY` id, when the species is already in the registry.
   *
   * When this is set, `name` and `formula` must be **absent**: the registry is
   * the single source of truth for both, the English name comes from it and the
   * translated name comes from `chemistry-names/<locale>.ts`, which already
   * covers every registry compound. `molecules.test.ts` asserts the exclusivity
   * in both directions, so the two can never disagree.
   */
  compoundId?: string;
  /** English name — only for a species the registry does not hold. */
  name?: string;
  /** Plain-ASCII formula for `MoleculeText` — only for a species the registry does not hold. */
  formula?: string;
  /** Where the reader meets it.
   * Together with `chemistry`, 120–180 English words. */
  everyday: string;
  /** The chemistry that makes it work. */
  chemistry: string;
  link: ExploreLink;
}

export interface ExploreScientist extends ExploreProvenance {
  /** Stable, lowercase-hyphen, never translated. */
  id: string;
  /** Never translated. A person's name is not a string to localize. */
  name: string;
  /** '1903–1971' or 'b. 1941'. A date, so never translated and never in an overlay. */
  lifespan: string;
  /**
   * **Scheduling metadata. Never rendered — there is no code path that puts
   * this on screen, and `schedule.test.ts` is what keeps the schedule balanced
   * so that nothing has to be.**
   *
   * Being labelled as "the woman" is itself the bias this section exists to
   * correct; a reader who wants to notice the balance can read the page over a
   * few weeks. `'other'` takes a slot without counting toward either side of
   * the balance invariant, so a non-binary scientist can be scheduled without
   * anyone having to decide which column they belong in.
   */
  represents: 'woman' | 'man' | 'other';
  /** What they did — leads with the science. With `legacy`, 120–180 English words. */
  work: string;
  /** Why it mattered. */
  legacy: string;
  /**
   * Optional, at most one or two sentences: who was overlooked, who took the
   * credit, what it cost.
   *
   * Optional and rationed on purpose. If every woman's entry is a story about
   * injustice and every man's is a story about discovery, the section teaches
   * that men do chemistry and women have things done to them — which is the
   * opposite of the point. `schedule.test.ts` caps the count and checks it is
   * not concentrated on one `represents` value.
   */
  credit?: string;
  link: ExploreLink;
}

/**
 * One week: a molecule and a scientist chosen together.
 *
 * A list of pairs rather than two independent lists, so the page teaches one
 * idea per week and the "the link must match the content" rule is easy rather
 * than a struggle — the two cards usually share a destination.
 */
export interface ExplorePair {
  /**
   * What the week is about, in English, for whoever is editing the schedule.
   * Never rendered and never translated.
   */
  theme: string;
  moleculeId: string;
  scientistId: string;
}
