// src/components/layout/NavPanel.tsx
'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, type LucideIcon } from 'lucide-react';
import { AuthButton } from '@/components/auth/AuthButton';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { useI18n } from '@/i18n/client';

export interface NavSection {
  href: string;
  label: string;
  Icon: LucideIcon;
  /** The reader is on this section's page; rendered as aria-current. */
  current?: boolean;
}

/**
 * The navigation for screens below `lg`.
 *
 * Until this existed the header had no navigation on a phone at all: the links
 * in `NavBar` are `hidden … lg:flex` with no fallback, so below 1024px the
 * header was a wordmark and three controls. Three of the four destinations were
 * still reachable because the dashboard renders them as in-page sections, but
 * `/cheat-sheets` is a route of its own and was linked from nowhere else —
 * reachable on a phone only by typing the URL.
 *
 * A panel rather than a wider or wrapping header row, for three reasons the
 * header comments in `NavBar.tsx` make concrete:
 *
 *  1. The row has no width left. Measured in German at 360px before this
 *     change: brand 36px + controls 237px + gaps 32px + padding 32px = 337px of
 *     360px. A fifth control does not fit, and German is not the worst case
 *     that will ever exist.
 *  2. A vertical list gives every destination a full-width 44px target with its
 *     label beside it. A horizontal row at 360px cannot, in any of the five
 *     languages, without truncating or scrolling sideways — and sideways is
 *     forbidden by docs/ACCESSIBILITY.md (1.4.10).
 *  3. It scales. The next destination added costs nothing here, where in the
 *     row it costs width the row does not have.
 *
 * The sign-in / sign-out button **moves into** the panel below `lg` rather than
 * being duplicated. It is the widest control in the header (107px for German's
 * already-abbreviated "Anmelden"), so moving it is what pays for the trigger
 * button: the control cluster goes from 237px to 170px, and 360px stops being
 * tight. Above `lg` nothing changes — the row keeps every link visible, which
 * is worth more on a laptop than the tidiness of hiding them behind a button.
 *
 * The dialog behaviour is `GameOverlay`'s, which docs/ACCESSIBILITY.md names as
 * the reference: `role="dialog"`, `aria-modal`, an accessible name, focus moved
 * in on open and restored on close, Tab cycled inside, Escape to close. A panel
 * that fails those is worse than the missing nav it replaces — it traps
 * keyboard and screen-reader users instead of merely hiding links from them.
 *
 * ## Why the panel is portalled
 *
 * `NavBar`'s <header> carries `backdrop-blur-md`, and an ancestor with a
 * `backdrop-filter` becomes the containing block for every `position: fixed`
 * descendant. Rendered in place, the panel's `fixed inset-0` therefore resolved
 * against the header — 320×66 — instead of the viewport: the backdrop covered
 * only the header strip, and the links were clipped out of sight by the
 * wrapper's `overflow-hidden`.
 *
 * It took a screenshot to notice, because Playwright's `toBeVisible()` is
 * satisfied by a non-empty bounding box and does not know about a clipping
 * ancestor, so the e2e assertions passed against a panel no human could read.
 * e2e/nav.spec.ts now also asserts the panel is as tall as the viewport, which
 * is the thing that was actually wrong.
 */

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Tailwind's `lg`. The panel and its trigger exist only below this. */
const LG_BREAKPOINT = '(min-width: 64rem)';

const PANEL_ID = 'site-nav-panel';

