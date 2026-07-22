// src/app/profile/edit/page.tsx

import { redirect } from 'next/navigation';
import { EditProfileForm } from '@/components/profile/EditProfileForm';
import { toUserProfile } from '@/lib/profile';
import { createClient } from '@/lib/supabase/server';

export default async function EditProfilePage() {
  const supabase = await createClient();

  // 1. Guard against null or unconfigured Supabase instance
  if (!supabase) {
    redirect('/auth');
  }

  // 2. Validate current session user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  // 3. Fetch profile record from database
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !data) {
    return (
      <main className="min-h-screen bg-(--background) p-8 text-(--foreground)">
        <div className="mx-auto max-w-xl rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 shadow-md">
          <h1 className="text-xl font-black text-rose-500">Laboratory Record Not Found</h1>
          <p className="mt-2 text-sm font-medium text-(--muted)">
            We couldn't load your profile setup. Please try signing in again.
          </p>
        </div>
      </main>
    );
  }

  const userProfile = toUserProfile(data);

  return (
    <main className="min-h-screen bg-(--background) px-4 py-12 text-(--foreground) md:px-8">
      <div className="mx-auto max-w-2xl">
        <EditProfileForm initialData={userProfile} />
      </div>
    </main>
  );
}
