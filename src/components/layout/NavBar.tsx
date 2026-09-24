// src/components/layout/NavBar.tsx
'use client';

import { usePathname } from 'next/navigation';
import { Beaker, Compass, Trophy, Gamepad2, FileText } from 'lucide-react';
import { AuthButton } from '@/components/auth/AuthButton';
import { GlobalSettingsButton } from '@/components/ui/GlobalSettingsButton';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { NavPanel, type NavSection } from '@/components/layout/NavPanel';
import { useI18n } from '@/i18n/client';

interface NavBarProps {
  isAuthenticated: boolean;
}

export function NavBar({ isAuthenticated }: NavBarProps) {
  const { t } = useI18n();

  // Hash links keep their leading '/' so they navigate correctly from
  // sub-pages; LocaleLink adds the language prefix.
  //
  // One array, rendered twice: the row at `lg` and up, the panel below it. A
  // destination added here appears in both, which is the point — the reason
  // `/cheat-sheets` was unreachable on a phone is that the row was the only
  // place it was listed.
  //
  // Profile is deliberately absent. It was the only *account management* entry
  // in a list of content destinations, and a signed-out visitor — most of the
  // traffic — got an empty-state card from it. It now lives in the Settings
  // popover's Account section, which is where account management conventionally
  // is and which is already in this same header row. The dashboard keeps its
  // own `#profile` section and `/profile` keeps its route; only the nav chip
  // moved. See docs/feature-briefs/nav-profile-to-settings.md §2.
  //
  // Games comes first: it is what the site is for, and the dashboard's own
  // sections now run in the same order (games, scores, guides, explore).
  //
  // `section` is the route whose pages count as "here" for aria-current. The
  // two hash links point at dashboard sections, so they are current on the
  // full pages those sections summarise.
  const here = currentSection(usePathname());
  const sections: NavSection[] = [
    { href: '/#games', section: '/games', label: t.nav.games, Icon: Gamepad2 },
    { href: '/#leaderboards', section: '/leaderboards', label: t.nav.leaderboards, Icon: Trophy },
    { href: '/cheat-sheets', section: '/cheat-sheets', label: t.nav.cheatSheets, Icon: FileText },
    { href: '/explore', section: '/explore', label: t.nav.explore, Icon: Compass },
  ].map(({ section, ...rest }) => ({ ...rest, current: here === section }));

  return (
    <header className="sticky top-0 z-40 border-b border-(--border) bg-(--surface)/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        {/*
          Below sm the wordmark collapses to the beaker mark. At 360px the row
          was 492px wide in German — brand 173 + controls 271 + gaps — against a
          360px viewport, so the header scrolled sideways, which docs/ACCESSIBILITY.md
          forbids (1.4.10). English overflowed here too, just less; the language
          switcher made it impossible to ignore. The link keeps its accessible
          name through the sr-only span.
        */}
        {/*
          The wordmark is English in every locale — it is the product's name —
          so it is written out here rather than read from the dictionary; the
          accessible name still comes from `meta.siteName`.
        */}
        <LocaleLink href="/" className="flex shrink-0 items-center gap-3 text-xl font-extrabold">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--action) text-white shadow-md shadow-blue-600/25">
            <Beaker className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="sr-only sm:hidden">{t.meta.siteName}</span>
          <span aria-hidden="true" className="hidden whitespace-nowrap sm:inline">
            Games in <span className="text-(--link)">Chemistry</span>
          </span>
        </LocaleLink>

        {/*
          The horizontal nav appears at lg, not md, because between 768px and
          roughly 1100px the header overflowed.

          An earlier version of this comment said "English fits at md; German
          does not". That was measured on the nav labels alone, and it was
          wrong about the header. Re-measured in a real browser at 1024px, with
          the whole row — brand + nav + controls + gaps + padding — **English
          was the widest of the five**, at 1048px of content in a 1024px
          viewport: a live WCAG 1.4.10 failure in the default language. English
          has both the widest nav labels ("Leaderboards", "Cheat Sheets") and
          the widest control ("Log in / Register"); German's longer-looking
          words are offset by its much shorter "Anmelden".

          That is what the shortened English and Spanish nav labels in the
          dictionaries are for, and why Profile left the row. The measured
          table is in docs/feature-briefs/nav-profile-to-settings.md §1; do not
          add a sixth entry here without re-measuring at 320, 360, 768, 1024
          and 1280px in all five locales, signed in and signed out.
        */}
        <nav aria-label={t.nav.sectionsA11y} className="hidden items-center gap-1 lg:flex">
          {sections.map(({ href, label, current }) => (
            <LocaleLink
              key={href}
              href={href}
              aria-current={current ? 'page' : undefined}
              // Tighter horizontal padding than the app's usual buttons, and
              // it no longer relaxes at lg. Measured with the row forced to
              // `width: max-content` — which is the only way to see the real
              // number, because flex-shrink otherwise hides an over-full row by
              // quietly compressing it — the German header was **1033px wide in
              // a 1024px viewport**. Nothing scrolled, because the shrink
              // absorbed the difference, so `scrollWidth <= innerWidth` passed
              // while the row was genuinely over-full. Dropping `lg:px-3` gives
              // 4px back per link, 16px across the four.
              //
              // No icon and no uppercase in the row since the redesign: those
              // two gave back the ~90px the longer "Games in Chemistry"
              // wordmark took. The phone panel keeps its icons.
              className="whitespace-nowrap rounded-xl px-3 py-2 text-[15px] font-bold text-(--muted) transition hover:text-(--link) aria-[current=page]:text-(--link)"
            >
              {label}
            </LocaleLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          {/*
            `isAuthenticated` is threaded through so the settings popover's
            Account section can show the two profile links to a signed-in
            reader and the way in to a signed-out one. The in-game modal never
            passes it and renders no Account section at all.
          */}
          <GlobalSettingsButton isAuthenticated={isAuthenticated} />
          {/*
            Below lg the sign-in button lives in the panel instead. It is the
            widest control in the header — 107px in German, and that is the
            already-shortened "Anmelden" — so moving it is what buys room for
            the panel's trigger: measured in German at 360px, the control
            cluster goes from 237px to 170px.
          */}
          <div className="hidden lg:block">
            <AuthButton isAuthenticated={isAuthenticated} />
          </div>
          <NavPanel sections={sections} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  );
}

/** `/de/games/foo` → `/games`: the first path segment after the locale. */
function currentSection(pathname: string | null): string {
  const [, , first] = (pathname ?? '/').split('/');
  return first ? `/${first}` : '/';
}
