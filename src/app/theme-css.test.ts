// src/app/theme-css.test.ts
//
// The light theme is written twice in globals.css: once for an explicit
// `[data-theme='light']` and once for a reader on Device whose OS prefers
// light (`@media (prefers-color-scheme: light) { :root:not([data-theme]) }`).
// See the Themes comment at the top of globals.css for why. This keeps the two
// copies from drifting — a token added to one and not the other would show a
// different light theme depending on how the reader got there.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import postcss, { type Rule } from 'postcss';
import { describe, expect, it } from 'vitest';

const root = postcss.parse(readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8'));

const declarations = (rule: Rule) =>
  rule.nodes.flatMap((node) => (node.type === 'decl' ? [`${node.prop}: ${node.value}`] : []));

const rulesFor = (selector: string, inMedia: boolean) => {
  const found: Rule[] = [];
  root.walkRules((rule) => {
    const parent = rule.parent;
    const underMedia =
      parent?.type === 'atrule' && (parent as postcss.AtRule).params === '(prefers-color-scheme: light)';
    // Selectors are compared with their whitespace collapsed, so a selector
    // list split over two lines in the stylesheet can be named on one here.
    if (rule.selector.replace(/\s+/g, ' ') === selector && underMedia === inMedia) found.push(rule);
  });
  return found;
};

describe('the two copies of the light theme', () => {
  const explicit = rulesFor("[data-theme='light']", false);
  const device = rulesFor(':root:not([data-theme])', true);

  it('exist in pairs (the main tokens and the periodic-table tones)', () => {
    expect(explicit.length).toBe(2);
    expect(device.length).toBe(explicit.length);
  });

  it('declare exactly the same tokens with the same values', () => {
    explicit.forEach((rule, index) => {
      expect(declarations(device[index])).toEqual(declarations(rule));
    });
  });

  it('switch the browser chrome to light as well', () => {
    expect(declarations(explicit[0])).toContain('color-scheme: light');
  });
});

// The other half of the rule: a token that changes with the theme has a value
// in the dark block AND the light block, and one that does not change lives
// once in the fixed `:root` block. A token only in the dark block would
// silently keep its dark value on a light page — the bug that painted
// `.chem-btn-correct` dark green on white.
describe('the dark and light themes', () => {
  const names = (rule: Rule) =>
    rule.nodes.flatMap((node) => (node.type === 'decl' && node.prop.startsWith('--') ? [node.prop] : []));
  const dark = rulesFor(":root, [data-theme='dark']", false);
  const light = rulesFor("[data-theme='light']", false);
  const fixed = rulesFor(':root', false);

  it('are found (the main tokens and the periodic-table tones)', () => {
    expect(dark.length).toBe(2);
    expect(light.length).toBe(dark.length);
    expect(fixed.length).toBe(1);
  });

  it('define exactly the same tokens', () => {
    dark.forEach((rule, index) => {
      expect([...names(light[index])].sort()).toEqual([...names(rule)].sort());
    });
  });

  it('leave the fixed tokens to the fixed block', () => {
    const themed = new Set(dark.flatMap(names));
    expect(names(fixed[0]).filter((name) => themed.has(name))).toEqual([]);
  });

  it('define every token a var() in the fixed block refers to', () => {
    const defined = new Set([...dark.flatMap(names), ...names(fixed[0])]);
    const referenced = fixed[0].nodes.flatMap((node) =>
      node.type === 'decl' ? [...node.value.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]) : []
    );
    // --font-nunito comes from next/font, not from this file.
    expect(referenced.filter((name) => !defined.has(name) && name !== '--font-nunito')).toEqual([]);
  });
});
