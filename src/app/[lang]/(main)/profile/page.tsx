// src/app/[lang]/(main)/profile/page.tsx

import { redirect } from 'next/navigation';
import { User, Settings, ArrowLeft } from 'lucide-react';
import { PublicProfile } from '@/components/social/PublicProfile';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { toUserProfile } from '@/lib/profile';
import { createClient } from '@/lib/supabase/server';
import { getDictionary } from '@/i18n/dictionaries';
import { localizePath } from '@/i18n/routing';
import { DEFAULT_LOCALE, isLocale } from '@/i18n/config';

export default async function ProfilePage(props: PageProps<'/[lang]'>) {
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

  // 3. Query user profile record
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !data) {
    return (
      <main className="min-h-screen bg-(--background) p-8 text-(--foreground)">
        <div className="mx-auto max-w-xl rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 shadow-md">
          <h1 className="text-xl font-black text-rose-500">{t.profile.missingTitle}</h1>
          <p className="mt-2 text-sm font-medium text-(--muted)">{t.profile.missingBody}</p>
          <LocaleLink
            href="/auth"
            className="mt-4 inline-block rounded-xl bg-(--action) px-4 py-2 text-xs font-black uppercase tracking-wider text-white"
          >
            {t.profile.missingAction}
          </LocaleLink>
        </div>
      </main>
    );
  }

  const userProfile = toUserProfile(data);

  return (
    <main className="min-h-screen bg-(--background) px-4 py-12 text-(--foreground) md:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header navigation bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <LocaleLink
            href="/"
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-(--muted) hover:text-(--link)"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.common.backToDashboard}
          </LocaleLink>
          <LocaleLink
            href="/profile/edit"
            className="flex items-center gap-2 rounded-xl bg-(--action) px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-(--action-hover) hover:scale-105"
          >
            <Settings className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.profile.edit}
          </LocaleLink>
        </div>

        {/* Profile Card View */}
        <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 shadow-md md:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-[var(--border)] pb-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-(--link)">
              <User className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-(--foreground)">{t.profile.heading}</h1>
              <p className="text-xs font-medium text-(--muted)">{t.profile.subheading}</p>
            </div>
          </div>

          <PublicProfile profile={userProfile} />
        </div>
      </div>
    </main>
  );
}
