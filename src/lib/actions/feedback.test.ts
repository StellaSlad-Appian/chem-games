/**
 * Tests for the feedback server action. Next's request headers, the Supabase
 * server client and Resend are all mocked so the action's own behaviour can
 * be asserted: the honeypot short-circuit, validation, IP hashing, the RPC
 * call, rate-limit handling and the generic client-facing messages.
 */
import { createHash } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { submitFeedbackAction, type SubmitFeedbackInput } from './feedback';

const { headersMock, createClientMock, getUserMock, rpcMock, sendMock } = vi.hoisted(() => ({
  headersMock: vi.fn(),
  createClientMock: vi.fn(),
  getUserMock: vi.fn(),
  rpcMock: vi.fn(),
  sendMock: vi.fn(),
}));

vi.mock('next/headers', () => ({ headers: headersMock }));
vi.mock('@/lib/supabase/server', () => ({ createClient: createClientMock }));
vi.mock('resend', () => ({
  Resend: class ResendMock {
    emails = { send: sendMock };
  },
}));

const CLIENT_IP = '203.0.113.7';
const SALT = 'unit-test-salt';
const RECIPIENT = 'maintainer@example.com';

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

const validInput: SubmitFeedbackInput = {
  type: 'chemistry',
  message: '  NaCl is listed as an acid  ',
  pageUrl: '/games/acid-classification',
  website: '',
};

function lastRpcArgs(): Record<string, unknown> {
  return rpcMock.mock.calls.at(-1)?.[1] as Record<string, unknown>;
}

