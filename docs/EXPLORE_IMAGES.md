# Pictures on the Explore page

Where the image files live, how to replace one, and what belongs in each slot.

---

## The short version

Both Explore cards — **Molecule of the Week** and **Scientist of the Week** —
carry a picture. The files sit under `public/`, so **providing a picture is
replacing a file**: no code changes, no new entry anywhere, no rebuild.

The files that ship today are placeholders: a dashed frame showing which entry
the slot belongs to, its path and its size. That is deliberate. The card has its
final layout from the first commit, so nothing shifts when a real picture
arrives, and you can see the slot on the page before filling it.

The page rotates weekly, so **each entry has its own picture** — 20 molecules
and 20 scientists for the current pool.

---

## Where to put the files

Open one of these folders:

```
C:\Users\stella.slad\Documents\GitHub\chem-games\public\explore\molecules\
C:\Users\stella.slad\Documents\GitHub\chem-games\public\explore\scientists\
```

Each file is named after its entry — `sodium-sulfate.svg`, `maria-telkes.svg`
and so on. **Replace a file, keep the filename**, and the page picks it up. In
the repository the folders are `public/explore/molecules/` and
`public/explore/scientists/`; in the browser they are served at
`/explore/molecules/<file>` and `/explore/scientists/<file>`.

To see which slot is which, open the page and look — every placeholder prints
its own path.

### Format and size

- **720 × 400** is the declared size for every slot.
- **SVG** for diagrams — sharp at any size, small, and it stays crisp on a
  phone. **PNG or JPEG** for photographs, at roughly twice the listed size so it
  is sharp on a high-density screen.
- If you supply a format other than SVG, change the extension in the entry's
  `image.src` in `src/lib/explore/molecules.ts` or `scientists.ts` — the `src`
  names the file.
- If your file is a different size, update `width` and `height` in the same
  place, or the picture will be stretched. Those numbers exist so the browser
  reserves the space before the image loads; without them the text jumps down as
  each picture arrives.
- Keep files under about 300 KB. These load on school wifi.
- **Do not bake a white background into the image.** The card is white in the
  light theme and near-black in the dark one, so a transparent background with
  mid-tone lines works in both. A white rectangle looks like a sticker on dark.

---

## What belongs in each slot

**Molecule** — a diagram, not a photograph. A structural formula, a
ball-and-stick model, or the thing you meet it as. Whatever the card's chemistry
section is actually about: the sodium sulfate card is about storing heat, so a
picture of Glauber's salt crystals earns its place more than a generic 3D model.

**Scientist** — a portrait, or their apparatus, or the thing they made.

### ⚠ Portraits are the part to be careful about

Most of the pool worked in the 20th century, and **a photograph of a 20th-century
person is very likely still in copyright.** "It was on the internet" is not a
licence. Before using a portrait, check that it is one of:

- public domain because of its age or because the rights holder released it;
- a Creative Commons licence you can actually comply with — most require
  attribution, and some forbid commercial use;
- yours, or licensed to you.

Wikimedia Commons states a licence on every file, which makes it the least
painful place to start. If a usable portrait does not exist, the slot is better
left as a placeholder, or filled with their apparatus or their result — a
diffraction pattern, a drum of Glauber's salt, a molecule they made.

There is no attribution line on the card yet. If you use a picture that requires
attribution, say so and I will add one — that is a real change, not a caption
you can tuck into the alt text.

---

## Alt text

You do not write it. The alt is built from the entry's own name through
`explore.moleculeImageA11y` and `explore.scientistImageA11y` in the
dictionaries, so it already exists in all six languages and cannot go stale when
the rotation moves on. A German reader gets "Abbildung: Natriumsulfat"; a
Russian reader gets «Фото: Mária Telkes».

That is deliberately generic, and it is the right trade while the pictures do not
exist: a specific alt describing a picture nobody has chosen yet would be
fiction, and 40 entries × 5 languages of it would be fiction at scale.

**If a picture ends up carrying information the prose does not** — a labelled
diagram, a graph — a generic alt is no longer good enough, and that slot needs a
real per-entry, per-locale description. That means adding an `imageAlt` field to
the overlay, the way the cheat sheets do it. Ask for it when you get there; it
is a small change, but it is a translation job, not a code one.

---

## Adding a slot to a new entry

When a new pair is written, give each entry an `image`:

```ts
image: {
  src: '/explore/molecules/<entry-id>.svg',
  width: 720,
  height: 400,
},
```

The filename is the entry's `id`, so the slot is findable without a lookup
table. `src`, `width` and `height` are structure, never translated, and they sit
in the English data only — there is nothing to add to any overlay.

The field is optional: an entry with no `image` renders as it did before, with
no gap. So a new pair can ship before its picture exists.
