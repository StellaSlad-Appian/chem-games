-- supabase/migrations/20260918_activate_reaction_balancer.sql
--
-- Reaction Balancer redesign (docs/game-briefs/reaction-balancer.md, rev 2).
--
--   * public.games row 'reaction-balancer' becomes ACTIVE (it appears on the
--     dashboard and the public leaderboard) with the redesign's hub copy.
--   * max_score / max_level seeded for the game_sessions guard trigger. Keep
--     in sync with GAME_SESSION_LIMITS in
--     src/core-engine/utils/session-validation.ts (the unit test reads the
--     (id, max_score, max_level) row below). The game has 4 levels plus an
--     optional Challenge level 5 that records a second session; a level
--     awards at most 3 x (100 x level + 50).
--   * The 'balancing-equations' concept is already Year 10 (Victorian
--     Curriculum Science Level 10) in 20260913_create_concepts.sql, so its
--     year level does not change; only its description is refreshed to match
--     the brief.
--
-- Safe to re-run.

insert into public.games (id, title, description, icon, theme_color, is_active, display_order, max_score, max_level)
values
  ('reaction-balancer', 'Reaction Balancer', 'Make the atoms match on both sides of the arrow.', '⚖️', '#f59e0b', true, 4, 10500, 5)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  icon = excluded.icon,
  theme_color = excluded.theme_color,
  is_active = excluded.is_active,
  display_order = excluded.display_order,
  max_score = excluded.max_score,
  max_level = excluded.max_level;

-- Session ceilings, in the same (id, max_score, max_level) shape as the guards migration.
update public.games as g
set max_score = v.max_score,
    max_level = v.max_level
from (values
  ('reaction-balancer', 10500, 5)
) as v(id, max_score, max_level)
where g.id = v.id;

update public.concepts
set description = 'Conservation of mass: balancing equations with coefficients, never subscripts, and reading state symbols.'
where id = 'balancing-equations';

insert into public.concept_games (concept_id, game_id, role)
values
  ('balancing-equations', 'reaction-balancer', 'primary'),
  ('stoichiometry', 'reaction-balancer', 'prerequisite'),
  ('reaction-types', 'reaction-balancer', 'practice')
on conflict (concept_id, game_id) do update set role = excluded.role;
