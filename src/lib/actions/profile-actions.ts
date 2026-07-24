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

    // 1. Extract string fields (THIS IS THE MISSING BLOCK)
    const title = formData.get('title') as string;
    const country = formData.get('country') as string;
    const yearLevel = formData.get('yearLevel') as string;
    const labNotes = (formData.get('labNotes') as string) || '';

    // 2. Extract boolean privacy toggles
    const showCountry = formData.get('showCountry') === 'on';
    const showYearLevel = formData.get('showYearLevel') === 'on';
    const showLabNotes = formData.get('showLabNotes') === 'on';
    const showTotalSyntheses = formData.get('showTotalSyntheses') === 'on';
    const showAccuracy = formData.get('showAccuracy') === 'on';
    const showCurrentStreak = formData.get('showCurrentStreak') === 'on';

    // 3. Send the properly formatted data to Supabase
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
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Database update error:', updateError);
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
