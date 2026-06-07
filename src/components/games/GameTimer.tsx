interface GameTimerProps {
  timeLeft: number;
}

export default function GameTimer({ timeLeft }: GameTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Below 10 seconds: warn the player with red + pulse
  const isUrgent = timeLeft < 10;

  return (
    <div className="text-center">
      <div
        className={`text-3xl md:text-4xl font-black font-mono transition-colors ${isUrgent ? 'text-red-500 animate-pulse' : ''}`}
        style={isUrgent ? undefined : { color: 'var(--foreground)' }}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}