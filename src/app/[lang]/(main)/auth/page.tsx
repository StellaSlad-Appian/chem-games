// src/app/[lang]/(main)/auth/page.tsx

import AuthForm from '@/components/auth/AuthForm';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { getDictionary } from '@/i18n/dictionaries';

export default async function AuthPage(props: PageProps<'/[lang]/auth'>) {
  const { lang } = await props.params;
  const { error } = await props.searchParams;
  const t = await getDictionary(lang);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-(--background) p-4 text-(--foreground)">
      {/* Top Navigation */}
      <LocaleLink
        href="/"
        className="absolute left-6 top-6 text-sm font-extrabold text-(--muted) transition hover:text-(--link)"
      >
        {t.auth.backToGames}
      </LocaleLink>

      {/* Main Form Container */}
      <div className="w-full max-w-md">
        <AuthForm
          configured={isSupabaseConfigured()}
          initialError={typeof error === 'string' ? error : undefined}
        />
      </div>
    </main>
  );
}
