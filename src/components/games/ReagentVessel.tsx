import { LucideIcon } from "lucide-react";

interface Props {
  type: string;
  icon: LucideIcon;
  colorClass: string;
  onClick: () => void;
  disabled: boolean;
}

export default function ReagentVessel({ type, icon: Icon, colorClass, onClick, disabled }: Props) {
  return (
    <button onClick={onClick} disabled={disabled} className="flex flex-col items-center group">
      <div className={`p-4 rounded-2xl border-2 transition-all group-hover:scale-110 ${colorClass}`}>
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
      </div>
      <span className="mt-3 font-bold uppercase text-xs">{type}</span>
    </button>
  );
}