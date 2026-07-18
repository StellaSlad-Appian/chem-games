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
