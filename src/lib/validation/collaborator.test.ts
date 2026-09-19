// src/lib/validation/collaborator.test.ts
//
// The collaborator validator. Required by docs/COLLABORATORS.md § 6: caps,
// email shapes, trimming, blank-to-null.
//
// The reason the email cases are written out one by one rather than summarised
// is that this is the only required field on the form, and both of its failure
// modes cost something real: too strict and a teacher with a perfectly good
// address is told it is wrong and leaves; too loose and the maintainer emails
// a typo. The pattern here deliberately errs towards accepting, so the
// "accepts" list below is the one that matters.

import { describe, expect, it } from 'vitest';
import {
  COLLABORATOR_COUNTRY_MAX_LENGTH,
  COLLABORATOR_EMAIL_MAX_LENGTH,
  COLLABORATOR_MESSAGE_MAX_LENGTH,
  COLLABORATOR_NAME_MAX_LENGTH,
  COLLABORATOR_SCHOOL_MAX_LENGTH,
  COLLABORATOR_SUBJECTS_MAX_LENGTH,
  COLLABORATOR_YEAR_LEVELS_MAX_LENGTH,
  isCollaboratorEmail,
  optionalText,
  validateCollaborator,
} from './collaborator';

const ok = (input: unknown) => {
  const result = validateCollaborator(input);
  if (!result.ok) throw new Error(`expected valid, got: ${result.error}`);
  return result.value;
};

const fail = (input: unknown) => {
  const result = validateCollaborator(input);
  if (result.ok) throw new Error('expected invalid, got a value');
  return result;
};

describe('isCollaboratorEmail', () => {
  it('accepts the shapes real school addresses come in', () => {
    for (const email of [
      'a@b.co',
      'teacher@school.edu.au',
      'first.last@grammar.vic.edu.au',
      'first+chemgames@example.com',
      "o'brien@school.ie",
      'lehrkraft@gymnasium-münchen.de',
      'учитель@школа.рф',
      'TEACHER@SCHOOL.EDU.AU',
    ]) {
      expect(isCollaboratorEmail(email), email).toBe(true);
    }
  });

  it('rejects what is plainly not an address', () => {
    for (const value of [
      '',
      'teacher',
      'teacher@school',
      '@school.edu.au',
      'teacher@',
      'teacher@@school.edu.au',
      'two addresses@a.com,b@c.com',
      'Name <name@school.edu.au>',
      'teacher @school.edu.au',
      'teacher@school .edu.au',
    ]) {
      expect(isCollaboratorEmail(value), JSON.stringify(value)).toBe(false);
    }
  });

  it('rejects anything that is not a string', () => {
    expect(isCollaboratorEmail(undefined)).toBe(false);
    expect(isCollaboratorEmail(null)).toBe(false);
    expect(isCollaboratorEmail(42)).toBe(false);
    expect(isCollaboratorEmail(['a@b.co'])).toBe(false);
  });

  it('rejects an address longer than the column allows', () => {
    const local = 'a'.repeat(COLLABORATOR_EMAIL_MAX_LENGTH);
    expect(isCollaboratorEmail(`${local}@school.edu.au`)).toBe(false);
  });
});

describe('optionalText', () => {
  it('trims, and turns anything blank into null', () => {
    expect(optionalText('  Room 12  ')).toBe('Room 12');
    expect(optionalText('')).toBeNull();
    expect(optionalText('   ')).toBeNull();
    expect(optionalText(undefined)).toBeNull();
    expect(optionalText(null)).toBeNull();
    expect(optionalText(7)).toBeNull();
  });
});

