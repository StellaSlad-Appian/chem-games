// src/app/page.tsx
import { Beaker, FlaskConical, TestTube, Atom } from 'lucide-react';
import LabVesselCard from '../components/ui/LabVesselCard';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-slate-950 text-white flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative selection:bg-blue-500/30">
      
      {/* Subtle background lab grid matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* 🧪 CENTRAL REACTOR WORKBENCH ORBIT */}
      <div className="relative w-full max-w-3xl h-[620px] md:h-[550px] flex items-center justify-center mt-6">
        
        {/* Decorative Ring Tracker */}
        <div className="absolute w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full border-2 border-dashed border-slate-800/80 animate-[spin_120s_linear_infinite] pointer-events-none hidden sm:block" />

        {/* 1. CENTRAL HUB: CORE LOGO & HEADER */}
        <div className="z-10 text-center max-w-xs md:max-w-sm px-4 bg-slate-950/80 p-6 rounded-full border border-slate-900/40 backdrop-blur-md shadow-2xl">
          <div className="relative w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-blue-950/40 rounded-2xl border border-blue-500/30 glow-pulse">
            <Atom className="w-9 h-9 text-blue-400 animate-[spin_12s_linear_infinite]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 bg-linear-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            ChemGames
          </h1>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">
            Master atomic systems through interactive experiments and time-based workspace challenges.
          </p>
        </div>

        {/* ================= REUSABLE VESSEL CARD INSTANCES ================= */}

        {/* GAME 1: THE BEAKER */}
        <LabVesselCard
          href="/games/acid-classification"
          title="Acid or Base?"
          description="Classify materials under fluid workspace timers."
          liquidLabel="pH Scale"
          shape="beaker"
          color="purple"
          icon={Beaker}
          className="absolute left-2 sm:left-4 md:left-8 top-12 sm:top-1/2 sm:-translate-y-1/2 z-20"
        />

        {/* GAME 2: THE CONICAL FLASK */}
        <LabVesselCard
          href="/games/formula-blaster"
          title="Formula Blaster"
          description="Pop target compounds before they escape."
          liquidLabel="Blaster"
          shape="flask"
          color="blue"
          icon={FlaskConical}
          className="absolute right-2 sm:right-4 md:right-8 top-12 sm:top-1/2 sm:-translate-y-1/2 z-20"
        />

        {/* GAME 3: THE TEST TUBE (LOCKED DEVELOPMENT ROADMAP) */}
        <LabVesselCard
          title="In Incubator"
          description="Molecule Builder layout currently chilling in ice bath."
          shape="test-tube"
          color="slate"
          icon={TestTube}
          isLocked={true}
          className="absolute bottom-4 sm:bottom-0 left-1/2 -translate-x-1/2 z-20"
        />

      </div>

      <footer className="mt-8 text-[11px] font-medium tracking-widest text-slate-600 uppercase border-t border-slate-900 pt-4 w-full max-w-md text-center">
        Laboratory Terminal v2.6.0 • Active Session Secure
      </footer>
    </main>
  );
}
