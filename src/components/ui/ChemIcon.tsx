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

const ICON_REGISTRY = {
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
} satisfies Record<string, LucideIcon>;

/**
 * Dynamically inferred from ICON_REGISTRY keys.
 * Adding an icon to ICON_REGISTRY automatically updates this type across the app.
 */
export type ChemIconName = keyof typeof ICON_REGISTRY;

interface ChemIconProps extends Omit<LucideProps, 'ref'> {
  name: ChemIconName;
}

/**
 * Reusable server-safe icon component for Games in Chemistry.
 * Fallbacks cleanly to `BookOpen` if an unmapped icon name is passed.
 */
export function ChemIcon({ name, ...props }: ChemIconProps) {
  const IconComponent = ICON_REGISTRY[name] ?? BookOpen;
  return <IconComponent {...props} />;
}