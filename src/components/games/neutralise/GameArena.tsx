'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MoleculeInvader, Projectile } from '../../../core-engine/types/molecular-combat';
import { MoleculeParticle } from './MoleculeInvader';
import { IonProjectile } from './IonProjectile';
import { PlayerCannon } from './PlayerCannon';
import { useSound } from '../../../hooks/useSound';
import { isColliding, getCollisionResult } from '../../../core-engine/utils/collision-utils';
import { getLevelSpawns } from '../../../core-engine/utils/level-manager';

interface NeutralizeArenaProps {
  level: number;
  onEnemyDefeated: (points: number) => void;
  onPlayerHit: () => void;
  isPaused: boolean;
}

export default function NeutralizeArena({ level, onEnemyDefeated, onPlayerHit, isPaused }: NeutralizeArenaProps) {
  const { playSound } = useSound();
  const arenaRef = useRef<HTMLDivElement>(null);
  
  const [playerX, setPlayerX] = useState(250);
  const [activeMissile, setActiveMissile] = useState<'H-ion' | 'OH-ion'>('H-ion');
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [invaders, setInvaders] = useState<MoleculeInvader[]>([]);

  useEffect(() => {
    setInvaders(getLevelSpawns(level));
    setProjectiles([]);
  }, [level]);

  const fireProjectile = useCallback(() => {
    if (isPaused) return;
    playSound('laser-pew');
    setProjectiles(prev => [...prev, {
      id: crypto.randomUUID(),
      x: playerX,
      y: 500,
      damageType: activeMissile,
      speed: -8,
      isPlayerOwned: true
    }]);
  }, [playerX, activeMissile, playSound, isPaused]);

  const toggleWeapon = useCallback(() => {
    playSound('click');
    setActiveMissile(prev => (prev === 'H-ion' ? 'OH-ion' : 'H-ion'));
  }, [playSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return;
      if (e.key === 'ArrowLeft') setPlayerX(prev => Math.max(20, prev - 20));
      if (e.key === 'ArrowRight') setPlayerX(prev => Math.min(800, prev + 20));
      if (e.key === '1' && activeMissile !== 'H-ion') toggleWeapon();
      if (e.key === '2' && activeMissile !== 'OH-ion') toggleWeapon();
      if (e.key === ' ') fireProjectile();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerX, activeMissile, toggleWeapon, fireProjectile, isPaused]);

  // ✅ RESTORED: Game Loop with Collision detection
  useEffect(() => {
    if (isPaused) return;
    const gameLoop = setInterval(() => {
      // Move projectiles
      setProjectiles(prev => prev.map(p => ({ ...p, y: p.y + p.speed })).filter(p => p.y > -50));

      // Handle collisions
      setInvaders(prev => {
        let updated = prev.map(invader => ({ ...invader, x: invader.x + Math.sin(Date.now() / 500) * 2 }));
        
        setProjectiles(projs => projs.filter(p => {
          const hitIndex = updated.findIndex(inv => 
            isColliding({x: p.x, y: p.y}, {width: 24, height: 24}, {x: inv.x, y: inv.y}, {width: 60, height: 50})
          );

          if (hitIndex !== -1) {
            const { isDefeated, remainingHealth } = getCollisionResult(updated[hitIndex], 1);
            updated[hitIndex].currentHealth = remainingHealth;
            updated[hitIndex].isAlive = !isDefeated;
            
            if (isDefeated) {
              playSound('splash-defeat');
              onEnemyDefeated(100);
            } else {
              playSound('hit-enemy');
            }
            return false;
          }
          return true;
        }));
        return updated.filter(i => i.isAlive);
      });
    }, 1000 / 60);
    return () => clearInterval(gameLoop);
  }, [playSound, isPaused, onEnemyDefeated]);

  return (
    <div 
      ref={arenaRef}
      onMouseMove={(e) => { if (!isPaused && arenaRef.current) setPlayerX(e.clientX - arenaRef.current.getBoundingClientRect().left); }}
      onClick={fireProjectile}
      onContextMenu={(e) => { e.preventDefault(); if (!isPaused) toggleWeapon(); }}
      className="relative w-full h-125 bg-slate-950/50 border-2 border-slate-800 rounded-2xl overflow-hidden cursor-crosshair"
    >
      {invaders.map(invader => <MoleculeParticle key={invader.id} data={invader} />)}
      {projectiles.map(proj => <IonProjectile key={proj.id} projectile={proj as any} />)}
      <PlayerCannon x={playerX} activeMissile={activeMissile} />
    </div>
  );
}