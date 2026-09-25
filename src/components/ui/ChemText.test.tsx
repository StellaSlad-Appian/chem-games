import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import ChemText from './ChemText';

const subs = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('sub')).map((s) => s.textContent);
const sups = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('sup')).map((s) => s.textContent);

describe('ChemText', () => {
  it('typesets the formulae and leaves the prose as written', () => {
    const text = 'sulfate SO4 2− vs sulfite SO3 2−; ammonium, NH4+.';
    const { container } = render(<ChemText text={text} />);
    expect(subs(container)).toEqual(['4', '3', '4']);
    expect(sups(container)).toEqual(['2−', '2−', '+']);
    // MoleculeText's space between "SO4" and "2−" is a token of its own, so
    // the text is the source once that space is ignored.
    expect(container.textContent?.replace(/\s+/g, ' ')).toBe(text);
  });

  it('renders an equation as one MoleculeText, arrow and all', () => {
    const { container } = render(<ChemText text="Mg + 2HCl → MgCl2 + H2" />);
    expect(container.querySelectorAll('span.inline-flex.whitespace-nowrap')).toHaveLength(1);
    expect(subs(container)).toEqual(['2', '2']);
    expect(container.textContent).toContain('→');
  });

  it('leaves text without a formula untouched', () => {
    const text = 'Group 2 → +2, pH 7, carbon-14, propan-2-ol, H₂O';
    const { container } = render(<ChemText text={text} />);
    expect(container.innerHTML).toBe(text);
  });
});
