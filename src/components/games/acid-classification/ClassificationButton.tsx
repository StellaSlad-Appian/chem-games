// src/components/games/acid-classification/ClassificationButton.tsx
'use client';

import { LucideIcon } from 'lucide-react';
import { ANSWER_STATUS, AnswerStatus } from '@/src/core-engine/constants/ui-constants';

interface Props {
  label: string;
  icon: any;
  colorVar: string;
  status: AnswerStatus;
  onClick: () => void;
  disabled: boolean;
}

export default function ClassificationButton({ 
  label, icon: Icon, colorVar, status, onClick, disabled 
}: Props) {
  
  // Logic for border color based on status
  const getBorderColor = () => {
    if (status === ANSWER_STATUS.CORRECT) return 'var(--correct)';
    if (status === ANSWER_STATUS.WRONG) return 'var(--wrong)';
    return `var(${colorVar})`; // Default state uses the specific chem color
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 group bg-transparent active:scale-95"
      style={{ 
        borderColor: getBorderColor(),
        color: `var(${colorVar})`
      }}
    >
      <div className="p-3 rounded-xl mb-2 group-hover:scale-110 transition-transform">
        <Icon className="w-8 h-8 md:w-10 md:h-10" />
      </div>
      <span className="font-extrabold text-xs md:text-sm tracking-wider uppercase">
        {label}
      </span>
    </button>
  );
}