// scripts/scientist-images.mts
//
// Scientist of the Week pictures: download, check the licence, normalise.
//
//     npm run explore:scientist-images
//
// Unlike `molecule-images.mts`, nothing here is drawn. A portrait is a
// photograph of a real person and there is no generating one, so every file is
// **found** — which makes the licence, not the drawing, the hard part.
//
// ## What this script is for
//
// Three jobs, and the second is the reason it exists at all:
//
//  1. Fetch each source file from Wikimedia at full resolution and normalise
//     it — one width, JPEG, no EXIF.
//  2. **Re-check every licence against Wikimedia's own metadata on each run**
//     and fail if it moved. `MANIFEST` records what the licence was when the
//     picture was chosen; Commons files do get re-tagged, relicensed and
//     occasionally deleted as copyright problems come to light, and a picture
//     that quietly stopped being free is exactly the failure nobody notices.
//     `credit` in `scientists.ts` is what we tell the reader, so it has to be
//     re-derived from upstream rather than trusted because it was true once.
//  3. Print the `image:` block for each entry, so the width and height in
//     `scientists.ts` are measured from the file rather than typed from memory.
//
// ## The rule that decides what goes in a slot
//
//     a free portrait  ->  else a free picture of their work  ->  else nothing
//
// "Nothing" means the entry has no `image` field at all and the card renders
// with no gap — **not** a placeholder. The dashed "PICTURE TO COME" frames that
// used to fill these twenty slots are gone. See docs/EXPLORE_IMAGES.md.
//
// Two of the twenty land past the first arrow, and both are recorded in
// `MANIFEST` with the reason:
//
//  - **Gilbert N. Lewis** — the only portrait on Wikipedia is tagged non-free
//    (fair use), which is a licence we cannot take. His own 1902 memorandum
//    sketching cubical atoms is PD-US, and is the better picture anyway: it is
//    the drawing his card is about.
//  - **Marie Maynard Daly** — see the note at her entry. There is a portrait on
//    Commons; it is not one we should use.
//
// ## Why not `assets/explore/`, like the molecule sources
//
// The five molecule sources are committed there because the script *transforms*
// them — recolours them against a map that has to be maintained next to the
// file. Nothing here is transformed beyond a resize, so committing ~17 MB of
// originals would buy nothing. What ships is the processed file in `public/`;
// this script rebuilds it from upstream on demand.

import { mkdir, writeFile, readdir, unlink, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'explore', 'scientists');

const UA =
  'chem-games explore-images/1.0 (https://github.com/stella-slad/chem-games; educational site)';

/**
 * How wide the processed file is, in pixels.
 *
 * Measured, not inherited. The old placeholders declared 720×400, but that was
 * the placeholder's own size and never the size of the slot. On 2026-09-22 the
 * rendered `<img>` in `ScientistCard` was measured at every breakpoint:
 *
 * | viewport | slot width | why |
 * | --- | --- | --- |
 * | 390 (phone) | 306 px | `w-full` inside the card's padding |
 * | 639 (just under `sm`) | **555 px** | still `w-full`, and the widest it ever gets |
 * | 1280 (desktop, landscape file) | 331 px | `sm:w-2/5`, capped by `sm:max-w-sm` |
 * | 1280 (desktop, portrait file) | 210 px | `sm:w-1/3 sm:max-w-[210px]` |
 *
 * So 555 CSS px is the ceiling, and it happens on a *small* screen, where the
 * float has not kicked in yet. 900 px is ~1.6× that, which covers a 2× display
 * at the widest case and a 3× phone at 306 px, without the weight of the ~1440
 * the old doc guessed at. Every file lands comfortably under the 300 KB budget.
 *
 * Nothing is ever enlarged past its native width — see `withoutEnlargement`.
 * Four of the historical portraits are smaller than this and stay smaller;
 * that is the best that exists, and upscaling would only add bytes.
 */
const TARGET_WIDTH = 900;

/** JPEG quality. 82 + mozjpeg keeps every one of these under 300 KB. */
const QUALITY = 82;

type Wiki = 'commons' | 'en';

