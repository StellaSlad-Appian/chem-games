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
    <div className="flex h-[220px] w-32 flex-col rounded-2xl border border-slate-700 bg-slate-900/75 p-3 shadow-lg shadow-black/10 transition-all duration-200 hover:border-slate-600 hover:bg-slate-900 sm:w-36 sm:p-3.5">

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