-- supabase/migrations/20260921_split_atomic_structure_sheet.sql
--
-- Splits the "Atoms, Isotopes & the Periodic Table" sheet registered by
-- 20260920_add_atomic_structure_sheet.sql into two, along the line the
-- Victorian Curriculum itself draws.
--
-- See docs/feature-briefs/atomic-structure-redesign.md §4 for the research.
-- The short version: Victorian Curriculum F-10 Version 2.0 bands Levels 9 and
-- 10 together and writes no separate Level 9 or Level 10 Science description --
-- but within that band, atomic structure sits in two content descriptions:
--
--   VC2S10U07  the organisation of the elements in the periodic table
--   VC2S10U06  the model of the atom, and natural radioactive decay
--
-- so those become the two sheets. The Year 9 / Year 10 labels are this site's
-- sequencing, not a curriculum boundary, and both `curriculum_ref` values say
-- so. Those values are ABRIDGED: `concepts.curriculum_ref` is capped at 300
-- characters by its own check constraint, while the prose the page renders
-- lives in `CHEAT_SHEETS[].curriculumRef` and is roughly twice that. The full
-- text is in src/lib/cheat-sheet-data.ts; this column is a registry field.
--
-- As with every migration in this directory, the sheets' CONTENT stays in
-- TypeScript because the pages are statically rendered. Nothing in any route
-- reads these rows, and both pages render with Supabase unconfigured.
--
-- Two shape decisions, and why:
--
--   1. The Year 10 sheet gets its OWN concept row rather than a second link on
--      the existing one. `concept_cheat_sheets_one_primary` is a partial unique
--      index on (concept_id) where is_primary, so one concept can have at most
--      one primary sheet -- a shared concept would force the new sheet to be
--      non-primary, which is not what it is. Independently, `concepts` carries
--      year_level and curriculum_ref, and the two sheets differ on both.
--
--   2. It nests under 'atomic-structure' via parent_id, the same way
--      'polyatomic-ions' nests under 'ionic-compounds'. Isotopes are not a
--      sibling topic: you cannot teach them before protons, neutrons and
--      atomic number, which is what the parent concept covers.

-- ---------------------------------------------------------------------------
-- 1. The Year 9 concept, narrowed
--
--    Isotopes and relative atomic mass move out of the title and description;
--    the curriculum reference becomes VC2S10U07 and loses the Version 1.0-style
--    "Level 9" framing that Version 2.0 does not support.
-- ---------------------------------------------------------------------------
update public.concepts set
  title = 'Atoms & the Periodic Table',
  description = 'Subatomic particles, atomic number, electron arrangement, and how the organisation of the periodic table predicts metallic character, atomic size and reactivity.',
  curriculum_ref = 'Victorian Curriculum F-10 V2.0 Science VC2S10U07 (Levels 9-10 band): the organisation of the elements in the periodic table is related to the structure and properties of atoms. V2.0 writes no separate Level 9 description, so the Year 9 label is this site''s sequencing.'
where id = 'atomic-structure';

-- ---------------------------------------------------------------------------
-- 2. The Year 10 concept
-- ---------------------------------------------------------------------------
insert into public.concepts (id, title, description, strand, year_level, curriculum_ref, parent_id, display_order)
values (
  'isotopes-and-radioactivity',
  'Isotopes & Radioactivity',
  'Isotopes and why they share chemistry, relative atomic mass as a weighted average, stable and unstable nuclei, alpha, beta and gamma decay, half-life, and the elements that had to be made.',
  'Fundamentals',
  'Year 10',
  'Victorian Curriculum F-10 V2.0 Science VC2S10U06 (Levels 9-10 band): the model of the atom changed following the discovery of electrons, protons and neutrons; natural radioactive decay results in a change from unstable to stable atoms. The Year 10 label is this site''s sequencing.',
  'atomic-structure',
  6
)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  strand = excluded.strand,
  year_level = excluded.year_level,
  curriculum_ref = excluded.curriculum_ref,
  parent_id = excluded.parent_id,
  display_order = excluded.display_order;

-- ---------------------------------------------------------------------------
-- 3. The cheat-sheet registry rows (slugs must match src/lib/cheat-sheet-data.ts)
--
--    'atomic-structure' keeps its slug. Twelve Explore entries and the concept
--    link point at it, and nothing may 404.
-- ---------------------------------------------------------------------------
insert into public.cheat_sheets (slug, title, year_level, category)
values
  ('atomic-structure', 'Atoms & the Periodic Table', 'Year 9', 'Fundamentals'),
  ('isotopes-and-radioactivity', 'Isotopes & Radioactivity', 'Year 10', 'Fundamentals')
on conflict (slug) do update set
  title = excluded.title,
  year_level = excluded.year_level,
  category = excluded.category;

-- ---------------------------------------------------------------------------
-- 4. The links
--
--    The Year 10 concept also points at the Year 9 sheet, non-primary: the
--    isotopes concept genuinely depends on it, and this is the same shape as
--    ('stoichiometry', 'balancing-equations', false) in the base migration.
--
--    There is deliberately no link the other way. The Year 10 sheet does not
--    teach the periodic-table concept, and claiming it does would make the
--    concept map lie.
-- ---------------------------------------------------------------------------
insert into public.concept_cheat_sheets (concept_id, cheat_sheet_slug, is_primary)
values
  ('atomic-structure', 'atomic-structure', true),
  ('isotopes-and-radioactivity', 'isotopes-and-radioactivity', true),
  ('isotopes-and-radioactivity', 'atomic-structure', false)
on conflict (concept_id, cheat_sheet_slug) do update set is_primary = excluded.is_primary;

-- No concept_games row for either concept. Nothing currently shipped practises
-- atomic structure or radioactivity, and an honest absence beats a stretched
-- link -- the same rule 20260920_add_atomic_structure_sheet.sql applied, and
-- the one the Explore cards are held to.
