import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { GlossaryTerm, GlossaryText } from './GlossaryTerm';

const GLOSSARY = [
  {
    term: 'unpaired electron',
    definition: 'an outer electron without a partner',
    matches: ['unpaired electrons', 'unpaired electron'],
  },
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
    render(
      <GlossaryText
        text="Oxygen still has 2 unpaired electrons. Its lone pairs stay put; an unpaired electron pairs with an unpaired electron."
        glossary={GLOSSARY}
      />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.map((b) => b.textContent)).toEqual(['unpaired electrons', 'lone pairs']);
    expect(screen.getByText(/an unpaired electron pairs with an unpaired electron/)).toBeInTheDocument();
  });

  it('leaves text without glossary words untouched', () => {
    render(<GlossaryText text="Nothing to explain here." glossary={GLOSSARY} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('Nothing to explain here.')).toBeInTheDocument();
  });

  it('does not match a glossary word inside a longer Latin word', () => {
    render(<GlossaryText text="An unpaired electrons-only rule; lone pairing is different." glossary={GLOSSARY} />);
    // "unpaired electrons" here is followed by "-", which is a boundary, so it still
    // matches; "lone pairing" must not, because "pairing" continues the word.
    expect(screen.getAllByRole('button').map((b) => b.textContent)).toEqual(['unpaired electrons']);
  });
});

// ---------------------------------------------------------------------------
// Word boundaries
// ---------------------------------------------------------------------------
//
// The matcher used to build `/\b(…)\b/gi`. JavaScript's `\b` is defined
// against `[A-Za-z0-9_]`, so it knows only the Latin alphabet — which was
// invisible while every locale was Latin, and breaks the entire Russian site
// the moment one is not. These pin the Unicode lookarounds that replaced it:
// Cyrillic now matches, Latin behaves exactly as before, and the two
// near-misses French and Spanish documented are fixed rather than unexploited.

const RU_GLOSSARY = [
  {
    term: 'электрон',
    definition: 'отрицательно заряжённая частица',
    // Russian inflects, so — exactly as for German — the match list carries
    // the forms the copy actually uses. `game-messages.test.ts` enforces that
    // for real catalogues.
    matches: ['электроны', 'электрона', 'электрон'],
  },
  { term: 'связь', definition: 'общая пара электронов', matches: ['связь'] },
];

describe('GlossaryText word boundaries', () => {
  it('matches a Cyrillic term, which an ASCII `\\b` never could', () => {
    // The measurement that made this a blocker: /\bэлектрон\b/ is false
    // against "электрон" standing entirely alone, because neither side of it
    // is an ASCII word character, so `\b` sees no boundary to anchor to.
    expect(new RegExp('\\b(электрон)\\b', 'gi').test('Это электрон здесь')).toBe(false);

    render(<GlossaryText text="Это электрон здесь" glossary={RU_GLOSSARY} />);
    expect(screen.getByRole('button', { name: 'электрон' })).toBeInTheDocument();
  });

  it('matches an inflected Cyrillic form when the match list carries it', () => {
    render(<GlossaryText text="Два электрона в атоме" glossary={RU_GLOSSARY} />);
    expect(screen.getByRole('button', { name: 'электрона' })).toBeInTheDocument();
  });

  it('does not match a Cyrillic term inside a longer Cyrillic word', () => {
    // The boundary has to hold in both scripts: "сверхэлектрон" is one word,
    // and a chip over its tail would be nonsense. A form the match list does
    // not carry (here the genitive plural "электронов") is likewise not a hit.
    render(<GlossaryText text="Слово сверхэлектрон и электронов" glossary={RU_GLOSSARY} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('no longer matches ES `índice` inside `subíndice`', () => {
    // glossary-es.md § Glossary match words records this as the pair to
    // re-test "if anyone ever fixes the matcher to be Unicode-aware". `\b`
    // found a boundary between the ASCII `b` and the non-ASCII `í`; a
    // `\p{L}` lookbehind does not.
    expect(new RegExp('\\b(índice)\\b', 'gi').test('el subíndice')).toBe(true);

    const es = [{ term: 'índice', definition: 'un índice', matches: ['índice'] }];
    render(<GlossaryText text="el subíndice del agua" glossary={es} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('no longer matches an IT prefix inside an accented word', () => {
    // glossary-it.md § Two Italian near-misses records the same mechanism with
    // *perché* and *metà*. Note the words it names — "perche" and "meta" — are
    // not actually substrings of them (the final letter differs), so the
    // demonstrable pair is the prefix that *is*: `perch` ⊂ *perché*.
    expect(new RegExp('\\b(perch)\\b', 'gi').test('perché no')).toBe(true);

    const it_ = [{ term: 'perch', definition: 'not a word', matches: ['perch'] }];
    render(<GlossaryText text="perché no" glossary={it_} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('still matches across the Italian elision apostrophe', () => {
    // The other Italian near-miss, and this one we rely on: an apostrophe is
    // neither `\p{L}` nor `\p{N}`, so it is still a boundary and no match word
    // needs an *l’* variant.
    const it_ = [{ term: 'elettrone', definition: 'una particella', matches: ['elettrone'] }];
    render(<GlossaryText text="l’elettrone esterno" glossary={it_} />);
    expect(screen.getByRole('button', { name: 'elettrone' })).toBeInTheDocument();
  });

  it('builds a valid pattern under `u` for every character `escape()` handles', () => {
    // The `u` flag makes escaping strict: `{`, `}`, `]`, `(`, `)`, `*`, `+`,
    // `?` and `\` are each a syntax error unescaped, and an *unnecessary*
    // escape is an error too. A match word is translator-supplied, so a throw
    // here would be a blank page rather than a missing chip.
    const punctuation = [...' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'];
    for (const character of punctuation) {
      const glossary = [{ term: character, definition: 'd', matches: [character] }];
      expect(() => render(<GlossaryText text={`a ${character} b`} glossary={glossary} />)).not.toThrow();
    }
  });
});
