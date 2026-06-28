import { HelpCircle, Settings } from 'lucide-react';

interface FooterProps {
  onOpenSettings?: () => void;
  onOpenInstructions?: () => void;
}

export default function GameFooter({ onOpenSettings, onOpenInstructions }: FooterProps) {
  return (
    <footer className="w-full flex justify-between items-center p-4 mt-auto">
      {onOpenInstructions && (
        <button 
          onClick={onOpenInstructions}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-xs font-mono">INSTRUCTIONS</span>
        </button>
      )}
      
      {onOpenSettings && (
        <button 
          onClick={onOpenSettings}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
        >
          <span className="text-xs font-mono">SETTINGS</span>
          <Settings className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}