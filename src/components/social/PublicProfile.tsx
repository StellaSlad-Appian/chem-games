// src/components/ui/PublicProfile.tsx
'use client';

import { 
  Atom, 
  CalendarDays, 
  NotebookPen, 
  UserRound,
  MapPin,
  Flame,
  Target,
  FlaskConical,
  Medal,
  GraduationCap
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { UserProfile } from '@/core-engine/types/general';
import { useI18n } from '@/i18n/client';
import { formatPercent } from '@/i18n/format';

interface PublicProfileProps { 
  profile: UserProfile; 
}

const elementColors: Record<string, string> = {
  alkali: 'border-red-400 bg-red-500/15 text-red-500',
  'noble-gas': 'border-purple-400 bg-purple-500/15 text-purple-500',
  'transition-metal': 'border-blue-400 bg-blue-500/15 text-blue-500',
  halogen: 'border-emerald-400 bg-emerald-500/15 text-emerald-500',
  nonmetal: 'border-amber-400 bg-amber-500/15 text-amber-500',
};

export function PublicProfile({ profile }: PublicProfileProps) {
  const { t, locale } = useI18n();
  const elementStyle = profile.favoriteElement 
    ? elementColors[profile.favoriteElement.group] 
    : 'border-violet-400 bg-violet-500/15 text-violet-500';

  return (
    <article className="game-card w-full overflow-hidden">
      {/* Header Section */}
      <div className="border-b border-[var(--border)] bg-[linear-gradient(135deg,rgba(139,92,246,0.18),transparent_60%)] p-6">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          
          {/* Avatar / Favorite Element */}
          <div className={`flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-2xl border ${elementStyle} shadow-lg`}>
            {profile.favoriteElement ? (
              <>
                <span className="text-xs font-bold">{profile.favoriteElement.atomicNumber}</span>
                <span className="text-4xl font-black leading-none">{profile.favoriteElement.symbol}</span>
              </>
            ) : (
              <Atom className="h-11 w-11" />
            )}
          </div>
          
          {/* Main Identity */}
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <UserRound className="h-6 w-6 text-violet-500" />
              <h1 className="text-4xl font-black">{profile.alias}</h1>
              {profile.country && profile.privacy.showCountry && (
                <span className="flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-1 text-xs font-bold text-blue-500">
                  <MapPin className="h-3 w-3" />
                  {profile.country}
                </span>
              )}
            </div>
            
            <p className="mt-1 text-sm font-bold uppercase tracking-widest text-[var(--muted)]">
              {profile.title || t.profile.defaultTitle}
            </p>
            
            {/* Quick Stats Chips */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              {profile.privacy.showTotalSyntheses && (
                <StatChip label={t.profile.statExperiments} value={profile.totalSyntheses.toString()} icon={FlaskConical} />
              )}
              {profile.yearLevel && profile.privacy.showYearLevel && (
                <StatChip label={t.profile.statLevel} value={t.yearLevels[profile.yearLevel]} icon={GraduationCap} color="text-sky-500 bg-sky-500/10 border-sky-500/20" />
              )}
              {profile.currentStreak !== undefined && profile.currentStreak > 0 && profile.privacy.showCurrentStreak && (
                <StatChip label={t.profile.statStreak} value={profile.currentStreak.toString()} icon={Flame} color="text-orange-500 bg-orange-500/10 border-orange-500/20" />
              )}
              {profile.accuracy !== undefined && profile.privacy.showAccuracy && (
                <StatChip label={t.profile.statAccuracy} value={formatPercent(locale, profile.accuracy)} icon={Target} color="text-emerald-500 bg-emerald-500/10 border-emerald-500/20" />
              )}
              {profile.privacy.showJoinedDate && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-bold text-[var(--muted)]">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {t.profile.labMember}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Profile Data */}
      <div className="grid gap-6 p-6 sm:grid-cols-2">
        {/* Lab Notes */}
        {profile.privacy.showLabNotes && (
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2">
              <NotebookPen className="h-5 w-5 text-violet-500" />
              <h2 className="text-xl font-black">{t.profile.labNotes}</h2>
            </div>
            <p className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 leading-relaxed text-[var(--muted)]">
              {profile.labNotes || t.profile.labNotesEmpty}
            </p>
          </div>
        )}

        {/* Favorite Compound (Optional) */}
        {profile.favoriteCompound && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)]">{t.profile.favouriteCompound}</h3>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <FlaskConical className="h-5 w-5" />
              </div>
              <div>
                <p className="font-black text-[var(--foreground)]">{profile.favoriteCompound.name}</p>
                <p className="font-mono text-sm text-[var(--muted)]">{profile.favoriteCompound.formula}</p>
              </div>
            </div>
          </div>
        )}

        {/* Badges (Optional) */}
        {profile.badges && profile.badges.length > 0 && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Medal className="h-5 w-5 text-yellow-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)]">{t.profile.achievements}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {profile.badges.map((badge) => (
                <div key={badge.id} className="group relative flex h-12 w-12 cursor-help items-center justify-center rounded-full border-2 border-yellow-500/30 bg-yellow-500/10 transition hover:border-yellow-500 hover:bg-yellow-500/20">
                  <Medal className="h-6 w-6 text-yellow-500" />
                  {/* Tooltip on hover */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded bg-[var(--foreground)] px-2 py-1 text-xs text-[var(--background)] opacity-0 transition-opacity group-hover:opacity-100">
                    <strong>{badge.name}</strong>: {badge.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function StatChip({ 
  label, 
  value, 
  icon: Icon,
  color = "bg-violet-500 text-white border-violet-500" 
}: { 
  label: string; 
  value: string; 
  icon?: LucideIcon;
  color?: string;
}) { 
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-black ${color}`}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      <span>{value} <span className="opacity-80 font-medium">{label}</span></span>
    </span>
  ); 
}
