'use client';

import { ChangeEvent } from 'react';
import MoleculeText from '@/components/ui/MoleculeText';

interface CoefficientInputProps {
  formula: string;
  value: number | '';
  onChange: (val: number | '') => void;
  disabled?: boolean;
}

export default function CoefficientInput({ formula, value, onChange, disabled }: CoefficientInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const val = e.target.value;
    
    // Allow clearing the input (treated as 1 mathematically in the parent)
    if (val === '') {
      onChange('');
      return;
    }

    const num = parseInt(val, 10);
    // Prevent negative values or excessively large numbers
    if (!isNaN(num) && num >= 1 && num <= 99) {
      onChange(num);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 rounded-xl border border-[var(--border)] bg-slate-800/20 p-2 sm:p-3 shadow-inner">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder="1"
        className="h-10 w-12 sm:h-12 sm:w-14 rounded-lg border-2 border-slate-600 bg-slate-900 text-center text-lg sm:text-xl font-black text-amber-400 placeholder-slate-600 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
      />
      <MoleculeText formula={formula} className="text-xl sm:text-2xl text-[var(--foreground)]" />
    </div>
  );
}