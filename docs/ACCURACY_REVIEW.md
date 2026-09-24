# Accuracy review (2026-09-24)

How the "Accuracy" stat on a student's profile was calculated, why it was taken off the
profile on branch `feature/standard-toggles`, and what has to change before it comes back.

**Status:** hidden. The profile chip and the "Show answer accuracy %" switch are gone, and
the edit form no longer writes `show_accuracy`. Nothing else changed: every game still
records `game_sessions.accuracy`, and the trigger still maintains `profiles.accuracy`. The
per-run data is kept on purpose, because it is the input to whatever replaces the number.

---

## How the number was made

1. **Each game computes a whole-number percentage for one run** and passes it to
   `recordGameSession({ accuracy })`. What that percentage means differs by game (table
   below).
2. **The server validates it** (`src/core-engine/utils/session-validation.ts:201-207`):
   an integer 0–100, or absent.
3. **It is stored per run** in `game_sessions.accuracy` (nullable integer,
   `supabase/migrations/20260914_profile_privacy.sql:225-227`).
4. **A trigger folds it into the profile** after every insert
   (`20260914_profile_privacy.sql:278-287`):

   ```
   if new.accuracy is null         -> profile unchanged
   elif prev is null or prev = 0   -> profile = new
   else                            -> profile = round((prev + new) / 2)
   ```

   This is a 50/50 blend with the stored value, not a running average. The latest run
   carries half the weight, the one before a quarter, then an eighth, and so on.
5. **It was shown** by `src/components/social/PublicProfile.tsx` on `/profile` and the
   home-page profile block. Both read the student's own row. The `public_profiles` view
   masks it behind `show_accuracy`, but nothing in `src/` reads that view.

## What each game counts

| Game | Counted as "accurate" | When recorded | Caveat |
|---|---|---|---|
| acid-classification | correct picks ÷ (correct + wrong picks) | on victory or failure | The run ends at 3 mistakes, so any win is about 92% or higher. |
| formula-blaster | correct hits ÷ (hits + wrong clicks) | on victory or failure | Targets that float away are not misses, so a timed-out run with no wrong clicks is 100%. |
| neutralise | — | never | No accuracy is sent. |
| reaction-balancer | rounds finished without the tier-3 hint ÷ rounds played (`src/hooks/useReactionBalancer.ts:540`) | on victory, or on exit after ≥1 round | Wrong attempts are never counted, so this measures hint use, not correctness. Support mode → null. |
| lewis-structures | the same tier-3 rule | on victory, or on exit | The same as reaction-balancer. Mistakes in the Level 5 marking mode are not counted. |

Difficulty and run length are ignored: a one-round abandoned run carries as much weight as
a full playthrough.

---

## Findings, most urgent first

### Fixed by hiding the stat

These were the reasons to hide it. Each one showed a student a wrong number.

- **The last run or two dominate.** An abandoned balancer run after one round records
  100%, which pulls a stored 40% up to 70%.
- **A stored 0 is discarded.** A student at 0% who then scores 60% jumps straight to 60%.
- **One label, three different measures.** Answer correctness (acid, formula), hint
  avoidance (balancer, Lewis), and nothing (neutralise), all presented as "answer
  accuracy %".
- **New students saw "0%".** `profiles.accuracy` starts null. The display checked
  `!== undefined`, which lets null through, and `formatPercent(null)` renders "0%".
- **The privacy switch did almost nothing.** Accuracy was only ever shown to the student
  themselves.

### Fixed 2026-09-24: these corrupted the per-run data

These mattered even with nothing displayed, because every run recorded with them was a
bad row for any future framework to read. Rows saved before the fix are still affected.

1. ~~**The reaction-balancer Challenge double-counts rounds.**~~ **Fixed:** the
   Challenge now starts with `startLevel(challengeLevel, { newSession: true })`, which
   resets the round counters and keeps `results` for the notebook. Originally: `handleStartChallenge` in
   `src/app/[lang]/(gameplay)/games/reaction-balancer/page.tsx` calls
   `startLevel(challengeLevel)` without `{ resetRun: true }`. `roundsPlayed` and
   `roundsWithoutTier3` therefore carry over, and the Challenge session is saved with the
   main run's 12 rounds folded in. Fix: reset the two round counters (not the score) when
   the Challenge starts. lewis-structures has no Challenge, so it is not affected.
2. ~~**Support mode is read only at save time**~~ **Fixed:** both hooks latch
   `supportUsed` and withhold accuracy for the whole session; a restart (or the
   Challenge) clears it. Originally: (`useReactionBalancer.ts:540`,
   `useLewisStructures.ts:749`). Switching it off just before the end records a
   percentage for a run played with support. Switching it on erases a bad run. Fix: latch
   "support was on at any point this run" and record null if so.

### Still open: needed before accuracy comes back

3. **Define accuracy per game as correct ÷ all attempts, including wrong ones.**
   Balancer and Lewis need to start counting wrong attempts, Formula Blaster needs a
   decision on missed targets, and neutralise needs to record something.
4. **Show it per game, not as one blended profile number.** Compute it from
   `game_sessions` as a pooled ratio (Σcorrect ÷ Σattempts), which needs two integer
   columns instead of one percentage. Replace or drop the 50/50 trigger when this
   lands.
5. **Only count runs above a minimum length**, or weight by attempts, so a 0-second
   abandoned run cannot move the number.
6. **The browser reports the percentage itself.** A signed-in user can insert a
   `game_sessions` row with `accuracy = 100` through the Supabase API; the guard trigger
   checks only score, level, duration and rate. This is low while the number is hidden
   and must be fixed before it appears on any leaderboard.
7. **No backfill.** Sessions from before `20260914_profile_privacy.sql` have no
   accuracy.

### Loose ends

- The Support mode help text in the balancer and Lewis message catalogues still says it
  "never lowers your accuracy", a stat the player can no longer see. That is harmless,
  but worth rewording when the framework lands.
- The `profiles.show_accuracy` column, `UserProfile.accuracy` and
  `privacy.showAccuracy` are still loaded but unused. Leave them until the framework
  decides what replaces them.
