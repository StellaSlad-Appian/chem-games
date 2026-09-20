# Pictures on the Explore page

Where the image files live, how to replace one, and what belongs in each slot.

---

## The short version

Both Explore cards — **Molecule of the Week** and **Scientist of the Week** —
carry a picture. The files sit under `public/`, so **providing a picture is
replacing a file**: no code changes, no new entry anywhere, no rebuild.

The page rotates weekly, so **each entry has its own picture** — 20 molecules
and 20 scientists for the current pool.

Seventeen of the twenty molecule slots are **produced by a script** and should
not be edited by hand — see [Molecule pictures are generated](#molecule-pictures-are-generated)
below. Every other slot is a placeholder: a dashed frame showing which entry it
belongs to, its path and its size. That is deliberate. The card has its final
layout from the first commit, so nothing shifts when a real picture arrives, and
you can see the slot on the page before filling it.

**The scientist slots are all still placeholders** and are yours to fill by
hand, as described below.

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

## Molecule pictures are generated

```bash
npm run explore:images
```

One script, `scripts/molecule-images.mts`, makes every molecule picture, from
one of three places:

| How | Count | Which |
| --- | --- | --- |
| Drawn from a SMILES string by OpenChemLib | 11 | benzene · citric acid · monosodium glutamate · CFC-12 · cholesterol · oleic acid · adenine · sodium bicarbonate · urea · limonene · artemisinin |
| Drawn in code, by a function in the script | 1 | sodium chloride |
| A public-domain file under `assets/explore/`, recoloured | 5 | methane · ammonia · Kevlar · silicon dioxide · lithium cobalt oxide |

**Do not edit the seventeen output files.** The next run overwrites them. Each
carries a comment at the top saying so and where it came from. To change one,
change the script and re-run.

Three slots are still placeholders: **water**, **polypropylene** and
**sodium sulfate**. The script prints them on every run with the reason, so the
gap stays visible rather than being something you have to remember.

### ⚠ Water: do not use the obvious Commons file

`File:Water-with-lone-pairs-3D-balls.png` is public domain, correctly
licensed, and the only water picture on Commons that survives the dark card.
It was fitted into the slot on 2026-09-20 and pulled the same day, because the
chemistry in it is wrong.

Measured from the file, with the oxygen as the origin, the projected H–O–H
angle is 94.4° and the projected lone-pair–O–lone-pair angle is **71.7°**. The
card says "the lone pairs take up more room than the bonding pairs". The
picture shows the opposite, on the one point the card exists to make.

A replacement needs the lone pairs visibly **wider apart** than the O–H bonds.
The rejection is recorded in the script as well, at the top of `SOURCED`, so
nobody re-adds it.

### Why not just draw all twenty from SMILES

A depictor draws molecules, and nine of the pool are either not molecules or
not *about* their structure. A generated picture would contradict the card's
own prose:

| Entry | Why not |
| --- | --- |
| water, methane, ammonia | The cards are about VSEPR shape and lone pairs — 104.5°, a squashed pyramid, a tetrahedron. A skeletal drawing shows none of that, and OpenChemLib will not draw a bond to a hydrogen at all: a one-heavy-atom molecule comes out as the text `H2O`. |
| silicon dioxide | A continuous network. `O=[Si]=O` is gas-phase SiO₂, the exact picture the card says quartz is not. |
| sodium chloride, lithium cobalt oxide | Ionic solids. SMILES gives disconnected ions and loses the lattice and the layers, which is what both cards are about. |
| Kevlar, polypropylene | Polymers. They need a bracketed repeat unit with an *n*. |
| sodium sulfate | The card is about storing heat, so Glauber's salt crystals earn the slot over any structure diagram. |

Being on that list only rules out the depictor. Six of the nine have a picture
anyway, from the other two routes.

### Adding a molecule

Put its SMILES in `STRUCTURES`. The run fails if a molecule in the pool is in
neither `STRUCTURES` nor `NOT_FROM_SMILES`, so a new entry cannot quietly end
up with no picture and no decision recorded.

The script checks itself as it goes. It re-derives the molecular formula from
every SMILES and fails if it disagrees with the entry. It checks limonene is
still the R enantiomer, because that card is about R and S and the mirror image
draws just as happily. Where a molecule carries hand-placed coordinates —
artemisinin, whose automatic layout is a tangle — it reads the finished drawing
back through a molfile and fails if the geometry now describes a different
compound. And it renders every SVG it writes, because a file can be perfectly
valid text and completely blank in a browser.

### The licences

Everything under `assets/explore/` is public domain or CC0, checked against
Wikimedia Commons' own metadata on 2026-09-20. Each one's entry in the script
records the Commons page, the licence and the author.

That is not a coincidence. Public domain and CC0 are the only terms that let
you recolour a file and use it with no attribution line — and the card has
nowhere to put one. Several better-looking candidates were passed over for
being CC BY-SA, and the sodium chloride lattice was drawn from scratch for the
same reason. If you ever do want a CC BY-SA picture, say so: the card needs an
attribution line first, and that is a real change, not a caption you can tuck
into the alt text.

### The palette, and why it is not black

An SVG in an `<img>` is its own document. It cannot see `data-theme`, cannot
inherit `currentColor` and cannot read a CSS variable off the page — so one
file has to be legible on `#ffffff` **and** on `#18181b` with no help.

Bonds and carbon are slate-500 `#64748b`, which is about 4.6:1 on white and
3.9:1 on the dark card: the darkest tone that still clears 3:1 on both.
Anything lighter fails on white, anything darker fails on dark. Heteroatoms
reuse the "theme-neutral" tokens from `globals.css` where one fits — oxygen
takes `--acid-color`, nitrogen `--base-color`.

OpenChemLib's stock CPK colours are replaced wholesale, and so are the colours
in each sourced file. Both maps throw on a colour they do not know, so a new
molecule containing, say, bromine forces a deliberate choice instead of
inheriting one nobody looked at.

This is also the main reason the structures are generated instead of found. Of
23 Commons candidates surveyed for these slots, 5 cleared 3:1 on both surfaces:
chemical diagrams there are almost always pure black on transparent, which
measures about 1.2:1 on the dark card. Invisible.

Two notes on colour specifically:

- **Sodium chloride does not rely on colour.** Emerald and purple sit at almost
  the same luminance, so a red-green colour-blind reader cannot separate them
  by hue. The chloride ions are drawn 1.8 times the radius of the sodium ions,
  which is their real size ratio, and the key repeats it.
- **Silicon dioxide was recoloured against its source.** Oxygen was pale blue
  and silicon red there, which is backwards from every other picture here,
  where red means oxygen.

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
