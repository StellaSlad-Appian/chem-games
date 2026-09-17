// src/lib/actions/feedback.ts
'use server';

import { createHash } from 'node:crypto';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { escapeHtml } from '@/lib/utils/escape-html';
import {
  isHoneypotFilled,
  validateFeedback,
  type FeedbackType,
  type ValidatedFeedback,
} from '@/lib/validation/feedback';

// No `export type` re-exports here: Next's server-actions loader re-exports every
// name of a 'use server' module at runtime, so a type-only export becomes
// `ReferenceError: FeedbackType is not defined` and takes recordGameSession
// down with it. Import FeedbackType from '@/lib/validation/feedback' instead.

export interface SubmitFeedbackInput {
  type: FeedbackType;
  message: string;
  pageUrl?: string;
  /** Honeypot. The real form always submits an empty string; bots fill it. */
  website?: string;
}

export interface FeedbackActionResult {
  success: boolean;
  error?: string;
  warning?: string;
}

// Raised by public.submit_feedback (see supabase/migrations/20260914_feedback_rate_limit.sql).
const RATE_LIMIT_SQLSTATE = 'PT429';
const RATE_LIMIT_MARKER = 'feedback_rate_limited';

// Everything the browser can see. Details go to the server log only.
const CLIENT_MESSAGES = {
  rateLimited: 'Too many submissions, please try again later.',
  unconfigured: 'Feedback service is not currently configured in this environment.',
  storeFailed: 'Could not save your feedback right now. Please try again later.',
  emailFailed: 'Could not deliver your feedback right now. Please try again later.',
  unexpected: 'An unexpected error occurred while processing feedback.',
  emailSkipped:
    'Feedback recorded in database, but email dispatch was skipped (email delivery is not configured).',
  emailFailedAfterStore: 'Saved to database, but email dispatch failed.',
} as const;

type StoreOutcome = 'stored' | 'unconfigured' | 'rate_limited' | 'failed';
type EmailOutcome = 'sent' | 'unconfigured' | 'failed';

let warnedAboutFallbackSalt = false;

function getHashSalt(): string {
  const configured = process.env.FEEDBACK_HASH_SALT;
  if (configured) return configured;

  if (!warnedAboutFallbackSalt) {
    warnedAboutFallbackSalt = true;
    console.warn(
      '[ChemGames] FEEDBACK_HASH_SALT is not set; deriving a fallback salt from NEXT_PUBLIC_SUPABASE_URL. Set FEEDBACK_HASH_SALT in production.'
    );
  }
  return `chem-games-feedback-fallback:${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''}`;
}

async function getClientIp(): Promise<string> {
  try {
    const requestHeaders = await headers();
    const forwardedFor = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (forwardedFor) return forwardedFor;

    const realIp = requestHeaders.get('x-real-ip')?.trim();
    if (realIp) return realIp;
  } catch (err) {
    console.error('[ChemGames] Could not read request headers for feedback rate limiting:', err);
  }
  return 'unknown';
}

// The raw IP is never stored: only a salted SHA-256 of it, which is enough to
// group submissions from one client for rate limiting.
async function getClientHash(): Promise<string> {
  const ip = await getClientIp();
  return createHash('sha256').update(`${getHashSalt()}:${ip}`).digest('hex');
}

async function storeFeedback(
  feedback: ValidatedFeedback,
  clientHash: string
): Promise<{ outcome: StoreOutcome; userId: string | null }> {
  let supabase: Awaited<ReturnType<typeof createClient>>;
  try {
    supabase = await createClient();
  } catch (err) {
    console.error('[ChemGames] Supabase client initialisation failed:', err);
    return { outcome: 'failed', userId: null };
  }

  if (!supabase) {
    console.warn('[ChemGames] Supabase is not configured; feedback will not be stored.');
    return { outcome: 'unconfigured', userId: null };
  }

  // Only used to annotate the notification email. The stored user_id comes
  // from auth.uid() inside the database function, so it cannot be spoofed.
  let userId: string | null = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {
    userId = null;
  }

  const { error } = await supabase.rpc('submit_feedback', {
    p_type: feedback.type,
    p_message: feedback.message,
    p_page_url: feedback.pageUrl,
    p_client_hash: clientHash,
  });

  if (!error) return { outcome: 'stored', userId };

  if (error.code === RATE_LIMIT_SQLSTATE || error.message?.includes(RATE_LIMIT_MARKER)) {
    return { outcome: 'rate_limited', userId };
  }

  console.error('[ChemGames] Storing feedback failed:', error.code, error.message);
  return { outcome: 'failed', userId };
}

