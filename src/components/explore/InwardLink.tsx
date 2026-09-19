// src/components/explore/InwardLink.tsx

import { ArrowRight } from 'lucide-react';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { format } from '@/i18n/format';

/**
 * The call to action at the foot of a card.
 *
 * This is the point of the page. A rotating page that only tells you things is
 * a blog, and a blog on a games site is a dead end: the reader finishes the
 * paragraph and closes the tab. Every card ends with a way into the sheet or
 * the game that teaches the chemistry it just described — so the component
 * takes no "optional" flag and there is no branch where it renders nothing.
 *
 * `pattern` carries its own `{target}` placeholder so that each language can
 * put the name of the destination wherever its grammar wants it, rather than
 * having "Practise this: " concatenated onto a title.
 */
export function InwardLink({
  pattern,
  href,
  title,
}: {
  pattern: string;
  href: string;
  title: string;
}) {
  return (
    <LocaleLink
      href={href}
      className="group mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
    >
      <span>{format(pattern, { target: title })}</span>
      <ArrowRight
        className="h-4 w-4 shrink-0 transition group-hover:translate-x-1"
        aria-hidden="true"
      />
    </LocaleLink>
  );
}
