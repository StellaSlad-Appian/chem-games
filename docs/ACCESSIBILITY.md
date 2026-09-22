# Accessibility Requirements

**Target: WCAG 2.2 Level AA**, applied with judgement to the parts of a game that are inherently
visual/timed. The rule of thumb: a student who is colour-blind, uses a keyboard or screen reader,
needs more time, or is sensitive to motion must be able to **learn the same chemistry** from the
game, even if the arcade layer feels different for them.

Tiers used below: **MUST** (blocks sign-off of a new game), **SHOULD** (expected unless there's a
written reason), **COULD** (nice to have).

## 1. What already exists (build on it, don't duplicate)

- `GameOverlay.tsx`: `role="dialog"`, `aria-modal`, labelled title/description, focus trap,
  focus restore, Escape/Space/Enter handling, visible `focus-visible` rings. **This is the
  reference implementation for any modal.**
- `GameSettingsModal.tsx`: `role="switch"` + `aria-checked` toggle, `aria-label` on the close
  button, Escape to close, scroll lock.
- `useInputMethod()` detects touch vs pointer via `(pointer: coarse)` — use it to enlarge targets.
- Classification buttons pair colour with an icon **and** a text label — the correct pattern for
  colour-independence.
- Theme-neutral chemistry colours (`--acid-color` etc.) mean meaning never shifts between themes.

## 2. Gaps found in the current codebase (platform-level TODOs, in priority order)

1. ~~No `prefers-reduced-motion` support~~ — `globals.css` now disables shake, glow-pulse,
   slide-in, overlay-enter and the Share to Fill loner pulse / atom slide under the media query.
   `floatUp` (Formula Blaster) is still unconditional.
2. ~~Icon-only buttons rely on `title`~~ — the footer help/pause/settings buttons and the header
   hint button now carry `aria-label`s too.
3. **Timers cannot be extended or disabled** (Formula Blaster/Neutralise wave timers). WCAG 2.2.1.
4. **No live regions**: score changes, hints, and error banners are not announced to screen readers.
5. **Contrast**: `text-slate-500` on the dark game background is ~4:1 — below 4.5:1 for small
   text. Use `--muted` (passes in both themes).
6. **Keyboard access to game arenas** is undefined per game — bubbles/invaders are pointer-only.
7. `tailwind.config.ts` "shake" is inert (see `STYLE_GUIDE.md`) — motion lives in `globals.css`,
   which is where the reduced-motion guard must go.

## 3. Perceivable

- **MUST** Text contrast ≥ 4.5:1 (≥ 3:1 for text ≥ 24px or bold ≥ 19px); UI component and
  focus-ring contrast ≥ 3:1 against adjacent colours (1.4.3, 1.4.11). Check both themes.
- **MUST** Colour is never the only carrier of meaning (1.4.1). Acid-red vs neutral-green is the
  classic red/green confusion — always pair with an icon, label, pattern, or position. This
  applies to game entities too (e.g. an "acid invader" needs a glyph, not just a red tint).
- **MUST** Formulas are rendered by `MoleculeText` (real `<sub>`/`<sup>`), and any interactive
  element whose only content is a formula gets an accessible name that includes the compound
  name: `aria-label="Sodium chloride, NaCl"`. Screen readers do not read subscripts as chemistry.
- **MUST** Page reflows without horizontal scrolling at 320px wide and 200% zoom (1.4.4, 1.4.10).
  Arena games may pin the play-field, but header/footer/modals must reflow.
- **SHOULD** Decorative icons `aria-hidden="true"`; meaningful icons have text or `aria-label`.
- **SHOULD** Do not rely on Unicode subscripts (`H₂O`) in interactive UI — many screen readers
  read them as ordinary digits or skip them.

### Reflow: `min-w-0`, and why `break-words` is not the fix

This one pattern has caused four separate 1.4.10 failures, so it gets its own heading
rather than a fifth bug.

**The rule.** A flex item that contains text needs `min-w-0`. Its automatic minimum size
is its *min-content* width — the longest unbreakable word — so a long word does not wrap,
it widens the item and pushes the whole page sideways. `break-words` alone does nothing,
because the item never gets narrow enough for the break to matter.

**Apply it to the flex item, not the text.** This is what made the fourth bug take two
attempts. In

```
<div class="flex …">        ← the flex item: min-w-0 goes HERE
  <div>
    <h2 class="min-w-0">…   ← too shallow: fixed the column, left the row broken
```

the `h2` already had `min-w-0` and the row still overflowed at 768px in every locale.
Walk up to the child of the flex container and put it there. Pair it with `shrink-0` on
whatever must keep its size (an icon, a "read more" link).

**The four:** the Spanish dashboard heading at 320px, every German cheat sheet, English
`stoichiometry`, and the dashboard's `SectionHeading` row at 768px in every locale. All
four are fixed; the worked example with the reasoning is in the comment at
`src/app/[lang]/(main)/page.tsx`.

**Testing it.** A 320px check would have passed the fourth bug — it failed at 768px and
1024px, because German needs more room, not less. Check the widths the content demands,
not one canonical narrow viewport. And use `expectNoOverflow()` from `e2e/helpers.ts`
rather than a bare `scrollWidth` comparison: an over-full flex row **compresses** instead
of scrolling, so `scrollWidth <= innerWidth` passes while the row is unreadable. That is
how the German header shipped needing 1033px in a 1024px viewport with every locale green.

## 4. Operable

### Keyboard (2.1.1, 2.1.2, 2.4.3, 2.4.7)
- **MUST** Every game is completable with keyboard alone. Each game's brief defines its keyboard
  map (e.g. `1`–`6` select lanes, `←/→` move, `Space` fire, `H` hint, `P` pause — `P` and `Space`
  are already reserved in `ui-constants.ts` `GAME_CONTROLS`). Document the map in the
  Instructions modal.
