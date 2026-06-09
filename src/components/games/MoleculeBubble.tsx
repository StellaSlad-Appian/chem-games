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
        return <sub key={index} className="text-5xl md:text-7xl">{part}</sub>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Background Glow Ring */}
      <div
        className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full blur-2xl transition-all duration-500 ${
          feedbackStatus ? "opacity-30 scale-110" : "opacity-0"
        }`}
        style={{
          backgroundColor:
            feedbackStatus === "correct"
              ? "var(--game-success)"
              : feedbackStatus === "wrong"
              ? "var(--game-error)"
              : "var(--game-glow)",
        }}
      />

      {/* Main Orb */}
      <div
        className={`w-56 h-56 md:w-72 md:h-72 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl relative backdrop-blur-md transform transition-all duration-300 ${
          feedbackStatus
            ? "scale-95"
            : "hover:scale-105"
        } ${
          feedbackStatus === "wrong"
            ? "shake-animation"
            : ""
        }`}
        style={{
          backgroundColor: "var(--game-highlight-surface)",
          borderColor:
            feedbackStatus === "correct"
              ? "var(--game-success)"
              : feedbackStatus === "wrong"
              ? "var(--game-error)"
              : "var(--game-highlight-border)",
        }}
      >
        {formula && (
          <>
            <h2
              className="text-8xl md:text-[10rem] font-black tracking-tight"
              style={{
                color: "var(--game-panel-text)",
              }}
            >
              {renderFormula(formula)}
            </h2>

            {showName && (
              <p
                className="text-xs md:text-sm mt-2 font-medium opacity-80"
                style={{
                  color: "var(--game-panel-muted)",
                }}
              >
                {name}
              </p>
            )}
          </>
        )}

        {feedbackStatus && (
          <div
            className="absolute top-4 font-bold text-sm uppercase px-3 py-1 rounded-md"
            style={{
              backgroundColor:
                feedbackStatus === "correct"
                  ? "var(--game-success)"
                  : "var(--game-error)",
              color: "white",
            }}
          >
            {feedbackStatus}
          </div>
        )}
      </div>
    </div>
  );
}