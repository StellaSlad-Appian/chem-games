// src/components/games/GameSettingsModal.tsx
'use client';

import { useState } from 'react';
import { X, Volume2, VolumeX, Monitor, Globe } from 'lucide-react';
import { useGameSettings } from '../../../context/game-settings-context';

interface GameSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameSettingsModal({ isOpen, onClose }: GameSettingsModalProps) {
  // Hook up the actual audio logic we already built
  const { isMuted, volume, toggleMute, setVolume } = useGameSettings();

  // Visual placeholders for the next architectural step
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');
  const [activeLang, setActiveLang] = useState<'en' | 'de'>('en');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-800/50">
          <h2 className="text-xl font-black text-slate-100 tracking-wide flex items-center gap-2">
            ⚙️ Game Settings
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors active:scale-95"
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col gap-8">
          
          {/* AUDIO SECTION */}
          <section className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
              <Volume2 className="w-4 h-4" /> Audio
            </h3>
            
            {/* Mute Toggle */}
            <div className="flex items-center justify-between bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
              <span className="text-sm font-semibold text-slate-200">Sound Effects</span>
              <button 
                onClick={toggleMute}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${isMuted ? 'bg-slate-700' : 'bg-emerald-500'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isMuted ? 'translate-x-1' : 'translate-x-6'}`} />
              </button>
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 text-slate-500" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                disabled={isMuted}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className="text-xs font-bold text-slate-400 w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </section>

          {/* DISPLAY & LOCALIZATION SECTION */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Theme Toggle (Placeholder Logic) */}
            <section className="flex flex-col gap-3">
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                <Monitor className="w-4 h-4" /> Theme
              </h3>
              <div className="flex bg-slate-950/50 rounded-xl border border-slate-800 p-1">
                {(['dark', 'light'] as const).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setActiveTheme(theme)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                      activeTheme === theme 
                        ? 'bg-indigo-500 text-white shadow-md' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </section>

            {/* Language Toggle (Placeholder Logic) */}
            <section className="flex flex-col gap-3">
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                <Globe className="w-4 h-4" /> Language
              </h3>
              <div className="flex bg-slate-950/50 rounded-xl border border-slate-800 p-1">
                <button
                  onClick={() => setActiveLang('en')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeLang === 'en' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  🇬🇧 EN
                </button>
                <button
                  onClick={() => setActiveLang('de')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeLang === 'de' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  🇩🇪 DE
                </button>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}