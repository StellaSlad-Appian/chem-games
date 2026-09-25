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
  /**
   * Screen-reader name of the live region. Required, not defaulted: an English
   * default here would be invisible on a German page, because nothing renders
   * it and no test reads it.
   */
  regionLabel: string;
  className?: string;
}

// Each tone is a tinted fill as well as a coloured edge, so the strip reads as
// a note laid on the card rather than another card. The tone's text colour
// clears 4.5:1 on its own tint in both themes (see the -surface tokens).
const TONES: Record<CoachTone, { border: string; fill: string; text: string; Icon: LucideIcon }> = {
  coach: { border: 'border-(--link)/50', fill: 'bg-(--info-surface)', text: 'text-(--link)', Icon: MessageCircle },
  error: { border: 'border-(--wrong)', fill: 'bg-(--danger-surface)', text: 'text-(--wrong)', Icon: AlertCircle },
  success: { border: 'border-(--correct)', fill: 'bg-(--success-surface)', text: 'text-(--correct)', Icon: CheckCircle2 },
  guide: { border: 'border-(--hint)/60', fill: 'bg-(--hint-surface)', text: 'text-(--hint)', Icon: Sparkles },
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
  regionLabel,
  className = '',
}: CoachPanelProps) {
  const { border, fill, text, Icon } = TONES[tone];

  return (
    <section aria-live="polite" aria-atomic="true" aria-label={regionLabel} className={className} data-testid="coach-panel">
      {message && (
        <div
          data-tone={tone}
          className={`flex items-start gap-3 rounded-2xl border-2 p-4 shadow-md ${fill} ${border}`}
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