describe('validateCollaborator', () => {
  it('accepts an email address on its own — nothing else is required', () => {
    expect(ok({ email: 'teacher@school.edu.au' })).toEqual({
      email: 'teacher@school.edu.au',
      name: null,
      school: null,
      country: null,
      yearLevels: null,
      subjects: null,
      message: null,
    });
  });

  it('trims every field and lower-cases the address', () => {
    expect(
      ok({
        email: '  Teacher@School.Edu.Au  ',
        name: '  Alex Reid  ',
        school: '  Northside High  ',
        country: '  Australia  ',
        yearLevels: '  Year 9 and Year 10  ',
        subjects: '  Chemistry  ',
        message: '  Happy to try the balancer with 9C.  ',
      })
    ).toEqual({
      email: 'teacher@school.edu.au',
      name: 'Alex Reid',
      school: 'Northside High',
      country: 'Australia',
      yearLevels: 'Year 9 and Year 10',
      subjects: 'Chemistry',
      message: 'Happy to try the balancer with 9C.',
    });
  });

  it('maps every blank optional field to null rather than an empty string', () => {
    // A column full of '' cannot answer "did anyone tell me their school?".
    expect(
      ok({
        email: 'teacher@school.edu.au',
        name: '',
        school: '   ',
        country: '\t',
        yearLevels: '',
        subjects: '  ',
        message: '',
      })
    ).toMatchObject({
      name: null,
      school: null,
      country: null,
      yearLevels: null,
      subjects: null,
      message: null,
    });
  });

  it('ignores fields it was never given, and fields it does not know', () => {
    expect(ok({ email: 'teacher@school.edu.au', status: 'active', user_id: 'nope' })).toEqual({
      email: 'teacher@school.edu.au',
      name: null,
      school: null,
      country: null,
      yearLevels: null,
      subjects: null,
      message: null,
    });
  });

  describe('the email address', () => {
    it('is required, and says so in a way that explains why', () => {
      for (const input of [{}, { email: '' }, { email: '   ' }, { email: 42 }]) {
        const result = fail(input);
        expect(result.field).toBe('email');
        expect(result.error).toMatch(/email address/i);
      }
    });

    it('rejects a non-object input the same way, rather than throwing', () => {
      // A server action is a public endpoint: `null`, a string and an array
      // all arrive eventually.
      for (const input of [null, undefined, 'teacher@school.edu.au', ['a'], 7]) {
        expect(validateCollaborator(input).ok).toBe(false);
      }
    });

    it('explains what an address needs when the shape is wrong', () => {
      const result = fail({ email: 'teacher-at-school' });
      expect(result.field).toBe('email');
      expect(result.error).toContain('@');
    });

    it('is reported as too long, not as malformed, when it is both', () => {
      // The reverse order would tell someone who pasted a paragraph that
      // their email address needs an @ in it, which is true and useless.
      const result = fail({ email: `${'a'.repeat(300)}@school.edu.au` });
      expect(result.field).toBe('email');
      expect(result.error).toContain(String(COLLABORATOR_EMAIL_MAX_LENGTH));
    });
  });

  describe('length caps', () => {
    const CAPS = [
      ['name', COLLABORATOR_NAME_MAX_LENGTH],
      ['school', COLLABORATOR_SCHOOL_MAX_LENGTH],
      ['country', COLLABORATOR_COUNTRY_MAX_LENGTH],
      ['yearLevels', COLLABORATOR_YEAR_LEVELS_MAX_LENGTH],
      ['subjects', COLLABORATOR_SUBJECTS_MAX_LENGTH],
      ['message', COLLABORATOR_MESSAGE_MAX_LENGTH],
    ] as const;

    it.each(CAPS)('accepts %s at exactly its cap', (field, max) => {
      expect(ok({ email: 'teacher@school.edu.au', [field]: 'x'.repeat(max) })[field]).toHaveLength(
        max
      );
    });

    it.each(CAPS)('rejects %s one character over, and names the field', (field, max) => {
      const result = fail({ email: 'teacher@school.edu.au', [field]: 'x'.repeat(max + 1) });
      expect(result.field).toBe(field);
      expect(result.error).toContain(String(max));
    });

    it('measures the cap in code points, as Postgres char_length() does', () => {
      // An emoji is two UTF-16 units and one code point. Counting units would
      // reject a value the column would have accepted.
      const value = '🧪'.repeat(COLLABORATOR_NAME_MAX_LENGTH);
      expect(value.length).toBeGreaterThan(COLLABORATOR_NAME_MAX_LENGTH);
      expect(ok({ email: 'teacher@school.edu.au', name: value }).name).toBe(value);
    });

    it('applies the cap after trimming, not before', () => {
      const value = `  ${'x'.repeat(COLLABORATOR_COUNTRY_MAX_LENGTH)}  `;
      expect(ok({ email: 'teacher@school.edu.au', country: value }).country).toHaveLength(
        COLLABORATOR_COUNTRY_MAX_LENGTH
      );
    });
  });

  it('uses the messages it is handed, so the server action can translate them', () => {
    const result = validateCollaborator(
      { email: '' },
      {
        emailRequired: 'Bitte geben Sie eine E-Mail-Adresse an.',
        emailInvalid: 'nope',
        tooLong: 'zu lang: {max}',
      }
    );
    expect(result).toEqual({
      ok: false,
      field: 'email',
      error: 'Bitte geben Sie eine E-Mail-Adresse an.',
    });
  });

  it('interpolates {max} into the translated length message', () => {
    const result = validateCollaborator(
      { email: 'teacher@school.edu.au', country: 'x'.repeat(200) },
      { emailRequired: 'a', emailInvalid: 'b', tooLong: 'höchstens {max} Zeichen' }
    );
    expect(result).toEqual({
      ok: false,
      field: 'country',
      error: `höchstens ${COLLABORATOR_COUNTRY_MAX_LENGTH} Zeichen`,
    });
  });
});
