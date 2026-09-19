# Table dumps — not migrations, do not run in order

These are `INSERT` statements exported from the live Supabase project at some
point in 2026. They sat in `supabase/migrations/` until they were moved here,
where they cannot be mistaken for schema to apply.

They are not migrations, in three separate ways:

- They carry no date prefix, so they have no place in the filename order that
  `README.md` § Installation tells you to run migrations in.
- They are data, not schema. Running them against a fresh project inserts one
  historical afternoon's rows, which is not a useful starting state.
- **`leaderboard_entries_rows.sql` cannot run at all.** `leaderboard_entries`
  is a view over `game_sessions` (see
  `202607180002_create_games_and_progress.sql`), and you cannot `INSERT` into a
  view without an `INSTEAD OF` trigger, which there isn't one of. It is a
  snapshot of what the view returned, kept as a record and nothing more.

## They contain real people's data

`profiles_rows.sql`, `game_sessions_rows.sql`, `game_progress_rows.sql` and
`leaderboard_entries_rows.sql` carry real user ids, real aliases and, in at
least one case, what is plainly a real person's name rather than a generated
alias. `feedback_rows.sql` carries messages people wrote.

There are no email addresses or password hashes in them. That is the only
reason this is a tidiness problem rather than an incident.

**Before this repository is made public**, decide what happens to them. The
options, roughly in order of effort:

1. Delete them. Git history still holds them, so this is only half a fix, but
   it stops anyone reading them from a checkout.
2. Replace them with a seed fixture written by hand, with invented aliases and
   made-up scores. That is what a dump is usually wanted for, and it can live
   in the repository without any of this weighing on it.
3. Scrub the history as well, if the aliases matter. That rewrites every commit
   that touched these files and has to be coordinated with anyone holding a
   clone.

The privacy page promises that a deleted account's data goes with it. A dump in
a git repository is a copy that no account deletion will ever reach, which is
the substantive reason to deal with this rather than leave it.
