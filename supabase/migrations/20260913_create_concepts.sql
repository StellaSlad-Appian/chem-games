-- supabase/migrations/20260913_create_concepts.sql
--
-- Concept map: links curriculum concepts to the cheat sheets that explain them
-- and the games that practise them. See docs/DATABASE_CONCEPTS.md for the
-- reasoning and the alternatives that were considered.
--
-- Design notes
--   * A concept usually has ONE primary game, but may have several games in
--     supporting roles ('practice', 'prerequisite'). The partial unique index
--     enforces "at most one primary game per concept" without preventing a
--     game from being primary for two concepts (Neutralise covers both
--     acids/bases and ionic equations, for example).
--   * Cheat-sheet CONTENT stays in src/lib/cheat-sheet-data.ts (it is statically
--     rendered). This table is a registry keyed by slug so the DB can link and
--     report on sheets; a content column can be added later if editing moves
--     to an admin UI.
--   * Concepts can nest (parent_id) so "polyatomic ions" can sit under
--     "ionic compounds" instead of being a top-level topic.

-- ---------------------------------------------------------------------------
-- 1. Concepts
-- ---------------------------------------------------------------------------
create table if not exists public.concepts (
  id text primary key check (id ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 100),
  description text not null default '' check (char_length(description) <= 500),
  strand text check (strand in (
    'Fundamentals', 'Reactions', 'Acids & Bases', 'Equations', 'Thermodynamics',
    'Organic', 'Bonding', 'Nomenclature', 'Stoichiometry'
  )),
  year_level text check (year_level in ('Year 7', 'Year 8', 'Year 9', 'Year 10', 'Senior')),
  curriculum_ref text check (char_length(curriculum_ref) <= 300),
  parent_id text references public.concepts(id) on delete set null,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists concepts_parent_id_idx on public.concepts (parent_id);

-- ---------------------------------------------------------------------------
-- 2. Cheat-sheet registry (slug must match src/lib/cheat-sheet-data.ts)
-- ---------------------------------------------------------------------------
create table if not exists public.cheat_sheets (
  slug text primary key check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 100),
  year_level text check (year_level in ('Year 7', 'Year 8', 'Year 9', 'Year 10', 'Senior')),
  category text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3. Link tables
-- ---------------------------------------------------------------------------
create table if not exists public.concept_cheat_sheets (
  concept_id text not null references public.concepts(id) on delete cascade,
  cheat_sheet_slug text not null references public.cheat_sheets(slug) on delete cascade,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (concept_id, cheat_sheet_slug)
);

create unique index if not exists concept_cheat_sheets_one_primary
  on public.concept_cheat_sheets (concept_id) where is_primary;

create table if not exists public.concept_games (
  concept_id text not null references public.concepts(id) on delete cascade,
  game_id text not null references public.games(id) on delete cascade,
  role text not null default 'primary' check (role in ('primary', 'practice', 'prerequisite')),
  created_at timestamptz not null default now(),
  primary key (concept_id, game_id)
);

create unique index if not exists concept_games_one_primary
  on public.concept_games (concept_id) where role = 'primary';

create index if not exists concept_games_game_id_idx on public.concept_games (game_id);

-- ---------------------------------------------------------------------------
-- 4. updated_at triggers (reuses public.set_updated_at from the games migration)
-- ---------------------------------------------------------------------------
drop trigger if exists concepts_set_updated_at on public.concepts;
create trigger concepts_set_updated_at
  before update on public.concepts
  for each row execute procedure public.set_updated_at();

drop trigger if exists cheat_sheets_set_updated_at on public.cheat_sheets;
create trigger cheat_sheets_set_updated_at
  before update on public.cheat_sheets
  for each row execute procedure public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 5. Row level security: public read of active rows, no client writes
--    (content is managed via migrations / the service role).
-- ---------------------------------------------------------------------------
alter table public.concepts enable row level security;
alter table public.cheat_sheets enable row level security;
alter table public.concept_cheat_sheets enable row level security;
alter table public.concept_games enable row level security;

create policy "Active concepts are publicly readable"
  on public.concepts for select using (is_active);
create policy "Active cheat sheets are publicly readable"
  on public.cheat_sheets for select using (is_active);
create policy "Concept-cheat-sheet links are publicly readable"
  on public.concept_cheat_sheets for select using (true);
create policy "Concept-game links are publicly readable"
  on public.concept_games for select using (true);

-- ---------------------------------------------------------------------------
-- 6. Per-user progress by concept (derived from game_progress via concept_games).
--    security_invoker so the caller's game_progress RLS applies.
-- ---------------------------------------------------------------------------
create or replace view public.user_concept_progress
with (security_invoker = true)
as
select
  gp.user_id,
  cg.concept_id,
  max(gp.highest_level) as highest_level,
  max(gp.highest_score) as highest_score,
  max(gp.last_played_at) as last_played_at,
  count(*) filter (where cg.role = 'primary') > 0 as has_played_primary_game
from public.game_progress as gp
join public.concept_games as cg on cg.game_id = gp.game_id
group by gp.user_id, cg.concept_id;

grant select on public.user_concept_progress to authenticated;

-- ---------------------------------------------------------------------------
-- 7. Seed data
-- ---------------------------------------------------------------------------

-- Games that exist in code but not yet in the catalogue. Inactive until launched,
-- but present so concept links and (later) session recording don't hit FK errors.
insert into public.games (id, title, description, icon, theme_color, is_active, display_order)
values
  ('reaction-balancer', 'Reaction Balancer', 'Adjust coefficients to balance chemical equations.', '⚖️', '#f59e0b', false, 4),
  ('bond-builder', 'Bond Builder', 'Build molecules and explore chemical bonding.', '🔗', '#22d3ee', false, 5)
on conflict (id) do nothing;

insert into public.concepts (id, title, description, strand, year_level, curriculum_ref, parent_id, display_order)
values
  ('states-of-matter', 'States of Matter', 'Particle model, kinetic energy and phase changes.', 'Fundamentals', 'Year 9', 'Vic Curriculum Science L7–8 particle model', null, 10),
  ('acids-and-bases', 'Acids & Bases', 'pH, proton transfer, strong/weak, neutralisation.', 'Acids & Bases', 'Year 9', 'Vic Curriculum L10; VCE Unit 2 AoS 1', null, 20),
  ('chemical-bonding', 'Chemical Bonding', 'Ionic, covalent and metallic bonding; structure and properties.', 'Bonding', 'Year 10', 'VCE Unit 1 AoS 1', null, 30),
  ('lewis-structures', 'Lewis Structures', 'Electron-dot structures, bond order, formal charge, VSEPR.', 'Bonding', 'Senior', 'VCE Unit 1 AoS 1', 'chemical-bonding', 31),
  ('ionic-compounds', 'Ionic Compounds', 'Writing formulas and naming ionic compounds.', 'Nomenclature', 'Year 10', 'VCE Unit 1 AoS 1', null, 40),
  ('polyatomic-ions', 'Polyatomic Ions', 'Names, formulas and charges of common polyatomic ions.', 'Nomenclature', 'Year 10', 'VCE Unit 1 AoS 1 (data book table)', 'ionic-compounds', 41),
  ('inorganic-nomenclature', 'Naming Inorganic Compounds', 'Ionic, molecular and acid naming systems.', 'Nomenclature', 'Year 10', 'VCE Unit 1 AoS 1', 'ionic-compounds', 42),
  ('balancing-equations', 'Balancing Equations', 'Conservation of mass and coefficients.', 'Equations', 'Year 10', 'Vic Curriculum L10; VCE Unit 1–2', null, 50),
  ('reaction-types', 'Types of Reactions', 'Synthesis, decomposition, combustion, displacement, precipitation, neutralisation.', 'Reactions', 'Year 10', 'Vic Curriculum L10; VCE Unit 2', null, 60),
  ('stoichiometry', 'The Mole & Stoichiometry', 'Mole conversions, ratios, limiting reagent, yield.', 'Stoichiometry', 'Senior', 'VCE Unit 2 AoS 1–2; Unit 3 AoS 2', null, 70),
  ('functional-groups', 'Functional Groups', 'Identifying organic functional groups and homologous series.', 'Organic', 'Senior', 'VCE Unit 4 AoS 1–2', null, 80),
  ('organic-nomenclature', 'Naming Organic Compounds', 'IUPAC systematic naming.', 'Organic', 'Senior', 'VCE Unit 4 AoS 1', 'functional-groups', 81),
  ('reaction-pathways', 'Organic Reaction Pathways', 'Addition, substitution, oxidation, esterification; multi-step synthesis.', 'Organic', 'Senior', 'VCE Unit 4 AoS 1', 'functional-groups', 82)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  strand = excluded.strand,
  year_level = excluded.year_level,
  curriculum_ref = excluded.curriculum_ref,
  parent_id = excluded.parent_id,
  display_order = excluded.display_order;

insert into public.cheat_sheets (slug, title, year_level, category)
values
  ('states-of-matter', 'States of Matter', 'Year 9', 'Fundamentals'),
  ('acids-and-bases', 'Acids & Bases', 'Year 9', 'Acids & Bases'),
  ('balancing-equations', 'Balancing Chemical Equations', 'Year 10', 'Equations'),
  ('reaction-types', 'Types of Chemical Reactions', 'Year 10', 'Reactions'),
  ('chemical-bonds', 'Chemical Bonds & Structure', 'Year 10', 'Bonding'),
  ('chemical-formulas', 'Writing Ionic Formulas', 'Year 10', 'Nomenclature'),
  ('polyatomic-ions', 'Polyatomic Ions', 'Year 10', 'Nomenclature'),
  ('naming-compounds', 'Naming Inorganic Compounds', 'Year 10', 'Nomenclature'),
  ('stoichiometry', 'The Mole & Stoichiometry', 'Senior', 'Stoichiometry'),
  ('lewis-structures', 'Lewis Structures', 'Senior', 'Bonding'),
  ('organic-nomenclature', 'Naming Organic Compounds', 'Senior', 'Organic'),
  ('functional-groups', 'Functional Groups', 'Senior', 'Organic')
on conflict (slug) do update set
  title = excluded.title,
  year_level = excluded.year_level,
  category = excluded.category;

insert into public.concept_cheat_sheets (concept_id, cheat_sheet_slug, is_primary)
values
  ('states-of-matter', 'states-of-matter', true),
  ('acids-and-bases', 'acids-and-bases', true),
  ('chemical-bonding', 'chemical-bonds', true),
  ('lewis-structures', 'lewis-structures', true),
  ('ionic-compounds', 'chemical-formulas', true),
  ('ionic-compounds', 'polyatomic-ions', false),
  ('polyatomic-ions', 'polyatomic-ions', true),
  ('inorganic-nomenclature', 'naming-compounds', true),
  ('inorganic-nomenclature', 'polyatomic-ions', false),
  ('balancing-equations', 'balancing-equations', true),
  ('reaction-types', 'reaction-types', true),
  ('stoichiometry', 'stoichiometry', true),
  ('stoichiometry', 'balancing-equations', false),
  ('functional-groups', 'functional-groups', true),
  ('organic-nomenclature', 'organic-nomenclature', true),
  ('reaction-pathways', 'functional-groups', true)
on conflict (concept_id, cheat_sheet_slug) do update set is_primary = excluded.is_primary;

insert into public.concept_games (concept_id, game_id, role)
values
  ('acids-and-bases', 'acid-classification', 'primary'),
  ('acids-and-bases', 'neutralise', 'practice'),
  ('ionic-compounds', 'formula-blaster', 'primary'),
  ('polyatomic-ions', 'neutralise', 'practice'),
  ('balancing-equations', 'reaction-balancer', 'primary'),
  ('stoichiometry', 'reaction-balancer', 'prerequisite'),
  ('chemical-bonding', 'bond-builder', 'primary')
on conflict (concept_id, game_id) do update set role = excluded.role;
