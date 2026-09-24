// src/app/[lang]/layout.tsx
//
// The root layout lives under [lang] rather than at src/app/, which the Next
// internationalization guide explicitly supports ("The root layout can also be
// nested in the new folder"). Everything a reader navigates to is localized, so
// nothing is left at the root that needs an <html> element — the only files
// outside [lang] are the two route handlers in src/app/auth and
// src/app/account, and route handlers render no layout.

import type { Metadata } from 'next';
import { AppProviders } from '@/providers/app-providers';
import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { I18nProvider } from '@/i18n/client';
import { localeAlternates } from '@/i18n/routing';
import { Nunito } from 'next/font/google';
import '@/app/globals.css';

/**
 * The site's one typeface, for headings and body alike, in every locale.
 *
 * Self-hosted by next/font: the files are downloaded at build time and served
 * from this origin, so a page view no longer sends the reader's IP address to
 * Google, which the old `@import` from fonts.googleapis.com did on every load.
 *
 * Nunito ships Cyrillic, so Russian needs no second family. All subsets are
 * served with `unicode-range`, and the browser fetches a subset only when the
 * page draws a glyph from it; `subsets` only decides what is *preloaded*, and
 * Latin is what every locale draws first — including Russian, for formulae and
 * the brand name. It is a variable font, so one file covers every weight the
 * site uses (400–900).
 *
 * Exposed as `--font-nunito` on <html>; globals.css points `--font-body` and
 * `--font-display` at it.
 */
const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-nunito',
});

/**
 * Absolute base for canonical and hreflang URLs. Next refuses to build when
 * URL-based metadata is relative and `metadataBase` is unset, so this has to
 * resolve to something even in local development.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await props.params;
  const t = await getDictionary(lang);
  const alternates = localeAlternates('/');

  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    keywords: [...t.meta.keywords],
    alternates: {
      canonical: alternates[isLocale(lang) ? lang : DEFAULT_LOCALE],
      languages: {
        ...alternates,
        // Readers whose language we do not publish are sent to the default,
        // which is also what the proxy does for them.
        'x-default': alternates[DEFAULT_LOCALE],
      },
    },
  };
}

export default async function RootLayout(props: LayoutProps<'/[lang]'>) {
  const { lang } = await props.params;
  // An unknown segment cannot normally reach here — the proxy only ever
  // redirects to a supported locale — but a layout must never throw, because
  // the 404 page renders inside it. Fall back rather than call notFound().
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dictionary = await getDictionary(locale);

  return (
    // Every locale in the roadmap (en, de, fr, es, it, ru) is left-to-right, so
    // no `dir` handling is needed yet. Adding an RTL locale means setting
    // dir={...} here and auditing the fixed left/right positioning in the game
    // shells — see docs/i18n/README.md § Adding a locale.
    <html lang={locale} className={nunito.variable}>
      <body className="flex min-h-screen flex-col bg-(--background) font-sans text-(--foreground) antialiased selection:bg-(--action) selection:text-white">
        <I18nProvider locale={locale} dictionary={dictionary}>
          <AppProviders>{props.children}</AppProviders>
        </I18nProvider>
      </body>
    </html>
  );
}
