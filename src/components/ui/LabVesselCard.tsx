// src/components/ui/LabVesselCard.tsx
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

export type VesselShape = 'beaker' | 'flask' | 'test-tube';
export type VesselColor = 'purple' | 'blue' | 'slate';

interface LabVesselCardProps {
  href?: string;
  title: string;
  description: string;
  liquidLabel?: string;
  shape: VesselShape;
  color: VesselColor;
  icon: LucideIcon;
  isLocked?: boolean;
  className?: string;
}

// 📐 Mapping shapes to layout configurations
const SHAPE_CLASSES: Record<VesselShape, string> = {
  beaker: 'rounded-b-2xl rounded-t-sm',
  flask: 'rounded-[40%_40%_12px_12px/12%_12%_12px_12px]',
  'test-tube': 'rounded-b-full rounded-t-md',
};

// 🎨 Mapping color tokens to Tailwind classes (Fixed dynamic string bug by declaring text colors here)
const COLOR_CLASSES: Record<VesselColor, { border: string; glow: string; liquid: string; text: string; icon: string; label: string }> = {
  purple: {
    border: 'group-hover:border-purple-400/80',
    glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
    liquid: 'bg-purple-600/20 border-purple-400',
    text: 'group-hover:text-purple-300',
    icon: 'text-purple-400',
    label: 'text-purple-300',
  },
  blue: {
    border: 'group-hover:border-blue-400/80',
    glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    liquid: 'bg-blue-600/20 border-blue-400',
    text: 'group-hover:text-blue-300',
    icon: 'text-blue-400',
    label: 'text-blue-300',
  },
  slate: {
    border: 'border-dashed border-slate-800',
    glow: 'shadow-inner',
    liquid: 'bg-slate-900 border-dashed border-slate-800',
    text: 'text-slate-500',
    icon: 'text-slate-600',
    label: 'text-slate-500',
  },
};

export default function LabVesselCard({
  href,
  title,
  description,
  liquidLabel,
  shape,
  color,
  icon: Icon,
  isLocked = false,
  className = '',
}: LabVesselCardProps) {
  const styles = COLOR_CLASSES[color];
  const shapeClass = SHAPE_CLASSES[shape];

  // A JSX value, not a component. Declaring a component inside render gives it
  // a new identity every render, so React unmounts and remounts the whole
  // subtree each time — `react-hooks/static-components` is flagging a real
  // remount, not a style preference. It closes over the props above, so
  // hoisting it to module scope would mean threading all nine through.
  const cardContent = (
    <div className={`group flex flex-col items-center text-center transition-transform hover:scale-105 duration-300 ${isLocked ? 'opacity-40 select-none' : ''}`}>
      
      {/* 🔮 Vessel Glass Silhouette - Downsized down to roughly 75-80% (h-44 -> h-34, w-36 -> w-28, w-20 -> w-16) */}
      <div className={`relative h-34 bg-slate-900/60 border-4 border-slate-700 shadow-xl overflow-hidden flex flex-col justify-end transition-all ${shape === 'test-tube' ? 'w-16' : 'w-28'} ${shapeClass} ${styles.border} ${styles.glow}`}>
        
        {/* Flask Neck Detail Injector - Scaled layout down to match new aspect ratio */}
        {shape === 'flask' && (
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 border-x-4 border-slate-700/40 transition-colors ${!isLocked && 'group-hover:border-blue-400/20'}`} />
        )}
        
        {/* Beaker Lip Spout Injector */}
        {shape === 'beaker' && (
          <div className={`absolute top-0 left-0 w-2.5 h-1 bg-slate-700 -translate-x-0.5 ${!isLocked && 'group-hover:bg-purple-400/80'}`} />
        )}

        {/* 🧪 Chemical Fluid Filling - Hardcoded to default 85% with an easy transition hook for later state features */}
        <div className={`w-full flex flex-col items-center justify-center relative h-[85%] border-t-2 pt-3 transition-all duration-500 ease-out ${styles.liquid} ${color === 'purple' ? 'animate-pulse' : ''}`}>
          
          {/* Micro Animation Physics for Active Solution Blasters */}
          {color === 'blue' && !isLocked && (
            <>
              <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-ping [animation-duration:1.8s]" />
              <div className="absolute bottom-5 right-4 w-1 h-1 bg-blue-300/50 rounded-full animate-ping [animation-duration:2.4s]" />
            </>
          )}

          <Icon className={`w-7 h-7 group-hover:scale-110 transition-transform duration-300 z-10 ${isLocked ? 'text-slate-600 animate-pulse' : styles.icon}`} />
          
          {liquidLabel && (
            <span className={`text-[9px] uppercase tracking-wider font-extrabold mt-1 z-10 truncate max-w-full px-1 lines-1 ${isLocked ? 'text-slate-500' : styles.label}`}>
              {liquidLabel}
            </span>
          )}
        </div>
      </div>

      {/* 🏷️ Metadata Labels */}
      <div className="mt-2.5 max-w-[140px]">
        <h2 className={`text-sm font-bold text-slate-200 transition-colors ${styles.text}`}>
          {title}
        </h2>
        <p className={`text-[10px] leading-tight mt-0.5 hidden sm:block ${isLocked ? 'text-slate-600' : 'text-slate-500'}`}>
          {description}
        </p>
      </div>
    </div>
  );

  if (isLocked || !href) {
    return <div className={className}>{cardContent}</div>;
  }

  return (
    <Link href={href} className={className}>
      {cardContent}
    </Link>
  );
}