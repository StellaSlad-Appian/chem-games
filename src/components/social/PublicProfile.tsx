// src/components/ui/PublicProfile.tsx
'use client';

import { 
  Atom, 
  CalendarDays, 
  NotebookPen, 
  UserRound,
  MapPin,
  Flame,
  FlaskConical,
  Medal,
  GraduationCap
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { UserProfile } from '@/core-engine/types/general';
import { useI18n } from '@/i18n/client';

interface PublicProfileProps { 
  profile: UserProfile; 
}

/*
 * The favourite-element tile takes the periodic table's own family tone, so an
 * alkali metal here is the same colour as on the cheat sheet's table. Those
 * tones are chosen to carry --foreground at 4.5:1 or better in both themes
 * (see the Periodic-table tones note in globals.css); the old red/purple/
 * emerald/amber 500s as text on white were as low as 2.2:1.
 */
const elementColors: Record<string, string> = {
  alkali: 'bg-(--pt-tone-alkali-metal)',
  'noble-gas': 'bg-(--pt-tone-noble-gas)',
  'transition-metal': 'bg-(--pt-tone-transition-metal)',
  halogen: 'bg-(--pt-tone-halogen)',
  nonmetal: 'bg-(--pt-tone-nonmetal)',
};

export function PublicProfile({ profile }: PublicProfileProps) {
  const { t } = useI18n();
  const elementStyle = profile.favoriteElement
    ? `border-(--border) text-(--foreground) ${elementColors[profile.favoriteElement.group] ?? 'bg-(--surface-2)'}`
    : 'border-(--border) bg-(--info-surface) text-(--link)';

  return (
    <article className="game-card w-full overflow-hidden">
      {/* Header Section */}
      <div className="border-b border-(--border) bg-[linear-gradient(135deg,color-mix(in_srgb,var(--link)_14%,transparent),transparent_60%)] p-6">
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
              <UserRound className="h-6 w-6 text-(--link)" />
              <h1 className="text-4xl font-black">{profile.alias}</h1>
              {profile.country && profile.privacy.showCountry && (
                <span className="flex items-center gap-1 rounded-md bg-(--info-surface) px-2 py-1 text-xs font-bold text-(--link)">
                  <MapPin className="h-3 w-3" />
                  {profile.country}
                </span>
              )}
            </div>
            
            <p className="mt-1 text-sm font-bold uppercase tracking-widest text-(--muted)">
              {profile.title || t.profile.defaultTitle}
            </p>
            
            {/* Quick Stats Chips */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              {profile.privacy.showTotalSyntheses && (
                <StatChip label={t.profile.statExperiments} value={profile.totalSyntheses.toString()} icon={FlaskConical} />
              )}
              {profile.yearLevel && profile.privacy.showYearLevel && (
                <StatChip label={t.profile.statLevel} value={t.yearLevels[profile.yearLevel]} icon={GraduationCap} color="border-(--link)/30 bg-(--info-surface) text-(--link)" />
              )}
              {profile.currentStreak !== undefined && profile.currentStreak > 0 && profile.privacy.showCurrentStreak && (
                <StatChip label={t.profile.statStreak} value={profile.currentStreak.toString()} icon={Flame} color="border-(--accent)/30 bg-(--accent-surface) text-(--accent)" />
              )}
              {profile.privacy.showJoinedDate && (
                <span className="inline-flex items-center gap-1 rounded-full border border-(--border) bg-(--surface) px-3 py-1.5 text-xs font-bold text-(--muted)">
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
              <NotebookPen className="h-5 w-5 text-(--link)" />
              <h2 className="text-xl font-black">{t.profile.labNotes}</h2>
            </div>
            <p className="mt-3 rounded-xl border border-(--border) bg-(--surface-2) p-4 leading-relaxed text-(--muted)">
              {profile.labNotes || t.profile.labNotesEmpty}
            </p>
          </div>
        )}

        {/* Favorite Compound (Optional) */}
        {profile.favoriteCompound && (
          <div className="rounded-xl border border-(--border) bg-(--surface-2) p-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-(--muted)">{t.profile.favouriteCompound}</h3>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--info-surface) text-(--link)">
                <FlaskConical className="h-5 w-5" />
              </div>
              <div>
                <p className="font-black text-(--foreground)">{profile.favoriteCompound.name}</p>
                <p className="font-mono text-sm text-(--muted)">{profile.favoriteCompound.formula}</p>
              </div>
            </div>
          </div>
        )}

        {/* Badges (Optional) */}
        {profile.badges && profile.badges.length > 0 && (
          <div className="rounded-xl border border-(--border) bg-(--surface-2) p-4 sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Medal className="h-5 w-5 text-(--accent)" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-(--muted)">{t.profile.achievements}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {profile.badges.map((badge) => (
                <div key={badge.id} className="group relative flex h-12 w-12 cursor-help items-center justify-center rounded-full border-2 border-(--accent)/30 bg-(--accent-surface) transition hover:border-(--accent)">
                  <Medal className="h-6 w-6 text-(--accent)" />
                  {/* Tooltip on hover */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded bg-(--foreground) px-2 py-1 text-xs text-(--background) opacity-0 transition-opacity group-hover:opacity-100">
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
  color = 'border-transparent bg-(--action) text-white'
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
