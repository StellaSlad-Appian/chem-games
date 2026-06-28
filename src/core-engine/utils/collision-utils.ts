/**
 * Pure utility functions for handling collision detection in the game Neutralise.
 * These functions have no dependencies on React, making them easy to unit test.
 */

import { MoleculeInvader } from '../types/molecular-combat';

/**
 * Determines if two rectangular hitboxes are overlapping.
 */
export const isColliding = (
  objA: { x: number; y: number }, 
  dimA: { width: number; height: number }, 
  objB: { x: number; y: number }, 
  dimB: { width: number; height: number }, 
  margin: number = 0
): boolean => {
  return (
    objA.x < objB.x + dimB.width + margin &&
    objA.x + dimA.width + margin > objB.x &&
    objA.y < objB.y + dimB.height + margin &&
    objA.y + dimA.height + margin > objB.y
  );
};

/**
 * Updates the invader's health based on damage and determines if it is defeated.
 */
export const getCollisionResult = (
  invader: MoleculeInvader, 
  damage: number
): { isDefeated: boolean; remainingHealth: number } => {
  // We use Math.floor to ensure health is always an integer
  const newHealth = Math.max(0, Math.floor(invader.currentHealth - damage));
  
  return {
    isDefeated: newHealth <= 0,
    remainingHealth: newHealth
  };
};