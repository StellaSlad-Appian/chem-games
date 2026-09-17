// src/components/games/lewis-structures/GameArena.tsx
'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Lightbulb, X } from 'lucide-react';
import AtomCanvas, { type AtomCanvasLabels } from '@/components/games/shared/AtomCanvas';
import CoachPanel from '@/components/games/shared/CoachPanel';
import { GlossaryText, type GlossaryEntry } from '@/components/games/shared/GlossaryTerm';
import MoleculeText from '@/components/ui/MoleculeText';
import { LEWIS_STRUCTURES_CONFIG } from '@/core-engine/config/games/lewis-structures-config';
import { LEWIS_MESSAGES } from '@/core-engine/config/games/lewis-structures-messages';
import type { LewisErrorType } from '@/core-engine/types/chemistry';
import { centralAtomId, type useLewisStructures } from '@/hooks/useLewisStructures';
import { useSound } from '@/hooks/useSound';

const M = LEWIS_MESSAGES;
const CFG = LEWIS_STRUCTURES_CONFIG;

export type LewisGame = ReturnType<typeof useLewisStructures>;

export const LEWIS_GLOSSARY: GlossaryEntry[] = Object.entries(M.glossary).map(([term, definition]) => ({
  term,
  definition,
  matches: M.glossaryMatches[term] ?? [term],
}));

export const CANVAS_LABELS: AtomCanvasLabels = {
  atomName: M.ui.atom.name,
  counter: M.ui.atom.counter,
  loner: M.ui.atom.loner,
  lonePair: M.ui.atom.lonePair,
  lonerLabel: M.ui.atom.lonerLabel,
  bondName: M.ui.bond.name,
  bondUndo: M.ui.bond.undo,
  bondCount: M.ui.bond.count,
  counted: M.ui.bond.counted,
  inspectTap: M.ui.atom.inspectTap,
};

const DIAGNOSES: Exclude<LewisErrorType, 'none'>[] = ['tooMany', 'tooFew', 'hydrogenFull', 'needsDouble', 'leftover'];

interface GameArenaProps {
  game: LewisGame;
  level: number;
  isPaused: boolean;
}

const buttonClass =
  'cursor-pointer rounded-xl bg-blue-500 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all duration-150 hover:bg-blue-600 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-50';
const ghostClass =
  'cursor-pointer rounded-xl border-2 border-(--border) bg-(--background) px-4 py-3 text-xs font-black uppercase tracking-wider text-(--foreground) shadow-sm transition-all duration-150 hover:border-blue-500 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-50';

