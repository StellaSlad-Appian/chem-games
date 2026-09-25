// src/components/games/reaction-balancer/CompoundCard.tsx
'use client';

import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import MoleculeText from '@/components/ui/MoleculeText';
import { useBalancerMessages } from '@/i18n/game-messages/reaction-balancer';
import type { Species } from '@/core-engine/utils/balancer-utils';
import ParticleClusters from './ParticleClusters';


interface CompoundCardProps {
  species: Species;
  coefficient: number;
  disabled?: boolean;
  /** Particle clusters under the formula (Levels 1-2 / Support mode). */
  showClusters: boolean;
  /** The tier-3 hint names this card. */
  pulse?: boolean;
  /** Larger hit areas when the primary input is a finger. */
  touch?: boolean;
  onSet: (value: number | '') => { ok: boolean };
  onIncrement: () => void;
  onDecrement: () => void;
  onTapSubscript: () => void;
}

const arrowClass = (touch: boolean) =>
  `flex items-center justify-center rounded-lg border-2 border-(--border) bg-(--surface-2) text-(--foreground) shadow-sm transition-all duration-150 hover:border-(--link) active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link) ${
    touch ? 'h-11 w-full' : 'h-8 w-full'
  }`;

/**
 * One species of the equation: ▲ / ▼, a numeric coefficient, the formula
 * (subscripts locked — tapping explains why) and, on early levels, one
 * particle cluster per molecule. Tab stops once per card (the input); the
 * arrows are for pointer and touch, ↑ / ↓ do the same from the keyboard.
 */
export default function CompoundCard({
  species,
  coefficient,
  disabled = false,
  showClusters,
  pulse = false,
  touch = false,
  onSet,
  onIncrement,
  onDecrement,
  onTapSubscript,
}: CompoundCardProps) {
  const M = useBalancerMessages();
  // What the input shows while the player is typing; null = show the coefficient.
  const [draft, setDraft] = useState<string | null>(null);
  const shown = draft ?? (coefficient === 1 ? '' : String(coefficient));

  const commit = (raw: string) => {
    if (raw === '') {
      setDraft('');
      return;
    }
    const value = /^\d+$/.test(raw) ? parseInt(raw, 10) : '';
    const result = onSet(value);
    setDraft(result.ok ? null : raw);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    commit(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setDraft(null);
      onIncrement();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setDraft(null);
      onDecrement();
    }
  };

  return (
    <div
      data-testid="compound-card"
      data-formula={species.bare}
      data-coefficient={coefficient}
      className={`flex w-28 shrink-0 flex-col items-center gap-1.5 rounded-2xl border-2 border-(--border) bg-(--surface) p-2 shadow-md sm:w-32 ${
        pulse ? 'card-pulse border-(--hint)' : ''
      }`}
    >
      <button
        type="button"
        tabIndex={-1}
        onClick={onIncrement}
        disabled={disabled}
        aria-label={M.card.increase(species.name)}
        className={arrowClass(touch)}
      >
        <ChevronUp className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="flex items-center gap-1">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={shown}
          placeholder="1"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setDraft(null)}
          disabled={disabled}
          aria-label={M.card.coefficient(species.name, species.bare)}
          className="h-10 w-10 rounded-lg border-2 border-(--border-strong) bg-(--surface) text-center text-lg font-black text-(--accent) placeholder:text-(--muted) transition-all focus:border-(--link) focus:outline-none focus:ring-2 focus:ring-(--link)/30 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={onTapSubscript}
          disabled={disabled}
          aria-label={M.card.formulaTap(species.name)}
          className="cursor-pointer rounded-lg px-1 py-1 text-(--foreground) transition hover:bg-(--surface-2) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link) disabled:cursor-not-allowed"
        >
          <MoleculeText formula={species.formula} className="flex-nowrap! whitespace-nowrap text-lg sm:text-xl" />
        </button>
      </div>

      <button
        type="button"
        tabIndex={-1}
        onClick={onDecrement}
        disabled={disabled}
        aria-label={M.card.decrease(species.name)}
        className={arrowClass(touch)}
      >
        <ChevronDown className="h-5 w-5" aria-hidden="true" />
      </button>

      <span className="text-[10px] font-bold text-(--muted)">{species.name}</span>

      {showClusters && (
        <ParticleClusters composition={species.composition} count={coefficient} label={M.card.clusters(coefficient, species.name)} />
      )}
    </div>
  );
}
