// src/components/auth/AuthButton.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function AuthButton({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  if (!isAuthenticated) {
    return (
      <Link
        href="/auth"
        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-black uppercase tracking-wider text-[var(--foreground)] shadow-sm transition hover:border-blue-500 hover:text-blue-500"
      >
        Log in / Register
      </Link>
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
      router.push('/');
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
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-black uppercase tracking-wider text-[var(--foreground)] shadow-sm transition hover:border-rose-500 hover:text-rose-500 disabled:opacity-60"
    >
      {isPending ? 'Logging out...' : 'Log out'}
    </button>
  );
}