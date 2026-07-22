// src/components/shared/ChemIcon.tsx
import {
  Shapes,
  TestTube,
  TestTubes,
  Scale,
  Flame,
  Atom,
  Zap,
  FlaskConical,
  Gauge,
  Dna,
  Orbit,
  ShieldAlert,
  Sparkles,
  Timer,
  BookOpen,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';
import type { ChemIconName } from '@/core-engine/types/general';

const ICON_REGISTRY: Record<ChemIconName, LucideIcon> = {
  Shapes,
  TestTube,
  TestTubes,
  Scale,
  Flame,
  Atom,
  Zap,
  FlaskConical,
  Gauge,
  Dna,
  Orbit,
  ShieldAlert,
  Sparkles,
  Timer,
};

interface ChemIconProps extends Omit<LucideProps, 'ref'> {
  name: ChemIconName;
}

/**
 * Reusable server-safe icon component for ChemGames.
 * Fallbacks cleanly to `BookOpen` if an unmapped icon name is passed.
 */
export function ChemIcon({ name, ...props }: ChemIconProps) {
  const IconComponent = ICON_REGISTRY[name] ?? BookOpen;
  return <IconComponent {...props} />;
}