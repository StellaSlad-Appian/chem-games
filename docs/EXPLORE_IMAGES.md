# Pictures on the Explore page

Where the image files live, which script owns them, and what belongs in each
slot.

---

## The short version

Both Explore cards — **Molecule of the Week** and **Scientist of the Week** —
can carry a picture. The files sit under `public/`, and the page rotates
weekly, so **each entry has its own**: 20 molecules and 20 scientists for the
current pool.

**Every picture in both folders is produced by a script.** Nothing in either
folder should be edited or replaced by hand — the next run overwrites it. The
two scripts are:

```bash
npm run explore:images             # molecules — drawn
npm run explore:scientist-images   # scientists — fetched, licence-checked
```

There are no placeholders left anywhere. There used to be twenty, one per
scientist — a dashed frame reading PICTURE TO COME — and they shipped to
readers. They are gone, and the rule that replaced them is below.

### An entry with no picture shows no picture

For a scientist the rule is:

> **a free portrait → else a free picture of their work → else nothing at all**

"Nothing at all" means the entry has no `image` and the card renders with no
picture and no gap — **not** a placeholder, and not a stand-in. One of the
twenty is in that state today (Marie Maynard Daly; the reasoning is in
`NO_PICTURE` in the script). `scientist-images.test.ts` holds all three arms
of the rule.

---

## Where the files are

```
public/explore/molecules/     served at /explore/molecules/<file>
public/explore/scientists/    served at /explore/scientists/<file>
```

Each file is named after its entry's `id` — `sodium-sulfate.svg`,
`maria-telkes.jpg` — so a slot is findable without a lookup table.

**Do not edit or replace these by hand.** Both folders are script output.
To change a picture, change the script and re-run it; that is also the only
way the licence check and the measured dimensions stay honest.

### Format and size

| | molecules | scientists |
| --- | --- | --- |
| format | SVG | JPEG |
| size | 720 × 400, every slot | ≤ 900 px wide, height varies |
| source | drawn, from SMILES or in code | photographs, fetched from Wikimedia |

A diagram is drawn, so it can be any size and SVG stays sharp. A photograph
is whatever shape it is, so the scientist files keep their own aspect ratio
and only the width is normalised.

**Where 900 px comes from.** It is measured, not inherited. The old
placeholders declared 720 × 400, but that was the placeholder's own size and
never the size of the slot. Measured off the rendered card on 2026-09-22:

| viewport | slot width | why |
| --- | --- | --- |
| 390 (phone) | 306 px | `w-full` inside the card padding |
| 639 (just under `sm`) | **555 px** | still `w-full` — the widest it ever gets |
| 1280, landscape file | 331 px | `sm:w-2/5`, capped by `sm:max-w-sm` |
| 1280, portrait file | 210 px | `sm:w-1/3 sm:max-w-[210px]` |

So 555 CSS px is the ceiling, and it happens on a *small* screen, where the
float has not kicked in yet. 900 px is about 1.6× that — enough for a 2×
display at the widest case, without the weight of the ~1440 this document
used to guess at. **Nothing is ever enlarged past its native width**: four of
the historical portraits are smaller than 900 px and stay smaller, because
upscaling only adds bytes.

- `width` and `height` in the data are measured off the finished file, so the
  browser reserves the right space and the prose does not jump as it loads.
- Keep files under about 300 KB. These load on school wifi. Both scripts
  fail the run if a file goes over.
- **Do not bake a white background into a diagram.** The card is white in the
  light theme and near-black in the dark one. Photographs are exempt — they
  have backgrounds of their own and are framed by a border.

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
| Drawn in code, by a function in the script | 4 | sodium chloride · water · polypropylene · sodium sulfate |
| A public-domain file under `assets/explore/`, recoloured | 5 | methane · ammonia · Kevlar · silicon dioxide · lithium cobalt oxide |

**Do not edit these twenty files.** The next run overwrites them. Each
carries a comment at the top saying so and where it came from. To change one,
change the script and re-run.

No molecule slot is a placeholder any more. The script still prints any that
are, with the reason, so a twenty-first entry cannot quietly ship without a
picture.

### ⚠ Water: do not use the obvious Commons file

