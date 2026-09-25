interface GameTimerProps {
  timeLeft: number;
  /** What the clock is for, shown above it (e.g. "Speed bonus"). */
  label?: string;
}

/**
 * A countdown shown in the game header.
 *
 * It is deliberately calm: no red, no pulse near zero. The only game with a
 * clock, Formula Blaster, uses it as a speed bonus — reaching zero costs the
 * bonus, never the game — so an alarm would say the opposite of what happens.
 * At zero it simply fades to the muted colour.
 */
export default function GameTimer({ timeLeft, label }: GameTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center">
      {label && (
        <span className="block text-[10px] font-bold uppercase tracking-wider text-(--muted)">
          {label}
        </span>
      )}
      <div
        className={`text-2xl md:text-3xl font-black font-mono transition-colors ${
          timeLeft > 0 ? 'text-(--foreground)' : 'text-(--muted)'
        }`}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}
