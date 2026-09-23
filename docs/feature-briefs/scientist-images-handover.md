# Scientist of the Week pictures — handover

Landed on `master` 2026-09-23, across three commits:

| | |
| --- | --- |
| `6b265fe` | the pictures, the rule, the credit line, and the rotation box removed |
| `89c9ba8` | stop stretching portraits smaller than their slot |
| `d53b5bd` | "Why it works" → "What makes it special" |

This file was written as a mid-work handover while the job was paused, and is
kept as the record of why each decision went the way it did. The "what still
needs doing" list below is **live** — the items not struck through are real.

**Most of what is left needs no network.** The one task that does is flagged
and is optional.

---

## What the job was

1. Find pictures for the twenty Scientist of the Week cards that we are
   actually licensed to use.
2. Work out what size the slot should be, rather than inheriting the
   placeholder's 720×400.
3. Build the rule: **a free portrait → else a picture of their work → else no
   picture and no placeholder.**

## What is done

**All three, for 19 of the 20 entries.** The page renders real photographs
today.

### The pictures

19 files in `public/explore/scientists/`, 1.6 MB total, every placeholder SVG
deleted. Sourced from Wikimedia, normalised to ≤900 px wide, JPEG q82, EXIF
stripped, every one under the 300 KB budget.

| licence | count |
| --- | --- |
| Public domain | 6 |
| CC BY | 3 |
| CC BY-SA | 7 |
| Flickr Commons "no known copyright restrictions" | 2 |
| **no picture** | **1** |

### The size question, answered by measuring

The 720×400 in the old doc was the *placeholder's* size and never the slot's.
Measured off the rendered card at every breakpoint:

| viewport | slot | why |
| --- | --- | --- |
| 390 (phone) | 306 px | `w-full` inside the card padding |
| 639 (just under `sm`) | **555 px** | still `w-full` — the widest it ever gets |
| 1280, landscape file | 331 px | `sm:w-2/5`, capped by `sm:max-w-sm` |
| 1280, portrait file | 210 px | `sm:w-1/3 sm:max-w-[210px]` |

So **900 px wide** is the target — ~1.6× the 555 px ceiling. Never upscaled:
four historical portraits are natively smaller and stay that way.

### The two entries past the first arrow

- **Gilbert N. Lewis** — the only portrait on Wikipedia is tagged **non-free
  (fair use)**. Unusable. His own 1902 memorandum drawing cubical atoms is
  PD-US and is the better picture anyway: it is the thing his card is about.
- **Marie Maynard Daly** — **no picture at all.** The reasoning is recorded in
  full in `NO_PICTURE` in the script and repeated in the generated module. In
  short: the one Commons file claiming PD traces to a 1942 yearbook via a blog
  mirror with no renewal check, and it is 250×290, under the 306 px the slot
  needs on the narrowest phone. Her work was not substituted either — the
  nuclear half of her card is histones (no free diagram a 12-year-old can
  read), and the arteries half is cholesterol, which is the molecule card she
  is paired with that week.

### Code

| file | what changed |
| --- | --- |
| `scripts/scientist-images.mts` | **new.** Downloads, re-checks every licence against Wikimedia on each run, normalises, and generates the module below. |
| `src/lib/explore/scientist-images.ts` | **new, generated — do not hand-edit.** |
| `src/lib/explore/scientists.ts` | 20 inline placeholder `image:` blocks removed; pool now maps over `SCIENTIST_IMAGES`. |
| `src/lib/explore/types.ts` | `ExploreImageCredit`, `ExploreScientistImage` (`subject: 'person' \| 'work'`). |
| `src/components/explore/ScientistCard.tsx` | image wrapped in `<figure>`; credit line in `<figcaption>`; alt text switches on `subject`. |
| `src/i18n/dictionaries/*.ts` | `scientistWorkImageA11y` + `imageSourceLabel`, all six locales. |
| `src/lib/explore/scientist-images.test.ts` | **new.** |
| `package.json` | `npm run explore:scientist-images`. |

`npm run typecheck` passes.

### One thing that needed a decision and got one

`docs/EXPLORE_IMAGES.md` said: *"There is no attribution line on the card yet.
If you use a picture that requires attribution, say so and I will add one."*

10 of the 19 pictures are CC BY or CC BY-SA, which require the credit to reach
the reader. **The attribution line was built** — that is the `<figcaption>`.
The brief asked for Creative Commons explicitly, and the credit is the
condition on which those pictures may be shown, not a design flourish.

**If you would rather not have a credit line on the card, say so** — the
fallback is PD-only, which drops it to 8 pictures and empties 11 slots.

---

## What still needs doing

### ~~1. Finish the test run~~ — done

```bash
npx vitest run --no-isolate src/i18n src/lib/explore src/components/explore "src/app/[lang]/(main)/explore"
```

**1242 passed, 31 files, ~18 seconds.**

Two traps, both of which caught me:

- Use `--no-isolate`. Without it vitest spawns a worker per file at ~58 s each,
  the run takes 20 minutes and times out. That was the whole of the earlier
  "4 failed" — worker spawn, never an assertion.
