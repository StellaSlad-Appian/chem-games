import { Atom, CalendarDays, NotebookPen, UserRound } from 'lucide-react';
import type { UserProfile } from '@/core-engine/types/general';

interface PublicProfileProps { profile: UserProfile; }

const elementColors: Record<string, string> = {
  alkali: 'border-red-400 bg-red-500/15 text-red-500',
  'noble-gas': 'border-purple-400 bg-purple-500/15 text-purple-500',
  'transition-metal': 'border-blue-400 bg-blue-500/15 text-blue-500',
  halogen: 'border-emerald-400 bg-emerald-500/15 text-emerald-500',
  nonmetal: 'border-amber-400 bg-amber-500/15 text-amber-500',
};

export function PublicProfile({ profile }: PublicProfileProps) {
  const elementStyle = profile.favoriteElement ? elementColors[profile.favoriteElement.group] : 'border-violet-400 bg-violet-500/15 text-violet-500';
  return <article className="game-card mx-auto w-full max-w-2xl overflow-hidden">
    <div className="border-b border-[var(--border)] bg-[linear-gradient(135deg,rgba(139,92,246,0.18),transparent_60%)] p-6">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className={`flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-2xl border ${elementStyle}`}>
          {profile.favoriteElement ? <><span className="text-xs font-bold">{profile.favoriteElement.atomicNumber}</span><span className="text-4xl font-black leading-none">{profile.favoriteElement.symbol}</span></> : <Atom className="h-11 w-11" />}
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left"><div className="flex items-center justify-center gap-2 sm:justify-start"><UserRound className="h-5 w-5 text-violet-500" /><h1 className="text-4xl font-black">{profile.alias}</h1></div><p className="mt-1 text-sm font-bold uppercase tracking-widest text-muted">Registered scientist</p><div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">{profile.privacy.showTotalSyntheses && <StatChip label="Experiments" value={profile.totalSyntheses} />} {profile.privacy.showJoinedDate && <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-bold text-muted"><CalendarDays className="h-3.5 w-3.5" />Lab member</span>}</div></div>
      </div>
    </div>
    {profile.privacy.showLabNotes && <div className="p-6"><div className="flex items-center gap-2"><NotebookPen className="h-5 w-5 text-violet-500" /><h2 className="text-xl font-black">Lab notes</h2></div><p className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 leading-relaxed text-muted">{profile.labNotes || 'This scientist is currently observing reactions in silence.'}</p></div>}
  </article>;
}

function StatChip({ label, value }: { label: string; value: number }) { return <span className="rounded-full bg-violet-500 px-3 py-1 text-xs font-black text-white">{value} {label}</span>; }
