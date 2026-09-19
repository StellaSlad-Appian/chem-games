-- supabase/migrations/20260919_create_explore.sql
--
-- Registry tables for the Explore page: one row per molecule, one per
-- scientist, and one per scheduled week.
--
-- Design notes
--   * **The PROSE is not here, and this is the same split
--     20260913_create_concepts.sql chose for the cheat sheets.** The entries
--     live in src/lib/explore/ with per-locale overlays in src/i18n/explore/,
--     because that is where the i18n gates are: `npm test` fails when a locale
--     is missing an entry, has an empty value, drops a formula or leaves a
--     string byte-identical to the English. Content in Postgres has none of
--     that — a missing Italian molecule would ship as a blank card and nobody
--     would find out. A `body` column can be added later if editing ever moves
--     to an admin UI, without moving these tables.
--   * **The page does not read these tables in v1.** Nothing in
--     src/app/[lang]/(main)/explore/ imports a Supabase client, so the page
--     renders identically with Supabase unconfigured — which is the state of
--     every local checkout and of any Supabase outage. They exist so the
--     database can link to and report on entries (which weeks ran, which
--     concept a molecule belongs to) and so an admin UI stays possible without
--     a rewrite.
--   * Ids and slugs match the `id` fields in src/lib/explore/*.ts exactly, and
--     the same slug regex the existing tables use enforces the shape. They are
--     also the segments a future per-entry archive would use
--     (/explore/molecules/<slug>), which is why they are designed now.
--   * `week_index` on the schedule is the position in EXPLORE_SCHEDULE, not an
--     absolute week number. The rotation is `weekIndex(now) % pool.length`, so
--     appending a pair lengthens the cycle and shifts which pair a future week
--     shows — see src/lib/explore/rotation.ts. Storing an absolute week would
--     make this table disagree with the code the first time a pair is added.

-- ---------------------------------------------------------------------------
-- 1. Molecules
-- ---------------------------------------------------------------------------
create table if not exists public.explore_molecules (
  slug text primary key check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  -- The COMPOUNDS_REGISTRY id, when the species is in that registry. Text
  -- rather than an FK because the registry is a TypeScript array, not a table.
  compound_id text check (char_length(compound_id) <= 32),
  concept_id text references public.concepts(id) on delete set null,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists explore_molecules_concept_id_idx
  on public.explore_molecules (concept_id);

-- ---------------------------------------------------------------------------
-- 2. Scientists
-- ---------------------------------------------------------------------------
--
-- Note what is NOT a column here: the `represents` field.
--
-- It is scheduling metadata and it is never rendered (see the comment on
-- ExploreScientist in src/lib/explore/types.ts). The balance invariant is
-- asserted over the ordered list in src/lib/explore/schedule.test.ts, which is
-- where the schedule actually lives; a column here would be a second copy with
-- no test over it, and a database column recording the gender of real people is
-- not something to create because it might be convenient later.
create table if not exists public.explore_scientists (
  slug text primary key check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  concept_id text references public.concepts(id) on delete set null,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists explore_scientists_concept_id_idx
  on public.explore_scientists (concept_id);

-- ---------------------------------------------------------------------------
-- 3. The paired schedule
-- ---------------------------------------------------------------------------
create table if not exists public.explore_schedule (
  week_index integer primary key check (week_index >= 0),
  molecule_slug text not null references public.explore_molecules(slug) on delete cascade,
  scientist_slug text not null references public.explore_scientists(slug) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- A molecule or a scientist appears at most once in the cycle.
create unique index if not exists explore_schedule_molecule_once
  on public.explore_schedule (molecule_slug);
create unique index if not exists explore_schedule_scientist_once
  on public.explore_schedule (scientist_slug);

-- ---------------------------------------------------------------------------
-- 4. updated_at triggers (reuses public.set_updated_at from the games migration)
-- ---------------------------------------------------------------------------
drop trigger if exists explore_molecules_set_updated_at on public.explore_molecules;
create trigger explore_molecules_set_updated_at
  before update on public.explore_molecules
  for each row execute procedure public.set_updated_at();

drop trigger if exists explore_scientists_set_updated_at on public.explore_scientists;
create trigger explore_scientists_set_updated_at
  before update on public.explore_scientists
  for each row execute procedure public.set_updated_at();

drop trigger if exists explore_schedule_set_updated_at on public.explore_schedule;
create trigger explore_schedule_set_updated_at
  before update on public.explore_schedule
  for each row execute procedure public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 5. Row level security: public read of active rows, no client writes
--    (content is managed via migrations / the service role).
-- ---------------------------------------------------------------------------
alter table public.explore_molecules enable row level security;
alter table public.explore_scientists enable row level security;
alter table public.explore_schedule enable row level security;

drop policy if exists "Active explore molecules are publicly readable" on public.explore_molecules;
create policy "Active explore molecules are publicly readable"
  on public.explore_molecules for select using (is_active);

drop policy if exists "Active explore scientists are publicly readable" on public.explore_scientists;
create policy "Active explore scientists are publicly readable"
  on public.explore_scientists for select using (is_active);

drop policy if exists "The explore schedule is publicly readable" on public.explore_schedule;
create policy "The explore schedule is publicly readable"
  on public.explore_schedule for select using (true);

-- ---------------------------------------------------------------------------
-- 6. Seed — idempotent, so re-running the migration is safe
-- ---------------------------------------------------------------------------
--
-- `display_order` is the launch week, 1-based, matching EXPLORE_SCHEDULE.
-- `concept_id` points at the concept the entry's inward link teaches, using the
-- ids seeded by 20260913_create_concepts.sql. Where no concept matches the
-- entry closely enough, it is left null rather than stretched — the same rule
-- AC-6 applies to the links themselves.

insert into public.explore_molecules (slug, compound_id, concept_id, display_order)
values
  ('benzene',              null, 'chemical-bonding',     1),
  ('citric-acid',          null, 'acids-and-bases',      2),
  ('silicon-dioxide',      null, 'states-of-matter',     3),
  ('monosodium-glutamate', null, 'functional-groups',    4),
  ('cfc-12',               null, 'reaction-types',       5),
  ('ammonia',              '11', 'balancing-equations',  6),
  ('cholesterol',          null, 'functional-groups',    7),
  ('oleic-acid',           null, 'reaction-types',       8),
  ('methane',              null, 'stoichiometry',        9),
  ('water',                '15', 'lewis-structures',    10),
  ('kevlar',               null, 'chemical-bonding',    11),
  ('lithium-cobalt-oxide', null, 'reaction-types',      12),
  ('adenine',              null, 'functional-groups',   13),
  ('sodium-bicarbonate',   '16', 'polyatomic-ions',     14),
  ('urea',                 null, 'balancing-equations', 15),
  ('limonene',             null, 'organic-nomenclature', 16),
  ('sodium-sulfate',       '14', 'states-of-matter',    17),
  ('polypropylene',        null, 'chemical-bonding',    18),
  ('artemisinin',          null, 'functional-groups',   19),
  ('sodium-chloride',      '6',  'states-of-matter',    20)
on conflict (slug) do update set
  compound_id = excluded.compound_id,
  concept_id = excluded.concept_id,
  display_order = excluded.display_order;

insert into public.explore_scientists (slug, concept_id, display_order)
values
  ('kathleen-lonsdale',   'chemical-bonding',      1),
  ('soren-sorensen',      'acids-and-bases',       2),
  ('katharine-blodgett',  'states-of-matter',      3),
  ('kikunae-ikeda',       'functional-groups',     4),
  ('susan-solomon',       'reaction-types',        5),
  ('fritz-haber',         'balancing-equations',   6),
  ('marie-maynard-daly',  'functional-groups',     7),
  ('paul-sabatier',       'reaction-types',        8),
  ('reatha-clark-king',   'stoichiometry',         9),
  ('gilbert-lewis',       'lewis-structures',     10),
  ('stephanie-kwolek',    'chemical-bonding',     11),
  ('akira-yoshino',       'reaction-types',       12),
  ('margarita-salas',     'functional-groups',    13),
  ('alfred-werner',       'polyatomic-ions',      14),
  ('johanna-dobereiner',  'balancing-equations',  15),
  ('vladimir-prelog',     'organic-nomenclature', 16),
  ('maria-telkes',        'states-of-matter',     17),
  ('giulio-natta',        'chemical-bonding',     18),
  ('tu-youyou',           'functional-groups',    19),
  ('dan-shechtman',       'states-of-matter',     20)
on conflict (slug) do update set
  concept_id = excluded.concept_id,
  display_order = excluded.display_order;

insert into public.explore_schedule (week_index, molecule_slug, scientist_slug)
values
  (0,  'benzene',              'kathleen-lonsdale'),
  (1,  'citric-acid',          'soren-sorensen'),
  (2,  'silicon-dioxide',      'katharine-blodgett'),
  (3,  'monosodium-glutamate', 'kikunae-ikeda'),
  (4,  'cfc-12',               'susan-solomon'),
  (5,  'ammonia',              'fritz-haber'),
  (6,  'cholesterol',          'marie-maynard-daly'),
  (7,  'oleic-acid',           'paul-sabatier'),
  (8,  'methane',              'reatha-clark-king'),
  (9,  'water',                'gilbert-lewis'),
  (10, 'kevlar',               'stephanie-kwolek'),
  (11, 'lithium-cobalt-oxide', 'akira-yoshino'),
  (12, 'adenine',              'margarita-salas'),
  (13, 'sodium-bicarbonate',   'alfred-werner'),
  (14, 'urea',                 'johanna-dobereiner'),
  (15, 'limonene',             'vladimir-prelog'),
  (16, 'sodium-sulfate',       'maria-telkes'),
  (17, 'polypropylene',        'giulio-natta'),
  (18, 'artemisinin',          'tu-youyou'),
  (19, 'sodium-chloride',      'dan-shechtman')
on conflict (week_index) do update set
  molecule_slug = excluded.molecule_slug,
  scientist_slug = excluded.scientist_slug;
