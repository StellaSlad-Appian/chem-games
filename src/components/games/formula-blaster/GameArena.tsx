'use client';

import { AlertCircle, Lightbulb, X } from 'lucide-react';
import BlasterBubble from './BlasterBubble';
import { useI18n } from '@/i18n/client';

export interface BubbleData {
  id: string;
  compoundId: string;
  formula: string;
  chemicalName: string;
  xPos: number;
  speed: number;
  isCorrect: boolean;
  colorClass: string;
}

export interface PositionedError {
  message: string;
  x: number;
  y: number;
}

interface GameArenaProps {
  bubbles: BubbleData[];
  activeHint: string | null;
  activeError: PositionedError | null;
  isPaused: boolean;
  onDismissHint: () => void;
  onBubbleClick: (
    id: string,
    isCorrect: boolean,
    compoundId: string,
    clickCoords: { x: number; y: number }
  ) => void;
  onBubbleExpired: (id: string) => void;
}

export default function GameArena({
  bubbles,
  activeHint,
  activeError,
  isPaused,
  onDismissHint,
  onBubbleClick,
  onBubbleExpired,
}: GameArenaProps) {
  const { t } = useI18n();
  return (
    <div data-testid="blaster-arena" className="relative mt-4 flex-1 w-full h-full rounded-2xl border-2 border-(--border) bg-(--surface)/30 overflow-hidden">
      {activeHint && (
        <div data-testid="blaster-hint" className="absolute top-4 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4">
          <div className="flex items-start justify-between gap-3 rounded-2xl border-2 border-blue-500/40 bg-(--surface) p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-start gap-3">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />

              <div className="space-y-1">
                <h5 className="text-xs font-black uppercase tracking-wider text-(--link)">
                  {t.games.formulaBlaster.hintHeading}
                </h5>

                <p className="text-sm font-bold text-(--foreground)">
                  {activeHint}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onDismissHint}
              className="rounded-lg p-1 text-(--muted) hover:text-(--foreground)"
              aria-label={t.games.shared.dismissHintA11y}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {activeError && (
        <div
          data-testid="blaster-error"
          className="pointer-events-none fixed z-50 -translate-x-1/2 transition-all duration-200"
          style={{
            left: `${activeError.x}px`,
            top: `${activeError.y}px`,
          }}
        >
          <div className="flex items-center gap-2 rounded-xl border-2 border-(--danger)/60 bg-(--surface) px-3 py-2 text-xs font-black text-(--danger) shadow-xl backdrop-blur-md">
            <AlertCircle className="h-4 w-4 shrink-0 text-(--danger)" />
            <span>{activeError.message}</span>
          </div>
        </div>
      )}

      {bubbles.map((bubble) => (
        <BlasterBubble
          key={bubble.id}
          id={bubble.id}
          formula={bubble.formula}
          compoundId={bubble.compoundId}
          xPos={bubble.xPos}
          speed={bubble.speed}
          isCorrect={bubble.isCorrect}
          colorClass={bubble.colorClass}
          isPaused={isPaused}
          onClick={onBubbleClick}
          onExpired={onBubbleExpired}
        />
      ))}
    </div>
  );
}