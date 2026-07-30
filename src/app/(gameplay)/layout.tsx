// src/app/(gameplay)/layout.tsx

export default function GameplayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We don't add a Nav or Footer here. 
    // This provides a distraction-free, full-screen canvas.
    // The individual game pages will render their own <GameShell> and <GamesHeader>.
    <div className="gameplay-wrapper">
      {children}
    </div>
  );
}