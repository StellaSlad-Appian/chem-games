// src/components/games/shared/CoachPanel.tsx
'use client';

import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, MessageCircle, Sparkles, type LucideIcon } from 'lucide-react';

export type CoachTone = 'coach' | 'error' | 'success' | 'guide';

interface CoachPanelProps {
  /** The current message; null hides the strip but keeps the live region mounted. */
  message: string | null;
  /** Short label announced with the message ("Coach", "Not that move"). */
  label: string;
  tone?: CoachTone;
  /** Optional extra controls (Next / Skip) rendered under the text. */
  children?: ReactNode;
  /** Wraps the message text, e.g. to make glossary terms tappable. */
  renderText?: (text: string) => ReactNode;
  /** Screen-reader name of the live region. */
  regionLabel?: string;
  className?: string;
}

const TONES: Record<CoachTone, { border: string; text: string; Icon: LucideIcon }> = {
  coach: { border: 'border-blue-500/50', text: 'text-blue-500', Icon: MessageCircle },
  error: { border: 'border-(--wrong)', text: 'text-(--wrong)', Icon: AlertCircle },
  success: { border: 'border-(--correct)', text: 'text-(--correct)', Icon: CheckCircle2 },
  guide: { border: 'border-amber-500/60', text: 'text-amber-500', Icon: Sparkles },
};

/**
 * A text strip that always says, in words, what to look at or what went
 * wrong. Meaning is carried by the label and the icon as well as the colour.
 * The live region stays mounted while hidden so screen readers hear every
 * change (docs/ACCESSIBILITY.md §6).
 */
export default function CoachPanel({
  message,
  label,
  tone = 'coach',
  children,
  renderText,
  regionLabel = 'Coach messages',
  className = '',
}: CoachPanelProps) {
  const { border, text, Icon } = TONES[tone];

  return (
    <section aria-live="polite" aria-atomic="true" aria-label={regionLabel} className={className} data-testid="coach-panel">
      {message && (
        <div
          data-tone={tone}
          className={`flex items-start gap-3 rounded-2xl border-2 bg-(--surface) p-4 shadow-md ${border}`}
        >
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${text}`} aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className={`text-[10px] font-black uppercase tracking-wider ${text}`}>{label}</p>
            <p className="mt-1 text-sm font-bold leading-relaxed text-(--foreground)">
              {renderText ? renderText(message) : message}
            </p>
            {children && <div className="mt-3 flex flex-wrap gap-2">{children}</div>}
          </div>
        </div>
      )}
    </section>
  );
}
