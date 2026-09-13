import Link from 'next/link';
import { PublicLeaderboard } from '@/components/social/PublicLeaderboard';
import { getPublicLeaderboards } from '@/lib/dashboard-data';

export default async function LeaderboardsPage() {
  const leaderboards = await getPublicLeaderboards();

  return (
    <main className="min-h-screen bg-(--background) px-4 py-24 text-(--foreground)">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-bold text-blue-500 hover:underline">← Dashboard</Link>
        <h1 className="mt-5 text-4xl font-black">Leaderboards</h1>
        <p className="mt-2 text-muted">Compare high scores across every experiment.</p>
        <div className="mt-6">
          <PublicLeaderboard leaderboards={leaderboards} />
        </div>
      </div>
    </main>
  );
}
