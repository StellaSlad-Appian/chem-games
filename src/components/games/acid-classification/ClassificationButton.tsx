// src/components/games/acid-classification/ClassificationButton.tsx
'use client';

import { LucideIcon } from 'lucide-react';
import { ANSWER_STATUS, AnswerStatus } from '@/src/core-engine/constants/ui-constants';

interface Props {
  label: string;
  icon: LucideIcon;
  accentColor: string; 
  status: AnswerStatus;
  onClick: () => void;
  disabled: boolean;
}

export default function ClassificationButton({ 
  label, icon: Icon, accentColor, status, onClick, disabled 
}: Props) {
  
  // Logic based strictly on ANSWER_STATUS constants
  const getBorderColor = () => {
    switch (status) {
      case ANSWER_STATUS.CORRECT: return 'border-emerald-500';
      case ANSWER_STATUS.WRONG: return 'border-red-500';
      default: return 'border-slate-700';
    }
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all group bg-transparent hover:border-${accentColor} ${getBorderColor()} active:scale-98`}
    >
      <div className={`p-3 rounded-xl mb-2 group-hover:scale-110 transition-transform text-${accentColor}`}>
        <Icon className="w-8 h-8 md:w-10 md:h-10" />
      </div>
      <span className={`font-extrabold text-xs md:text-sm tracking-wider uppercase text-${accentColor}`}>
        {label}
      </span>
    </button>
  );
}