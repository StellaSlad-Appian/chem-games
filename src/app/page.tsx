// src/app/page.tsx
import Link from 'next/link';
import { Beaker, ChartNoAxesCombined, Gamepad2, UserRound } from 'lucide-react';
import { AuthButton } from '@/components/auth/AuthButton';
import { GlobalSettingsButton } from '@/components/ui/GlobalSettingsButton';
import { PersonalScoreSummary } from '@/components/ui/PersonalScoreSummary';
import { PublicLeaderboard } from '@/components/ui/PublicLeaderboard';
import { PublicProfile } from '@/components/ui/PublicProfile';
import type { UserProfile } from '@/core-engine/types/general';
import { personalScores, publicLeaderboards } from '@/lib/dashboard-data';
import { toUserProfile } from '@/lib/profile';
import { createClient } from '@/lib/supabase/server';

async function getDashboardProfile(): Promise<{ isAuthenticated: boolean; profile: UserProfile | null }> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { isAuthenticated: false, profile: null };
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    return { isAuthenticated: true, profile: data ? toUserProfile(data) : null };
  } catch {
    return { isAuthenticated: false, profile: null };
  }
}

const sections = [
  { href: '#profile', label: 'Profile', Icon: UserRound },
  { href: '#leaderboards', label: 'Leaderboards', Icon: ChartNoAxesCombined },
  { href: '#games', label: 'Games', Icon: Gamepad2 },
];

export default async function Home() {
  const { isAuthenticated, profile } = await getDashboardProfile();

  return (
    <main className="min-h-screen bg-(--background) text-(--foreground)">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-(--border) bg-(--background)/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <Link href="/" className="flex items-center gap-2 font-black">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white">
              <Beaker className="h-5 w-5" />
            </span>
            ChemGames
          </Link>

          <nav aria-label="Dashboard sections" className="hidden items-center gap-1 md:flex">
            {sections.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="rounded-md px-3 py-2 text-sm font-bold text-muted transition hover:bg-(--surface-2) hover:text-(--foreground)"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <GlobalSettingsButton />
            <AuthButton isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="border-b border-(--border) bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_35%)] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold uppercase tracking-[0.2em] text-blue-500">
            Interactive chemistry lab
          </p>
          <h1 className="mt-3 max-w-3xl text-5xl font-black leading-none md:text-7xl">
            Learn chemistry by playing.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Explore experiments, track your best scores, tune your settings, and see how your results compare.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/games" className="btn-primary">
              Explore games
            </Link>
            <a href="#leaderboards" className="btn-ghost">
              View leaderboards
            </a>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 md:px-8">
        {/* Profile */}
        <section id="profile" className="scroll-mt-24">
          <SectionHeading
            icon={UserRound}
            title="Profile"
            description="Your laboratory identity and personal progress."
            link={isAuthenticated ? '/profile' : '/auth'}
            linkLabel={isAuthenticated ? 'Open profile' : 'Log in to create a profile'}
          />
          {profile ? <PublicProfile profile={profile} /> : <EmptyProfile isAuthenticated={isAuthenticated} />}
          <div className="mt-6">
            <PersonalScoreSummary scores={personalScores} />
          </div>
        </section>

        {/* Leaderboards */}
        <section id="leaderboards" className="scroll-mt-24">
          <SectionHeading
            icon={ChartNoAxesCombined}
            title="Leaderboards"
            description="Top scientists from each experiment."
            link="/leaderboards"
            linkLabel="Open full leaderboards"
          />
          <PublicLeaderboard leaderboards={publicLeaderboards} />
        </section>

        {/* Games */}
        <section id="games" className="scroll-mt-24">
          <SectionHeading
            icon={Gamepad2}
            title="Games"
            description="Choose an experiment and start synthesising."
            link="/games"
            linkLabel="Browse all games"
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { href: '/games/acid-classification', name: 'Acid or Base?', detail: 'Classify materials', color: 'bg-purple-500' },
              { href: '/games/formula-blaster', name: 'Formula Blaster', detail: 'Pop the compounds', color: 'bg-blue-500' },
              { href: '/games/neutralise', name: 'Neutralise!', detail: 'Defend the lab', color: 'bg-emerald-500' },
            ].map((game) => (
              <Link
                key={game.href}
                href={game.href}
                className="game-card group p-5 transition hover:-translate-y-1 hover:border-blue-400"
              >
                <span className={`block h-2 w-16 rounded-full ${game.color}`} />
                <h3 className="mt-5 text-2xl font-black">{game.name}</h3>
                <p className="mt-2 text-muted">{game.detail}</p>
                <span className="mt-5 inline-block font-bold text-blue-500">Play now →</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description,
  link,
  linkLabel,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
  link: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-blue-500" />
          <h2 className="text-3xl font-black">{title}</h2>
        </div>
        <p className="mt-1 text-muted">{description}</p>
      </div>
      <Link href={link} className="text-sm font-bold text-blue-500 hover:underline">
        {linkLabel} →
      </Link>
    </div>
  );
}

function EmptyProfile({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="game-card p-6">
      <h3 className="text-2xl font-black">
        {isAuthenticated ? 'Profile setup in progress' : 'Your profile starts here'}
      </h3>
      <p className="mt-2 text-muted">
        {isAuthenticated
          ? 'Your profile will be available after the database profile migration has run.'
          : 'Log in to save your progress, manage your lab notes, and build your scientist profile.'}
      </p>
      {!isAuthenticated && (
        <Link href="/auth" className="btn-primary mt-5 w-fit">
          Log in / Register
        </Link>
      )}
    </div>
  );
}
