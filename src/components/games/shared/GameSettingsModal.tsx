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
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-slate-700 bg-slate-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-800/50 px-6 py-4">
          <h2 className="flex items-center gap-2 text-xl font-black tracking-wide text-slate-100">
            ⚙️ Game Settings
          </h2>

          <button
            onClick={onClose}
            className="shrink-0 rounded-xl bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white active:scale-95"
          >
            <X className="h-5 w-5" strokeWidth={3} />
          </button>
        </div>

        {/* CONTENT WRAPPER (NEW — improves layout consistency) */}
        <div className="p-8">
          <div className="mx-auto flex w-full max-w-md flex-col gap-8">

            {/* AUDIO SECTION */}
            <section className="flex flex-col gap-4">

              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <Volume2 className="h-4 w-4" />
                Audio
              </h3>

              {/* Toggle Row */}
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 px-6 py-4">
                <span className="text-sm font-semibold text-slate-200">
                  Sound Effects
                </span>

                <button
                  onClick={toggleMute}
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
                    isMuted ? 'bg-slate-700' : 'bg-emerald-500'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                      isMuted ? 'translate-x-1' : 'translate-x-6'
                    }`}
                  />
                </button>
              </div>

              {/* Volume Row */}
              <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 px-6 py-4">

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