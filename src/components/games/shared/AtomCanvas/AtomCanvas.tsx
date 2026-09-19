// src/components/games/shared/AtomCanvas/AtomCanvas.tsx
'use client';

import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import type { BondConnection, LewisAtomState, LewisStructure } from '@/core-engine/types/chemistry';
import { bondEnds, countAround, fullCount } from '@/core-engine/utils/lewis-utils';
import { useInputMethod } from '@/hooks/useInputMethod';
import { layoutAtoms } from './layout';

export type AtomCanvasMode = 'build' | 'inspect' | 'countBonds' | 'countLonePairs' | 'readonly';

export interface AtomCanvasLabels {
  /** Element name in the reader's language; the registry's names are English. */
  elementName: (symbol: string) => string;
  atomName: (elementName: string, count: number, full: number) => string;
  counter: (symbol: string, count: number, full: number) => string;
  loner: (elementName: string, index: number, total: number) => string;
  lonePair: (elementName: string, index: number, total: number) => string;
  lonerLabel: string;
  bondName: (a: string, b: string, order: number) => string;
  bondUndo: string;
  bondCount: string;
  counted: string;
  inspectTap: (elementName: string) => string;
}

export interface AtomCanvasProps {
  structure: LewisStructure;
  mode: AtomCanvasMode;
  /** Screen-reader name of the canvas region. */
  label: string;
  labels: AtomCanvasLabels;
  /**
   * Bonds used to place atoms. Pass the target molecule's bonds to pre-place
   * atoms where they will end up; omit to lay out the drawn bonds (atoms start
   * unplaced and slide together as pairs form).
   */
  layoutBonds?: BondConnection[];
  /** Preferred centre atom for the layout. */
  rootAtomId?: string;
  disabled?: boolean;
  /** A small, non-interactive rendering (notebook thumbnails). */
  compact?: boolean;

  // Build mode
  onPair?: (sourceId: string, targetId: string) => void;
  /** Canvas-level rejections: a lone-pair dot or a second loner on the same atom. */
  onReject?: (reason: 'pairedDot' | 'sameAtom', atomId: string) => void;
  onUnpair?: (bondId: string) => void;
  onSelectLoner?: (atomId: string | null) => void;

  // Inspect mode
  onAtomTap?: (atomId: string) => void;
  /** The atom the player has picked as wrong (inspect) — drawn with a marker. */
  markedAtomId?: string | null;

  // Count modes
  selectedBondIds?: string[];
  onToggleBond?: (bondId: string) => void;
  /** Keys of the form `${atomId}:${pairIndex}`. */
  selectedLonePairs?: string[];
  onToggleLonePair?: (atomId: string, pairIndex: number) => void;

  // Highlights (hint tier 3, missed counts)
  highlightAtomIds?: string[];
  highlightBondIds?: string[];
  highlightLonePairs?: string[];

  // Scaffolding
  showCounters?: 'always' | 'hover';
  lonerLabels?: boolean;
  pulseLoners?: boolean;
}

type Side = 'top' | 'right' | 'bottom' | 'left';
const SIDES: Side[] = ['top', 'right', 'bottom', 'left'];

const SIDE_VECTOR: Record<Side, { x: number; y: number; tx: number; ty: number }> = {
  top: { x: 0, y: -1, tx: 1, ty: 0 },
  right: { x: 1, y: 0, tx: 0, ty: 1 },
  bottom: { x: 0, y: 1, tx: 1, ty: 0 },
  left: { x: -1, y: 0, tx: 0, ty: 1 },
};

const PADDING = 44;
const MAX_UNIT = 120;
const MIN_HEIGHT = 240;

