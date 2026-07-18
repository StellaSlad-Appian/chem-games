'use client';

import { useMemo, useState } from 'react';
import type { GameLeaderboard, GameName } from '../../core-engine/types/general';

interface PublicLeaderboardProps {
  leaderboards: GameLeaderboard[];
}

export function PublicLeaderboard({ leaderboards }: PublicLeaderboardProps) {
  const [activeTab, setActiveTab] = useState<GameName | undefined>(leaderboards[0]?.gameId);
  const activeData = useMemo(() => leaderboards.find((leaderboard) => leaderboard.gameId === activeTab), [leaderboards, activeTab]);
  const rankedEntries = useMemo(() => {
    if (!activeData) return [];
    const sorted = [...activeData.entries].sort((a, b) => b.score - a.score);
    return sorted.map((entry) => ({ ...entry, rank: sorted.findIndex((candidate) => candidate.score === entry.score) + 1 }));
  }, [activeData]);

  return <section className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6">
    <div className="flex flex-wrap gap-3 p-2 bg-slate-200 rounded-2xl border-4 border-slate-800 shadow-[inset_0px_4px_0px_rgba(0,0,0,0.1)]">{leaderboards.map((leaderboard) => <button key={leaderboard.gameId} type="button" onClick={() => setActiveTab(leaderboard.gameId)} className={`flex-1 min-w-35 px-4 py-3 font-black text-sm uppercase transition-all rounded-xl border-4 ${activeTab === leaderboard.gameId ? 'bg-amber-400 border-slate-800 text-slate-900 shadow-[0px_4px_0px_0px_rgba(30,41,59,1)] translate-y-0' : 'bg-white border-slate-300 text-slate-500 hover:border-slate-400 translate-y-1'}`}>{leaderboard.gameTitle}</button>)}</div>
    <div className="bg-white border-4 border-slate-800 rounded-3xl shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] overflow-hidden"><div className="bg-slate-800 text-white p-4 flex justify-between items-center"><h3 className="text-xl font-black uppercase tracking-wide">Top Scientists: {activeData?.gameTitle}</h3><span className="text-sm font-bold bg-slate-700 px-3 py-1 rounded-lg">Global Network</span></div><div className="p-4 sm:p-6 flex flex-col gap-3">{rankedEntries.length === 0 ? <div className="text-center p-8 text-slate-500 font-bold">No data synthesized yet. Be the first!</div> : rankedEntries.map((entry) => <LeaderboardRow key={entry.id} entry={entry} />)}</div></div>
  </section>;
}

function LeaderboardRow({ entry }: { entry: { id: string; alias: string; score: number; timestamp: string; rank: number } }) {
  const rankStyle = entry.rank === 1 ? 'bg-yellow-300 border-yellow-500 text-yellow-900 shadow-[0px_3px_0px_0px_rgba(234,179,8,1)]' : entry.rank === 2 ? 'bg-slate-200 border-slate-400 text-slate-800 shadow-[0px_3px_0px_0px_rgba(148,163,184,1)]' : entry.rank === 3 ? 'bg-orange-200 border-orange-400 text-orange-900 shadow-[0px_3px_0px_0px_rgba(249,115,22,1)]' : 'bg-slate-100 border-slate-300 text-slate-600';
  return <div className="flex items-center gap-4 p-3 bg-white border-4 border-slate-100 rounded-2xl hover:border-indigo-100 hover:bg-indigo-50 transition-colors"><div className={`flex items-center justify-center w-12 h-12 rounded-xl border-4 font-black text-lg ${rankStyle}`}>{entry.rank}</div><div className="flex-1"><p className="text-lg font-bold text-slate-800">{entry.alias}</p><p className="text-xs font-bold text-slate-400">Recorded: {new Date(entry.timestamp).toLocaleDateString()}</p></div><div className="text-right px-4"><p className="text-2xl font-black text-slate-800">{entry.score}</p><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Points</p></div></div>;
}
