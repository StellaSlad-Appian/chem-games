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
        className="whitespace-nowrap rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-black uppercase tracking-wider text-[var(--foreground)] shadow-sm transition hover:border-blue-500 hover:text-blue-500"
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
        console.error('⚠️ [ChemGames Auth]: Supabase client is unconfigured.');
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
      className="whitespace-nowrap rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-black uppercase tracking-wider text-[var(--foreground)] shadow-sm transition hover:border-rose-500 hover:text-rose-500 disabled:opacity-60"
    >
      {isPending ? t.nav.loggingOut : t.nav.logout}
    </button>
  );
}
