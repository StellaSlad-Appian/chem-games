/**
 * Component tests for the collaborator sign-up form (docs/COLLABORATORS.md
 * § 6). The server action is mocked so the test can assert exactly what the
 * form sends, including the honeypot and the blank optional fields.
 *
 * The copy is a fixture rather than the real catalogue, and that is the point:
 * if this file could import `@/i18n/teachers` to get the strings, so could the
 * component, and the whole server-only arrangement would be one autocomplete
 * away from being undone. `src/i18n/teachers-boundary.test.ts` enforces that;
 * this file simply does not depend on it.
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { CollaboratorForm, type CollaboratorFormCopy } from './CollaboratorForm';
import { renderWithProviders } from '@/test-utils/render';
import { COLLABORATOR_MESSAGE_MAX_LENGTH } from '@/lib/validation/collaborator';

const { submitCollaboratorActionMock } = vi.hoisted(() => ({
  submitCollaboratorActionMock: vi.fn(async () => ({ success: true })),
}));
vi.mock('@/lib/actions/collaborator', () => ({
  submitCollaboratorAction: submitCollaboratorActionMock,
}));

const CONTACT = 'maintainer@example.test';

const copy: CollaboratorFormCopy = {
  heading: 'Sign up as a collaborator',
  intro: 'Nothing is required except the email address.',
  use: 'Used to contact you about the games and nothing else.',
  deletion: 'Write to {email} to be removed.',
  optional: 'optional',
  emailLabel: 'Email address',
  emailHelp: 'Whichever address you prefer.',
  nameLabel: 'Your name',
  schoolLabel: 'School',
  countryLabel: 'Country',
  yearLevelsLabel: 'Year levels you teach',
  yearLevelsHelp: 'For example, Year 9 and Year 10.',
  subjectsLabel: 'Subjects you teach',
  subjectsHelp: 'For example, Chemistry.',
  messageLabel: 'What you would like to help with',
  messageHelp: 'A sentence is plenty.',
  submit: 'Put my hand up',
  submitting: 'Sending…',
  successTitle: 'Thank you — you are on the list.',
  successBody: 'No confirmation email is on its way.',
  genericError: 'Something went wrong.',
};

const render = () => renderWithProviders(<CollaboratorForm copy={copy} contactEmail={CONTACT} />);

const field = (name: string | RegExp) => screen.getByLabelText(name);
const submit = () => fireEvent.click(screen.getByRole('button', { name: /put my hand up/i }));

function honeypot(container: HTMLElement): HTMLInputElement {
  const input = container.querySelector('input[name="website"]');
  if (!(input instanceof HTMLInputElement)) throw new Error('honeypot input not rendered');
  return input;
}

describe('CollaboratorForm', () => {
  it('renders every field with a real <label for>, not a placeholder', () => {
    render();

    for (const label of [
      copy.emailLabel,
      copy.nameLabel,
      copy.schoolLabel,
      copy.countryLabel,
      copy.yearLevelsLabel,
      copy.subjectsLabel,
      copy.messageLabel,
    ]) {
      // getByLabelText only matches a real association, so this fails if a
      // placeholder was used as the label.
      expect(field(new RegExp(label, 'i'))).toBeInTheDocument();
    }
    // Nothing leans on a placeholder, which vanishes the moment you type.
    expect(document.querySelectorAll('[placeholder]')).toHaveLength(0);
  });

  it('marks every field except the email address as optional', () => {
    render();

    expect(field(/email address/i)).toBeRequired();
    for (const label of [
      copy.nameLabel,
      copy.schoolLabel,
      copy.countryLabel,
      copy.yearLevelsLabel,
      copy.subjectsLabel,
      copy.messageLabel,
    ]) {
      const input = field(new RegExp(label, 'i'));
      expect(input, label).not.toBeRequired();
      expect(input.closest('div')?.textContent, label).toContain('(optional)');
    }
  });

  it('says what the address will and will not be used for, on the form itself', () => {
    render();
    expect(screen.getByText(copy.use)).toBeInTheDocument();
  });

  it('gives a deletion route that needs no account, as a mailto link', () => {
    render();
    // docs/COLLABORATORS.md § 0: stated on the form, not only in the policy.
    expect(screen.getByRole('link', { name: CONTACT })).toHaveAttribute(
      'href',
      `mailto:${CONTACT}`
    );
  });

  it('submits the email address alone, with the other fields blank', async () => {
    render();
    fireEvent.change(field(/email address/i), { target: { value: 'teacher@school.edu.au' } });
    submit();

    await waitFor(() =>
      expect(submitCollaboratorActionMock).toHaveBeenCalledWith({
        email: 'teacher@school.edu.au',
        name: '',
        school: '',
        country: '',
        yearLevels: '',
        subjects: '',
        message: '',
        website: '',
      })
    );
  });

  it('submits everything the teacher filled in', async () => {
    render();
    fireEvent.change(field(/email address/i), { target: { value: 'teacher@school.edu.au' } });
    fireEvent.change(field(/your name/i), { target: { value: 'Alex Reid' } });
    fireEvent.change(field(/school/i), { target: { value: 'Northside High' } });
    fireEvent.change(field(/country/i), { target: { value: 'Australia' } });
    fireEvent.change(field(/year levels/i), { target: { value: 'Year 9 and Year 10' } });
    fireEvent.change(field(/subjects/i), { target: { value: 'Chemistry' } });
    fireEvent.change(field(/help with/i), { target: { value: 'Tried the balancer with 9C.' } });
    submit();

    await waitFor(() =>
      expect(submitCollaboratorActionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Alex Reid',
          school: 'Northside High',
          country: 'Australia',
          yearLevels: 'Year 9 and Year 10',
          subjects: 'Chemistry',
          message: 'Tried the balancer with 9C.',
        })
      )
    );
  });

  it('announces success to a screen reader, and stops offering the form', async () => {
    render();
    fireEvent.change(field(/email address/i), { target: { value: 'teacher@school.edu.au' } });
    submit();

    const status = await screen.findByRole('status');
    expect(status).toHaveTextContent(copy.successTitle);
    expect(status).toHaveTextContent(copy.successBody);
    expect(screen.queryByLabelText(/email address/i)).toBeNull();
  });

  it('announces a failure as an alert, and keeps what was typed', async () => {
    submitCollaboratorActionMock.mockResolvedValueOnce({
      success: false,
      error: 'Too many sign-ups from this connection. Please try again later.',
    } as never);

    render();
    fireEvent.change(field(/email address/i), { target: { value: 'teacher@school.edu.au' } });
    fireEvent.change(field(/school/i), { target: { value: 'Northside High' } });
    submit();

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Too many sign-ups');
    expect(screen.queryByRole('status')).toBeNull();
    expect(field(/school/i)).toHaveValue('Northside High');
  });

  it('falls back to its own message when the action returns none', async () => {
    submitCollaboratorActionMock.mockResolvedValueOnce({ success: false } as never);

    render();
    fireEvent.change(field(/email address/i), { target: { value: 'teacher@school.edu.au' } });
    submit();

    expect(await screen.findByRole('alert')).toHaveTextContent(copy.genericError);
  });

  it('associates the error with the field the action rejected', async () => {
    submitCollaboratorActionMock.mockResolvedValueOnce({
      success: false,
      error: 'That does not look like an email address.',
      field: 'email',
    } as never);

    render();
    fireEvent.change(field(/email address/i), { target: { value: 'nope' } });
    submit();

    const alert = await screen.findByRole('alert');
    const email = field(/email address/i);
    expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(email.getAttribute('aria-describedby')?.split(' ')).toContain(alert.id);
    // A field the action did not name is left alone.
    expect(field(/school/i)).not.toHaveAttribute('aria-invalid');
  });

  it('disables the submit button while in flight and says what it is doing', async () => {
    let release: (value: { success: boolean }) => void = () => undefined;
    submitCollaboratorActionMock.mockReturnValueOnce(
      new Promise<{ success: boolean }>((resolve) => {
        release = resolve;
      })
    );

    render();
    fireEvent.change(field(/email address/i), { target: { value: 'teacher@school.edu.au' } });
    submit();

    const button = await screen.findByRole('button', { name: copy.submitting });
    expect(button).toBeDisabled();

    release({ success: true });
    await screen.findByRole('status');
  });

  it('renders the honeypot off-screen, unfocusable and hidden from assistive tech', () => {
    const { container } = render();

    const input = honeypot(container);
    expect(input).toHaveAttribute('aria-hidden', 'true');
    expect(input).toHaveAttribute('tabindex', '-1');
    expect(input).toHaveAttribute('autocomplete', 'off');
    // Kept in the DOM, not display:none — a bot has to be able to fill it.
    expect(input.style.display).not.toBe('none');
    expect(input).toHaveClass('absolute');
    expect(screen.queryByRole('textbox', { name: 'website' })).toBeNull();
  });

  it('forwards whatever a bot puts in the honeypot to the action', async () => {
    const { container } = render();
    fireEvent.change(field(/email address/i), { target: { value: 'spam@spam.example' } });
    fireEvent.change(honeypot(container), { target: { value: 'http://spam.example' } });
    submit();

    await waitFor(() =>
      expect(submitCollaboratorActionMock).toHaveBeenCalledWith(
        expect.objectContaining({ website: 'http://spam.example' })
      )
    );
  });

  it('caps the message at the shared validation limit', () => {
    render();
    expect(field(/help with/i)).toHaveAttribute(
      'maxlength',
      String(COLLABORATOR_MESSAGE_MAX_LENGTH)
    );
  });

  it('pre-fills nothing — it has to work for someone with no account', () => {
    render();
    for (const label of [/email address/i, /your name/i, /school/i, /country/i]) {
      expect(field(label)).toHaveValue('');
    }
  });
});
