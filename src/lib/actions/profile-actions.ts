// src/lib/actions/profile-actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { validateProfileForm } from '@/lib/validation/profile';
import { getRequestDictionary } from '@/i18n/server';

export type ProfileActionState = {
  status: 'success' | 'error';
  message: string;
} | null;

export async function updateProfileAction(
  _prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  // A Server Action gets no route params, so the locale comes from the cookie
  // the proxy keeps in step with the path (src/i18n/server.ts).
  const t = await getRequestDictionary();

  try {
    const supabase = await createClient();

    if (!supabase) {
      return {
        status: 'error',
        message: t.serverMessages.profileUnconfigured,
      };
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        status: 'error',
        message: t.serverMessages.profileLoginRequired,
      };
    }

    // 1. Validate and normalise the text fields (pure, unit-tested in
    //    src/lib/validation/profile.ts). The alias is public, so it must never
    //    look like an email address; year level must be one of the form options.
    const validation = validateProfileForm(
      {
        alias: formData.get('alias'),
        title: formData.get('title'),
        country: formData.get('country'),
        yearLevel: formData.get('yearLevel'),
        labNotes: formData.get('labNotes'),
      },
      {
        aliasLength: t.serverMessages.aliasLength,
        aliasAtSign: t.serverMessages.aliasAtSign,
        yearLevelInvalid: t.serverMessages.yearLevelInvalid,
      }
    );

    if (!validation.ok) {
      return { status: 'error', message: validation.message };
    }

    const { alias, title, country, yearLevel, labNotes } = validation.value;

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
        alias,
        title,
        country,
        year_level: yearLevel,
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
        message: t.serverMessages.profileSaveFailed,
      };
    }

    return {
      status: 'success',
      message: t.serverMessages.profileSaved,
    };
  } catch (err) {
    console.error('Unexpected error during profile update:', err);
    return {
      status: 'error',
      message: t.serverMessages.profileUnexpected,
    };
  }
}
