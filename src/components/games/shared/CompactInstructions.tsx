// src/components/games/shared/CompactInstructions.tsx
'use client';

import RichMessage from '@/components/games/shared/RichMessage';
import type { GlossaryEntry } from '@/components/games/shared/GlossaryTerm';
import type { InputMethod } from '@/hooks/useInputMethod';

interface CompactInstructionsProps {
  /** One line naming what the player does. Usually the game's existing lead. */
  lead: string;
  /** At most three. Anything a player can discover by tapping does not belong. */
  bullets: readonly string[];
  /**
   * Only the list for the input the player is using; no tab switcher. Rows
   * are [key, what it does] — typed loosely because `Translated<>` widens a
   * catalogue's tuples to arrays.
   */
  controls?: readonly (readonly string[])[];
  /** Required whenever `controls` is given; a list needs a heading. */
  controlsLabel?: string;
  inputMethod: InputMethod;
  /** Passed through so a term still explains itself if it appears. */
  glossary?: GlossaryEntry[];
}

/**
 * The phone version of a game's instructions, shared by every game so the
 * shape is the same wherever a student lands.
 *
 * What it leaves out, and why: the long intro paragraph (it explains the
 * chemistry, which the first level also does), the bullets beyond the third
 * (each one is a thing the player can find by tapping), the control list for
 * the input they are not using, and the glossary chips (twelve of them, and
 * every term is tappable in the coach line where it actually appears).
 *
 * What it keeps is the part that cannot be discovered: what you are trying to
 * do, and which control does it.
 */
export default function CompactInstructions({
  lead,
  bullets,
  controls,
  controlsLabel,
  inputMethod,
  glossary = [],
}: CompactInstructionsProps) {
  return (
    <div className="space-y-4 text-sm font-medium leading-relaxed text-(--muted)">
      <p className="text-base font-bold text-(--foreground)">{lead}</p>

      <ul className="list-disc space-y-2 pl-5" data-testid="compact-bullets">
        {bullets.slice(0, 3).map((line) => (
          <li key={line}>
            <RichMessage text={line} glossary={glossary} />
          </li>
        ))}
      </ul>

      {controls && controls.length > 0 && (
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-(--muted)">
            {controlsLabel}
          </p>
          <ul className="mt-2 space-y-2" aria-label={controlsLabel}>
          {controls.map((row, index) => {
            const [key, what] = [row[0] ?? '', row[1] ?? ''];
            return (
            <li key={`${key}-${index}`} className="flex items-center gap-3">
              <span
                className={
                  inputMethod === 'pointer'
                    ? 'shrink-0 rounded border border-(--border) bg-(--background) px-2 py-1 font-mono text-xs text-(--foreground)'
                    : 'shrink-0 rounded border border-(--border) bg-(--background) px-2 py-1 text-xs font-bold text-(--foreground)'
                }
              >
                {key}
              </span>
              <RichMessage text={what} glossary={[]} />
              </li>
            );
          })}
          </ul>
        </div>
      )}
    </div>
  );
}