export function NavPanel({
  sections,
  isAuthenticated,
}: {
  sections: NavSection[];
  isAuthenticated: boolean;
}) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  // Focus in on open, back to the trigger on close — the same shape as
  // GameOverlay's, including the rAF, which is what makes the focus land after
  // the panel has actually been painted.
  useEffect(() => {
    if (!isOpen) return;

    // Captured here rather than read in the cleanup: the trigger is rendered
    // unconditionally so the node is the same one either way, and reading a ref
    // during cleanup is the pattern react-hooks/exhaustive-deps warns about
    // because in general it is not.
    const trigger = triggerRef.current;
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(frame);
      trigger?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      close();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, close]);

  // The page behind a modal must not scroll, or a phone reader flicking at the
  // backdrop moves the page they cannot see instead of the panel they can.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /*
   * Close when the viewport crosses into `lg`. Both the trigger and the panel
   * are `lg:hidden`, so a tablet turned from portrait to landscape while the
   * panel is open would otherwise leave the panel invisible, the body still
   * scroll-locked and focus inside something nobody can see.
   */
  useEffect(() => {
    if (!isOpen || typeof window.matchMedia !== 'function') return;

    // Only the `change` event, never a synchronous check of `query.matches` on
    // entry. The trigger is `lg:hidden`, so the panel cannot be opened at `lg`
    // in the first place — the crossing is the only case there is, and closing
    // straight from an effect body is a cascading render the lint rule is right
    // to refuse.
    const query = window.matchMedia(LG_BREAKPOINT);

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, [isOpen, close]);

  const handleTabKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;

    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        aria-label={t.nav.menuOpenA11y}
        className="rounded-lg border border-(--border) bg-(--surface)/90 p-2.5 text-(--foreground) shadow-sm backdrop-blur transition hover:border-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link) lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {isOpen &&
        createPortal(
          <div className="lg:hidden">
            <div
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            {/*
              This wrapper is not decoration and must not be flattened away. The
              panel slides in from `translateX(100%)`, which for the first 200ms
              paints it past the right edge of the viewport — and a fixed element
              outside the viewport still counts towards
              `document.documentElement.scrollWidth`. Without something to clip
              it, opening the panel makes the whole page scroll sideways for the
              length of the animation, which docs/ACCESSIBILITY.md forbids
              (1.4.10) and which e2e/nav.spec.ts catches at 320px.

              `pointer-events-none` so the backdrop underneath still takes the
              clicks that close the panel; the panel itself turns them back on.
            */}
            <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
              <div
                ref={panelRef}
                id={PANEL_ID}
                role="dialog"
                aria-modal="true"
                aria-label={t.nav.menuTitleA11y}
                onKeyDown={handleTabKey}
                /*
                 * Right rather than left: the brand sits on the left of the header
                 * and every control — language, settings, this trigger — is already
                 * on the right, so the panel opens where the reader just tapped and
                 * where a thumb already is, instead of crossing the screen. None of
                 * the locales in the roadmap are right-to-left; adding one means
                 * revisiting this side along with `dir` in the root layout.
                 *
                 * `w-[min(20rem,85vw)]` keeps a strip of backdrop visible at 320px,
                 * so it reads as a panel over the page rather than a new page.
                 */
                className="nav-panel-in pointer-events-auto absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col overflow-y-auto border-l-2 border-(--border) bg-(--surface) shadow-2xl"
              >
                <div className="flex items-center justify-end border-b border-(--border) px-4 py-3">
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={close}
                    aria-label={t.nav.menuCloseA11y}
                    className="rounded-lg border border-(--border) bg-(--surface) p-2.5 text-(--foreground) transition hover:border-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav aria-label={t.nav.sectionsA11y} className="flex flex-col gap-1 p-4">
                  {sections.map(({ href, label, Icon, current }) => (
                    <LocaleLink
                      key={href}
                      href={href}
                      aria-current={current ? 'page' : undefined}
                      onClick={close}
                      // min-h-11 is 44px: the target size docs/ACCESSIBILITY.md asks
                      // for, which the horizontal row cannot give on a phone.
                      className="flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 text-sm font-black uppercase tracking-wider text-(--foreground) transition hover:bg-blue-500/10 hover:text-(--link) aria-[current=page]:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      {label}
                    </LocaleLink>
                  ))}
                </nav>

                {/*
                  `flex flex-col` stretches the button to the panel's width and
                  `text-center` cascades into it, so AuthButton needs no variant
                  prop for this one placement. `mt-auto` pins it to the bottom,
                  away from the destinations, because signing out is not a
                  destination.
                */}
                <div className="mt-auto flex flex-col border-t border-(--border) p-4 text-center">
                  <AuthButton isAuthenticated={isAuthenticated} />
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
