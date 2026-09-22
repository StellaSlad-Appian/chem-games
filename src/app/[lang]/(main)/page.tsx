// src/app/[lang]/(main)/page.tsx

import { Trophy, Gamepad2, User, ArrowRight, Compass } from 'lucide-react';
import { PersonalScoreSummary } from '@/components/social/PersonalScoreSummary';
import { PublicLeaderboard } from '@/components/social/PublicLeaderboard';
import { PublicProfile } from '@/components/social/PublicProfile';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { GameCard } from '@/components/games/GameCard';
import { TEASED_GAMES } from '@/lib/games-data';
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


  return (
    <main className="min-h-screen bg-(--background) text-(--foreground)">
      {/* Hero Banner */}
      <section className="border-b border-(--border) bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_40%)] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-widest text-(--link)">
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
              className="flex items-center gap-2 rounded-xl bg-(--action) px-5 py-3 text-sm font-black uppercase tracking-wider text-white shadow-lg transition hover:bg-(--action-hover) hover:scale-105"
            >
              <Gamepad2 className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.home.exploreGames}
            </LocaleLink>
            <a
              href="#leaderboards"
              className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--surface) px-5 py-3 text-sm font-black uppercase tracking-wider text-(--foreground) transition hover:border-(--link) hover:text-(--link)"
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
          {/*
            The same `GameCard` the hub renders, from the same registry. These
            three used to be a separate array with a colour bar and no icon, so
            the dashboard and the hub showed the same five games as two
            unrelated features.
          */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {TEASED_GAMES.map((slug) => (
              <GameCard key={slug} slug={slug} />
            ))}
          </div>
        </section>

        {/*
          Explore Section — the dashboard's way into /explore.

          Belt and braces, and deliberately so: the header's phone panel is new
          code, and the dashboard is where a phone reader already is.

          It sits last, after the games. Explore is the part of the site that
          changes on its own, which is an argument for prominence — but the
          dashboard's job is to get someone into a game, and a weekly article
          above the fold competes with that. Owner's call, 2026-09-20.

          Heading and description reuse the `explore` namespace rather than
          restating it, so the dashboard and the page itself can never describe
          the feature differently.
        */}
        <section id="explore" className="scroll-mt-24">
          <SectionHeading
            icon={Compass}
            title={t.explore.heading}
            description={t.explore.intro}
            link="/explore"
            linkLabel={t.home.exploreLink}
          />
          <LocaleLink
            href="/explore"
            className="group flex flex-col justify-between rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md transition hover:-translate-y-1 hover:border-(--accent-explore) hover:shadow-xl"
          >
            <div>
              {/*
                The same icon as the section heading above, so the card and its
                heading agree. Blue rather than one of the five game accents:
                Explore is a section, not a sixth game — see the note on
                `--accent-explore` in globals.css.
              */}
              <Compass className="h-8 w-8 shrink-0 text-(--accent-explore)" aria-hidden="true" />
              <p className="mt-5 max-w-2xl text-sm text-(--muted)">{t.home.exploreDetail}</p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-black text-(--accent-explore)">
              <span>{t.home.exploreLink}</span>
              <ArrowRight
                className="h-4 w-4 shrink-0 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
          </LocaleLink>
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
      {/*
        `min-w-0` here, and `shrink-0` on the link below. The h2 inside already
        had `min-w-0` — and it was not enough, because *this* div is the flex
        item once `sm:flex-row` applies, and a flex item's automatic minimum
        size is its min-content width. Fixing the h2 alone fixed the 320px
        column and left the row broken: at 768px every locale overflowed, and
        German still did at 1024px, with the "Open Explore" link pushed past the
        viewport.

        That is the fourth time this pattern has cost a reflow bug in this
        repo — the Spanish dashboard heading, every German cheat sheet, English
        `stoichiometry`, and now this row. It is listed in docs/TODO.md as
        wanting a lint rule rather than a fifth fix.
      */}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 shrink-0 text-(--link)" aria-hidden="true" />
          {/*
            `break-words` is not decoration. At 320px the Spanish heading
            "Clasificaciones" is one unbreakable 274px word at `text-3xl`,
            starting 48px in, so it reached 322px in a 320px viewport — a real
            WCAG 1.4.10 failure on the dashboard, in Spanish, before this branch
            existed. Nothing here can wrap a single word without it.
          */}
          {/*
            `min-w-0` is what makes `break-words` work here, and the pair has to
            stay together. The h2 is a flex item, and a flex item's automatic
            minimum size is its min-content width — the longest single word — so
            it refuses to shrink no matter what wrapping it is allowed.
          */}
          <h2 className="min-w-0 text-3xl font-black break-words text-(--foreground)">{title}</h2>
        </div>
        <p className="mt-1 text-sm font-medium text-(--muted)">{description}</p>
      </div>
      <LocaleLink
        href={link}
        className="flex shrink-0 items-center gap-1 text-xs font-black uppercase tracking-wider text-(--link) hover:underline"
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
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-(--action) px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-(--action-hover) hover:scale-105"
        >
          {t.home.emptyProfileCta}
        </LocaleLink>
      )}
    </div>
  );
}
