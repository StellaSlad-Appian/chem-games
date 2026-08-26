'use client';

import CoefficientInput from './CoefficientInput';
import MoleculePreview from './MoleculePreview';

interface ReactionMoleculeCardProps {
  formula: string;
  coefficient: number | '';
  onChange: (value: number | '') => void;
  disabled?: boolean;
}

export default function ReactionMoleculeCard({
  formula,
  coefficient,
  onChange,
  disabled,
}: ReactionMoleculeCardProps) {
  const moleculeCount =
    typeof coefficient === 'number'
      ? coefficient
      : 1;

  return (
    <div className="flex h-[220px] w-32 flex-col rounded-2xl border border-blue-900/60 bg-gradient-to-b from-slate-800 to-blue-950 p-3 shadow-lg shadow-blue-950/15 transition-all duration-200 hover:border-blue-700/70 hover:from-slate-700 hover:to-blue-900 sm:w-36 sm:p-3.5">
      {/* Coefficient area */}
      <div className="shrink-0">
        <CoefficientInput
          formula={formula}
          value={coefficient}
          onChange={onChange}
          disabled={disabled}
        />
      </div>

      {/* Molecule area */}
      <div className="mt-auto">
        <MoleculePreview
          formula={formula}
          count={moleculeCount}
        />
      </div>
    </div>
  );
}