async function sendFeedbackEmail(
  feedback: ValidatedFeedback,
  userId: string | null
): Promise<EmailOutcome> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.FEEDBACK_RECIPIENT_EMAIL;

  if (!apiKey || !recipientEmail) {
    console.warn(
      `[ChemGames] Feedback email skipped: ${!apiKey ? 'RESEND_API_KEY' : 'FEEDBACK_RECIPIENT_EMAIL'} is not set.`
    );
    return 'unconfigured';
  }

  const submittedBy = userId ?? 'anonymous';

  // Every interpolated value is escaped: the message and page URL are
  // attacker-controlled and this HTML is rendered in the maintainer's inbox.
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #f8fafc; color: #0f172a; border-radius: 12px; max-width: 600px;">
      <h2 style="color: #3b82f6; margin-top: 0; font-weight: 800;">New ChemGames Feedback</h2>
      <p style="font-size: 14px; margin: 6px 0;"><strong>Category:</strong> ${escapeHtml(feedback.type)}</p>
      <p style="font-size: 14px; margin: 6px 0;"><strong>Page URL:</strong> ${escapeHtml(feedback.pageUrl)}</p>
      <p style="font-size: 14px; margin: 6px 0;"><strong>Submitted by:</strong> ${escapeHtml(submittedBy)}</p>
      <div style="margin-top: 16px; padding: 16px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0;">
        <p style="font-size: 14px; white-space: pre-wrap; margin: 0; color: #334155;">${escapeHtml(feedback.message)}</p>
      </div>
    </div>
  `;

  const text = [
    'New ChemGames Feedback',
    '',
    `Category: ${feedback.type}`,
    `Page URL: ${feedback.pageUrl}`,
    `Submitted by: ${submittedBy}`,
    '',
    feedback.message,
  ].join('\n');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'ChemGames Feedback <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `[ChemGames ${feedback.type.toUpperCase()}] New Feedback Submission`,
      html,
      text,
    });

    if (error) {
      console.error('[ChemGames] Resend delivery failed:', error.name, error.message);
      return 'failed';
    }
    return 'sent';
  } catch (err) {
    console.error('[ChemGames] Resend delivery threw:', err);
    return 'failed';
  }
}

/**
 * Server Action to log user feedback to Supabase and dispatch an email via Resend.
 *
 * This is a public endpoint, so it validates everything itself, hashes the
 * caller's IP for rate limiting (enforced by the database function) and only
 * ever returns generic messages to the browser.
 */
export async function submitFeedbackAction(
  input: SubmitFeedbackInput
): Promise<FeedbackActionResult> {
  try {
    // Bots fill the hidden field; pretend it worked and drop the submission.
    if (isHoneypotFilled(input?.website)) {
      return { success: true };
    }

    const validation = validateFeedback(input);
    if (!validation.ok) {
      return { success: false, error: validation.error };
    }
    const feedback = validation.value;

    const clientHash = await getClientHash();
    const { outcome: stored, userId } = await storeFeedback(feedback, clientHash);

    if (stored === 'rate_limited') {
      return { success: false, error: CLIENT_MESSAGES.rateLimited };
    }
    // The database is the rate limiter, so a failed store must not fall
    // through to an unthrottled email.
    if (stored === 'failed') {
      return { success: false, error: CLIENT_MESSAGES.storeFailed };
    }

    const emailed = await sendFeedbackEmail(feedback, userId);

    if (stored === 'stored') {
      if (emailed === 'sent') return { success: true };
      return {
        success: true,
        warning:
          emailed === 'unconfigured'
            ? CLIENT_MESSAGES.emailSkipped
            : CLIENT_MESSAGES.emailFailedAfterStore,
      };
    }

    // Supabase is not configured (local development): email is the only channel.
    if (emailed === 'sent') return { success: true };
    return {
      success: false,
      error: emailed === 'unconfigured' ? CLIENT_MESSAGES.unconfigured : CLIENT_MESSAGES.emailFailed,
    };
  } catch (err) {
    console.error('[ChemGames] Failed to submit feedback:', err);
    return { success: false, error: CLIENT_MESSAGES.unexpected };
  }
}
