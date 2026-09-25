// src/components/games/reaction-balancer/Instructions.tsx
'use client';

import { useMemo } from 'react';
import { GlossaryTerm, type GlossaryEntry } from '@/components/games/shared/GlossaryTerm';
import RichMessage from '@/components/games/shared/RichMessage';
import CompactInstructions from '@/components/games/shared/CompactInstructions';
import { useBalancerMessages, type BalancerMessages } from '@/i18n/game-messages/reaction-balancer';
import type { InputMethod } from '@/hooks/useInputMethod';

/** The tap-to-explain vocabulary, in the reader's language. */
export const balancerGlossary = (M: BalancerMessages): GlossaryEntry[] =>
  Object.entries(M.glossary).map(([term, definition]) => ({
    term,
    definition,
    matches: M.glossaryMatches[term] ?? [term],
  }));

export function useBalancerGlossary(): { M: BalancerMessages; glossary: GlossaryEntry[] } {
  const M = useBalancerMessages();
  return { M, glossary: useMemo(() => balancerGlossary(M), [M]) };
}


/** The phone version: three lines and the controls for the input in use. */
export function BalancerCompactInstructions({ tab }: { tab: InputMethod }) {
  const { M, glossary } = useBalancerGlossary();
  return (
    <CompactInstructions
      lead={M.instructions.lead}
      bullets={M.instructions.compact}
      controls={tab === 'pointer' ? M.instructions.keyboard : M.instructions.touch}
      controlsLabel={tab === 'pointer' ? M.instructions.keyboardTitle : M.instructions.touchTitle}
      inputMethod={tab}
      glossary={glossary}
    />
  );
}

interface InstructionsProps {
  tab: InputMethod;
  onTabChange: (tab: InputMethod) => void;
}

/** The body of the "How to Play" modal — every word comes from the messages catalogue. */
export default function BalancerInstructions({ tab, onTabChange }: InstructionsProps) {
  const { M, glossary } = useBalancerGlossary();
  const kbd = 'rounded bg-(--surface-2) px-2 py-1 font-mono text-xs border border-(--border) text-(--foreground)';
  return (
    <div className="space-y-4 text-sm font-medium leading-relaxed text-(--muted)">
      <p>
        <strong className="text-(--foreground)">{M.instructions.lead}</strong>{' '}
        <RichMessage text={M.instructions.intro} glossary={glossary} />
      </p>

      <ul className="list-disc space-y-2 pl-5">
        {M.instructions.bullets.map((line) => (
          <li key={line}>
            <RichMessage text={line} glossary={glossary} />
          </li>
        ))}
      </ul>

      <p className="italic">{M.instructions.arrow}</p>

      <div className="flex w-fit gap-2 rounded-lg border border-(--border) bg-(--surface-2) p-1" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'pointer'}
          onClick={() => onTabChange('pointer')}
          className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
            tab === 'pointer' ? 'bg-(--surface) text-(--foreground) shadow-sm' : 'text-(--muted)'
          }`}
        >
          {M.instructions.keyboardTitle}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'touch'}
          onClick={() => onTabChange('touch')}
          className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
            tab === 'touch' ? 'bg-(--surface) text-(--foreground) shadow-sm' : 'text-(--muted)'
          }`}
        >
          {M.instructions.touchTitle}
        </button>
      </div>

      {tab === 'pointer' ? (
        <ul className="space-y-2" aria-label={M.instructions.keyboardTitle}>
          {M.instructions.keyboard.map(([key, what]) => (
            <li key={key} className="flex items-center gap-3">
              <kbd className={kbd}>{key}</kbd>
              <span>{what}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-2" aria-label={M.instructions.touchTitle}>
          {M.instructions.touch.map(([action, what], i) => (
            <li key={i} className="flex items-center gap-3">
              <span className={kbd}>{action}</span>
              <span>{what}</span>
            </li>
          ))}
        </ul>
      )}

      <div>
        <p className="text-[10px] font-black uppercase tracking-wider text-(--muted)">{M.instructions.glossaryTitle}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {Object.entries(M.glossary).map(([term, definition]) => (
            <li key={term}>
              <GlossaryTerm term={term} definition={definition} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
