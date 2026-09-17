import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CoachPanel from './CoachPanel';

describe('CoachPanel', () => {
  it('keeps a polite live region mounted even when there is nothing to say', () => {
    render(<CoachPanel message={null} label="Coach" regionLabel="Coach messages" />);
    const region = screen.getByRole('region', { name: 'Coach messages' });
    expect(region).toHaveAttribute('aria-live', 'polite');
    expect(region).toBeEmptyDOMElement();
  });

  it('shows the label and message, carrying the tone in text and icon as well as colour', () => {
    render(<CoachPanel message="Oxygen still has 2 loners." label="Coach" tone="error" />);
    expect(screen.getByText('Coach')).toBeInTheDocument();
    expect(screen.getByText('Oxygen still has 2 loners.')).toBeInTheDocument();
    expect(screen.getByTestId('coach-panel').querySelector('[data-tone="error"]')).not.toBeNull();
  });

  it('renders the message through renderText and any child controls', () => {
    render(
      <CoachPanel message="Pair the loners." label="Guide" renderText={(t) => <em>{t.toUpperCase()}</em>}>
        <button type="button">Skip guide</button>
      </CoachPanel>
    );
    expect(screen.getByText('PAIR THE LONERS.').tagName).toBe('EM');
    expect(screen.getByRole('button', { name: 'Skip guide' })).toBeInTheDocument();
  });
});
