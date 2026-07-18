// src/components/profile/public-profile.tsx
import type { UserProfile } from '../../core-engine/types/general';

interface PublicProfileProps {
  profile: UserProfile;
}

export function PublicProfile({ profile }: PublicProfileProps) {
  // Determine border color based on element group, defaulting to slate
  const elementColors: Record<string, string> = {
    'alkali': 'border-red-400 bg-red-100',
    'noble-gas': 'border-purple-400 bg-purple-100',
    'transition-metal': 'border-blue-400 bg-blue-100',
    'halogen': 'border-green-400 bg-green-100',
    'nonmetal': 'border-amber-400 bg-amber-100',
  };

  const badgeStyle = profile.favoriteElement 
    ? elementColors[profile.favoriteElement.group] 
    : 'border-slate-400 bg-slate-100';

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white border-4 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
      
      {/* Header / ID Badge Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b-4 border-dashed border-slate-200">
        <div className={`flex flex-col items-center justify-center w-32 h-32 rounded-2xl border-4 ${badgeStyle} shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rotate-3`}>
          {profile.favoriteElement ? (
            <>
              <span className="text-sm font-black text-slate-700">{profile.favoriteElement.atomicNumber}</span>
              <span className="text-5xl font-black text-slate-900 leading-none">{profile.favoriteElement.symbol}</span>
            </>
          ) : (
            <span className="text-5xl font-black text-slate-400">?</span>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">{profile.alias}</h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">
            Registered Scientist
          </p>
          <div className="mt-3 inline-block px-3 py-1 bg-indigo-100 border-2 border-indigo-900 rounded-lg text-indigo-900 font-bold text-sm">
            Total Syntheses: {profile.totalSyntheses}
          </div>
        </div>
      </div>

      {/* Lab Notes (Bio) */}
      <div className="pt-6">
        <h2 className="text-xl font-black text-slate-900 uppercase mb-3 flex items-center gap-2">
          <span className="bg-amber-400 text-slate-900 px-2 py-1 rounded-md border-2 border-slate-900 text-sm">📝</span>
          Lab Notes
        </h2>
        <div className="p-4 bg-slate-50 border-4 border-slate-200 rounded-2xl min-h-25">
          <p className="text-slate-700 font-semibold whitespace-pre-wrap">
            {profile.labNotes || "This scientist is currently observing reactions in silence."}
          </p>
        </div>
      </div>
    </div>
  );
}