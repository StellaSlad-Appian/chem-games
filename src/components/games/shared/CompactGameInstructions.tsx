// src/components/games/shared/CompactGameInstructions.tsx
'use client';

import CompactInstructions from '@/components/games/shared/CompactInstructions';
import { useI18n } from '@/i18n/client';
import type { InputMethod } from '@/hooks/useInputMethod';

/**
 * The phone instructions for the three games whose copy still lives in the
 * shared dictionary — Acid or Base?, Formula Blaster and Neutralise!
 *
 * Reaction Balancer and Share to Fill have their own per-game catalogues and
 * their own compact components; these three do not, and extracting their
 * inline instruction JSX out of their pages is a bigger refactor than a
 * mobile fix should carry. So the short copy lives in the dictionary beside
 * the long copy, and this one component reads whichever game is asking.
 */

export function AcidCompactInstructions() {
  const { t } = useI18n();
  return (
    <CompactInstructions
      lead={t.games.acidClassification.instructionsSubtitle}
      bullets={t.games.acidClassification.instructionsCompact}
      inputMethod="touch"
    />
  );
}

export function BlasterCompactInstructions() {
  const { t } = useI18n();
  return (
    <CompactInstructions
      lead={t.games.formulaBlaster.instructionsIntro}
      bullets={t.games.formulaBlaster.instructionsCompact}
      inputMethod="touch"
    />
  );
}

export function NeutraliseCompactInstructions({ tab }: { tab: InputMethod }) {
  const { t } = useI18n();
  const N = t.games.neutralise;

  // Neutralise is the one of the three with a control list, and it is built
  // from single keys rather than an array, so the rows are assembled here.
  const controls: Array<[string, string]> =
    tab === 'pointer'
      ? [
          [N.keyOneLabel, N.keyOneText.replace('{ion}', N.keyOneIon)],
          [N.keyTwoLabel, N.keyTwoText.replace('{ion}', N.keyTwoIon)],
          [N.keySpaceLabel, N.keySpaceText],
          [N.keyArrowsLabel, N.keyArrowsText],
        ]
      : [
          // The touch rows matter more than the keyboard ones here, not less:
          // a phone player cannot discover "drag to aim" by looking at it.
          [N.touchDragLabel, N.touchDragText],
          [N.touchFireLabel, N.touchFireText.replace('{button}', N.fire)],
          [N.touchSwitchLabel, N.touchSwitchText],
        ];

  return (
    <CompactInstructions
      lead={N.instructionsIntro}
      bullets={N.instructionsCompact}
      controls={controls}
      controlsLabel={
        tab === 'pointer' ? t.games.shared.keyboardAndMouse : t.games.shared.touchscreen
      }
      inputMethod={tab}
    />
  );
}
