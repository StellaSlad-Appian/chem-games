-- supabase/migrations/20260917_add_lewis_structures_game.sql
--
-- Register Share to Fill (Lewis structures) in the game catalogue.
--
--   * public.games row 'lewis-structures', INACTIVE until the game is verified
--     in a real browser and a full run has written a game_sessions row. Flip
--     is_active to true in a later migration once the milestone is approved.
--   * max_score / max_level seeded for the game_sessions guard trigger. Keep in
--     sync with GAME_SESSION_LIMITS in src/core-engine/utils/session-validation.ts
--     (the unit test reads the (id, max_score, max_level) row below).
--   * concept_games: the game is the primary game for the 'lewis-structures'
--     concept, and that concept's year level moves from 'Senior' to 'Year 10' —
--     the brief scopes the game to Victorian Curriculum Science Level 10
--     (electron dot diagrams for simple molecules). The cheat-sheet registry
--     row follows; its content in src/lib/cheat-sheet-data.ts now opens with a
--     "Year 10 essentials" section.
--
-- Safe to re-run.

insert into public.games (id, title, description, icon, theme_color, is_active, display_order, max_score, max_level)
values
  ('lewis-structures', 'Share to Fill', 'Pair up the loners to build a molecule.', '⚛️', '#14b8a6', false, 6, 18000, 5)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  icon = excluded.icon,
  theme_color = excluded.theme_color,
  display_order = excluded.display_order,
  max_score = excluded.max_score,
  max_level = excluded.max_level;

-- Session ceilings, in the same (id, max_score, max_level) shape as the guards migration.
update public.games as g
set max_score = v.max_score,
    max_level = v.max_level
from (values
  ('lewis-structures', 18000, 5)
) as v(id, max_score, max_level)
where g.id = v.id;

update public.concepts
set year_level = 'Year 10',
    description = 'Electron-dot (Lewis) structures for simple covalent molecules: shared pairs, lone pairs, octets and duets.'
where id = 'lewis-structures';

update public.cheat_sheets
set year_level = 'Year 10'
where slug = 'lewis-structures';

insert into public.concept_games (concept_id, game_id, role)
values
  ('lewis-structures', 'lewis-structures', 'primary'),
  ('chemical-bonding', 'lewis-structures', 'practice')
on conflict (concept_id, game_id) do update set role = excluded.role;