interface Entry {
  /** The file name on the wiki, without the `File:` prefix. */
  file: string;
  /** Which wiki hosts it. A few free files live only on English Wikipedia. */
  wiki: Wiki;
  /** The file description page, for the credit line. */
  page: string;
  /**
   * The licence as we show it to the reader.
   *
   * Checked against upstream on every run; a mismatch fails the build rather
   * than warning. See `upstream` for why the two are separate strings.
   */
  licence: string;
  /**
   * What the wiki's own `LicenseShortName` says, when that differs from the
   * label above.
   *
   * The wikis use house abbreviations that are not written for a reader:
   * Commons tags the Flickr Commons statement "No restrictions", which sounds
   * like a promise nobody made, and English Wikipedia tags US public domain
   * "PD-US". We display the longer, honest phrasing and check against this.
   *
   * Keeping both is what lets the check stay strict. Loosening it to a
   * substring match would let a file slip from "CC BY-SA 4.0" to something
   * else that merely contains the same letters, and the whole point of the
   * check is to catch a licence moving under us.
   */
  upstream?: string;
  /** Rendered verbatim in the credit line. Never translated — it is a name. */
  author: string;
  /**
   * `person` — a picture of them. `work` — a picture of what they did, used
   * only when no free portrait exists. Drives which alt-text string the card
   * uses, so it must be right: captioning a manuscript "Picture: Gilbert N.
   * Lewis" would be a lie told to exactly the readers who cannot check it.
   */
  subject: 'person' | 'work';
  /** Why this file, in one line. */
  why: string;
}

/**
 * Licence deed URLs. The credit line links the licence name here, so a reader
 * can see the terms rather than take our word for what "CC BY-SA 4.0" allows.
 *
 * `Public domain` and `No known copyright restrictions` are not licences and
 * are absent on purpose — the first has no terms to read, and the second is a
 * statement by the holding institution rather than a grant. An entry on either
 * gets a credit line with no deed link, which `ScientistCard` handles by
 * rendering the licence as plain text instead of a link.
 */
const DEEDS: Record<string, string> = {
  'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY-SA 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'No known copyright restrictions': 'https://www.flickr.com/commons/usage/',
};

const commons = (f: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(f.replace(/ /g, '_'))}`;
const enwiki = (f: string) =>
  `https://en.wikipedia.org/wiki/File:${encodeURIComponent(f.replace(/ /g, '_'))}`;

/**
 * One entry per scientist that has a picture.
 *
 * Keyed by the entry `id` in `src/lib/explore/scientists.ts`. An id missing
 * from here is not an error — it is the third arm of the rule at the top of
 * this file, and the run prints it so the decision stays visible.
 */
