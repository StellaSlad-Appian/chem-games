// src/components/ui/MoleculeText.tsx
import React from 'react';

interface MoleculeTextProps {
  formula: string;
  /** Optional wrapper classes for the whole formula (e.g., text-3xl font-bold) */
  className?: string;
  /** Optional override for the numbers (defaults to a relative 0.6em scale) */
  subscriptClassName?: string;
}

export default function MoleculeText({
  formula,
  className = "",
  subscriptClassName = "text-[0.6em] font-black align-baseline relative -bottom-[0.05em] opacity-95 leading-none"
}: MoleculeTextProps) {
  
  if (!formula) return null;

  return (
    <span className={className}>
      {formula.split(/(\d+)/).map((part, index) => {
        // If the chunk is a number, render it as a styled subscript
        if (!isNaN(Number(part)) && part !== "") {
          return (
            <sub key={index} className={subscriptClassName}>
              {part}
            </sub>
          );
        }
        // Otherwise, render the standard letters
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}