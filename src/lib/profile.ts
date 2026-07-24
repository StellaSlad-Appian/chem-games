// src/lib/profile.ts

import type { UserProfile, YearLevel } from '@/core-engine/types/general';

type ProfileRow = {
  id: string; 
  alias: string; 
  title?: string;
  country?: string;
  year_level?: YearLevel;
  lab_notes: string; 
  favorite_element: UserProfile['favoriteElement'];
  favorite_compound?: UserProfile['favoriteCompound'];
  badges?: UserProfile['badges'];
  current_streak?: number;
  accuracy?: number;
  created_at: string; 
  total_syntheses: number; 
  show_lab_notes: boolean; 
  show_total_syntheses: boolean; 
  show_joined_date: boolean;
  show_year_level: boolean;
  show_country: boolean;
  show_accuracy: boolean;
  show_current_streak: boolean;
};

export function toUserProfile(profile: ProfileRow): UserProfile {
  return {
    id: profile.id, 
    alias: profile.alias, 
    title: profile.title,
    country: profile.country,
    yearLevel: profile.year_level,
    labNotes: profile.lab_notes, 
    favoriteElement: profile.favorite_element,
    favoriteCompound: profile.favorite_compound,
    badges: profile.badges,
    currentStreak: profile.current_streak,
    accuracy: profile.accuracy,
    joinedDate: profile.created_at, 
    totalSyntheses: profile.total_syntheses,
    privacy: { 
      showLabNotes: profile.show_lab_notes, 
      showTotalSyntheses: profile.show_total_syntheses, 
      showJoinedDate: profile.show_joined_date,
      showYearLevel: profile.show_year_level,
      showCountry: profile.show_country,
      showAccuracy: profile.show_accuracy,
      showCurrentStreak: profile.show_current_streak,
    },
  };
}
