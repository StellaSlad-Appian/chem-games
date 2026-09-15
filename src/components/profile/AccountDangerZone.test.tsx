import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { AccountDangerZone } from './AccountDangerZone';

// The real action is a server function; the component only needs something
// with the right shape to hand to useActionState.
vi.mock('@/lib/actions/account-actions', () => ({
  deleteAccountAction: vi.fn(async () => null),
}));

describe('AccountDangerZone', () => {
  it('links to the data export', () => {
    render(<AccountDangerZone />);
    expect(screen.getByRole('link', { name: /download my data/i })).toHaveAttribute(
      'href',
      '/account/export'
    );
  });

  it('keeps the delete button disabled until DELETE is typed exactly', () => {
    render(<AccountDangerZone />);
    const button = screen.getByRole('button', { name: /delete my account/i });
    const input = screen.getByLabelText(/type delete to confirm/i);

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 'delete' } });
    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 'DELETE' } });
    expect(button).toBeEnabled();

    fireEvent.change(input, { target: { value: 'DELETED' } });
    expect(button).toBeDisabled();
  });
});
