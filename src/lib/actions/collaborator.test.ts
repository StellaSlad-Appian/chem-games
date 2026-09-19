/**
 * Tests for the collaborator server action. Next's request headers, the
 * Supabase server client and Resend are all mocked so the action's own
 * behaviour can be asserted: the honeypot short-circuit, validation, IP
 * hashing, the RPC arguments, the PT400/PT429 split and the fact that nothing
 * is ever emailed to the teacher.
 *
 * The shape is feedback.test.ts's, because the action is feedback.ts's. What
 * is different, and worth a test of its own, is that this action has no
 * email-only fallback: if the database is not there, the sign-up did not
 * happen, and saying otherwise would be promising a list entry that does not
 * exist.
 */
import { createHash } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { submitCollaboratorAction, type SubmitCollaboratorInput } from './collaborator';
import { en } from '@/i18n/dictionaries/en';

const { headersMock, createClientMock, rpcMock, sendMock } = vi.hoisted(() => ({
  headersMock: vi.fn(),
  createClientMock: vi.fn(),
  rpcMock: vi.fn(),
  sendMock: vi.fn(),
}));

vi.mock('next/headers', () => ({ headers: headersMock, cookies: vi.fn() }));
vi.mock('@/lib/supabase/server', () => ({ createClient: createClientMock }));
vi.mock('resend', () => ({
  Resend: class ResendMock {
    emails = { send: sendMock };
  },
}));

const CLIENT_IP = '203.0.113.7';
const SALT = 'unit-test-salt';
const RECIPIENT = 'maintainer@example.com';
const m = en.serverMessages;

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

const validInput: SubmitCollaboratorInput = {
  email: '  Teacher@School.Edu.Au  ',
  name: '  Alex Reid  ',
  school: 'Northside High',
  country: '',
  yearLevels: 'Year 9 and Year 10',
  subjects: '',
  message: '  Happy to try the balancer with 9C.  ',
  website: '',
};

