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
    <footer className="w-full grid grid-cols-3 items-center p-4 mt-auto shrink-0 z-50">
      
      {/* LEFT: Instructions */}
      <div className="flex justify-start">
        {onOpenInstructions && (
          <button 
            onClick={onOpenInstructions}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs font-mono font-bold tracking-wider">INSTRUCTIONS</span>
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
          >
            {isPaused ? (
              <Play className="w-5 h-5 fill-emerald-400 text-emerald-400" />
            ) : (
              <Pause className="w-5 h-5 fill-amber-400 text-amber-400" />
            )}
          </button>
        )}
      </div>

      {/* RIGHT: Settings */}
      <div className="flex justify-end">
        {onOpenSettings && (
          <button 
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <span className="text-xs font-mono font-bold tracking-wider">SETTINGS</span>
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
      
    </footer>
  );
}