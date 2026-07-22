// src/app/layout.tsx

import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { AppProviders } from '@/providers/app-providers';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'ChemGames | Interactive Chemistry Learning',
  description: 'Master chemistry concepts through fun, visual, and interactive mini-games and reference guides.',
  keywords: ['chemistry', 'education', 'games', 'molecules', 'reactions', 'titration', 'high school chemistry'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-(--background) font-sans text-(--foreground) antialiased selection:bg-blue-500 selection:text-white">
        <AppProviders>
          {/* Main Content Body (pages manage their header/nav or main wrapper) */}
          <main className="flex-1">{children}</main>

          {/* Global Footer */}
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
        </AppProviders>
      </body>
    </html>
  );
}