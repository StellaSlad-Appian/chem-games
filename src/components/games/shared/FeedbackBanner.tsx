// src/components/games/FeedbackBanner.tsx
'use client';

import { useEffect } from 'react';
import { AlertCircle, Lightbulb, X } from 'lucide-react';
import type { GameFeedback } from '@/core-engine/types/general';
import { useI18n } from '@/i18n/client';

interface FeedbackBannerProps {
  /** The current active feedback item (or null if hidden) */
  feedback: GameFeedback | null;
  /** Dismiss callback triggered by timer or user close click */
  onDismiss: () => void;
  /** Optional positioning overrides (defaults to top-center absolute) */
  className?: string;
}

export function FeedbackBanner({
  feedback,
  onDismiss,
  className = 'top-4 left-1/2 -translate-x-1/2',
}: FeedbackBannerProps) {
  const { t } = useI18n();
  const duration = feedback?.duration ?? 4000;

  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [feedback, onDismiss, duration]);

  if (!feedback) return null;

  const isError = feedback.type === 'error';

  return (
    <div
      role="alert"
      className={`absolute z-40 w-full max-w-md px-4 transition-all ${className}`}
    >
      <div
        className={`flex items-start justify-between gap-3 rounded-2xl border-2 p-4 shadow-xl backdrop-blur-md ${
          isError
            ? 'border-rose-500/40 bg-[var(--surface)] text-rose-500'
            : 'border-blue-500/40 bg-[var(--surface)] text-blue-500'
        }`}
      >
        <div className="flex items-start gap-3">
          {isError ? (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
          ) : (
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          )}

          <div className="space-y-1">
            <h5
              className={`text-xs font-black uppercase tracking-wider ${
                isError ? 'text-rose-500' : 'text-blue-500'
              }`}
            >
              {isError ? t.games.shared.reactionError : t.games.shared.labHint}
            </h5>
            <p className="text-sm font-bold leading-relaxed text-(--foreground)">
              {feedback.message}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="rounded-lg p-1 text-(--muted) hover:bg-(--background) hover:text-(--foreground)"
          aria-label={t.games.shared.dismissFeedbackA11y}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}