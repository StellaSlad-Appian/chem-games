// src/core-engine/types/general.ts

import type { ChemIconName } from '@/components/ui/ChemIcon';
import type { ReactionType } from './chemistry';

// Re-export ChemIconName so other modules can import it directly from general.ts
export type { ChemIconName };

// --- Game Engine & Session Types ---

export type GameState = 'playing' | 'paused' | 'failed' | 'victory' | 'levelUp';

export type GameName =
  | 'titration-station'
  | 'covalent-builder'
  | 'isotope-invaders'
  | 'reaction-balancer';

export interface PersonalScore {
  gameId: GameName;
  gameTitle: string;
  highestScore: number | null;
  globalRank: number | null;
  themeColor: string;
  icon: string;
}

export interface LeaderboardEntry {
  id: string;
  alias: string;
  score: number;
  timestamp: string;
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
  totalSyntheses: number;
  privacy: ProfilePrivacySettings;
}

export interface ProfileActionState {
  success?: boolean;
  error?: string;
  message?: string;
}

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
  | 'Organic';

export interface FormulaExample {
  name: string;
  formula: string;
  description?: string;
}

export interface CheatSheetSection {
  heading: string;
  content: string;
  examples?: FormulaExample[];
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
