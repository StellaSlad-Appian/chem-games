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
        <LocaleLink href="/" className="text-sm font-bold text-blue-500 hover:underline">
          &larr; {t.common.dashboard}
        </LocaleLink>
        <h1 className="mt-5 text-4xl font-black">{t.leaderboards.heading}</h1>
        <p className="mt-2 text-muted">{t.leaderboards.intro}</p>
        <div className="mt-6">
          <PublicLeaderboard leaderboards={leaderboards} />
        </div>
      </div>
    </main>
  );
}
