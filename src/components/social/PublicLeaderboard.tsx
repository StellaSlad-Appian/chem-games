'use client';

import { Medal, Trophy, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { GameLeaderboard, GameName } from '@/core-engine/types/general';
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

  return <section className="game-card overflow-hidden"><div className="border-b border-[var(--border)] bg-[linear-gradient(135deg,rgba(245,158,11,0.18),transparent_65%)] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><Trophy className="h-6 w-6 shrink-0 text-amber-500" aria-hidden="true" /><h2 className="text-2xl font-black">{t.leaderboards.topScientists}</h2></div><span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-bold text-muted"><UsersRound className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />{t.leaderboards.globalNetwork}</span></div><div className="mt-5 flex flex-wrap gap-2">{leaderboards.map((leaderboard) => <button key={leaderboard.gameId} type="button" onClick={() => setActiveTab(leaderboard.gameId)} className={`rounded-lg border px-3 py-2 text-sm font-bold transition ${activeTab === leaderboard.gameId ? 'border-amber-500 bg-amber-500 text-slate-950' : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-amber-400'}`}>{gameTitle(t, leaderboard.gameId, leaderboard.gameTitle)}</button>)}</div></div><div className="p-4 sm:p-6"><h3 className="text-lg font-black">{activeData ? gameTitle(t, activeData.gameId, activeData.gameTitle) : null}</h3>{rankedEntries.length === 0 ? <div className="mt-4 rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface-2)] p-8 text-center"><Trophy className="mx-auto h-7 w-7 text-amber-500" aria-hidden="true" /><p className="mt-3 font-black">{t.leaderboards.emptyTitle}</p><p className="mt-1 text-sm text-muted">{t.leaderboards.emptyBody}</p></div> : <ol className="mt-4 space-y-3">{rankedEntries.map((entry) => <LeaderboardRow key={entry.id} entry={entry} t={t} f={f} locale={locale} />)}</ol>}</div></section>;
}

function LeaderboardRow({ entry, t, f, locale }: { entry: { id: string; alias: string; score: number; timestamp: string; rank: number }; t: Dictionary; f: (template: string, values?: Record<string, string | number>) => string; locale: Locale }) {
  const accent = entry.rank === 1 ? 'border-amber-400 bg-amber-500/10' : entry.rank === 2 ? 'border-slate-400 bg-slate-500/10' : entry.rank === 3 ? 'border-orange-400 bg-orange-500/10' : 'border-[var(--border)] bg-[var(--surface-2)]';
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
