import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import MoleculeText from './MoleculeText';

describe('MoleculeText', () => {
  it('renders atom counts as subscripts', () => {
    const { container } = render(<MoleculeText formula="H2O" />);
    expect(container.textContent).toBe('H2O');
    const subs = Array.from(container.querySelectorAll('sub')).map((s) => s.textContent);
    expect(subs).toEqual(['2']);
  });

  it.each([
    ['H+', [], ['+']],
    ['OH-', [], ['-']],
    ['Ca2+', [], ['2+']],
    ['O2-', [], ['2-']],
    ['NH4+', ['4'], ['+']],
    ['SO4 2-', ['4'], ['2-']],
  ])('renders %s with subscripts %j and superscripts %j', (formula, subs, sups) => {
    const { container } = render(<MoleculeText formula={formula} />);
    expect(Array.from(container.querySelectorAll('sub')).map((s) => s.textContent)).toEqual(subs);
    expect(Array.from(container.querySelectorAll('sup')).map((s) => s.textContent)).toEqual(sups);
  });

  it('keeps a leading stoichiometric coefficient out of the subscripts', () => {
    const { container } = render(<MoleculeText formula="2H2O" />);
    expect(container.textContent).toBe('2H2O');
    expect(container.querySelectorAll('sub')).toHaveLength(1);
    // The whole species — coefficient, symbols and subscript — is one
    // non-wrapping cluster (see MoleculeText's `clusterTokens`), so the
    // coefficient is the first element *inside* that cluster, not a direct
    // child of the outer span.
    expect(container.querySelector('span > span > span')?.textContent).toBe('2');
  });

  it('renders state symbols and reaction arrows', () => {
    const { container } = render(<MoleculeText formula="2H2(g) + O2 -> 2H2O(l)" />);
    expect(container.textContent).toContain('→');
    expect(container.textContent).toContain('(g)');
    expect(container.textContent).toContain('(l)');
  });

  it('handles bracketed groups without losing characters', () => {
    const { container } = render(<MoleculeText formula="Ba(OH)2" />);
    expect(container.textContent).toBe('Ba(OH)2');
  });

  it('renders nothing for an empty formula', () => {
    const { container } = render(<MoleculeText formula="" />);
    expect(container.firstChild).toBeNull();
  });
});
