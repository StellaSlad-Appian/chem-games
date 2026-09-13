# Database: Concepts, Cheat Sheets and Games

Migration: [`supabase/migrations/20260913_create_concepts.sql`](../supabase/migrations/20260913_create_concepts.sql)

## Current schema (before this migration)

| Table | Purpose | Notes |
|---|---|---|
| `profiles` | One row per auth user: alias, year level, streaks, privacy toggles | `year_level` is free text (no check) |
| `games` | Game catalogue: id (slug), title, icon, theme colour, `is_active`, order | Only the 3 launched games are seeded |
| `game_progress` | Per user × game best score/level, `last_played_at` | FK → `games.id` |
| `game_sessions` | One row per completed run: score, level, outcome, duration | FK → `games.id`; powers the `leaderboard_entries` view |
| `feedback` | Bug/chemistry/feature reports | Insert-only policy |

There was no notion of a *concept*, and cheat sheets existed only in code.

## What the migration adds

```
concepts ──< concept_cheat_sheets >── cheat_sheets
   │  └─ parent_id (self-reference: polyatomic-ions ⊂ ionic-compounds)
   └──< concept_games >── games ──< game_progress / game_sessions
                                          │
                       user_concept_progress (view, per user × concept)
```

- **`concepts`** — the curriculum unit of organisation (strand, year level, VCAA reference,
  optional parent). This is what a teacher-facing dashboard or a "learning path" would be
  built around.
- **`cheat_sheets`** — a registry of slugs mirroring `src/lib/cheat-sheet-data.ts`. Content is
  *not* in the database (see below).
- **`concept_cheat_sheets`** — many-to-many; `is_primary` marks the sheet that the concept page
  should open by default (at most one per concept, enforced by a partial unique index).
- **`concept_games`** — many-to-many with a `role`: `primary` (the game *for* this concept —
  at most one per concept), `practice` (also exercises it), `prerequisite` (play this first).
  A game may be `primary` for more than one concept, which covers the "exceptions" you
  mentioned without special-casing.
- **`user_concept_progress`** — a view that rolls `game_progress` up to concepts, so
  "has this student engaged with stoichiometry?" is one query. `security_invoker = true`
  means the user's own RLS on `game_progress` still applies.

Seeded: 13 concepts (including nested `polyatomic-ions`, `lewis-structures`,
`organic-nomenclature`, `reaction-pathways`), 12 cheat-sheet slugs, the links between them, and
`reaction-balancer` / `bond-builder` rows in `games` as **inactive** so links (and later session
recording) don't hit foreign-key errors.

## Decisions and alternatives

**Cheat-sheet content stays in code.** The pages are statically generated
(`generateStaticParams`), the content is versioned with the chemistry data it references
(`POLYATOMIC_ION_TABLE` is built from `ions.ts` at build time), and there is no admin UI. Moving
content to a `jsonb` column would make it editable without a deploy but would cost static
rendering and type safety. Revisit if teachers need to edit sheets themselves; the registry
table makes that a non-breaking addition (`alter table cheat_sheets add column content jsonb`).

**Concepts are hierarchical, not tagged.** A single `parent_id` keeps the curriculum tree
simple (strand → concept → sub-concept). If you later need concepts in multiple strands, swap
to a `concept_tags` table.

**Slugs everywhere.** Concept ids, cheat-sheet slugs and game ids are all text slugs that match
the code (`GameName`, cheat-sheet `slug`). Keep it that way — it makes seeds readable and lets
the app link without lookups.

## Suggested changes to the existing schema (not in this migration)

1. **`game_sessions.accuracy`** — `recordGameSession()` accepts `accuracy` but only folds it into
   a running average on `profiles`. Storing it per session enables per-concept accuracy in the
   view above. `alter table game_sessions add column accuracy integer check (accuracy between 0 and 100);`
2. **`game_sessions.time_scale`** — the accessibility doc requires an adjustable/disabled timer.
   Record it (`numeric default 1`) so leaderboards can filter or label relaxed runs.
3. **`profiles.year_level` check constraint** to the same five values used here.
4. **`games.concept_id`** is deliberately *not* added — use `concept_games` so the many-to-many
   cases work.
5. **Slug hygiene**: `classifier-games-config.ts` uses ids like `acid-base-classifier` that don't
   match `games.id` (`acid-classification`). Any new classifier page must use the `games.id`
   slug in `recordGameSession()` or inserts will fail the FK.
6. The `*_rows.sql` files in `supabase/migrations/` are data dumps, not migrations; the
   Supabase CLI will try to run them in filename order. Move them to `supabase/seed/` (or
   `supabase/seed.sql`) so `supabase db reset` doesn't replay production rows.

## Applying it

```bash
supabase db push
```

or paste the file into the Supabase SQL editor. It is idempotent (`if not exists` /
`on conflict`), so re-running is safe.
