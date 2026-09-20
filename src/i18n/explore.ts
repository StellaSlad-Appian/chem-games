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
import { EXPLORE_SCHEDULE } from '@/lib/explore/schedule';
import { selectForWeek, weekStart } from '@/lib/explore/rotation';
import type {
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
import { EXPLORE_OVERLAY_RU } from './explore/ru';

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
 * Every locale but English, and the type says so.
 *
 * `Record<Exclude<Locale, 'en'>, …>` rather than `Partial<Record<Locale, …>>`,
 * which is what this was until 2026-09-20 and is why Russian shipped without
 * an overlay: `Partial` makes an absent locale a legal value, so adding `ru` to
 * `LOCALES` compiled, every parity test kept passing, and a Russian reader got
 * English prose. Every other per-locale registry in this codebase is strict for
 * exactly that reason (src/i18n/config.ts § LOCALES), and this one now is too —
 * the seventh locale is a compile error until its file exists.
 *
 * English is excluded rather than optional: its prose comes straight from
 * `src/lib/explore/`, so there is nothing to duplicate and nothing to keep in
 * step. That is a different statement from "may be missing", and the type now
 * makes only the first one sayable.
 */
const OVERLAYS: Record<Exclude<Locale, 'en'>, ExploreOverlay> = {
  de: EXPLORE_OVERLAY_DE,
  fr: EXPLORE_OVERLAY_FR,
  es: EXPLORE_OVERLAY_ES,
  it: EXPLORE_OVERLAY_IT,
  ru: EXPLORE_OVERLAY_RU,
};

/** Exposed for the parity test. */
export { OVERLAYS as EXPLORE_OVERLAYS };

/**
 * The overlay for a locale, or `undefined` for English.
 *
 * The one place the `en` gap is handled, so the rest of the module can index
 * the strict record without a cast.
 */
function overlayFor(locale: Locale): ExploreOverlay | undefined {
  return locale === 'en' ? undefined : OVERLAYS[locale];
}

/** A molecule as the page renders it: prose resolved, notation untouched. */
export interface LocalizedMolecule {
  id: string;
  name: string;
  formula: string;
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
  const overlay = overlayFor(locale)?.molecules[molecule.id];
  const compound = molecule.compoundId ? registryCompound(molecule.compoundId) : undefined;

  return {
    id: molecule.id,
    // A registry species takes both its formula and its localized name from the
    // registry; anything else carries its own, and the overlay translates it.
    name: compound
      ? compoundName(locale, compound)
      : (overlay?.name ?? molecule.name ?? molecule.id),
    formula: compound ? compound.formula : (molecule.formula ?? ''),
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
  const overlay = overlayFor(locale)?.scientists[scientist.id];

  return {
    id: scientist.id,
    // Never translated, never overlaid.
    name: scientist.name,
    lifespan: scientist.lifespan,
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
 * Only entries that are still active can be scheduled. Retiring an entry with
 * `isActive: false` therefore drops its whole week rather than leaving half a
 * page — which is the right trade, because the pair is the unit of meaning.
 */
function activePairs() {
  const molecules = new Map(
    EXPLORE_MOLECULES.filter((m) => m.isActive).map((m) => [m.id, m] as const)
  );
  const scientists = new Map(
    EXPLORE_SCIENTISTS.filter((s) => s.isActive).map((s) => [s.id, s] as const)
  );

  return EXPLORE_SCHEDULE.map((pair) => {
    const molecule = molecules.get(pair.moleculeId);
    const scientist = scientists.get(pair.scientistId);
    return molecule && scientist ? { molecule, scientist } : null;
  }).filter((pair): pair is { molecule: ExploreMolecule; scientist: ExploreScientist } =>
    pair !== null
  );
}

/**
 * The week's pair, in the reader's language.
 *
 * `now` is a parameter and there is no clock in here: the page passes
 * `new Date()` and every test passes a fixed date. Throws rather than returning
 * `undefined` when nothing is schedulable, because an Explore page with no
 * entry on it is not a page.
 */
export function getExploreContent(locale: Locale, now: Date): ExploreWeek {
  const pairs = activePairs();
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

/**
 * Whether a locale falls back to the English prose.
 *
 * Since the registry became strict this is true of English alone, and that is
 * the point: there is no longer a second way for a locale to end up reading
 * the English.
 */
export const usesEnglishExploreProse = (locale: Locale): boolean =>
  locale === DEFAULT_LOCALE || !overlayFor(locale);

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
