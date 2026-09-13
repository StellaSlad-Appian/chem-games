// Shared render helper: wraps components in the same providers the app uses.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { GameSettingsProvider } from '@/context/game-settings-context';

export function TestProviders({ children }: { children: ReactNode }) {
  return <GameSettingsProvider>{children}</GameSettingsProvider>;
}

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: TestProviders, ...options });
}
