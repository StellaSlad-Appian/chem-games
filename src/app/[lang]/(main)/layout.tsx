// src/app/[lang]/(main)/layout.tsx
import { Sparkles } from 'lucide-react';
import { NavBar } from '@/components/layout/NavBar';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { createClient } from '@/lib/supabase/server';
import { getDictionary } from '@/i18n/dictionaries';
import { format } from '@/i18n/format';

async function getAuthStatus() {
  try {
    const supabase = await createClient();
    if (!supabase) return false;
    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  } catch {
    return false;
  }
}

export default async function MainLayout(props: LayoutProps<'/[lang]'>) {
  const { lang } = await props.params;
  const [isAuthenticated, t] = await Promise.all([getAuthStatus(), getDictionary(lang)]);

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />

      {/*
        A `<div>`, not a `<main>`. Every page under this group renders its own
        `<main>` with its own layout classes, so a `<main>` here made two main
        landmarks on every page — one more than a screen reader should be
        offered, and a strict-mode violation for a bare `page.locator('main')`
        in Playwright, which is how it was found. The wrapper still exists for
        `flex-1`: it is what pushes the footer down on a short page.
      */}
      <div className="flex-1">{props.children}</div>

      <footer className="border-t-2 border-(--border) bg-(--surface) py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
            <p className="text-xs font-bold text-(--muted)">{t.footer.tagline}</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium text-(--muted)">
            <p>{format(t.footer.copyright, { year: new Date().getFullYear() })}</p>
            <span aria-hidden="true">&middot;</span>
            <LocaleLink href="/privacy" className="font-bold transition hover:text-blue-500">
              {t.footer.privacy}
            </LocaleLink>
            <span aria-hidden="true">&middot;</span>
            {/*
              The only entry point to /teachers. It is deliberately not in the
              NavBar: German labels already put the horizontal nav at 1014px of
              content at 1280px (NavBar.tsx), and the page is for adults who
              will go looking rather than for the students the nav serves.
            */}
            <LocaleLink href="/teachers" className="font-bold transition hover:text-blue-500">
              {t.footer.teachers}
            </LocaleLink>
          </div>
        </div>
      </footer>
    </>
  );
}
