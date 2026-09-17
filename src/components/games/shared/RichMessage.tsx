// src/components/games/shared/RichMessage.tsx
'use client';

import type { ReactNode } from 'react';
import MoleculeText from '@/components/ui/MoleculeText';
import { GlossaryText, type GlossaryEntry } from './GlossaryTerm';

interface RichMessageProps {
  text: string;
  /** Glossary entries to link in the running text (tap-to-explain). */
  glossary?: GlossaryEntry[];
  /** Extra classes for the typeset formulas. */
  formulaClassName?: string;
}

/**
 * Renders a message from a game's catalogue: `backticked` formulas and
 * equations are typeset by MoleculeText (real subscripts, arrows and state
 * symbols, never Unicode), **double-starred** text is bold, and glossary
 * words in the remaining text become tap-to-explain. The convention lets a
 * teacher edit copy in the messages file without touching JSX.
 */
export default function RichMessage({ text, glossary = [], formulaClassName = '' }: RichMessageProps) {
  const parts: ReactNode[] = [];
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*/g;
  let last = 0;
  let key = 0;
  const plain = (segment: string) => {
    if (!segment) return;
    parts.push(
      glossary.length > 0 ? <GlossaryText key={key++} text={segment} glossary={glossary} /> : <span key={key++}>{segment}</span>
    );
  };
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    plain(text.slice(last, index));
    if (match[1] !== undefined) {
      parts.push(<MoleculeText key={key++} formula={match[1]} className={`whitespace-nowrap ${formulaClassName}`} />);
    } else {
      parts.push(
        <strong key={key++} className="text-(--foreground)">
          {match[2]}
        </strong>
      );
    }
    last = index + match[0].length;
  }
  plain(text.slice(last));
  return <>{parts}</>;
}