function lastEmail(): { to: string[]; subject: string; html: string; text: string } {
  return sendMock.mock.calls.at(-1)?.[0];
}

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  vi.spyOn(console, 'error').mockImplementation(() => undefined);

  vi.stubEnv('RESEND_API_KEY', 're_test_key');
  vi.stubEnv('FEEDBACK_RECIPIENT_EMAIL', RECIPIENT);
  vi.stubEnv('FEEDBACK_HASH_SALT', SALT);
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co');

  headersMock.mockResolvedValue(new Headers({ 'x-forwarded-for': `${CLIENT_IP}, 10.0.0.1` }));
  getUserMock.mockResolvedValue({ data: { user: null }, error: null });
  rpcMock.mockResolvedValue({ data: 'feedback-id', error: null });
  createClientMock.mockResolvedValue({ auth: { getUser: getUserMock }, rpc: rpcMock });
  sendMock.mockResolvedValue({ data: { id: 'email-id' }, error: null });
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('submitFeedbackAction', () => {
  describe('honeypot', () => {
    it('pretends to succeed without touching the database, headers or email', async () => {
      const result = await submitFeedbackAction({ ...validInput, website: 'http://spam.example' });

      expect(result).toEqual({ success: true });
      expect(headersMock).not.toHaveBeenCalled();
      expect(createClientMock).not.toHaveBeenCalled();
      expect(rpcMock).not.toHaveBeenCalled();
      expect(sendMock).not.toHaveBeenCalled();
    });

    it('treats whitespace as filled', async () => {
      await submitFeedbackAction({ ...validInput, website: ' ' });
      expect(rpcMock).not.toHaveBeenCalled();
    });
  });

  describe('validation', () => {
    it('rejects an unknown type before doing any work', async () => {
      const result = await submitFeedbackAction({
        ...validInput,
        type: 'spam',
      } as unknown as SubmitFeedbackInput);

      expect(result).toEqual({ success: false, error: 'Please choose a valid feedback category.' });
      expect(createClientMock).not.toHaveBeenCalled();
      expect(rpcMock).not.toHaveBeenCalled();
      expect(sendMock).not.toHaveBeenCalled();
    });

    it('rejects a blank message', async () => {
      const result = await submitFeedbackAction({ ...validInput, message: '   ' });
      expect(result).toEqual({ success: false, error: 'Please enter a message.' });
      expect(rpcMock).not.toHaveBeenCalled();
    });

    it('rejects an over-long message', async () => {
      const result = await submitFeedbackAction({ ...validInput, message: 'x'.repeat(2001) });
      expect(result.success).toBe(false);
      expect(result.error).toMatch(/too long/i);
      expect(rpcMock).not.toHaveBeenCalled();
    });

    it('survives a non-object payload', async () => {
      const result = await submitFeedbackAction(null as unknown as SubmitFeedbackInput);
      expect(result.success).toBe(false);
      expect(rpcMock).not.toHaveBeenCalled();
    });
  });

  describe('successful submission', () => {
    it('stores via the submit_feedback RPC with trimmed, normalised values', async () => {
      const result = await submitFeedbackAction(validInput);

      expect(result).toEqual({ success: true });
      expect(rpcMock).toHaveBeenCalledTimes(1);
      expect(rpcMock).toHaveBeenCalledWith('submit_feedback', {
        p_type: 'chemistry',
        p_message: 'NaCl is listed as an acid',
        p_page_url: '/games/acid-classification',
        p_client_hash: sha256(`${SALT}:${CLIENT_IP}`),
      });
    });

    it('never passes the raw IP or a user id to the database', async () => {
      await submitFeedbackAction(validInput);

      const serialised = JSON.stringify(rpcMock.mock.calls);
      expect(serialised).not.toContain(CLIENT_IP);
      expect(Object.keys(lastRpcArgs())).toEqual([
        'p_type',
        'p_message',
        'p_page_url',
        'p_client_hash',
      ]);
    });

    it('collapses an unsafe page URL to "/"', async () => {
      await submitFeedbackAction({ ...validInput, pageUrl: 'https://evil.example/phish' });
      expect(lastRpcArgs().p_page_url).toBe('/');
    });

    it('emails the configured recipient with both html and text bodies', async () => {
      await submitFeedbackAction(validInput);

      expect(sendMock).toHaveBeenCalledTimes(1);
      const email = lastEmail();
      expect(email.to).toEqual([RECIPIENT]);
      expect(email.subject).toBe('[ChemGames CHEMISTRY] New Feedback Submission');
      expect(email.html).toContain('NaCl is listed as an acid');
      expect(email.html).toContain('/games/acid-classification');
      expect(email.html).toContain('anonymous');
      expect(email.text).toContain('Category: chemistry');
      expect(email.text).toContain('Page URL: /games/acid-classification');
      expect(email.text).toContain('NaCl is listed as an acid');
    });

    it('escapes HTML in the message and page URL of the email', async () => {
      await submitFeedbackAction({
        ...validInput,
        message: '<img src=x onerror="fetch(\'https://evil.example\')"> & <script>alert(1)</script>',
      });

      const email = lastEmail();
      expect(email.html).not.toContain('<img');
      expect(email.html).not.toContain('<script>');
      expect(email.html).toContain('&lt;img src=x onerror=&quot;fetch(&#39;https://evil.example&#39;)&quot;&gt;');
      expect(email.html).toContain('&amp; &lt;script&gt;alert(1)&lt;/script&gt;');
      // The plain-text part carries the message verbatim; it is not rendered.
      expect(email.text).toContain('<script>alert(1)</script>');
    });

    it('mentions the signed-in user id in the email', async () => {
      getUserMock.mockResolvedValue({ data: { user: { id: 'user-123' } }, error: null });

      await submitFeedbackAction(validInput);

      expect(lastEmail().html).toContain('user-123');
      expect(lastEmail().text).toContain('Submitted by: user-123');
    });
  });

  describe('client hashing', () => {
    it('falls back to x-real-ip when x-forwarded-for is absent', async () => {
      headersMock.mockResolvedValue(new Headers({ 'x-real-ip': '198.51.100.9' }));

      await submitFeedbackAction(validInput);

      expect(lastRpcArgs().p_client_hash).toBe(sha256(`${SALT}:198.51.100.9`));
    });

    it('hashes "unknown" when no client address header is present', async () => {
      headersMock.mockResolvedValue(new Headers());

      await submitFeedbackAction(validInput);

      expect(lastRpcArgs().p_client_hash).toBe(sha256(`${SALT}:unknown`));
    });

    it('still submits if request headers are unavailable', async () => {
      headersMock.mockRejectedValue(new Error('headers() called outside a request scope'));

      const result = await submitFeedbackAction(validInput);

      expect(result).toEqual({ success: true });
      expect(lastRpcArgs().p_client_hash).toBe(sha256(`${SALT}:unknown`));
    });

    it('derives a fallback salt and warns when FEEDBACK_HASH_SALT is unset', async () => {
      vi.stubEnv('FEEDBACK_HASH_SALT', '');

      await submitFeedbackAction(validInput);

      const hash = lastRpcArgs().p_client_hash as string;
      expect(hash).toMatch(/^[0-9a-f]{64}$/);
      expect(hash).not.toBe(sha256(`${SALT}:${CLIENT_IP}`));
      expect(hash).not.toBe(sha256(CLIENT_IP));
    });
  });

  describe('rate limiting', () => {
    it('returns a generic message and sends no email when the RPC raises PT429', async () => {
      rpcMock.mockResolvedValue({
        data: null,
        error: { code: 'PT429', message: 'feedback_rate_limited', details: '', hint: 'Hourly feedback limit reached.' },
      });

      const result = await submitFeedbackAction(validInput);

      expect(result).toEqual({ success: false, error: 'Too many submissions, please try again later.' });
      expect(sendMock).not.toHaveBeenCalled();
    });

    it('recognises the rate-limit marker even without the SQLSTATE', async () => {
      rpcMock.mockResolvedValue({
        data: null,
        error: { code: 'P0001', message: 'feedback_rate_limited', details: '', hint: '' },
      });

      const result = await submitFeedbackAction(validInput);

      expect(result.error).toBe('Too many submissions, please try again later.');
      expect(sendMock).not.toHaveBeenCalled();
    });
  });

  describe('failures', () => {
    it('hides database errors and skips the email when the store fails', async () => {
      rpcMock.mockResolvedValue({
        data: null,
        error: {
          code: '42883',
          message: 'function public.submit_feedback(text, text, text, text) does not exist',
          details: '',
          hint: '',
        },
      });

      const result = await submitFeedbackAction(validInput);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Could not save your feedback right now. Please try again later.');
      expect(result.error).not.toContain('does not exist');
      expect(sendMock).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
    });

    it('hides Resend errors behind the stored-but-not-emailed warning', async () => {
      sendMock.mockResolvedValue({
        data: null,
        error: { name: 'validation_error', message: 'The onboarding@resend.dev domain is not verified.' },
      });

      const result = await submitFeedbackAction(validInput);

      expect(result).toEqual({ success: true, warning: 'Saved to database, but email dispatch failed.' });
      expect(JSON.stringify(result)).not.toContain('not verified');
    });

    it('stores the feedback but skips the email when FEEDBACK_RECIPIENT_EMAIL is unset', async () => {
      vi.stubEnv('FEEDBACK_RECIPIENT_EMAIL', '');

      const result = await submitFeedbackAction(validInput);

      expect(rpcMock).toHaveBeenCalledTimes(1);
      expect(sendMock).not.toHaveBeenCalled();
      expect(result).toEqual({ success: true, warning: expect.stringMatching(/email/i) });
    });

    it('stores the feedback but skips the email when RESEND_API_KEY is unset', async () => {
      vi.stubEnv('RESEND_API_KEY', '');

      const result = await submitFeedbackAction(validInput);

      expect(rpcMock).toHaveBeenCalledTimes(1);
      expect(sendMock).not.toHaveBeenCalled();
      expect(result).toEqual({ success: true, warning: expect.stringMatching(/email/i) });
    });

    it('returns a generic error if something throws unexpectedly', async () => {
      createClientMock.mockRejectedValue(new Error('cookies() was called outside a request scope'));

      const result = await submitFeedbackAction(validInput);

      expect(result).toEqual({
        success: false,
        error: 'Could not save your feedback right now. Please try again later.',
      });
      expect(JSON.stringify(result)).not.toContain('cookies()');
    });
  });

  describe('without Supabase configured', () => {
    beforeEach(() => {
      createClientMock.mockResolvedValue(null);
    });

    it('falls back to email only', async () => {
      const result = await submitFeedbackAction(validInput);

      expect(result).toEqual({ success: true });
      expect(rpcMock).not.toHaveBeenCalled();
      expect(sendMock).toHaveBeenCalledTimes(1);
    });

    it('reports the service as unconfigured when email is also unavailable', async () => {
      vi.stubEnv('RESEND_API_KEY', '');

      const result = await submitFeedbackAction(validInput);

      expect(result).toEqual({
        success: false,
        error: 'Feedback service is not currently configured in this environment.',
      });
    });
  });
});
