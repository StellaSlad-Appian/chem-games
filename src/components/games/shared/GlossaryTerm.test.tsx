import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { GlossaryTerm, GlossaryText } from './GlossaryTerm';

const GLOSSARY = [
  { term: 'loner (unpaired electron)', definition: 'an outer electron without a partner', matches: ['loners', 'loner'] },
  { term: 'lone pair', definition: 'two outer electrons that stay on one atom', matches: ['lone pairs', 'lone pair'] },
];

describe('GlossaryTerm', () => {
  it('opens a tooltip on click and closes it with Escape', () => {
    render(<GlossaryTerm term="octet" definition="eight outer electrons around an atom — full" />);
    const trigger = screen.getByRole('button', { name: 'octet' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('tooltip')).toHaveTextContent('eight outer electrons around an atom — full');
    expect(trigger).toHaveAttribute('aria-describedby', screen.getByRole('tooltip').id);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('takes Escape for itself, leaving a modal that listens on window open', () => {
    // The "How to Play" modal adds its own keydown listener on `window` while
    // it is open — before the pop-over exists, so it is registered first.
    // Escape must close only the pop-over.
    //
    // The event is dispatched on the button, not on `window`, because that is
    // what a real keypress does: it targets the focused element and then
    // propagates. Dispatched straight at `window` there is no capture phase to
    // win, and listeners would simply run in registration order.
    const modalEscape = vi.fn();
    window.addEventListener('keydown', modalEscape);
    try {
      render(<GlossaryTerm term="octet" definition="eight outer electrons around an atom — full" />);
      const trigger = screen.getByRole('button', { name: 'octet' });

      fireEvent.click(trigger);
      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      fireEvent.keyDown(trigger, { key: 'Escape' });
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(modalEscape).not.toHaveBeenCalled();

      // With the pop-over closed, Escape belongs to the modal again.
      fireEvent.keyDown(trigger, { key: 'Escape' });
      expect(modalEscape).toHaveBeenCalledTimes(1);
    } finally {
      window.removeEventListener('keydown', modalEscape);
    }
  });

  it('closes when the pointer goes down elsewhere', () => {
    render(
      <div>
        <GlossaryTerm term="duet" definition="two outer electrons around hydrogen — full" />
        <p>elsewhere</p>
      </div>
    );
    fireEvent.click(screen.getByRole('button', { name: 'duet' }));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByText('elsewhere'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('GlossaryText', () => {
  it('wraps the first occurrence of each glossary word, longest match first', () => {
    render(<GlossaryText text="Oxygen still has 2 loners. Its lone pairs stay put; a loner pairs with a loner." glossary={GLOSSARY} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.map((b) => b.textContent)).toEqual(['loners', 'lone pairs']);
    expect(screen.getByText(/a loner pairs with a loner/)).toBeInTheDocument();
  });

  it('leaves text without glossary words untouched', () => {
    render(<GlossaryText text="Nothing to explain here." glossary={GLOSSARY} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('Nothing to explain here.')).toBeInTheDocument();
  });
});
