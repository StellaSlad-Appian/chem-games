// src/components/games/shared/GameInstructionsModal.tsx
'use client';

import React, { useEffect, useId } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '@/i18n/client';
import { useIsCompactScreen } from '@/hooks/useMediaQuery';

interface GameInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /** The full instructions, shown from the `md` breakpoint up. */
  children: React.ReactNode;
  /**
   * A shorter set of instructions for phones — not the same words hidden
   * behind an expander, but its own tighter copy: what the player cannot
   * start without, and nothing else.
   *
   * Optional so a game can be migrated on its own, but every game should have
   * one: 40 lines of scrolling before the first tap is how a student decides
   * the game is not worth it.
   */
  compact?: React.ReactNode;
}

/**
 * The "How to Play" modal, in the shared modal look (docs/STYLE_GUIDE.md §4):
 * --surface panel, --border edge, a header row with the close button, and the
 * site's primary --action button to dismiss. Escape closes it, like the
 * settings modal.
 */
export default function GameInstructionsModal({
  isOpen,
  onClose,
  title,
  children,
  compact,
}: GameInstructionsModalProps) {
  const { t } = useI18n();
  const titleId = useId();
  const isCompactScreen = useIsCompactScreen();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-(--scrim) p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        /* max-w-3xl, not max-w-lg: at 512px the instructions were 40 lines of
           scrolling on a laptop. The prose still caps its own line length. */
        className="my-auto w-full max-w-3xl max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-(--border) pb-4">
          {/* German instruction titles ("Spielanleitung: Reaktions-Balancer")
              are much longer than the English ones, so the wide letter-spacing
              only applies from sm up and the heading may wrap. */}
          <h2
            id={titleId}
            className="text-lg font-black uppercase tracking-wide text-(--foreground) sm:text-xl sm:tracking-widest"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.games.shared.closeInstructionsA11y}
            className="shrink-0 cursor-pointer rounded-xl p-2 text-(--muted) transition-colors hover:bg-(--surface-2) hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
          >
            <X className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
          </button>
        </div>
        {/* One or the other, never both: rendering both and hiding one with
            CSS would read the whole lot twice to a screen reader. */}
        <div className="text-sm">{isCompactScreen && compact ? compact : children}</div>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full cursor-pointer rounded-xl bg-(--action) py-3 text-sm font-black text-white shadow-md transition-colors hover:bg-(--action-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
        >
          {t.games.shared.gotIt}
        </button>
      </div>
    </div>
  );
}
