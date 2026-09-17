// src/components/games/shared/GameFooter.tsx
'use client';

import { HelpCircle, Settings, Pause, Play } from 'lucide-react';

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
  return (
    <footer className="w-full max-w-3xl mx-auto grid grid-cols-3 items-center p-4 mt-auto shrink-0 z-50">
      
      {/* LEFT: Instructions (Icon Only) */}
      <div className="flex justify-start">
        {onOpenInstructions && (
          <button 
            onClick={onOpenInstructions}
            className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-full transition-all cursor-pointer"
            title="How to Play"
            aria-label="How to Play"
            type="button"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        )}
      </div>
      
      {/* CENTER: Pause / Play Toggle */}
      <div className="flex justify-center">
        {onTogglePause && (
          <button
            onClick={onTogglePause}
            className="bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-2xl transition-all shadow-md active:scale-95 border-2 border-slate-700 cursor-pointer"
            title={isPaused ? "Resume Game" : "Pause Game"}
            aria-label={isPaused ? "Resume Game" : "Pause Game"}
            type="button"
          >
            {isPaused ? (
              <Play className="w-5 h-5 fill-emerald-400 text-emerald-400" />
            ) : (
              <Pause className="w-5 h-5 fill-amber-400 text-amber-400" />
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
            title="Settings"
            aria-label="Settings"
            type="button"
          >
            <Settings className="w-6 h-6" />
          </button>
        )}
      </div>
      
    </footer>
  );
}