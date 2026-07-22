// src/providers/app-providers.tsx
'use client';

import React from 'react';
import { GameSettingsProvider } from '@/context/game-settings-context';
import { FeedbackWidget } from '@/components/ui/FeedbackWidget';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GameSettingsProvider>
      {children}
      <FeedbackWidget />
    </GameSettingsProvider>
  );
}