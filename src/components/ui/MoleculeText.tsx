// src/components/ui/MoleculeText.tsx

import React from 'react';
import type { FormulaToken } from '@/core-engine/types/chemistry';

interface MoleculeTextProps {
  formula: string;
  className?: string;
  subscriptClassName?: string;
  superscriptClassName?: string;
}

/**
 * Deterministically parses a chemical equation/formula string into typed tokens.
 */
function parseFormula(input: string): FormulaToken[] {
  if (!input) return [];

  const tokens: FormulaToken[] = [];
  const terms = input.trim().split(/\s+/);

  terms.forEach((term, index) => {
    if (index > 0) {
      tokens.push({ type: 'text', value: ' ' });
    }

    // Reaction arrows & addition operators
    if (term === '+' || term === '->' || term === '→') {
      tokens.push({
        type: 'operator',
        value: term === '->' ? '→' : term,
      });
      return;
    }

    let i = 0;

    // 1. Extract Leading Stoichiometric Coefficient (e.g., '2' in '2H2O')
    const coeffMatch = term.match(/^(\d+)(?=[A-Za-z\(])/);
    if (coeffMatch) {
      tokens.push({ type: 'coefficient', value: coeffMatch[1] });
      i += coeffMatch[1].length;
    }

    // 2. Parse chemical symbols, states, ionic charges, and subscripts
    while (i < term.length) {
      // Physical state indicators: (s), (l), (g), (aq)
      const stateMatch = term.slice(i).match(/^\((s|l|g|aq)\)/);
      if (stateMatch) {
        tokens.push({ type: 'state', value: stateMatch[0] });
        i += stateMatch[0].length;
        continue;
      }

      // Ionic Charges: e.g., 2+, +, -
      const chargeMatch = term.slice(i).match(/^(\d*[+-])/);
      if (
        chargeMatch &&
        (i + chargeMatch[0].length === term.length ||
          term[i + chargeMatch[0].length] === '(')
      ) {
        tokens.push({ type: 'superscript', value: chargeMatch[0] });
        i += chargeMatch[0].length;
        continue;
      }

      // Atomic Symbols or Brackets: e.g., H, O, Fe, (, )
      const symbolMatch = term.slice(i).match(/^([A-Z][a-z]?|\(|\))/);
      if (symbolMatch) {
        tokens.push({ type: 'symbol', value: symbolMatch[0] });
        i += symbolMatch[0].length;

        // A monatomic ion written as "Ca2+" or "O2-" is one symbol followed by
        // its charge, so the digits are the charge, not a subscript. Polyatomic
        // ions keep their subscripts (NH4+); put a space before a charge that
        // has digits (SO4 2-) so it is not read as a count.
        const symbolStart = i - symbolMatch[0].length;
        const afterCoefficient = coeffMatch ? coeffMatch[1].length : 0;
        if (symbolStart === afterCoefficient && /^\d*[+-]$/.test(term.slice(i))) {
          continue;
        }

        // Subscripts following element or bracket: e.g., H2, (SO4)3
        const subMatch = term.slice(i).match(/^(\d+)/);
        if (subMatch) {
          tokens.push({ type: 'subscript', value: subMatch[1] });
          i += subMatch[1].length;
        }
        continue;
      }

      // Fallback safety
      tokens.push({ type: 'text', value: term[i] });
      i++;
    }
  });

  return tokens;
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
      return <span className="mx-1 font-sans font-black opacity-80">{token.value}</span>;

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
  subscriptClassName = 'text-[0.65em] font-black relative -bottom-[0.1em] leading-none',
  superscriptClassName = 'text-[0.65em] font-black relative -top-[0.35em] leading-none',
}: MoleculeTextProps) {
  if (!formula) return null;

  const groups = clusterTokens(parseFormula(formula));

  return (
    <span className={`inline-flex flex-wrap items-baseline font-mono ${className}`}>
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