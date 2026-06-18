// src/components/games/ErrorBanner.tsx
'use client';

import { useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface ErrorBannerProps {
  hint: string | null;
  onTimeout: () => void;
}

export default function ErrorBanner({ hint, onTimeout }: ErrorBannerProps) {
  useEffect(() => {
    if (!hint) return;

    // Clear banner layout after fixed duration (AC 4.4)
    const clock = setTimeout(() => {
      onTimeout();
    }, 3500);

    return () => clearTimeout(clock);
  }, [hint, onTimeout]);

  if (!hint) return null;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-40 animate-slide-in">
      <div className="bg-amber-950/90 border-2 border-amber-500/60 shadow-2xl backdrop-blur-md rounded-xl p-3.5 flex items-start gap-3 text-left">
        <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-0.5">
            Hint
          </h5>
          <p className="text-sm font-medium text-amber-100 leading-relaxed">{hint}</p>
        </div>
      </div>
    </div>
  );
}