// src/components/explore/SourceList.tsx

import { ExternalLink } from 'lucide-react';
import { format } from '@/i18n/format';
import type { ExploreSource } from '@/lib/explore/types';

/**
 * Where an entry's facts came from, and when the links were last opened.
 *
 * On the page rather than only in the source files, because the entries make
 * claims about real people and real dates and a reader — or a teacher — should
 * be able to check one. The labels stay in English: they are the names of
 * English-language institutions and papers, and translating "Science History
 * Institute" makes it harder to find, not easier.
 *
 * The date is formatted by the caller with `Intl`, never assembled here.
 */
export function SourceList({
  heading,
  sources,
  note,
  verifiedOn,
  opensInNewTab,
}: {
  heading: string;
  sources: ExploreSource[];
  note: string;
  verifiedOn: string;
  opensInNewTab: string;
}) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-8 border-t border-(--border) pt-4">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-(--muted)">
        {heading}
      </h4>
      <ul className="mt-2 space-y-1">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-1.5 text-xs text-(--muted) transition hover:text-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              <span>{source.label}</span>
              <ExternalLink
                className="mt-0.5 h-3 w-3 shrink-0 opacity-60 transition group-hover:opacity-100"
                aria-hidden="true"
              />
              <span className="sr-only">{opensInNewTab}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] text-(--muted)">{format(note, { date: verifiedOn })}</p>
    </div>
  );
}
