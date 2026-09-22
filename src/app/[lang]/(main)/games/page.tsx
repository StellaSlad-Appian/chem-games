// src/app/[lang]/(main)/games/page.tsx
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
        <h1 className="mt-5 text-4xl font-black">{t.gamesHub.heading}</h1>
        <p className="mt-2 text-muted">{t.gamesHub.intro}</p>

        <GamesBrowser />
      </div>
    </main>
  );
}
