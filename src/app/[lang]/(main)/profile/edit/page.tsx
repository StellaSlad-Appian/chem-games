// src/app/[lang]/(main)/profile/edit/page.tsx

import { redirect } from 'next/navigation';
import { AccountDangerZone } from '@/components/profile/AccountDangerZone';
import { EditProfileForm } from '@/components/profile/EditProfileForm';
import { toUserProfile } from '@/lib/profile';
import { createClient } from '@/lib/supabase/server';
import { getDictionary } from '@/i18n/dictionaries';
import { localizePath } from '@/i18n/routing';
import { DEFAULT_LOCALE, isLocale } from '@/i18n/config';

export default async function EditProfilePage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const supabase = await createClient();

  // 1. Guard against null or unconfigured Supabase instance
  if (!supabase) {
    redirect(localizePath('/auth', locale));
  }

  // 2. Validate current session user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(localizePath('/auth', locale));
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
        <div className="mx-auto max-w-xl rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md">
          <h1 className="text-xl font-black text-(--danger)">{t.profile.editMissingTitle}</h1>
          <p className="mt-2 text-sm font-medium text-(--muted)">{t.profile.editMissingBody}</p>
        </div>
      </main>
    );
  }

  const userProfile = toUserProfile(data);

  return (
    <main className="min-h-screen bg-(--background) px-4 py-12 text-(--foreground) md:px-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <EditProfileForm initialData={userProfile} />
        <AccountDangerZone />
      </div>
    </main>
  );
}
