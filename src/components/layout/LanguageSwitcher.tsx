// src/components/layout/LanguageSwitcher.tsx
'use client';

import { useId, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
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
 * The <select> carries `data-hydrated="true"` once React has hydrated it.
 *
 * Driving this control from a test means dispatching a DOM `change` event, and
 * until React has attached `onChange` that event goes nowhere. `languageSwitcher()`
 * in `e2e/helpers.ts` waits for this attribute rather than for
 * `GameSettingsProvider`'s `invisible` wrapper, which is a *different*
 * component's state and only ever correlated with this one being ready.
 *
 * It is a better precondition than the one it replaced, but it was never what
 * the three flaky switcher specs were tripping over. Measured under six
 * parallel workers: the attribute was present, `handleChange` ran, and the
 * NEXT_LOCALE cookie was written 372ms after `selectOption()` — and the URL
 * then took a further 8.1s to move. The cause was `router.replace()`, a React
 * transition: the App Router holds the URL until the destination's RSC payload
 * arrives and the transition commits, and with no `loading.tsx` on these
 * routes nothing committed early. `handleChange` now does a full navigation
 * instead, so the URL moves at once — see the comment there.
 *
 * The attribute stays because it is still the honest precondition for driving
 * a controlled <select> from a test, and because it documents the one thing a
 * full navigation does *not* fix: before hydration there is no `onChange` at
 * all, so the control is inert for a reader who has not yet got JavaScript.
 * Fixing that needs a <form> and a route that sets the cookie server-side.
 */

/** Never fires: the value flips exactly once, when React takes over. */
const subscribeNever = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/**
 * False while server-rendering and during the hydration render, true from the
 * first client render after hydration.
 *
 * `useSyncExternalStore` rather than `useEffect` + `setState`: the effect form
 * is a `react-hooks/set-state-in-effect` error under this project's lint
 * config, and it would flip the flag a render later than React itself
 * considers the tree hydrated.
 */
function useHydrated(): boolean {
  return useSyncExternalStore(subscribeNever, clientSnapshot, serverSnapshot);
}

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
 *
 * The <select> carries `data-hydrated` once React owns it — see
 * `useHydrated()` below.
 */
export function LanguageSwitcher({ variant = 'nav' }: { variant?: 'nav' | 'panel' }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const selectId = useId();
  const hydrated = useHydrated();

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

    // A full navigation, not router.replace(). Changing language swaps the
    // whole dictionary, the <html lang> attribute and — once Russian lands —
    // the font stack, so there is nothing of the current document worth
    // keeping. router.replace() put this inside a React transition, where the
    // App Router holds both the URL and the old UI until the destination's RSC
    // payload arrives; with no loading.tsx on these routes nothing committed
    // early, so the reader saw a dead pause and the <select> snapped back to
    // the old language. assign() commits immediately and the browser shows its
    // own progress. Replacing rather than pushing, so Back does not walk the
    // reader through one locale at a time.
    window.location.replace(target);
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
          onChange={(event) => handleChange(event.target.value)}
          // Set in the same render that attaches onChange, so it cannot appear
          // before the control actually works. Undefined (not "false") while
          // server-rendered, so the attribute is simply absent until then.
          data-hydrated={hydrated ? 'true' : undefined}
          // In the nav the control is deliberately narrow on a phone: the
          // browser ellipsises the selected option rather than pushing the
          // header past the viewport. It relaxes to its natural width at sm,
          // and the panel variant (inside the game settings modal) is always
          // full width.
          className={`cursor-pointer appearance-none truncate rounded-lg border border-(--border) bg-(--surface) py-2 pr-2 text-xs font-black uppercase tracking-wider text-(--foreground) shadow-sm transition hover:border-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link) disabled:opacity-60 ${
            isPanel
              ? 'w-full px-4 py-3 text-sm normal-case tracking-normal'
              : 'w-[4.5rem] pl-8 sm:w-auto sm:pr-3'
          }`}
        >
          {LOCALES.map((option) => (
            <option key={option} value={option}>
              {LOCALE_LABELS[option]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
