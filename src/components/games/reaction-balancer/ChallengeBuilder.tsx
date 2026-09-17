// src/components/games/reaction-balancer/ChallengeBuilder.tsx
'use client';

import { useMemo } from 'react';
import { X } from 'lucide-react';
import MoleculeText from '@/components/ui/MoleculeText';
import { REACTION_BALANCER_MESSAGES } from '@/core-engine/config/games/reaction-balancer-messages';
import { findSpecies, type Side, type Species } from '@/core-engine/utils/balancer-utils';
import type { ReactionBalancerGame } from '@/hooks/useReactionBalancer';

const M = REACTION_BALANCER_MESSAGES;

interface ChallengeBuilderProps {
  game: ReactionBalancerGame;
  disabled: boolean;
  touch: boolean;
  onAdd: (bare: string) => void;
}

const sideButton = (active: boolean) =>
  `cursor-pointer rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
    active ? 'bg-blue-500 text-white shadow-sm' : 'text-(--muted) hover:text-(--foreground)'
  }`;

/**
 * Level 5: the word equation, a side switch, the equation as built so far
 * and a tray of compound tiles (the reaction's species plus distractors,
 * alphabetical so the order gives nothing away). Tap-only, no drag.
 */
export default function ChallengeBuilder({ game, disabled, touch, onAdd }: ChallengeBuilderProps) {
  const { round, pickerSide, placedReactants, placedProducts, actions } = game;

  const tiles = useMemo<Species[]>(() => {
    const own = round.parsed.species;
    const extra = round.distractors.map((bare) => findSpecies(bare)).filter((s): s is Species => Boolean(s));
    return [...own, ...extra].sort((a, b) => a.name.localeCompare(b.name));
  }, [round]);

  const placed = (bares: string[], side: Side) =>
    bares.map((bare) => {
      const species = round.parsed.species.find((s) => s.bare === bare);
      if (!species) return null;
      return (
        <span key={bare} className="flex items-center gap-1 rounded-xl border-2 border-(--border) bg-(--surface) px-2 py-1" data-testid="placed-species" data-side={side}>
          <MoleculeText formula={species.formula} className="text-base" />
          <button
            type="button"
            onClick={() => actions.removeSpecies(side, bare)}
            disabled={disabled}
            aria-label={M.challenge.remove(species.name, species.bare)}
            className="cursor-pointer rounded-md p-0.5 text-(--muted) hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </span>
      );
    });

  const placeholder = (side: Side) => (
    <span className="rounded-xl border-2 border-dashed border-(--border) px-2 py-1 text-xs font-bold text-(--muted)">{M.challenge.placeholder(side)}</span>
  );

  return (
    <div className="flex w-full flex-col gap-3" data-testid="challenge-builder">
      <p className="rounded-2xl border-2 border-amber-500/60 bg-(--surface) p-4 text-base font-bold leading-relaxed text-(--foreground)" data-testid="challenge-prompt">
        {M.challenge.prompt(round.reaction.prompt ?? round.reaction.description)}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-(--border) bg-(--background) p-3" aria-label={M.ui.equationLabel(round.reaction.name)} data-testid="built-equation">
        {placedReactants.length > 0 ? placed(placedReactants, 'reactant') : placeholder('reactant')}
        <span className="text-2xl font-black text-blue-500" aria-hidden="true">
          →
        </span>
        {placedProducts.length > 0 ? placed(placedProducts, 'product') : placeholder('product')}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-(--muted)">{M.challenge.sideLabel}</span>
        <div role="group" aria-label={M.challenge.sideLabel} className="flex gap-1 rounded-lg border border-(--border) bg-(--background) p-1">
          <button type="button" aria-pressed={pickerSide === 'reactant'} onClick={() => actions.pickSide('reactant')} disabled={disabled} className={sideButton(pickerSide === 'reactant')}>
            {M.challenge.reactants}
          </button>
          <button type="button" aria-pressed={pickerSide === 'product'} onClick={() => actions.pickSide('product')} disabled={disabled} className={sideButton(pickerSide === 'product')}>
            {M.challenge.products}
          </button>
        </div>
      </div>

      <ul aria-label={M.challenge.pickerLabel} className="grid grid-cols-2 gap-2 sm:grid-cols-3" data-testid="compound-picker">
        {tiles.map((species) => {
          const used = placedReactants.includes(species.bare) || placedProducts.includes(species.bare);
          return (
            <li key={species.bare}>
              <button
                type="button"
                onClick={() => onAdd(species.bare)}
                disabled={disabled || used}
                aria-label={M.challenge.addAs(species.name, species.bare, pickerSide)}
                data-testid="compound-tile"
                data-formula={species.bare}
                className={`flex w-full cursor-pointer flex-col items-center gap-0.5 rounded-xl border-2 border-(--border) bg-(--surface) px-2 text-(--foreground) shadow-sm transition-all duration-150 hover:border-blue-500 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-40 ${
                  touch ? 'min-h-14 py-2' : 'min-h-11 py-1.5'
                }`}
              >
                <MoleculeText formula={species.formula} className="text-base" />
                <span className="text-[10px] font-bold text-(--muted)">{species.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
