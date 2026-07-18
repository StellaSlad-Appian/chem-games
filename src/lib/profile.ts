import type { UserProfile } from '@/core-engine/types/general';

type ProfileRow = {
  id: string; alias: string; lab_notes: string; favorite_element: UserProfile['favoriteElement'];
  created_at: string; total_syntheses: number; show_lab_notes: boolean; show_total_syntheses: boolean; show_joined_date: boolean;
};

export function toUserProfile(profile: ProfileRow): UserProfile {
  return {
    id: profile.id, alias: profile.alias, labNotes: profile.lab_notes, favoriteElement: profile.favorite_element,
    joinedDate: profile.created_at, totalSyntheses: profile.total_syntheses,
    privacy: { showLabNotes: profile.show_lab_notes, showTotalSyntheses: profile.show_total_syntheses, showJoinedDate: profile.show_joined_date },
  };
}
