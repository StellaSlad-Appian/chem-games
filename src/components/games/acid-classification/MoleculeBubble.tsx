export default function MoleculeBubble({ formula, name, status }: { formula: React.ReactNode, name: string, status: string | null }) {
  const statusStyles = status === "correct" ? "border-emerald-500" : status === "wrong" ? "border-red-500 shake-animation" : "border-purple-300";
  
  return (
    <div className={`w-56 h-56 md:w-72 md:h-72 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl bg-white/90 backdrop-blur-md transition-all duration-300 ${statusStyles}`}>
      <h2 className="text-5xl md:text-7xl font-black font-serif">{formula}</h2>
      <p className="text-sm text-slate-400 mt-2">{name}</p>
    </div>
  );
}