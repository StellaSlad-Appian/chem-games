// src/components/ui/MoleculeText.tsx
import React from 'react';

interface MoleculeTextProps {
  formula: string;
  /** Optional wrapper classes for the whole formula (e.g., text-3xl font-bold) */
  className?: string;
  /** Optional override for the numbers (defaults to a relative 0.6em scale) */
  subscriptClassName?: string;
  /** Optional override for superscripts like ionic charges (+ / - / 2+) */
  superscriptClassName?: string;
}

export default function MoleculeText({
  formula,
  className = '',
  subscriptClassName = 'text-[0.65em] font-black relative -bottom-[0.1em] leading-none',
  superscriptClassName = 'text-[0.65em] font-black relative -top-[0.35em] leading-none text-amber-500',
}: MoleculeTextProps) {
  if (!formula) return null;

  // Pattern matches:
  // 1. Ionic charges or superscripts: e.g. 2+, 3-, +, -
  // 2. Subscript numbers: e.g. 2, 3, 12
  // 3. State symbols: e.g. (s), (l), (g), (aq)
  const tokens = formula.split(/(\d+[+-]|[+-]|\d+|\((?:s|l|g|aq)\))/g);

  return (
    <span className={`inline-flex items-baseline font-mono ${className}`}>
      {tokens.map((token, index) => {
        if (!token) return null;

        // Render Ionic Charges / Superscripts (+, -, 2+, etc.)
        if (/^(\d+[+-]|[+-])$/.test(token)) {
          return (
            <sup key={index} className={superscriptClassName}>
              {token}
            </sup>
          );
        }

        // Render Subscript Numbers
        if (/^\d+$/.test(token)) {
          return (
            <sub key={index} className={subscriptClassName}>
              {token}
            </sub>
          );
        }

        // Render State Symbols (s, l, g, aq)
        if (/^\((?:s|l|g|aq)\)$/.test(token)) {
          return (
            <span key={index} className="ml-0.5 text-[0.8em] font-normal text-(--muted)">
              {token}
            </span>
          );
        }

        // Standard Chemical Symbols
        return <span key={index}>{token}</span>;
      })}
    </span>
  );
}