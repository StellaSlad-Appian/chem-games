// src/components/games/GameCard.tsx
'use client';

import { LocaleLink } from '@/components/layout/LocaleLink';
import { ArrowRight } from 'lucide-react';
import { ACCENT_CLASSES, GAMES } from '@/lib/games-data';
import type { GameName } from '@/core-engine/types/general';
import { gameDescription, gameTitle } from '@/i18n/game-titles';
import { useI18n } from '@/i18n/client';

/**
 * One game, as a card. The same component on the hub and on the dashboard.
 *
 * The two used to be separate markup: the hub drew an icon in blue and the
 * dashboard drew a coloured bar and no icon, so the same five games read as two
 * unrelated features. This is the union of what each did well — the icon from
 * the hub, a per-game colour from the dashboard — minus the bar, which the
 * colour now carries on its own.
 *
 * **The accent is the only thing that varies between cards.** Surface, border,
 * radius, padding and the hover lift are identical, so the colour reads as
 * identity rather than as status: nothing here means "harder" or "new".
 *
 * **It takes a slug, not a `GameTopic`.** This is a client component and the dashboard that renders it is a server one,
 * so anything passed across that boundary has to be serialisable. A `GameTopic`
 * is not: its `Icon` is a component, and React refuses with "Functions cannot be
 * passed directly to Client Components". A slug is a string, and the registry is
 * a plain module this side can import for itself.
 */
export function GameCard({ slug }: { slug: GameName }) {
  const { t } = useI18n();
  const game = GAMES.find((candidate) => candidate.slug === slug);
  if (!game) return null;
  const accent = ACCENT_CLASSES[game.accent];
  const description = gameDescription(t, game.slug);

  return (
    <LocaleLink
      href={game.href}
      className={`group flex flex-col justify-between rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 ${accent.hoverBorder}`}
    >
      <div>
        <game.Icon className={`h-8 w-8 shrink-0 ${accent.text}`} aria-hidden="true" />
        {/*
          `min-w-0` is not decoration here: this is a flex column, and the
          German titles are long single words. See ACCESSIBILITY.md § 3.
        */}
        <div className="min-w-0">
          <h3 className="mt-5 text-2xl font-black break-words text-(--foreground)">
            {gameTitle(t, game.slug, game.slug)}
          </h3>
          {description ? <p className="mt-2 text-sm text-(--muted)">{description}</p> : null}
        </div>
      </div>
      <div className={`mt-6 flex items-center gap-1.5 text-xs font-black ${accent.text}`}>
        {/*
          `common.playNow`, not `gamesHub.playNow`: the latter has an arrow baked
          into the string ("Play now →"), which would double up with the icon
          beside it and get read out as "right arrow" by a screen reader.
        */}
        <span>{t.common.playNow}</span>
        <ArrowRight
          className="h-4 w-4 shrink-0 transition group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </LocaleLink>
  );
}