export default function AtomCanvas({
  structure,
  mode,
  label,
  labels,
  layoutBonds,
  rootAtomId,
  disabled = false,
  compact = false,
  onPair,
  onReject,
  onUnpair,
  onSelectLoner,
  onAtomTap,
  markedAtomId = null,
  selectedBondIds = [],
  onToggleBond,
  selectedLonePairs = [],
  onToggleLonePair,
  highlightAtomIds = [],
  highlightBondIds = [],
  highlightLonePairs = [],
  showCounters = 'always',
  lonerLabels = false,
  pulseLoners = true,
}: AtomCanvasProps) {
  const inputMethod = useInputMethod();
  const touch = inputMethod === 'touch';
  const interactive = !disabled && !compact && mode !== 'readonly';

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(compact ? 220 : 600);
  // Atoms only slide once the first measured frame has painted; otherwise the
  // jump from the default width to the real one would animate on every mount.
  const [slideReady, setSlideReady] = useState(false);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth || (compact ? 220 : 600));
    update();
    const frame = window.requestAnimationFrame(() => setSlideReady(true));
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    observer?.observe(el);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [compact]);

  // ------------------------------------------------------------ geometry
  const atomSize = compact ? 30 : touch ? 64 : 56;
  const ringRadius = atomSize / 2 + 4;
  const dotOrbit = atomSize / 2 + (compact ? 7 : 13);
  const dotSize = compact ? 6 : touch ? 14 : 12;
  const hit = compact ? 16 : touch ? 44 : 28;

  const layout = useMemo(
    () => layoutAtoms(structure.atoms, layoutBonds ?? structure.bonds, { rootId: rootAtomId }),
    [structure.atoms, structure.bonds, layoutBonds, rootAtomId]
  );

  const padding = compact ? 22 : PADDING;
  // Room above for loners and labels, and below for the text counters.
  const paddingY = compact ? 24 : PADDING + 20;
  // A bond can never be shorter than two dot orbits plus one hit target, or
  // the loners facing each other would share a hit area (they did on phones).
  const minUnit = compact ? 30 : 2 * dotOrbit + hit + 6;
  const unit = useMemo(() => {
    const available = Math.max(0, width - padding * 2);
    const byWidth = layout.width > 0 ? available / layout.width : MAX_UNIT;
    const cap = compact ? 44 : Math.max(MAX_UNIT, minUnit);
    return Math.max(minUnit, Math.min(cap, byWidth));
  }, [width, layout.width, padding, compact, minUnit]);

  const contentWidth = layout.width * unit;
  const contentHeight = layout.height * unit;
  const height = Math.max(compact ? 90 : MIN_HEIGHT, contentHeight + paddingY * 2);
  // Wide molecules on narrow screens scroll inside the canvas rather than shrinking below touch size.
  const innerWidth = Math.max(width, contentWidth + padding * 2);
  const offsetX = (innerWidth - contentWidth) / 2;
  const offsetY = (height - contentHeight) / 2;

  const point = useCallback(
    (id: string) => {
      const p = layout.positions[id] ?? { x: 0, y: 0 };
      return { x: offsetX + p.x * unit, y: offsetY + p.y * unit };
    },
    [layout.positions, offsetX, offsetY, unit]
  );

  // ------------------------------------------------------------ selection state
  // The selection belongs to one structure + mode: when either changes the
  // selection is stale and reads as null, with no effect needed to clear it.
  const [selection, setSelection] = useState<{ structure: LewisStructure; mode: AtomCanvasMode; atomId: string | null }>({
    structure,
    mode,
    atomId: null,
  });
  const selectedAtom = selection.structure === structure && selection.mode === mode ? selection.atomId : null;
  const [activeLoner, setActiveLoner] = useState<Record<string, number>>({});
  const [dragState, setDragState] = useState<{ structure: LewisStructure; sourceId: string; x: number; y: number } | null>(null);
  const drag = dragState && dragState.structure === structure ? dragState : null;
  const setDrag = useCallback(
    (next: { sourceId: string; x: number; y: number } | null) => setDragState(next ? { ...next, structure } : null),
    [structure]
  );
  const pointerSession = useRef<{ atomId: string; startX: number; startY: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const select = useCallback(
    (atomId: string | null) => {
      setSelection({ structure, mode, atomId });
      onSelectLoner?.(atomId);
    },
    [structure, mode, onSelectLoner]
  );

  const activateLoner = useCallback(
    (atomId: string) => {
      if (!interactive || mode !== 'build') return;
      if (selectedAtom === null) {
        select(atomId);
        return;
      }
      if (selectedAtom === atomId) {
        // Tapping a loner on the atom already selected: a second loner on the
        // same atom is not a bond; the same dot again just cancels.
        select(null);
        onReject?.('sameAtom', atomId);
        return;
      }
      const source = selectedAtom;
      select(null);
      onPair?.(source, atomId);
    },
    [interactive, mode, selectedAtom, select, onPair, onReject]
  );

  // ------------------------------------------------------------ pointer drag (build)
  const toLocal = (event: { clientX: number; clientY: number }) => {
    const rect = containerRef.current?.getBoundingClientRect();
    return { x: event.clientX - (rect?.left ?? 0), y: event.clientY - (rect?.top ?? 0) };
  };

  const onLonerPointerDown = (event: ReactPointerEvent<HTMLButtonElement>, atomId: string) => {
    if (!interactive || mode !== 'build') return;
    pointerSession.current = { atomId, startX: event.clientX, startY: event.clientY, moved: false };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onLonerPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const session = pointerSession.current;
    if (!session) return;
    const dx = event.clientX - session.startX;
    const dy = event.clientY - session.startY;
    if (!session.moved && Math.hypot(dx, dy) < 6) return;
    session.moved = true;
    const local = toLocal(event);
    setDrag({ sourceId: session.atomId, x: local.x, y: local.y });
  };

  const onLonerPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const session = pointerSession.current;
    pointerSession.current = null;
    if (!session) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    suppressClick.current = true;
    setDrag(null);
    if (!session.moved) {
      activateLoner(session.atomId);
      return;
    }
    const target = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>('[data-atom-id]');
    const targetId = target?.dataset.atomId;
    select(null);
    if (!targetId) return;
    if (targetId === session.atomId) {
      onReject?.('sameAtom', targetId);
      return;
    }
    onPair?.(session.atomId, targetId);
  };

  const onLonerClick = (atomId: string) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    activateLoner(atomId);
  };

  // ------------------------------------------------------------ keyboard
  const onCanvasKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && selectedAtom !== null) {
      event.preventDefault();
      select(null);
    }
  };

  const onLonerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, atom: LewisAtomState, index: number) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + atom.unpaired) % atom.unpaired;
    setActiveLoner((current) => ({ ...current, [atom.id]: next }));
    const el = containerRef.current?.querySelector<HTMLButtonElement>(
      `[data-atom-id="${atom.id}"] [data-loner-index="${next}"]`
    );
    el?.focus();
  };

  // ------------------------------------------------------------ helpers
  const isHighlighted = (id: string) => highlightAtomIds.includes(id);

  // Sides already carrying a shared pair are taken by the bond line. Loners
  // sit on the free sides that face their future partners, so the pair forms
  // where the loner was; lone pairs take whatever sides remain.
  const sideToward = (from: string, to: string): Side => {
    const a = point(from);
    const b = point(to);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.abs(dx) >= Math.abs(dy) ? (dx >= 0 ? 'right' : 'left') : dy >= 0 ? 'bottom' : 'top';
  };
  const sidesOf = (atomIdToCheck: string, bonds: BondConnection[]): Side[] => {
    const sides: Side[] = [];
    for (const bond of bonds) {
      if (bond.sourceNodeId !== atomIdToCheck && bond.targetNodeId !== atomIdToCheck) continue;
      const side = sideToward(atomIdToCheck, bond.sourceNodeId === atomIdToCheck ? bond.targetNodeId : bond.sourceNodeId);
      if (!sides.includes(side)) sides.push(side);
    }
    return sides;
  };
  const dotSlots = (atom: LewisAtomState) => {
    const bonded = sidesOf(atom.id, structure.bonds);
    const facing = sidesOf(atom.id, layoutBonds ?? structure.bonds).filter((s) => !bonded.includes(s));
    const free = SIDES.filter((s) => !bonded.includes(s));
    const lonerOrder = [...facing, ...free.filter((s) => !facing.includes(s))];
    const slots: Array<{ side: Side; kind: 'pair' | 'loner'; index: number }> = [];
    const used = new Set<Side>();
    // A side with a bond is used only when nothing else is left (a classmate's extra dot on a full atom).
    const takeSide = (preferred: Side[]): Side =>
      preferred.find((s) => !used.has(s)) ?? SIDES.find((s) => !used.has(s)) ?? 'top';
    for (let i = 0; i < atom.unpaired && used.size < 4; i++) {
      const side = takeSide(lonerOrder);
      used.add(side);
      slots.push({ side, kind: 'loner', index: i });
    }
    for (let i = 0; i < atom.lonePairs && used.size < 4; i++) {
      const side = takeSide(free);
      used.add(side);
      slots.push({ side, kind: 'pair', index: i });
    }
    return slots;
  };

  const ringCircumference = 2 * Math.PI * ringRadius;

  return (
    <div className="w-full">
      {/*
        The Level 1 vocabulary scaffold, off from Level 2 (`lonerLabels`).
        It used to be the term stamped beside *every* unpaired dot. That only
        ever worked because each locale invented a short nickname for it: the
        dots sit 50 px apart, giving a label about 44 px, and once the game
        dropped the nicknames on 2026-09-19 the formal term overflowed in all
        six languages at once — 102 px (it) to 134 px (ru) at `text-[9px]`,
        two to three times the gap, printed up to four times around a single
        carbon. Letting it wrap does not save it either: the longest single
        word of the phrase is 51 px (en) to 78 px (ru), still wider than the
        gap.
        So the term is said once, here, next to a sample of the dot it names.
        Nothing is repeated, nothing can collide, and the phrase has no length
        limit in any language.
      */}
      {lonerLabels && !compact && (
        <p
          data-testid="unpaired-legend"
          className="mb-2 flex items-center gap-2 px-1 text-[11px] font-black uppercase tracking-wider text-(--game-glow)"
        >
          <span
            aria-hidden="true"
            className={`inline-block shrink-0 rounded-full border-[3px] border-(--foreground) bg-(--surface) ${
              pulseLoners ? 'loner-pulse' : ''
            }`}
            style={{ width: dotSize, height: dotSize }}
          />
          {labels.lonerLabel}
        </p>
      )}
    <div
      ref={containerRef}
      role="group"
      aria-label={label}
      data-testid="atom-canvas"
      data-mode={mode}
      onKeyDown={onCanvasKeyDown}
      className={`relative w-full select-none overflow-x-auto overflow-y-hidden rounded-2xl border-2 border-(--border) bg-(--surface-2) ${
        compact ? '' : 'shadow-inner'
      }`}
      style={{ height }}
    >
      <div className="relative" style={{ width: innerWidth, height }}>
      {/* Bond lines, rings and the drag rubber band (decorative: the buttons carry the names). */}
      <svg className="pointer-events-none absolute inset-0" width={innerWidth} height={height} aria-hidden="true">
        {structure.bonds.map((bond) => {
          const a = point(bond.sourceNodeId);
          const b = point(bond.targetNodeId);
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.hypot(dx, dy) || 1;
          const ux = dx / len;
          const uy = dy / len;
          const startX = a.x + ux * ringRadius;
          const startY = a.y + uy * ringRadius;
          const endX = b.x - ux * ringRadius;
          const endY = b.y - uy * ringRadius;
          const offsets = bond.order === 1 ? [0] : bond.order === 2 ? [-5, 5] : [-8, 0, 8];
          const selected = selectedBondIds.includes(bond.id);
          const highlighted = highlightBondIds.includes(bond.id);
          const stroke = selected ? 'var(--correct)' : highlighted ? 'var(--game-glow)' : 'var(--foreground)';
          return (
            <g
              key={bond.id}
              data-testid="bond-line"
              data-bond-id={bond.id}
              data-order={bond.order}
              data-source={bond.sourceNodeId}
              data-target={bond.targetNodeId}
            >
              {offsets.map((o) => {
                const px = -uy * o;
                const py = ux * o;
                const mx = (startX + endX) / 2 + px;
                const my = (startY + endY) / 2 + py;
                return (
                  <g key={o}>
                    <line
                      x1={startX + px}
                      y1={startY + py}
                      x2={endX + px}
                      y2={endY + py}
                      stroke={stroke}
                      strokeWidth={compact ? 2 : selected || highlighted ? 4 : 3}
                      strokeLinecap="round"
                    />
                    {/* The shared pair: one electron from each atom, drawn on the line. */}
                    <circle cx={mx - ux * (dotSize / 2 + 1)} cy={my - uy * (dotSize / 2 + 1)} r={dotSize / 2.6} fill={stroke} />
                    <circle cx={mx + ux * (dotSize / 2 + 1)} cy={my + uy * (dotSize / 2 + 1)} r={dotSize / 2.6} fill={stroke} />
                  </g>
                );
              })}
            </g>
          );
        })}

        {structure.atoms.map((atom) => {
          const { x, y } = point(atom.id);
          const count = countAround(structure, atom.id);
          const full = fullCount(atom.element);
          const fraction = Math.min(1, count / full);
          const over = count > full;
          const ring = over ? 'var(--wrong)' : count === full ? 'var(--correct)' : 'var(--game-glow)';
          // The fill ring is the same scaffold as the text counter: shown while
          // counters are always on, hidden once the player is meant to count dots.
          const showRing = showCounters === 'always' && !compact;
          return (
            <g key={atom.id}>
              <circle cx={x} cy={y} r={ringRadius} fill="none" stroke="var(--border)" strokeWidth={3} />
              {showRing && (
                <circle
                  cx={x}
                  cy={y}
                  r={ringRadius}
                  fill="none"
                  stroke={ring}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringCircumference * (1 - fraction)}
                  transform={`rotate(-90 ${x} ${y})`}
                />
              )}
              {(isHighlighted(atom.id) || markedAtomId === atom.id) && (
                <circle
                  cx={x}
                  cy={y}
                  r={ringRadius + 7}
                  fill="none"
                  stroke={markedAtomId === atom.id ? 'var(--wrong)' : 'var(--game-glow)'}
                  strokeWidth={3}
                  strokeDasharray="6 5"
                />
              )}
            </g>
          );
        })}

        {drag && (
          <line
            x1={point(drag.sourceId).x}
            y1={point(drag.sourceId).y}
            x2={drag.x}
            y2={drag.y}
            stroke="var(--game-glow)"
            strokeWidth={3}
            strokeDasharray="6 5"
          />
        )}
      </svg>

      {/* Bond hit areas: undo (build) or count (countBonds). */}
      {(mode === 'build' || mode === 'countBonds') &&
        interactive &&
        structure.bonds.map((bond) => {
          const a = point(bond.sourceNodeId);
          const b = point(bond.targetNodeId);
          const [endA, endB] = bondEnds(structure, bond);
          const nameA = labels.elementName(endA.element);
          const nameB = labels.elementName(endB.element);
          const selected = selectedBondIds.includes(bond.id);
          const action = mode === 'build' ? labels.bondUndo : selected ? labels.counted : labels.bondCount;
          return (
            <button
              key={bond.id}
              type="button"
              data-testid="bond-button"
              data-bond-id={bond.id}
              aria-label={`${labels.bondName(nameA, nameB, bond.order)} — ${action}`}
              aria-pressed={mode === 'countBonds' ? selected : undefined}
              onClick={() => (mode === 'build' ? onUnpair?.(bond.id) : onToggleBond?.(bond.id))}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full transition-all duration-150 hover:bg-(--game-glow)/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:scale-95"
              style={{ left: (a.x + b.x) / 2, top: (a.y + b.y) / 2, width: hit, height: hit }}
            />
          );
        })}

      {/* Atoms */}
      {structure.atoms.map((atom) => {
        const { x, y } = point(atom.id);
        const count = countAround(structure, atom.id);
        const full = fullCount(atom.element);
        const elementName = labels.elementName(atom.element);
        const slots = dotSlots(atom);
        const isSelected = selectedAtom === atom.id;
        const active = activeLoner[atom.id] ?? 0;
        const inspectable = mode === 'inspect' && interactive;
        const AtomTag = inspectable ? 'button' : 'div';

        return (
          <div
            key={atom.id}
            data-testid="atom"
            data-atom-id={atom.id}
            data-element={atom.element}
            data-count={count}
            className={`group absolute -translate-x-1/2 -translate-y-1/2 ${slideReady ? 'atom-move' : ''}`}
            style={{ left: x, top: y, width: atomSize, height: atomSize }}
          >
            <AtomTag
              {...(inspectable
                ? { type: 'button' as const, onClick: () => onAtomTap?.(atom.id), 'aria-pressed': markedAtomId === atom.id }
                : { role: 'group' as const })}
              aria-label={
                inspectable
                  ? `${labels.atomName(elementName, count, full)} — ${labels.inspectTap(elementName)}`
                  : labels.atomName(elementName, count, full)
              }
              className={`flex h-full w-full items-center justify-center rounded-full border-2 bg-(--surface) font-black text-(--foreground) transition-all duration-150 ${
                compact ? 'text-sm' : 'text-2xl'
              } ${isSelected ? 'border-(--game-glow)' : 'border-(--border)'} ${
                inspectable
                  ? 'cursor-pointer hover:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:scale-95'
                  : ''
              }`}
            >
              {atom.element}
            </AtomTag>

            {/* Dots on the four sides (Lewis convention): pairs are filled, loners hollow. */}
            {slots.map((slot) => {
              const v = SIDE_VECTOR[slot.side];
              const cx = atomSize / 2 + v.x * dotOrbit;
              const cy = atomSize / 2 + v.y * dotOrbit;
              if (slot.kind === 'pair') {
                const key = `${atom.id}:${slot.index}`;
                const countable = mode === 'countLonePairs' && interactive;
                const selectedPair = selectedLonePairs.includes(key);
                const highlightedPair = highlightLonePairs.includes(key);
                const colour = selectedPair ? 'bg-(--correct)' : highlightedPair ? 'bg-(--game-glow)' : 'bg-(--foreground)';
                const dots = (
                  <>
                    {[-1, 1].map((s) => (
                      <span
                        key={s}
                        className={`absolute rounded-full ${colour}`}
                        style={{
                          width: dotSize * 0.85,
                          height: dotSize * 0.85,
                          left: hit / 2 + v.tx * s * (dotSize * 0.6) - (dotSize * 0.85) / 2,
                          top: hit / 2 + v.ty * s * (dotSize * 0.6) - (dotSize * 0.85) / 2,
                        }}
                      />
                    ))}
                  </>
                );
                if (!interactive || mode === 'inspect' || mode === 'countBonds' || compact) {
                  return (
                    <span
                      key={key}
                      aria-hidden="true"
                      data-testid="lone-pair"
                      className="absolute"
                      style={{ left: cx - hit / 2, top: cy - hit / 2, width: hit, height: hit }}
                    >
                      {dots}
                    </span>
                  );
                }
                return (
                  <button
                    key={key}
                    type="button"
                    data-testid="lone-pair"
                    data-lone-pair={key}
                    tabIndex={countable ? 0 : -1}
                    aria-label={`${labels.lonePair(elementName, slot.index + 1, atom.lonePairs)}${
                      countable ? ` — ${selectedPair ? labels.counted : labels.bondCount}` : ''
                    }`}
                    aria-pressed={countable ? selectedPair : undefined}
                    onClick={() => (countable ? onToggleLonePair?.(atom.id, slot.index) : onReject?.('pairedDot', atom.id))}
                    className="absolute cursor-pointer rounded-full transition-all duration-150 hover:bg-(--game-glow)/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:scale-95"
                    style={{ left: cx - hit / 2, top: cy - hit / 2, width: hit, height: hit }}
                  >
                    {dots}
                  </button>
                );
              }

              const lonerInteractive = interactive && mode === 'build';
              const glow = isHighlighted(atom.id) || isSelected;
              const dot = (
                <span
                  className={`absolute rounded-full border-[3px] bg-(--surface) ${
                    glow ? 'border-(--game-glow)' : 'border-(--foreground)'
                  } ${pulseLoners && lonerInteractive ? 'loner-pulse' : ''}`}
                  style={{ width: dotSize, height: dotSize, left: hit / 2 - dotSize / 2, top: hit / 2 - dotSize / 2 }}
                />
              );
              if (!lonerInteractive) {
                return (
                  <span
                    key={`loner-${slot.index}`}
                    aria-hidden="true"
                    data-testid="loner"
                    className="absolute"
                    style={{ left: cx - hit / 2, top: cy - hit / 2, width: hit, height: hit }}
                  >
                    {dot}
                  </span>
                );
              }
              return (
                <button
                  key={`loner-${slot.index}`}
                  type="button"
                  data-testid="loner"
                  data-loner-index={slot.index}
                  tabIndex={slot.index === Math.min(active, atom.unpaired - 1) ? 0 : -1}
                  aria-label={labels.loner(elementName, slot.index + 1, atom.unpaired)}
                  aria-pressed={isSelected}
                  onPointerDown={(e) => onLonerPointerDown(e, atom.id)}
                  onPointerMove={onLonerPointerMove}
                  onPointerUp={onLonerPointerUp}
                  onPointerCancel={() => {
                    pointerSession.current = null;
                    setDrag(null);
                  }}
                  onClick={() => onLonerClick(atom.id)}
                  onKeyDown={(e) => onLonerKeyDown(e, atom, slot.index)}
                  className="absolute z-20 cursor-grab touch-none rounded-full transition-all duration-150 hover:bg-(--game-glow)/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:cursor-grabbing"
                  style={{ left: cx - hit / 2, top: cy - hit / 2, width: hit, height: hit }}
                >
                  {dot}
                </button>
              );
            })}

            {/* Text counter: the octet is never colour-only. */}
            {!compact && (
              <span
                aria-hidden="true"
                data-testid="atom-counter"
                className={`absolute left-1/2 whitespace-nowrap rounded-md border border-(--border) bg-(--surface) px-1.5 py-0.5 text-[10px] font-black tracking-wide text-(--muted) transition-opacity ${
                  showCounters === 'always' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
                }`}
                style={{
                  // Clear a dot sitting on the bottom side.
                  top: atomSize + (slots.some((s) => s.side === 'bottom') ? 24 : 12),
                  transform: 'translateX(-50%)',
                }}
              >
                {labels.counter(atom.element, count, full)}
              </span>
            )}
          </div>
        );
      })}
      </div>
    </div>
    </div>
  );
}