const lastRpcArgs = (): Record<string, unknown> =>
  rpcMock.mock.calls.at(-1)?.[1] as Record<string, unknown>;

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  vi.spyOn(console, 'error').mockImplementation(() => undefined);

  vi.stubEnv('RESEND_API_KEY', 're_test_key');
  vi.stubEnv('FEEDBACK_RECIPIENT_EMAIL', RECIPIENT);
  vi.stubEnv('FEEDBACK_HASH_SALT', SALT);

  headersMock.mockResolvedValue(new Headers({ 'x-forwarded-for': `${CLIENT_IP}, 10.0.0.1` }));
  rpcMock.mockResolvedValue({ data: 'collaborator-id', error: null });
  createClientMock.mockResolvedValue({ rpc: rpcMock });
  sendMock.mockResolvedValue({ data: { id: 'email-id' }, error: null });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe('submitCollaboratorAction', () => {
  it('calls the RPC with trimmed values, nulls for the blanks, and a hashed client', async () => {
    const result = await submitCollaboratorAction(validInput);

    expect(result).toEqual({ success: true });
    expect(rpcMock).toHaveBeenCalledWith('submit_collaborator', {
      p_email: 'teacher@school.edu.au',
      p_name: 'Alex Reid',
      p_school: 'Northside High',
      p_country: null,
      p_year_levels: 'Year 9 and Year 10',
      p_subjects: null,
      p_message: 'Happy to try the balancer with 9C.',
      // No request cookie in a unit test, so the default locale.
      p_locale: 'en',
      p_client_hash: sha256(`${SALT}:${CLIENT_IP}`),
    });
  });

  it('never sends a user id: the database reads auth.uid() itself', async () => {
    await submitCollaboratorAction(validInput);
    expect(Object.keys(lastRpcArgs())).not.toContain('p_user_id');
  });

  it('never stores the raw IP', async () => {
    await submitCollaboratorAction(validInput);
    expect(JSON.stringify(lastRpcArgs())).not.toContain(CLIENT_IP);
  });

  describe('the honeypot', () => {
    it('pretends to succeed without touching the database or email', async () => {
      const result = await submitCollaboratorAction({
        ...validInput,
        website: 'http://spam.example',
      });

      expect(result).toEqual({ success: true });
      expect(createClientMock).not.toHaveBeenCalled();
      expect(rpcMock).not.toHaveBeenCalled();
      expect(sendMock).not.toHaveBeenCalled();
    });
  });

  describe('validation', () => {
    it('rejects a missing address before touching the database, and names the field', async () => {
      const result = await submitCollaboratorAction({ ...validInput, email: '  ' });

      expect(result).toEqual({
        success: false,
        error: m.collaboratorEmailRequired,
        field: 'email',
      });
      expect(rpcMock).not.toHaveBeenCalled();
    });

    it('rejects an over-long optional field, and names that field', async () => {
      const result = await submitCollaboratorAction({
        ...validInput,
        school: 'x'.repeat(500),
      });

      expect(result.success).toBe(false);
      expect(result.field).toBe('school');
      expect(rpcMock).not.toHaveBeenCalled();
    });
  });

  describe('what the database says back', () => {
    it('maps PT429 to the rate-limit message, and sends no email', async () => {
      rpcMock.mockResolvedValue({
        data: null,
        error: {
          code: 'PT429',
          message: 'collaborator_rate_limited',
          details: '',
          hint: 'Hourly collaborator sign-up limit reached.',
        },
      });

      const result = await submitCollaboratorAction(validInput);

      expect(result).toEqual({ success: false, error: m.collaboratorRateLimited });
      expect(sendMock).not.toHaveBeenCalled();
    });

    it('maps PT400 back to the email field, because the two validators disagreed', async () => {
      rpcMock.mockResolvedValue({
        data: null,
        error: { code: 'PT400', message: 'collaborator_invalid_email', details: '', hint: '' },
      });

      const result = await submitCollaboratorAction(validInput);

      expect(result).toEqual({
        success: false,
        error: m.collaboratorEmailInvalid,
        field: 'email',
      });
      expect(sendMock).not.toHaveBeenCalled();
    });

    it('reports any other failure rather than falling through to an email', async () => {
      // The database is the rate limiter. A failed store must not become an
      // unthrottled email, which is the hole feedback.ts closes the same way.
      rpcMock.mockResolvedValue({
        data: null,
        error: { code: '42P01', message: 'relation does not exist', details: '', hint: '' },
      });

      const result = await submitCollaboratorAction(validInput);

      expect(result).toEqual({ success: false, error: m.collaboratorStoreFailed });
      expect(sendMock).not.toHaveBeenCalled();
    });

    it('fails rather than pretending, when Supabase is not configured at all', async () => {
      // Unlike feedback, there is no email-only fallback: the point of the
      // feature is the row, and an inbox is what it exists to replace.
      createClientMock.mockResolvedValue(null);

      const result = await submitCollaboratorAction(validInput);

      expect(result).toEqual({ success: false, error: m.collaboratorUnconfigured });
      expect(sendMock).not.toHaveBeenCalled();
    });
  });

  describe('the maintainer notification', () => {
    it('goes to the maintainer and never to the teacher', async () => {
      await submitCollaboratorAction(validInput);

      const email = sendMock.mock.calls.at(-1)?.[0];
      expect(email.to).toEqual([RECIPIENT]);
      // The form promises no confirmation, so none may be sent.
      expect(JSON.stringify(email.to)).not.toContain('teacher@school.edu.au');
      expect(email.text).toContain('teacher@school.edu.au');
    });

    it('escapes the teacher-supplied values in the HTML it puts in an inbox', async () => {
      await submitCollaboratorAction({
        ...validInput,
        school: '<script>alert(1)</script>',
      });

      const email = sendMock.mock.calls.at(-1)?.[0];
      expect(email.html).not.toContain('<script>');
      expect(email.html).toContain('&lt;script&gt;');
    });

    it('still succeeds, with a warning, when the notification cannot be sent', async () => {
      // The row is saved, which is what was promised. A broken Resend key is
      // the maintainer's problem, not the teacher's.
      sendMock.mockResolvedValue({ data: null, error: { name: 'x', message: 'nope' } });

      const result = await submitCollaboratorAction(validInput);

      expect(result.success).toBe(true);
      expect(result.warning).toBeTruthy();
    });

    it('is skipped, with a warning, when Resend is not configured', async () => {
      vi.stubEnv('RESEND_API_KEY', '');

      const result = await submitCollaboratorAction(validInput);

      expect(result.success).toBe(true);
      expect(result.warning).toMatch(/not configured/i);
      expect(sendMock).not.toHaveBeenCalled();
    });
  });

  it('returns a generic message rather than throwing when something unexpected happens', async () => {
    createClientMock.mockRejectedValue(new Error('boom'));

    const result = await submitCollaboratorAction(validInput);

    expect(result).toEqual({ success: false, error: m.collaboratorStoreFailed });
  });
});
