// src/components/auth/AuthButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { useI18n } from '@/i18n/client';

export function AuthButton({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();
  const { t, href } = useI18n();
  const [isPending, setIsPending] = useState(false);

  if (!isAuthenticated) {
    return (
      <LocaleLink
        href="/auth"
        className="whitespace-nowrap rounded-full border-2 border-(--border) bg-(--surface) px-5 py-2 text-sm font-bold text-(--link) transition hover:border-(--link)"
      >
        {t.nav.login}
      </LocaleLink>
    );
  }

  async function signOut() {
    setIsPending(true);
    try {
      const supabase = createClient();
      if (!supabase) {
        console.error('⚠️ [Games in Chemistry Auth]: Supabase client is unconfigured.');
        return;
      }

      await supabase.auth.signOut();
      router.refresh();
      router.push(href('/'));
    } catch (err) {
      console.error('Unexpected error signing out:', err);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={isPending}
      className="whitespace-nowrap rounded-full border-2 border-(--border) bg-(--surface) px-5 py-2 text-sm font-bold text-(--foreground) transition hover:border-(--danger) hover:text-(--danger) disabled:opacity-60"
    >
      {isPending ? t.nav.loggingOut : t.nav.logout}
    </button>
  );
}