- **Include `src/i18n`.** Scoping to the explore folders alone passes while
  `dictionary.test.ts` is failing, which is how a French string identical to
  the English one shipped in `6b265fe` and was only fixed in `d53b5bd`.

### ~~2. Check the card in a browser~~ — done

All three arms of the rule confirmed on the running app:

- **Kathleen Lonsdale** — photo loads at its declared 900×1279, floats left at
  the 210 px portrait width, prose wraps past the chin and runs full width
  underneath, credit sits under the picture.
- **Marie Maynard Daly** — zero `<img>`, zero `<figure>`, no placeholder, no
  gap. The rule’s third arm works.
- **Gilbert N. Lewis** — alt reads *"Picture of their work: Gilbert N. Lewis"*,
  and the public-domain credit renders with no licence link, as intended.

**Still unchecked:** dark theme, and Johanna Döbereiner’s 180×250 portrait at
full width on a phone. Döbereiner remains a judgement call — keep or drop?

### 3. `docs/EXPLORE_IMAGES.md` is now wrong — no network

It still says *"The scientist slots are all still placeholders and are yours to
fill by hand."* Needs rewriting to describe the script, the rule, the 900 px
target and the credit line. **Do this before anyone reads it.**

### 4. Two licence judgements worth a second pair of eyes — no network

- **Flickr Commons "no known copyright restrictions"** (Lonsdale, Blodgett) is
  a statement by the Smithsonian that it is unaware of restrictions — *not* a
  licence grant. Commons hosts both and `AttributionRequired` is false. Fine
  for a school site in my view, but weaker than PD and worth a conscious yes.
- **CC BY-SA ShareAlike** (7 pictures) — the obligation attaches to the image
  and any derivative of it, not to the site. The resize/JPEG conversion is a
  derivative, so those files are themselves CC BY-SA. The credit line states
  it. Standard practice, but flagging it rather than burying it.

### 5. Optional, needs network — a portrait for Daly

The only real gap. A properly sourced, freely licensed portrait would be very
welcome; the current position is "we could not find one we could stand behind",
not "she does not get a picture". Would need a clear provenance chain, not a
blog mirror.

### Also changed in this session: the rotation box is gone

Unrelated to pictures, done on this branch on request. The permalinks carried
a bordered box reading *"Last featured in the week of 7 September 2026. It
comes round again in the week of 25 January 2027."* It explained the
schedule's bookkeeping to a reader who had not asked and could not act on it.

- `src/components/explore/EntryDates.tsx` **deleted**, and its two call sites
  in the molecule and scientist permalinks removed.
- `featuredOnce` and `featuredAgain` removed from all six dictionaries.
- **`featuredNever` stays** — the archive list still uses it to label a row
  that has not run yet, where a row with no date would look like a bug.
- Tests rewritten to assert the box is *absent*, checked at three points in
  the cycle because the old box said three different things.

### 6. Housekeeping

- All committed and on local `master`; nothing pushed. The other session's 62
  in-flight files went in separately as `4a3b6e5`, so the working tree is clean.
- **`master` is checked out in a sibling worktree** at `../chem-games-master`,
  so `git switch master` fails here. Land work by committing on a branch and
  then `git -C ../chem-games-master merge --ff-only <branch>`.
- Run `npm run lint -- src e2e` before opening the PR (lint the folders, not
  the root).
- `src/components/explore/EntryDates.tsx` is a deletion — make sure it is
  staged as one.

---

## Done since: the molecule heading

"Why it works" presumed the compound had a job to do — true of Kevlar and
artemisinin, false of benzene, water and adenine, whose cards are about
structure. The benzene entry was already fighting it, opening "What makes it
unusual is..." under a heading promising a mechanism.

Now **"What makes it special"**, and the five translations were *written* as
headings rather than translated, because every one had inherited the same
presumption and two had a pronoun-agreement trap recorded in `review-notes.ts`:

| | was | now |
| --- | --- | --- |
| de | So funktioniert es | Das Besondere daran |
| es | Por qué funciona | Lo que tiene de especial |
| fr | Pourquoi ça marche | Ce qu'il y a de particulier |
| it | Perché funziona | Che cosa ha di speciale |
| ru | Почему это работает | Что в этом особенного |

German "daran" and the impersonal "il" in French "il y a" both dodge agreement
with whichever compound the week shows. Both translator notes were rewritten to
ask for a fresh native read rather than a check against the old wording — the
French one in particular, because it is a register step up from the spoken
"ça marche" it replaces and the audience is fourteen.

## Unrelated, raised mid-session and not acted on

The molecule card heading **"Why it works"** presumes the molecule has a job.
True for Kevlar and artemisinin; false for benzene, water and adenine, whose
cards are about structure. The benzene card already fights it — under "Why it
works" it says *"What makes it unusual is…"*.

Suggested replacement: **"What makes it special"**. Note all five translations
inherited the same presumption (`So funktioniert es`, `Por qué funciona`,
`Pourquoi ça marche`, `Perché funziona`, `Почему это работает`), and
`src/i18n/review-notes.ts:66` records that the German was deliberately written
to dodge a pronoun that would have to agree with the compound — so the
replacements must be *written*, not translated.

**Belongs on its own branch.**
