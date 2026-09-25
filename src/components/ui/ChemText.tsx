// src/components/ui/ChemText.tsx

import { Fragment } from 'react';
import MoleculeText from './MoleculeText';
import { segmentChemText } from '@/lib/chem-text';

interface ChemTextProps {
  /** A line of prose that may contain formulae: "sulfate SO4 2− vs sulfite SO3 2−". */
  text: string;
}

/**
 * Sub- and superscripts sized for running text: a little larger than a
 * formula field's, and in the sentence's weight rather than black.
 */
const SUBSCRIPT = 'text-[0.75em] relative -bottom-[0.1em] leading-none';
const SUPERSCRIPT = 'text-[0.75em] relative -top-[0.4em] leading-none';

/**
 * Prose with its chemical formulae typeset by MoleculeText — real subscripts
 * and superscripts — and every other character left exactly as written.
 *
 * What counts as a formula is decided in src/lib/chem-text.ts; the short
 * version is "valid element symbols, with a digit or a charge". Each formula
 * is `whitespace-nowrap`, as in RichMessage, so "SO4 2−" never breaks between
 * the ion and its charge. Unlike a formula field it keeps the sentence's
 * font, so "NaCl" (no digit, left as text) and "NH4+" (typeset) beside it
 * look like the same kind of thing.
 */
export default function ChemText({ text }: ChemTextProps) {
  const segments = segmentChemText(text);
  return (
    <>
      {segments.map((segment, index) =>
        segment.type === 'formula' ? (
          <MoleculeText
            key={index}
            formula={segment.value}
            fontClassName=""
            subscriptClassName={SUBSCRIPT}
            superscriptClassName={SUPERSCRIPT}
            className="whitespace-nowrap"
          />
        ) : (
          <Fragment key={index}>{segment.value}</Fragment>
        )
      )}
    </>
  );
}
