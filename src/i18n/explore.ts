// src/i18n/explore.ts
//
// Explore content in the reader's language.
//
// The pattern is the cheat sheets': English in `src/lib/explore/` is the single
// source of truth for the structure, the ids, the formulae, the links and the
// dates, and each other locale contributes a **prose overlay** keyed by the
// same ids. Nothing here is a second copy of the pool, so adding a twenty-first
// molecule cannot leave a locale rendering a stale one — the ids no longer
// line up and `src/i18n/explore.test.ts` fails.
//
// **This module is loaded by the Explore page and by nothing else.** The
// entries are the largest body of prose the site has, and the shared dictionary
// is serialized into the RSC payload of every page — so entry prose lives here,
// the way a game's catalogue lives in its own file, and only the page chrome
// (headings, labels, the dateline pattern) goes in `dictionaries/<locale>.ts`
// under `explore`. See docs/i18n/README.md § What goes where.
//
// What is deliberately *not* in an overlay: ids, slugs, formulae, element
// symbols, URLs, ISO dates, lifespans, `represents`, and the names of people. A
// person's name is not a string to localize; the prose about them is.

import { COMPOUNDS_REGISTRY } from '@/core-engine/data/compounds';
import { GAME_LINKS } from '@/lib/cheat-sheet-data';
import { EXPLORE_MOLECULES } from '@/lib/explore/molecules';
import { EXPLORE_SCIENTISTS } from '@/lib/explore/scientists';
import {
  archiveRotation,
  entryRotation,
  recentWeeks,
  schedulablePairs,
  RECENT_WEEKS_LIMIT,
  type EntryRotation,
  type ExploreEntryKind,
} from '@/lib/explore/archive';
import { selectForWeek, weekStart } from '@/lib/explore/rotation';
import type {
  ExploreImage,
  ExploreLink,
  ExploreMolecule,
  ExploreScientist,
  ExploreSource,
} from '@/lib/explore/types';
import { compoundName } from './chemistry-names';
import { DEFAULT_LOCALE, type Locale } from './config';
import type { Dictionary } from './dictionaries';
import { gameTitle } from './game-titles';
import { getCheatSheet } from './cheat-sheets';
import { EXPLORE_OVERLAY_DE } from './explore/de';
import { EXPLORE_OVERLAY_FR } from './explore/fr';
import { EXPLORE_OVERLAY_ES } from './explore/es';
import { EXPLORE_OVERLAY_IT } from './explore/it';

/**
 * A molecule's translatable prose.
 *
 * `name` is optional and mirrors the English exactly: an entry that carries a
 * `compoundId` has no name of its own, because the name comes from
 * `COMPOUNDS_REGISTRY` and its translation from `chemistry-names/<locale>.ts`,
 * which already covers every registry compound in every locale. An overlay that
 * supplies a name for one of those, or omits one for the others, fails the
 * parity test — a translated name in two places is a translated name that can
 * disagree with itself.
 */
export interface ExploreMoleculeOverlay {
  name?: string;
  everyday: string;
  chemistry: string;
}

/** A scientist's translatable prose. The name and the dates are not here. */
export interface ExploreScientistOverlay {
  work: string;
  legacy: string;
  /** Present exactly when the English entry has one. */
  credit?: string;
}

export interface ExploreOverlay {
  molecules: Record<string, ExploreMoleculeOverlay>;
  scientists: Record<string, ExploreScientistOverlay>;
}

/**
 * No entry for English: the English prose comes straight from
 * `src/lib/explore/`, so there is nothing to duplicate and nothing to keep in
 * step.
 */
const OVERLAYS: Partial<Record<Locale, ExploreOverlay>> = {
  de: EXPLORE_OVERLAY_DE,
  fr: EXPLORE_OVERLAY_FR,
  es: EXPLORE_OVERLAY_ES,
  it: EXPLORE_OVERLAY_IT,
};

/** Exposed for the parity test. */
export { OVERLAYS as EXPLORE_OVERLAYS };

