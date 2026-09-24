// src/app/[lang]/(main)/page.tsx

import { ArrowRight, Compass } from 'lucide-react';
import { PersonalScoreSummary } from '@/components/social/PersonalScoreSummary';
import { PublicLeaderboard } from '@/components/social/PublicLeaderboard';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { GameCard } from '@/components/games/GameCard';
import { CheatSheetCard } from '@/components/cheat-sheets/CheatSheetCard';
import { TEASED_GAMES } from '@/lib/games-data';
import type { UserProfile } from '@/core-engine/types/general';
import { getPersonalScores, getPublicLeaderboards } from '@/lib/dashboard-data';
import { toUserProfile } from '@/lib/profile';
import { createClient } from '@/lib/supabase/server';
import { getDictionary, type Dictionary } from '@/i18n/dictionaries';
import { getCheatSheets } from '@/i18n/cheat-sheets';
import { DEFAULT_LOCALE, isLocale } from '@/i18n/config';

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
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const { isAuthenticated, profile } = await getDashboardProfile();

  const [personalScores, publicLeaderboards] = await Promise.all([
    profile ? getPersonalScores(profile.id) : Promise.resolve([]),
    getPublicLeaderboards(),
  ]);

  // The first three sheets, the same way the games section teases three
  // games. The full page has the year filter; the dashboard only has to show
  // what a cheat sheet is.
  const teasedSheets = getCheatSheets(locale).slice(0, 3);

  return (
    <main className="min-h-screen bg-(--background) text-(--foreground)">
      {/*
        Hero. Two columns from lg: the copy, and a cluster of periodic-table
        tiles that is pure decoration (aria-hidden) and so is dropped below lg
        rather than squeezed.

        Headings on this page are set in the body face (`font-sans`) rather
        than the global Bebas Neue display face — the landing page's look is a
        heavy geometric sans. Whether the rest of the site follows is the
        separate font decision, not this page's.
      */}
      <section className="border-b border-(--border) bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.14),transparent_55%),linear-gradient(135deg,rgba(59,130,246,0.07),transparent_60%)] py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <p className="text-sm font-extrabold tracking-[0.18em] text-(--link) uppercase">
              {t.home.eyebrow}
            </p>
            <h1 className="mt-4 max-w-2xl font-sans text-5xl leading-[1.05] font-black tracking-tight break-words md:text-7xl">
              {t.home.heading}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed font-medium text-(--muted)">
              {t.home.intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <LocaleLink
                href="/games"
                className="rounded-xl bg-(--action) px-7 py-4 text-sm font-extrabold tracking-wider text-white uppercase shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-(--action-hover)"
              >
                {t.home.exploreGames}
              </LocaleLink>
              <a
                href="#leaderboards"
                className="rounded-xl border-2 border-(--border) bg-(--surface) px-7 py-4 text-sm font-extrabold tracking-wider text-(--link) uppercase transition hover:-translate-y-0.5 hover:border-(--link)"
              >
                {t.home.viewLeaderboards}
              </a>
            </div>
          </div>
          <ElementTiles locale={locale} />
        </div>
      </section>

      {/*
        Games first — it is what a student came for, and what a teacher or
        parent needs to see to understand the site. A full-width band, so it
        reads as the page's main content rather than one section of four.
      */}
      <section
        id="games"
        className="scroll-mt-24 border-b border-(--border) bg-(--surface-2)/50 py-14"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionHeading
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
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 md:px-8">
        {/*
          Scores. The profile used to be a section of its own at the top of the
          page, and for a signed-out visitor — most of them, and every parent
          and teacher — it was a large empty card. It now lives here, as the
          reader's own line above everyone's: a slim prompt when signed out,
          their personal bests when signed in. The full profile card stays on
          /profile. `#profile` is kept as an anchor so old links still land.
        */}
        <section id="leaderboards" className="scroll-mt-24">
          <SectionHeading
            title={t.home.leaderboardsHeading}
            description={t.home.leaderboardsDescription}
            link="/leaderboards"
            linkLabel={t.home.leaderboardsLink}
          />
          <div id="profile" className="mb-8 scroll-mt-24">
            {isAuthenticated && profile ? (
              <>
                <PersonalScoreSummary scores={personalScores} />
                <LocaleLink
                  href="/profile"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-(--link) hover:underline"
                >
                  {t.home.profileLinkAuthenticated}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </LocaleLink>
              </>
            ) : (
              <ProfilePrompt isAuthenticated={isAuthenticated} t={t} />
            )}
          </div>
          <PublicLeaderboard leaderboards={publicLeaderboards} />
        </section>

        <section id="cheat-sheets" className="scroll-mt-24">
          <SectionHeading
            title={t.cheatSheets.heading}
            description={t.cheatSheets.intro}
            link="/cheat-sheets"
            linkLabel={t.home.cheatSheetsLink}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {teasedSheets.map((topic) => (
              <CheatSheetCard key={topic.slug} topic={topic} />
            ))}
          </div>
        </section>

        {/*
          Explore Section — the dashboard's way into /explore.

          Belt and braces, and deliberately so: the header's phone panel is new
          code, and the dashboard is where a phone reader already is.

          It sits after the games, scores and cheat sheets. Explore is the part
          of the site that changes on its own, which is an argument for
          prominence — but the dashboard's job is to get someone into a game,
          and a weekly article above the fold competes with that. Owner's call,
          2026-09-20, and the order confirmed in the 2026-09-24 redesign.

          Heading and description reuse the `explore` namespace rather than
          restating it, so the dashboard and the page itself can never describe
          the feature differently.
        */}
        <section id="explore" className="scroll-mt-24">
          <SectionHeading
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
                Blue rather than one of the five game accents: Explore is a
                section, not a sixth game — see the note on `--accent-explore`
                in globals.css.
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
  title,
  description,
  link,
  linkLabel,
}: {
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
        {/*
          `break-words` is not decoration. At 320px the Spanish heading
          "Clasificaciones" was one unbreakable word wider than the viewport at
          `text-3xl` — a real WCAG 1.4.10 failure on the dashboard. Nothing here
          can wrap a single word without it.
        */}
        <h2 className="font-sans text-3xl font-black tracking-tight break-words text-(--foreground) md:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-sm font-medium text-(--muted)">{description}</p>
      </div>
      <LocaleLink
        href={link}
        className="flex shrink-0 items-center gap-1 text-sm font-bold text-(--link) hover:underline"
      >
        <span>{linkLabel}</span>
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </LocaleLink>
    </div>
  );
}

