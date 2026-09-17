// src/components/games/GameSettingsModal.tsx
'use client';

import { useEffect } from 'react';
import { X, Volume2, VolumeX, Moon, Sun, LifeBuoy } from 'lucide-react';
import { GameThemeScope, Theme, useGameSettings } from '../../../context/game-settings-context';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useI18n } from '@/i18n/client';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface GameSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId?: GameThemeScope;
  variant?: 'modal' | 'popover'; // <-- Added variant
  /**
   * Shows the per-game Support mode switch (coach panel pinned on at every
   * level). Pass the copy from the game's messages catalogue.
   */
  supportMode?: { label: string; description: string };
}

export default function GameSettingsModal({
  isOpen,
  onClose,
  gameId,
  variant = 'modal', // Default to modal for existing game pages
  supportMode,
}: GameSettingsModalProps) {
  const { t } = useI18n();
  const {
    isMuted,
    volume,
    toggleMute,
    setVolume,
    globalTheme,
    gameThemes,
    setGlobalTheme,
    setGameTheme,
    supportModes,
    setSupportMode,
  } = useGameSettings();
  const isSupportOn = gameId ? supportModes[gameId] === true : false;

  const isSoundEnabled = !isMuted;
  const isModal = variant === 'modal';

  // Escape key support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll (ONLY for modal variant)
  useEffect(() => {
    if (!isOpen || !isModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, isModal]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop: Dark and blurry for modal, invisible click-catcher for popover */}
      <div
        className={
          isModal
            ? "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm"
            : "fixed inset-0 z-40"
        }
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Positioning Wrapper */}
      <div
        className={
          isModal
            ? "fixed inset-0 z-50 flex pointer-events-none items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6 select-none"
            : "absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[26rem] pointer-events-none select-none"
        }
      >
        {/* Shell Container */}
        <div
          className={`relative pointer-events-auto rounded-3xl border-2 border-[var(--game-panel-border)] bg-[var(--game-panel)] shadow-2xl animate-in fade-in zoom-in-95 duration-200 ${
            isModal
              ? "my-auto w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-h-[calc(100dvh-3rem)]"
              : "w-full max-h-[80vh] overflow-y-auto"
          }`}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--game-panel-border)] bg-[var(--game-modal-header)] px-6 py-4 backdrop-blur">
            <h2 className="flex items-center gap-2 text-xl font-black tracking-wide text-[var(--foreground)]">
              ⚙️ {isModal ? t.settings.gameTitle : t.settings.globalTitle}
            </h2>

            <button
              onClick={onClose}
              aria-label={t.settings.closeA11y}
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
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                  <Sun className="h-4 w-4" aria-hidden="true" />
                  {t.settings.appearance}
                </h3>
                {gameId && (
                  <ThemeSelector
                    t={t}
                    label={t.settings.thisGame}
                    value={gameThemes[gameId] ?? 'global'}
                    onChange={(theme) => setGameTheme(gameId, theme)}
                    includeGlobal
                  />
                )}
                <ThemeSelector
                  t={t}
                  label={gameId ? t.settings.allGamesDefault : t.settings.allGames}
                  value={globalTheme}
                  onChange={(theme) => { if (theme !== 'global') setGlobalTheme(theme); }}
                />
                {gameId && (
                  <p className="text-xs leading-relaxed text-[var(--muted)]">
                    {t.settings.overrideHelp}
                  </p>
                )}
              </section>

              {/* LANGUAGE SECTION — games have no NavBar, so this panel is the
                  only way to change language without leaving a game. */}
              <section className="flex flex-col gap-4">
                <LanguageSwitcher variant="panel" />
              </section>

              {/* SUPPORT SECTION (games that opt in) */}
              {gameId && supportMode && (
                <section className="flex flex-col gap-4">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                    <LifeBuoy className="h-4 w-4" aria-hidden="true" />
                    {t.settings.support}
                  </h3>
                  <div className="flex flex-row items-center justify-between gap-4 w-full rounded-2xl border border-[var(--game-panel-border)] bg-[var(--game-modal-row)] px-6 py-4">
                    <div>
                      <span id="support-mode-label" className="block text-sm font-semibold text-[var(--foreground)] select-none">
                        {supportMode.label}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-[var(--muted)]">
                        {supportMode.description}
                      </span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isSupportOn}
                      aria-labelledby="support-mode-label"
                      onClick={() => setSupportMode(gameId, !isSupportOn)}
                      style={{ width: '48px', minWidth: '48px', maxWidth: '48px', height: '28px' }}
                      className={`relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors p-1 outline-none border focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        isSupportOn
                          ? 'bg-[var(--game-success)] border-emerald-600'
                          : 'bg-[var(--game-highlight-surface)] border-[var(--game-highlight-border)]'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full transition-all duration-200 ${
                          isSupportOn ? 'translate-x-5 bg-white shadow-md' : 'translate-x-0 bg-slate-400'
                        }`}
                      />
                    </button>
                  </div>
                </section>
              )}

              {/* AUDIO SECTION */}
              <section className="flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                  <Volume2 className="h-4 w-4" aria-hidden="true" />
                  {t.settings.audio}
                </h3>

                {/* Toggle Row */}
                <div className="flex flex-row items-center justify-between w-full rounded-2xl border border-[var(--game-panel-border)] bg-[var(--game-modal-row)] px-6 py-4">
                  <span className="text-sm font-semibold text-[var(--foreground)] select-none">
                    {t.settings.soundEffects}
                  </span>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={isSoundEnabled}
                    onClick={toggleMute}
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
                    aria-label={t.settings.volumeA11y}
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
    </>
  );
}


function ThemeSelector({ t, label, value, onChange, includeGlobal = false }: { t: Dictionary; label: string; value: Theme | 'global'; onChange: (theme: Theme | 'global') => void; includeGlobal?: boolean }) {
  const choices: Array<{ value: Theme | 'global'; label: string; icon?: typeof Sun }> = [
    ...(includeGlobal ? [{ value: 'global' as const, label: t.settings.useGlobal }] : []),
    { value: 'dark', label: t.settings.dark, icon: Moon },
    { value: 'light', label: t.settings.light, icon: Sun },
  ];

  return <div className="rounded-2xl border border-[var(--game-panel-border)] bg-[var(--game-modal-row)] p-4"><p className="mb-3 text-sm font-semibold text-[var(--foreground)]">{label}</p><div className="flex flex-wrap gap-2">{choices.map((choice) => { const Icon = choice.icon; const selected = value === choice.value; return <button key={choice.value} type="button" onClick={() => onChange(choice.value)} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition ${selected ? 'border-blue-500 bg-blue-500 text-white' : 'border-[var(--game-panel-border)] bg-[var(--surface)] text-[var(--foreground)] hover:brightness-95'}`}>{Icon && <Icon className="h-4 w-4" />}{choice.label}</button>; })}</div></div>;
}
