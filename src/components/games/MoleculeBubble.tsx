import React from 'react';

interface MoleculeBubbleProps {
  formula?: string;
  name?: string;
  feedbackStatus: 'correct' | 'wrong' | null;
  showName?: boolean;
}

export default function MoleculeBubble({ formula, name, feedbackStatus, showName = false}: MoleculeBubbleProps) {
  // Encapsulating the formula subscript formatting logic inside the component
  const renderFormula = (formulaStr: string) => {
    return formulaStr.split(/(\d+)/).map((part, index) => {
      if (!isNaN(Number(part)) && part !== "") {
        return <sub key={index} className="text-3xl md:text-5xl">{part}</sub>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Background Glow Ring */}
      <div className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full blur-2xl opacity-20 dark:opacity-30 transition-all duration-500 ${
        feedbackStatus === "correct" ? "bg-emerald-500 scale-110" : 
        feedbackStatus === "wrong" ? "bg-red-500 scale-110" : "bg-purple-500 animate-pulse"
      }`} />

      {/* Main Orb */}
      <div className={`w-56 h-56 md:w-72 md:h-72 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md transform transition-all duration-300 ${
        feedbackStatus === "correct" ? "border-emerald-500 scale-95" : 
        feedbackStatus === "wrong" ? "border-red-500 scale-95 shake-animation" : "border-purple-300 dark:border-purple-900 hover:scale-105"
      }`}>
        {formula && (
          <>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight font-serif text-slate-800 dark:text-white">
              {renderFormula(formula)}
            </h2>
            {/* 👈 Wrap this text element in a conditional check */}
            {showName && (
              <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium opacity-80">{name}</p>
            )}
          </>
        )}
        
        {feedbackStatus && (
          <div className={`absolute top-4 font-bold text-sm uppercase px-3 py-1 rounded-full ${feedbackStatus === "correct" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
            {feedbackStatus}
          </div>
        )}
      </div>
    </div>
  );
}