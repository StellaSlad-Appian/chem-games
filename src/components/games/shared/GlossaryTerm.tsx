// src/components/games/shared/GlossaryTerm.tsx
'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

interface GlossaryTermProps {
  /** The glossary entry's display name, e.g. "lone pair". */
  term: string;
  /** One-sentence definition, from the game's messages catalogue. */
  definition: string;
  children?: ReactNode;
}

/**
 * Tap-to-explain vocabulary: a dotted-underline button that opens a small
 * pop-over with the definition. Escape or a click elsewhere closes it.
 */
export function GlossaryTerm({ term, definition, children }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      // Escape belongs to the innermost layer: a pop-over opened on top of the
      // "How to Play" modal must close itself and leave the modal open.
      //
      // Both listen on `window`, and stopPropagation() does nothing to another
      // listener on the *same* EventTarget — that needs
      // stopImmediatePropagation(). On its own that would still come down to
      // which listener was registered first, so this one runs in the capture
      // phase: capture on `window` always precedes bubble on `window`,
      // whatever order the two components mounted in.
      event.stopImmediatePropagation();
      setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <span ref={rootRef} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer rounded-sm border-b-2 border-dotted border-blue-500 font-bold text-(--foreground) transition hover:bg-blue-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        {children ?? term}
      </button>
      {open && (
        <span
          role="tooltip"
          id={id}
          className="absolute left-0 top-full z-30 mt-1 w-64 max-w-[80vw] rounded-xl border-2 border-(--border) bg-(--surface) p-3 text-left text-xs font-medium leading-relaxed text-(--foreground) shadow-xl"
        >
          <span className="block text-[10px] font-black uppercase tracking-wider text-blue-500">{term}</span>
          <span className="mt-1 block">{definition}</span>
        </span>
      )}
    </span>
  );
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  /** Words in running text that open this entry (matched case-insensitively, longest first). */
  matches: string[];
}

/**
 * Wraps the first occurrence of each glossary term in a message with a
 * GlossaryTerm button, so every coach line is tap-to-explain.
 */
export function GlossaryText({ text, glossary }: { text: string; glossary: GlossaryEntry[] }) {
  const patterns = glossary
    .flatMap((entry) => entry.matches.map((match) => ({ entry, match })))
    .sort((a, b) => b.match.length - a.match.length);
  if (patterns.length === 0) return <>{text}</>;

  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b(${patterns.map((p) => escape(p.match)).join('|')})\\b`, 'gi');

  const parts: ReactNode[] = [];
  const seen = new Set<string>();
  let last = 0;
  for (const match of text.matchAll(regex)) {
    const index = match.index ?? 0;
    const found = patterns.find((p) => p.match.toLowerCase() === match[0].toLowerCase());
    if (!found || seen.has(found.entry.term)) continue;
    seen.add(found.entry.term);
    parts.push(text.slice(last, index));
    parts.push(
      <GlossaryTerm key={`${found.entry.term}-${index}`} term={found.entry.term} definition={found.entry.definition}>
        {match[0]}
      </GlossaryTerm>
    );
    last = index + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}
