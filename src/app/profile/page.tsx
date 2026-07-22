// src/app/profile/page.tsx

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, Settings, ArrowLeft } from 'lucide-react';
import { PublicProfile } from '@/components/ui/PublicProfile';
import { toUserProfile } from '@/lib/profile';
import { createClient } from '@/lib/supabase/server';

export default async function ProfilePage() {
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
          <h1 className="text-xl font-black text-rose-500">Laboratory Profile Missing</h1>
          <p className="mt-2 text-sm font-medium text-(--muted)">
            We couldn't retrieve your scientist record. Please sign in again or set up your profile.
          </p>
          <Link
            href="/auth"
            className="mt-4 inline-block rounded-xl bg-blue-500 px-4 py-2 text-xs font-black uppercase tracking-wider text-white"
          >
            Back to Authentication
          </Link>
        </div>
      </main>
    );
  }

  const userProfile = toUserProfile(data);

  return (
    <main className="min-h-screen bg-(--background) px-4 py-12 text-(--foreground) md:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header navigation bar */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-(--muted) hover:text-blue-500"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <Link
            href="/profile/edit"
            className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-blue-600 hover:scale-105"
          >
            <Settings className="h-4 w-4" /> Edit Configuration
          </Link>
        </div>

        {/* Profile Card View */}
        <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 shadow-md md:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-[var(--border)] pb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <User className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-(--foreground)">Scientist Overview</h1>
              <p className="text-xs font-medium text-(--muted)">Laboratory identity & public achievements</p>
            </div>
          </div>

          <PublicProfile profile={userProfile} />
        </div>
      </div>
    </main>
  );
}
