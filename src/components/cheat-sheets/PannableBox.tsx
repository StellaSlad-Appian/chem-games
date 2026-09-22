// src/components/cheat-sheets/PannableBox.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { useI18n } from '@/i18n/client';

/**
 * A box whose content is wider than the column it is given, and which pans
 * sideways rather than shrinking — plus the affordance that says so.
 *
 * Two things on the cheat-sheet detail page do this. The lookup tables hold a
 * `min-w-[28rem]` table, and have since they were written. The section
 * diagrams hold a 512px figure, since 2026-09-21, because the alternative was
 * 20-unit type drawing at 7.4 CSS px (docs/CHEAT_SHEET_IMAGES.md, *How wide
 * the page draws it*). Neither told the reader. At a 320px viewport the
 * visible slice is 236px of 512, so a student who does not swipe sees the left
 * 46% of every figure and believes it is the whole figure.
 *
 * The clipped content usually signals "more to the right" on its own — a word
 * cut mid-way, a third atom half off-screen — but not when the right-hand side
 * of the slice happens to be empty, which is exactly the diagram a reader has
 * no reason to doubt.
 *
 * **Both call sites use this component, which is the point.** An affordance on
 * the diagrams but not on the tables directly above them would read as an
 * inconsistency rather than a hint, and that is the reason the diagram change
 * shipped without one.
 *
 * ## Why a hint line and not a fading right edge
 *
 * A gradient fade was the first choice and does not survive the tables. A fade
 * has to end in the colour underneath it, and the table rows alternate
 * `--surface` and `--background` (`odd:`/`even:` in `LookupTable`), so any
 * single colour stop is visibly wrong on half of them — a grey smear over the
 * rows it does not match. One overlay cannot follow per-row colours. A line of
 * text below the box is legible over anything, says what to do rather than
 * implying it, and is the same in both themes.
 *
 * ## Why it measures instead of using `sm:hidden`
 *
 * The condition is "this box is currently clipping something", which is not
 * the same as "the viewport is under 640px" — a 28rem table already fits its
 * column at `sm`, and a 512px diagram does not fit a narrowed desktop window.
 * A breakpoint is a proxy that is wrong at both ends. Measuring costs a client
 * component and means the hint appears only after hydration, which is the
 * right trade for a progressive hint: the server-rendered HTML then carries no
 * claim about a width it cannot know.
 *
 * Every locale here is left-to-right, so `scrollLeft` is measured as a
 * non-negative offset from the start. An RTL locale would need the sign
 * handled; there is no point writing that until there is one to test it.
 */
export function PannableBox({
  className,
  boxClassName,
  children,
}: {
  /** On the outer element — margins and the width cap the box lives inside. */
  className?: string;
  /** On the scrolling element itself — its border, radius and background. */
  boxClassName?: string;
  children: React.ReactNode;
}) {
  const { t } = useI18n();
  const boxRef = useRef<HTMLDivElement>(null);
  /**
   * `pans` gates the tab stop, `more` gates the hint. They are separate
   * because a box scrolled to its end still pans — backwards — so the tab stop
   * has to stay while the hint goes.
   */
  const [{ pans, more }, setPan] = useState({ pans: false, more: false });

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const measure = () => {
      // Sub-pixel layout leaves `scrollWidth` and `clientWidth` a fraction
      // apart on boxes that do not actually scroll, so the threshold is 1px
      // rather than 0 at both ends.
      const slack = box.scrollWidth - box.clientWidth;
      const next = { pans: slack > 1, more: slack > 1 && box.scrollLeft < slack - 1 };
      // This runs on every scroll event, which on a touch swipe is every
      // frame, and the answer changes twice across a whole swipe. Bailing on
      // an unchanged answer is what keeps that from being a render per frame.
      setPan((current) =>
        current.pans === next.pans && current.more === next.more ? current : next
      );
    };

    measure();

    // Two things change the answer independently. The box resizes when the
    // column does; the content resizes on its own when an SVG finishes
    // decoding, which moves `scrollWidth` while the box stands still. Watching
    // only the box would miss the first paint of every diagram — the case this
    // component exists for.
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    for (const child of Array.from(box.children)) observer.observe(child);
    box.addEventListener('scroll', measure, { passive: true });

    return () => {
      observer.disconnect();
      box.removeEventListener('scroll', measure);
    };
  }, []);

  return (
    <div className={className}>
      <div
        ref={boxRef}
        className={`overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link) ${boxClassName ?? ''}`}
        /*
         * Only while it pans, and only then.
         *
         * Whether a scroll container is a tab stop of its own is up to the
         * browser: Chrome 127+ and Firefox make one focusable when it has no
         * focusable children, Safari does not, and this box's children are an
         * image or a table of plain cells. So a keyboard reader on Safari
         * could not reach the rest of a diagram at all. `tabIndex={0}` settles
         * it everywhere.
         *
         * It is conditional because the same attribute on a desktop layout is
         * a tab stop that does nothing: a stop every keyboard user pays for on
         * a box with no hidden content. `role="group"` carries the name so the
         * stop announces why it is there rather than as an unlabelled div.
         */
        tabIndex={pans ? 0 : undefined}
        role={pans ? 'group' : undefined}
        aria-label={pans ? t.cheatSheets.panHint : undefined}
      >
        {children}
      </div>
      {/*
        Rendered from `pans` and faded by `more`, not rendered from `more`.
        Removing the line when the reader reaches the end would pull the rest
        of the page up by its height mid-swipe; reserving the space costs
        nothing on a desktop layout, where `pans` is false and there is no line
        at all.

        `aria-hidden` because the group above is already named with this exact
        string — a screen reader would otherwise hear it twice, once as the
        container's name and once as stray text after it.
      */}
      {pans && (
        <p
          aria-hidden="true"
          className={`mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-(--muted) transition-opacity ${
            more ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <MoveHorizontal className="h-3.5 w-3.5 shrink-0" />
          {t.cheatSheets.panHint}
        </p>
      )}
    </div>
  );
}
