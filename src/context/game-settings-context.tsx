// src/context/game-settings-context.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type SettingsState = {
  isMuted: boolean;
  volume: number; // 0.0 to 1.0
  toggleMute: () => void;
  setVolume: (vol: number) => void;
};

const SettingsContext = createContext<SettingsState | undefined>(undefined);

export function GameSettingsProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.5);

  // Sync state from localStorage on mount safely
  useEffect(() => {
    const savedMute = localStorage.getItem('chem-games-muted');
    const savedVolume = localStorage.getItem('chem-games-volume');
    if (savedMute) setIsMuted(savedMute === 'true');
    if (savedVolume) setVolumeState(parseFloat(savedVolume));
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      localStorage.setItem('chem-games-muted', String(!prev));
      return !prev;
    });
  };

  const setVolume = (vol: number) => {
    const clampedVolume = Math.max(0, Math.min(1, vol));
    setVolumeState(clampedVolume);
    localStorage.setItem('chem-games-volume', String(clampedVolume));
  };

  return (
    <SettingsContext.Provider value={{ isMuted, volume, toggleMute, setVolume }}>
      {children}
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