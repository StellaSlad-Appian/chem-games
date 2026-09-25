// src/app/[lang]/(main)/games/page.tsx
import { Gamepad2 } from 'lucide-react';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { GamesBrowser } from '@/components/games/GamesBrowser';
import { getDictionary } from '@/i18n/dictionaries';

/**
 * The games hub.
 *
 * The five games are no longer built here: they come from `GAMES` in
 * `src/lib/games-data.ts`, which the dashboard's teaser row reads too, so the
 * two surfaces cannot drift apart the way they had.
 *
 * Everything below the heading is `GamesBrowser`, a client component, because
 * the search box and the year filter are state. The page itself stays a server
 * component so the heading and the dictionary load on the server as before.
 */
export default async function GamesPage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;
  const t = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-(--background) px-4 py-24 text-(--foreground)">
      <div className="mx-auto max-w-5xl">
        <LocaleLink href="/" className="text-sm font-bold text-(--link) hover:underline">
          &larr; {t.common.dashboard}
        </LocaleLink>
        {/* Page headings open with an icon tile, like the cards under them. */}
        <div className="mt-5 flex items-center gap-3">
          <span className="icon-tile bg-(--info-surface) text-(--link)" aria-hidden="true">
            <Gamepad2 className="h-5 w-5" />
          </span>
          <h1 className="min-w-0 text-4xl font-black break-words">{t.gamesHub.heading}</h1>
        </div>
        <p className="mt-2 text-muted">{t.gamesHub.intro}</p>

        <GamesBrowser />
      </div>
    </main>
  );
}
