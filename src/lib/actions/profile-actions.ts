// src/lib/actions/profile-actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';

export type ProfileActionState = {
  status: 'success' | 'error';
  message: string;
} | null;

export async function updateProfileAction(
  _prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return {
        status: 'error',
        message: 'Database connection is currently unconfigured.',
      };
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        status: 'error',
        message: 'Please log in before editing your configuration.',
      };
    }

    const labNotes = formData.get('labNotes') as string;
    const showLabNotes = formData.get('showLabNotes') === 'on';
    const showTotalSyntheses = formData.get('showTotalSyntheses') === 'on';

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        title: title || null,
        country: country || null,
        year_level: yearLevel || null,
        lab_notes: labNotes,
        show_country: showCountry,
        show_year_level: showYearLevel,
        show_lab_notes: showLabNotes,
        show_total_syntheses: showTotalSyntheses,
        show_accuracy: showAccuracy,
        show_current_streak: showCurrentStreak,
        
        // NEW: Automatically stamp the update time
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      return {
        status: 'error',
        message: 'Failed to update lab configuration. Please try again.',
      };
    }

    return {
      status: 'success',
      message: 'Equipment configuration saved successfully!',
    };
  } catch (err) {
    console.error('Unexpected error during profile update:', err);
    return {
      status: 'error',
      message: 'An unexpected error occurred while saving changes.',
    };
  }
}
