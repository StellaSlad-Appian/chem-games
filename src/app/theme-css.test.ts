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
    if (rule.selector === selector && underMedia === inMedia) found.push(rule);
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
