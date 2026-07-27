// src/components/games/acid-classification/Vessel.tsx
import React from 'react';

const VESSELS = {
  flask: { 
    path: "M40 140 L20 100 C-10 60, 20 20, 60 20 C100 20, 130 60, 100 100 L80 140 Z M60 20 L60 0",
    viewBox: "0 0 120 150"
  },
  beaker: { 
    path: "M20 20 L20 130 C20 140, 30 140, 40 140 L100 140 C110 140, 120 140, 120 130 L120 20 Z M10 20 L130 20",
    viewBox: "0 0 140 150"
  },
  droplet: { 
    path: "M60 10 C60 10, 10 70, 10 100 C10 130, 30 150, 60 150 C90 150, 110 130, 110 100 C110 70, 60 10, 60 10 Z",
    viewBox: "0 0 120 160"
  }
};

interface VesselProps {
  type: keyof typeof VESSELS;
  label: string;
  colorClass: string;
  status: 'idle' | 'correct' | 'wrong';
  onClick: () => void;
  disabled: boolean;
}

export default function Vessel({ type, label, colorClass, status, onClick, disabled }: VesselProps) {
  const { path, viewBox } = VESSELS[type];

  let statusClass = '';
  if (status === 'correct') statusClass = 'chem-btn-correct';
  if (status === 'wrong') statusClass = 'chem-btn-wrong';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`chem-btn group disabled:cursor-default ${statusClass}`}
    >
      <div className={`mb-2 p-2 transition-transform duration-300 md:mb-4 ${status === 'idle' && !disabled ? 'group-hover:-translate-y-1 group-hover:scale-110' : ''} ${colorClass}`}>
        <svg viewBox={viewBox} className="h-16 w-16 md:h-24 md:w-24">
          <path
            d={path}
            className="fill-current stroke-current stroke-[3px] opacity-80"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="chem-btn-label">
        {label}
      </span>
    </button>
  );
}