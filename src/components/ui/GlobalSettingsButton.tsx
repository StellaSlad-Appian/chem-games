'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import GameSettingsModal from '../games/shared/GameSettingsModal';

export function GlobalSettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  return <><button type="button" onClick={() => setIsOpen(true)} className="absolute left-4 top-4 z-30 rounded-lg border border-slate-700 bg-slate-900/80 p-2.5 text-slate-200 backdrop-blur transition hover:border-blue-400 hover:text-white md:left-8 md:top-8" aria-label="Open general settings"><Settings className="h-5 w-5" /></button><GameSettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} /></>;
}
