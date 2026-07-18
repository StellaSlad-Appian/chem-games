'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import GameSettingsModal from '../games/shared/GameSettingsModal';

export function GlobalSettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  return <><button type="button" onClick={() => setIsOpen(true)} className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/90 p-2.5 text-[var(--foreground)] shadow-sm backdrop-blur transition hover:border-blue-400" aria-label="Open general settings"><Settings className="h-5 w-5" /></button><GameSettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} /></>;
}