export default function LewisStructuresArena({ game, level, isPaused }: GameArenaProps) {
  const { playSound } = useSound();
  const { round, structure, phase, canvasMode, coach, hint, symbolic, actions } = game;
  const molecule = round.molecule;
  const glossaryText = useCallback((text: string) => <GlossaryText text={text} glossary={LEWIS_GLOSSARY} />, []);

  const onPair = useCallback(
    (a: string, b: string) => {
      const result = actions.pair(a, b);
      if (!result.ok) playSound('pair-rejected');
      else playSound(result.complete ? 'structure-complete' : 'pair-formed');
    },
    [actions, playSound]
  );
  const onReject = useCallback(
    (reason: 'pairedDot' | 'sameAtom', atomId: string) => {
      actions.reject(reason, atomId);
      playSound('pair-rejected');
    },
    [actions, playSound]
  );

  const highlightBondIds = useMemo(
    () => [...hint.bondIds, ...(game.countFeedback?.missedBonds ?? [])],
    [hint.bondIds, game.countFeedback]
  );

  // Move focus to "Next" when a round completes, without scrolling: on touch the
  // tap's trailing click would otherwise land on the button once it scrolled
  // under the finger.
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (phase === 'done') nextButtonRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const inspecting = phase === 'pickAtom' || phase === 'pickDiagnosis';
  const counting = phase === 'countBonds' || phase === 'countLonePairs';
  const countGiven = phase === 'countBonds' ? game.selectedBondIds.length : game.selectedLonePairs.length;
  const nextLabel = game.isLastRound ? M.ui.finishLevel : round.mode === 'inspect' ? M.ui.nextDrawing : M.ui.nextMolecule;

  return (
    <div className="flex w-full flex-col gap-4" data-testid="lewis-arena" data-phase={phase} data-molecule={molecule.id}>
      {/* Screen-reader announcements: moves are polite, the lock is assertive. */}
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
          data-testid="lewis-hint"
          data-tier={hint.tier}
          className="flex items-start gap-3 rounded-2xl border-2 border-amber-500/60 bg-(--surface) p-4 shadow-md"
        >
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-wider text-amber-500">{M.hint.tierLabel(hint.tier)}</p>
            <p className="mt-1 text-sm font-bold leading-relaxed text-(--foreground)">{glossaryText(hint.text)}</p>
          </div>
          <button
            type="button"
            onClick={actions.dismissHint}
            aria-label="Dismiss hint"
            className="cursor-pointer rounded-lg p-1 text-(--muted) transition hover:bg-(--background) hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
      {game.offerTier2 && !hint.text && (
        <button type="button" onClick={actions.requestHint} className={`${ghostClass} flex items-center justify-center gap-2 normal-case tracking-normal`}>
          <Lightbulb className="h-4 w-4 text-amber-500" aria-hidden="true" />
          {M.hint.offerTier2}
        </button>
      )}

      <AtomCanvas
        // Remount per round so atoms never slide over from the previous molecule.
        key={`${game.level}-${game.roundIndex}-${molecule.id}`}
        structure={structure}
        mode={canvasMode}
        label={M.ui.canvasLabel(molecule.name)}
        labels={CANVAS_LABELS}
        layoutBonds={level < CFG.visuals.unplacedFromLevel ? molecule.bonds : undefined}
        rootAtomId={centralAtomId(molecule)}
        disabled={isPaused || phase === 'done'}
        onPair={onPair}
        onReject={onReject}
        onUnpair={actions.unpair}
        onAtomTap={actions.tapAtom}
        markedAtomId={game.markedAtomId}
        selectedBondIds={game.selectedBondIds}
        onToggleBond={actions.toggleBond}
        selectedLonePairs={game.selectedLonePairs}
        onToggleLonePair={actions.toggleLonePair}
        highlightAtomIds={hint.atomIds}
        highlightBondIds={highlightBondIds}
        highlightLonePairs={game.countFeedback?.missedPairs ?? []}
        showCounters={level <= CFG.visuals.showCountersUntilLevel ? 'always' : 'hover'}
        lonerLabels={level <= CFG.visuals.lonerLabelsUntilLevel}
        pulseLoners={level <= CFG.visuals.pulseUnpairedUntilLevel}
      />

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="flex flex-col gap-3">
          {phase === 'done' ? (
            <section
              data-testid="round-complete"
              aria-labelledby="lewis-round-complete-title"
              className="rounded-2xl border-2 border-(--correct) bg-(--surface) p-4 shadow-md"
            >
              <p className="text-[10px] font-black uppercase tracking-wider text-(--correct)">{M.success.label}</p>
              <h2 id="lewis-round-complete-title" className="mt-1 text-2xl font-black text-(--foreground)">
                {M.success.round(molecule.name, molecule.bondLine)}
              </h2>
              <p className="mt-2 text-sm font-bold leading-relaxed text-(--foreground)">
                {glossaryText(
                  coach.message ??
                    M.coach.complete(
                      molecule.name,
                      game.results[game.results.length - 1]?.bonds ?? 0,
                      game.results[game.results.length - 1]?.lonePairs ?? 0
                    )
                )}
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-(--muted)">{molecule.propertyLine}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-(--border) bg-(--background) px-3 py-1 text-xs font-black text-(--foreground)">
                  {M.success.points(game.lastPoints)}
                </span>
                {game.hintsUsed < 2 && (
                  <span className="text-xs font-bold text-(--muted)">{M.success.bonus(CFG.mechanics.noHintBonus)}</span>
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
              renderText={glossaryText}
              regionLabel={M.ui.coachRegion}
            >
              {game.guided && coach.tone === 'guide' && (
                <>
                  {molecule.id === 'h2o' && game.guideStep === 0 && (
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

          {/* Inspect-mode controls */}
          {phase === 'pickAtom' && (
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={actions.sayCorrect} disabled={isPaused} className={ghostClass}>
                {M.ui.thisOneIsCorrect}
              </button>
            </div>
          )}
          {phase === 'pickDiagnosis' && (
            <div role="group" aria-label={coach.message ?? ''} className="grid gap-2 sm:grid-cols-2" data-testid="diagnosis-picker">
              {DIAGNOSES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => actions.pickDiagnosis(type)}
                  disabled={isPaused}
                  className={`${ghostClass} text-left normal-case tracking-normal`}
                >
                  {M.inspect.diagnosis[type]}
                </button>
              ))}
            </div>
          )}
          {counting && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-black text-(--foreground)" data-testid="count-readout">
                {M.inspect.countLabel(phase === 'countBonds' ? 'bonds' : 'lonePairs', countGiven)}
              </span>
              <button type="button" onClick={actions.submitCount} disabled={isPaused} className={buttonClass}>
                {M.ui.doneCounting}
              </button>
            </div>
          )}
          {inspecting && phase === 'pickDiagnosis' && (
            <p className="sr-only">{coach.message}</p>
          )}
        </div>

        {/* Symbolic panel: formula and bond-line update with every pairing. */}
        <aside aria-label={M.ui.symbolic.title} className="rounded-2xl border-2 border-(--border) bg-(--surface) p-4 text-left" data-testid="symbolic-panel">
          <p className="text-[10px] font-black uppercase tracking-wider text-(--muted)">{M.ui.symbolic.formula}</p>
          <p className="mt-1 text-2xl font-black text-(--foreground)">
            <MoleculeText formula={molecule.formula} />
            <span className="ml-2 text-sm font-bold text-(--muted)">{molecule.name}</span>
          </p>
          <p className="mt-3 text-[10px] font-black uppercase tracking-wider text-(--muted)">{M.ui.symbolic.bondLine}</p>
          <p className="mt-1 font-mono text-sm font-bold text-(--foreground)" data-testid="bond-line-readout">
            {symbolic.bondLines.length ? symbolic.bondLines.join(' · ') : <span className="text-(--muted)">{M.ui.symbolic.noBonds}</span>}
          </p>
          <p className="mt-3 text-[10px] font-black uppercase tracking-wider text-(--muted)">{M.ui.symbolic.perAtom}</p>
          <ul className="mt-1 space-y-1 text-xs font-bold text-(--foreground)">
            {symbolic.atoms.map((a) => (
              <li key={a.id} data-testid="atom-row">
                {M.ui.symbolic.atomRow(a.element, a.count, a.full, a.bonds, a.lonePairs)}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
