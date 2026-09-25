// src/components/ui/MoleculeText.tsx

import React from 'react';
import type { FormulaToken } from '@/core-engine/types/chemistry';
import { parseFormula } from './formula-parser';

interface MoleculeTextProps {
  formula: string;
  className?: string;
  /**
   * The typeface. A formula field is monospaced; a formula inside a sentence
   * (ChemText) passes '' so it takes the sentence's own font.
   */
  fontClassName?: string;
  subscriptClassName?: string;
  superscriptClassName?: string;
}

/**
 * Groups the flat token stream so a species never wraps apart from its own
 * state symbol.
 *
 * The container below is `flex flex-wrap`, and every token is its own flex
 * item, so a long equation such as
 * "Al2(SO4)3 (aq) + 3Ba(NO3)2 (aq) -> 2Al(NO3)3 (aq) + 3BaSO4 (s)" could wrap
 * at *any* item boundary — and it is the boundary right before a state symbol
 * that a browser reaches for first, because that is the one place a real
 * space sits between two tokens. That is how "(aq)" ended up alone on a
 * second line, apart from the "2Al(NO3)3" it describes, inside a half-width
 * example card.
 *
 * A state symbol is written as its own term ("BaSO4 (s)"), so every species
 * run ends with a lone space token immediately followed by a `state` token.
 * This groups each run of tokens since the last operator (or the start) —
 * the species — together with that trailing space and state, into one
 * cluster that renders as a single non-wrapping unit. Wrapping can still
 * happen anywhere else: around `+` / `→`, which stay their own single-token
 * clusters exactly as before.
 */
function clusterTokens(tokens: FormulaToken[]): FormulaToken[][] {
  const clusters: FormulaToken[][] = [];
  let current: FormulaToken[] = [];

  const flushCurrent = () => {
    if (current.length > 0) clusters.push(current);
    current = [];
  };

  tokens.forEach((token) => {
    if (token.type === 'operator') {
      flushCurrent();
      clusters.push([token]);
      return;
    }
    current.push(token);
  });
  flushCurrent();

  return clusters;
}

function TokenSpan({
  token,
  subscriptClassName,
  superscriptClassName,
}: {
  token: FormulaToken;
  subscriptClassName: string;
  superscriptClassName: string;
}) {
  switch (token.type) {
    case 'coefficient':
      return <span className="font-bold">{token.value}</span>;

    case 'operator':
      // Full strength, not the old `opacity-80`: the formula is often
      // drawn in --link, and --link at 80% on the page is 3.5:1 — below
      // the 4.5:1 a "+" or "→" needs as text. The font change already
      // sets the operators apart.
      return <span className="mx-1 font-sans font-black">{token.value}</span>;

    case 'subscript':
      return <sub className={subscriptClassName}>{token.value}</sub>;

    case 'superscript':
      return <sup className={superscriptClassName}>{token.value}</sup>;

    case 'state':
      return (
        <span className="ml-0.5 text-[0.8em] font-normal text-(--muted)">{token.value}</span>
      );

    default:
      return <span>{token.value}</span>;
  }
}

export default function MoleculeText({
  formula,
  className = '',
  fontClassName = 'font-mono',
  subscriptClassName = 'text-[0.65em] font-black relative -bottom-[0.1em] leading-none',
  superscriptClassName = 'text-[0.65em] font-black relative -top-[0.35em] leading-none',
}: MoleculeTextProps) {
  if (!formula) return null;

  const groups = clusterTokens(parseFormula(formula));

  return (
    <span className={`inline-flex flex-wrap items-baseline ${fontClassName} ${className}`}>
      {groups.map((group, groupIndex) =>
        group.length === 1 ? (
          <TokenSpan
            key={groupIndex}
            token={group[0]}
            subscriptClassName={subscriptClassName}
            superscriptClassName={superscriptClassName}
          />
        ) : (
          // A whole species (and its trailing state symbol, if any): kept
          // together so the line can never break in the middle of one.
          <span key={groupIndex} className="inline-flex items-baseline">
            {group.map((token, tokenIndex) => (
              <TokenSpan
                key={tokenIndex}
                token={token}
                subscriptClassName={subscriptClassName}
                superscriptClassName={superscriptClassName}
              />
            ))}
          </span>
        )
      )}
    </span>
  );
}