// src/components/layout/NavBar.tsx
import Link from 'next/link';
import { Beaker, User, Trophy, Gamepad2, FileText } from 'lucide-react';
import { AuthButton } from '@/components/auth/AuthButton';
import { GlobalSettingsButton } from '@/components/ui/GlobalSettingsButton';

// Note: Added '/' before hash links so they navigate correctly from sub-pages
const sections = [
  { href: '/#profile', label: 'Profile', Icon: User },
  { href: '/#leaderboards', label: 'Leaderboards', Icon: Trophy },
  { href: '/#games', label: 'Games', Icon: Gamepad2 },
  { href: '/cheat-sheets', label: 'Cheat Sheets', Icon: FileText },
];

interface NavBarProps {
  isAuthenticated: boolean;
}

export function NavBar({ isAuthenticated }: NavBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-(--border) bg-(--surface)/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-black text-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md">
            <Beaker className="h-5 w-5" />
          </span>
          Chem<span className="text-blue-500">Games</span>
        </Link>

        <nav aria-label="Dashboard sections" className="hidden items-center gap-1 md:flex">
          {sections.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-black uppercase tracking-wider text-(--muted) transition hover:bg-blue-500/10 hover:text-blue-500"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <GlobalSettingsButton />
          <AuthButton isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  );
}