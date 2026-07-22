// src/lib/actions/feedback.ts
'use server';

import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

export type FeedbackType = 'bug' | 'chemistry' | 'feature';

export interface SubmitFeedbackInput {
  type: FeedbackType;
  message: string;
  pageUrl?: string;
}

export interface FeedbackActionResult {
  success: boolean;
  error?: string;
  warning?: string;
}

/**
 * Server Action to log user feedback to Supabase and dispatch an email via Resend.
 */
export async function submitFeedbackAction(
  input: SubmitFeedbackInput
): Promise<FeedbackActionResult> {
  const apiKey = process.env.RESEND_API_KEY;
  // Fall back to your account email in sandbox mode to avoid Resend verification errors
  const recipientEmail = process.env.FEEDBACK_RECIPIENT_EMAIL || 'stella.slad@gmail.com';

  let dbSuccess = false;

  // 1. Attempt Supabase Persistence
  try {
    const supabase = await createClient();

    if (supabase) {
      const { error: dbError } = await supabase.from('feedback').insert({
        type: input.type,
        message: input.message,
        page_url: input.pageUrl || '/',
        created_at: new Date().toISOString(),
      });

      if (dbError) {
        console.warn('⚠️ [ChemGames DB Warning]:', dbError.message, dbError.code);
      } else {
        dbSuccess = true;
      }
    }
  } catch (err) {
    console.warn('⚠️ Supabase client initialization skipped or failed:', err);
  }

  // 2. Email Dispatch Layer via Resend
  if (!apiKey) {
    console.warn('⚠️ [ChemGames] RESEND_API_KEY is not defined in environment variables.');

    if (dbSuccess) {
      return {
        success: true,
        warning: 'Feedback recorded in database, but email dispatch was skipped (unconfigured API key).',
      };
    }

    return {
      success: false,
      error: 'Feedback service is not currently configured in this environment.',
    };
  }

  try {
    const resend = new Resend(apiKey);

    const { error: resendError } = await resend.emails.send({
      from: 'ChemGames Feedback <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `[ChemGames ${input.type.toUpperCase()}] New Feedback Submission`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #f8fafc; color: #0f172a; border-radius: 12px; max-width: 600px;">
          <h2 style="color: #3b82f6; margin-top: 0; font-weight: 800;">New ChemGames Feedback</h2>
          <p style="font-size: 14px; margin: 6px 0;"><strong>Category:</strong> ${input.type}</p>
          <p style="font-size: 14px; margin: 6px 0;"><strong>Page URL:</strong> ${input.pageUrl || '/'}</p>
          <div style="margin-top: 16px; padding: 16px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="font-size: 14px; white-space: pre-wrap; margin: 0; color: #334155;">${input.message}</p>
          </div>
        </div>
      `,
    });

    if (resendError) {
      console.error('⚠️ Resend delivery failed:', resendError.message);
      
      if (dbSuccess) {
        return {
          success: true,
          warning: 'Saved to database, but email dispatch failed.',
        };
      }

      return {
        success: false,
        error: resendError.message,
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Failed to submit feedback action:', err);

    return {
      success: dbSuccess,
      error: dbSuccess ? undefined : 'An unexpected error occurred while processing feedback.',
    };
  }
}