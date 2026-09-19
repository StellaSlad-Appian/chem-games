// src/lib/actions/collaborator.ts
'use server';

import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { escapeHtml } from '@/lib/utils/escape-html';
import { getClientHash } from '@/lib/utils/client-hash';
import { getRequestDictionary, getRequestLocale } from '@/i18n/server';
import { isHoneypotFilled } from '@/lib/validation/feedback';
import {
  validateCollaborator,
  type CollaboratorField,
  type ValidatedCollaborator,
} from '@/lib/validation/collaborator';

// No `export type` re-exports here, for the reason spelled out at the top of
// feedback.ts: Next's server-actions loader re-exports every name of a
// 'use server' module at runtime, so a type-only re-export becomes a
// ReferenceError that takes the whole module's other actions down with it.
// Import the types from '@/lib/validation/collaborator' instead.

export interface SubmitCollaboratorInput {
  email: string;
  name?: string;
  school?: string;
  country?: string;
  yearLevels?: string;
  subjects?: string;
  message?: string;
  /** Honeypot. The real form always submits an empty string; bots fill it. */
  website?: string;
}

export interface CollaboratorActionResult {
  success: boolean;
  error?: string;
  /** Which input the error belongs to, so the form can point `aria-describedby` at it. */
  field?: CollaboratorField;
  warning?: string;
}

// Raised by public.submit_collaborator
// (see supabase/migrations/20260919_create_collaborators.sql).
const RATE_LIMIT_SQLSTATE = 'PT429';
const RATE_LIMIT_MARKER = 'collaborator_rate_limited';
const INVALID_SQLSTATE = 'PT400';

// Operator diagnostics, English on purpose and for the same reason the
// feedback ones are: they only appear when Supabase or Resend is
// misconfigured, and they are read by whoever is fixing the deployment.
const CLIENT_MESSAGES = {
  emailSkipped:
    'Sign-up recorded in database, but the maintainer notification was skipped (email delivery is not configured).',
  emailFailedAfterStore: 'Saved to database, but the maintainer notification failed.',
} as const;

type StoreOutcome = 'stored' | 'unconfigured' | 'rate_limited' | 'invalid' | 'failed';
type EmailOutcome = 'sent' | 'unconfigured' | 'failed';

async function storeCollaborator(
  collaborator: ValidatedCollaborator,
  locale: string,
  clientHash: string
): Promise<StoreOutcome> {
  let supabase: Awaited<ReturnType<typeof createClient>>;
  try {
    supabase = await createClient();
  } catch (err) {
    console.error('[ChemGames] Supabase client initialisation failed:', err);
    return 'failed';
  }

  if (!supabase) {
    console.warn('[ChemGames] Supabase is not configured; the sign-up will not be stored.');
    return 'unconfigured';
  }

  // `user_id` is deliberately not sent. The database function reads
  // auth.uid() itself, so a caller cannot attach their sign-up to someone
  // else's account.
  const { error } = await supabase.rpc('submit_collaborator', {
    p_email: collaborator.email,
    p_name: collaborator.name,
    p_school: collaborator.school,
    p_country: collaborator.country,
    p_year_levels: collaborator.yearLevels,
    p_subjects: collaborator.subjects,
    p_message: collaborator.message,
    p_locale: locale,
    p_client_hash: clientHash,
  });

  if (!error) return 'stored';

  if (error.code === RATE_LIMIT_SQLSTATE || error.message?.includes(RATE_LIMIT_MARKER)) {
    return 'rate_limited';
  }
  // The action validated already, so a PT400 here means the two validators
  // disagree — worth a distinct outcome so the log says which one to fix.
  if (error.code === INVALID_SQLSTATE) {
    console.error('[ChemGames] submit_collaborator rejected input the action accepted:', error.message);
    return 'invalid';
  }

  console.error('[ChemGames] Storing the collaborator sign-up failed:', error.code, error.message);
  return 'failed';
}

/**
 * Tells the maintainer a teacher signed up, so a sign-up is not something you
 * have to remember to go and look for.
 *
 * This is the *only* email this feature sends. Nothing is ever sent to the
 * teacher: the form does not say a confirmation is coming, so none may
 * arrive. A surprise email from a site a teacher just met is the wrong first
 * impression, and it would also make the form a way of emailing strangers.
 */
