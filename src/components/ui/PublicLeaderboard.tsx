'use client';

import { Medal, Trophy, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { GameLeaderboard, GameName } from '@/core-engine/types/general';

interface PublicLeaderboardProps { leaderboards: GameLeaderboard[]; }

export function PublicLeaderboard({ leaderboards }: PublicLeaderboardProps) {
  const [activeTab, setActiveTab] = useState<GameName | undefined>(leaderboards[0]?.gameId);
  const activeData = useMemo(() => leaderboards.find((leaderboard) => leaderboard.gameId === activeTab), [leaderboards, activeTab]);
  const rankedEntries = useMemo(() => activeData ? [...activeData.entries].sort((a, b) => b.score - a.score).map((entry, index) => ({ ...entry, rank: index + 1 })) : [], [activeData]);

  return <section className="game-card overflow-hidden"><div className="border-b border-[var(--border)] bg-[linear-gradient(135deg,rgba(245,158,11,0.18),transparent_65%)] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><Trophy className="h-6 w-6 text-amber-500" /><h2 className="text-2xl font-black">Top scientists</h2></div><span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-bold text-muted"><UsersRound className="h-3.5 w-3.5" />Global network</span></div><div className="mt-5 flex flex-wrap gap-2">{leaderboards.map((leaderboard) => <button key={leaderboard.gameId} type="button" onClick={() => setActiveTab(leaderboard.gameId)} className={`rounded-lg border px-3 py-2 text-sm font-bold transition ${activeTab === leaderboard.gameId ? 'border-amber-500 bg-amber-500 text-slate-950' : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-amber-400'}`}>{leaderboard.gameTitle}</button>)}</div></div><div className="p-4 sm:p-6"><h3 className="text-lg font-black">{activeData?.gameTitle}</h3>{rankedEntries.length === 0 ? <div className="mt-4 rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface-2)] p-8 text-center"><Trophy className="mx-auto h-7 w-7 text-amber-500" /><p className="mt-3 font-black">The podium is waiting.</p><p className="mt-1 text-sm text-muted">Play the first round and claim the top spot.</p></div> : <ol className="mt-4 space-y-3">{rankedEntries.map((entry) => <LeaderboardRow key={entry.id} entry={entry} />)}</ol>}</div></section>;
}

function LeaderboardRow({ entry }: { entry: { id: string; alias: string; score: number; timestamp: string; rank: number } }) {
  const accent = entry.rank === 1 ? 'border-amber-400 bg-amber-500/10' : entry.rank === 2 ? 'border-slate-400 bg-slate-500/10' : entry.rank === 3 ? 'border-orange-400 bg-orange-500/10' : 'border-[var(--border)] bg-[var(--surface-2)]';
  return <li className={`flex items-center gap-3 rounded-xl border p-3 ${accent}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center gap-0.5 rounded-lg border border-current font-black"><Medal className="h-4 w-4" aria-hidden="true" /><span className="sr-only">Rank </span>{entry.rank}</span><div className="min-w-0 flex-1"><p className="truncate font-black">{entry.alias}</p><p className="text-xs text-muted">Recorded {formatLeaderboardDate(entry.timestamp)}</p></div><div className="text-right"><p className="text-xl font-black">{entry.score}</p><p className="text-xs font-bold uppercase tracking-wide text-muted">Points</p></div></li>;
}

function formatLeaderboardDate(timestamp: string) {
  const [year, month, day] = timestamp.slice(0, 10).split('-');
  return year && month && day ? `${day} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(month) - 1]} ${year}` : timestamp;
}
