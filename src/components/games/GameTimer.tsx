interface GameTimerProps {
  timeLeft: number;
}

export default function GameTimer({ timeLeft }: GameTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center">
      <div className={`text-3xl md:text-4xl font-black font-mono transition-colors ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-slate-700 dark:text-zinc-200'}`}>
        TIMER: {formatTime(timeLeft)}
      </div>
    </div>
  );
}