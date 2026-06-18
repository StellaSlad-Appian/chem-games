// src/hooks/use-sound.ts
'use client';

import { useGameSettings } from '../context/game-settings-context';
import { useCallback } from 'react';

type SoundEffect = 'success-synthesis' | 'explosion' | 'click' | 'lock-element';

const SOUND_PATHS: Record<SoundEffect, string> = {
  'success-synthesis': '/audio/sfx/success-synthesis.mp3',
  'explosion': '/audio/sfx/explosion.mp3',
  'click': '/audio/sfx/click.mp3',
  'lock-element': '/audio/sfx/lock-element.mp3',
};

export function useSound() {
  const { isMuted, volume } = useGameSettings();

  const playSound = useCallback((effect: SoundEffect) => {
    if (isMuted) return;

    // Standard Browser Audio execution
    const audio = new Audio(SOUND_PATHS[effect]);
    audio.volume = volume;
    audio.play().catch((err) => {
      // Catching autoplay blockages silently or handling gracefully
      console.warn(`Audio play blocked for action: ${effect}`, err);
    });
  }, [isMuted, volume]);

  return { playSound };
}