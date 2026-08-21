'use client';

interface MoleculePreviewProps {
  formula: string;
  count: number;
}

interface AtomNode {
  element: string;
  x: number;
  y: number;
  radius?: number;
}

interface Bond {
  from: number;
  to: number;
  order?: 1 | 2 | 3;
}

interface MoleculeStructure {
  atoms: AtomNode[];
  bonds: Bond[];
  width?: number;
  height?: number;
}

const elementStyles: Record<
  string,
  {
    fill: string;
    text: string;
    stroke: string;
  }
> = {
  H: {
    fill: '#f1f5f9',
    text: '#0f172a',
    stroke: '#cbd5e1',
  },
  C: {
    fill: '#475569',
    text: '#ffffff',
    stroke: '#94a3b8',
  },
  N: {
    fill: '#3b82f6',
    text: '#ffffff',
    stroke: '#93c5fd',
  },
  O: {
    fill: '#ef4444',
    text: '#ffffff',
    stroke: '#fca5a5',
  },
  S: {
    fill: '#facc15',
    text: '#0f172a',
    stroke: '#fde68a',
  },
  Cl: {
    fill: '#22c55e',
    text: '#ffffff',
    stroke: '#86efac',
  },
  Na: {
    fill: '#a855f7',
    text: '#ffffff',
    stroke: '#d8b4fe',
  },
  K: {
    fill: '#9333ea',
    text: '#ffffff',
    stroke: '#c084fc',
  },
  Mg: {
    fill: '#10b981',
    text: '#ffffff',
    stroke: '#6ee7b7',
  },
  Ca: {
    fill: '#f97316',
    text: '#ffffff',
    stroke: '#fdba74',
  },
  Al: {
    fill: '#94a3b8',
    text: '#0f172a',
    stroke: '#e2e8f0',
  },
  Fe: {
    fill: '#ea580c',
    text: '#ffffff',
    stroke: '#fdba74',
  },
  Cu: {
    fill: '#c2410c',
    text: '#ffffff',
    stroke: '#fb923c',
  },
  Ag: {
    fill: '#cbd5e1',
    text: '#0f172a',
    stroke: '#f8fafc',
  },
  I: {
    fill: '#8b5cf6',
    text: '#ffffff',
    stroke: '#c4b5fd',
  },
  Pb: {
    fill: '#64748b',
    text: '#ffffff',
    stroke: '#cbd5e1',
  },
};

const FALLBACK_STYLE = {
  fill: '#06b6d4',
  text: '#ffffff',
  stroke: '#67e8f9',
};

const MOLECULE_STRUCTURES: Record<
  string,
  MoleculeStructure
> = {
  H2: {
    atoms: [
      { element: 'H', x: 25, y: 30 },
      { element: 'H', x: 55, y: 30 },
    ],
    bonds: [{ from: 0, to: 1 }],
    width: 80,
    height: 60,
  },

  O2: {
    atoms: [
      { element: 'O', x: 25, y: 30 },
      { element: 'O', x: 55, y: 30 },
    ],
    bonds: [{ from: 0, to: 1, order: 2 }],
    width: 80,
    height: 60,
  },

  N2: {
    atoms: [
      { element: 'N', x: 25, y: 30 },
      { element: 'N', x: 55, y: 30 },
    ],
    bonds: [{ from: 0, to: 1, order: 3 }],
    width: 80,
    height: 60,
  },

  Cl2: {
    atoms: [
      { element: 'Cl', x: 22, y: 30 },
      { element: 'Cl', x: 58, y: 30 },
    ],
    bonds: [{ from: 0, to: 1 }],
    width: 80,
    height: 60,
  },

  HCl: {
    atoms: [
      { element: 'H', x: 22, y: 30 },
      { element: 'Cl', x: 58, y: 30 },
    ],
    bonds: [{ from: 0, to: 1 }],
    width: 80,
    height: 60,
  },

  H2O: {
    atoms: [
      { element: 'H', x: 18, y: 16 },
      { element: 'O', x: 40, y: 32, radius: 14 },
      { element: 'H', x: 62, y: 16 },
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
    ],
    width: 80,
    height: 60,
  },

  H2O2: {
    atoms: [
      { element: 'H', x: 10, y: 30 },
      { element: 'O', x: 28, y: 30 },
      { element: 'O', x: 52, y: 30 },
      { element: 'H', x: 70, y: 30 },
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
    ],
    width: 80,
    height: 60,
  },

  CO2: {
    atoms: [
      { element: 'O', x: 14, y: 30 },
      { element: 'C', x: 40, y: 30, radius: 14 },
      { element: 'O', x: 66, y: 30 },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 1, to: 2, order: 2 },
    ],
    width: 80,
    height: 60,
  },

  CH4: {
    atoms: [
      { element: 'C', x: 40, y: 30, radius: 14 },
      { element: 'H', x: 40, y: 8 },
      { element: 'H', x: 40, y: 52 },
      { element: 'H', x: 14, y: 30 },
      { element: 'H', x: 66, y: 30 },
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 0, to: 4 },
    ],
    width: 80,
    height: 60,
  },

  NH3: {
    atoms: [
      { element: 'N', x: 40, y: 30, radius: 14 },
      { element: 'H', x: 40, y: 8 },
      { element: 'H', x: 16, y: 48 },
      { element: 'H', x: 64, y: 48 },
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
    ],
    width: 80,
    height: 60,
  },

  O3: {
    atoms: [
      { element: 'O', x: 15, y: 34 },
      { element: 'O', x: 40, y: 26, radius: 14 },
      { element: 'O', x: 65, y: 34 },
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
    ],
    width: 80,
    height: 60,
  },

  SO2: {
    atoms: [
      { element: 'O', x: 14, y: 34 },
      { element: 'S', x: 40, y: 30, radius: 14 },
      { element: 'O', x: 66, y: 34 },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 1, to: 2, order: 2 },
    ],
    width: 80,
    height: 60,
  },
};

