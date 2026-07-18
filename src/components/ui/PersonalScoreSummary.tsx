// src/components/dashboard/personal-score-summary.tsx
import type { PersonalScore } from '../../core-engine/types/general';

interface PersonalScoreSummaryProps {
  scores: PersonalScore[];
}

export function PersonalScoreSummary({ scores }: PersonalScoreSummaryProps) {
  return (
    <section className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-black text-slate-800 uppercase tracking-widest mb-6 drop-shadow-sm">
        My Lab Results
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scores.map((score) => (
          <div
            key={score.gameId}
            className={`flex flex-col p-5 bg-white border-4 border-slate-800 rounded-2xl shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] transition-transform hover:-translate-y-1 hover:shadow-[6px_10px_0px_0px_rgba(30,41,59,1)]`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{score.icon}</span>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full border-2 border-slate-800 uppercase"
                style={{ backgroundColor: score.themeColor }}
              >
                {score.gameId.replace('-', ' ')}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
              {score.gameTitle}
            </h3>

            <div className="mt-auto pt-4 border-t-4 border-dashed border-slate-200">
              {score.highestScore !== null ? (
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-slate-500 uppercase">High Score</p>
                    <p className="text-3xl font-black text-slate-800">{score.highestScore}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-500 uppercase">Rank</p>
                    <p className="text-xl font-black text-indigo-600">{score.globalRank === null ? '—' : `#${score.globalRank}`}</p>
                  </div>
                </div>
              ) : (
                <div className="py-2 text-center bg-slate-100 rounded-xl border-2 border-slate-200">
                  <p className="text-sm font-bold text-slate-500">Ready to synthesize?</p>
                  <button type="button" className="mt-2 text-sm font-black text-indigo-600 hover:text-indigo-800 uppercase">
                    Play Now ▶
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
