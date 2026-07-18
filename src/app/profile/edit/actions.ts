'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export type ProfileActionState = { status: 'success' | 'error'; message: string } | null;

export async function updateProfileAction(_previousState: ProfileActionState, formData: FormData): Promise<ProfileActionState> {
  const labNotes = String(formData.get('labNotes') ?? '').trim();
  if (labNotes.length > 500) return { status: 'error', message: 'Lab notes must be 500 characters or fewer.' };

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { status: 'error', message: 'Please log in before editing your profile.' };

  const { error } = await supabase.from('profiles').update({
    lab_notes: labNotes,
    show_lab_notes: formData.get('showLabNotes') === 'on',
    show_total_syntheses: formData.get('showTotalSyntheses') === 'on',
  }).eq('id', user.id);

  if (error) return { status: 'error', message: 'Unable to save your configuration. Please try again.' };
  revalidatePath('/profile');
  revalidatePath('/profile/edit');
  return { status: 'success', message: 'Profile configuration saved.' };
}
