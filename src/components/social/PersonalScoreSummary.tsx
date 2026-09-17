'use client';

import { Medal, Play, Trophy } from 'lucide-react';
import type { PersonalScore } from '@/core-engine/types/general';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { useI18n } from '@/i18n/client';
import { gameTitle } from '@/i18n/game-titles';

interface PersonalScoreSummaryProps { scores: PersonalScore[]; }

export function PersonalScoreSummary({ scores }: PersonalScoreSummaryProps) {
  const { t } = useI18n();

  return (
    <section className="w-full">
      <div className="mb-5 flex items-center gap-2">
        <Trophy className="h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
        <h2 className="text-3xl font-black">{t.leaderboards.myResults}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 sm:grid-cols-3">
        {scores.map((score) => (
          <article key={score.gameId} className="game-card flex min-h-55 flex-col p-5 transition hover:-translate-y-1 hover:border-amber-400">
            <div className="flex items-start justify-between gap-3">
              <span className="text-3xl" aria-hidden="true">{score.icon}</span>
              {/*
                `conceptTitle` is a concept name stored in Supabase and has no
                translated column, so it is shown as the database has it. This
                is the same limitation as the game titles — see
                src/i18n/game-titles.ts and docs/i18n/README.md § Known gaps.
              */}
              <span
                className="rounded-full px-2.5 py-1 text-xs font-black text-slate-950 uppercase tracking-wider"
                style={{ backgroundColor: score.themeColor }}
              >
                {score.conceptTitle ?? score.gameId.replace(/-/g, ' ')}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-black">
              {gameTitle(t, score.gameId, score.gameTitle)}
            </h3>
            {score.highestScore !== null ? (
              <div className="mt-auto flex items-end justify-between gap-2 border-t border-[var(--border)] pt-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">
                    {t.leaderboards.highScore}
                  </p>
                  <p className="text-3xl font-black">{score.highestScore}</p>
                </div>
                <div className="text-right">
                  <p className="flex items-center justify-end gap-1 text-xs font-bold uppercase tracking-wide text-muted">
                    <Medal className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {t.leaderboards.rank}
                  </p>
                  <p className="text-xl font-black text-amber-500">
                    {score.globalRank === null
                      ? t.leaderboards.unranked
                      : `#${score.globalRank}`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-auto rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface-2)] p-3 text-sm">
                <p className="font-bold">{t.leaderboards.firstResultTitle}</p>
                <p className="mt-1 text-muted">{t.leaderboards.firstResultBody}</p>
                <LocaleLink
                  href={`/games/${score.gameId}`}
                  className="mt-3 inline-flex items-center gap-1 font-bold text-blue-500 hover:underline"
                >
                  <Play className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {t.common.playNow}
                </LocaleLink>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
