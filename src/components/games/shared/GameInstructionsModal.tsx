// src/components/games/shared/GameInstructionsModal.tsx
'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useI18n } from '@/i18n/client';

interface GameInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function GameInstructionsModal({ isOpen, onClose, title, children }: GameInstructionsModalProps) {
  const { t } = useI18n();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          {/* German instruction titles ("Spielanleitung: Reaktions-Balancer")
              are much longer than the English ones, so the wide letter-spacing
              only applies from sm up and the heading may wrap. */}
          <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide sm:tracking-widest">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label={t.settings.closeA11y}
            className="shrink-0 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="prose prose-invert prose-sm">
          {children}
        </div>
        <button 
          onClick={onClose}
          className="mt-8 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors"
        >
          {t.games.shared.gotIt}
        </button>
      </div>
    </div>
  );
}