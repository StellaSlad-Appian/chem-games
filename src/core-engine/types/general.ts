export type GameState = 'playing' | 'paused' | 'failed' | 'victory' | 'levelUp';

export type GameName =
  | 'titration-station'
  | 'covalent-builder'
  | 'isotope-invaders'
  | 'reaction-balancer';

export type ChemIconName =
  | 'Shapes'        // States of matter
  | 'TestTube'      // Lab basics & solutions
  | 'TestTubes'     // Reactions & mixing
  | 'Scale'         // Balancing equations / stoichiometry
  | 'Flame'         // Combustion & thermodynamics
  | 'Atom'          // Atomic structure & isotopes
  | 'Zap'           // Electrochemistry & redox
  | 'FlaskConical'  // Titration & volumetric analysis
  | 'Gauge'         // Gas laws & pressure
  | 'Dna'           // Organic chemistry / biochemistry
  | 'Orbit'         // Electron configuration
  | 'ShieldAlert'   // Lab safety & hazards
  | 'Sparkles'      // General interactive games
  | 'Timer';        // Speed challenges

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

export interface ChemicalTypeUserProfile {
  symbol: string;
  name: string;
  atomicNumber: number;
  group: 'alkali' | 'noble-gas' | 'transition-metal' | 'halogen' | 'nonmetal';
}

export interface ProfilePrivacySettings {
  showLabNotes: boolean;
  showTotalSyntheses: boolean;
  showJoinedDate: boolean;
}

export interface UserProfile {
  id: string;
  alias: string;
  labNotes: string;
  favoriteElement: ChemicalTypeUserProfile | null;
  joinedDate: string;
  totalSyntheses: number;
  privacy: ProfilePrivacySettings;
}

export interface ProfileActionState {
  success?: boolean;
  error?: string;
  message?: string;
}

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

export type CheatSheetCategory = 'Fundamentals' | 'Reactions' | 'Acids & Bases' | 'Equations' | 'Thermodynamics' | 'Organic';

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
  iconName: 'Shapes' | 'TestTube' | 'Scale' | 'Flame' | 'Atom' | 'Zap' | 'FlaskConical';
  colorTheme: string;
  keyTakeaways: string[];
  formulaExamples?: FormulaExample[];
  sections?: CheatSheetSection[];
}