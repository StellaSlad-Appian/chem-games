-- supabase/migrations/20260921_add_relative_formula_mass_sheet.sql
--
-- The 'relative-formula-mass' cheat sheet, and the concept it belongs to.
--
-- This is the reference half of a game that is not here yet. Mass Production
-- (slug 'reacting-quantities') is built and translated but lives on its own
-- branch until its visuals are finished, so this migration registers the
-- concept and the sheet and stops there: there is no concept_games row,
-- because the game it would name does not exist on this branch and the
-- foreign key would fail.
--
-- The sheet stands on its own regardless. Relative atomic and formula mass is
-- taught in most Year 10 courses whether or not anyone plays a game about it,
-- and the sheet is the only place on the site that says what Ar actually
-- means rather than assuming it.
--
-- When the game lands, one migration adds its games row, the concept_games
-- rows and the sheet's "Practise this" link.
--
-- Safe to re-run.

insert into public.concepts (id, title, description, strand, year_level, curriculum_ref, parent_id, display_order)
values
  (
    'reacting-quantities',
    'Reacting Quantities',
    'Reading a balanced equation as a ratio: limiting reagent, relative formula mass, and mass-to-mass by proportion - without the mole.',
    'Stoichiometry',
    'Year 10',
    'Victorian Curriculum Science Levels 9-10, VC2S10U08 (conservation of mass, balanced equations). Relative formula mass and mass-to-mass are pre-VCE extension, not F-10 content.',
    null,
    65
  )
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  strand = excluded.strand,
  year_level = excluded.year_level,
  curriculum_ref = excluded.curriculum_ref,
  parent_id = excluded.parent_id,
  display_order = excluded.display_order;

insert into public.cheat_sheets (slug, title, year_level, category)
values ('relative-formula-mass', 'Relative Atomic & Formula Mass', 'Year 10', 'Stoichiometry')
on conflict (slug) do update set
  title = excluded.title,
  year_level = excluded.year_level,
  category = excluded.category;

insert into public.concept_cheat_sheets (concept_id, cheat_sheet_slug, is_primary)
values
  ('reacting-quantities', 'relative-formula-mass', true),
  ('reacting-quantities', 'balancing-equations', false)
on conflict (concept_id, cheat_sheet_slug) do update set is_primary = excluded.is_primary;
