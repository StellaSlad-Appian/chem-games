'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MoleculeInvader, Projectile } from '../../../core-engine/types/molecular-combat';
import { MoleculeParticle } from './MoleculeInvader';
import { IonProjectile } from './IonProjectile';
import { PlayerCannon } from './PlayerCannon';
import { useSound } from '../../../hooks/useSound';
import { isColliding, getCollisionResult } from '../../../core-engine/utils/collision-utils';
import { getLevelSpawns } from '../../../core-engine/utils/level-manager';
import { NEUTRALISE_LEVEL_DATA } from '../../../core-engine/data/games/neutralise-levels';
import { NEUTRALISE_CONFIG } from '../../../core-engine/config/games/neutralise-config';
import { isNeutralizationCompatible } from '../../../core-engine/utils/chemical-utils';

interface NeutralizeArenaProps {
  level: number;
  wave: number;
  enemyCount: number;
  onEnemyDefeated: (points: number) => void;
  onPlayerHit: () => void;
  isPaused: boolean;
}

export default function NeutralizeArena({ level, wave, enemyCount, onEnemyDefeated, onPlayerHit, isPaused }: NeutralizeArenaProps) {
  const { playSound } = useSound();
  const arenaRef = useRef<HTMLDivElement>(null);
  
  const [playerX, setPlayerX] = useState(250);
  const [activeMissile, setActiveMissile] = useState<'H-ion' | 'OH-ion'>('H-ion');
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [invaders, setInvaders] = useState<MoleculeInvader[]>([]);

  // UPDATED: Spawn logic now uses level-data config
  useEffect(() => {
    const levelConfig = NEUTRALISE_LEVEL_DATA.find(l => l.level === level) || NEUTRALISE_LEVEL_DATA[0];
    setInvaders(getLevelSpawns(enemyCount, levelConfig.compoundPoolIds));
    setProjectiles([]);
  }, [level, wave, enemyCount]);

  const fireProjectile = useCallback(() => {
    if (isPaused) return;
    playSound('laser-pew');
    setProjectiles(prev => [...prev, {
      id: crypto.randomUUID(),
      x: playerX,
      y: 500,
      damageType: activeMissile,
      speed: NEUTRALISE_CONFIG.player.projectileSpeed,
      isPlayerOwned: true
    }]);
  }, [playerX, activeMissile, playSound, isPaused]);

  const toggleWeapon = useCallback(() => {
    playSound('click');
    setActiveMissile(prev => (prev === 'H-ion' ? 'OH-ion' : 'H-ion'));
  }, [playSound]);

  // 1. Keyboard Controls for Movement and Weapons
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return;
      if (e.key === 'ArrowLeft') setPlayerX(prev => Math.max(20, prev - 20));
      if (e.key === 'ArrowRight') setPlayerX(prev => Math.min(800, prev + 20));
      
      // Weapon switching logic
      if (e.key === '1' && activeMissile !== 'H-ion') toggleWeapon();
      if (e.key === '2' && activeMissile !== 'OH-ion') toggleWeapon();
      
      if (e.key === ' ') fireProjectile();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerX, activeMissile, toggleWeapon, fireProjectile, isPaused]);

  // Game Loop Logic
  useEffect(() => {
    if (isPaused) return;
    const gameLoop = setInterval(() => {
      // 1. Move Projectiles
      setProjectiles(prev => prev.map(p => ({ ...p, y: p.y + p.speed })).filter(p => p.y > -50));

      // 2. Move Invaders
      setInvaders(prev => {
        const dropSpeed = NEUTRALISE_CONFIG.invaders.baseDropSpeed + (level * NEUTRALISE_CONFIG.invaders.speedMultiplierPerLevel);
        
        let updated = prev.map(invader => ({ 
          ...invader, 
          y: invader.y + dropSpeed 
        }));
        
        // 3. Collision Handling
        setProjectiles(projs => projs.filter(p => {
          const hitIndex = updated.findIndex(inv => 
            isColliding(
              { x: p.x, y: p.y }, 
              { width: NEUTRALISE_CONFIG.player.projectileDimensions.width, height: NEUTRALISE_CONFIG.player.projectileDimensions.height }, 
              { x: inv.x, y: inv.y }, 
              { width: NEUTRALISE_CONFIG.invaders.dimensions.width, height: NEUTRALISE_CONFIG.invaders.dimensions.height }
            )
          );

          if (hitIndex !== -1) {
            const invader = updated[hitIndex];
            
            // Check chemical compatibility
            const isCompatible = isNeutralizationCompatible(invader.type, p.damageType);

            if (isCompatible) {
              const { isDefeated, remainingHealth } = getCollisionResult(invader, 1);
              updated[hitIndex].currentHealth = remainingHealth;
              updated[hitIndex].isAlive = !isDefeated;
              
              if (isDefeated) {
                playSound('splash-defeat');
                setTimeout(() => onEnemyDefeated(100), 0);
              } else {
                playSound('hit-enemy');
              }
            } else {
              // better, different sound?
              playSound('fizzle');
            }
            return false; // Remove projectile on impact
          }
          return true;
        }));

        // Check for Game Over
        updated.forEach(inv => {
          if (inv.y > NEUTRALISE_CONFIG.arena.height - 50 && inv.isAlive) {
            onPlayerHit();
            inv.isAlive = false;
          }
        });

        return updated.filter(i => i.isAlive);
      });
    }, NEUTRALISE_CONFIG.engine.tickRate);
    
    return () => clearInterval(gameLoop);
  }, [playSound, isPaused, onEnemyDefeated, onPlayerHit, level, wave, enemyCount]);

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