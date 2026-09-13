import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { GameSettingsProvider, useGameSettings, useGameTheme } from './game-settings-context';

const wrapper = ({ children }: { children: ReactNode }) => (
  <GameSettingsProvider>{children}</GameSettingsProvider>
);

const renderSettings = () => renderHook(() => useGameSettings(), { wrapper });

describe('GameSettingsProvider', () => {
  it('defaults to sound on at 20% volume and the light theme', () => {
    const { result } = renderSettings();
    expect(result.current.isMuted).toBe(false);
    expect(result.current.volume).toBe(0.2);
    expect(result.current.globalTheme).toBe('light');
    expect(result.current.gameThemes).toEqual({});
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('throws when used outside the provider', () => {
    const silence = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => renderHook(() => useGameSettings())).toThrow(/within a GameSettingsProvider/);
    silence.mockRestore();
  });

  it('restores saved preferences from localStorage', () => {
    localStorage.setItem('chem-games-muted', 'true');
    localStorage.setItem('chem-games-volume', '0.5');
    localStorage.setItem('chem-games-theme', 'dark');
    localStorage.setItem('chem-games-game-themes', JSON.stringify({ neutralise: 'dark' }));

    const { result } = renderSettings();
    expect(result.current.isMuted).toBe(true);
    expect(result.current.volume).toBe(0.5);
    expect(result.current.globalTheme).toBe('dark');
    expect(result.current.gameThemes).toEqual({ neutralise: 'dark' });
  });

  it('discards a corrupt per-game theme entry', () => {
    localStorage.setItem('chem-games-game-themes', 'not json');
    const { result } = renderSettings();
    expect(result.current.gameThemes).toEqual({});
    expect(localStorage.getItem('chem-games-game-themes')).toBeNull();
  });

  it('toggleMute persists the choice', () => {
    const { result } = renderSettings();
    act(() => result.current.toggleMute());
    expect(result.current.isMuted).toBe(true);
    expect(localStorage.getItem('chem-games-muted')).toBe('true');
  });

  it('setVolume clamps to 0–1, auto-mutes at 0 and auto-unmutes above 0', () => {
    const { result } = renderSettings();

    act(() => result.current.setVolume(1.7));
    expect(result.current.volume).toBe(1);

    act(() => result.current.setVolume(0));
    expect(result.current.volume).toBe(0);
    expect(result.current.isMuted).toBe(true);

    act(() => result.current.setVolume(0.4));
    expect(result.current.isMuted).toBe(false);
    expect(localStorage.getItem('chem-games-volume')).toBe('0.4');
  });

  it('setGlobalTheme updates the document theme attribute and persists', () => {
    const { result } = renderSettings();
    act(() => result.current.setGlobalTheme('dark'));
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('chem-games-theme')).toBe('dark');
  });

  it('a per-game theme overrides the global one only while that game is active', () => {
    const { result } = renderHook(
      () => ({ settings: useGameSettings(), theme: useGameTheme('neutralise') }),
      { wrapper }
    );
    expect(result.current.theme).toBe('light');

    act(() => result.current.settings.setGameTheme('neutralise', 'dark'));
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(JSON.parse(localStorage.getItem('chem-games-game-themes') ?? '{}')).toEqual({
      neutralise: 'dark',
    });

    act(() => result.current.settings.setGameTheme('neutralise', 'global'));
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});