/**
 * Locales whose Explore **content** is deliberately not written yet.
 *
 * Owner's decision, 2026-09-19: ship this page in five languages and add
 * Russian afterwards, rather than hold twenty pairs of finished prose behind
 * roughly 6,500 words of translation. That is a real exception to the
 * every-locale rule in docs/i18n/GAMES.md, so it is written down, dated and
 * narrow rather than implied by an absent file.
 *
 * What a Russian reader gets: the page, in Russian chrome — headings, dateline,
 * calls to action and the linked destination are all translated — with the
 * twenty entries' prose still in English, above a line that says so. That is
 * worse than a translation and better than either of the alternatives, which
 * were to hide a finished feature from one language or to serve English with no
 * acknowledgement that it is a gap.
 *
 * **This list is asserted in both directions.** `explore.test.ts` fails if a
 * locale here has an overlay (finish the job, then delete the entry) and fails
 * if a locale absent from here has no overlay (the usual missing-translation
 * gate, unchanged). It cannot rot into a way of skipping a language quietly.
 */
export const EXPLORE_UNTRANSLATED_LOCALES = ['ru'] as const satisfies readonly Locale[];

/** True when this locale reads the English prose because its own is not written. */
export function exploreProseIsUntranslated(locale: Locale): boolean {
  return (EXPLORE_UNTRANSLATED_LOCALES as readonly Locale[]).includes(locale);
}

/** A molecule as the page renders it: prose resolved, notation untouched. */
export interface LocalizedMolecule {
  id: string;
  name: string;
  formula: string;
  image?: ExploreImage;
  everyday: string;
  chemistry: string;
  link: ExploreLink;
  sources: ExploreSource[];
  sourcesVerifiedOn: string;
}

/** A scientist as the page renders it. `represents` is not in this shape. */
export interface LocalizedScientist {
  id: string;
  name: string;
  lifespan: string;
  image?: ExploreImage;
  work: string;
  legacy: string;
  credit?: string;
  link: ExploreLink;
  sources: ExploreSource[];
  sourcesVerifiedOn: string;
}

export interface ExploreWeek {
  /** Monday 00:00 UTC of the week being shown; the page formats it with `Intl`. */
  weekStart: Date;
  molecule: LocalizedMolecule;
  scientist: LocalizedScientist;
}

function registryCompound(compoundId: string) {
  const compound = COMPOUNDS_REGISTRY.find((entry) => entry.id === compoundId);
  if (!compound) {
    // A typo here would otherwise render a card with an empty formula, which is
    // worse than a build that stops: an empty formula looks like a design
    // choice. `molecules.test.ts` catches this long before a reader could.
    throw new Error(
      `explore: molecule references COMPOUNDS_REGISTRY id '${compoundId}', which does not exist.`
    );
  }
  return compound;
}

export function localizeMolecule(locale: Locale, molecule: ExploreMolecule): LocalizedMolecule {
  const overlay = OVERLAYS[locale]?.molecules[molecule.id];
  const compound = molecule.compoundId ? registryCompound(molecule.compoundId) : undefined;

  return {
    id: molecule.id,
    // A registry species takes both its formula and its localized name from the
    // registry; anything else carries its own, and the overlay translates it.
    name: compound
      ? compoundName(locale, compound)
      : (overlay?.name ?? molecule.name ?? molecule.id),
    formula: compound ? compound.formula : (molecule.formula ?? ''),
    // Structure, not prose: the same file in every locale, like the link.
    image: molecule.image,
    everyday: overlay?.everyday ?? molecule.everyday,
    chemistry: overlay?.chemistry ?? molecule.chemistry,
    link: molecule.link,
    sources: molecule.sources,
    sourcesVerifiedOn: molecule.sourcesVerifiedOn,
  };
}

