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
  },
  atom: { 
    path: "M60 20 C20 20, -10 60, 20 100 C50 140, 100 140, 130 100 C160 60, 100 20, 60 20 Z M60 50 A 20 20 0 1 0 60 90 A 20 20 0 1 0 60 50",
    viewBox: "0 -10 150 160"
  }
};

interface VesselProps {
  type: keyof typeof VESSELS;
  label: string;
  colorClass: string;
  bgHoverClass: string;
  status: 'correct' | 'wrong' | 'idle';
  onClick: () => void;
  disabled: boolean;
}

export default function Vessel({ type, label, colorClass, bgHoverClass, status, onClick, disabled }: VesselProps) {
  const { path, viewBox } = VESSELS[type];

  // Determine dynamic styling based on feedback status
  let containerStyle = bgHoverClass;
  if (status === 'correct') containerStyle = "border-[var(--correct)]";
  if (status === 'wrong')   containerStyle = "border-[var(--wrong)]";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center p-6 md:p-8 rounded-3xl border-2 transition-all group ${status === 'idle' ? bgHoverClass : ''} ${disabled ? 'opacity-90 cursor-default' : 'cursor-pointer active:scale-95 shadow-sm hover:shadow-md'}`}
      style={{
        background: status === 'correct' ? 'var(--chem-neutral-bg)'
                  : status === 'wrong'   ? 'var(--chem-acid-bg)'
                  : 'var(--surface)',
        borderColor: status === 'correct' ? 'var(--correct)'
                  : status === 'wrong'   ? 'var(--wrong)'
                  : undefined
      }}
    >
      <div className={`p-4 md:p-6 rounded-2xl mb-4 transition-transform ${status === 'idle' && !disabled ? 'group-hover:scale-110 group-hover:-translate-y-2' : ''} ${colorClass}`}>
        {/* INCREASED SIZE: from w-8 to w-16 on mobile, and w-24 on desktop */}
        <svg viewBox={viewBox} className="w-16 h-16 md:w-24 md:h-24">
          <path
            d={path}
            className="fill-current opacity-80 stroke-current stroke-[3px]"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* INCREASED TEXT SIZE to match the larger icons */}
      <span className="font-black text-sm md:text-lg tracking-widest uppercase">{label}</span>
    </button>
  );
}