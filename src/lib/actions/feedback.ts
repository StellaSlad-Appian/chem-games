// src/app/actions/feedback.ts
'use server';

import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export type FeedbackType = 'bug' | 'chemistry' | 'feature';

export interface SubmitFeedbackPayload {
  type: FeedbackType;
  message: string;
  pageUrl?: string;
}

export async function submitFeedbackAction(payload: SubmitFeedbackPayload) {
  try {
    const supabase = await createClient();

    // 1. Get optional logged-in user context
    const { data: { user } } = await supabase.auth.getUser();

    // 2. Insert into Supabase
    const { error: dbError } = await supabase.from('feedback').insert({
      type: payload.type,
      message: payload.message,
      user_id: user?.id ?? null,
      page_url: payload.pageUrl ?? 'Unknown',
    });

    if (dbError) {
      console.error('Database Error:', dbError);
      return { success: false, error: 'Failed to record feedback in database.' };
    }

    // 3. Send notification email to Stella via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'ChemGames Feedback <onboarding@resend.dev>', // Replace with your verified domain in production
      to: 'stella.slad@gmail.com',
      subject: `🧪 ChemGames [${payload.type.toUpperCase()}]: New Feedback Received`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #2563eb;">New ChemGames Feedback Submitted</h2>
          <p><strong>Type:</strong> ${payload.type.toUpperCase()}</p>
          <p><strong>Page URL:</strong> ${payload.pageUrl || 'N/A'}</p>
          <p><strong>User ID:</strong> ${user?.id || 'Anonymous'}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="white-space: pre-wrap; background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">${payload.message}</p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Email Error:', emailError);
      // We don't fail the whole action if only the email fails, as DB insert succeeded.
    }

    return { success: true };
  } catch (error) {
    console.error('Server Action Error:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}