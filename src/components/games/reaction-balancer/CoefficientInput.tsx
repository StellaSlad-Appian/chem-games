'use client';

import { ChangeEvent } from 'react';
import MoleculeText from '@/components/ui/MoleculeText';
import { useI18n } from '@/i18n/client';

interface CoefficientInputProps {
  formula: string;
  value: number | '';
  onChange: (val: number | '') => void;
  disabled?: boolean;
}

export default function CoefficientInput({
  formula,
  value,
  onChange,
  disabled,
}: CoefficientInputProps) {
  const { t, f } = useI18n();
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (disabled) {
      return;
    }

    const rawValue = event.target.value;

    // Allow the student to temporarily clear
    // the field while typing.
    if (rawValue === '') {
      onChange('');
      return;
    }

    const numericValue = parseInt(
      rawValue,
      10
    );

    // Coefficients must be whole numbers
    // between 1 and 99.
    if (
      !Number.isNaN(numericValue) &&
      numericValue >= 1 &&
      numericValue <= 99
    ) {
      onChange(numericValue);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">
        {t.games.reactionBalancer.molecules}
      </span>

      <div className="flex w-full items-center justify-center gap-2">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder="1"
          aria-label={f(t.games.reactionBalancer.coefficientA11y, { formula })}
          className="h-10 w-12 rounded-lg border-2 border-slate-600 bg-slate-950 text-center text-lg font-black text-amber-400 placeholder-slate-600 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:w-14 sm:text-xl"
        />

        <MoleculeText
          formula={formula}
          className="text-xl text-[var(--foreground)] sm:text-2xl"
        />
      </div>
    </div>
  );
}