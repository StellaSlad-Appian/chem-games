'use client';

import { Medal, Trophy, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { GameLeaderboard, GameName } from '@/core-engine/types/general';
import { GameIcon } from '@/components/games/GameIcon';
import { useI18n } from '@/i18n/client';
import { gameTitle } from '@/i18n/game-titles';
import { formattingLocale, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface PublicLeaderboardProps { leaderboards: GameLeaderboard[]; }

export function PublicLeaderboard({ leaderboards }: PublicLeaderboardProps) {
  const { t, f, locale } = useI18n();
  const [activeTab, setActiveTab] = useState<GameName | undefined>(leaderboards[0]?.gameId);
  const activeData = useMemo(() => leaderboards.find((leaderboard) => leaderboard.gameId === activeTab), [leaderboards, activeTab]);
  // Prefer the rank from the database view (ties share a rank); fall back to position.
  const rankedEntries = useMemo(() => activeData ? [...activeData.entries].sort((a, b) => b.score - a.score).map((entry, index) => ({ ...entry, rank: entry.rank ?? index + 1 })) : [], [activeData]);

  return <section className="game-card overflow-hidden">{/*
        The card opens like every card on the dashboard — an icon tile, the
        title, a neutral pill — rather than with the amber gradient header it
        used to have, which made it the one section that looked like another
        site.
      */}
      <div className="border-b border-(--border) p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><span className="icon-tile bg-(--accent-surface) text-(--accent)" aria-hidden="true"><Trophy className="h-5 w-5" /></span><h2 className="min-w-0 text-xl font-black break-words text-(--foreground)">{t.leaderboards.topScientists}</h2></div><span className="pill"><UsersRound className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />{t.leaderboards.globalNetwork}</span></div><div className="mt-5 flex flex-wrap gap-2">{leaderboards.map((leaderboard) => {
            const selected = activeTab === leaderboard.gameId;
            // The game's own icon, as everywhere else. On the selected tab (the
            // site's --action fill) it sits on a white tile so the accent still
            // reads; aria-pressed says which tab is selected without the colour.
            return (
              <button
                key={leaderboard.gameId}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveTab(leaderboard.gameId)}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border py-1.5 pr-3 pl-1.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link) ${selected ? 'border-(--action) bg-(--action) text-white' : 'border-(--border) bg-(--surface) text-(--foreground) hover:border-(--link)'}`}
              >
                <span className={`rounded-lg ${selected ? 'bg-(--surface)' : ''}`}>
                  <GameIcon slug={leaderboard.gameId} size="sm" />
                </span>
                {gameTitle(t, leaderboard.gameId, leaderboard.gameTitle)}
              </button>
            );
          })}</div></div><div className="p-4 sm:p-6"><h3 className="flex items-center gap-2 text-lg font-black">{activeData ? <><GameIcon slug={activeData.gameId} size="sm" />{gameTitle(t, activeData.gameId, activeData.gameTitle)}</> : null}</h3>{rankedEntries.length === 0 ? <div className="panel mt-4 border-dashed p-8 text-center"><Trophy className="mx-auto h-7 w-7 text-(--accent)" aria-hidden="true" /><p className="mt-3 font-black">{t.leaderboards.emptyTitle}</p><p className="mt-1 text-sm text-muted">{t.leaderboards.emptyBody}</p></div> : <ol className="mt-4 space-y-3">{rankedEntries.map((entry) => <LeaderboardRow key={entry.id} entry={entry} t={t} f={f} locale={locale} />)}</ol>}</div></section>;
}

function LeaderboardRow({ entry, t, f, locale }: { entry: { id: string; alias: string; score: number; timestamp: string; rank: number }; t: Dictionary; f: (template: string, values?: Record<string, string | number>) => string; locale: Locale }) {
  // The podium is told by the rank number and the medal as well as the tint.
  const accent = entry.rank === 1 ? 'border-(--rank-gold) bg-(--rank-gold-surface)' : entry.rank === 2 ? 'border-(--rank-silver) bg-(--rank-silver-surface)' : entry.rank === 3 ? 'border-(--rank-bronze) bg-(--rank-bronze-surface)' : 'border-(--border) bg-(--surface-2)';
  return <li className={`flex items-center gap-3 rounded-xl border p-3 ${accent}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center gap-0.5 rounded-lg border border-current font-black"><Medal className="h-4 w-4" aria-hidden="true" /><span className="sr-only">{t.leaderboards.rankA11y} </span>{entry.rank}</span><div className="min-w-0 flex-1"><p className="truncate font-black">{entry.alias}</p><p className="text-xs text-muted">{f(t.leaderboards.recorded, { date: formatLeaderboardDate(entry.timestamp, locale) })}</p></div><div className="text-right"><p className="text-xl font-black">{entry.score}</p><p className="text-xs font-bold uppercase tracking-wide text-muted">{t.leaderboards.points}</p></div></li>;
}

/**
 * Formats the date part of a timestamp in the reader's locale.
 *
 * The month names used to be a hardcoded English array. `Intl.DateTimeFormat`
 * gives the right month name and the right day/month order per locale — German
 * writes "14. Sept. 2026", English "14 Sept 2026" — for free, and for every
 * Phase 2 locale too. The stored value is a plain date string, so it is parsed
 * as UTC to avoid the day shifting by one in negative-offset timezones.
 *
 * It formats with `formattingLocale(locale)` rather than the locale code: a
 * bare `en` resolves to en-US and this used to render "Sep 14, 2026", which is
 * not how the Australian English the rest of the site is written in puts a
 * date. See src/i18n/config.ts § FORMATTING_LOCALE.
 */
function formatLeaderboardDate(timestamp: string, locale: Locale) {
  const datePart = timestamp.slice(0, 10);
  const parsed = new Date(`${datePart}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return timestamp;
  return new Intl.DateTimeFormat(formattingLocale(locale), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}
