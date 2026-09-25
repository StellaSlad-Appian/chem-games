'use client';

import { Medal, Play, Trophy } from 'lucide-react';
import type { PersonalScore } from '@/core-engine/types/general';
import { GameIcon } from '@/components/games/GameIcon';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { ScoreFigure, ScoreRow } from '@/components/social/ScoreRow';
import { useI18n } from '@/i18n/client';
import { gameTitle } from '@/i18n/game-titles';

interface PersonalScoreSummaryProps { scores: PersonalScore[]; }

/**
 * The signed-in student's best score and global rank in every game, one row
 * per game, in the same row as the public leaderboard (ScoreRow) — the game's
 * icon where the leaderboard has the rank badge.
 *
 * The rank sits under the game's name as the leaderboard's badge does: a medal
 * and the number, with `rankA11y` read before it. A game not yet played shows
 * a nudge and a "Play now" link where the score would be.
 */
export function PersonalScoreSummary({ scores }: PersonalScoreSummaryProps) {
  const { t } = useI18n();

  return (
    <section className="w-full">
      <div className="mb-5 flex items-center gap-2">
        <Trophy className="h-5 w-5 shrink-0 text-(--accent)" aria-hidden="true" />
        <h2 className="text-3xl font-black">{t.leaderboards.myResults}</h2>
      </div>
      <div className="game-card p-4 sm:p-6">
        <ul className="space-y-3">
          {scores.map((score) => {
            const played = score.highestScore !== null;
            return (
              <ScoreRow
                key={score.gameId}
                rank={score.globalRank}
                lead={<GameIcon slug={score.gameId} />}
                title={gameTitle(t, score.gameId, score.gameTitle)}
                detail={
                  !played ? (
                    t.leaderboards.firstResultBody
                  ) : score.globalRank === null ? (
                    t.leaderboards.unranked
                  ) : (
                    <span className="inline-flex items-center gap-0.5 font-bold">
                      <Medal className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="sr-only">{t.leaderboards.rankA11y} </span>
                      {`#${score.globalRank}`}
                    </span>
                  )
                }
                aside={
                  played ? (
                    <ScoreFigure value={score.highestScore} label={t.leaderboards.highScore} />
                  ) : (
                    <LocaleLink
                      href={`/games/${score.gameId}`}
                      className="inline-flex items-center gap-1 text-sm font-bold whitespace-nowrap text-(--link) hover:underline"
                    >
                      <Play className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {t.common.playNow}
                    </LocaleLink>
                  )
                }
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
