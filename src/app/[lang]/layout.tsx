// src/app/layout.tsx
import type { Metadata } from 'next';
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
          {children}
        </AppProviders>
      </body>
    </html>
  );
}