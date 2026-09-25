import type { ReactNode } from 'react';
import { Medal } from 'lucide-react';

/**
 * One row of a score list: the public leaderboard's ranked entries and the
 * signed-in student's personal high scores both render through this, so the
 * two lists cannot drift apart.
 *
 *   [lead]  title                 [aside]
 *           detail
 *
 * - `lead`: a fixed-size mark on the left (a `RankBadge`, or a `GameIcon`).
 * - `title` / `detail`: the text column. It takes the remaining width and
 *   wraps (`min-w-0` + `wrap-anywhere`), so a long German or Russian game
 *   name, or an alias with no spaces, reflows at 320px instead of pushing the
 *   score off the edge.
 * - `aside`: the right-hand column, usually a `ScoreFigure`. It never shrinks
 *   or wraps, so the numbers stay whole.
 * - `rank`: tints the row gold / silver / bronze for places 1–3. The podium is
 *   also told by the rank number (and the medal), never by the tint alone.
 *
 * It renders an `<li>`: put it in an `<ol>` (ranked) or `<ul>`.
 */
export function ScoreRow({
  lead,
  title,
  detail,
  aside,
  rank = null,
}: {
  lead: ReactNode;
  title: ReactNode;
  detail?: ReactNode;
  aside: ReactNode;
  rank?: number | null;
}) {
  return (
    <li className={`flex items-center gap-3 rounded-xl border p-3 ${podiumClasses(rank)}`}>
      <span className="flex shrink-0">{lead}</span>
      <div className="min-w-0 flex-1">
        <p className="font-black wrap-anywhere">{title}</p>
        {detail ? <div className="text-xs text-muted">{detail}</div> : null}
      </div>
      <div className="shrink-0 text-right">{aside}</div>
    </li>
  );
}

/** The right-hand number and its small label ("1250 / POINTS"). */
export function ScoreFigure({ value, label }: { value: ReactNode; label: ReactNode }) {
  return (
    <>
      <p className="text-xl font-black whitespace-nowrap">{value}</p>
      <p className="text-xs font-bold uppercase tracking-wide whitespace-nowrap text-muted">{label}</p>
    </>
  );
}

/**
 * The leaderboard's rank square: a medal and the place number. `labelA11y`
 * (t.leaderboards.rankA11y) is read before the number, so a screen reader
 * hears "Rank 3" rather than a bare "3".
 */
export function RankBadge({ rank, labelA11y }: { rank: number; labelA11y: string }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center gap-0.5 rounded-lg border border-current font-black">
      <Medal className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{labelA11y} </span>
      {rank}
    </span>
  );
}

function podiumClasses(rank: number | null) {
  if (rank === 1) return 'border-(--rank-gold) bg-(--rank-gold-surface)';
  if (rank === 2) return 'border-(--rank-silver) bg-(--rank-silver-surface)';
  if (rank === 3) return 'border-(--rank-bronze) bg-(--rank-bronze-surface)';
  return 'border-(--border) bg-(--surface-2)';
}
