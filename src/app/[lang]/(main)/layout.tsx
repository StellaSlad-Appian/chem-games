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

      <footer className="border-t-2 border-(--border) bg-(--surface) py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
            <p className="text-xs font-bold text-(--muted)">{t.footer.tagline}</p>
          </div>
          {/*
            On a phone the copyright sits above the links rather than wrapping
            into them, so no line starts with a stray separator.
          */}
          <div className="flex flex-col items-center gap-x-3 gap-y-2 text-xs font-medium text-(--muted) sm:flex-row">
            <p>{format(t.footer.copyright, { year: new Date().getFullYear() })}</p>
            <span aria-hidden="true" className="hidden sm:inline">
              &middot;
            </span>
            <div className="flex items-center gap-3">
              <LocaleLink href="/privacy" className="font-bold transition hover:text-(--link)">
                {t.footer.privacy}
              </LocaleLink>
              <span aria-hidden="true">&middot;</span>
              {/*
                The only site-wide entry points to /teachers and /about, the two
                pages written for adults. Deliberately not in the NavBar: German
                labels already put the horizontal nav at 1014px of content at
                1280px (NavBar.tsx), and these pages are for adults who will go
                looking rather than for the students the nav serves.
              */}
              <LocaleLink href="/teachers" className="font-bold transition hover:text-(--link)">
                {t.footer.teachers}
              </LocaleLink>
              {/*
                Only in a locale that has an About page — English, for now. The
                label comes from the About catalogue, not the dictionary; see
                src/i18n/about.ts for why.
              */}
              {about && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <LocaleLink href="/about" className="font-bold transition hover:text-(--link)">
                    {about.footerLabel}
                  </LocaleLink>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
