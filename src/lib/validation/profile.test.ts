import { describe, expect, it } from 'vitest';
import {
  ALIAS_MAX_LENGTH,
  ALIAS_MIN_LENGTH,
  COUNTRY_MAX_LENGTH,
  LAB_NOTES_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  YEAR_LEVEL_OPTIONS,
  capLength,
  normaliseOptionalText,
  normaliseText,
  validateAlias,
  validateProfileForm,
  validateYearLevel,
} from './profile';

const validForm = {
  alias: 'Curious Argon 4821',
  title: 'Research Chemist',
  country: 'Australia',
  yearLevel: 'Year 9',
  labNotes: 'Likes titrations.',
};

describe('validateAlias', () => {
  it('accepts a trimmed alias within the length limits', () => {
    expect(validateAlias('  Curious Argon 4821  ')).toEqual({ ok: true, value: 'Curious Argon 4821' });
    expect(validateAlias('ab')).toEqual({ ok: true, value: 'ab' });
    expect(validateAlias('x'.repeat(ALIAS_MAX_LENGTH))).toEqual({ ok: true, value: 'x'.repeat(ALIAS_MAX_LENGTH) });
  });

  it('rejects an alias that is too short after trimming', () => {
    for (const raw of ['', ' ', 'a', '  a  ', null, undefined, 42]) {
      const result = validateAlias(raw);
      expect(result.ok, `raw=${String(raw)}`).toBe(false);
    }
  });

  it('rejects an alias longer than the maximum', () => {
    const result = validateAlias('x'.repeat(ALIAS_MAX_LENGTH + 1));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toContain(`${ALIAS_MIN_LENGTH} and ${ALIAS_MAX_LENGTH}`);
  });

  it('counts code points, not UTF-16 units, like Postgres char_length()', () => {
    const emoji = '\u{1F9EA}'; // test tube, two UTF-16 units
    expect(validateAlias(emoji.repeat(ALIAS_MAX_LENGTH)).ok).toBe(true);
    expect(validateAlias(emoji.repeat(ALIAS_MAX_LENGTH + 1)).ok).toBe(false);
  });

  it('rejects anything containing an @ so an email address can never be public', () => {
    const result = validateAlias('stella.slad@yahoo.com');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toMatch(/@/);
    expect(validateAlias('a@b').ok).toBe(false);
  });

  it('ignores non-string input such as a File', () => {
    expect(validateAlias(new Blob(['Curious Argon 4821'])).ok).toBe(false);
  });
});

describe('validateYearLevel', () => {
  it('accepts exactly the options offered by the edit form', () => {
    expect(YEAR_LEVEL_OPTIONS).toEqual(['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Senior']);
    for (const option of YEAR_LEVEL_OPTIONS) {
      expect(validateYearLevel(option)).toEqual({ ok: true, value: option });
    }
  });

  it('treats empty, whitespace-only and non-string input as unset', () => {
    expect(validateYearLevel('')).toEqual({ ok: true, value: null });
    expect(validateYearLevel('   ')).toEqual({ ok: true, value: null });
    expect(validateYearLevel(null)).toEqual({ ok: true, value: null });
    expect(validateYearLevel(undefined)).toEqual({ ok: true, value: null });
  });

  it('rejects values that are not in the list, including near misses', () => {
    for (const raw of ['Year 11', 'year 9', 'Year9', 'Senior ', 'Junior', 'admin']) {
      // 'Senior ' is trimmed and therefore valid; everything else must fail.
      const expected = raw.trim() === 'Senior';
      expect(validateYearLevel(raw).ok, `raw="${raw}"`).toBe(expected);
    }
  });
});

describe('capLength', () => {
  it('returns short strings unchanged', () => {
    expect(capLength('abc', 3)).toBe('abc');
    expect(capLength('', 3)).toBe('');
  });

  it('truncates by code point without splitting surrogate pairs', () => {
    expect(capLength('abcdef', 3)).toBe('abc');
    const emoji = '\u{1F9EA}';
    expect(capLength(`a${emoji}b`, 2)).toBe(`a${emoji}`);
    expect(capLength(`a${emoji}b`, 1)).toBe('a');
  });
});

describe('normaliseOptionalText / normaliseText', () => {
  it('trims and maps empty to null for optional fields', () => {
    expect(normaliseOptionalText('  Australia ', COUNTRY_MAX_LENGTH)).toBe('Australia');
    expect(normaliseOptionalText('   ', COUNTRY_MAX_LENGTH)).toBeNull();
    expect(normaliseOptionalText(null, COUNTRY_MAX_LENGTH)).toBeNull();
    expect(normaliseOptionalText(undefined, TITLE_MAX_LENGTH)).toBeNull();
  });

  it('caps optional fields at the column limit', () => {
    expect(normaliseOptionalText('t'.repeat(TITLE_MAX_LENGTH + 5), TITLE_MAX_LENGTH)).toBe(
      't'.repeat(TITLE_MAX_LENGTH)
    );
  });

  it('keeps required text as an empty string rather than null', () => {
    expect(normaliseText(null, LAB_NOTES_MAX_LENGTH)).toBe('');
    expect(normaliseText('  notes  ', LAB_NOTES_MAX_LENGTH)).toBe('notes');
    expect(normaliseText('n'.repeat(LAB_NOTES_MAX_LENGTH + 1), LAB_NOTES_MAX_LENGTH)).toHaveLength(
      LAB_NOTES_MAX_LENGTH
    );
  });
});

describe('validateProfileForm', () => {
  it('returns the normalised fields for a valid submission', () => {
    expect(validateProfileForm(validForm)).toEqual({
      ok: true,
      value: {
        alias: 'Curious Argon 4821',
        title: 'Research Chemist',
        country: 'Australia',
        yearLevel: 'Year 9',
        labNotes: 'Likes titrations.',
      },
    });
  });

  it('maps blank optional fields to null and blank lab notes to an empty string', () => {
    const result = validateProfileForm({ ...validForm, title: '', country: null, yearLevel: '', labNotes: null });
    expect(result).toEqual({
      ok: true,
      value: { alias: 'Curious Argon 4821', title: null, country: null, yearLevel: null, labNotes: '' },
    });
  });

  it('fails on an invalid alias before looking at anything else', () => {
    const result = validateProfileForm({ ...validForm, alias: 'me@example.com', yearLevel: 'bogus' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toMatch(/@/);
  });

  it('fails on a year level that is not one of the form options', () => {
    const result = validateProfileForm({ ...validForm, yearLevel: 'Year 12' });
    expect(result).toEqual({ ok: false, message: 'Please choose a year level from the list.' });
  });

  it('caps every free-text field at its column limit', () => {
    const result = validateProfileForm({
      ...validForm,
      title: 't'.repeat(TITLE_MAX_LENGTH + 1),
      country: 'c'.repeat(COUNTRY_MAX_LENGTH + 1),
      labNotes: 'n'.repeat(LAB_NOTES_MAX_LENGTH + 1),
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.title).toHaveLength(TITLE_MAX_LENGTH);
      expect(result.value.country).toHaveLength(COUNTRY_MAX_LENGTH);
      expect(result.value.labNotes).toHaveLength(LAB_NOTES_MAX_LENGTH);
    }
  });
});
