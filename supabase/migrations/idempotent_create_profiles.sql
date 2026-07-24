-- Migration: Safely add new profile fields, gamification stats, privacy toggles, and roles

alter table public.profiles
  -- 1. Identity & Academic Fields
  add column if not exists title text check (char_length(title) <= 30),
  add column if not exists country text check (char_length(country) <= 30),
  add column if not exists year_level text,
  
  -- 2. Gamification Fields
  add column if not exists favorite_compound jsonb,
  add column if not exists badges jsonb default '[]'::jsonb,
  add column if not exists current_streak integer not null default 0 check (current_streak >= 0),
  add column if not exists accuracy integer check (accuracy >= 0 and accuracy <= 100),
  
  -- 3. Privacy Toggles
  add column if not exists show_year_level boolean not null default false,
  add column if not exists show_country boolean not null default false,
  add column if not exists show_accuracy boolean not null default false,
  add column if not exists show_current_streak boolean not null default false,
  
  -- 4. System & Role Management
  add column if not exists updated_at timestamptz,
  add column if not exists is_active boolean not null default true,
  add column if not exists account_type text not null default 'student' check (account_type in ('student', 'teacher', 'admin'));
