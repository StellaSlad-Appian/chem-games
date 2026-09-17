// src/components/games/shared/GameFooter.tsx
'use client';

import { HelpCircle, Settings, Pause, Play } from 'lucide-react';
import { useI18n } from '@/i18n/client';

interface FooterProps {
  onOpenSettings?: () => void;
  onOpenInstructions?: () => void;
  isPaused?: boolean;
  onTogglePause?: () => void;
}

export default function GameFooter({ 
  onOpenSettings, 
  onOpenInstructions, 
  isPaused, 
  onTogglePause 
}: FooterProps) {
  const { t } = useI18n();
  return (
    <footer className="w-full max-w-3xl mx-auto grid grid-cols-3 items-center p-4 mt-auto shrink-0 z-50">
      
      {/* LEFT: Instructions (Icon Only) */}
      <div className="flex justify-start">
        {onOpenInstructions && (
          <button 
            onClick={onOpenInstructions}
            className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-full transition-all cursor-pointer"
            title={t.games.shared.howToPlay}
            aria-label={t.games.shared.howToPlay}
          >
            <HelpCircle className="w-6 h-6" aria-hidden="true" />
          </button>
        )}
      </div>
      
      {/* CENTER: Pause / Play Toggle */}
      <div className="flex justify-center">
        {onTogglePause && (
          <button
            onClick={onTogglePause}
            className="bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-2xl transition-all shadow-md active:scale-95 border-2 border-slate-700 cursor-pointer"
            title={isPaused ? t.games.shared.resume : t.games.shared.pause}
            aria-label={isPaused ? t.games.shared.resume : t.games.shared.pause}
          >
            {isPaused ? (
              <Play className="w-5 h-5 fill-emerald-400 text-emerald-400" aria-hidden="true" />
            ) : (
              <Pause className="w-5 h-5 fill-amber-400 text-amber-400" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {/* RIGHT: Settings (Icon Only) */}
      <div className="flex justify-end">
        {onOpenSettings && (
          <button 
            onClick={onOpenSettings}
            className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-full transition-all cursor-pointer"
            title={t.games.shared.settings}
            aria-label={t.games.shared.settings}
          >
            <Settings className="w-6 h-6" aria-hidden="true" />
          </button>
        )}
      </div>
      
    </footer>
  );
}