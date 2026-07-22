'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function AuthButton({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  if (!isAuthenticated) {
    return <Link href="/auth" className="rounded-lg border border-(--border) bg-[var(--surface)]/90 px-4 py-2 text-sm font-bold text-[var(--foreground)] shadow-sm backdrop-blur transition hover:border-blue-400">Log in / Register</Link>;
  }

  async function signOut() {
    setIsPending(true);
    try {
      await createClient().auth.signOut();
      router.refresh();
      router.push('/');
    } finally {
      setIsPending(false);
    }
  }

  return <button type="button" onClick={signOut} disabled={isPending} className="rounded-lg border border-(--border) bg-(--surface)/90 px-4 py-2 text-sm font-bold text-(--foreground) shadow-sm backdrop-blur transition hover:border-red-400 disabled:opacity-60">{isPending ? 'Logging out…' : 'Log out'}</button>;
}