const MANIFEST: Record<string, Entry> = {
  'kikunae-ikeda': {
    file: 'Kikunae Ikeda.jpg',
    wiki: 'commons',
    page: commons('Kikunae Ikeda.jpg'),
    licence: 'Public domain',
    author: 'Unknown photographer',
    subject: 'person',
    why: 'The standard portrait.',
  },
  'susan-solomon': {
    file: 'Crafoord Prize EM1B0739 (28456528038).jpg',
    wiki: 'commons',
    page: commons('Crafoord Prize EM1B0739 (28456528038).jpg'),
    licence: 'CC BY 2.0',
    author: 'Bengt Nyman',
    subject: 'person',
    why: 'At the 2018 Crafoord Prize. The best-lit free portrait of her.',
  },
  'fritz-haber': {
    file: 'Portret van Professor Fritz Haber, een chemicus uit Duitsland (foto 1918- 1934), SFA002023057.jpg',
    wiki: 'commons',
    page: commons(
      'Portret van Professor Fritz Haber, een chemicus uit Duitsland (foto 1918- 1934), SFA002023057.jpg',
    ),
    licence: 'Public domain',
    author: 'Unknown photographer — Spaarnestad Photo',
    subject: 'person',
    why: 'A large, clean studio portrait.',
  },
  'paul-sabatier': {
    file: 'Paul Sabatier.jpg',
    wiki: 'commons',
    page: commons('Paul Sabatier.jpg'),
    licence: 'Public domain',
    author: 'Nobel Foundation',
    subject: 'person',
    why: 'The 1912 Nobel portrait.',
  },
  'reatha-clark-king': {
    file: 'Reatha King 2009.jpg',
    wiki: 'commons',
    page: commons('Reatha King 2009.jpg'),
    licence: 'CC BY-SA 2.0',
    author: 'VocalEssence Ensemble Singers',
    subject: 'person',
    why: 'The only free portrait of her on Commons.',
  },
  'gilbert-lewis': {
    file: 'Lewis-cubic-notes.jpg',
    wiki: 'en',
    page: enwiki('Lewis-cubic-notes.jpg'),
    licence: 'Public domain',
    upstream: 'PD-US',
    author: 'Gilbert N. Lewis',
    subject: 'work',
    // The portrait at en:File:Gilbert N Lewis.jpg is tagged non-free / fair
    // use, which is not a licence we can take. This is better regardless.
    why: 'His own 1902 memorandum drawing cubical atoms — the ancestor of the dot diagram his card is about. No free portrait exists.',
  },
  'stephanie-kwolek': {
    file: 'Stephanie Kwolek 1986.TIF',
    wiki: 'commons',
    page: commons('Stephanie Kwolek 1986.TIF'),
    licence: 'CC BY-SA 3.0',
    author: 'Science History Institute',
    subject: 'person',
    // Upstream is a TIFF, which no browser shows. Converted here.
    why: 'In the lab, 1986. The source is a TIFF and is converted to JPEG.',
  },
  'akira-yoshino': {
    file: 'Akira Yoshino 20170920 (cropped 2).jpg',
    wiki: 'commons',
    page: commons('Akira Yoshino 20170920 (cropped 2).jpg'),
    licence: 'CC BY 4.0',
    author: '大臣官房人事課 (Minister’s Secretariat Personnel Division, Japan)',
    subject: 'person',
    why: 'An official portrait, already cropped to head and shoulders.',
  },
  'margarita-salas': {
    file: 'Margarita Salas Falgueras 062019.jpg',
    wiki: 'commons',
    page: commons('Margarita Salas Falgueras 062019.jpg'),
    licence: 'CC BY-SA 4.0',
    author: 'LaMèreVeille',
    subject: 'person',
    why: 'A 2019 portrait, large and sharp.',
  },
  'alfred-werner': {
    file: 'Alfred Werner ETH-Bib Portr 09965.jpg',
    wiki: 'commons',
    page: commons('Alfred Werner ETH-Bib Portr 09965.jpg'),
    licence: 'CC BY-SA 3.0',
    author: 'ETH-Bibliothek Zürich, Bildarchiv',
    subject: 'person',
    why: 'From the ETH image archive, which released its portrait series freely.',
  },
  'johanna-dobereiner': {
    file: 'Johanna-Döbereiner.jpg',
    wiki: 'commons',
    page: commons('Johanna-Döbereiner.jpg'),
    licence: 'CC BY-SA 4.0',
    author: 'Unknown — via Wikimedia Commons',
    subject: 'person',
    // 180x250 and the only free picture of her anywhere on Commons. It is
    // essentially native at the 210 px desktop portrait slot and soft at the
    // 555 px full-width one. A real portrait slightly soft beats no portrait.
    why: 'The only free portrait of her that exists. Small — 180 px wide, so it is not enlarged and is soft at full width on a phone.',
  },
  'vladimir-prelog': {
    file: 'Vladimir Prelog ETH-Bib Portr 00214.jpg',
    wiki: 'commons',
    page: commons('Vladimir Prelog ETH-Bib Portr 00214.jpg'),
    licence: 'CC BY-SA 3.0',
    author: 'ETH-Bibliothek Zürich, Bildarchiv',
    subject: 'person',
    why: 'From the same ETH archive series as Werner.',
  },
  'maria-telkes': {
    file: 'Maria Telkes NYWTS.jpg',
    wiki: 'commons',
    page: commons('Maria Telkes NYWTS.jpg'),
    licence: 'Public domain',
    author: 'New York World-Telegram and the Sun staff photographer',
    subject: 'person',
    why: 'The NYWT&S press photograph — the collection was dedicated to the public.',
  },
  'tu-youyou': {
    file: 'D810 4987 Tu Youyou, medicine (22945001843) (cropped).jpg',
    wiki: 'commons',
    page: commons('D810 4987 Tu Youyou, medicine (22945001843) (cropped).jpg'),
    licence: 'CC BY 2.0',
    author: 'Bengt Nyman',
    subject: 'person',
    why: 'At the 2015 Nobel week, cropped to the portrait.',
  },
  'dan-shechtman': {
    file: 'Nobel Prize 2011-Nobel interviews KVA-DSC 8039.jpg',
    wiki: 'commons',
    page: commons('Nobel Prize 2011-Nobel interviews KVA-DSC 8039.jpg'),
    licence: 'CC BY-SA 3.0',
    author: 'Holger Motzkau',
    subject: 'person',
    why: 'During the 2011 Nobel interviews.',
  },
  // ---------------------------------------------------------------------
  // marie-maynard-daly is deliberately absent. See NO_PICTURE below.
  // ---------------------------------------------------------------------
};

