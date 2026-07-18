// src/context/game-settings-context.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'dark' | 'light';
export type GameThemeScope = 'acid-classification' | 'formula-blaster' | 'neutralise';
type GameThemePreferences = Partial<Record<GameThemeScope, Theme>>;

type SettingsState = {
  isMuted: boolean;
  volume: number; // 0.0 to 1.0
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  globalTheme: Theme;
  gameThemes: GameThemePreferences;
  setGlobalTheme: (theme: Theme) => void;
  setGameTheme: (game: GameThemeScope, theme: Theme | 'global') => void;
  setActiveGame: (game?: GameThemeScope) => void;
};

const SettingsContext = createContext<SettingsState | undefined>(undefined);

export function GameSettingsProvider({ children }: { children: React.ReactNode }) {
  // Sound is ON by default (isMuted = false)
  const [isMuted, setIsMuted] = useState<boolean>(false);
  // Default volume level: 20%
  const [volume, setVolumeState] = useState<number>(0.2);
  const [globalTheme, setGlobalThemeState] = useState<Theme>('dark');
  const [gameThemes, setGameThemes] = useState<GameThemePreferences>({});
  const [activeGame, setActiveGame] = useState<GameThemeScope | undefined>();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Sync state from localStorage on mount safely (Client-side only)
  useEffect(() => {
    const savedMute = localStorage.getItem('chem-games-muted');
    const savedVolume = localStorage.getItem('chem-games-volume');
    const savedTheme = localStorage.getItem('chem-games-theme');
    const savedGameThemes = localStorage.getItem('chem-games-game-themes');

    if (savedMute !== null) {
      setIsMuted(savedMute === 'true');
    }
    if (savedVolume !== null) {
      setVolumeState(parseFloat(savedVolume));
    }
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setGlobalThemeState(savedTheme);
    }
    if (savedGameThemes) {
      try {
        setGameThemes(JSON.parse(savedGameThemes) as GameThemePreferences);
      } catch {
        localStorage.removeItem('chem-games-game-themes');
      }
    }
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    const effectiveTheme = activeGame ? gameThemes[activeGame] ?? globalTheme : globalTheme;
    document.documentElement.dataset.theme = effectiveTheme;
  }, [activeGame, gameThemes, globalTheme]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const nextMute = !prev;
      localStorage.setItem('chem-games-muted', String(nextMute));
      return nextMute;
    });
  };

  const setVolume = (vol: number) => {
    const clampedVolume = Math.max(0, Math.min(1, vol));
    setVolumeState(clampedVolume);
    localStorage.setItem('chem-games-volume', String(clampedVolume));
    
    // Auto-unmute if they increase volume, or auto-mute if volume hits 0
    if (clampedVolume > 0 && isMuted) {
      setIsMuted(false);
      localStorage.setItem('chem-games-muted', 'false');
    } else if (clampedVolume === 0 && !isMuted) {
      setIsMuted(true);
      localStorage.setItem('chem-games-muted', 'true');
    }
  };

  const setGlobalTheme = (theme: Theme) => {
    setGlobalThemeState(theme);
    localStorage.setItem('chem-games-theme', theme);
  };

  const setGameTheme = (game: GameThemeScope, theme: Theme | 'global') => {
    setGameThemes((current) => {
      const next = { ...current };
      if (theme === 'global') delete next[game];
      else next[game] = theme;
      localStorage.setItem('chem-games-game-themes', JSON.stringify(next));
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ isMuted, volume, toggleMute, setVolume, globalTheme, gameThemes, setGlobalTheme, setGameTheme, setActiveGame }}>
      {/* Optional: Prevent audio elements from attempting to play 
        until we know the user's actual saved preferences.
      */}
      {isInitialized ? children : <div className="invisible">{children}</div>}
    </SettingsContext.Provider>
  );
}

export function useGameSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useGameSettings must be used within a GameSettingsProvider');
  }
  return context;
}

export function useGameTheme(game?: GameThemeScope) {
  const { globalTheme, gameThemes, setActiveGame } = useGameSettings();
  const effectiveTheme = game ? gameThemes[game] ?? globalTheme : globalTheme;

  useEffect(() => {
    setActiveGame(game);
    return () => setActiveGame(undefined);
  }, [game, setActiveGame]);

  return effectiveTheme;
}
