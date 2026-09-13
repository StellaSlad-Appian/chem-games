// src/components/games/neutralise/GameArena.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MoleculeInvader, Projectile } from '@/core-engine/types/molecular-combat';
import { MoleculeParticle } from './MoleculeInvader';
import { IonProjectile } from './IonProjectile';
import { PlayerCannon } from './PlayerCannon';
import { useSound } from '@/hooks/useSound';
import { isColliding, getCollisionResult } from '@/core-engine/utils/collision-utils';
import { getLevelSpawns, resolveLevelConfig } from '@/core-engine/utils/level-manager';
// Centralized imports from the single config file
import { NEUTRALISE_CONFIG } from '@/core-engine/config/games/neutralise-config';
import { isNeutralizationCompatible } from '@/core-engine/utils/chemical-utils';
import { assignSpawnSlots } from '@/core-engine/utils/spawn-manager';

interface NeutralizeArenaProps {
  level: number;
  wave: number;
  enemyCount: number;
  onEnemyDefeated: (points: number) => void;
  onPlayerHit: () => void;
  isPaused: boolean;
}

export default function NeutralizeArena({
  level,
  wave,
  enemyCount,
  onEnemyDefeated,
  onPlayerHit,
  isPaused,
}: NeutralizeArenaProps) {
  const { playSound } = useSound();
  const arenaRef = useRef<HTMLDivElement>(null);

  const [playerX, setPlayerX] = useState<number>(250);
  const [activeMissile, setActiveMissile] = useState<'H-ion' | 'OH-ion'>('H-ion');
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [invaders, setInvaders] = useState<MoleculeInvader[]>([]);

  const invadersRef = useRef(invaders);
  const projectilesRef = useRef(projectiles);
  const playerXRef = useRef(playerX);
  const activeMissileRef = useRef(activeMissile);
  const lastFiredRef = useRef<number>(0);

  const callbacksRef = useRef({ onEnemyDefeated, onPlayerHit });
  useEffect(() => {
    callbacksRef.current = { onEnemyDefeated, onPlayerHit };
  }, [onEnemyDefeated, onPlayerHit]);

  const FIRE_COOLDOWN = 250; // Milliseconds between shots

  useEffect(() => {
    invadersRef.current = invaders;
  }, [invaders]);
  useEffect(() => {
    projectilesRef.current = projectiles;
  }, [projectiles]);
  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);
  useEffect(() => {
    activeMissileRef.current = activeMissile;
  }, [activeMissile]);

  // Sync refs instantly to prevent the game loop from wiping out new spawns
  useEffect(() => {
    const levelConfig = resolveLevelConfig(level);
      
    // Added level argument to enforce maxEnemies via level-manager
    const rawSpawns = getLevelSpawns(enemyCount, levelConfig.compoundPoolIds, level);

    // Convert to real pixel bounds so invaders are placed — and stay —
    // fully inside the visible arena: never off either side, never above it.
    const arenaWidth = arenaRef.current?.clientWidth || NEUTRALISE_CONFIG.arena.width;
    const invaderW = NEUTRALISE_CONFIG.invaders.dimensions.width;
    const maxX = Math.max(0, arenaWidth - invaderW);
    const topPadding = NEUTRALISE_CONFIG.arena.padding;

    const slots = assignSpawnSlots(rawSpawns.length, NEUTRALISE_CONFIG.lanes);

    const positionedSpawns = rawSpawns.map((invader, i) => {
      const slot = slots[i];
      return {
        ...invader,
        x: (slot.xPercent / 100) * maxX,
        y: topPadding + slot.row * NEUTRALISE_CONFIG.invaders.verticalGap,
      };
    });

    setInvaders(positionedSpawns);
    invadersRef.current = positionedSpawns; // Instantly sync!

    setProjectiles([]);
    projectilesRef.current = []; // Instantly sync!
  }, [level, wave, enemyCount]);

  const fireProjectile = useCallback(() => {
    if (isPaused) return;

    const now = Date.now();
    if (now - lastFiredRef.current < FIRE_COOLDOWN) return;
    lastFiredRef.current = now;

    playSound('laser-pew');

    const projectile: Projectile = {
      id: crypto.randomUUID(),
      x: playerXRef.current - 16,
      y: 500,
      damageType: activeMissileRef.current,
      speed: NEUTRALISE_CONFIG.player.projectileSpeed,
      isPlayerOwned: true,
    };

    const nextProjectiles = [...projectilesRef.current, projectile];
    projectilesRef.current = nextProjectiles;
    setProjectiles(nextProjectiles);
  }, [playSound, isPaused]);

  const toggleWeapon = useCallback(() => {
    playSound('click');
    setActiveMissile((prev) => (prev === 'H-ion' ? 'OH-ion' : 'H-ion'));
  }, [playSound]);

  // Shared by mouse (desktop) and touch (mobile/tablet) input so both
  // pointer types drive the cannon the same way: position it directly
  // under the pointer/finger, relative to the arena's own bounding box.
  const movePlayerToClientX = useCallback(
    (clientX: number) => {
      if (isPaused || !arenaRef.current) return;
      const rect = arenaRef.current.getBoundingClientRect();
      setPlayerX(clientX - rect.left);
    },
    [isPaused]
  );

  // Touch equivalent of onMouseMove: a finger drag across the arena has no
  // native mousemove counterpart, so without this handler touch/tablet
  // users have no way to aim the cannon at all.
  const handleArenaTouch = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      if (!touch) return;
      movePlayerToClientX(touch.clientX);
    },
    [movePlayerToClientX]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return;
      if (e.key === 'ArrowLeft') setPlayerX((prev) => Math.max(20, prev - 20));
      if (e.key === 'ArrowRight') {
        const maxRight = arenaRef.current ? arenaRef.current.clientWidth - 20 : 800;
        setPlayerX((prev) => Math.min(maxRight, prev + 20));
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
        .map((p) => ({ ...p, y: p.y + p.speed }))
        .filter((p) => p.y > -50);

      const dropSpeed =
        NEUTRALISE_CONFIG.invaders.baseDropSpeed +
        level * NEUTRALISE_CONFIG.invaders.speedMultiplierPerLevel;
      currentInvaders = currentInvaders.map((inv) => ({
        ...inv,
        y: inv.y + dropSpeed,
      }));

      const survivingProjectiles: Projectile[] = [];

      currentProjectiles.forEach((p) => {
        const hitIndex = currentInvaders.findIndex(
          (inv) =>
            inv.isAlive &&
            isColliding(
              { x: p.x, y: p.y },
              {
                width: NEUTRALISE_CONFIG.player.projectileDimensions.width,
                height: NEUTRALISE_CONFIG.player.projectileDimensions.height,
              },
              { x: inv.x, y: inv.y },
              {
                width: NEUTRALISE_CONFIG.invaders.dimensions.width,
                height: NEUTRALISE_CONFIG.invaders.dimensions.height,
              }
            )
        );

        if (hitIndex !== -1) {
          const invader = currentInvaders[hitIndex];
          const isCompatible = isNeutralizationCompatible(
            invader.type,
            p.damageType
          );

          if (isCompatible) {
            const { isDefeated, remainingHealth } = getCollisionResult(
              invader,
              1
            );
            currentInvaders[hitIndex].currentHealth = remainingHealth;
            currentInvaders[hitIndex].isAlive = !isDefeated;

            if (isDefeated) {
              playSound('splash-defeat');
              setTimeout(
                () => callbacksRef.current.onEnemyDefeated(100),
                0
              );
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

      // Boundary check uses the arena's ACTUAL rendered height, not the
      // fixed config constant: the arena now flexes to fit the viewport
      // (see the className below), so on a shrunk mobile arena the fixed
      // config height would no longer match what's on screen, and invaders
      // would visually vanish off the bottom before this ever registered a
      // hit. Falls back to the config value only if the ref isn't ready yet.
      const renderedArenaHeight = arenaRef.current?.clientHeight ?? NEUTRALISE_CONFIG.arena.height;
      currentInvaders.forEach((inv) => {
        if (
          inv.y > renderedArenaHeight - NEUTRALISE_CONFIG.invaders.dimensions.height &&
          inv.isAlive
        ) {
          callbacksRef.current.onPlayerHit();
          inv.isAlive = false;
        }
      });

      const survivingInvaders = currentInvaders.filter((i) => i.isAlive);

      projectilesRef.current = survivingProjectiles;
      invadersRef.current = survivingInvaders;
      setProjectiles(survivingProjectiles);
      setInvaders(survivingInvaders);
    }, NEUTRALISE_CONFIG.engine.tickRate);

    return () => clearInterval(gameLoop);
  }, [playSound, isPaused, level]);

  const isAcid = activeMissile === 'H-ion';

  return (
    // flex-1 + min-h-0 lets this whole block shrink to whatever space the
    // page actually has, instead of assuming a fixed viewport height.
    <div className="flex flex-1 min-h-0 flex-col gap-3">
      <div
        ref={arenaRef}
        data-testid="neutralise-arena"
        onMouseMove={(e) => {
          if (!isPaused && arenaRef.current) {
            setPlayerX(
              e.clientX - arenaRef.current.getBoundingClientRect().left
            );
          }
        }}
        onClick={fireProjectile}
        onContextMenu={(e) => {
          e.preventDefault();
          if (!isPaused) toggleWeapon();
        }}
        // Dragging a finger aims the cannon, same as mouse-move on desktop.
        onTouchStart={handleArenaTouch}
        onTouchMove={handleArenaTouch}
        // Prevents the browser from treating the drag as a page-scroll or
        // pinch-zoom gesture, which would otherwise fight with aiming.
        style={{ touchAction: 'none' }}
        // No more fixed h-125 (500px): that ignored how much vertical space
        // was actually left on short phone screens, which is what pushed
        // the Fire/switch buttons below the fold. flex-1 lets it take
        // whatever room the page gives it; min-h keeps it from collapsing
        // too small to play; md:max-h caps it back to the original size on
        // roomier screens.
        className="relative w-full flex-1 min-h-[240px] md:max-h-125 cursor-crosshair overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)]"
      >
        {invaders.map((invader) => (
          <MoleculeParticle key={invader.id} data={invader} />
        ))}
        {projectiles.map((proj) => (
          <IonProjectile key={proj.id} projectile={proj as any} />
        ))}
        <PlayerCannon x={playerX} activeMissile={activeMissile} />
      </div>

      {/* Touch/tablet control bar. Tapping the arena still fires (kept for
          consistency with desktop click-to-fire), but a drag-then-release
          doesn't reliably register as a "tap" on every mobile browser, and
          there's no touch equivalent of right-click for switching ions —
          so both actions get an explicit, always-visible button here. */}
      <div className="flex md:hidden shrink-0 items-center justify-center gap-3 px-2 pb-[env(safe-area-inset-bottom)]">
        <button
          type="button"
          onClick={toggleWeapon}
          disabled={isPaused}
          aria-label={`Switch ion, currently ${isAcid ? 'H+ acid' : 'OH- base'}`}
          className={`flex-1 max-w-40 rounded-xl border-2 py-2 font-mono text-sm font-black text-white shadow-lg active:scale-95 transition-transform ${
            isAcid
              ? 'bg-rose-500/80 border-rose-400'
              : 'bg-indigo-500/80 border-indigo-400'
          }`}
        >
          Switch to {isAcid ? 'OH⁻' : 'H⁺'}
        </button>
        <button
          type="button"
          onClick={fireProjectile}
          disabled={isPaused}
          aria-label="Fire"
          className="flex-1 max-w-40 rounded-xl border-2 border-slate-500 bg-slate-800 py-2 font-mono text-sm font-black text-white shadow-lg active:scale-95 transition-transform"
        >
          Fire
        </button>
      </div>
    </div>
  );
}