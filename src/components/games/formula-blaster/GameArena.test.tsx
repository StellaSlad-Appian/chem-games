import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import GameArena, { type BubbleData } from './GameArena';

const bubble = (overrides: Partial<BubbleData> = {}): BubbleData => ({
  id: 'b1',
  compoundId: '1',
  formula: 'HCl',
  chemicalName: 'Hydrochloric Acid',
  xPos: 50,
  speed: 7,
  isCorrect: true,
  colorClass: 'border-cyan-400',
  ...overrides,
});

function renderArena(overrides: Partial<Parameters<typeof GameArena>[0]> = {}) {
  const onBubbleClick = vi.fn();
  const onDismissHint = vi.fn();
  const onBubbleExpired = vi.fn();
  render(
    <GameArena
      bubbles={[bubble()]}
      activeHint={null}
      activeError={null}
      isPaused={false}
      onDismissHint={onDismissHint}
      onBubbleClick={onBubbleClick}
      onBubbleExpired={onBubbleExpired}
      {...overrides}
    />
  );
  return { onBubbleClick, onDismissHint, onBubbleExpired };
}

describe('Formula Blaster GameArena', () => {
  it('renders one bubble per entry with its formula', () => {
    renderArena({ bubbles: [bubble(), bubble({ id: 'b2', formula: 'NaCl', compoundId: '6', isCorrect: false })] });
    const bubbles = screen.getAllByTestId('blaster-bubble');
    expect(bubbles).toHaveLength(2);
    expect(bubbles.map((b) => b.getAttribute('data-formula'))).toEqual(['HCl', 'NaCl']);
  });

  it('reports clicks with the bubble id, correctness and compound id', () => {
    const { onBubbleClick } = renderArena();
    fireEvent.click(screen.getByTestId('blaster-bubble'));
    expect(onBubbleClick).toHaveBeenCalledWith('b1', true, '1', expect.objectContaining({ x: expect.any(Number) }));
  });

  it('flags a wrong bubble visually and still reports the click', () => {
    const { onBubbleClick } = renderArena({ bubbles: [bubble({ isCorrect: false })] });
    fireEvent.click(screen.getByTestId('blaster-bubble'));
    expect(onBubbleClick).toHaveBeenCalledWith('b1', false, '1', expect.anything());
    expect(screen.getByTestId('blaster-bubble').firstElementChild).toHaveClass('animate-shake');
  });

  it('pauses the float animation while the game is paused', () => {
    renderArena({ isPaused: true });
    expect(screen.getByTestId('blaster-bubble')).toHaveStyle({ animationPlayState: 'paused' });
  });

  it('removes a bubble when its float animation ends', () => {
    const { onBubbleExpired } = renderArena();
    // jsdom has no AnimationEvent, and React picks the native event name it
    // listens to from vendor-prefix sniffing, so dispatch both spellings.
    for (const type of ['animationend', 'webkitAnimationEnd']) {
      const event = new Event(type, { bubbles: true });
      Object.defineProperty(event, 'animationName', { value: 'floatUp' });
      fireEvent(screen.getByTestId('blaster-bubble'), event);
    }
    expect(onBubbleExpired).toHaveBeenCalledWith('b1');
    expect(onBubbleExpired).toHaveBeenCalledTimes(1);
  });

  it('shows the hint banner and lets the player dismiss it', () => {
    const { onDismissHint } = renderArena({ activeHint: 'Water consists of the elements: H & O.' });
    expect(screen.getByTestId('blaster-hint')).toHaveTextContent('Water consists of the elements: H & O.');
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss hint' }));
    expect(onDismissHint).toHaveBeenCalledTimes(1);
  });

  it('shows the error tooltip at the click position', () => {
    renderArena({ activeError: { message: "That's Sodium Chloride (NaCl)!", x: 120, y: 40 } });
    const error = screen.getByTestId('blaster-error');
    expect(error).toHaveTextContent("That's Sodium Chloride (NaCl)!");
    expect(error).toHaveStyle({ left: '120px', top: '40px' });
  });
});
