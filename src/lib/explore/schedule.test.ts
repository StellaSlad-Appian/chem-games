// src/lib/explore/schedule.test.ts
//
// AC-6 (every card links inward, and the link is real) and AC-7 (the balance is
// enforced, not intended).
//
// These are the tests the feature is actually about. The page rendering is
// ordinary React and would be caught by anyone looking at it; a schedule that
// has quietly drifted into six men in a row, or an entry pointing at a game
// that was never finished, is invisible until a reader finds it.

import { describe, expect, it } from 'vitest';
import { CHEAT_SHEETS, GAME_LINKS } from '@/lib/cheat-sheet-data';
import { EXPLORE_MOLECULES } from './molecules';
import { EXPLORE_SCIENTISTS } from './scientists';
import { EXPLORE_SCHEDULE } from './schedule';
import type { ExploreLink, ExploreScientist } from './types';

const moleculeById = new Map(EXPLORE_MOLECULES.map((m) => [m.id, m] as const));
const scientistById = new Map(EXPLORE_SCIENTISTS.map((s) => [s.id, s] as const));

const scheduledScientists = EXPLORE_SCHEDULE.map(
  (pair) => scientistById.get(pair.scientistId)!
);

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

const describeLink = (link: ExploreLink) =>
  link.kind === 'cheat-sheet' ? `cheat-sheet:${link.slug}` : `game:${link.game}`;

const sameLink = (a: ExploreLink, b: ExploreLink) => describeLink(a) === describeLink(b);

// ---------------------------------------------------------------------------
// The schedule refers to things that exist
// ---------------------------------------------------------------------------

describe('the schedule', () => {
  it('names a molecule and a scientist that both exist', () => {
    const missing = EXPLORE_SCHEDULE.flatMap((pair, week) => [
      ...(moleculeById.has(pair.moleculeId) ? [] : [`week ${week + 1}: ${pair.moleculeId}`]),
      ...(scientistById.has(pair.scientistId) ? [] : [`week ${week + 1}: ${pair.scientistId}`]),
    ]);
    expect(missing).toEqual([]);
  });

  it('schedules every active entry exactly once, and nothing twice', () => {
    const moleculeIds = EXPLORE_SCHEDULE.map((p) => p.moleculeId);
    const scientistIds = EXPLORE_SCHEDULE.map((p) => p.scientistId);

    expect(new Set(moleculeIds).size).toBe(moleculeIds.length);
    expect(new Set(scientistIds).size).toBe(scientistIds.length);

    // An entry written but never scheduled is invisible; a reviewer should be
    // told rather than left to notice.
    const unscheduledMolecules = EXPLORE_MOLECULES.filter(
      (m) => m.isActive && !moleculeIds.includes(m.id)
    ).map((m) => m.id);
    const unscheduledScientists = EXPLORE_SCIENTISTS.filter(
      (s) => s.isActive && !scientistIds.includes(s.id)
    ).map((s) => s.id);

    expect({ unscheduledMolecules, unscheduledScientists }).toEqual({
      unscheduledMolecules: [],
      unscheduledScientists: [],
    });
  });

  it('is the launch size the brief decided on', () => {
    // Not a law of nature — appending is safe and the cycle simply lengthens.
    // It is here so that shrinking the pool is a deliberate edit rather than an
    // accident of a rebase.
    expect(EXPLORE_SCHEDULE).toHaveLength(20);
  });
});

// ---------------------------------------------------------------------------
// AC-7 — balance
// ---------------------------------------------------------------------------

describe('AC-7: the balance is an invariant, not an intention', () => {
  const count = (entries: ExploreScientist[], value: ExploreScientist['represents']) =>
    entries.filter((s) => s.represents === value).length;

  it('keeps |women − men| ≤ 1 over every prefix of the schedule', () => {
    // Prefix, not total. A pool that is fifty-fifty overall but front-loads six
    // men is still six weeks of six men for whoever was reading then.
    const offences: string[] = [];
    for (let end = 1; end <= scheduledScientists.length; end += 1) {
      const prefix = scheduledScientists.slice(0, end);
      const difference = count(prefix, 'woman') - count(prefix, 'man');
      if (Math.abs(difference) > 1) {
        offences.push(
          `after week ${end}: ${count(prefix, 'woman')} women, ${count(prefix, 'man')} men`
        );
      }
    }
    expect(offences).toEqual([]);
  });

  it('never runs two consecutive weeks with the same represents value', () => {
    // Except across an 'other' entry, which takes a slot without counting to
    // either side — so a non-binary scientist can be scheduled without anyone
    // having to decide which column they belong in.
    const runs: string[] = [];
    for (let week = 1; week < scheduledScientists.length; week += 1) {
      const previous = scheduledScientists[week - 1];
      const current = scheduledScientists[week];
      if (previous.represents === 'other' || current.represents === 'other') continue;
      if (previous.represents === current.represents) {
        runs.push(`weeks ${week} and ${week + 1} are both ${current.represents}`);
      }
    }
    expect(runs).toEqual([]);
  });

  it('ends the cycle within one of even', () => {
    expect(
      Math.abs(count(scheduledScientists, 'woman') - count(scheduledScientists, 'man'))
    ).toBeLessThanOrEqual(1);
  });

  it('spans more than the anglosphere, with every shipping language area present', () => {
    // Read off the prose rather than a country field, on purpose: a country
    // column would be one more thing to translate and one more thing to get
    // wrong, and what actually matters is that a German reader meets a German
    // chemist and a Spanish reader meets a Spanish one rather than a translated
    // American site. Update this list when the schedule changes.
    const languageAreaAnchors: Record<string, string> = {
      de: 'fritz-haber',
      fr: 'paul-sabatier',
      es: 'margarita-salas',
      it: 'giulio-natta',
      en: 'kathleen-lonsdale',
    };

    const scheduled = new Set(EXPLORE_SCHEDULE.map((p) => p.scientistId));
    const missing = Object.entries(languageAreaAnchors)
      .filter(([, id]) => !scheduled.has(id))
      .map(([locale, id]) => `${locale} (expected ${id})`);

    expect(missing).toEqual([]);
  });
});

