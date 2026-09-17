// src/hooks/useSound.ts
'use client';

import { useGameSettings } from '../context/game-settings-context';
import { useCallback, useEffect, useRef } from 'react';

export type SoundEffect = 
  | 'explosion' 
  | 'click' 
  | 'success-synthesis' 
  | 'lock-element'
  | 'pop_01'
  | 'fizzle'
  | 'laser-pew'       
  | 'hit-enemy'       
  | 'metal-deflect'   
  | 'splash-defeat'
  // --- NEW MISSING SOUNDS ---
  | 'equation-balanced'
  | 'equation-error'
  | 'switch-sound'
  // --- Share to Fill (Lewis structures) ---
  | 'pair-formed'
  | 'structure-complete'
  | 'pair-rejected';

// Added Partial<> so TypeScript allows us to omit the missing file paths for now
const SOUND_PATHS: Partial<Record<SoundEffect, string>> = {
  'success-synthesis': '/audio/sfx/confirmation_002.mp3',
  'explosion': '/audio/sfx/impactBell_heavy_000.mp3',
  'click': '/audio/sfx/click.mp3',
  'lock-element': '/audio/sfx/lock-element.mp3',
  'pop_01': '/audio/sfx/pop_01.mp3',
  'fizzle': '/audio/sfx/fizzle.mp3',
  'laser-pew': '/audio/sfx/mixkit-laser-gun-shot-3110.mp3',
  'hit-enemy': '/audio/sfx/impactGlass_medium_003.mp3', 
  'metal-deflect': '/audio/sfx/impactMetal_medium_001.mp3', 
  'splash-defeat': '/audio/sfx/explode.mp3'
};

// Map missing sounds to existing sounds. 
// Delete lines from here as you get the real audio files and add them to SOUND_PATHS above!
const SOUND_FALLBACK_MAP: Partial<Record<SoundEffect, SoundEffect>> = {
  'equation-balanced': 'success-synthesis',
  'equation-error': 'fizzle',
  'switch-sound': 'click',
  'pair-formed': 'pop_01',
  'structure-complete': 'success-synthesis',
  'pair-rejected': 'fizzle',
};

export function useSound() {
  const { isMuted, volume } = useGameSettings();
  
  // Track pools of audio instances for each sound effect to support clean polyphonic overlapping
  const poolRef = useRef<Record<string, HTMLAudioElement[]>>({});

  // Pre-load audio assets into client memory when hook initializes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    (Object.keys(SOUND_PATHS) as SoundEffect[]).forEach((effect) => {
      const path = SOUND_PATHS[effect];
      // Only attempt to preload if a file path actually exists
      if (path) {
        const audio = new Audio(path);
        audio.preload = 'auto';
        poolRef.current[effect] = [audio];
      }
    });
  }, []);

  const playSound = useCallback((requestedEffect: SoundEffect) => {
    if (isMuted || typeof window === 'undefined') return;

    // Intercept missing sounds and reroute them to the mapped fallback
    const effect = SOUND_FALLBACK_MAP[requestedEffect] || requestedEffect;

    const path = SOUND_PATHS[effect];
    
    // Safety net in case you request a sound that has no path AND no fallback
    if (!path) {
      console.warn(`[Sound Mock] Missing file and no fallback for: ${requestedEffect}`);
      return;
    }

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