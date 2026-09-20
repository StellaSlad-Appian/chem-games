-- supabase/migrations/20260920_add_atomic_structure_sheet.sql
--
-- Registers the "Atoms, Isotopes & the Periodic Table" cheat sheet and the
-- concept it teaches.
--
-- The sheet's CONTENT stays in src/lib/cheat-sheet-data.ts, for the reason set
-- out in 20260913_create_concepts.sql: the page is statically rendered, and
-- this table is a registry keyed by slug so the database can link and report on
-- sheets. Nothing in the Explore or cheat-sheet routes reads these rows, and
-- both pages render with Supabase unconfigured.
--
-- Why this sheet exists: the site had no atomic-structure content at all, which
-- is a gap in the Victorian Curriculum coverage independent of any feature, and
-- twelve Explore scientists had nowhere honest to link — see
-- docs/feature-briefs/explore-scientists.md theme A.

-- ---------------------------------------------------------------------------
-- 1. The concept
-- ---------------------------------------------------------------------------
insert into public.concepts (id, title, description, strand, year_level, curriculum_ref, parent_id, display_order)
values (
  'atomic-structure',
  'Atomic Structure & the Periodic Table',
  'Subatomic particles, atomic number and mass number, isotopes, relative atomic mass, electron arrangement and the order of the table.',
  'Fundamentals',
  'Year 9',
  'Victorian Curriculum Science Level 9: the atom as the smallest unit of an element, subatomic particles, atomic number and isotopes.',
  null,
  5
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
-- 2. The cheat-sheet registry row (slug must match src/lib/cheat-sheet-data.ts)
-- ---------------------------------------------------------------------------
insert into public.cheat_sheets (slug, title, year_level, category)
values ('atomic-structure', 'Atoms, Isotopes & the Periodic Table', 'Year 9', 'Fundamentals')
on conflict (slug) do update set
  title = excluded.title,
  year_level = excluded.year_level,
  category = excluded.category;

-- ---------------------------------------------------------------------------
-- 3. The link
-- ---------------------------------------------------------------------------
insert into public.concept_cheat_sheets (concept_id, cheat_sheet_slug, is_primary)
values ('atomic-structure', 'atomic-structure', true)
on conflict (concept_id, cheat_sheet_slug) do update set is_primary = excluded.is_primary;

-- No concept_games row. Nothing currently shipped practises atomic structure:
-- the nearest, Share to Fill, is about electron pairs in bonds rather than the
-- structure of a single atom. An honest absence beats a stretched link, which
-- is the same rule the Explore cards are held to (AC-6).
