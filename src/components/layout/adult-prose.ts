// src/components/layout/adult-prose.ts
//
// Text alignment for the three long-prose pages written for adults: About,
// For Teachers and Privacy. Nowhere else.
//
// Justified with hyphenation from `md` (768px) up, left-aligned below. The
// prose fills its card, so the left and right margins match and the justified
// edge lines up with the card's padding; hyphenation keeps the word gaps
// small. On a phone the column is 35–45 characters and browsers lay out text
// a line at a time, so justification leaves visible gaps however it is
// hyphenated.
//
// Every student-facing page (games, cheat sheets, Explore) stays left-aligned.
// Uneven word spacing makes a line harder to track for dyslexic readers
// (WCAG 1.4.8 asks for unjustified text), the players are 14 to 16, and their
// text is dense with long chemical names that hyphenate badly.
//
// `hyphens-auto` hyphenates by the page's `<html lang>`, which the root layout
// sets per locale, so German and Russian break by their own rules.
//
// `hyphenate-limit-chars: 6 3 3` (CSS Text 4, supported in current Chrome and
// Firefox; unsupported browsers just fall back to the browser's usual
// hyphenation) tells the browser not to hyphenate a word under 6 characters,
// and never to leave fewer than 3 characters on either side of the break.
// Without it the default budget is much stingier — Chrome will happily break
// "everything" as "ev-erything", a 2-character orphan nobody wants. This
// matters most for the teachers-page sidebar, whose 320px column is as
// narrow as a phone despite sitting at a `md`+ viewport where hyphenation is
// on; a wide, forgiving column rarely needs the limit but a narrow one does.

/** Classes for a block of adult-facing prose. */
export const ADULT_PROSE = 'md:text-justify md:hyphens-auto md:[hyphenate-limit-chars:6_3_3]';

/**
 * Undoes `ADULT_PROSE` for something that sits inside it but is not prose — a
 * form's labels and help text, for instance.
 */
export const NOT_PROSE = 'md:text-left md:hyphens-manual';
