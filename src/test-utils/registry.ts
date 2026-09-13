// Lookup helpers so tests can reference chemistry data by formula/name
// instead of hard-coding registry indices.
import { COMPOUNDS_REGISTRY } from '@/core-engine/data/compounds';
import type { CompoundData } from '@/core-engine/types/chemistry';

export function compoundByFormula(formula: string): CompoundData {
  const compound = COMPOUNDS_REGISTRY.find((c) => c.formula === formula);
  if (!compound) throw new Error(`No compound with formula "${formula}" in COMPOUNDS_REGISTRY`);
  return compound;
}

export function compoundById(id: string): CompoundData {
  const compound = COMPOUNDS_REGISTRY.find((c) => c.id === id);
  if (!compound) throw new Error(`No compound with id "${id}" in COMPOUNDS_REGISTRY`);
  return compound;
}

export function compoundByName(name: string): CompoundData {
  const compound = COMPOUNDS_REGISTRY.find((c) => c.name === name);
  if (!compound) throw new Error(`No compound named "${name}" in COMPOUNDS_REGISTRY`);
  return compound;
}

export function compoundsAtDifficulty(level: number): CompoundData[] {
  return COMPOUNDS_REGISTRY.filter((c) => c.difficulty === level);
}