async function sendCollaboratorEmail(
  collaborator: ValidatedCollaborator,
  locale: string
): Promise<EmailOutcome> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.FEEDBACK_RECIPIENT_EMAIL;

  if (!apiKey || !recipientEmail) {
    console.warn(
      `[ChemGames] Collaborator notification skipped: ${!apiKey ? 'RESEND_API_KEY' : 'FEEDBACK_RECIPIENT_EMAIL'} is not set.`
    );
    return 'unconfigured';
  }

  const rows: Array<[string, string]> = [
    ['Email', collaborator.email],
    ['Name', collaborator.name ?? '—'],
    ['School', collaborator.school ?? '—'],
    ['Country', collaborator.country ?? '—'],
    ['Year levels', collaborator.yearLevels ?? '—'],
    ['Subjects', collaborator.subjects ?? '—'],
    ['Language', locale],
  ];

  // Every interpolated value is attacker-controlled and this HTML is rendered
  // in the maintainer's inbox, so all of it is escaped.
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #f8fafc; color: #0f172a; border-radius: 12px; max-width: 600px;">
      <h2 style="color: #3b82f6; margin-top: 0; font-weight: 800;">New ChemGames teacher collaborator</h2>
      ${rows
        .map(
          ([label, value]) =>
            `<p style="font-size: 14px; margin: 6px 0;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
        )
        .join('')}
      ${
        collaborator.message
          ? `<div style="margin-top: 16px; padding: 16px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0;">
        <p style="font-size: 14px; white-space: pre-wrap; margin: 0; color: #334155;">${escapeHtml(collaborator.message)}</p>
      </div>`
          : ''
      }
    </div>
  `;

  const text = [
    'New ChemGames teacher collaborator',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    collaborator.message ?? '',
  ].join('\n');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'ChemGames Collaborators <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: '[ChemGames] New teacher collaborator sign-up',
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
 * Server Action for the teacher collaborator sign-up on the For Teachers page.
 *
 * A public endpoint, so it validates everything itself, hashes the caller's IP
 * for the rate limit the database function enforces, and only ever returns
 * messages that are safe for a browser to see. Unlike the feedback action it
 * has no email-only fallback: the whole point of the feature is the row in the
 * table, so if the database is not there, the sign-up did not happen and the
 * teacher is told so rather than quietly dropped into an inbox.
 */
export async function submitCollaboratorAction(
  input: SubmitCollaboratorInput
): Promise<CollaboratorActionResult> {
  // The locale comes from the cookie the proxy maintains; a Server Action has
  // no route params of its own. See src/i18n/server.ts. It is both the
  // language of the error strings below and the language recorded against the
  // sign-up, so the maintainer writes back in the language they signed up in.
  const locale = await getRequestLocale();
  const t = await getRequestDictionary();
  const m = t.serverMessages;

  try {
    // Bots fill the hidden field; pretend it worked and drop the submission.
    if (isHoneypotFilled(input?.website)) {
      return { success: true };
    }

    const validation = validateCollaborator(input, {
      emailRequired: m.collaboratorEmailRequired,
      emailInvalid: m.collaboratorEmailInvalid,
      tooLong: m.collaboratorTooLong,
    });
    if (!validation.ok) {
      return { success: false, error: validation.error, field: validation.field };
    }
    const collaborator = validation.value;

    const clientHash = await getClientHash('collaborator rate limiting');
    const stored = await storeCollaborator(collaborator, locale, clientHash);

    if (stored === 'rate_limited') {
      return { success: false, error: m.collaboratorRateLimited };
    }
    if (stored === 'invalid') {
      return { success: false, error: m.collaboratorEmailInvalid, field: 'email' };
    }
    if (stored === 'unconfigured') {
      return { success: false, error: m.collaboratorUnconfigured };
    }
    // The database is the rate limiter, so a failed store must not fall
    // through to an unthrottled email.
    if (stored === 'failed') {
      return { success: false, error: m.collaboratorStoreFailed };
    }

    const emailed = await sendCollaboratorEmail(collaborator, locale);
    if (emailed === 'sent') return { success: true };

    // The row is in the table, which is the thing that was promised. A failed
    // notification is the maintainer's problem, not the teacher's, so it is a
    // warning on a successful result rather than an error on a failed one.
    return {
      success: true,
      warning:
        emailed === 'unconfigured'
          ? CLIENT_MESSAGES.emailSkipped
          : CLIENT_MESSAGES.emailFailedAfterStore,
    };
  } catch (err) {
    console.error('[ChemGames] Failed to submit the collaborator sign-up:', err);
    return { success: false, error: m.collaboratorUnexpected };
  }
}
