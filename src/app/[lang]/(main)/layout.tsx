// src/app/[lang]/(main)/layout.tsx
import { Sparkles } from 'lucide-react';
import { NavBar } from '@/components/layout/NavBar';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { createClient } from '@/lib/supabase/server';
import { aboutCopy } from '@/i18n/about';
import { isLocale } from '@/i18n/config';
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
  const about = isLocale(lang) ? aboutCopy(lang) : undefined;

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

      {/*
        Three centred lines at every width — tagline, links, copyright — so
        nothing sits in the bottom-right corner, where the site-wide feedback
        button floats over the page. On a phone the centred copyright line is
        wide enough to reach under that button, so the extra bottom padding
        lifts it clear when the page is scrolled to the end.
      */}
      <footer className="border-t-2 border-(--border) bg-(--surface) pt-8 pb-20 sm:pb-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center text-xs text-(--muted) sm:px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
            <p className="font-bold">{t.footer.tagline}</p>
          </div>
          {/*
            The only site-wide entry points to /about, /privacy and /teachers.
            Deliberately not in the NavBar: German labels already put the
            horizontal nav at 1014px of content at 1280px (NavBar.tsx), and
            these pages are for adults who will go looking rather than for the
            students the nav serves.
          */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-medium">
            {/*
              Only in a locale that has an About page — English, for now. The
              label comes from the About catalogue, not the dictionary; see
              src/i18n/about.ts for why.
            */}
            {about && (
              <>
                <LocaleLink href="/about" className="font-bold transition hover:text-(--link)">
                  {about.footerLabel}
                </LocaleLink>
                <span aria-hidden="true">&middot;</span>
              </>
            )}
            <LocaleLink href="/privacy" className="font-bold transition hover:text-(--link)">
              {t.footer.privacy}
            </LocaleLink>
            <span aria-hidden="true">&middot;</span>
            <LocaleLink href="/teachers" className="font-bold transition hover:text-(--link)">
              {t.footer.teachers}
            </LocaleLink>
          </div>
          <p className="font-medium">
            {format(t.footer.copyright, { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </>
  );
}
