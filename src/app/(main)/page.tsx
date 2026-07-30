// src/app/(main)/page.tsx

import Link from 'next/link';
import { 
  Trophy, 
  Gamepad2, 
  User, 
  ArrowRight 
} from 'lucide-react';
import { PersonalScoreSummary } from '@/components/social/PersonalScoreSummary';
import { PublicLeaderboard } from '@/components/social/PublicLeaderboard';
import { PublicProfile } from '@/components/social/PublicProfile';
import type { UserProfile } from '@/core-engine/types/general';
import { getPersonalScores, publicLeaderboards } from '@/lib/dashboard-data';
import { toUserProfile } from '@/lib/profile';
import { createClient } from '@/lib/supabase/server';

interface DashboardProfileResult {
  isAuthenticated: boolean;
  profile: UserProfile | null;
}

/**
 * Server-side helper to fetch authenticated user profile.
 * Handles missing or unconfigured Supabase clients safely.
 */
async function getDashboardProfile(): Promise<DashboardProfileResult> {
  try {
    const supabase = await createClient();

    // Early return if Supabase is unconfigured or null
    if (!supabase) {
      return { isAuthenticated: false, profile: null };
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { isAuthenticated: false, profile: null };
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profileData) {
      return { isAuthenticated: true, profile: null };
    }

    return {
      isAuthenticated: true,
      profile: toUserProfile(profileData),
    };
  } catch {
    // Fail gracefully on network or database connection issues
    return { isAuthenticated: false, profile: null };
  }
}

export default async function Home() {
  const { isAuthenticated, profile } = await getDashboardProfile();

  // Dynamically fetch personal scores if authenticated, otherwise empty array
  const personalScores = profile ? await getPersonalScores(profile.id) : [];

  return (
    <main className="min-h-screen bg-(--background) text-(--foreground)">
      {/* Hero Banner */}
      <section className="border-b border-(--border) bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_40%)] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-widest text-blue-500">
            Interactive Chemistry Laboratory
          </p>
          <h1 className="mt-3 max-w-3xl text-5xl font-black leading-none md:text-7xl">
            Learn chemistry by playing.
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium text-(--muted) md:text-lg">
            Explore interactive experiments, track your personal best scores, master formulas, and see how your lab results compare.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/games"
              className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-black uppercase tracking-wider text-white shadow-lg transition hover:bg-blue-600 hover:scale-105"
            >
              <Gamepad2 className="h-4 w-4" /> Explore Games
            </Link>
            <a
              href="#leaderboards"
              className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--surface) px-5 py-3 text-sm font-black uppercase tracking-wider text-(--foreground) transition hover:border-blue-500 hover:text-blue-500"
            >
              View Leaderboards
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 md:px-8">
        {/* Profile Section */}
        <section id="profile" className="scroll-mt-24">
          <SectionHeading
            icon={User}
            title="Profile"
            description="Your laboratory identity and personal experiment progress."
            link={isAuthenticated ? '/profile' : '/auth'}
            linkLabel={isAuthenticated ? 'Open profile' : 'Log in to save progress'}
          />
          {profile ? <PublicProfile profile={profile} /> : <EmptyProfile isAuthenticated={isAuthenticated} />}
          {isAuthenticated && (
            <div className="mt-6">
              <PersonalScoreSummary scores={personalScores} />
            </div>
          )}
        </section>

        {/* Leaderboards Section */}
        <section id="leaderboards" className="scroll-mt-24">
          <SectionHeading
            icon={Trophy}
            title="Leaderboards"
            description="Top scientists across all interactive chemistry experiments."
            link="/leaderboards"
            linkLabel="Open full leaderboards"
          />
          <PublicLeaderboard leaderboards={publicLeaderboards} />
        </section>

        {/* Games Section */}
        <section id="games" className="scroll-mt-24">
          <SectionHeading
            icon={Gamepad2}
            title="Interactive Mini-Games"
            description="Select an experiment to master chemical reactions and formulas."
            link="/games"
            linkLabel="Browse all games"
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                href: '/games/acid-classification',
                name: 'Acid or Base?',
                detail: 'Classify materials & pH levels',
                color: 'bg-purple-500',
              },
              {
                href: '/games/formula-blaster',
                name: 'Formula Blaster',
                detail: 'Pop compounds & balance ions',
                color: 'bg-blue-500',
              },
              {
                href: '/games/neutralise',
                name: 'Neutralise!',
                detail: 'Defend the lab from runaway reactions',
                color: 'bg-emerald-500',
              },
            ].map((game) => (
              <Link
                key={game.href}
                href={game.href}
                className="group flex flex-col justify-between rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
              >
                <div>
                  <span className={`block h-2 w-16 rounded-full ${game.color}`} />
                  <h3 className="mt-5 text-2xl font-black text-(--foreground) transition group-hover:text-blue-500">
                    {game.name}
                  </h3>
                  <p className="mt-2 text-sm text-(--muted)">{game.detail}</p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-black text-blue-500">
                  <span>Play now</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
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
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 text-blue-500" />
          <h2 className="text-3xl font-black text-(--foreground)">{title}</h2>
        </div>
        <p className="mt-1 text-sm font-medium text-(--muted)">{description}</p>
      </div>
      <Link href={link} className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-blue-500 hover:underline">
        <span>{linkLabel}</span>
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

function EmptyProfile({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md flex flex-col items-center justify-center text-center py-12">
      <User className="h-12 w-12 text-(--muted) mb-4 opacity-50" />
      <h3 className="text-2xl font-black text-(--foreground)">
        {isAuthenticated ? 'Profile setup in progress' : 'Your profile starts here'}
      </h3>
      <p className="mt-2 text-sm text-(--muted) max-w-md">
        {isAuthenticated
          ? 'Your profile will be available after the database profile migration has run.'
          : 'Log in to save your progress, manage your lab notes, and build your scientist profile.'}
      </p>
      {!isAuthenticated && (
        <Link
          href="/auth"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-blue-600 hover:scale-105"
        >
          Log in / Register
        </Link>
      )}
    </div>
  );
}