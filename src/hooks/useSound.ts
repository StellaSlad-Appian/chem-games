// src/hooks/useSound.ts
'use client';

import { useGameSettings } from '../context/game-settings-context';
import { useCallback, useEffect, useRef } from 'react';

export type SoundEffect = 
  | 'explosion' 
  | 'click' 
  | 'success-synthesis' 
  | 'lock-element'
  | 'pop_01'   // Added for bubble popping
  | 'fizzle';;

const SOUND_PATHS: Record<SoundEffect, string> = {
  'success-synthesis': '/audio/sfx/confirmation_002.mp3',
  'explosion': '/audio/sfx/impactBell_heavy_000.mp3',
  'click': '/audio/sfx/click.mp3',
  'lock-element': '/audio/sfx/lock-element.mp3',
  'pop_01': '/audio/sfx/pop_01.mp3',
  'fizzle': '/audio/sfx/fizzle.mp3'
};

export function useSound() {
  const { isMuted, volume } = useGameSettings();
  
  // Track pools of audio instances for each sound effect to support clean polyphonic overlapping
  const poolRef = useRef<Record<string, HTMLAudioElement[]>>({});

  // Pre-load audio assets into client memory when hook initializes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    (Object.keys(SOUND_PATHS) as SoundEffect[]).forEach((effect) => {
      const audio = new Audio(SOUND_PATHS[effect]);
      audio.preload = 'auto';
      poolRef.current[effect] = [audio];
    });
  }, []);

  const playSound = useCallback((effect: SoundEffect) => {
    if (isMuted || typeof window === 'undefined') return;

    const path = SOUND_PATHS[effect];
    if (!path) return;

    if (!poolRef.current[effect]) {
      poolRef.current[effect] = [];
    }

    const pool = poolRef.current[effect];

    // Look for an existing instance that is currently paused or finished playing
    let audio = pool.find((a) => a.paused || a.ended);

    // If all channels are busy, spawn an extra concurrent instance up to a limit of 5
    if (!audio) {
      if (pool.length < 5) {
        audio = new Audio(path);
        audio.preload = 'auto';
        pool.push(audio);
      } else {
        // Rotational queue fallback: grab the oldest instance and reset it to zero
        audio = pool[0];
        audio.currentTime = 0;
      }
    }

    // Apply real-time volume parameters from context
    audio.volume = volume;
    audio.currentTime = 0;

    audio.play().catch((err) => {
      console.warn(`Audio playback interrupted or blocked for effect "${effect}":`, err);
    });
  }, [isMuted, volume]);

  return { playSound };
}