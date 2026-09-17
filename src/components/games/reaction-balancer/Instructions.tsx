// src/components/games/reaction-balancer/Instructions.tsx
'use client';

import { GlossaryTerm, type GlossaryEntry } from '@/components/games/shared/GlossaryTerm';
import RichMessage from '@/components/games/shared/RichMessage';
import { REACTION_BALANCER_MESSAGES } from '@/core-engine/config/games/reaction-balancer-messages';
import type { InputMethod } from '@/hooks/useInputMethod';

const M = REACTION_BALANCER_MESSAGES;

export const BALANCER_GLOSSARY: GlossaryEntry[] = Object.entries(M.glossary).map(([term, definition]) => ({
  term,
  definition,
  matches: M.glossaryMatches[term] ?? [term],
}));

interface InstructionsProps {
  tab: InputMethod;
  onTabChange: (tab: InputMethod) => void;
}

/** The body of the "How to Play" modal — every word comes from the messages catalogue. */
export default function BalancerInstructions({ tab, onTabChange }: InstructionsProps) {
  const kbd = 'rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border) text-(--foreground)';
  return (
    <div className="space-y-4 text-sm font-medium leading-relaxed text-(--muted)">
      <p>
        <strong className="text-(--foreground)">{M.instructions.lead}</strong>{' '}
        <RichMessage text={M.instructions.intro} glossary={BALANCER_GLOSSARY} />
      </p>

      <ul className="list-disc space-y-2 pl-5">
        {M.instructions.bullets.map((line) => (
          <li key={line}>
            <RichMessage text={line} glossary={BALANCER_GLOSSARY} />
          </li>
        ))}
      </ul>

      <p className="italic">{M.instructions.arrow}</p>

      <div className="flex w-fit gap-2 rounded-lg border border-(--border) bg-(--background) p-1" role="tablist">
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
