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
  (the default); `[data-theme='light']` overrides it. `game-settings-context.tsx` sets
  `document.documentElement.dataset.theme`, with a per-game override. Any new color token
  **must be defined in both blocks** or it will silently fall back in one theme.
- **Fonts:** `Bebas Neue` (display, applied automatically to `h1`–`h3`) and `DM Sans` (body),
  loaded via Google Fonts in `globals.css`. Formulas render in `font-mono` via `MoleculeText`.

## 2. Design tokens

Reference tokens with Tailwind's v4 shorthand: `bg-(--surface)`, `text-(--muted)`,
`border-(--border)`. The older `bg-[var(--surface)]` form also appears in the codebase and works;
**prefer the shorthand** in new code. For values computed at runtime, use inline `style`
(`style={{ borderColor: 'var(--correct)' }}`), as `ClassificationButton.tsx` does.

### Surface & text

| Token | Use for |
|---|---|
| `--background` | Page background (also painted by `GameShell`) |
| `--surface` / `--surface-2` | Cards, panels / nested rows and hover fills |
| `--border` | Default 2px borders on cards, buttons, inputs |
| `--foreground` / `--muted` | Primary text / secondary labels, helper text |
| `--game-panel` / `--game-panel-border` | Modal shells and HUD panels (Settings modal) |
| `--game-modal-header` / `--game-modal-row` / `--game-modal-control` | Modal internals |
| `--game-highlight-surface` / `--game-highlight-border` | Emphasised-but-inactive controls (e.g. toggle "off" state) |
| `--game-panel-text` / `--game-panel-muted` | Text inside `--game-panel` surfaces |
| `--game-bg-start` / `--game-bg-end` | The `.game-shell` vertical gradient |
| `--shadow-card` / `--shadow-lg` | Elevation (`.game-card`) |

### Chemistry semantics — theme-neutral, never restyle per theme

| Token | Meaning |
|---|---|
| `--acid-color` (rose) / `--base-color` (blue) / `--neutral-color` (emerald) / `--amphoteric-color` (purple) | Classification identity |
| `--chem-acid-bg` etc. | Deep tinted backgrounds for the same classes |
| `--correct` / `--wrong` (`--game-success` / `--game-error`) | Answer feedback |
| `--game-glow` | Ambient highlight (violet) |

Rule from `globals.css`: "game meaning never changes with appearance." A new chemistry concept
that needs an identity color (e.g. oxidation vs reduction, polar vs non-polar) gets a new
theme-neutral token pair here, not an ad-hoc Tailwind color in a component.

### Game-state accents (from `GameOverlay.tsx`)

`paused` → `blue-500`, `failed` → `rose-500`, `victory` → `emerald-500`, `levelUp` → `amber-500`.
The header's hero "task" panel is `amber-500`-tinted. Keep these; they're how players learn state.

### Category color pattern (from `classifier-games-config.ts`)

Config-driven categories use a single Tailwind string in this shape:

```
border-{hue}-500 text-{hue}-400 bg-{hue}-500/10 hover:bg-{hue}-500/20
```

Because these are complete class strings in config (not composed at runtime), Tailwind can see
them. Never build class names by string concatenation (`border-${hue}-500`) — they'll be purged.

## 3. Typography

| Role | Classes |
|---|---|
| Page/game title | `h1` (Bebas Neue automatic) `text-3xl sm:text-4xl font-black tracking-tight` |
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

- Cards/panels: `rounded-2xl border-2 border-(--border) bg-(--surface)` — or the `.game-card`
  component class. Inner rows: `rounded-xl`. Pills/badges: `rounded-full`.
- Padding rhythm: `p-4` (rows) → `p-6` (cards) → `p-8` (modal content). Section gaps `gap-4`,
  page-level gaps `gap-6`/`gap-8`.
- Borders are **2px** for anything interactive or card-like, 1px for internal dividers.
- Elevation: `shadow-md` on buttons, `shadow-xl`/`shadow-2xl` on modals and the HUD header.
- Modal scrim: `fixed inset-0 bg-slate-950/80 backdrop-blur-sm` (`backdrop-blur-md` for the
  overlay). This scrim is deliberately dark in both themes.

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
  `rounded-xl bg-blue-500 hover:bg-blue-600 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition`.
- Secondary: `.btn-ghost` or `border border-(--border) bg-(--background) text-(--foreground) hover:border-blue-500`.
- Destructive/exit: `bg-rose-600 hover:bg-rose-500 text-white` (Header exit) or `.btn-danger-ghost`.
- Icon-only buttons: `p-2 rounded-full transition` with hover fill — **and an `aria-label`**
  (see `ACCESSIBILITY.md`; `title` alone is not enough).
- Every button gets `cursor-pointer` explicitly (Tailwind v4 removed the default),
  `active:scale-95`, and `transition-all duration-150`.
- Focus ring: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400`
  (the pattern already in `GameOverlay`). Never `outline-none` without a `focus-visible` replacement.
- Disabled: `disabled:opacity-50 disabled:cursor-not-allowed` (`.chem-btn:disabled`).
- Toggle switches follow `GameSettingsModal`: `role="switch" aria-checked`, `--game-success`
  when on, `--game-highlight-surface` when off.

## 6. Motion

Available in `globals.css`: `.shake-animation` (wrong answer, 0.4s), `.glow-pulse` (ambient,
2.4s loop), `floatUp` (Formula Blaster bubbles), `.animate-slide-in` (banners), `.overlay-enter`.
Conventions: micro-interactions 150–300ms, entrances ≤ 400ms, `ease-out` for entrances.

There is currently **no `prefers-reduced-motion` handling anywhere**. New animations must be
wrapped so they can be disabled — see `ACCESSIBILITY.md` §Motion for the required media query and
the planned in-app toggle. Never convey information *only* through motion.

## 7. Layout

- `GameShell` is the root: `fullBleed` for arena-style games (Formula Blaster), centered
  (`items-center justify-between`) for board-style games (Acid Classification).
- Header: 3-column grid (`grid-cols-1 md:grid-cols-3`) — progress | task | stats/exit.
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

- `GamesHeader.tsx` and `GameFooter.tsx` hardcode `slate-*`/`text-white` and therefore do not
  adapt to the light theme. They should move to `--game-panel` / `--game-panel-border` /
  `--foreground` tokens.
- `ClassificationButton.tsx` types `icon: any` (should be `LucideIcon`, which it already imports)
  and imports from `@/src/core-engine/...` — verify that alias resolves; every other file uses
  `@/core-engine/...`.
- Mixed `bg-(--x)` and `bg-[var(--x)]` syntax — standardise on the shorthand as you go.
- `tailwind.config.ts` (see §1) — decide: delete, or wire with `@config`.
- `text-slate-500` on dark backgrounds (footer icons) is borderline on contrast; use
  `text-(--muted)`.
