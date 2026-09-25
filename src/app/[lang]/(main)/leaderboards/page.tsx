import { Trophy } from 'lucide-react';
import { PublicLeaderboard } from '@/components/social/PublicLeaderboard';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { getPublicLeaderboards } from '@/lib/dashboard-data';
import { getDictionary } from '@/i18n/dictionaries';

export default async function LeaderboardsPage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;
  const [leaderboards, t] = await Promise.all([getPublicLeaderboards(), getDictionary(lang)]);

  return (
    <main className="min-h-screen bg-(--background) px-4 py-24 text-(--foreground)">
      <div className="mx-auto max-w-5xl">
        <LocaleLink href="/" className="text-sm font-bold text-(--link) hover:underline">
          &larr; {t.common.dashboard}
        </LocaleLink>
        {/* Page headings open with an icon tile, like the cards under them. */}
        <div className="mt-5 flex items-center gap-3">
          <span className="icon-tile bg-(--accent-surface) text-(--accent)" aria-hidden="true">
            <Trophy className="h-5 w-5" />
          </span>
          <h1 className="min-w-0 text-4xl font-black break-words">{t.leaderboards.heading}</h1>
        </div>
        <p className="mt-2 text-muted">{t.leaderboards.intro}</p>
        <div className="mt-6">
          <PublicLeaderboard leaderboards={leaderboards} />
        </div>
      </div>
    </main>
  );
}
