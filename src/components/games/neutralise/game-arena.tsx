'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MoleculeInvader, Projectile } from '../../../core-engine/types/molecular-combat';
import { MoleculeParticle } from './molecule-invader';
import { IonProjectile } from './ion-projectile';
import { PlayerCannon } from './player-cannon';
import { useSound } from '../../../hooks/useSound';
import { isColliding, getCollisionResult } from '../../../core-engine/utils/collision-utils';

interface NeutralizeArenaProps {
  level: number;
  onEnemyDefeated: (points: number) => void;
  onPlayerHit: () => void;
}

export default function NeutralizeArena({ level, onEnemyDefeated, onPlayerHit }: NeutralizeArenaProps) {
  const { playSound } = useSound();
  const arenaRef = useRef<HTMLDivElement>(null);
  
  const [playerX, setPlayerX] = useState(0);
  const [activeMissile, setActiveMissile] = useState<'H-ion' | 'OH-ion'>('H-ion');
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [invaders, setInvaders] = useState<MoleculeInvader[]>([]);

  const toggleWeapon = useCallback(() => {
    playSound('click');
    setActiveMissile(prev => (prev === 'H-ion' ? 'OH-ion' : 'H-ion'));
  }, [playSound]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    setPlayerX(e.clientX - rect.left);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1' && activeMissile !== 'H-ion') toggleWeapon();
      if (e.key === '2' && activeMissile !== 'OH-ion') toggleWeapon();
      if (e.key === ' ') {
        playSound('laser-pew');
        setProjectiles(prev => [...prev, {
          id: crypto.randomUUID(),
          x: playerX,
          y: 500,
          damageType: activeMissile,
          speed: -8,
          isPlayerOwned: true
        }]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerX, activeMissile, toggleWeapon, playSound]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      // 1. Move everything
      setProjectiles(prev => prev.map(p => ({ ...p, y: p.y + p.speed })).filter(p => p.y > -50 && p.y < 800));

      setInvaders(prev => {
        let updated = prev.map(invader => ({ ...invader, x: invader.x + Math.sin(Date.now() / 500) * 2 }));
        
        // 2. Process Collisions
        setProjectiles(projs => projs.filter(p => {
          if (!p.isPlayerOwned) return true; // Keep enemy projectiles

          const hitIndex = updated.findIndex(inv => 
            isColliding({x: p.x, y: p.y}, {width: 24, height: 24}, {x: inv.x, y: inv.y}, {width: 60, height: 50})
          );

          if (hitIndex !== -1) {
            const { isDefeated, remainingHealth } = getCollisionResult(updated[hitIndex], 1);
            updated[hitIndex].currentHealth = remainingHealth;
            updated[hitIndex].isAlive = !isDefeated;
            
            playSound('hit-enemy'); 
            return false; // Remove projectile
          }
          return true;
        }));

        return updated.filter(i => i.isAlive);
      });
    }, 1000 / 60);
    return () => clearInterval(gameLoop);
  }, [playSound]);

  return (
    <div 
      ref={arenaRef}
      onMouseMove={handleMouseMove}
      onContextMenu={(e) => { e.preventDefault(); toggleWeapon(); }}
      className="relative w-full h-150 bg-slate-950/50 border-2 border-slate-800 rounded-2xl overflow-hidden cursor-crosshair"
    >
      {invaders.map(invader => <MoleculeParticle key={invader.id} data={invader} />)}
      {projectiles.map(proj => <IonProjectile key={proj.id} projectile={proj as any} />)}
      <PlayerCannon x={playerX} activeMissile={activeMissile} />
    </div>
  );
}