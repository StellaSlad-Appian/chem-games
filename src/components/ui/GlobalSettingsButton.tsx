// src/components/layout/GlobalSettingsButton.tsx
'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import GameSettingsModal from '../games/shared/GameSettingsModal';
import { useI18n } from '@/i18n/client';

/**
 * `isAuthenticated` is optional because only the header knows it. When it is
 * absent — which is every in-game use of the settings modal — the Account
 * section renders nothing rather than guessing.
 */
export function GlobalSettingsButton({ isAuthenticated }: { isAuthenticated?: boolean }) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    // 1. Add relative positioning to anchor the popover
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-(--border) bg-(--surface)/90 p-2.5 text-(--foreground) shadow-sm backdrop-blur transition hover:border-(--link)"
        aria-label={t.nav.settingsA11y}
      >
        <Settings className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* 2. Pass the popover variant */}
      <GameSettingsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant="popover"
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}