// src/app/(main)/layout.tsx
import { Sparkles } from 'lucide-react';
import { NavBar } from '@/components/layout/NavBar';
import { createClient } from '@/lib/supabase/server';

async function getAuthStatus() {
  try {
    const supabase = await createClient();
    if (!supabase) return false;
    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  } catch {
    return false;
  }
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await getAuthStatus();

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      
      <main className="flex-1">{children}</main>

      <footer className="border-t-2 border-(--border) bg-(--surface) py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <p className="text-xs font-bold text-(--muted)">
              ChemGames — Making chemistry visual, playful, and intuitive.
            </p>
          </div>
          <p className="text-xs font-medium text-(--muted)">
            &copy; {new Date().getFullYear()} ChemGames. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}