// src/components/layout/LanguageSwitcher.test.tsx
//
// The switcher's whole behaviour is a React `onChange` handler, so the thing
// worth testing is that a plain DOM `change` event dispatched *at the element*
// reaches it — the same thing Playwright's `selectOption()` does.
//
// Events are fired on the <select> itself, never on `window`. A listener
// dispatched straight at `window` runs in registration order with no capture
// phase, so a test written that way passes whether or not the handler is
// actually wired to the control.

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { renderWithProviders, TestProviders } from '@/test-utils/render';
import { en } from '@/i18n/dictionaries/en';
import { de } from '@/i18n/dictionaries/de';
import { LOCALES, LOCALE_COOKIE, LOCALE_LABELS } from '@/i18n/config';

const { pathnameMock } = vi.hoisted(() => ({
  pathnameMock: vi.fn(() => '/en/cheat-sheets'),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => pathnameMock(),
}));

// The switcher does a full navigation rather than a router transition, so the
// call to assert is window.location.replace(). jsdom refuses to let that method
// be spied on — Location's methods are non-configurable — and calling the real
// one raises "Not implemented: navigation", so the whole object is stood in
// for. The component reads exactly two things off it, `search` and `replace`.
const replaceMock = vi.fn();
const locationStub = { search: '', replace: replaceMock };

const switcher = () => screen.getByLabelText(en.language.label);

beforeEach(() => {
  replaceMock.mockClear();
  locationStub.search = '';
  Object.defineProperty(window, 'location', { configurable: true, value: locationStub });
  pathnameMock.mockReturnValue('/en/cheat-sheets');
  document.cookie = `${LOCALE_COOKIE}=; path=/; max-age=0`;
});

describe('LanguageSwitcher', () => {
  it('offers every locale, each named in its own language', () => {
    renderWithProviders(<LanguageSwitcher />);

    const options = screen.getAllByRole('option') as HTMLOptionElement[];
    expect(options.map((option) => option.value)).toEqual([...LOCALES]);
    expect(options.map((option) => option.textContent)).toEqual(
      LOCALES.map((locale) => LOCALE_LABELS[locale])
    );
  });

  it('marks itself hydrated, which is the signal the e2e helper waits for', () => {
    renderWithProviders(<LanguageSwitcher />);

    // `useSyncExternalStore`'s server snapshot is false, so this attribute is
    // absent in the server-rendered HTML and appears only once React owns the
    // element — i.e. once `onChange` below can actually fire.
    expect(switcher()).toHaveAttribute('data-hydrated', 'true');
  });

  it('navigates to the same page in the chosen language and remembers the choice', () => {
    renderWithProviders(<LanguageSwitcher />);

    fireEvent.change(switcher(), { target: { value: 'de' } });

    expect(replaceMock).toHaveBeenCalledWith('/de/cheat-sheets');
    expect(document.cookie).toContain(`${LOCALE_COOKIE}=de`);
  });

  it('keeps the query string when it switches', () => {
    pathnameMock.mockReturnValue('/en/auth');
    locationStub.search = '?error=verification';
    renderWithProviders(<LanguageSwitcher />);

    fireEvent.change(switcher(), { target: { value: 'de' } });

    expect(replaceMock).toHaveBeenCalledWith('/de/auth?error=verification');
  });

  it('does nothing when the chosen language is already the active one', () => {
    renderWithProviders(<LanguageSwitcher />);

    fireEvent.change(switcher(), { target: { value: 'en' } });

    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('labels itself in the active language — the label is its accessible name', () => {
    pathnameMock.mockReturnValue('/de/cheat-sheets');
    render(
      <TestProviders locale="de" dictionary={de}>
        <LanguageSwitcher variant="panel" />
      </TestProviders>
    );

    const select = screen.getByLabelText(de.language.label) as HTMLSelectElement;
    expect(select.value).toBe('de');

    fireEvent.change(select, { target: { value: 'en' } });
    expect(replaceMock).toHaveBeenCalledWith('/en/cheat-sheets');
  });
});
