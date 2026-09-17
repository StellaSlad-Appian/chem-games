// src/components/layout/LanguageSwitcher.tsx
'use client';

import { useId, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';
import {
  isLocale,
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_LABELS,
  type Locale,
} from '@/i18n/config';
import { localizePath } from '@/i18n/routing';
import { useI18n } from '@/i18n/client';

/**
 * Switches the interface language and remembers the choice.
 *
 * A native <select> rather than a custom menu: it is keyboard-operable and
 * announced correctly by every screen reader without a focus trap or a roving
 * tabindex, it degrades sensibly at 320px, and it still reads well when Phase 2
 * takes the list from two entries to six. `docs/ACCESSIBILITY.md` asks for a
 * visible focus ring and a real accessible name, both of which are here: the
 * <label> is the name, and the globe icon is decorative.
 *
 * Each option is written in its own language ("Deutsch", not "German"), because
 * a reader looking for their language recognises it in their language, not in
 * the one they are currently stuck in.
 */
export function LanguageSwitcher({ variant = 'nav' }: { variant?: 'nav' | 'panel' }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const selectId = useId();
  const [isPending, startTransition] = useTransition();

  function handleChange(next: string) {
    if (!isLocale(next) || next === locale) return;

    // The cookie is what makes the choice stick when the reader later opens an
    // unprefixed URL (a bookmark, a shared link, "/"). It holds a language code
    // and nothing else, so writing it from the client is fine — the proxy only
    // ever reads it. Documented on the privacy page.
    document.cookie = [
      `${LOCALE_COOKIE}=${next}`,
      'path=/',
      `max-age=${LOCALE_COOKIE_MAX_AGE}`,
      'samesite=lax',
    ].join('; ');

    // Read the query string here rather than with useSearchParams(), so this
    // component never forces a Suspense boundary on the pages that embed it.
    const search = typeof window === 'undefined' ? '' : window.location.search;
    const target = `${localizePath(pathname || '/', next as Locale)}${search}`;

    // replace(), not push(): flipping the language is not a step the reader
    // wants to walk back through one locale at a time.
    startTransition(() => router.replace(target));
  }

  const isPanel = variant === 'panel';

  return (
    <div className={isPanel ? 'flex flex-col gap-2' : 'relative'}>
      <label
        htmlFor={selectId}
        className={
          isPanel
            ? 'flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-(--muted)'
            : 'sr-only'
        }
      >
        {isPanel && <Languages className="h-4 w-4" aria-hidden="true" />}
        {t.language.label}
      </label>

      <div className="relative flex items-center">
        {!isPanel && (
          <Languages
            className="pointer-events-none absolute left-2.5 h-4 w-4 text-(--muted)"
            aria-hidden="true"
          />
        )}
        <select
          id={selectId}
          value={locale}
          disabled={isPending}
          onChange={(event) => handleChange(event.target.value)}
          className={`cursor-pointer appearance-none rounded-lg border border-(--border) bg-(--surface) py-2 pr-3 text-xs font-black uppercase tracking-wider text-(--foreground) shadow-sm transition hover:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:opacity-60 ${
            isPanel ? 'w-full px-4 py-3 text-sm normal-case tracking-normal' : 'pl-8'
          }`}
        >
          {LOCALES.map((option) => (
            <option key={option} value={option}>
              {LOCALE_LABELS[option].native}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
