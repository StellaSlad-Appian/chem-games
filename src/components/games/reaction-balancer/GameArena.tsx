// src/components/games/reaction-balancer/GameArena.tsx
'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Lightbulb, X } from 'lucide-react';
import CoachPanel from '@/components/games/shared/CoachPanel';
import RichMessage from '@/components/games/shared/RichMessage';
import MoleculeText from '@/components/ui/MoleculeText';
import { REACTION_BALANCER_CONFIG } from '@/core-engine/config/games/reaction-balancer-config';
import type { ReactionBalancerGame } from '@/hooks/useReactionBalancer';
import { useInputMethod } from '@/hooks/useInputMethod';
import { useSound } from '@/hooks/useSound';
import AtomLedger from './AtomLedger';
import ChallengeBuilder from './ChallengeBuilder';
import CompoundCard from './CompoundCard';
import { useBalancerGlossary } from './Instructions';
import MassBeam from './MassBeam';

const CFG = REACTION_BALANCER_CONFIG;

interface GameArenaProps {
  game: ReactionBalancerGame;
  isPaused: boolean;
}

const buttonClass =
  'cursor-pointer rounded-xl bg-(--action) px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all duration-150 hover:bg-(--action-hover) active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link) disabled:cursor-not-allowed disabled:opacity-50';
const ghostClass =
  'cursor-pointer rounded-xl border-2 border-(--border) bg-(--surface-2) px-4 py-3 text-xs font-black uppercase tracking-wider text-(--foreground) shadow-sm transition-all duration-150 hover:border-(--link) active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link) disabled:cursor-not-allowed disabled:opacity-50';

/**
 * Presentational: the equation as cards, the ledger, the mass beam, the
 * coach strip and the hint ladder. All rules live in useReactionBalancer.
 */