export function localizeScientist(
  locale: Locale,
  scientist: ExploreScientist
): LocalizedScientist {
  const overlay = OVERLAYS[locale]?.scientists[scientist.id];

  return {
    id: scientist.id,
    // Never translated, never overlaid.
    name: scientist.name,
    lifespan: scientist.lifespan,
    image: scientist.image,
    work: overlay?.work ?? scientist.work,
    legacy: overlay?.legacy ?? scientist.legacy,
    // An entry with no English credit line must not gain one in German: the
    // section is rationed on purpose, and an overlay is not where that decision
    // gets made.
    credit: scientist.credit === undefined ? undefined : (overlay?.credit ?? scientist.credit),
    link: scientist.link,
    sources: scientist.sources,
    sourcesVerifiedOn: scientist.sourcesVerifiedOn,
  };
}

/**
 * The week's pair, in the reader's language.
 *
 * `now` is a parameter and there is no clock in here: the page passes
 * `new Date()` and every test passes a fixed date. Throws rather than returning
 * `undefined` when nothing is schedulable, because an Explore page with no
 * entry on it is not a page.
 *
 * The pool comes from `schedulablePairs()` in `lib/explore/archive.ts`, which
 * is the same list the recent list, the archive index and every permalink
 * count. It used to be a private copy of that filter in this file; two copies
 * would be two cycle lengths, and the archive would disagree with the page
 * above it about which week showed what.
 */
export function getExploreContent(locale: Locale, now: Date): ExploreWeek {
  const pairs = schedulablePairs();
  if (pairs.length === 0) {
    throw new Error(
      'explore: no schedulable pairs. Every pair in EXPLORE_SCHEDULE references an ' +
        'entry that is missing or has isActive: false. Re-activate one, or remove ' +
        'the page from the navigation — it cannot render empty.'
    );
  }

  const pair = selectForWeek(pairs, now);
  return {
    weekStart: weekStart(now),
    molecule: localizeMolecule(locale, pair.molecule),
    scientist: localizeScientist(locale, pair.scientist),
  };
}

/** Whether a locale falls back to the English prose. */
export const usesEnglishExploreProse = (locale: Locale): boolean =>
  locale === DEFAULT_LOCALE || !OVERLAYS[locale];

// ---------------------------------------------------------------------------
// The archive
// ---------------------------------------------------------------------------
//
// Localized views over `src/lib/explore/archive.ts`. The arithmetic is all
// there and takes `now` as a parameter; this layer only resolves prose. Read
// the header of that file before trusting a date on any of these pages — the
// archive is derived from today's schedule, not recorded week by week.

export { RECENT_WEEKS_LIMIT } from '@/lib/explore/archive';
export type { ExploreEntryKind } from '@/lib/explore/archive';

/**
 * A past week, shaped exactly like the current one.
 *
 * `ExploreWeek` already means "a week's pair, resolved for a reader", and a
 * past week is the same thing with a different date — so it is the same type
 * rather than a near-duplicate of it. docs/AGENT_INSTRUCTIONS.md Part B is
 * explicit about this repo's habit of growing competing shapes.
 */
export type ExplorePastWeek = ExploreWeek;

/** The most recent past weeks, newest first, in the reader's language. */
export function getExploreRecent(
  locale: Locale,
  now: Date,
  limit: number = RECENT_WEEKS_LIMIT
): ExplorePastWeek[] {
  return recentWeeks(now, limit).map((week) => ({
    weekStart: week.weekStart,
    molecule: localizeMolecule(locale, week.pair.molecule),
    scientist: localizeScientist(locale, week.pair.scientist),
  }));
}

/**
 * One row of the archive index: a pair, resolved, with the dates that say where
 * it sits in the rotation.
 *
 * `lastFeatured` is null until the pair's first week, and `nextFeatured` is
 * always set — see `EntryRotation` in lib/explore/archive.ts for why a pair is
 * described by two dates rather than one.
 */
export interface LocalizedRotationEntry {
  molecule: LocalizedMolecule;
  scientist: LocalizedScientist;
  cycleWeeks: number;
  timesFeatured: number;
  lastFeatured: Date | null;
  nextFeatured: Date;
  isCurrentWeek: boolean;
}

