// src/components/ui/MoleculeText.tsx

import React from 'react';

interface MoleculeTextProps {
  formula: string;
  className?: string;
  subscriptClassName?: string;
  superscriptClassName?: string;
}

export default function MoleculeText({
  formula,
  className = '',
  subscriptClassName = 'text-[0.65em] font-black relative -bottom-[0.1em] leading-none',
  superscriptClassName = 'text-[0.65em] font-black relative -top-[0.35em] leading-none',
}: MoleculeTextProps) {
  if (!formula) return null;

  // Pattern breaks tokens into:
  // 1. Reaction symbols: -> or → or " + "
  // 2. State indicators: (s), (l), (g), (aq)
  // 3. Ionic charges: e.g. +, -, 2+, 3-
  // 4. Stoichiometric coefficients (leading numbers before atoms): e.g. '2' in '2H2O'
  // 5. Chemical subscripts: e.g. '2' in 'O2' or '(SO4)2'
  const tokens = formula.split(
    /(->|→|\s+\+\s+|\((?:s|l|g|aq)\)|(?<=[A-Za-z\)])\d*[+-]|^ \d+|^[0-9]+(?=[A-Za-z\(])|(?<=\s)[0-9]+(?=[A-Za-z\(])|\d+)/g
  );

  return (
    <span className={`inline-flex flex-wrap items-baseline font-mono ${className}`}>
      {tokens.map((token, index) => {
        if (!token) return null;

        // Reaction Arrow
        if (token === '->' || token === '→') {
          return (
            <span key={index} className="mx-1.5 font-sans font-black opacity-80">
              →
            </span>
          );
        }

        // Reaction Plus Sign
        if (token.trim() === '+') {
          return (
            <span key={index} className="mx-1 font-sans font-bold opacity-75">
              +
            </span>
          );
        }

        // State Symbols: (s), (l), (g), (aq)
        if (/^\((?:s|l|g|aq)\)$/.test(token)) {
          return (
            <span key={index} className="ml-0.5 text-[0.8em] font-normal opacity-70">
              {token}
            </span>
          );
        }

        // Ionic Charges / Superscripts (e.g., +, -, 2+)
        if (/^\d*[+-]$/.test(token)) {
          return (
            <sup key={index} className={superscriptClassName}>
              {token}
            </sup>
          );
        }

        // Subscript Numbers (e.g., the '2' in 'H2O' or '(SO4)2')
        if (/^\d+$/.test(token)) {
          return (
            <sub key={index} className={subscriptClassName}>
              {token}
            </sub>
          );
        }

        // Standard text, atomic symbols, and leading coefficients (e.g. '2' in '2H2O')
        return <span key={index}>{token}</span>;
      })}
    </span>
  );
}