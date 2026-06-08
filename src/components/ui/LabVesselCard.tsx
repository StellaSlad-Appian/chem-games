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
  className?: string; // For custom absolute orbit positions
}

// 📐 Mapping shapes to layout configurations
const SHAPE_CLASSES: Record<VesselShape, string> = {
  beaker: 'rounded-b-2xl rounded-t-sm',
  flask: 'rounded-[40%_40%_16px_16px/12%_12%_16px_16px]',
  'test-tube': 'rounded-b-full rounded-t-md w-20',
};

// 🎨 Mapping color tokens to Tailwind classes
const COLOR_CLASSES: Record<VesselColor, { border: string; glow: string; liquid: string; text: string }> = {
  purple: {
    border: 'group-hover:border-purple-400/80',
    glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
    liquid: 'bg-purple-600/20 border-purple-400',
    text: 'group-hover:text-purple-300',
  },
  blue: {
    border: 'group-hover:border-blue-400/80',
    glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    liquid: 'bg-blue-600/20 border-blue-400',
    text: 'group-hover:text-blue-300',
  },
  slate: {
    border: 'border-dashed border-slate-800',
    glow: 'shadow-inner',
    liquid: 'bg-slate-900 border-dashed border-slate-800',
    text: 'text-slate-500',
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

  // Wrapper template rendering condition
  const CardContent = () => (
    <div className={`group flex flex-col items-center text-center transition-transform hover:scale-105 duration-300 ${isLocked ? 'opacity-40 select-none' : ''}`}>
      
      {/* 🔮 Vessel Glass Silhouette */}
      <div className={`relative h-44 bg-slate-900/60 border-4 border-slate-700 shadow-xl overflow-hidden flex flex-col justify-end transition-all ${shape === 'test-tube' ? 'w-20' : 'w-36'} ${shapeClass} ${styles.border} ${styles.glow}`}>
        
        {/* Flask Neck Detail Injector */}
        {shape === 'flask' && (
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-10 h-12 border-x-4 border-slate-700/40 ${!isLocked && 'group-hover:border-blue-400/20'}`} />
        )}
        
        {/* Beaker Lip Spout Injector */}
        {shape === 'beaker' && (
          <div className={`absolute top-0 left-0 w-3 h-1 bg-slate-700 -translate-x-0.5 ${!isLocked && 'group-hover:bg-purple-400/80'}`} />
        )}

        {/* 🧪 Chemical Fluid Filling */}
        <div className={`w-full flex flex-col items-center justify-center relative ${shape === 'flask' ? 'h-2/3' : shape === 'beaker' ? 'h-1/2' : 'h-1/4'} border-t-2 ${styles.liquid} ${color === 'purple' ? 'animate-pulse' : ''}`}>
          
          {/* Micro Animation Physics for Active Solution Blasters */}
          {color === 'blue' && !isLocked && (
            <>
              <div className="absolute bottom-2 left-4 w-2 h-2 bg-blue-400/40 rounded-full animate-ping [animation-duration:1.8s]" />
              <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-ping [animation-duration:2.4s]" />
            </>
          )}

          <Icon className={`w-8 h-8 text-${color}-400 group-hover:scale-110 transition-transform duration-300 z-10 ${isLocked ? 'text-slate-600 animate-pulse' : ''}`} />
          
          {liquidLabel && (
            <span className={`text-[10px] uppercase tracking-wider font-extrabold mt-1 z-10 ${isLocked ? 'text-slate-500' : `text-${color}-300`}`}>
              {liquidLabel}
            </span>
          )}
        </div>
      </div>

      {/* 🏷️ Metadata Labels */}
      <div className="mt-3 max-w-[150px]">
        <h2 className={`text-base font-bold text-slate-200 transition-colors ${styles.text}`}>
          {title}
        </h2>
        <p className={`text-[11px] leading-tight mt-0.5 hidden sm:block ${isLocked ? 'text-slate-600' : 'text-slate-500'}`}>
          {description}
        </p>
      </div>
    </div>
  );

  // If locked, render as a static container; if active, render inside a Next.js Link router block
  if (isLocked || !href) {
    return <div className={className}><CardContent /></div>;
  }

  return (
    <Link href={href} className={className}>
      <CardContent />
    </Link>
  );
}