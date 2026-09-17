// src/i18n/client.tsx
'use client';

// How client components read translations.
//
// Most of this app's interactive surface — every game page, the settings modal,
// the feedback widget, the auth form — is a client component, so passing a
// dictionary down as props would mean threading it through a dozen layers. The
// root layout is a server component that already loads the dictionary, so it
// hands the whole thing to this provider once and every descendant reads it
// from context.
//
// The cost is that the dictionary is serialized into the RSC payload. That is
// why the cheat-sheet prose lives in src/i18n/cheat-sheets/ and not in the
// dictionary: it is an order of magnitude larger than the UI strings and is
// only ever rendered on the server. Keep it that way — see docs/i18n/README.md
// § What goes where.

import { createContext, useContext, useMemo } from 'react';
import type { Dictionary } from './dictionaries/en';
import { DEFAULT_LOCALE, type Locale } from './config';
import { format, formatPlural, type PluralForms } from './format';
import { localizePath } from './routing';

interface I18nValue {
  locale: Locale;
  /** The dictionary itself. Read it as `t.nav.profile`. */
  t: Dictionary;
  /** Substitutes `{name}` placeholders: `f(t.footer.copyright, { year })`. */
  f: (template: string, values?: Record<string, string | number>) => string;
  /**
   * Picks the plural form for the active locale and interpolates it:
   * `p(t.cheatSheets.count, visible.length)`. `{count}` is filled in for you.
   *
   * Never pick the form with a `count === 1` ternary at the call site: how many
   * forms a string has is a property of the language, and a two-form assumption
   * is wrong for most of the roadmap.
   */
  p: (forms: PluralForms, count: number, values?: Record<string, string | number>) => string;
  /** Prefixes an app-relative path with the active locale. */
  href: (path: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: dictionary,
      f: format,
      p: (forms: PluralForms, count: number, values?: Record<string, string | number>) =>
        formatPlural(locale, forms, count, values),
      href: (path: string) => localizePath(path, locale),
    }),
    [locale, dictionary]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Throws outside the provider rather than falling back to English. A silent
 * fallback would let an untranslated subtree ship unnoticed; a thrown error
 * shows up the first time the component renders, in dev and in tests.
 * `renderWithProviders()` in src/test-utils/render.tsx wires the provider up,
 * so component tests get it for free.
 */
export function useI18n(): I18nValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export { DEFAULT_LOCALE };
export type { Locale, Dictionary };
