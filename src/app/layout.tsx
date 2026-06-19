// src/app/layout.tsx
import { ReactNode } from 'react';
import { GameSettingsProvider } from '../context/game-settings-context';
import './globals.css'; 

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <GameSettingsProvider>
          {children}
        </GameSettingsProvider>
      </body>
    </html>
  );
}
