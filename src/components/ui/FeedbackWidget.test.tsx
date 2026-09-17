/**
 * Component tests for the feedback widget. The server action is mocked so the
 * test can assert what the form sends, including the honeypot field.
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { FeedbackWidget } from './FeedbackWidget';
import { renderWithProviders } from '@/test-utils/render';

const { submitFeedbackActionMock } = vi.hoisted(() => ({
  submitFeedbackActionMock: vi.fn(async () => ({ success: true })),
}));
vi.mock('next/navigation', () => ({
  usePathname: () => '/games/neutralise',
}));
vi.mock('@/lib/actions/feedback', () => ({
  submitFeedbackAction: submitFeedbackActionMock,
}));

function openWidget() {
  fireEvent.click(screen.getByRole('button', { name: 'Open feedback menu' }));
}

function typeMessage(text: string) {
  fireEvent.change(screen.getByPlaceholderText('What went wrong on this page?'), {
    target: { value: text },
  });
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: /send feedback/i }));
}

function honeypot(container: HTMLElement): HTMLInputElement {
  const input = container.querySelector('input[name="website"]');
  if (!(input instanceof HTMLInputElement)) throw new Error('honeypot input not rendered');
  return input;
}

describe('FeedbackWidget', () => {
  it('submits the category, message, current path and an empty honeypot', async () => {
    renderWithProviders(<FeedbackWidget />);
    openWidget();
    typeMessage('The timer froze at level 3');
    submit();

    await waitFor(() =>
      expect(submitFeedbackActionMock).toHaveBeenCalledWith({
        type: 'bug',
        message: 'The timer froze at level 3',
        pageUrl: '/games/neutralise',
        website: '',
      })
    );
    expect(await screen.findByText('Feedback sent!')).toBeInTheDocument();
  });

  it('renders the honeypot off-screen, unfocusable and hidden from assistive tech', () => {
    const { container } = renderWithProviders(<FeedbackWidget />);
    openWidget();

    const input = honeypot(container);
    expect(input).toHaveAttribute('aria-hidden', 'true');
    expect(input).toHaveAttribute('tabindex', '-1');
    expect(input).toHaveAttribute('autocomplete', 'off');
    expect(input.style.display).not.toBe('none');
    expect(input).toHaveClass('absolute');
    // Not exposed to the accessibility tree, so a real user cannot reach it.
    expect(screen.queryByRole('textbox', { name: 'website' })).toBeNull();
  });

  it('forwards whatever a bot puts in the honeypot to the action', async () => {
    const { container } = renderWithProviders(<FeedbackWidget />);
    openWidget();
    typeMessage('Buy cheap reagents');
    fireEvent.change(honeypot(container), { target: { value: 'http://spam.example' } });
    submit();

    await waitFor(() =>
      expect(submitFeedbackActionMock).toHaveBeenCalledWith(
        expect.objectContaining({ website: 'http://spam.example' })
      )
    );
  });

  it('shows the generic error returned by the action', async () => {
    submitFeedbackActionMock.mockResolvedValueOnce({
      success: false,
      error: 'Too many submissions, please try again later.',
    } as never);

    renderWithProviders(<FeedbackWidget />);
    openWidget();
    typeMessage('Another one');
    submit();

    expect(await screen.findByText('Too many submissions, please try again later.')).toBeInTheDocument();
    expect(screen.queryByText('Feedback sent!')).toBeNull();
  });

  it('caps the message length at the shared validation limit', () => {
    renderWithProviders(<FeedbackWidget />);
    openWidget();
    expect(screen.getByPlaceholderText('What went wrong on this page?')).toHaveAttribute('maxlength', '2000');
  });
});
