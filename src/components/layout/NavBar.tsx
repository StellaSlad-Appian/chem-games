// src/components/layout/NavBar.tsx
'use client';

import { Beaker, User, Trophy, Gamepad2, FileText } from 'lucide-react';
import { AuthButton } from '@/components/auth/AuthButton';
import { GlobalSettingsButton } from '@/components/ui/GlobalSettingsButton';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { useI18n } from '@/i18n/client';

interface NavBarProps {
  isAuthenticated: boolean;
}

export function NavBar({ isAuthenticated }: NavBarProps) {
  const { t } = useI18n();

  // Hash links keep their leading '/' so they navigate correctly from
  // sub-pages; LocaleLink adds the language prefix.
  const sections = [
    { href: '/#profile', label: t.nav.profile, Icon: User },
    { href: '/#leaderboards', label: t.nav.leaderboards, Icon: Trophy },
    { href: '/#games', label: t.nav.games, Icon: Gamepad2 },
    { href: '/cheat-sheets', label: t.nav.cheatSheets, Icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-(--border) bg-(--surface)/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <LocaleLink href="/" className="flex shrink-0 items-center gap-2 font-black text-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md">
            <Beaker className="h-5 w-5" aria-hidden="true" />
          </span>
          Chem<span className="text-blue-500">Games</span>
        </LocaleLink>

        <nav aria-label={t.nav.sectionsA11y} className="hidden items-center gap-1 md:flex">
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
          <GlobalSettingsButton />
          <AuthButton isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  );
}
