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
  // Sound is ON by default (isMuted = false)
  const [isMuted, setIsMuted] = useState<boolean>(false);
  // Default volume level: 20%
  const [volume, setVolumeState] = useState<number>(0.2);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Sync state from localStorage on mount safely (Client-side only)
  useEffect(() => {
    const savedMute = localStorage.getItem('chem-games-muted');
    const savedVolume = localStorage.getItem('chem-games-volume');

    if (savedMute !== null) {
      setIsMuted(savedMute === 'true');
    }
    if (savedVolume !== null) {
      setVolumeState(parseFloat(savedVolume));
    }
    
    setIsInitialized(true);
  }, []);

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

  return (
    <SettingsContext.Provider value={{ isMuted, volume, toggleMute, setVolume }}>
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