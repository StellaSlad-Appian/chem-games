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

export default function MoleculeText({
  formula,
  className = '',
  subscriptClassName = 'text-[0.65em] font-black relative -bottom-[0.1em] leading-none',
  superscriptClassName = 'text-[0.65em] font-black relative -top-[0.35em] leading-none',
}: MoleculeTextProps) {
  if (!formula) return null;

  const parsedTokens = parseFormula(formula);

  return (
    <span className={`inline-flex flex-wrap items-baseline font-mono ${className}`}>
      {parsedTokens.map((token, index) => {
        switch (token.type) {
          case 'coefficient':
            return (
              <span key={index} className="font-bold">
                {token.value}
              </span>
            );

          case 'operator':
            // Full strength, not the old `opacity-80`: the formula is often
            // drawn in --link, and --link at 80% on the page is 3.5:1 — below
            // the 4.5:1 a "+" or "→" needs as text. The font change already
            // sets the operators apart.
            return (
              <span key={index} className="mx-1 font-sans font-black">
                {token.value}
              </span>
            );

          case 'subscript':
            return (
              <sub key={index} className={subscriptClassName}>
                {token.value}
              </sub>
            );

          case 'superscript':
            return (
              <sup key={index} className={superscriptClassName}>
                {token.value}
              </sup>
            );

          case 'state':
            return (
              <span key={index} className="ml-0.5 text-[0.8em] font-normal text-(--muted)">
                {token.value}
              </span>
            );

          default:
            return <span key={index}>{token.value}</span>;
        }
      })}
    </span>
  );
}