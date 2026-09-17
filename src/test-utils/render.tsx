// Shared render helper: wraps components in the same providers the app uses.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { GameSettingsProvider } from '@/context/game-settings-context';
import { I18nProvider } from '@/i18n/client';
import { en } from '@/i18n/dictionaries/en';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';

/**
 * Component tests render in English by default, so assertions written against
 * the English copy keep working. Pass `locale` and `dictionary` to assert on a
 * translation instead; the locale files themselves are covered by the parity
 * checks in `src/i18n/dictionary.test.ts`.
 */
export function TestProviders({
  children,
  locale = DEFAULT_LOCALE,
  dictionary = en,
}: {
  children: ReactNode;
  locale?: Locale;
  dictionary?: Dictionary;
}) {
  return (
    <I18nProvider locale={locale} dictionary={dictionary}>
      <GameSettingsProvider>{children}</GameSettingsProvider>
    </I18nProvider>
  );
}

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: TestProviders, ...options });
}