`File:Water-with-lone-pairs-3D-balls.png` is public domain, correctly
licensed, and the only water picture on Commons that survives the dark card.
It was fitted into the slot on 2026-09-20 and pulled the same day, because the
chemistry in it is wrong.

Measured from the file, with the oxygen as the origin, the projected H–O–H
angle is 94.4° and the projected lone-pair–O–lone-pair angle is **71.7°**. The
card says "the lone pairs take up more room than the bonding pairs". The
picture shows the opposite, on the one point the card exists to make.

The slot is drawn by `drawWater` instead. All four electron pairs are drawn
the same way — a lobe with its electrons in it — so the only difference between
them is size, and the comparison is the picture: the lone-pair lobes are 1.6
times the width of the bonding ones and sit 115° apart against the bonds'
104.5°. The rejection is recorded in the script as well, at the top of
`SOURCED`, so nobody re-adds it.

Note what that drawing is and is not. It is a 2D schematic of the electron
pairs, the way a textbook draws it, not a claim about the molecule in space —
the two lone pairs really sit in a plane at right angles to the hydrogens.
Nothing in the drawing suggests otherwise, but it is the thing to watch if
anyone moves it towards a three-dimensional model.

### Why not just draw all twenty from SMILES

A depictor draws molecules, and nine of the pool are either not molecules or
not *about* their structure. A generated picture would contradict the card's
own prose:

| Entry | Why not |
| --- | --- |
| water, methane, ammonia | The cards are about VSEPR shape and lone pairs — 104.5°, a squashed pyramid, a tetrahedron. A skeletal drawing shows none of that, and OpenChemLib will not draw a bond to a hydrogen at all: a one-heavy-atom molecule comes out as the text `H2O`. |
| silicon dioxide | A continuous network. `O=[Si]=O` is gas-phase SiO₂, the exact picture the card says quartz is not. |
| sodium chloride, lithium cobalt oxide | Ionic solids. SMILES gives disconnected ions and loses the lattice and the layers, which is what both cards are about. |
| Kevlar, polypropylene | Polymers. Kevlar needs the chains hydrogen-bonded to each other; polypropylene needs the same backbone drawn twice, once regular and once not, because that is what its card compares. |
| sodium sulfate | The only card whose chemistry is a process: it melts at 32 °C to store heat, and the denser solid sinks out of reach so each cycle stores less. Drawn as three vessels, not a structure — and not the photograph this doc once guessed at, which cannot say it either. |

Being on that list only rules out the depictor. All nine have a picture
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
you recolour a file and use it with no attribution line, and the **molecule**
card still has nowhere to put one. Several better-looking candidates were
passed over for being CC BY-SA, and the sodium chloride lattice was drawn from
scratch for the same reason.

The scientist card is now different: it grew a credit line when the portraits
arrived, because most free photographs of 20th-century chemists are CC BY or
CC BY-SA. If you want a CC BY-SA picture in a **molecule** slot, say so — the
molecule card would need the same treatment first, and that is a real change,
not a caption you can tuck into the alt text.

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

## Scientist pictures are generated too

```bash
npm run explore:scientist-images
```

`scripts/scientist-images.mts` does three things, and the second is why it
exists:

1. Fetches each source file from Wikimedia at full resolution and normalises
   it — ≤900 px wide, JPEG, EXIF stripped.
2. **Re-checks every licence against Wikimedia on every run, and fails if it
   moved.** Commons files get re-tagged, relicensed and occasionally deleted
   as copyright problems come to light. A picture that quietly stopped being
   free is exactly the failure nobody notices, and the credit line on the
   card would go on telling readers the old terms.
3. Writes `src/lib/explore/scientist-images.ts`, which is generated and
   **must not be hand-edited**. The entries in `scientists.ts` carry no
   picture data at all; they get whatever the generated map has for their id.

Run it with ids to do a subset: `node scripts/scientist-images.mts tu-youyou`.
A partial run deliberately does not rewrite the generated module.

### What is in the twenty slots

| | count |
| --- | --- |
| Public domain | 6 |
| CC BY | 3 |
| CC BY-SA | 7 |
| Flickr Commons, "no known copyright restrictions" | 2 |
| a picture of their work, no free portrait existing | 1 |
| **no picture at all** | **1** |

### ⚠ Portraits are the part to be careful about

