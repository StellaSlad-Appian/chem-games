// src/app/auth/page.tsx

import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';
import { isSupabaseConfigured } from '@/lib/supabase/config';

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AuthPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-(--background) p-4 text-(--foreground)">
      {/* Top Navigation */}
      <Link
        href="/"
        className="absolute left-6 top-6 text-sm font-extrabold text-(--muted) transition hover:text-blue-500"
      >
        ← Back to games
      </Link>

      {/* Main Form Container */}
      <div className="w-full max-w-md">
        <AuthForm
          configured={isSupabaseConfigured()}
          initialError={error}
        />
      </div>
    </main>
  );
}