/**
 * Entries that end at the third arm of the rule — no picture at all, and no
 * placeholder either.
 *
 * Recorded here rather than merely omitted, so the reason survives and nobody
 * re-adds a file that was rejected on purpose. `scientist-images.test.ts`
 * asserts every id here has no `image` in `scientists.ts`.
 */
const NO_PICTURE: Record<string, string> = {
  'kathleen-lonsdale':
    'commons:File:Kathleen Yardley Lonsdale (1903-1971).jpg carries {{Flickr-no '
    + 'known copyright restrictions}}, which is the Smithsonian reporting that it '
    + 'is unaware of a restriction - not a grant of anything, and not a set of '
    + 'terms a reader or a lawyer could check. A genuine loss: it is a photograph '
    + 'of her at the bench. If a clearly licensed one turns up, it should go '
    + 'straight back in.',
  'katharine-blodgett':
    'Same tag as Lonsdale, from the same Smithsonian Flickr Commons stream. '
    + 'Also a real loss - she is demonstrating her own apparatus in it, which is '
    + 'the portrait and the work in one frame.',
  'soren-sorensen':
    'commons:File:SPL Sorensen.jpg claims {{PD-old}} with the author given as '
    + '{{unknown}} and no date at all. PD-old is the generic tag; without a death '
    + 'date or a publication date there is nothing behind it, and Commons flags '
    + 'the file for a more specific tag itself. Public domain is very likely true '
    + 'of a portrait of a man who died in 1939 - but likely is not the standard '
    + 'here.',
  'giulio-natta':
    'commons:File:Giulio Natta 1960s.jpg claims {{PD-Italy}}, the 20-year term '
    + 'for a \'simple photograph\'. Whether a 1960s press portrait counts as a '
    + 'simple photograph rather than a creative work is exactly the contested '
    + 'question that tag turns on, and it says nothing about the status of the '
    + 'file outside Italy.',
  'marie-maynard-daly':
    'No free portrait. commons:File:Marie Maynard Daly.jpg is tagged public domain, '
    + 'but its stated provenance is a 1942 Queens College yearbook reached through a '
    + 'blog mirror, with no evidence of non-renewal recorded — a 1942 US copyright '
    + 'claim nobody has actually checked. It is also 250x290, below the 306 px this '
    + 'slot needs on the narrowest phone. English Wikipedia does not use it either. '
    + 'Her work was not used instead: the nuclear half of her card is histones, and '
    + 'every free nucleosome diagram on Commons is a ribbon model that says nothing a '
    + 'reader at 12 can follow, while the arteries half is cholesterol — which is the '
    + 'molecule card she is paired with that week, so it would put the same picture on '
    + 'the page twice. A named, sourced portrait would be very welcome; this is a real '
    + 'gap and not a settled decision.',
};

const strip = (s: string | undefined) =>
  s ? String(s).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : '';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function apiGet(url: string, tries = 4): Promise<any> {
  let last = '';
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (r.ok) return await r.json();
      last = `HTTP ${r.status}`;
    } catch (e) {
      last = (e as Error).message;
    }
    await sleep(1000 * (i + 1));
  }
  throw new Error(`giving up on ${url} — ${last}`);
}

async function binGet(url: string, tries = 3): Promise<Buffer> {
  let last = '';
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (r.ok) return Buffer.from(await r.arrayBuffer());
      last = `HTTP ${r.status}`;
    } catch (e) {
      last = (e as Error).message;
    }
    await sleep(1200 * (i + 1));
  }
  throw new Error(`download failed — ${last}`);
}