Most of the pool worked in the 20th century, and **a photograph of a
20th-century person is very likely still in copyright.** "It was on the
internet" is not a licence, and neither is "it is on Wikipedia" — English
Wikipedia hosts non-free files under fair use, which is a doctrine we cannot
rely on. That is exactly what rules out the only portrait of Gilbert N.
Lewis: `en:File:Gilbert N Lewis.jpg` is tagged non-free, so his slot holds
his own 1902 memorandum instead.

Before adding a portrait, check that it is one of:

- public domain because of its age or because the rights holder released it;
- a Creative Commons licence you can actually comply with;
- yours, or licensed to you.

Then put it in `MANIFEST` in the script, with its licence and author, and let
the run verify it. Do not drop a file into `public/` by hand: it will have no
credit line, no licence check, and the next run will delete it.

### There is a credit line on the card now

This document used to say there was not, and that using a picture needing
attribution was "a real change, not a caption you can tuck into the alt
text". **That change was made.** `ScientistCard` renders the picture in a
`<figure>` with a `<figcaption>` under it, carrying:

> author · licence (linked to the deed) · Source (linked to the file page)

Ten of the nineteen pictures are CC BY or CC BY-SA, and for those the credit
is **the condition on which the picture may be shown at all** — not styling.
Removing the caption means removing those ten pictures. Public-domain files
still name the photographer there, which costs one line and is the same
courtesy the sources list pays.

Two licence notes worth keeping in view:

- **"No known copyright restrictions"** (Lonsdale, Blodgett) is a statement by
  the holding institution that it is unaware of restrictions. It is not a
  licence grant, and it is weaker than public domain.
- **ShareAlike** (7 pictures) attaches to the image and to derivatives of it,
  not to the site. Resizing and converting to JPEG makes a derivative, so
  those files are themselves CC BY-SA; the credit line says so.

---

## What belongs in each slot

**Molecule** — a diagram, not a photograph. A structural formula, a
ball-and-stick model, or the thing you meet it as. Whatever the card’s
chemistry section is actually about: the sodium sulfate card is about storing
heat, so a picture of Glauber’s salt crystals earns its place more than a
generic 3D model.

**Scientist** — a portrait. Failing that, their apparatus or their result: a
diffraction pattern, a drum of Glauber’s salt, a molecule they made. Failing
that, nothing. Set `subject: 'work'` on the picture when it is the second
kind, so the alt text says so.

---

## Alt text

You do not write it. The alt is built from the entry’s own name through the
dictionaries, so it already exists in all six languages and cannot go stale
when the rotation moves on. A German reader gets "Abbildung: Natriumsulfat";
a Russian reader gets «Фото: Mária Telkes».

Three strings, and which one is used is not a style choice:

| key | used for |
| --- | --- |
| `moleculeImageA11y` | every molecule diagram |
| `scientistImageA11y` | a picture **of the person** |
| `scientistWorkImageA11y` | a picture **of their work** (`subject: 'work'`) |

The third exists because the second would otherwise lie. "Picture: Gilbert N.
Lewis" over a photograph of a 1902 manuscript tells something false to
exactly the readers who cannot see the picture to check it. `subject` on the
image picks the string, and the script requires it.

That is deliberately generic, and it is the right trade while the pictures
are portraits and plain diagrams.

**If a picture ends up carrying information the prose does not** — a labelled
diagram, a graph — a generic alt is no longer good enough, and that slot needs
a real per-entry, per-locale description. That means adding an `imageAlt`
field to the overlay, the way the cheat sheets do it. Ask for it when you get
there; it is a small change, but it is a translation job, not a code one.

---

## Adding a slot to a new entry

**A molecule**: give the entry an `image` in `molecules.ts` —

```ts
image: {
  src: '/explore/molecules/<entry-id>.svg',
  width: 720,
  height: 400,
},
```

— and add it to `STRUCTURES` or `NOT_FROM_SMILES` in the molecule script.

**A scientist**: add the entry to `MANIFEST` in `scripts/scientist-images.mts`
and run it. Nothing is added to `scientists.ts` — the generated map is wired
in for you, and the width, height and licence are measured and checked rather
than typed.

If no free picture exists, add the id to `NO_PICTURE` **with the reason**,
and the entry ships with no picture. That is a supported state, not a gap to
paper over: it is the third arm of the rule, and it is tested.
