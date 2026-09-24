// src/components/games/GameSettingsModal.tsx
'use client';

import { useEffect } from 'react';
import { X, Volume2, VolumeX, Moon, Sun, LifeBuoy, User, MonitorSmartphone } from 'lucide-react';
import { GameThemeScope, ThemePreference, useGameSettings } from '../../../context/game-settings-context';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { SwitchRow } from '@/components/ui/Switch';
import { useI18n } from '@/i18n/client';
import { formatPercent } from '@/i18n/format';
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
  /**
   * Whether anyone is signed in, which turns on the Account section.
   *
   * Optional and `undefined` by default on purpose: the modal is a client
   * component with no server data, and only `NavBar` knows the answer. When it
   * is absent the section renders nothing rather than guessing — which is also
   * what every in-game use of this modal wants, because a profile link inside
   * a game navigates away mid-run and silently discards it.
   */
  isAuthenticated?: boolean;
}

export default function GameSettingsModal({
  isOpen,
  onClose,
  gameId,
  variant = 'modal', // Default to modal for existing game pages
  supportMode,
  isAuthenticated,
}: GameSettingsModalProps) {
  const { t, locale } = useI18n();
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
                    onChange={(theme) => { if (theme !== 'device') setGameTheme(gameId, theme); }}
                    includeGlobal
                  />
                )}
                {/* The site-wide choice offers Device, the default; a single game
                    offers "Use global" instead, which already follows it. */}
                <ThemeSelector
                  t={t}
                  label={gameId ? t.settings.allGamesDefault : t.settings.allGames}
                  value={globalTheme}
                  onChange={(theme) => { if (theme !== 'global') setGlobalTheme(theme); }}
                  includeDevice
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

              {/*
                ACCOUNT SECTION — the popover only, and only once the header has
                told us whether anyone is signed in.

                Links, not the edit form. Inlining `EditProfileForm` would mean
                the layout fetching the reader's profile on every page in case
                someone opens Settings, and `/profile/edit` also carries
                `AccountDangerZone` — irreversible account deletion — which does
                not belong in a popover that closes when you click outside it.

                Signed out, this shows the way in rather than nothing: a reader
                who opens Settings looking for their account should find the
                door, not an absence.
              */}
              {!isModal && isAuthenticated !== undefined && (
                <section className="flex flex-col gap-4">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                    <User className="h-4 w-4" aria-hidden="true" />
                    {t.settings.account}
                  </h3>
                  <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--game-panel-border)] bg-[var(--game-modal-row)]">
                    {(isAuthenticated
                      ? [
                          { href: '/profile', label: t.nav.profile },
                          { href: '/profile/edit', label: t.profile.edit },
                        ]
                      : [{ href: '/auth', label: t.nav.login }]
                    ).map((link) => (
                      <LocaleLink
                        key={link.href}
                        href={link.href}
                        // Closing on click matters: navigating with the popover
                        // still open leaves it sitting over the destination.
                        onClick={onClose}
                        // min-h-11 is the 44px target docs/ACCESSIBILITY.md asks for.
                        className="flex min-h-11 items-center border-b border-[var(--game-panel-border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition last:border-b-0 hover:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
                      >
                        {link.label}
                      </LocaleLink>
                    ))}
                  </div>
                </section>
              )}

              {/* SUPPORT SECTION (games that opt in) */}
              {gameId && supportMode && (
                <section className="flex flex-col gap-4">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                    <LifeBuoy className="h-4 w-4" aria-hidden="true" />
                    {t.settings.support}
                  </h3>
                  <div className="rounded-2xl border border-[var(--game-panel-border)] bg-[var(--game-modal-row)] px-6 py-1">
                    <SwitchRow
                      label={supportMode.label}
                      description={supportMode.description}
                      checked={isSupportOn}
                      onCheckedChange={(on) => setSupportMode(gameId, on)}
                    />
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
                <div className="rounded-2xl border border-[var(--game-panel-border)] bg-[var(--game-modal-row)] px-6 py-1">
                  <SwitchRow
                    label={t.settings.soundEffects}
                    checked={isSoundEnabled}
                    onCheckedChange={toggleMute}
                  />
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
                    {formatPercent(locale, isMuted ? 0 : Math.round(volume * 100))}
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


function ThemeSelector({ t, label, value, onChange, includeGlobal = false, includeDevice = false }: { t: Dictionary; label: string; value: ThemePreference | 'global'; onChange: (theme: ThemePreference | 'global') => void; includeGlobal?: boolean; includeDevice?: boolean }) {
  const choices: Array<{ value: ThemePreference | 'global'; label: string; icon?: typeof Sun }> = [
    ...(includeGlobal ? [{ value: 'global' as const, label: t.settings.useGlobal }] : []),
    ...(includeDevice ? [{ value: 'device' as const, label: t.settings.device, icon: MonitorSmartphone }] : []),
    { value: 'dark', label: t.settings.dark, icon: Moon },
    { value: 'light', label: t.settings.light, icon: Sun },
  ];

  return <div className="rounded-2xl border border-[var(--game-panel-border)] bg-[var(--game-modal-row)] p-4"><p className="mb-3 text-sm font-semibold text-[var(--foreground)]">{label}</p><div className="flex flex-wrap gap-2">{choices.map((choice) => { const Icon = choice.icon; const selected = value === choice.value; return <button key={choice.value} type="button" onClick={() => onChange(choice.value)} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition ${selected ? 'border-(--link) bg-(--action) text-white' : 'border-[var(--game-panel-border)] bg-[var(--surface)] text-[var(--foreground)] hover:brightness-95'}`}>{Icon && <Icon className="h-4 w-4" />}{choice.label}</button>; })}</div></div>;
}
