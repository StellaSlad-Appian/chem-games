// src/components/layout/NavPanel.test.tsx
//
// The panel exists because below `lg` there was no navigation at all, so the
// first test is the plain one: the destinations are in there, and
// `/cheat-sheets` — the one that was reachable from nowhere else — is among
// them.
//
// The rest is the dialog contract from docs/ACCESSIBILITY.md. Those assertions
// look fussy next to "the links render", but a panel that opens and cannot be
// closed from the keyboard is worse for a screen-reader user than the missing
// nav it replaces: before, the links were absent; after, focus is somewhere
// they cannot leave.

import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FileText, Gamepad2, Trophy, User } from 'lucide-react';
import { NavPanel, type NavSection } from './NavPanel';
import { TestProviders } from '@/test-utils/render';
import { en } from '@/i18n/dictionaries/en';

// AuthButton calls useRouter() unconditionally, even on the signed-out branch
// that only renders a link.
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

const SECTIONS: NavSection[] = [
  { href: '/#profile', label: en.nav.profile, Icon: User },
  { href: '/#leaderboards', label: en.nav.leaderboards, Icon: Trophy },
  { href: '/#games', label: en.nav.games, Icon: Gamepad2 },
  { href: '/cheat-sheets', label: en.nav.cheatSheets, Icon: FileText },
];

function renderPanel(isAuthenticated = false) {
  return render(<NavPanel sections={SECTIONS} isAuthenticated={isAuthenticated} />, {
    wrapper: TestProviders,
  });
}

/**
 * What the DOM actually carries. `LocaleLink` hands next/link `/en/#games` and
 * next/link normalises the slash before a fragment away, so asserting the
 * unnormalised string would be asserting an implementation detail that the
 * browser never sees.
 */
const expectedHref = (href: string) => `/en${href}`.replace('/#', '#');

const trigger = () => screen.getByRole('button', { name: en.nav.menuOpenA11y });
const closeButton = () => screen.getByRole('button', { name: en.nav.menuCloseA11y });
const panel = () => screen.getByRole('dialog', { name: en.nav.menuTitleA11y });

async function openPanel() {
  fireEvent.click(trigger());
  await waitFor(() => expect(closeButton()).toHaveFocus());
}

describe('NavPanel', () => {
  it('renders outside the header, so `fixed` means the viewport', async () => {
    const { container } = renderPanel();
    await openPanel();

    // NavBar's <header> has `backdrop-blur-md`, and a backdrop-filter ancestor
    // becomes the containing block for fixed descendants — in place, the panel
    // sized itself to the 66px header and its links were clipped out of sight.
    expect(container).not.toContainElement(panel());
    expect(document.body).toContainElement(panel());
  });

  it('starts closed, and says so on the trigger', () => {
    renderPanel();

    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens onto every destination, locale-prefixed', async () => {
    renderPanel();
    await openPanel();

    expect(trigger()).toHaveAttribute('aria-expanded', 'true');
    for (const { href, label } of SECTIONS) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute(
        'href',
        expectedHref(href)
      );
    }
  });

  it('carries the sign-in button that the header hides below lg', async () => {
    renderPanel();
    await openPanel();

    expect(screen.getByRole('link', { name: en.nav.login })).toBeInTheDocument();
  });

  it('closes on Escape and gives focus back to the trigger', async () => {
    renderPanel();
    await openPanel();

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger()).toHaveFocus();
  });

  it('closes when a destination is chosen', async () => {
    renderPanel();
    await openPanel();

    fireEvent.click(screen.getByRole('link', { name: en.nav.cheatSheets }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes on the backdrop', async () => {
    renderPanel();
    await openPanel();

    // Queried from the document, not the render container: the panel is
    // portalled to document.body so its `fixed` positioning resolves against
    // the viewport rather than against the blurred header.
    const backdrop = document.body.querySelector('[aria-hidden="true"].fixed.inset-0');
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop!);

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('keeps Tab inside the panel, in both directions', async () => {
    renderPanel();
    await openPanel();

    const focusable = Array.from(
      panel().querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    expect(first).not.toBe(last);

    // Forwards off the end wraps to the start.
    last.focus();
    fireEvent.keyDown(panel(), { key: 'Tab' });
    expect(first).toHaveFocus();

    // Backwards off the start wraps to the end.
    fireEvent.keyDown(panel(), { key: 'Tab', shiftKey: true });
    expect(last).toHaveFocus();
  });

  it('locks the page behind it, and unlocks it again', async () => {
    renderPanel();
    expect(document.body.style.overflow).toBe('');

    await openPanel();
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(document.body.style.overflow).toBe(''));
  });

  it('closes itself if the viewport grows past lg while it is open', async () => {
    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    let matches = false;
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (media: string) =>
        ({
          media,
          get matches() {
            return matches;
          },
          addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) =>
            listeners.add(listener),
          removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) =>
            listeners.delete(listener),
          onchange: null,
          addListener: () => undefined,
          removeListener: () => undefined,
          dispatchEvent: () => false,
        }) as unknown as MediaQueryList
    );

    renderPanel();
    await openPanel();

    matches = true;
    act(() => {
      for (const listener of listeners) listener({ matches: true } as MediaQueryListEvent);
    });

    // Otherwise the panel is hidden by `lg:hidden` while the body stays
    // scroll-locked and focus sits in something nobody can see.
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe('');
  });
});
