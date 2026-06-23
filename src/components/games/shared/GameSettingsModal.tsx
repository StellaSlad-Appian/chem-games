// src/components/games/GameSettingsModal.tsx
'use client';

import { useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';
import { useGameSettings } from '../../../context/game-settings-context';

interface GameSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameSettingsModal({
  isOpen,
  onClose,
}: GameSettingsModalProps) {
  const {
    isMuted,
    volume,
    toggleMute,
    setVolume,
  } = useGameSettings();

  const isSoundEnabled = !isMuted;

  // Escape key support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Shell */}
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-[var(--game-panel-border)] bg-[var(--game-panel)] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--game-panel-border)] bg-slate-800/30 px-6 py-4">
          <h2 className="flex items-center gap-2 text-xl font-black tracking-wide text-slate-100">
            ⚙️ Game Settings
          </h2>

          <button
            onClick={onClose}
            className="shrink-0 rounded-xl bg-slate-800/50 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white active:scale-95"
          >
            <X className="h-5 w-5" strokeWidth={3} />
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="p-8">
          <div className="mx-auto flex w-full max-w-md flex-col gap-8">

            {/* AUDIO SECTION */}
            <section className="flex flex-col gap-4">

              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <Volume2 className="h-4 w-4" />
                Audio
              </h3>

              {/* Toggle Row */}
              <div className="flex flex-row items-center justify-between w-full rounded-2xl border border-[var(--game-panel-border)] bg-slate-950/40 px-6 py-4">
                  
                  {/* Left Side: Label Text */}
                  <span className="text-sm font-semibold text-slate-200 select-none">
                    Sound Effects
                  </span>

                  {/* Right Side: Small, Pinned Pill Toggle */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isSoundEnabled}
                    onClick={toggleMute}
                    // Hardcoded safety styles override any broken CSS compiler or global broad resets
                    style={{ width: '48px', minWidth: '48px', maxWidth: '48px', height: '28px' }}
                    className={`relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors p-1 outline-none border focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      isSoundEnabled 
                        ? 'bg-[var(--game-success)] border-emerald-600' 
                        : 'bg-[var(--game-highlight-surface)] border-[var(--game-highlight-border)]'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full transition-all duration-200 ${
                        isSoundEnabled 
                          ? 'translate-x-5 bg-white shadow-md' 
                          : 'translate-x-0 bg-slate-400'
                      }`}
                    />
                  </button>
                  
                </div>

              {/* Volume Row */}
              <div className="flex items-center gap-4 rounded-2xl border border-[var(--game-panel-border)] bg-slate-950/40 px-6 py-4">

                <div className="shrink-0">
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5 text-slate-500" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-emerald-400" />
                  )}
                </div>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-emerald-500"
                />

                <span className="w-10 shrink-0 text-right text-xs font-bold text-slate-400">
                  {isMuted ? 0 : Math.round(volume * 100)}%
                </span>
              </div>

            </section>

          </div>
        </div>
      </div>
    </div>
  );
}