function localizeRotation(locale: Locale, rotation: EntryRotation): LocalizedRotationEntry {
  return {
    molecule: localizeMolecule(locale, rotation.pair.molecule),
    scientist: localizeScientist(locale, rotation.pair.scientist),
    cycleWeeks: rotation.cycleWeeks,
    timesFeatured: rotation.timesFeatured,
    lastFeatured: rotation.lastFeatured,
    nextFeatured: rotation.nextFeatured,
    isCurrentWeek: rotation.isCurrentWeek,
  };
}

/** Every pair in the rotation, in the order they come round. */
export function getExploreArchive(locale: Locale, now: Date): LocalizedRotationEntry[] {
  return archiveRotation(now).map((rotation) => localizeRotation(locale, rotation));
}

/**
 * One entry by id, for its permalink.
 *
 * Looks in the **whole pool**, not in the rotation: an entry retired with
 * `isActive: false` keeps its URL, which is the reason that flag exists (see
 * `ExploreProvenance` in lib/explore/types.ts). It takes no `now`, so
 * `generateMetadata` can resolve a title without consulting a clock.
 *
 * Returns null only when the id is not in the pool at all, which is the page's
 * cue to call `notFound()`.
 */
export function findLocalizedMolecule(locale: Locale, id: string): LocalizedMolecule | null {
  const molecule = EXPLORE_MOLECULES.find((entry) => entry.id === id);
  return molecule ? localizeMolecule(locale, molecule) : null;
}

/** As `findLocalizedMolecule`, for the scientists' pool. */
export function findLocalizedScientist(locale: Locale, id: string): LocalizedScientist | null {
  const scientist = EXPLORE_SCIENTISTS.find((entry) => entry.id === id);
  return scientist ? localizeScientist(locale, scientist) : null;
}

/**
 * Where one entry sits in the rotation, in the reader's language.
 *
 * Null for an entry that is in the pool but not in the active rotation — a
 * retired entry, or one whose partner is retired, since the pair is the unit of
 * meaning. Its permalink still resolves; it simply carries no dates and no link
 * to a pair, which is the honest rendering rather than an invented one.
 */
export function getEntryRotation(
  locale: Locale,
  kind: ExploreEntryKind,
  id: string,
  now: Date
): LocalizedRotationEntry | null {
  const found = entryRotation(kind, id, now);
  return found ? localizeRotation(locale, found) : null;
}

/** Every permalink this feature publishes, for `generateStaticParams`. */
export const exploreMoleculeIds = (): string[] => EXPLORE_MOLECULES.map((entry) => entry.id);
export const exploreScientistIds = (): string[] => EXPLORE_SCIENTISTS.map((entry) => entry.id);

/**
 * Where a card's call to action goes, and what it is called there.
 *
 * The title comes from the registry that owns it — a cheat sheet's from the
 * cheat-sheet overlay, a game's from `gameTitle()` — so a card in French names
 * the French sheet, and neither title is written down a second time here.
 */
export function exploreLinkTarget(
  locale: Locale,
  t: Dictionary,
  link: ExploreLink
): { href: string; title: string } {
  if (link.kind === 'cheat-sheet') {
    const sheet = getCheatSheet(locale, link.slug);
    if (!sheet) {
      throw new Error(
        `explore: link points at cheat sheet '${link.slug}', which is not in CHEAT_SHEETS.`
      );
    }
    return { href: `/cheat-sheets/${link.slug}`, title: sheet.title };
  }

  const game = GAME_LINKS[link.game];
  if (!game) {
    throw new Error(
      `explore: link points at game '${link.game}', which has no entry in GAME_LINKS — ` +
        'either it does not exist or it is not active yet. An entry linking to an ' +
        'inactive game is worse than an entry with no link.'
    );
  }
  return { href: game.href, title: gameTitle(t, link.game, game.title) };
}