/** Ask the wiki for the file's real URL and its current licence tag. */
async function upstream(entry: Entry) {
  const host = entry.wiki === 'commons' ? 'commons.wikimedia.org' : 'en.wikipedia.org';
  const d = await apiGet(
    `https://${host}/w/api.php?action=query&titles=${encodeURIComponent(
      `File:${entry.file}`,
    )}&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json`,
  );
  const page: any = Object.values(d?.query?.pages ?? {})[0];
  if (!page || page.missing !== undefined || !page.imageinfo?.[0]) {
    throw new Error(`file is gone from ${host} — it may have been deleted upstream`);
  }
  const ii = page.imageinfo[0];
  const m = ii.extmetadata ?? {};
  return {
    url: ii.url as string,
    width: ii.width as number,
    height: ii.height as number,
    licence: strip(m.LicenseShortName?.value) || strip(m.UsageTerms?.value) || '(untagged)',
    nonFree: strip(m.NonFree?.value) === 'true',
  };
}

/** Where the module this script owns is written, relative to the repo root. */
const GENERATED_REL = 'src/lib/explore/scientist-images.ts';

/**
 * The module the page actually reads.
 *
 * Generated rather than hand-maintained because the fields that matter most
 * cannot be known without the file in front of you: `width` and `height` are
 * measured off the processed JPEG, and `licence` has just been re-checked
 * against the wiki. Typing those into `scientists.ts` by hand is how a credit
 * line ends up describing a licence the file no longer carries.
 */
const NL = String.fromCharCode(10);

function generatedModule(
  results: { id: string; width: number; height: number; entry: Entry }[],
): string {
  const entries = results
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((r) => {
      const deed = DEEDS[r.entry.licence];
      return [
        `  // ${r.entry.why}`,
        `  '${r.id}': {`,
        `    src: '/explore/scientists/${r.id}.jpg',`,
        `    width: ${r.width},`,
        `    height: ${r.height},`,
        `    subject: '${r.entry.subject}',`,
        `    credit: {`,
        `      author: ${JSON.stringify(r.entry.author)},`,
        `      licence: ${JSON.stringify(r.entry.licence)},`,
        ...(deed ? [`      licenceUrl: ${JSON.stringify(deed)},`] : []),
        `      sourceUrl: ${JSON.stringify(r.entry.page)},`,
        `    },`,
        `  },`,
      ].join(NL);
    })
    .join(NL);

  // Wrapped to about 76 characters so the reason stays readable as a comment.
  const absent = Object.entries(NO_PICTURE)
    .map(([id, why]) => `// **${id}** — ${why.replace(/(.{74}) /g, '$1' + NL + '//   ')}`)
    .join(NL + '//' + NL);

  return [
    `// ${GENERATED_REL}`,
    '//',
    '// GENERATED by scripts/scientist-images.mts — do not edit by hand.',
    '// Run `npm run explore:scientist-images` to rebuild this module and the',
    '// files it names. Every licence below was re-checked against Wikimedia on',
    '// that run.',
    '//',
    '// A scientist absent from this map has no picture, on purpose, and their',
    '// card renders with no picture and no placeholder:',
    '//',
    absent,
    '',
    "import type { ExploreScientistImage } from './types';",
    '',
    'export const SCIENTIST_IMAGES: Record<string, ExploreScientistImage> = {',
    entries,
    '};',
    '',
  ].join(NL);
}

