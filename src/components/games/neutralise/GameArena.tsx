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

  // Refs for Game Loop & Event Listeners to prevent dependency thrashing
  const invadersRef = useRef(invaders);
  const projectilesRef = useRef(projectiles);
  const playerXRef = useRef(playerX);
  const activeMissileRef = useRef(activeMissile);
  const lastFiredRef = useRef(0);
  
  const FIRE_COOLDOWN = 250; // Milliseconds between shots

  // Keep refs in sync with state
  useEffect(() => { invadersRef.current = invaders; }, [invaders]);
  useEffect(() => { projectilesRef.current = projectiles; }, [projectiles]);
  useEffect(() => { playerXRef.current = playerX; }, [playerX]);
  useEffect(() => { activeMissileRef.current = activeMissile; }, [activeMissile]);

  // Spawn logic
  useEffect(() => {
    const levelConfig = NEUTRALISE_LEVEL_DATA.find(l => l.level === level) || NEUTRALISE_LEVEL_DATA[0];
    setInvaders(getLevelSpawns(enemyCount, levelConfig.compoundPoolIds));
    setProjectiles([]);
  }, [level, wave, enemyCount]);

  const fireProjectile = useCallback(() => {
    if (isPaused) return;
    
    // Cooldown check
    const now = Date.now();
    if (now - lastFiredRef.current < FIRE_COOLDOWN) return;
    lastFiredRef.current = now;

    playSound('laser-pew');
    
    setProjectiles(prev => [...prev, {
      id: crypto.randomUUID(),
      x: playerXRef.current,
      y: 500, // Starting at the bottom of the arena
      damageType: activeMissileRef.current,
      speed: NEUTRALISE_CONFIG.player.projectileSpeed,
      isPlayerOwned: true
    }]);
  }, [playSound, isPaused]);

  const toggleWeapon = useCallback(() => {
    playSound('click');
    setActiveMissile(prev => (prev === 'H-ion' ? 'OH-ion' : 'H-ion'));
  }, [playSound]);

  // Keyboard Controls for Movement and Weapons
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return;
      
      if (e.key === 'ArrowLeft') {
        setPlayerX(prev => Math.max(20, prev - 20));
      }
      
      if (e.key === 'ArrowRight') {
        // Dynamically calculate the right boundary based on the DOM element
        const maxRight = arenaRef.current ? arenaRef.current.clientWidth - 20 : 800;
        setPlayerX(prev => Math.min(maxRight, prev + 20));
      }
      
      // Weapon switching logic using refs
      if (e.key === '1' && activeMissileRef.current !== 'H-ion') toggleWeapon();
      if (e.key === '2' && activeMissileRef.current !== 'OH-ion') toggleWeapon();
      
      if (e.key === ' ') fireProjectile();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleWeapon, fireProjectile, isPaused]);

  // Main Game Loop Logic
  useEffect(() => {
    if (isPaused) return;

    const gameLoop = setInterval(() => {
      // 1. Grab current state from refs
      let currentInvaders = [...invadersRef.current];
      
      // Move Projectiles up and filter off-screen ones
      let currentProjectiles = projectilesRef.current
        .map(p => ({ ...p, y: p.y + p.speed }))
        .filter(p => p.y > -50);

      // Move Invaders down
      const dropSpeed = NEUTRALISE_CONFIG.invaders.baseDropSpeed + (level * NEUTRALISE_CONFIG.invaders.speedMultiplierPerLevel);
      currentInvaders = currentInvaders.map(inv => ({ ...inv, y: inv.y + dropSpeed }));

      // 2. Process Collisions (Pure Logic + Side Effects)
      const survivingProjectiles: Projectile[] = [];

      currentProjectiles.forEach(p => {
        // Find the first ALIVE invader this projectile hits
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
              setTimeout(() => onEnemyDefeated(100), 0);
            } else {
              playSound('hit-enemy');
            }
          } else {
            playSound('fizzle');
          }
          // Do not push to survivingProjectiles, effectively destroying it on impact
        } else {
          survivingProjectiles.push(p);
        }
      });

      // 3. Check for Game Over (Invaders reaching the bottom)
      currentInvaders.forEach(inv => {
        if (inv.y > NEUTRALISE_CONFIG.arena.height - 50 && inv.isAlive) {
          onPlayerHit();
          inv.isAlive = false;
        }
      });

      // 4. Update React State ONCE at the end of the tick
      setProjectiles(survivingProjectiles);
      setInvaders(currentInvaders.filter(i => i.isAlive));

    }, NEUTRALISE_CONFIG.engine.tickRate);
    
    return () => clearInterval(gameLoop);
  }, [playSound, isPaused, onEnemyDefeated, onPlayerHit, level]);

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
