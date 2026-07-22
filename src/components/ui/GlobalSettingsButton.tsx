// src/components/layout/GlobalSettingsButton.tsx
'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import GameSettingsModal from '../games/shared/GameSettingsModal';

export function GlobalSettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    // 1. Add relative positioning to anchor the popover
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-(--border) bg-(--surface)/90 p-2.5 text-(--foreground) shadow-sm backdrop-blur transition hover:border-blue-400"
        aria-label="Open general settings"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* 2. Pass the popover variant */}
      <GameSettingsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant="popover"
      />
    </div>
  );
}