function BondLine({
  from,
  to,
  order = 1,
}: {
  from: AtomNode;
  to: AtomNode;
  order?: 1 | 2 | 3;
}) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(
    dx * dx + dy * dy
  );

  if (length === 0) {
    return null;
  }

  const nx = -dy / length;
  const ny = dx / length;

  const offsets =
    order === 1
      ? [0]
      : order === 2
        ? [-2, 2]
        : [-4, 0, 4];

  const fromRadius = from.radius ?? 10;
  const toRadius = to.radius ?? 10;

  return (
    <>
      {offsets.map((offset, index) => {
        const startX =
          from.x +
          (dx / length) * fromRadius +
          nx * offset;

        const startY =
          from.y +
          (dy / length) * fromRadius +
          ny * offset;

        const endX =
          to.x -
          (dx / length) * toRadius +
          nx * offset;

        const endY =
          to.y -
          (dy / length) * toRadius +
          ny * offset;

        return (
          <line
            key={index}
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        );
      })}
    </>
  );
}

function AtomNodeView({
  atom,
}: {
  atom: AtomNode;
}) {
  const style =
    elementStyles[atom.element] ??
    FALLBACK_STYLE;

  const radius = atom.radius ?? 10;

  return (
    <g>
      <circle
        cx={atom.x}
        cy={atom.y}
        r={radius}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth="1.5"
      />

      <text
        x={atom.x}
        y={atom.y}
        textAnchor="middle"
        dominantBaseline="central"
        fill={style.text}
        fontSize={
          atom.element.length > 1
            ? 6
            : 8
        }
        fontWeight="800"
      >
        {atom.element}
      </text>
    </g>
  );
}

function MoleculeDiagram({
  formula,
}: {
  formula: string;
}) {
  const structure =
    MOLECULE_STRUCTURES[formula];

  if (!structure) {
    return (
      <div className="flex h-12 w-14 items-center justify-center rounded-lg border border-slate-700 bg-slate-950/50">
        <span className="text-xs font-black text-[var(--foreground)]">
          {formula}
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-12 w-14 items-center justify-center rounded-lg border border-slate-700 bg-slate-950/50">
      <svg
        width={54}
        height={42}
        viewBox={`0 0 ${structure.width ?? 80} ${structure.height ?? 60}`}
        role="img"
        aria-label={`${formula} molecule`}
      >
        {structure.bonds.map(
          (bond, index) => (
            <BondLine
              key={index}
              from={structure.atoms[bond.from]}
              to={structure.atoms[bond.to]}
              order={bond.order}
            />
          )
        )}

        {structure.atoms.map(
          (atom, index) => (
            <AtomNodeView
              key={index}
              atom={atom}
            />
          )
        )}
      </svg>
    </div>
  );
}

export default function MoleculePreview({
  formula,
  count,
}: MoleculePreviewProps) {
  const visibleCount = Math.min(
    Math.max(count, 1),
    3
  );

  const remainingCount =
    Math.max(
      count - visibleCount,
      0
    );

  return (
    <div className="w-full">
      <div className="mb-1 text-center text-[8px] font-black uppercase tracking-[0.14em] text-[var(--muted)]">
        Molecule view
      </div>

      <div className="flex h-[64px] items-center justify-center gap-1">
        {Array.from({
          length: visibleCount,
        }).map((_, index) => (
          <MoleculeDiagram
            key={index}
            formula={formula}
          />
        ))}

        {remainingCount > 0 && (
          <span className="text-[8px] font-bold text-[var(--muted)]">
            +{remainingCount}
          </span>
        )}
      </div>
    </div>
  );
}