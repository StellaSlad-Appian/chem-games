// src/components/games/reaction-balancer/AtomLedger.tsx
'use client';

import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useBalancerMessages } from '@/i18n/game-messages/reaction-balancer';
import { elementName } from '@/i18n/chemistry-names';
import { useI18n } from '@/i18n/client';
import type { LedgerRow } from '@/core-engine/utils/balancer-utils';


interface AtomLedgerProps {
  rows: LedgerRow[];
  /** The row to balance next (Level 1 scaffolding). */
  highlightElement: string | null;
}

/**
 * Per-element counts on each side, in words as well as colour: every row
 * carries "balanced" or "n more needed on the left/right" and an icon, so a
 * student who only reads the text can still finish.
 */
export default function AtomLedger({ rows, highlightElement }: AtomLedgerProps) {
  const M = useBalancerMessages();
  const { locale } = useI18n();
  // `row.name` is the registry's English name; the ledger shows the reader's.
  const name = (row: LedgerRow) => elementName(locale, row.element);

  return (
    <section aria-label={M.ledger.title} data-testid="atom-ledger" className="w-full rounded-2xl border-2 border-(--border) bg-(--surface) p-3 shadow-md sm:p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_3rem_3rem_minmax(0,1.4fr)] items-center gap-x-2 text-[10px] font-black uppercase tracking-wider text-(--muted)">
        <span>{M.ledger.title}</span>
        <span className="text-center">{M.ledger.left}</span>
        <span className="text-center">{M.ledger.right}</span>
        <span className="sr-only">{M.ledger.status}</span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {rows.map((row) => {
          const next = row.element === highlightElement;
          const diff = Math.abs(row.left - row.right);
          const status = row.balanced ? M.ledger.balancedRow : M.ledger.needsMore(diff, row.left < row.right ? 'left' : 'right');
          return (
            <li
              key={row.element}
              data-testid="ledger-row"
              data-element={row.element}
              data-balanced={row.balanced}
              aria-label={`${M.ledger.row(name(row), row.left, row.right)}, ${status}${next ? `, ${M.ledger.nextUp}` : ''}`}
              className={`grid grid-cols-[minmax(0,1fr)_3rem_3rem_minmax(0,1.4fr)] items-center gap-x-2 rounded-xl border-2 px-2 py-1.5 text-sm ${
                row.balanced ? 'border-(--correct)/40 bg-(--background)' : 'border-(--wrong)/40 bg-(--background)'
              } ${next ? 'ring-2 ring-(--hint) ring-offset-2 ring-offset-(--surface)' : ''}`}
            >
              <span className="font-black leading-tight text-(--foreground)">
                {name(row)} <span className="font-mono text-xs text-(--muted)">{row.element}</span>
              </span>
              <span className="text-center font-mono text-base font-black text-(--foreground)">
                <span key={`l-${row.left}`} className="ledger-tick">
                  {row.left}
                </span>
              </span>
              <span className="text-center font-mono text-base font-black text-(--foreground)">
                <span key={`r-${row.right}`} className="ledger-tick">
                  {row.right}
                </span>
              </span>
              <span className={`flex items-center gap-1 text-xs font-bold ${row.balanced ? 'text-(--correct)' : 'text-(--wrong)'}`}>
                {row.balanced ? <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" /> : <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />}
                <span>{next ? `${status} — ${M.ledger.nextUp}` : status}</span>
              </span>
            </li>
          );
        })}
      </ul>
      {rows.length > 0 && rows.every((r) => r.balanced) && (
        <p className="mt-2 text-center text-xs font-black text-(--correct)" data-testid="ledger-all-balanced">
          {M.ledger.allBalanced}
        </p>
      )}
    </section>
  );
}