export default function ReactionBalancerArena({ game, isPaused }: GameArenaProps) {
  const { M, glossary } = useBalancerGlossary();
  const { playSound } = useSound();
  const touch = useInputMethod() === 'touch';
  const { round, parsed, coefficients, phase, coach, hint, actions, scaffold } = game;
  const disabled = isPaused || phase === 'done';
  const richText = useCallback((text: string) => <RichMessage text={text} glossary={glossary} />, [glossary]);

  const onSet = useCallback(
    (index: number, value: number | '') => {
      const result = actions.setCoefficient(index, value);
      if (!result.ok) {
        if (result.reason !== 'paused') playSound('equation-error');
        return { ok: false };
      }
      playSound(result.locked ? 'equation-balanced' : 'coefficient-tick');
      return { ok: true };
    },
    [actions, playSound]
  );
  const onIncrement = useCallback((index: number) => onSet(index, (coefficients[index] ?? 1) + 1), [onSet, coefficients]);
  const onDecrement = useCallback((index: number) => onSet(index, (coefficients[index] ?? 1) - 1), [onSet, coefficients]);
  const onTapSubscript = useCallback(() => {
    actions.tapSubscript();
    playSound('equation-error');
  }, [actions, playSound]);
  const onAddSpecies = useCallback(
    (bare: string) => {
      const result = actions.addSpecies(bare);
      if (!result.ok) playSound('equation-error');
      else playSound(result.built ? 'equation-balanced' : 'coefficient-tick');
    },
    [actions, playSound]
  );

  // Move focus to "Next" when a round locks, without scrolling.
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (phase === 'done') nextButtonRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const nextLabel = game.isLastRound ? M.ui.finishLevel : M.ui.nextReaction;
  const card = (index: number) => {
    const species = parsed.species[index];
    return (
      <CompoundCard
        key={`${species.side}-${species.bare}-${index}`}
        species={species}
        coefficient={coefficients[index]}
        disabled={disabled}
        showClusters={scaffold.clusters}
        pulse={hint.cardIndex === index}
        touch={touch}
        onSet={(value) => onSet(index, value)}
        onIncrement={() => onIncrement(index)}
        onDecrement={() => onDecrement(index)}
        onTapSubscript={onTapSubscript}
      />
    );
  };
  const plus = (key: string) => (
    <span key={key} className="text-2xl font-black text-(--muted)" aria-hidden="true">
      +
    </span>
  );

  return (
    <div className="flex w-full flex-col gap-4" data-testid="balancer-arena" data-phase={phase} data-reaction={round.reaction.id}>
      {/* Screen-reader announcements: changes are polite, the lock is assertive. */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {game.announcement}
      </div>
      <div className="sr-only" role="alert">
        {game.lockAnnouncement}
      </div>

      {/* Hint ladder */}
      {hint.text && (
        <div
          role="status"
          data-testid="balancer-hint"
          data-tier={hint.tier}
          className="flex items-start gap-3 rounded-2xl border-2 border-(--hint)/60 bg-(--hint-surface) p-4 shadow-md"
        >
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-(--hint)" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-wider text-(--hint)">{M.hint.tierLabel(hint.tier)}</p>
            <p className="mt-1 text-sm font-bold leading-relaxed text-(--foreground)">{richText(hint.text)}</p>
          </div>
          <button
            type="button"
            onClick={actions.dismissHint}
            aria-label={M.ui.dismissHint}
            className="cursor-pointer rounded-lg p-1 text-(--muted) transition hover:bg-(--surface-2) hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
      {game.offerTier2 && !hint.text && (
        <button type="button" onClick={actions.requestHint} className={`${ghostClass} flex items-center justify-center gap-2 normal-case tracking-normal`}>
          <Lightbulb className="h-4 w-4 text-(--hint)" aria-hidden="true" />
          {M.stuck.offer}
        </button>
      )}

      {/* The reaction */}
      <section
        aria-label={M.ui.equationLabel(round.reaction.name)}
        className="flex w-full flex-col items-center gap-4 rounded-2xl border-2 border-(--border) bg-(--surface) p-4 shadow-xl sm:p-6"
      >
        <div className="text-center">
          <span className="rounded-full bg-(--info-surface) px-3 py-1 text-[10px] font-black uppercase tracking-wider text-(--link)">
            {M.reactionType(round.reaction.type)}
          </span>
          <h2 className="mt-2 text-2xl font-black text-(--foreground) sm:text-3xl">{round.reaction.name}</h2>
        </div>

        {phase === 'build' ? (
          <ChallengeBuilder game={game} disabled={isPaused} touch={touch} onAdd={onAddSpecies} />
        ) : (
          <>
            <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3">
              <div className="flex flex-wrap items-center justify-center gap-2" data-testid="reactants">
                {parsed.reactants.flatMap((_, i) => (i > 0 ? [plus(`plus-r-${i}`), card(i)] : [card(i)]))}
              </div>
              <span className="text-3xl font-black text-(--link)" aria-hidden="true">
                →
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2" data-testid="products">
                {parsed.products.flatMap((_, i) => {
                  const index = parsed.reactants.length + i;
                  return i > 0 ? [plus(`plus-p-${i}`), card(index)] : [card(index)];
                })}
              </div>
            </div>
            {/* The symbolic object, re-rendered on every change. */}
            <p className="text-center text-lg font-black text-(--foreground) sm:text-xl" data-testid="equation-text">
              <MoleculeText formula={game.equation} />
            </p>
          </>
        )}

        {game.observation && (
          <p className="text-center text-sm font-medium leading-relaxed text-(--muted)" data-testid="observation">
            <span className="text-[10px] font-black uppercase tracking-wider">{M.ui.observation}: </span>
            {game.observation}
          </p>
        )}
      </section>

      {/* Ledger and beam */}
      {phase !== 'build' && (
        <>
          {!scaffold.ledgerByDefault && (
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={actions.toggleLedger} disabled={isPaused} className={ghostClass} aria-pressed={game.ledgerOpened}>
                {game.ledgerOpened ? M.ledger.hide : M.ledger.show}
              </button>
              {!game.ledgerOpened && phase !== 'done' && <span className="text-xs font-bold text-(--muted)">{M.ledger.showCost}</span>}
            </div>
          )}
          {game.ledgerShown && (
            <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <AtomLedger rows={game.rows} highlightElement={game.highlightElement} />
              <MassBeam left={game.massLeft} right={game.massRight} />
            </div>
          )}
        </>
      )}

      {/* Coach or round-complete */}
      {phase === 'done' ? (
        <section
          data-testid="round-complete"
          aria-labelledby="balancer-round-complete-title"
          className="rounded-2xl border-2 border-(--correct) bg-(--success-surface) p-4 shadow-md"
        >
          <p className="text-[10px] font-black uppercase tracking-wider text-(--correct)">{M.success.label}</p>
          <h2 id="balancer-round-complete-title" className="mt-1 text-2xl font-black text-(--foreground)">
            {richText(M.success.round(game.equation))}
          </h2>
          {coach.message && <p className="mt-2 text-sm font-bold leading-relaxed text-(--foreground)">{richText(coach.message)}</p>}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-(--border) bg-(--surface-2) px-3 py-1 text-xs font-black text-(--foreground)">
              {M.success.points(game.lastPoints)}
            </span>
            {game.lastPoints > CFG.mechanics.pointsPerLevelMultiplier * game.level && (
              <span className="text-xs font-bold text-(--muted)">{M.success.bonus(CFG.mechanics.lowestTermsBonus)}</span>
            )}
            <button ref={nextButtonRef} type="button" onClick={actions.next} className={`${buttonClass} ml-auto`}>
              {nextLabel}
            </button>
          </div>
        </section>
      ) : (
        <CoachPanel
          message={coach.visible ? coach.message : null}
          label={coach.label}
          tone={coach.tone}
          renderText={richText}
          regionLabel={M.ui.coachRegion}
        >
          {game.guided && coach.tone === 'guide' && (
            <>
              {game.guideStep === 0 && (
                <button type="button" onClick={actions.nextGuideStep} className={buttonClass}>
                  {M.ui.nextStep}
                </button>
              )}
              <button type="button" onClick={actions.skipGuide} className={ghostClass}>
                {M.ui.skipGuide}
              </button>
            </>
          )}
        </CoachPanel>
      )}
    </div>
  );
}
