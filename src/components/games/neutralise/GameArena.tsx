// src/components/games/neutralise/GameArena.tsx
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

  const invadersRef = useRef(invaders);
  const projectilesRef = useRef(projectiles);
  const playerXRef = useRef(playerX);
  const activeMissileRef = useRef(activeMissile);
  const lastFiredRef = useRef(0);
  
  const callbacksRef = useRef({ onEnemyDefeated, onPlayerHit });
  useEffect(() => {
    callbacksRef.current = { onEnemyDefeated, onPlayerHit };
  }, [onEnemyDefeated, onPlayerHit]);
  
  const FIRE_COOLDOWN = 250; 

  useEffect(() => { invadersRef.current = invaders; }, [invaders]);
  useEffect(() => { projectilesRef.current = projectiles; }, [projectiles]);
  useEffect(() => { playerXRef.current = playerX; }, [playerX]);
  useEffect(() => { activeMissileRef.current = activeMissile; }, [activeMissile]);

  // FIX 1: Sync refs instantly to prevent the game loop from wiping out new spawns
  useEffect(() => {
    const levelConfig = NEUTRALISE_LEVEL_DATA.find(l => l.level === level) || NEUTRALISE_LEVEL_DATA[0];
    const newSpawns = getLevelSpawns(enemyCount, levelConfig.compoundPoolIds);
    
    setInvaders(newSpawns);
    invadersRef.current = newSpawns; // Instantly sync!
    
    setProjectiles([]);
    projectilesRef.current = []; // Instantly sync!
  }, [level, wave, enemyCount]);

  const fireProjectile = useCallback(() => {
    if (isPaused) return;
    
    const now = Date.now();
    if (now - lastFiredRef.current < FIRE_COOLDOWN) return;
    lastFiredRef.current = now;

    playSound('laser-pew');
    
    setProjectiles(prev => [...prev, {
      id: crypto.randomUUID(),
      x: playerXRef.current - 16, 
      y: 500,
      damageType: activeMissileRef.current,
      speed: NEUTRALISE_CONFIG.player.projectileSpeed,
      isPlayerOwned: true
    }]);
  }, [playSound, isPaused]);

  const toggleWeapon = useCallback(() => {
    playSound('click');
    setActiveMissile(prev => (prev === 'H-ion' ? 'OH-ion' : 'H-ion'));
  }, [playSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return;
      if (e.key === 'ArrowLeft') setPlayerX(prev => Math.max(20, prev - 20));
      if (e.key === 'ArrowRight') {
        const maxRight = arenaRef.current ? arenaRef.current.clientWidth - 20 : 800;
        setPlayerX(prev => Math.min(maxRight, prev + 20));
      }
      if (e.key === '1' && activeMissileRef.current !== 'H-ion') toggleWeapon();
      if (e.key === '2' && activeMissileRef.current !== 'OH-ion') toggleWeapon();
      if (e.key === ' ') fireProjectile();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleWeapon, fireProjectile, isPaused]);

  useEffect(() => {
    if (isPaused) return;

    const gameLoop = setInterval(() => {
      let currentInvaders = [...invadersRef.current];
      
      let currentProjectiles = projectilesRef.current
        .map(p => ({ ...p, y: p.y + p.speed }))
        .filter(p => p.y > -50);

      const dropSpeed = NEUTRALISE_CONFIG.invaders.baseDropSpeed + (level * NEUTRALISE_CONFIG.invaders.speedMultiplierPerLevel);
      currentInvaders = currentInvaders.map(inv => ({ ...inv, y: inv.y + dropSpeed }));

      const survivingProjectiles: Projectile[] = [];

      currentProjectiles.forEach(p => {
        const hitIndex = currentInvaders.findIndex(inv => 
          inv.isAlive && isColliding(
            { x: p.x, y: p.y }, 
            { width: NEUTRALISE_CONFIG.player.projectileDimensions.width, height: NEUTRALISE_CONFIG.player.projectileDimensions.height }, 
            { x: inv.x, y: inv.y }, 
            { width: NEUTRALISE_CONFIG.invaders.dimensions.width, height: NEUTRALISE_CONFIG.invaders.dimensions.height }
          )
        );

        if (hitIndex !== -1) {
          const invader = currentInvaders[hitIndex];
          const isCompatible = isNeutralizationCompatible(invader.type, p.damageType);

          if (isCompatible) {
            const { isDefeated, remainingHealth } = getCollisionResult(invader, 1);
            currentInvaders[hitIndex].currentHealth = remainingHealth;
            currentInvaders[hitIndex].isAlive = !isDefeated;
            
            if (isDefeated) {
              playSound('splash-defeat');
              setTimeout(() => callbacksRef.current.onEnemyDefeated(100), 0);
            } else {
              playSound('hit-enemy');
            }
          } else {
            playSound('fizzle');
          }
        } else {
          survivingProjectiles.push(p);
        }
      });

      currentInvaders.forEach(inv => {
        if (inv.y > NEUTRALISE_CONFIG.arena.height - 50 && inv.isAlive) {
          callbacksRef.current.onPlayerHit();
          inv.isAlive = false;
        }
      });

      setProjectiles(survivingProjectiles);
      setInvaders(currentInvaders.filter(i => i.isAlive));

    }, NEUTRALISE_CONFIG.engine.tickRate);
    
    return () => clearInterval(gameLoop);
  }, [playSound, isPaused, level]);

  return (
    <div 
      ref={arenaRef}
      onMouseMove={(e) => { 
        if (!isPaused && arenaRef.current) {
          setPlayerX(e.clientX - arenaRef.current.getBoundingClientRect().left); 
        }
      }}
      onClick={fireProjectile}
      onContextMenu={(e) => { 
        e.preventDefault(); 
        if (!isPaused) toggleWeapon(); 
      }}
      className="relative w-full h-125 bg-slate-950/50 border-2 border-slate-800 rounded-2xl overflow-hidden cursor-crosshair"
    >
      {invaders.map(invader => <MoleculeParticle key={invader.id} data={invader} />)}
      {projectiles.map(proj => <IonProjectile key={proj.id} projectile={proj as any} />)}
      <PlayerCannon x={playerX} activeMissile={activeMissile} />
    </div>
  );
}