// src/components/games/GameSettingsModal.tsx
'use client';

import { useEffect } from 'react';
import { X, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { GameThemeScope, Theme, useGameSettings } from '../../../context/game-settings-context';

interface GameSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId?: GameThemeScope;
}

export default function GameSettingsModal({
  isOpen,
  onClose,
  gameId,
}: GameSettingsModalProps) {
  const {
    isMuted,
    volume,
    toggleMute,
    setVolume,
    globalTheme,
    gameThemes,
    setGlobalTheme,
    setGameTheme,
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
        <div className="flex items-center justify-between border-b border-[var(--game-panel-border)] bg-[var(--game-modal-header)] px-6 py-4">
          <h2 className="flex items-center gap-2 text-xl font-black tracking-wide text-[var(--foreground)]">
            ⚙️ Game Settings
          </h2>

          <button
            onClick={onClose}
            className="shrink-0 rounded-xl bg-[var(--game-modal-control)] p-2 text-[var(--muted)] transition-colors hover:brightness-90 hover:text-[var(--foreground)] active:scale-95"
          >
            <X className="h-5 w-5" strokeWidth={3} />
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="p-8">
          <div className="mx-auto flex w-full max-w-md flex-col gap-8">

            {/* APPEARANCE SECTION */}
            <section className="flex flex-col gap-4">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]"><Sun className="h-4 w-4" />Appearance</h3>
              {gameId && <ThemeSelector label="This game" value={gameThemes[gameId] ?? 'global'} onChange={(theme) => setGameTheme(gameId, theme)} includeGlobal />}
              <ThemeSelector label={gameId ? 'All games default' : 'All games'} value={globalTheme} onChange={(theme) => { if (theme !== 'global') setGlobalTheme(theme); }} />
              {gameId && <p className="text-xs leading-relaxed text-[var(--muted)]">A game-specific choice overrides the all-games default. Choose “Use global” to follow it again.</p>}
            </section>

            {/* AUDIO SECTION */}
            <section className="flex flex-col gap-4">

              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                <Volume2 className="h-4 w-4" />
                Audio
              </h3>

              {/* Toggle Row */}
              <div className="flex flex-row items-center justify-between w-full rounded-2xl border border-[var(--game-panel-border)] bg-[var(--game-modal-row)] px-6 py-4">
                  
                  {/* Left Side: Label Text */}
                  <span className="text-sm font-semibold text-[var(--foreground)] select-none">
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
                        ? 'bg-(--game-success) border-emerald-600' 
                        : 'bg-(--game-highlight-surface) border-(--game-highlight-border)'
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
              <div className="flex items-center gap-4 rounded-2xl border border-[var(--game-panel-border)] bg-[var(--game-modal-row)] px-6 py-4">

                <div className="shrink-0">
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5 text-[var(--muted)]" />
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
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[var(--game-modal-control)] accent-emerald-500"
                />

                <span className="w-10 shrink-0 text-right text-xs font-bold text-[var(--muted)]">
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

function ThemeSelector({ label, value, onChange, includeGlobal = false }: { label: string; value: Theme | 'global'; onChange: (theme: Theme | 'global') => void; includeGlobal?: boolean }) {
  const choices: Array<{ value: Theme | 'global'; label: string; icon?: typeof Sun }> = [
    ...(includeGlobal ? [{ value: 'global' as const, label: 'Use global' }] : []),
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'light', label: 'Light', icon: Sun },
  ];

  return <div className="rounded-2xl border border-[var(--game-panel-border)] bg-[var(--game-modal-row)] p-4"><p className="mb-3 text-sm font-semibold text-[var(--foreground)]">{label}</p><div className="flex flex-wrap gap-2">{choices.map((choice) => { const Icon = choice.icon; const selected = value === choice.value; return <button key={choice.value} type="button" onClick={() => onChange(choice.value)} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition ${selected ? 'border-blue-500 bg-blue-500 text-white' : 'border-[var(--game-panel-border)] bg-[var(--surface)] text-[var(--foreground)] hover:brightness-95'}`}>{Icon && <Icon className="h-4 w-4" />}{choice.label}</button>; })}</div></div>;
}
