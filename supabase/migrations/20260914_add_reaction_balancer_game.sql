-- Register the Reaction Balancer in the game catalogue.
--
-- game_sessions.game_id and game_progress.game_id both reference
-- public.games(id), so recordGameSession() for 'reaction-balancer' failed the
-- foreign-key check (and silently returned { success: false }) until the game
-- had a row here. Same shape as the seed in 202607180002_create_games_and_progress.sql.

insert into public.games (id, title, description, icon, theme_color, display_order)
values
  ('reaction-balancer', 'Reaction Balancer', 'Adjust stoichiometric coefficients to balance equations.', '⚖️', '#f59e0b', 4)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  icon = excluded.icon,
  theme_color = excluded.theme_color,
  display_order = excluded.display_order;