/**
 * The reader's own line in the scores section when there are no personal
 * scores to show: an invitation to sign in, or — signed in with no profile row
 * yet — a note that it is coming. A strip rather than the old full-height card,
 * because for most visitors it is the least important thing on the page.
 */
function ProfilePrompt({ isAuthenticated, t }: { isAuthenticated: boolean; t: Dictionary }) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border-2 border-dashed border-(--border) bg-(--surface) p-5 sm:flex-row sm:items-center">
      <div className="min-w-0">
        <h3 className="font-sans text-lg font-black tracking-normal text-(--foreground)">
          {isAuthenticated
            ? t.home.emptyProfileAuthenticatedTitle
            : t.home.emptyProfileAnonymousTitle}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-(--muted)">
          {isAuthenticated ? t.home.emptyProfileAuthenticatedBody : t.home.emptyProfileAnonymousBody}
        </p>
      </div>
      {!isAuthenticated && (
        <LocaleLink
          href="/auth"
          className="shrink-0 rounded-xl bg-(--action) px-5 py-3 text-sm font-extrabold tracking-wider text-white uppercase transition hover:bg-(--action-hover)"
        >
          {t.home.emptyProfileCta}
        </LocaleLink>
      )}
    </div>
  );
}

/**
 * Decoration for the hero: five real elements, laid out on a 3×3 grid the way
 * a corner of a periodic table might sit, with oxygen and chlorine picked out.
 * `aria-hidden`, because a screen reader gains nothing from five element
 * symbols; the masses are formatted for the page's locale only because a
 * sighted German or French reader expects a decimal comma.
 */
const HERO_TILES = [
  { symbol: 'H', number: 1, mass: 1.008, digits: 3, cell: 'col-start-2 row-start-1', tone: 'plain' },
  { symbol: 'O', number: 8, mass: 15.999, digits: 3, cell: 'col-start-3 row-start-1', tone: 'blue' },
  { symbol: 'Na', number: 11, mass: 22.99, digits: 3, cell: 'col-start-1 row-start-2', tone: 'plain' },
  { symbol: 'Cl', number: 17, mass: 35.45, digits: 2, cell: 'col-start-2 row-start-2', tone: 'amber' },
  { symbol: 'C', number: 6, mass: 12.011, digits: 3, cell: 'col-start-2 row-start-3', tone: 'plain' },
] as const;

const TILE_TONES = {
  plain: 'border-(--border) bg-(--surface) text-(--foreground) shadow-md',
  // White on --action is 5.17:1, and --action does not change with the theme.
  blue: 'border-transparent bg-(--action) text-white shadow-xl shadow-blue-600/30',
  // slate-900 on amber-400 is 10.4:1, in either theme.
  amber: 'border-transparent bg-amber-400 text-slate-900 shadow-xl shadow-amber-500/30',
} as const;

function ElementTiles({ locale }: { locale: string }) {
  return (
    <div
      aria-hidden="true"
      className="hidden grid-cols-[repeat(3,7rem)] grid-rows-[repeat(3,7rem)] gap-3 lg:grid"
    >
      {HERO_TILES.map(({ symbol, number, mass, digits, cell, tone }) => (
        <div key={symbol} className={`${cell} ${TILE_TONES[tone]} flex flex-col rounded-2xl border p-3`}>
          <span className="text-xs font-semibold opacity-75">{number}</span>
          <span className="mt-1 font-sans text-4xl leading-none font-bold">{symbol}</span>
          <span className="mt-auto text-xs font-semibold opacity-75">
            {mass.toLocaleString(locale, {
              minimumFractionDigits: digits,
              maximumFractionDigits: digits,
            })}
          </span>
        </div>
      ))}
    </div>
  );
}
