// src/components/ui/BlockToggle.tsx
'use client';

interface BlockToggleProps {
  name: string;
  label: string;
  defaultChecked: boolean;
}

export function BlockToggle({ name, label, defaultChecked }: BlockToggleProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-100 border-4 border-slate-900 rounded-xl">
      <span className="text-sm font-black text-slate-700 uppercase tracking-wide">
        {label}
      </span>
      
      {/* Hidden checkbox for form submission */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          name={name} 
          defaultChecked={defaultChecked} 
          className="sr-only peer" 
        />
        <div className="w-16 h-8 bg-slate-300 peer-focus:outline-none border-4 border-slate-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-slate-900 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-4 after:border-slate-900 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-400"></div>
      </label>
    </div>
  );
}