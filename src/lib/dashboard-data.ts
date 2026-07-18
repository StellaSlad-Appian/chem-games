import type { GameLeaderboard, PersonalScore } from '@/core-engine/types/general';

export const personalScores: PersonalScore[] = [
  { gameId: 'titration-station', gameTitle: 'Acid or Base?', highestScore: 820, globalRank: 14, themeColor: '#c084fc', icon: '⚗️' },
  { gameId: 'covalent-builder', gameTitle: 'Formula Blaster', highestScore: 640, globalRank: 27, themeColor: '#60a5fa', icon: '🧪' },
  { gameId: 'isotope-invaders', gameTitle: 'Neutralise!', highestScore: null, globalRank: null, themeColor: '#34d399', icon: '☄️' },
  { gameId: 'reaction-balancer', gameTitle: 'Reaction Balancer', highestScore: null, globalRank: null, themeColor: '#fbbf24', icon: '⚛️' },
];

export const publicLeaderboards: GameLeaderboard[] = [
  { gameId: 'titration-station', gameTitle: 'Acid or Base?', entries: [{ id: '1', alias: 'A. Curie', score: 1280, timestamp: '2026-07-17' }, { id: '2', alias: 'Molecule Maven', score: 1120, timestamp: '2026-07-16' }, { id: '3', alias: 'Ion Pilot', score: 980, timestamp: '2026-07-15' }] },
  { gameId: 'covalent-builder', gameTitle: 'Formula Blaster', entries: [{ id: '4', alias: 'Formula Fox', score: 940, timestamp: '2026-07-17' }, { id: '5', alias: 'Lab Rat', score: 860, timestamp: '2026-07-16' }] },
  { gameId: 'isotope-invaders', gameTitle: 'Neutralise!', entries: [{ id: '6', alias: 'Base Defender', score: 760, timestamp: '2026-07-16' }, { id: '7', alias: 'pH Pro', score: 715, timestamp: '2026-07-14' }] },
  { gameId: 'reaction-balancer', gameTitle: 'Reaction Balancer', entries: [] },
];
