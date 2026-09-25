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

/** Classes for a block of adult-facing prose. */
export const ADULT_PROSE = 'md:text-justify md:hyphens-auto';

/**
 * Undoes `ADULT_PROSE` for something that sits inside it but is not prose — a
 * form's labels and help text, for instance.
 */
export const NOT_PROSE = 'md:text-left md:hyphens-manual';