- **MUST** Focus is always visible (`focus-visible:outline-2 focus-visible:outline-offset-2`),
  never removed with `outline-none` alone.
- **MUST** Modals trap focus and return it on close (copy `GameOverlay`). No other keyboard traps.
- **MUST** Interactive things are `<button>`/`<a>`/inputs, not `<div onClick>`. Game entities the
  player clicks (bubbles, invaders, atoms) are buttons or have `role="button"` + `tabIndex=0`
  + key handlers.

### Timing (2.2.1, 2.2.2)
- **MUST** Pause is always available and pausing stops all timers, spawns, and animations.
- **MUST** Where a game has a countdown, provide a **Timer** setting in `GameSettingsModal`:
  Normal / Relaxed (×1.5) / Extended (×2) / Off. Implement once in `game-settings-context.tsx`
  as a `timeScale` (with `Infinity`/off), applied where configs read `baseWaveTimeSeconds` or
  equivalent. Scores may be flagged as "relaxed" in `game_sessions` if you want leaderboards to
  stay comparable — that is a product decision; accessibility only requires the option to exist.
- **SHOULD** No auto-advance: level-up/victory/fail overlays wait for the player (already true).

### Motion & flashing (2.3.1, 2.3.3)
- **MUST** Nothing flashes more than 3 times per second; no full-screen red flashes on failure.
- **MUST** Add to `globals.css`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .shake-animation, .glow-pulse, .animate-slide-in, .overlay-enter { animation: none; }
    /* game-specific motion (e.g. floatUp) must degrade to a non-animated or fade-only state */
  }
  ```
  and honour it in JS-driven motion (`window.matchMedia('(prefers-reduced-motion: reduce)')`).
  Games whose *mechanic* is motion (Formula Blaster) must still be playable — e.g. bubbles appear
  in place and fade rather than drift, at a slower cadence.
- **SHOULD** Expose a "Reduce motion" toggle in Settings that forces the same behaviour
  regardless of OS setting (store in `game-settings-context`).

### Pointer & touch (2.5.1, 2.5.7, 2.5.8)
- **MUST** Any drag interaction (Bond Builder, Lewis structures, stoichiometry sliders) has a
  single-pointer alternative: tap-source-then-tap-target, or +/− buttons.
- **MUST** Targets ≥ 24×24 CSS px; **SHOULD** ≥ 44×44 when `useInputMethod() === 'touch'`.
- **SHOULD** Moving targets (bubbles) have a generous hit area beyond their visual bounds.

## 5. Understandable

- **MUST** Instructions modal is plain language, ~5 bullets, reading age ~12, and states the
  keyboard map. Controls must be learnable in < 30s (design-doc Cognitive Friction check).
- **MUST** Error/feedback messages say *what* was wrong and *what to try* (3.3.1, 3.3.3) — the
  "actionable diagnostic hint" from the design framework. "Wrong!" alone is not acceptable;
  `generateComparativeError()` in Formula Blaster is the model.
- **MUST** Consistent placement: header (progress/task/stats/exit) and footer (help/pause/settings)
  in every game (3.2.3). Don't move the pause button.
- **MUST** `<html lang>` matches the locale in the URL (`src/app/[lang]/layout.tsx` sets it
  from `LOCALES`), so a screen reader picks the right voice; every game's text exists in every
  locale (`docs/i18n/GAMES.md`). Chemistry terms are spelled consistently with the platform's
  convention per language (English: British *neutralise*, *sulfur* per IUPAC; other locales:
  `docs/i18n/glossary-<locale>.md`).
- **SHOULD** Avoid long ALL-CAPS text and justified text; keep line length ≤ 75 characters.

## 6. Robust

- **MUST** Live regions: one `aria-live="polite"` region for score/progress/hint changes; one
  `aria-live="assertive"` (or `role="alert"`) for game-over/level-up. Put these in the shared
  header/overlay so every game gets them for free.
- **MUST** Unique, stable `id`s for `aria-labelledby`/`aria-describedby` (an app with several
  modals mounted must not reuse `game-overlay-title`).
- **SHOULD** Test with NVDA + Chrome on Windows and VoiceOver on iOS Safari (the two most common
  student setups).

## 7. Cognitive accessibility (overlaps the pedagogy framework)

- One decision at a time on screen; progressive disclosure of complexity across levels.
- Hints are always available and never shamed; consider not penalising hint use at Level 1.
- Failure is low-stakes: instant retry, no lives lost for opening help, no countdown on the
  fail screen.
- Sound is never the only feedback channel (mute is a first-class setting already).
- Dyslexia-friendly defaults: DM Sans body, generous line-height (`leading-relaxed`), left-aligned
  text, no italics for emphasis in instructions.

## 8. Per-game sign-off checklist

- [ ] Keyboard-only playthrough to a win and a loss (no mouse).
- [ ] Screen-reader playthrough: can you tell what the target is, what you did, and why it was
      wrong?
- [ ] 200% zoom and 320px width: header, footer, modals usable.
- [ ] Colour-blind simulation (Chrome DevTools → Rendering → Emulate vision deficiencies):
      every distinction survives.
- [ ] `prefers-reduced-motion` enabled: still playable, nothing essential is motion-only.
- [ ] Timer setting (if the game has a timer) works, including Off.
- [ ] Every icon-only control has an `aria-label`; every formula-only control has a name.
- [ ] Lighthouse/axe DevTools accessibility pass with no critical/serious issues.
- [ ] Touch: targets ≥ 44px on a phone; no drag-only interactions.