async function main() {
  const idsArg = process.argv.slice(2).filter((a) => !a.startsWith('-'));
  const only = idsArg.length ? new Set(idsArg) : null;

  /**
   * `--offline`: touch the network for nothing, and rebuild the module from
   * the files already in `public/`, measuring each one with sharp.
   *
   * For the case where the *decision* changed but no picture did — dropping
   * an entry whose licence turned out not to say anything, most of all. A
   * full run would re-fetch seventeen megabytes to answer a question nobody
   * asked, and on a metered connection that is a real cost.
   *
   * The trade is explicit: **an offline run re-checks no licences.** It
   * prints that, and it is not the run to make before shipping.
   */
  const offline = process.argv.includes('--offline');

  await mkdir(OUT_DIR, { recursive: true });

  const results: {
    id: string;
    width: number;
    height: number;
    kb: number;
    entry: Entry;
  }[] = [];
  const problems: string[] = [];

  for (const [id, entry] of Object.entries(MANIFEST)) {
    if (only && !only.has(id)) continue;
    process.stdout.write(`${id.padEnd(22)} `);
    try {
      if (offline) {
        // Measure what is already there; write nothing, fetch nothing.
        const dest = join(OUT_DIR, `${id}.jpg`);
        const meta = await sharp(dest).metadata();
        const { size } = await stat(dest);
        results.push({
          id,
          width: meta.width!,
          height: meta.height!,
          kb: Math.round(size / 1024),
          entry,
        });
        console.log(
          `kept (offline)  ${meta.width}x${meta.height}  ${Math.round(size / 1024)} KB  ${entry.licence}`,
        );
        continue;
      }

      const up = await upstream(entry);

      // (2) The licence check. A mismatch is a failure, not a warning.
      if (up.nonFree) {
        throw new Error('upstream now flags this file NON-FREE');
      }
      const expected = entry.upstream ?? entry.licence;
      if (up.licence !== expected) {
        throw new Error(
          `licence changed upstream: manifest expects "${expected}", `
          + `${entry.wiki} now says "${up.licence}". Re-check before shipping it.`,
        );
      }

      const src = await binGet(up.url);
      const out = await sharp(src, { failOn: 'error' })
        .rotate() // honour EXIF orientation before the metadata is dropped
        .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
        .toBuffer({ resolveWithObject: true });

      const dest = join(OUT_DIR, `${id}.jpg`);
      await writeFile(dest, out.data);

      const kb = Math.round(out.data.length / 1024);
      results.push({
        id,
        width: out.info.width,
        height: out.info.height,
        kb,
        entry,
      });

      const soft = out.info.width < 555 ? `  (soft: under the 555 px slot)` : '';
      const heavy = kb > 300 ? `  !! over the 300 KB budget` : '';
      console.log(`ok  ${out.info.width}x${out.info.height}  ${kb} KB  ${entry.licence}${soft}${heavy}`);
      if (heavy) problems.push(`${id}: ${kb} KB is over the 300 KB budget`);
    } catch (e) {
      console.log(`FAILED — ${(e as Error).message}`);
      problems.push(`${id}: ${(e as Error).message}`);
    }
  }

  // Remove any leftover placeholder SVGs for ids we now serve as JPEG, and any
  // stray file for an id that is meant to have no picture at all.
  const present = await readdir(OUT_DIR);
  for (const f of present) {
    const id = f.slice(0, f.lastIndexOf('.'));
    const stale = (f.endsWith('.svg') && MANIFEST[id]) || NO_PICTURE[id];
    if (stale) {
      await unlink(join(OUT_DIR, f));
      console.log(`removed  ${f}  (${NO_PICTURE[id] ? 'this entry has no picture' : 'old placeholder'})`);
    }
  }

  console.log('\n--- entries with no picture, by decision ---');
  for (const [id, why] of Object.entries(NO_PICTURE)) {
    console.log(`${id}:\n  ${why.replace(/(.{92}) /g, '$1\n  ')}`);
  }

  // Write the generated module. Only on a full run: a partial run (`node
  // scripts/scientist-images.mts <id> ...`) knows about three entries and
  // would otherwise blow the other sixteen away.
  if (!only) {
    if (problems.length) {
      console.error(
        `
${problems.length} entry/entries failed, so ${GENERATED_REL} was left `
        + 'alone. Fix them and run again — a partial module would silently drop '
        + 'a picture from the page.',
      );
    } else {
      await writeFile(join(ROOT, GENERATED_REL), generatedModule(results), 'utf8');
      if (offline) {
        console.log(
          '\nNOTE: --offline. No licence was re-checked on this run. Run without it '
            + 'before shipping.',
        );
      }
      console.log(`
wrote ${GENERATED_REL}`);
    }
  }

  if (problems.length) {
    console.error(`\n${problems.length} problem(s):`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exitCode = 1;
  } else {
    console.log(`\nAll ${results.length} pictures written to public/explore/scientists/.`);
  }
}

await main();