describe('AC-7: every entry is the same shape and the same size', () => {
  it.each(EXPLORE_SCIENTISTS.map((s) => [s.id, s] as const))(
    '%s has a body in the 120–180 word band',
    (_id, scientist) => {
      // `work` + `legacy`. The optional credit line is excluded: it is
      // available to any entry and counting it would make the entries that use
      // it systematically longer, which is the opposite of the point.
      const length = words(scientist.work) + words(scientist.legacy);
      expect(length).toBeGreaterThanOrEqual(120);
      expect(length).toBeLessThanOrEqual(180);
    }
  );

  it.each(EXPLORE_MOLECULES.map((m) => [m.id, m] as const))(
    '%s has a body in the 120–180 word band',
    (_id, molecule) => {
      const length = words(molecule.everyday) + words(molecule.chemistry);
      expect(length).toBeGreaterThanOrEqual(120);
      expect(length).toBeLessThanOrEqual(180);
    }
  );

  it('uses the credit field sparingly', () => {
    const used = EXPLORE_SCIENTISTS.filter((s) => s.credit);
    expect(used.length).toBeLessThanOrEqual(Math.ceil(EXPLORE_SCIENTISTS.length / 4));
  });

  it('does not concentrate the credit field on one group', () => {
    // The failure this guards against is the one the section exists to counter:
    // every woman's entry a story about injustice and every man's a story about
    // discovery. Not more than twice as often for one value as the other.
    const used = EXPLORE_SCIENTISTS.filter((s) => s.credit);
    const women = used.filter((s) => s.represents === 'woman').length;
    const men = used.filter((s) => s.represents === 'man').length;

    if (women === 0 && men === 0) return;
    expect(Math.max(women, men)).toBeLessThanOrEqual(2 * Math.max(Math.min(women, men), 1));
  });

  it('keeps the credit field to a line, not a paragraph', () => {
    for (const scientist of EXPLORE_SCIENTISTS) {
      if (!scientist.credit) continue;
      expect(words(scientist.credit), scientist.id).toBeLessThanOrEqual(45);
    }
  });
});

// ---------------------------------------------------------------------------
// AC-6 — the links
// ---------------------------------------------------------------------------

describe('AC-6: every card links inward, and the target is real', () => {
  const sheetSlugs = new Set(CHEAT_SHEETS.map((sheet) => sheet.slug));
  const allEntries = [
    ...EXPLORE_MOLECULES.map((m) => [`molecule:${m.id}`, m.link] as const),
    ...EXPLORE_SCIENTISTS.map((s) => [`scientist:${s.id}`, s.link] as const),
  ];

  it.each(allEntries)('%s points at something that exists', (label, link) => {
    if (link.kind === 'cheat-sheet') {
      expect(sheetSlugs.has(link.slug), `${label} -> ${link.slug}`).toBe(true);
    } else {
      // GAME_LINKS is the list of games that are actually playable. A link to a
      // game that exists in `GameName` but is not in here — `bond-builder` — is
      // a link to a page nobody can play, which is worse than no link.
      expect(GAME_LINKS[link.game], `${label} -> ${link.game}`).toBeDefined();
    }
  });

  it('never links to a game that is in GameName but not active', () => {
    const inactive = allEntries.filter(
      ([, link]) => link.kind === 'game' && !GAME_LINKS[link.game]
    );
    expect(inactive).toEqual([]);
  });

  it('gives most weeks a shared destination', () => {
    // "Usually", not "always": AC-6 asks the pair to share a target wherever
    // the pairing allows, and stretching a link to satisfy a test is the exact
    // failure mode the rule exists to prevent. Two-thirds is the floor that
    // says the pairing is real without inviting a stretch.
    const shared = EXPLORE_SCHEDULE.filter((pair) =>
      sameLink(moleculeById.get(pair.moleculeId)!.link, scientistById.get(pair.scientistId)!.link)
    );
    expect(shared.length / EXPLORE_SCHEDULE.length).toBeGreaterThanOrEqual(2 / 3);
  });

  it('does not send two weeks in a row to the same place', () => {
    // Not an acceptance criterion — a courtesy to the reader, and a cheap way
    // to notice that the schedule has drifted into one corner of the syllabus.
    const repeats: string[] = [];
    for (let week = 1; week < EXPLORE_SCHEDULE.length; week += 1) {
      const previous = moleculeById.get(EXPLORE_SCHEDULE[week - 1].moleculeId)!.link;
      const current = moleculeById.get(EXPLORE_SCHEDULE[week].moleculeId)!.link;
      if (sameLink(previous, current)) {
        repeats.push(`weeks ${week} and ${week + 1} both go to ${describeLink(current)}`);
      }
    }
    expect(repeats).toEqual([]);
  });

  it('spreads across the library rather than leaning on one sheet', () => {
    const counts = new Map<string, number>();
    for (const [, link] of allEntries) {
      const key = describeLink(link);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    // 40 entries over the twelve sheets and five games: no single destination
    // should take more than a quarter of them.
    const worst = Math.max(...counts.values());
    expect(worst).toBeLessThanOrEqual(Math.ceil(allEntries.length / 4));
  });
});
