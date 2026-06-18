// src/app/[locale]/layout.tsx
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { GameSettingsProvider } from '../context/game-settings-context';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  
  // Validate that the incoming locale is supported
  const supportedLocales = ['en', 'de'];
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        {/* Wrap game interactive state cleanly inside the localized layout */}
        <GameSettingsProvider>
          {children}
        </GameSettingsProvider>
      </body>
    </html>
  );
}
