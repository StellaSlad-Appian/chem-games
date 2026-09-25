# CSS / Tailwind Style Guide

Derived from what the codebase already does (`globals.css`, the shared game components, and the
working games). Where the code is inconsistent, this doc picks a winner and says so — follow the
guide for new code, and fix old code opportunistically when you're already in the file.

## 1. How styling works here (read first)

- **Tailwind v4**, loaded by `@import "tailwindcss";` in `src/app/globals.css`. There is no
  `@config` directive, so **`tailwind.config.ts` is almost certainly inert** — Tailwind v4 does not
  auto-load a JS config. The `game.acid` color scale, `text-molecule-display`, and `animate-shake`
  defined there should be assumed unavailable. Use the CSS custom properties and the
  `.shake-animation` utility in `globals.css` instead. (Either delete the config file or wire it
  with `@config "../../tailwind.config.ts";` — don't leave it ambiguous.)
- **Theming is CSS-custom-property based.** `:root, [data-theme='dark']` defines the dark palette
  (the fallback); `[data-theme='light']` overrides it, and an identical copy of the light block
  under `@media (prefers-color-scheme: light) { :root:not([data-theme]) }` serves readers on
  **Device**, the default Settings choice. `game-settings-context.tsx` sets
  `document.documentElement.dataset.theme` for an explicit Light/Dark (with a per-game override)
  and removes it for Device. A colour token that changes with the theme **must be defined in
  the dark block, the light block and its copy**, or it will silently fall back in one theme;
  one that never changes goes once in the fixed `:root` block (§2, the three-block rule).
  `src/app/theme-css.test.ts` enforces both.
- **Font:** `Nunito` for everything — headings and body, in all six languages (it has Cyrillic).
  Self-hosted by `next/font` in `src/app/[lang]/layout.tsx`, never loaded from Google at
  runtime. `h1`–`h3` take `--font-display`, which currently equals `--font-body`. Formulas
  render in `font-mono` via `MoleculeText`.

## 2. Design tokens

Reference tokens with Tailwind's v4 shorthand: `bg-(--surface)`, `text-(--muted)`,
`border-(--border)`, and `bg-(--link)/10` for a translucent tint of one. The older
`bg-[var(--surface)]` form still works; **use the shorthand** in new code. A shadow colour
needs the `color:` hint: `shadow-(color:--action)/25`. For values computed at runtime, use
inline `style` (`style={{ borderColor: 'var(--correct)' }}`), as `ClassificationButton.tsx`
does.

**Never write a palette class** (`text-amber-500`, `bg-slate-800`, `border-rose-400`) in a
component. A palette colour does not change with the theme, and most of the 400/500 shades
fail 4.5:1 as text on white (amber-500 is 2.2:1, emerald-500 2.5:1). If no token fits, add
one. The only palette-looking class allowed is `text-white`, and only on the fixed fills
`--action` and `--danger-action`.

### The three-block rule

`globals.css` defines the tokens in four places:

| Block | Holds |
|---|---|
| `:root, [data-theme='dark']` | Every token that **changes** with the theme — dark values |
| `[data-theme='light']` | The same tokens, light values |
| `@media (prefers-color-scheme: light) { :root:not([data-theme]) }` | An identical copy of the light block, for readers on Device |
| `:root` (the fixed block) | Tokens that **never** change, and role names that point at a themed token |

A token that changes goes in the first three; one that does not goes once in the fourth.
`src/app/theme-css.test.ts` fails if the dark and light blocks define different tokens, if
the two light copies differ, or if a token appears in both a themed block and the fixed
one. Put the measured contrast in a comment beside every new colour, as the existing ones
have it.

### Three layers

1. **Surfaces and text** — what almost everything uses.
2. **Hues** (`--hue-*`) — one text-safe value per hue per theme. Reach for these only when
   the colour means "a distinct colour" and nothing more (a cheat sheet's badge, a
   Formula Blaster bubble).
3. **Roles** — the meaning. `--success` *is* `--hue-emerald`, but a component that shows a
   right answer says `--success`, so the day the green changes it changes in one place.

### Surfaces and text

| Token | Use for | Light | Dark |
|---|---|---|---|
| `--background` | The page, and GameShell's backdrop | `#f8fafc` | `#09090b` |
| `--surface` | Cards, panels, modals, the header bar | `#ffffff` | `#18181b` |
| `--surface-2` | Nested rows inside a card or modal, hover fills | `#f1f5f9` | `#27272a` |
| `--border` | Card and panel edges — **decoration only** (1.5:1) | `#cbd5e1` | `#3f3f46` |
| `--border-strong` | The edge of a control that has to be seen: text inputs, the pause button, invaders (≥ 3:1) | `#64748b` | `#71717a` |
| `--foreground` | Body text and headings | `#0f172a` | `#fafafa` |
| `--muted` | Secondary text, labels, icon buttons at rest | `#475569` | `#a1a1aa` |
| `--link` | Links, the site blue as text or an icon, focus rings | `#2563eb` | `#60a5fa` |
| `--shadow-card` / `--shadow-lg` | Elevation (`.game-card`) | | |

### Roles

| Token | Meaning | Surface pair |
|---|---|---|
| `--action` / `--action-hover` | Primary button fill; white text on it (5.17:1). **Fixed.** Selected choices use it too | — |
| `--danger-action` / `--danger-action-hover` | Destructive button fill (Exit, Delete account); white text on it (4.83:1). **Fixed** | — |
| `--success` | Right answer, done, saved | `--success-surface` |
| `--danger` | Wrong answer, error, destructive (as text or an edge) | `--danger-surface` |
| `--accent` | The one amber accent: scores, trophies, the game task | `--accent-surface` |
| `--info` (= `--link`) | Neutral notices, icon tiles | `--info-surface` |
| `--hint` / `--hint-surface` | Hints and scaffolding (amber, like the lightbulb) | |
| `--correct` / `--wrong`, `--game-success` / `--game-error` | The names games already use; aliases of `--success` / `--danger` | |
| `--rank-gold` / `-silver` / `-bronze` | Leaderboard podium, each with a `-surface` | |
| `--game-accent-violet` / `-sky` / `-emerald` / `-amber` / `-rose` | One colour per game (hub cards, "Play now"); aliases of the hues | |
| `--accent-explore` | Explore's blue (= `--link`), deliberately not a sixth game colour | |
| `--accent-fill` + `--on-bright-fill` | An amber *block* with dark ink on it (the hero's chlorine tile). **Fixed** | |
| `--scrim` | Behind every modal: `rgb(2 6 23 / 0.8)`, **deliberately dark in both themes** | |

Every role text colour clears 4.5:1 on `--surface`, `--background`, `--surface-2` and its
own `-surface` tint, in both themes — the ratios are beside each value in `globals.css`.

### Chemistry semantics — fixed, never restyle per theme

| Token | Meaning |
|---|---|
| `--acid-color` (red) / `--base-color` (blue) / `--neutral-color` (emerald) / `--amphoteric-color` (purple) | Classification identity, as fills and strokes (not small text) |
| `--chem-acid-bg` etc. | Tinted backgrounds for the same classes — deep in dark, pale in light |
| `--ion-h` / `--ion-oh` | Neutralise's H⁺ (rose) and OH⁻ (indigo); white text on both |
| `--game-glow` | Ambient highlight (violet) |
| `--pt-tone-*` | The periodic table's family tones; `--foreground` on each ≥ 4.5:1 |

Rule from `globals.css`: "game meaning never changes with appearance." A new chemistry
concept that needs an identity colour (oxidation vs reduction, polar vs non-polar) gets a
new token pair here, not an ad-hoc Tailwind colour in a component.

### Game-state accents (from `GameOverlay.tsx`)

`paused` → `--link`, `failed` → `--danger`, `victory` → `--success`, `levelUp` →
`--accent`. In the game header, progress is `--success`, the score `--accent` and the
task's target `--link`. Keep these; they're how players learn
state. Each state also has its own icon and badge text, so colour is never the only cue.

### Colour classes stored as data

`lib/cheat-sheet-data.ts` `colorTheme`, `formula-blaster-config.ts` `spawnColorPool` and
`chemical-labels.ts` `colorClass` hold complete class strings, e.g.
`'border-(--hue-violet) text-(--hue-violet)'`. Tailwind can see them because they are
written out in full. Never build a class name by concatenation (`` `text-(--hue-${x})` ``)
— Tailwind will not generate it.

## 3. Typography

| Role | Classes |
|---|---|
| Page/game title | `h1` `text-3xl sm:text-4xl font-black tracking-tight` |
| Micro-caps label (Progress, Level, section headers) | `text-[10px] md:text-xs font-bold uppercase tracking-wider text-(--muted)` |
| Big stat value | `text-sm md:text-lg font-black text-(--foreground)` |
| Body / instructions | `text-sm font-medium text-(--muted)` inside `space-y-4`, bullets `list-disc pl-5` |
| Button text | `text-xs font-black uppercase tracking-wider` |
| Chemical formula | **Always `<MoleculeText formula="H2O" />`** — never hand-write `<sub>` or Unicode subscripts in interactive UI |

Write formulas in data as plain ASCII (`H2O`, `Ca(NO3)2`, `SO4 2-`, `2H2 + O2 -> 2H2O`) and let
`MoleculeText` handle coefficients, subscripts, charges, state symbols and arrows. Unicode
(`H⁺`, `H₂O`) is acceptable only in short static copy such as config `description` strings.
Reserve ALL-CAPS for labels ≤ 3 words; long uppercase text hurts readability (see
`ACCESSIBILITY.md`).

## 4. Shape, spacing, elevation

- **Three levels, always visible:** the page (`--background`, tinted) → a card on it →
  a panel inside the card. Use the component classes in `globals.css` rather than
  re-spelling them:
  - `.game-card` — every card on every page (the name is historical): `--surface`, a
    hairline `--border`, `rounded-2xl`, the lifted `--shadow-card`. Add `.card-lift` when
    the whole card is a link (it rises and takes `--shadow-lg` on hover; reduced motion
    keeps the shadow and drops the movement).
  - `.panel` — a secondary panel inside a card, or a quiet note on the page:
    `--surface-2`, flat. The atom ledger, the mass beam, formula examples, empty states.
  - `.icon-tile` — how any card shows its icon: a 2.5rem rounded square tinted with the
    item's colour (`GameIcon` for a game, a sheet's `colorTheme`, `--info-surface` +
    `--link` for the site's own sections, `--accent-surface` + `--accent` for scores).
  - `.pill` — the one neutral label pill (a year level, "Global network"). Colour on a
    card belongs to its icon tile, not its pills.
- **Card anatomy** (games, cheat sheets, Explore): icon tile top left, optional pill top
  right, `text-xl font-black` title, `text-sm text-(--muted)` body, a footer link in the
  item's colour with an arrow. A card that is a section of the dashboard (the leaderboard)
  opens with the same icon tile + title + pill row.
- **Every landing-page section** uses `SectionHeading` and sits in the one container
  (`max-w-6xl`, `space-y-20` between sections). No section gets a band or background of
  its own.
- Padding rhythm: `p-4` (rows) → `p-6` (cards) → `p-8` (modal content). Section gaps `gap-4`,
  page-level gaps `gap-6`/`gap-8`.
- Borders are 1px on cards (the shadow does the lifting), **2px** on interactive controls
  and modals.
- Elevation: `--shadow-card` on cards, `shadow-md` on buttons, `shadow-2xl` on modals.
- Modal scrim: `fixed inset-0 bg-(--scrim) backdrop-blur-sm` (`backdrop-blur-md` for the
  overlay). The scrim is deliberately dark in both themes.
- **One modal look** — `GameOverlay`, `GameInstructionsModal`, `GameSettingsModal` (also
  the header's Settings popover), `FeedbackWidget` and `NavPanel` share it; copy it for a
  new one:
  - panel: `rounded-2xl border-2 border-(--border) bg-(--surface) shadow-2xl`
  - header row: title in `text-(--foreground)`, `border-b border-(--border)` below it
  - close button: `rounded-xl p-2 text-(--muted) hover:bg-(--surface-2) hover:text-(--foreground)`
    plus the focus ring and an `aria-label`
  - inner rows: `rounded-2xl border border-(--border) bg-(--surface-2)`
  - primary / secondary buttons: see §5

### z-index ladder (do not improvise)

| Layer | z |
|---|---|
| `GameShell` root | `z-0` (background pushed to `-z-10`) |
| Header HUD | `z-40` |
| Footer, modals (`GameSettingsModal`, `GameInstructionsModal`) | `z-50` |
| `GameOverlay` (pause/fail/victory/levelUp) | `z-100` |

Game arena elements live between `z-0` and `z-30`.

## 5. Interactive elements

- Primary action: `.btn-primary` (page-level) or, inside games,
  `rounded-xl bg-(--action) hover:bg-(--action-hover) px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition`.
- Secondary: `.btn-ghost` or `border border-(--border) bg-(--surface) text-(--foreground) hover:border-(--link)`.
- Destructive/exit: `bg-(--danger-action) hover:bg-(--danger-action-hover) text-white` (the
  header's Exit, Delete account). Hover goes *darker*: white on a lighter red fails.
- Selected choice in a group (theme picker, leaderboard tabs, filters):
  `border-(--link) bg-(--action) text-white`; unselected `border-(--border) bg-(--surface) text-(--foreground)`.
- Text inputs: `border-(--border-strong)` — `--border` is too faint to show where a field is.
- Icon-only buttons: `p-2 rounded-full transition` with hover fill — **and an `aria-label`**
  (see `ACCESSIBILITY.md`; `title` alone is not enough).
- Every button gets `cursor-pointer` explicitly (Tailwind v4 removed the default),
  `active:scale-95`, and `transition-all duration-150`.
- Focus ring: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)`
  (the pattern in `GameOverlay`; ≥ 4.7:1 against every surface in both themes). Never `outline-none` without a `focus-visible` replacement.
- Disabled: `disabled:opacity-50 disabled:cursor-not-allowed` (`.chem-btn:disabled`).
- Toggle switches: `SwitchRow` from `components/ui/Switch.tsx` — `role="switch" aria-checked`,
  `--action` when on, a `--muted` outline when off.

## 6. Motion

Available in `globals.css`: `.shake-animation` (wrong answer, 0.4s), `.glow-pulse` (ambient,
2.4s loop), `floatUp` (Formula Blaster bubbles), `.overlay-enter`, `.nav-panel-in`.
Conventions: micro-interactions 150–300ms, entrances ≤ 400ms, `ease-out` for entrances.

`globals.css` ends with a `prefers-reduced-motion: reduce` block that switches off
`.shake-animation`, `.glow-pulse`, `.overlay-enter`, `.loner-pulse`, `.card-pulse`,
`.ledger-tick`, `.nav-panel-in` and the `.atom-move` / `.beam-tilt` transitions. Add every new animation class to that block. Never convey information *only*
through motion (loners are hollow dots as well as pulsing ones).

## 7. Layout

- `GameShell` is the root: `fullBleed` for arena-style games (Formula Blaster), centered
  (`items-center justify-between`) for board-style games (Acid Classification).
- Header: progress (and lives / timer) | task | hint, level & score, exit. It sits on
  `--surface` with a `--border` edge and follows the site theme like every other bar.
- Footer: `max-w-3xl grid-cols-3` — instructions | pause | settings. Keep these slots; players
  rely on the same controls being in the same place in every game.
- Mobile-first; the only breakpoints in use are `sm:` and `md:` (occasionally `lg:` for padding).
  Design for 360px width first, then widen.
- Use `useInputMethod()` to enlarge hit areas / spacing when the primary input is touch.
- `select-none` on the shell is intentional (prevents text selection during rapid play); don't
  apply it to instructions text or anything a student might want to copy.

## 8. Icons

`lucide-react` only — no second icon library. Sizes: `w-4 h-4` (inline/button), `w-5 h-5`
(footer controls), `w-6 h-6` (icon-only buttons), `w-8 h-8 md:w-10 md:h-10` (category buttons).
Decorative icons get `aria-hidden="true"`. Name-based lookups go through `ChemIcon`.

## 9. Known inconsistencies (fix when you touch the file)

- `ClassificationButton.tsx` types `icon: any` (should be `LucideIcon`, which it already imports)
  and imports from `@/src/core-engine/...` — verify that alias resolves; every other file uses
  `@/core-engine/...`.
- Mixed `bg-(--x)` and `bg-[var(--x)]` syntax — standardise on the shorthand as you go.
- `tailwind.config.ts` (see §1) — decide: delete, or wire with `@config`.
- The hint panels still use `amber-500` / `blue-500` palette classes — see docs/TODO.md,
  Colour scheme. Build new hint UI on `--hint` / `--hint-surface`.
