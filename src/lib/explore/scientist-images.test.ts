// src/lib/explore/scientist-images.test.ts
//
// The rule these tests exist to hold:
//
//     a free portrait  ->  else a free picture of their work  ->  else nothing
//
// "Nothing" is the part that rots. A placeholder is the obvious thing to reach
// for when a slot is empty, and for twenty entries this repo did exactly that
// — a dashed frame saying PICTURE TO COME, shipped to readers. The third arm
// of the rule is a decision, so it gets a test.
//
// The other half is the licence. The credit line under a picture is the
// condition on which most of these pictures may be shown at all, so "has a
// picture" and "says who took it" have to be the same assertion, not two.

import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { EXPLORE_SCIENTISTS } from './scientists';
import { SCIENTIST_IMAGES } from './scientist-images';

const PUBLIC = join(process.cwd(), 'public');

/** Licences that legally require the credit to reach the reader. */
const NEEDS_ATTRIBUTION = /^CC BY/;

/**
 * The widest the `<img>` is ever rendered, measured off the card on
 * 2026-09-22 — see `TARGET_WIDTH` in `scripts/scientist-images.mts`. Nothing
 * here asserts a file reaches it, because four of the historical portraits
 * simply do not exist any larger. It is the ceiling a file may not *exceed*,
 * which is a bytes-on-school-wifi question rather than a quality one.
 */
const TARGET_WIDTH = 900;

/** docs/EXPLORE_IMAGES.md: "Keep files under about 300 KB." */
const MAX_BYTES = 300 * 1024;

const ids = EXPLORE_SCIENTISTS.map((s) => s.id);

describe('scientist pictures', () => {
  it('only carries images for scientists that exist', () => {
    expect(Object.keys(SCIENTIST_IMAGES).sort()).toEqual(
      Object.keys(SCIENTIST_IMAGES)
        .filter((id) => ids.includes(id))
        .sort(),
    );
  });

  it('never ships a placeholder', () => {
    // The generator deletes these, but a hand-added one would sail past it.
    const placeholders = EXPLORE_SCIENTISTS.filter((s) => s.image?.src.endsWith('.svg'));
    expect(placeholders.map((s) => s.id)).toEqual([]);
  });

  it('leaves an entry with no picture with no `image` at all', () => {
    // Not `image: undefined`, and above all not a placeholder: the card tests
    // the field, and a reader sees nothing rather than a dashed frame.
    const withoutPicture = EXPLORE_SCIENTISTS.filter((s) => !SCIENTIST_IMAGES[s.id]);
    expect(withoutPicture.length).toBeGreaterThan(0); // else this test proves nothing
    for (const scientist of withoutPicture) {
      expect(Object.hasOwn(scientist, 'image')).toBe(false);
    }
  });

  describe.each(Object.entries(SCIENTIST_IMAGES))('%s', (id, image) => {
    it('points at a file that is really there', () => {
      expect(existsSync(join(PUBLIC, image.src))).toBe(true);
    });

    it('stays inside the weight budget', () => {
      expect(statSync(join(PUBLIC, image.src)).size).toBeLessThanOrEqual(MAX_BYTES);
    });

    it('declares a size the card can reserve', () => {
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
      expect(image.width).toBeLessThanOrEqual(TARGET_WIDTH);
    });

    it('says whether it shows the person or their work', () => {
      expect(['person', 'work']).toContain(image.subject);
    });

    it('credits whoever made it', () => {
      // Every picture here is somebody else's, including the public-domain
      // ones. Naming the photographer costs a line.
      expect(image.credit?.author).toBeTruthy();
      expect(image.credit?.licence).toBeTruthy();
      expect(image.credit?.sourceUrl).toMatch(/^https:\/\/(commons\.wikimedia\.org|en\.wikipedia\.org)\//);
    });

    it('links the licence when the licence requires attribution', () => {
      // A CC BY / CC BY-SA picture without a deed link is one whose terms the
      // reader cannot check, which is the part of compliance that is easy to
      // drop and impossible to notice.
      if (NEEDS_ATTRIBUTION.test(image.credit!.licence)) {
        expect(image.credit!.licenceUrl).toMatch(/^https:\/\/creativecommons\.org\/licenses\//);
      }
    });
  });
});
