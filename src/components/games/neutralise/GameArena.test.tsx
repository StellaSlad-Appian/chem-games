import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, screen } from '@testing-library/react';
import NeutralizeArena from './GameArena';
import { renderWithProviders } from '@/test-utils/render';
import { NEUTRALISE_CONFIG } from '@/core-engine/config/games/neutralise-config';

// jsdom reports every element as 0×0. The arena uses clientHeight to decide
// when an invader has reached the floor, so give it a real size per test.
const originalHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight');
const originalWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');

function setArenaSize(height: number, width = 800) {
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, get: () => height });
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => width });
}

function restoreArenaSize() {
  if (originalHeight) Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalHeight);
  if (originalWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalWidth);
}

const readTranslate = (el: HTMLElement) => {
  const m = el.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
  if (!m) throw new Error(`No translate() in "${el.style.transform}"`);
  return { x: parseFloat(m[1]), y: parseFloat(m[2]) };
};

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const invaders = () => screen.queryAllByTestId('invader');
const projectiles = () => screen.queryAllByTestId('projectile');
const cannon = () => screen.getByTestId('player-cannon');
const press = (key: string) => fireEvent.keyDown(window, { key });

function renderArena(overrides: Partial<Parameters<typeof NeutralizeArena>[0]> = {}) {
  const onEnemyDefeated = vi.fn();
  const onPlayerHit = vi.fn();
  renderWithProviders(
    <NeutralizeArena
      level={1}
      wave={1}
      enemyCount={2}
      onEnemyDefeated={onEnemyDefeated}
      onPlayerHit={onPlayerHit}
      isPaused={false}
      {...overrides}
    />
  );
  return { onEnemyDefeated, onPlayerHit, arena: screen.getByTestId('neutralise-arena') };
}

/** Moves the cannon directly under the first invader (jsdom rects start at 0,0). */
function aimAtFirstInvader(arena: HTMLElement) {
  const target = readTranslate(invaders()[0]);
  fireEvent.mouseMove(arena, { clientX: target.x + 30, clientY: 100 });
}

describe('Neutralise GameArena (real engine, fake timers)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Deterministic spawns: always the first compound of the level pool (HCl).
    vi.spyOn(Math, 'random').mockReturnValue(0);
    setArenaSize(500);
  });

  afterEach(() => {
    vi.useRealTimers();
    restoreArenaSize();
  });

  it('spawns the requested invaders from the level pool inside the arena', () => {
    renderArena();
    expect(invaders()).toHaveLength(2);
    invaders().forEach((invader) => {
      expect(invader).toHaveAttribute('data-formula', 'HCl');
      const { x, y } = readTranslate(invader);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(800 - NEUTRALISE_CONFIG.invaders.dimensions.width);
      expect(y).toBeGreaterThanOrEqual(NEUTRALISE_CONFIG.arena.padding);
    });
  });

  it('loads H+ by default and switches ions with the 1 and 2 keys', () => {
    renderArena();
    expect(cannon()).toHaveAttribute('data-ion', 'H-ion');
    expect(cannon()).toHaveTextContent('H⁺');
    press('2');
    expect(cannon()).toHaveAttribute('data-ion', 'OH-ion');
    expect(cannon()).toHaveTextContent('OH⁻');
    press('1');
    expect(cannon()).toHaveAttribute('data-ion', 'H-ion');
  });

  it('fires with Space and enforces the shot cooldown', () => {
    renderArena();
    press(' ');
    expect(projectiles()).toHaveLength(1);
    press(' ');
    expect(projectiles()).toHaveLength(1); // still cooling down
    advance(300);
    press(' ');
    expect(projectiles()).toHaveLength(2);
  });

  it('moves the cannon with the arrow keys and the mouse', () => {
    const { arena } = renderArena();
    expect(cannon().style.transform).toContain('translateX(250px)');
    press('ArrowLeft');
    expect(cannon().style.transform).toContain('translateX(230px)');
    press('ArrowRight');
    press('ArrowRight');
    expect(cannon().style.transform).toContain('translateX(270px)');
    fireEvent.mouseMove(arena, { clientX: 400, clientY: 100 });
    expect(cannon().style.transform).toContain('translateX(400px)');
  });

  it('a mismatched ion fizzles: the projectile is spent and the invader survives', () => {
    const { arena, onEnemyDefeated } = renderArena();
    aimAtFirstInvader(arena);
    press(' '); // H+ against an acid
    advance(1500);
    expect(projectiles()).toHaveLength(0);
    expect(invaders()).toHaveLength(2);
    expect(onEnemyDefeated).not.toHaveBeenCalled();
  });

  it('the matching ion neutralises the invader and awards 100 points', () => {
    const { arena, onEnemyDefeated } = renderArena();
    press('2'); // OH- against an acid
    aimAtFirstInvader(arena);
    press(' ');
    advance(1500);
    expect(invaders()).toHaveLength(1);
    expect(onEnemyDefeated).toHaveBeenCalledWith(100);
  });

  it('an invader that reaches the floor costs the player a hit', () => {
    restoreArenaSize();
    setArenaSize(120); // short arena so the drop finishes quickly
    const { onPlayerHit } = renderArena();
    advance(6000);
    expect(onPlayerHit).toHaveBeenCalled();
    expect(invaders()).toHaveLength(0);
  });

  it('freezes invaders and ignores input while paused', () => {
    renderArena({ isPaused: true });
    const before = readTranslate(invaders()[0]);
    advance(1000);
    expect(readTranslate(invaders()[0])).toEqual(before);
    press(' ');
    expect(projectiles()).toHaveLength(0);
    press('ArrowLeft');
    expect(cannon().style.transform).toContain('translateX(250px)');
  });

  it('the touch controls fire and switch ions too', () => {
    renderArena();
    fireEvent.click(screen.getByRole('button', { name: /Switch ion/ }));
    expect(cannon()).toHaveAttribute('data-ion', 'OH-ion');
    fireEvent.click(screen.getByRole('button', { name: 'Fire' }));
    expect(projectiles()).toHaveLength(1);
  });
});
