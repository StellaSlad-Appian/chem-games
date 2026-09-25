import { describe, expect, it } from 'vitest';
import { detectFormulas, segmentChemText } from './chem-text';

describe('segmentChemText', () => {
  it.each([
    'sulfate SO4 2− vs sulfite SO3 2−; nitrate NO3− vs nitrite NO2−.',
    'The only common polyatomic cation is ammonium, NH4+ (apart from hydronium, H3O+, which you meet in acids).',
    'carbonate (CO3 2− → HCO3−) and n(H2O) = 2 × n(O2).',
    'Stickstoff- und Halogengruppen: Amin (–NH2), l’NO2, OH-Gruppe, H+-Konzentration.',
    '',
    '   leading and trailing   ',
  ])('gives back the input exactly when joined: %j', (text) => {
    expect(
      segmentChemText(text)
        .map((segment) => segment.value)
        .join('')
    ).toBe(text);
  });

  it('keeps the punctuation around a formula as plain text', () => {
    expect(segmentChemText('ammonium, NH4+, and (CO3 2− → HCO3−).')).toEqual([
      { type: 'text', value: 'ammonium, ' },
      { type: 'formula', value: 'NH4+' },
      { type: 'text', value: ', and (' },
      { type: 'formula', value: 'CO3 2− → HCO3−' },
      { type: 'text', value: ').' },
    ]);
  });
});

describe('detectFormulas: formulae', () => {
  it.each<[string, string[]]>([
    // Subscripts, brackets, coefficients.
    ['water is H2O.', ['H2O']],
    ['Ca(OH)2, not CaOH2', ['Ca(OH)2', 'CaOH2']],
    ['it needs brackets: Al2(SO4)3.', ['Al2(SO4)3']],
    ['(NH4)2SO4 is a salt', ['(NH4)2SO4']],
    ['(2Ca(OH)2 + …', ['2Ca(OH)2']],
    ['CH3COOH, ethanoic acid', ['CH3COOH']],
    // Charges: ASCII, U+2212, attached, and as a separate word.
    ['ammonium, NH4+', ['NH4+']],
    ['hydrogen carbonate HCO3−.', ['HCO3−']],
    ['hydroxide OH−, cyanide CN−', ['OH−', 'CN−']],
    ['OH-, and OH-.', ['OH-', 'OH-']],
    ['Na+ and Ca2+ and O2-', ['Na+', 'Ca2+', 'O2-']],
    ['sulfate SO4 2− vs sulfite SO3 2−', ['SO4 2−', 'SO3 2−']],
    ['iron(III) = Fe 3+.', ['Fe 3+']],
    ['Al 3+ and SO4 2−.', ['Al 3+', 'SO4 2−']],
    ['peroxide O2 2−.', ['O2 2−']],
    ['ASCII SO4 2- too', ['SO4 2-']],
    // Equations.
    ['Mg + 2HCl → MgCl2 + H2', ['Mg + 2HCl → MgCl2 + H2']],
    ['always H+ + OH- → H2O.', ['H+ + OH- → H2O']],
    ['burns: 2H2 + O2 → 2H2O. Then', ['2H2 + O2 → 2H2O']],
    ['(CO3 2− → HCO3−)', ['CO3 2− → HCO3−']],
    ['Na → Na+ + e−', ['Na → Na+']],
    // "+" alone is two formulae, not an equation.
    ['CO2 + H2O', ['CO2', 'H2O']],
    // Punctuation around a formula.
    ['bent (H2O).', ['H2O']],
    ['(or NH4+) → ionic', ['NH4+']],
    ['amine (–NH2), amide (–CONH2)', ['NH2', 'CONH2']],
    ['Ratio H2 : H2O = 2 : 2', ['H2', 'H2O']],
    ['n(H2) = 8.0 ÷ 2.0; m(H2O) = 72 g', ['H2', 'H2O']],
    ['l’NO2 e l’SF6', ['NO2', 'SF6']],
    ['„CO2“ und «H2O»', ['CO2', 'H2O']],
    // A formula at the head of a compound word.
    ['die H+-Konzentration', ['H+']],
    ['ein CO2-Molekül', ['CO2']],
    // Formulae in lookup-table cells.
    ['CO2 carbon dioxide', ['CO2']],
    ['SO4 2− sulfate → H2SO4 sulfuric acid', ['SO4 2−', 'H2SO4']],
  ])('%j → %j', (text, expected) => {
    expect(detectFormulas(text)).toEqual(expected);
  });
});

describe('detectFormulas: not formulae', () => {
  it.each([
    // Words in the six languages, including ones made of element symbols.
    'NO, no lo sé', // Spanish; "NO" is also nitrogen monoxide, but has no digit
    'Comme Cosa Como',
    'I gas nobili',
    'In the lab, As always, He said',
    'Кислоты и основания',
    'Cations + anions',
    'CO carbon monoxide',
    'Cl⁻ chloride → HCl hydrochloric acid',
    'Cu, Fe, Al',
    'A + B → AB and AB + CD → AD + CB',
    'A + BC → AC + B',
    // pH, groups, charges on their own, arithmetic.
    'pH 7, pH-Skala',
    'Group 1 → +1, Group 2 → +2, Al → +3, Group 17 → −1',
    'Gruppe 1 → +1',
    'Confusing the charge (2−) with the number of oxygens — 4 O and charge 2−.',
    '2 × (+3) = +6 and 3 × (−2) = −6.',
    '2 × 1 + 16 = 18',
    '40 + 2 × (14 + 3 × 16) = 164',
    // Years, units, percentages.
    'In 1869 and 2026',
    'N_A = 6.02 × 10²³ mol⁻¹, 3000 cm⁻¹',
    'V_m = 24.8 L/mol at 25 °C and 100 kPa',
    '78 %, 21 % und 0,9 %',
    // IUPAC names and locants.
    'propan-2-ol, 2-methyl, 3-Chlor., 2,2-Dimethylpropan-1-ol, But-2-en',
    // Isotopes.
    'carbon-14, Cl-35, U-238, Kohlenstoff-12, Iod-131, Radon-222, Cobalt-60',
    'L’uranio-238',
    // Unicode sub/superscripts are already typeset.
    'H₂O, Cr₂O₇²⁻, SO₄²⁻, CₙH₂ₙ₊₂, OH⁻(aq)',
    // Suffixes and prefixes.
    '"-ate" has more oxygen than "-ite"; "per-…-ate", "hypo-…-ite"',
    '„-at“-Ionen, „Hypo-…-it“, „Per-…-at“, Mono-, Di-, Tri-',
    // Compounds whose first part has no digit or charge.
    'OH-Gruppe, OH-Einheiten, C=O-Bande, C–H-Banden, IR-Tabelle',
    // Letters that are not element symbols.
    '3D, HX, X₂, e⁻, VSEPR',
  ])('%j', (text) => {
    expect(detectFormulas(text)).toEqual([]);
  });

  it('finds the formula next to a percentage but not the percentage', () => {
    expect(detectFormulas('78 % N2O')).toEqual(['N2O']);
  });
});
