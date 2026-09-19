// src/components/layout/NavBar.tsx
'use client';

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
  const sections: NavSection[] = [
    { href: '/#leaderboards', label: t.nav.leaderboards, Icon: Trophy },
    { href: '/#games', label: t.nav.games, Icon: Gamepad2 },
    { href: '/cheat-sheets', label: t.nav.cheatSheets, Icon: FileText },
    { href: '/explore', label: t.nav.explore, Icon: Compass },
  ];

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
        <LocaleLink href="/" className="flex shrink-0 items-center gap-2 font-black text-xl">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md">
            <Beaker className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="sr-only sm:hidden">{t.meta.siteName}</span>
          <span aria-hidden="true" className="hidden sm:inline">
            Chem<span className="text-blue-500">Games</span>
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
          {sections.map(({ href, label, Icon }) => (
            <LocaleLink
              key={href}
              href={href}
              // German nav labels ("Bestenlisten", "Spickzettel") run wider
              // than the English ones, so the horizontal padding is tighter
              // here than the app's usual buttons and only relaxes at lg.
              className="flex items-center gap-1.5 whitespace-nowrap rounded-xl px-2.5 py-2 text-xs font-black uppercase tracking-wider text-(--muted) transition hover:bg-blue-500/10 hover:text-blue-500 lg:px-3"
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
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
