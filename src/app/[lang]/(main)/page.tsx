// src/app/[lang]/(main)/page.tsx

import { Trophy, Gamepad2, User, ArrowRight } from 'lucide-react';
import { PersonalScoreSummary } from '@/components/social/PersonalScoreSummary';
import { PublicLeaderboard } from '@/components/social/PublicLeaderboard';
import { PublicProfile } from '@/components/social/PublicProfile';
import { LocaleLink } from '@/components/layout/LocaleLink';
import type { UserProfile } from '@/core-engine/types/general';
import { getPersonalScores, getPublicLeaderboards } from '@/lib/dashboard-data';
import { toUserProfile } from '@/lib/profile';
import { createClient } from '@/lib/supabase/server';
import { getDictionary, type Dictionary } from '@/i18n/dictionaries';

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

export default async function Home(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;
  const t = await getDictionary(lang);
  const { isAuthenticated, profile } = await getDashboardProfile();

  const [personalScores, publicLeaderboards] = await Promise.all([
    profile ? getPersonalScores(profile.id) : Promise.resolve([]),
    getPublicLeaderboards(),
  ]);

  const teasers = [
    {
      href: '/games/acid-classification',
      name: t.gamesHub.acidTitle,
      detail: t.home.teaserAcidDetail,
      color: 'bg-purple-500',
    },
    {
      href: '/games/formula-blaster',
      name: t.gamesHub.blasterTitle,
      detail: t.home.teaserBlasterDetail,
      color: 'bg-blue-500',
    },
    {
      href: '/games/neutralise',
      name: t.gamesHub.neutraliseTitle,
      detail: t.home.teaserNeutraliseDetail,
      color: 'bg-emerald-500',
    },
  ];

  return (
    <main className="min-h-screen bg-(--background) text-(--foreground)">
      {/* Hero Banner */}
      <section className="border-b border-(--border) bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_40%)] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-widest text-blue-500">
            {t.home.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-5xl font-black leading-none md:text-7xl">
            {t.home.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium text-(--muted) md:text-lg">
            {t.home.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LocaleLink
              href="/games"
              className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-black uppercase tracking-wider text-white shadow-lg transition hover:bg-blue-600 hover:scale-105"
            >
              <Gamepad2 className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.home.exploreGames}
            </LocaleLink>
            <a
              href="#leaderboards"
              className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--surface) px-5 py-3 text-sm font-black uppercase tracking-wider text-(--foreground) transition hover:border-blue-500 hover:text-blue-500"
            >
              {t.home.viewLeaderboards}
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
            title={t.home.profileHeading}
            description={t.home.profileDescription}
            link={isAuthenticated ? '/profile' : '/auth'}
            linkLabel={
              isAuthenticated ? t.home.profileLinkAuthenticated : t.home.profileLinkAnonymous
            }
          />
          {profile ? (
            <PublicProfile profile={profile} />
          ) : (
            <EmptyProfile isAuthenticated={isAuthenticated} t={t} />
          )}
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
            title={t.home.leaderboardsHeading}
            description={t.home.leaderboardsDescription}
            link="/leaderboards"
            linkLabel={t.home.leaderboardsLink}
          />
          <PublicLeaderboard leaderboards={publicLeaderboards} />
        </section>

        {/* Games Section */}
        <section id="games" className="scroll-mt-24">
          <SectionHeading
            icon={Gamepad2}
            title={t.home.gamesHeading}
            description={t.home.gamesDescription}
            link="/games"
            linkLabel={t.home.gamesLink}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {teasers.map((game) => (
              <LocaleLink
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
                  <span>{t.common.playNow}</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </LocaleLink>
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
          <Icon className="h-6 w-6 shrink-0 text-blue-500" aria-hidden="true" />
          <h2 className="text-3xl font-black text-(--foreground)">{title}</h2>
        </div>
        <p className="mt-1 text-sm font-medium text-(--muted)">{description}</p>
      </div>
      <LocaleLink
        href={link}
        className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-blue-500 hover:underline"
      >
        <span>{linkLabel}</span>
        <ArrowRight className="h-3 w-3 shrink-0" aria-hidden="true" />
      </LocaleLink>
    </div>
  );
}

function EmptyProfile({ isAuthenticated, t }: { isAuthenticated: boolean; t: Dictionary }) {
  return (
    <div className="rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md flex flex-col items-center justify-center text-center py-12">
      <User className="h-12 w-12 text-(--muted) mb-4 opacity-50" aria-hidden="true" />
      <h3 className="text-2xl font-black text-(--foreground)">
        {isAuthenticated
          ? t.home.emptyProfileAuthenticatedTitle
          : t.home.emptyProfileAnonymousTitle}
      </h3>
      <p className="mt-2 text-sm text-(--muted) max-w-md">
        {isAuthenticated ? t.home.emptyProfileAuthenticatedBody : t.home.emptyProfileAnonymousBody}
      </p>
      {!isAuthenticated && (
        <LocaleLink
          href="/auth"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-blue-600 hover:scale-105"
        >
          {t.home.emptyProfileCta}
        </LocaleLink>
      )}
    </div>
  );
}
