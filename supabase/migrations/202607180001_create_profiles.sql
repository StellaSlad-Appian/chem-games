create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  alias text not null check (char_length(alias) between 1 and 40),
  title text check (char_length(title) <= 30),
  country text check (char_length(country) <= 30),
  year_level text,
  lab_notes text not null default '' check (char_length(lab_notes) <= 500),
  favorite_element jsonb,
  favorite_compound jsonb,
  badges jsonb default '[]'::jsonb,
  current_streak integer not null default 0 check (current_streak >= 0),
  accuracy integer check (accuracy >= 0 and accuracy <= 100),
  total_syntheses integer not null default 0 check (total_syntheses >= 0),
  
  -- Privacy Toggles
  show_lab_notes boolean not null default false,
  show_total_syntheses boolean not null default false,
  show_joined_date boolean not null default true,
  show_year_level boolean not null default false,
  show_country boolean not null default false,
  show_accuracy boolean not null default false,
  show_current_streak boolean not null default false,
  
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are publicly readable" on public.profiles for select using (true);
create policy "Users can create their profile" on public.profiles for insert with check ((select auth.uid()) = id);
create policy "Users can update their profile" on public.profiles for update using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create or replace function public.create_profile_for_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, alias)
  values (new.id, coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users for each row execute procedure public.create_profile_for_new_user();
