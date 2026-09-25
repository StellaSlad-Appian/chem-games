// src/core-engine/types/general.ts

import type { ChemIconName } from '@/components/ui/ChemIcon';
import type { ReactionType } from './chemistry';

// Re-export ChemIconName so other modules can import it directly from general.ts
export type { ChemIconName };

// --- Game Engine & Session Types ---

export type GameState = 'playing' | 'paused' | 'failed' | 'victory' | 'levelUp';

export type GameName = 
  | 'neutralise' 
  | 'formula-blaster' 
  | 'acid-classification' 
  | 'reaction-balancer'
  | 'bond-builder'
  | 'lewis-structures';

export interface PersonalScore {
  gameId: GameName;
  gameTitle: string;
  highestScore: number | null;
  globalRank: number | null;
  /** Title of the concept this game is primary for (from concept_games), if known. */
  conceptTitle?: string | null;
}

export interface LeaderboardEntry {
  id: string;
  alias: string;
  score: number;
  timestamp: string;
  /** Rank from the leaderboard_entries view (ties share a rank). */
  rank?: number;
}

export interface GameLeaderboard {
  gameId: GameName;
  gameTitle: string;
  entries: LeaderboardEntry[];
}

// --- User Profile & Account Types ---

export interface ChemicalTypeUserProfile {
  symbol: string;
  name: string;
  atomicNumber: number;
  group: 'alkali' | 'noble-gas' | 'transition-metal' | 'halogen' | 'nonmetal';
}

export interface ChemicalCompoundProfile {
  name: string;
  formula: string; 
}

export interface AchievementBadge {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface ProfilePrivacySettings {
  showLabNotes: boolean;
  showTotalSyntheses: boolean;
  showJoinedDate: boolean;
  showYearLevel: boolean;
  showCountry: boolean;
  showAccuracy: boolean;
  showCurrentStreak: boolean;
}

export type AccountType = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  alias: string;
  title?: string;
  country?: string; 
  yearLevel?: YearLevel;
  labNotes: string;
  favoriteElement: ChemicalTypeUserProfile | null;
  favoriteCompound?: ChemicalCompoundProfile | null;
  badges?: AchievementBadge[];
  currentStreak?: number;
  accuracy?: number;
  joinedDate: string;
  
  // NEW FIELDS HERE
  updatedAt?: string;
  isActive: boolean;
  accountType: AccountType;

  totalSyntheses: number;
  privacy: ProfilePrivacySettings;
}

export type ProfileActionState = {
  status: 'success' | 'error';
  message: string;
} | null;

// --- Feedback & Telemetry Types ---

export type FeedbackType = 'bug' | 'chemistry' | 'feature';

export interface SubmitFeedbackPayload {
  type: FeedbackType;
  message: string;
  pageUrl?: string;
}

export interface FeedbackRecord extends SubmitFeedbackPayload {
  id: string;
  created_at: string;
  user_id: string | null;
}

// --- Cheat Sheets Domain Types ---

export type YearLevel = 'Year 7' | 'Year 8' | 'Year 9' | 'Year 10' | 'Senior';

export type CheatSheetCategory =
  | 'Fundamentals'
  | 'Reactions'
  | 'Acids & Bases'
  | 'Equations'
  | 'Thermodynamics'
  | 'Organic'
  | 'Bonding'
  | 'Nomenclature'
  | 'Stoichiometry';

export interface FormulaExample {
  name: string;
  formula: string;
  description?: string;
}

/**
 * A diagram for one cheat-sheet section.
 *
 * `src` is a path under `public/`, so it is a URL and never translated.
 * `width` and `height` are the file's intrinsic pixel size and exist to reserve
 * the space before the image loads — without them the text below jumps down as
 * each diagram arrives, which is the layout shift docs/ACCESSIBILITY.md treats
 * as a defect rather than a cosmetic issue.
 *
 * `alt` is prose. The English lives here; every other locale overrides it
 * through `imageAlt` in the overlay, because an alt text that stays English on
 * a German page is the one part of an image a screen-reader user actually
 * reads.
 */
export interface CheatSheetImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * An interactive widget a section can opt into by name.
 *
 * The same idea as `iconName` and for the same reason: a widget *name* is
 * structural metadata, not prose, so it never enters the translation overlay
 * and `cheat-sheets.test.ts` is untouched by it. `WIDGET_REGISTRY` in the
 * cheat-sheet route maps each name to a component, exactly as `ICON_REGISTRY`
 * maps an icon name.
 *
 * The two periodic-table names are the same component with different modes
 * unlocked, not two components. The Year 9 sheet (VC2S10U07) teaches the
 * table itself and gets all six modes; the Year 10 sheet (VC2S10U06) teaches
 * decay and gets *natural or made* plus metals, with a link back. Encoding the
 * gating in the name keeps the sheet data declarative and leaves the registry
 * the only place a component is named — the alternative, a `widgetProps` bag
 * on the section, would put component configuration into the chemistry data.
 */
export type CheatSheetWidgetName = 'periodic-table' | 'periodic-table-occurrence';

export interface CheatSheetSection {
  heading: string;
  content: string;
  examples?: FormulaExample[];
  /** Optional diagram, rendered under the prose. */
  image?: CheatSheetImage;
  /**
   * Renders an interactive widget under the prose. See `WIDGET_REGISTRY` in
   * src/app/[lang]/(main)/cheat-sheets/[slug]/page.tsx.
   *
   * Not prose, so it is not in the overlay and no locale restates it.
   */
  widget?: CheatSheetWidgetName;
}

/** A lookup table. Cells in `formulaColumns` are rendered with MoleculeText. */
export interface CheatSheetTable {
  heading: string;
  caption?: string;
  columns: string[];
  rows: string[][];
  formulaColumns?: number[];
}

export interface CheatSheetResource {
  label: string;
  url: string;
  description: string;
  /** Who it's for — lets the UI group "for students" vs "for teachers". */
  audience?: 'student' | 'teacher';
}

export interface CheatSheetTopic {
  slug: string;
  title: string;
  yearLevel: YearLevel;
  category: CheatSheetCategory;
  summary: string;
  iconName: ChemIconName;
  colorTheme: string;
  keyTakeaways: string[];
  formulaExamples?: FormulaExample[];
  sections: CheatSheetSection[];
  tables?: CheatSheetTable[];
  /** Common mistakes, rendered as a distinct "watch out" list. */
  commonMistakes?: string[];
  resources?: CheatSheetResource[];
  relatedGames?: GameName[];
  /** VCAA study design / Victorian Curriculum reference, shown as a small footnote. */
  curriculumRef?: string;
  reactionType?: ReactionType;
}

// Game Feedback - hints and errors

export type FeedbackSeverity = 'error' | 'hint';

export interface GameFeedback {
  type: FeedbackSeverity;
  message: string;
  /** Optional custom display duration in ms (default: 4000) */
  duration?: number;
}
